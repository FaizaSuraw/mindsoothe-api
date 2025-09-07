from rest_framework import serializers
from .models import JournalEntry

class JournalEntrySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = JournalEntry
        fields = ['id', 'user', 'title', 'content', 'mood', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)