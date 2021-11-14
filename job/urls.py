from django.urls import path
from .views import SolutionView

# base_url = "http://localhost:8000/api/job/"


urlpatterns = [
    path('solution', SolutionView.as_view())
]