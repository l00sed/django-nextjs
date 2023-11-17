from rest_framework import serializers
from .models import LQIP


class LQIPSerializer(serializers.ModelSerializer):
    class Meta:
        model = LQIP
        fields = ["base64"]
