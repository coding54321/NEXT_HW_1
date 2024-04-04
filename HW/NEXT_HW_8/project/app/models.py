from django.db import models
from datetime import datetime

# Create your models here.
    
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    category_choices = [
        ('option1', '취미'),
        ('option2', '음식'),
        ('option3', '프로그래밍'),
    ]
    category = models.CharField(max_length=50, choices=category_choices, default='option1')
    
    def __str__(self):
        return self.title