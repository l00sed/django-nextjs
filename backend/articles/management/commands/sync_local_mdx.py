import frontmatter
import datetime
import pytz
from os.path import join, dirname, abspath
from os import listdir
from django.utils import timezone
from django.core.management.base import BaseCommand
from articles.models import Article


class Command(BaseCommand):
    help = "Imports and syncs all local .mdx files as Article objects, " \
           "using the front-matter meta data for Django fields."

    def handle(self, *args, **options):
        types = ['page', 'blog']
        for t in types:
            # Import from either the articles or pages dir
            MDX_DIRECTORY = join(
                abspath(dirname(__name__)),
                '..',
                f'frontend/src/mdx/{t}'
            )

            self.stdout.write(
                self.style.NOTICE(
                    f"Importing type: {t}"
                )
            )

            # Loop through each file
            for filename in listdir(MDX_DIRECTORY):
                filepath = join(MDX_DIRECTORY, filename)
                file = frontmatter.load(filepath)
                valid = True
                keys = [
                    'title',
                    'author',
                    'description',
                    'slug',
                    'created_at',
                    'updated_at',
                    'featured_image',
                    'image_alt',
                    'content_type'
                ]

                for key in keys:
                    if key not in file.keys():
                        valid = False

                if valid:
                    defaults = {
                        "title": file['title'],
                        "author": file['author'],
                        "description": file['description'],
                        "slug": file['slug'],
                        "created_at": pytz.utc.localize(
                            datetime.datetime.strptime(
                                file['created_at'], '%m/%d/%Y %H:%M:%S'
                            )
                        ),
                        "updated_at": pytz.utc.localize(
                            datetime.datetime.strptime(
                                file['updated_at'], '%m/%d/%Y %H:%M:%S'
                            )
                        ),
                        "featured_image": f"\
                            uploads/\
                            {t}/\
                            {file['slug']}/\
                            {file['featured_image']}",
                        "image_alt": file['image_alt'],
                        "content": file,
                        "content_type": file['content_type']
                    }
                    Article.objects.update_or_create(
                        slug=file['slug'],
                        defaults=defaults
                    )
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"Successfully saved or updated {file['slug']}"
                        )
                    )
