import blurhash
import numpy
import PIL.Image
import base64
from os import listdir, path
from django.core.management.base import BaseCommand
from lqip.models import LQIP
from io import BytesIO


class Command(BaseCommand):
    help = "Generate LQIP for all images in the media/assets directory. " \
           "LQIP images will be used in the frontend."

    def b64(self, src, size=128):
        if path.exists(src):
            src_path = path.realpath(src)
            src_path, ext = path.splitext(src_path)
            ext = ext[1:]
            if ext == 'jpg':
                ext = 'jpeg'
            ext_upper = ext.upper()
            # print(ext)
            # print(ext_upper)

            img_data = PIL.Image.open(src).convert("RGB")

            w, h = img_data.size
            aspect = w/h
            # print(aspect)
            if aspect > 1:
                w = size
                h = round(size/aspect)
            else:
                w = round(size*aspect)
                h = size
            # print(w, h)

            img_data = numpy.array(img_data)
            img_data = blurhash.encode(img_data)
            img_data = blurhash.decode(img_data, w, h)
            img_data = numpy.array(img_data).astype('uint8')
            img_data = PIL.Image.fromarray(img_data)

            buffered = BytesIO()
            img_data.save(buffered, format=ext_upper)
            img_data = base64.b64encode(buffered.getvalue())
            img_data = bytes(
                f"data:image/{ext};base64,",
                encoding='utf-8'
            ) + img_data
            img_data = img_data.decode("UTF-8")

            return img_data
        else:
            message = f"Path ({ src }) does not exist."
            self.stdout.write(
                self.style.ERROR(message)
            )

    def handle(self, *args, **options):
        types = ['blog', 'page']
        for t in types:
            # Import from either the articles or pages dir
            IMG_DIRECTORY = f'/app/backend/static/assets/img/{t}'

            self.stdout.write(
                self.style.NOTICE(
                    f"Importing type: {t}"
                )
            )

            # Loop through each file
            for directory in listdir(IMG_DIRECTORY):
                for filename in listdir(
                    path.join(
                        IMG_DIRECTORY,
                        directory
                    )
                ):
                    ext = path.splitext(filename)[1]
                    filepath = path.join(
                        IMG_DIRECTORY,
                        directory,
                        filename
                    )
                    print(ext)
                    if ext not in ['.svg']:
                        exists = LQIP.objects.filter(
                            image_filepath=filepath
                        ).exists()

                        if not exists:
                            b64_img = self.b64(filepath)

                            lqip, created = LQIP.objects.update_or_create(
                                image_filepath=filepath,
                                base64=b64_img
                            )

                            if created:
                                message = f"LQIP created: { filepath }"
                            else:
                                message = \
                                    f"LQIP creation failed ({ filepath })."
                            self.stdout.write(
                                self.style.SUCCESS(message)
                            )
                        else:
                            message = f"LQIP already exists: { filepath }"
                            self.stdout.write(
                                self.style.NOTICE(message)
                            )
                    else:
                        message = f"LQIP (svg): { filepath }"
                        self.stdout.write(
                            self.style.NOTICE(message)
                        )
