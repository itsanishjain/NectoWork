from django.db import models
from django.db.models.base import Model
from django.db.models.fields import related


# create solution model
class Solution(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=100, null=True, blank=True)
    value_proposition = models.TextField(null=True, blank=True)
    # deck = models.FileField(Media,null=True, blank=True)
    video = models.URLField(null=True, blank=True)
    # case_studies = models.FileField(null=True, blank=True)
    testimonials = models.FileField(null=True, blank=True)
    # image = models.OneToOneField(Image, related_name='model', on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return self.name


class DeckMedia(models.Model):
    solution = models.ForeignKey(Solution,on_delete=models.CASCADE, related_name='deck')
    name = models.CharField(max_length=255,blank=True, null=True)
    image = models.FileField(upload_to="solution/deck")
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)

    def get_image_url(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

    def __str__(self):
        return f"Solutions image {self.solution.name }"



class CaseStudieMedia(models.Model):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, related_name='casestudie')
    name = models.CharField(max_length=255,blank=True, null=True)
    image = models.FileField(upload_to="solution/casestudie")
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)

    def get_image_url(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

    def __str__(self):
        return f"Solutions image {self.solution.name }"


class TestimonialMedia(models.Model):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, related_name='testimonial')
    name = models.CharField(max_length=255,blank=True, null=True)
    image = models.FileField(upload_to="solution/testimonial")
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)

    def get_image_url(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

    def __str__(self):
        return f"Solutions image {self.solution.name }"


class Job(models.Model):
    summary = models.CharField(max_length=200)
    description = models.TextField(max_length=200)
    url = models.URLField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.summary
