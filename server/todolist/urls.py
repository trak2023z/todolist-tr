from django.urls import path
from .views import get_todolists_not_done, get_todolists_done, create_todolist, done_todolist

urlpatterns = [
    path('todolists/notDone/', get_todolists_not_done, name='get_todolists_not_done'),
    path('todolists/done/', get_todolists_done, name='get_todolists_done'),
    path('todolists/create/', create_todolist, name='create_todolist'),
    path('todolists/done/<int:list_id>/', done_todolist,  name='done_todolist')
]
