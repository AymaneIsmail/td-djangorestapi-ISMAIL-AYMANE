from django.contrib import admin
from .models import Researcher, ResearchProject, Publication

@admin.register(ResearchProject)
class ResearchProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'project_manager')
    
@admin.register(Researcher)
class ResearcherAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialty')
    
@admin.register(Publication)
class Publication(admin.ModelAdmin):
    list_display = ('title', 'publication_date', 'project')
    
