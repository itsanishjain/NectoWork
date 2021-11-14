from django.contrib import admin

# import solution and job model
from .models import Solution, Job, DeckMedia,TestimonialMedia,CaseStudieMedia

# register solution and job model
admin.site.register(Solution)
admin.site.register(Job)
admin.site.register(DeckMedia)
admin.site.register(TestimonialMedia)
admin.site.register(CaseStudieMedia)
