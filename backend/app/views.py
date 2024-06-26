from .serializer import PublicationSerializer, ResearcherSerializer, ResearchProjectSerializer
from .models import ResearchProject, Researcher, Publication
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ResearchProjectFilter, PublicationFilter, ResearcherFilter
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class ResearchProjectViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ResearchProjectSerializer
    queryset = ResearchProject.objects.all()
    serializer_class = ResearchProjectSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ResearchProjectFilter


class ResearcherViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Researcher.objects.all()
    serializer_class = ResearcherSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ResearcherFilter


class PublicationViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PublicationSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned publications to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Publication.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(author__username=username)
        return queryset
    
