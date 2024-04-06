from django.db import models

# Create your models here.
class Message(models.Model):
    content = models.CharField(max_length=100)
    datetime = models.DateTimeField(auto_now_add=True)

    def __self__(self):
        return self.content