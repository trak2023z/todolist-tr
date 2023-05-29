from .models import Todolist
from rest_framework import serializers

class TodolistSerializer(serializers.ModelSerializer):
     class Meta:
        model = Todolist
        read_only_fields = (
            'created_by',
        )
        fields=(
            'id',
            'description',
            'isDone',
            'created_by'
        )