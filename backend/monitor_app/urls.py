from django.urls import path
from .views import (
    URLListCreateView,
    StatusView
)

urlpatterns = [
    path(
        'urls/',
        URLListCreateView.as_view(),
        name='urls'
    ),

    path(
        'status/',
        StatusView.as_view(),
        name='status'
    ),
]