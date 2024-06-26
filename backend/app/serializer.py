from rest_framework import serializers
from .models import Publication, Researcher, ResearchProject

class ResearcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Researcher
        fields = '__all__'

class ResearchProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchProject
        fields = ['title', 'description', 'start_date', 'end_date', 'project_manager']

    class Meta:
        model = ResearchProject
        fields = '__all__'  # This will now include 'project_manager' data

class PublicationSerializer(serializers.ModelSerializer):
    project = ResearchProjectSerializer(read_only=True)

    class Meta:
        model = Publication
        fields = ['id', 'title', 'abstract', 'project', 'publication_date']