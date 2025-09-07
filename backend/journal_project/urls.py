from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/', include('journal.urls')),
    path('', lambda request: JsonResponse({"message": "Backend Working!"})),
]