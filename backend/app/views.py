from json import JSONDecodeError
from django.http import JsonResponse
from .serializer import PublicationSerializer, ResearcherSerializer, ResearchProjectSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from .models import ResearchProject, Researcher, Publication
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist

class ResearchProjectView(APIView):
    
    serializer_class = ResearchProjectSerializer

    def get(self, request, pk=None, format=None):
        if pk is None:
            projects = ResearchProject.objects.all()
            serializer = ResearchProjectSerializer(projects, many=True)
            return Response(serializer.data)
        else:
            try:
                project = ResearchProject.objects.get(pk=pk)
                serializer = ResearchProjectSerializer(project)
                return Response(serializer.data)
            except ResearchProject.DoesNotExist:
                return Response({'message': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ResearchProjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        if pk is None:
            return Response({'message': 'Missing project ID!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            project = ResearchProject.objects.get(pk=pk)
            project.delete()
            return Response({'message': 'Project deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({'message': 'The project does not exist!'}, status=status.HTTP_404_NOT_FOUND)

class ResearcherView(APIView):
    serializer_class = ResearcherSerializer
    
    def get(self, request, pk=None, format=None):
        if pk is None:
            researchers = Researcher.objects.all()
            serializer = ResearcherSerializer(researchers, many=True)
            return Response(serializer.data)
        else:
            try:
                researcher = Researcher.objects.get(pk=pk)
                serializer = ResearcherSerializer(researcher)
                return Response(serializer.data)
            except Researcher.DoesNotExist:
                return Response({'message': 'Researcher not found'}, status=status.HTTP_404_NOT_FOUND)    
    
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ResearcherSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        if pk is None:
            return Response({'message': 'Missing researcher ID!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            researcher = Researcher.objects.get(pk=pk)
            researcher.delete()
            return Response({'message': 'Researcher deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Researcher.DoesNotExist:
            return Response({'message': 'The researcher does not exist!'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk=None):
        data = JSONParser().parse(request)
        try:
            researcher = Researcher.objects.get(pk=pk)
            serializer = ResearcherSerializer(researcher, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Researcher.DoesNotExist:
            return Response({'message': 'The researcher does not exist!'}, status=status.HTTP_404_NOT_FOUND)

class PublicationView(APIView):
    serializer_class = PublicationSerializer
    
    def get(self, request, pk=None, format=None):
        if pk is None:
            publications = Publication.objects.all()
            serializer = PublicationSerializer(publications, many=True)
            return Response(serializer.data)
        else:
            try:
                publication = Publication.objects.get(pk=pk)
                serializer = PublicationSerializer(publication)
                return Response(serializer.data)
            except Publication.DoesNotExist:
                return Response({'message': 'Publication not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = PublicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        if pk is None:
            return Response({'message': 'Missing publication ID!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            publication = Publication.objects.get(pk=pk)
            publication.delete()
            return Response({'message': 'Publication deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Publication.DoesNotExist:
            return Response({'message': 'The publication does not exist!'}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk=None):
        data = JSONParser().parse(request)
        try:
            publication = Publication.objects.get(pk=pk)
            serializer = PublicationSerializer(publication, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Publication.DoesNotExist:
            return Response({'message': 'The publication does not exist!'}, status=status.HTTP_404_NOT_FOUND)
