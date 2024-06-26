import django_filters
from .models import ResearchProject, Publication, Researcher

class ResearchProjectFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name="start_date", lookup_expr='exact')
    end_date = django_filters.DateFilter(field_name="end_date", lookup_expr='lte')
    researcher = django_filters.CharFilter(field_name="researcher__name", lookup_expr='icontains')
    title = django_filters.CharFilter(field_name="title", lookup_expr='icontains')

    class Meta:
        model = ResearchProject
        fields = ['start_date', 'end_date', 'researcher', 'title']

class PublicationFilter(django_filters.FilterSet):
    date_published = django_filters.DateFilter(field_name="date_published", lookup_expr='gte')
    researcher = django_filters.CharFilter(field_name="researchers__name", lookup_expr='icontains')
    project_title = django_filters.CharFilter(field_name="research_project__title", lookup_expr='icontains')

    class Meta:
        model = Publication
        fields = ['date_published', 'researcher', 'project_title']
        
class ResearcherFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name="name", lookup_expr='icontains')
    specialty = django_filters.CharFilter(field_name="specialty", lookup_expr='icontains')

    class Meta:
        model = Researcher
        fields = ['name', 'specialty']