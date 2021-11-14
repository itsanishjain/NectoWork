from django.shortcuts import render
from rest_framework import generics
from .models import Solution
from .serializers import SolutionSerializer
# Create your views here.

# write rest api which used to create update delete the solutoin

class SolutionView(generics.ListCreateAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer




