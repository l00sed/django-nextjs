from django.conf import settings

from django.core.management.base import BaseCommand
from authentication.models import Account


class Command(BaseCommand):
    help = "Sets up an initial superuser admin. Should only be used once " \
           "upon setting up a new server. The admin should then immediately login " \
           "and change his or her password."

    def handle(self, *args, **options):
        if Account.objects.count() == 0:
            for user in settings.ADMINS:
                username = user[0].replace(' ', '')
                email = user[1]
                password = 'admin'
                print('Creating account for %s (%s)' % (username, email))
                admin = Account.objects.create_superuser(email=email, username=username, password=password)
                admin.is_active = True
                admin.is_admin = True
                admin.save()
        else:
            print('Admin accounts can only be initialized if no Accounts exist')
