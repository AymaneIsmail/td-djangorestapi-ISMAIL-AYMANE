from json import JSONDecodeError
from django.http import JsonResponse
from .serializer import PublicationSerializer, ResearcherSerializer, ResearchProjectSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from .models import ResearchProject, Researcher, Publication
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ResearchProjectFilter, PublicationFilter, ResearcherFilter
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import viewsets

class ResearchProjectViewSet(viewsets.ModelViewSet):
    
    serializer_class = ResearchProjectSerializer
    queryset = ResearchProject.objects.all()
    serializer_class = ResearchProjectSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ResearchProjectFilter


class ResearcherViewSet(viewsets.ModelViewSet):
    queryset = Researcher.objects.all()
    serializer_class = ResearcherSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ResearcherFilter

class PublicationViewSet(viewsets.ModelViewSet):
    serializer_class = PublicationSerializer
    serializer_class = Publication
    filter_backends = (DjangoFilterBackend,)
    filterset_class = PublicationFilter
    
    
