"""d_rest_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.contrib import admin
from rest_framework import routers
from app.views import ResearchProjectView, ResearcherView, PublicationView
router = routers.DefaultRouter()

urlpatterns = router.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/v1/research_projects/', ResearchProjectView.as_view(), name='research_project'),
    path('api/v1/research_projects/<int:pk>/', ResearchProjectView.as_view(), name='research-project-detail'),
    
    path('api/v1/researchers/', ResearcherView.as_view(), name='researcher'),
    path('api/v1/researchers/<int:pk>/', ResearcherView.as_view(), name='researcher-detail'),
    
    path('api/v1/publications/', PublicationView.as_view(), name='publication'),
    path('api/v1/publications/<int:pk>/', PublicationView.as_view(), name='publication-detail'),
]