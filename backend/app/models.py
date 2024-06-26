from django.db import models

class ResearchProject(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    project_manager = models.ForeignKey('Researcher', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Researcher(models.Model):
    name = models.CharField(max_length=255)
    specialty = models.CharField(max_length=255)
    projects = models.ManyToManyField(ResearchProject)
    
    def __str__(self):
        return self.name
    
class Publication(models.Model):
    title = models.CharField(max_length=255)
    abstract = models.TextField()
    project = models.ForeignKey(ResearchProject, on_delete=models.CASCADE)
    publication_date = models.DateField()
    
    def __str__(self):
        return self.title
