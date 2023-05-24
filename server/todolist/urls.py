from django.urls import path
from .views import get_todolists, create_todolist, done_todolist

urlpatterns = [ 
    path('todolists/', get_todolists, name='get_todolists'),
    path('todolists/create/', create_todolist, name='create_todolist'),
    path('todolists/done/<int:list_id>/', done_todolist,  name='done_todolist')
]
