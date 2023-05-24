from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Todolist(models.Model):
    description = models.CharField(max_length=1000)
    isDone = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, related_name='todolist_create', on_delete=models.CASCADE)