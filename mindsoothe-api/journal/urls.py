from django.urls import path
from . import views

urlpatterns = [
    path('entries/', views.entry_list_create, name='entry_list_create'),
    path('entries/<int:pk>/', views.entry_detail, name='entry_detail'),
]