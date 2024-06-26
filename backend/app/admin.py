from django.contrib import admin
from .models import Researcher, ResearchProject, Publication

@admin.register(ResearchProject)
class ResearchProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'project_manager')
