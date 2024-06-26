from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from app.views import ResearchProjectViewSet, ResearcherViewSet, PublicationViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'researchers', ResearcherViewSet, basename='researcher')
router.register(r'project', ResearchProjectViewSet, basename='project')
router.register(r'publications', PublicationViewSet, basename='publication')

urlpatterns = router.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/v1/auth-token/', obtain_auth_token),

    path('api/v1/', include(router.urls)),
    
]