# Generated by Django 4.2.11 on 2024-03-15 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0016_alter_applicationrequest_date_of_approval"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="applicationrequest", name="date_of_approval",
        ),
    ]
