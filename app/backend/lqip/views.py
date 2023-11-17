from rest_framework import generics, response, status
from urllib.parse import quote
from .models import LQIP
from .serializers import LQIPSerializer


class LQIPAPIView(generics.GenericAPIView):
    """LQIPAPIView."""

    serializer_class = LQIPSerializer

    def get(self, request, filepath):
        """get.
        :param slug:
        """

        filepath = quote(filepath)
        print(filepath)

        exists = LQIP.objects.filter(
            image_filepath=f'/app/backend/static{filepath}'
        ).exists()

        if exists:
            query_set = LQIP.objects.filter(
                image_filepath=f'/app/backend/static{filepath}'
            ).first()

            if query_set:
                return response.Response(self.serializer_class(query_set).data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)
