from django.urls import path
from .views import JournalEntryListCreateView, JournalEntryDetailView

urlpatterns = [
    path('entries/', JournalEntryListCreateView.as_view(), name='entries-list-create'),
    path('entries/<int:pk>/', JournalEntryDetailView.as_view(), name='entries-detail'),
]
