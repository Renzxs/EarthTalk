from django.urls import path
from . import views

urlpatterns = [
    path('messages/', views.MessageCreate.as_view(), name="message-create"),
    path('messages/<int:pk>/', views.MessageRetriveUpdateDelete.as_view(), name="message-rud"),
]