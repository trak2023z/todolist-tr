from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Todolist
from .serializers import TodolistSerializer

@api_view(['GET'])
def get_todolists(request):
    todolists = Todolist.objects.filter(created_by=request.user).order_by('-id')
    serializer = TodolistSerializer(todolists, many=True)
    return Response({"results":serializer.data})

@api_view(['POST'])
def create_todolist(request):
    serializer = TodolistSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response({'message':'Create'})

@api_view(['PATCH'])
def done_todolist(request, list_id):
    todolists = Todolist.objects.get(id=list_id, created_by=request.user)
    serializer = TodolistSerializer(todolists, data={'isDone':True,'description':todolists.description})
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response({'message':'Doned'})
