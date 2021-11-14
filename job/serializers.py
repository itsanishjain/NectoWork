#create a serializer for solutoin model


from rest_framework import serializers
from .models import Solution


class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__'
  
    # Validations for the serializer
        
