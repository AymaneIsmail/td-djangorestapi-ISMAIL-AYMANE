from json import JSONDecodeError
from django.http import JsonResponse
from .serializer import PublicationSerializer, ResearcherSerializer, ResearchProjectSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from .models import ResearchProject


class ResearchProjectView(views.APIView):
    
    serializer_class = ResearcherSerializer

    
    def get_serializer_context(self):
        return {
            'request': self.request ,
            'format': self.format_kwarg, 
            'view': self
        }
    
    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        return self.serializer_class(*args, **kwargs)
    
    def get(self, request):
        research_projects = ResearchProject.objects.all()
        serializer = ResearchProjectSerializer(research_projects, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ResearcherSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)