from django.db import models
from django.contrib.auth.models import User

class JournalEntry(models.Model):
    MOOD_CHOICES = [
        ('happy', 'Happy'),
        ('sad', 'Sad'),
        ('neutral', 'Neutral'),
        ('excited', 'Excited'),
        ('angry', 'Angry'),
        ('anxious', 'Anxious'),
        ('grateful', 'Grateful'),
        ('peaceful', 'Peaceful'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journal_entries')
    title = models.CharField(max_length=255)
    content = models.TextField()
    mood = models.CharField(max_length=20, choices=MOOD_CHOICES, default='neutral')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Journal Entries"

    def __str__(self):
        return f"{self.title} - {self.user.username}"   