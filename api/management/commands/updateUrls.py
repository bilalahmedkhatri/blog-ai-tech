import random
import shutil
from django.utils import timezone
from django.db.models import Q
from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand
from api.models import BlogPost

import os
from django.conf import settings


class Command(BaseCommand):
    help = 'Checks if URLs in BlogPost are incomplate then add domain to complate full address of image'

    def add_arguments(self, parser):
        parser.add_argument('take_img', type=str, help='get images from Directory')
        parser.add_argument('save_img', type=str, help='sage images in Directory')
        
    def handle(self, *args, **kwargs):
        
        take_img = kwargs["take_img"]
        save_img = kwargs["save_img"]
        
        image_path = os.path.join(settings.MEDIA_ROOT, save_img)
        # os.makedirs(image_path, exist_ok=True)

        if not os.path.exists(image_path):
            self.stdout.write(self.style.ERROR(f"Directory {image_path} does not exist."))
            return
        
        domain = Site.objects.get_current().domain
        
        directories = [d for d in os.listdir() if os.path.isdir(d) and d == take_img]
        file_list = os.listdir(directories[0])
        image_file = []
        for dir in file_list:
            img_dir = os.path.join(settings.BASE_DIR, directories[0], dir)
            for file in os.listdir(img_dir):
                for format in ['.jpg', '.png', '.jpeg']:
                    if file.endswith(format):
                        shutil.copy(os.path.join(img_dir, file), image_path)
                        full_file_path = f"http://{domain}{settings.MEDIA_URL}{save_img}/{file}"
                        image_file.append(full_file_path)
        last_hour = timezone.now() - timezone.timedelta(hours=1)
        # check_url = BlogPost.objects.filter(Q(blog_featured_image__isnull=True) | Q(blog_featured_image=''))
        check_url = BlogPost.objects.filter(updated_at__gte=last_hour)
        print(check_url)
        for post in check_url:
            random_image = random.choice(image_file)
            print(random_image)
            post.blog_featured_image = random_image
            post.save()
        
        self.stdout.write(self.style.SUCCESS('Successfully updated URL address'))