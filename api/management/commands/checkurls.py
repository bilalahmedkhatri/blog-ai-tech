import requests
from django.core.management.base import BaseCommand
from api.models import BlogPost


class Command(BaseCommand):
    help = 'Checks if URLs in BlogPost are valid and updates their status'

    def handle(self, *args, **kwargs):
        urls = BlogPost.objects.values_list('featured_image', flat=True)

        for url in urls:
            try:
                response = requests.get(url, timeout=10, stream=True)

                if response.status_code == 200 and 'image/' in response.headers.get('Content-Type', ''):
                    BlogPost.objects.filter(featured_image=url).update(
                                blog_featured_image=url)
                else:
                    BlogPost.objects.filter(featured_image=url).update(
                                blog_featured_image='')

            except requests.exceptions.RequestException as e:
                print('failed', url, e)


        self.stdout.write(self.style.SUCCESS('Successfully updated URL statuses'))