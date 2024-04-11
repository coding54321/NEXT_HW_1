from django.db import models

# Create your models here.
class Article(models.Model):
    CATEGORY_CHOICES = [
        ('HOBBY', '취미'),
        ('FOOD', '음식'),
        ('PROGRAMMING', '프로그래밍'),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=12, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    
    def __str__(self):
        return self.content
    
class Recomment(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='recomments')
    content = models.TextField()

    def __str__(self):
        return self.content