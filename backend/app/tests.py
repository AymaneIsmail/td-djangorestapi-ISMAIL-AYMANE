from .models import Researcher
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status

class ResearcherTestCase(APITestCase):
    """
    Test module for Researcher model
    """
    def setUp(self):
        self.client = APIClient()
        self.data = {
            "name": "Test Researcher",
            "specialty": "Test Specialty"
        }
        self.url = '/api/v1/researchers/'  # Utilisez l'URL correcte

    def test_create(self):
        '''
        Ensure we can create a new Researcher object.
        '''
        response = self.client.post(self.url, self.data, format='vnd.api+json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Researcher.objects.count(), 1)
        self.assertEqual(Researcher.objects.get().name, 'Test Researcher')
        
    # def test_list(self):
    #     '''
    #     Ensure we can list all Researcher objects.
    #     '''
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 1)
    #     # self.assertEqual(response.data[0]['name'], 'Test Researcher')