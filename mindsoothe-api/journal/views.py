from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import JournalEntry
from .serializers import JournalEntrySerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def entry_list_create(request):
    if request.method == 'GET':
        entries = JournalEntry.objects.filter(user=request.user)
        serializer = JournalEntrySerializer(entries, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = JournalEntrySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def entry_detail(request, pk):
    entry = get_object_or_404(JournalEntry, pk=pk, user=request.user)
    
    if request.method == 'GET':
        serializer = JournalEntrySerializer(entry)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        serializer = JournalEntrySerializer(entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        entry.delete()
        return Response({'message': 'Journal entry deleted successfully'}, status=status.HTTP_204_NO_CONTENT)