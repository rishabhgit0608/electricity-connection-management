# Generated by Django 4.2.11 on 2024-03-13 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicationrequest",
            name="category",
            field=models.CharField(
                choices=[("COMMERCIAL", "commercial"), ("RESIDENTIAL", "residential")],
                default="",
                max_length=11,
            ),
        ),
        migrations.AddField(
            model_name="applicationrequest",
            name="connection_type",
            field=models.CharField(
                choices=[("INDIVIDUAL", "individual"), ("JOINT", "joint")],
                default="",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="applicationrequest",
            name="district",
            field=models.CharField(
                choices=[
                    ("NORTH", "north"),
                    ("SOUTH", "south"),
                    ("EAST", "east"),
                    ("WEST", "west"),
                ],
                default="",
                max_length=11,
            ),
        ),
        migrations.AddField(
            model_name="applicationrequest",
            name="govt_id_number",
            field=models.CharField(default="", max_length=16),
        ),
        migrations.AddField(
            model_name="applicationrequest",
            name="govt_id_type",
            field=models.CharField(
                choices=[("AADHAR", "aadhar"), ("PAN", "pan"), ("DL", "DL")],
                default="",
                max_length=11,
            ),
        ),
        migrations.AddField(
            model_name="applicationrequest",
            name="load_applied",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="applicationrequest",
            name="pin_code",
            field=models.CharField(default="", max_length=11),
        ),
        migrations.AlterField(
            model_name="applicationrequest",
            name="firstname",
            field=models.CharField(default="", max_length=50),
        ),
        migrations.AlterField(
            model_name="applicationrequest",
            name="gender",
            field=models.CharField(
                choices=[("MALE", "male"), ("FEMALE", "female"), ("OTHERS", "others")],
                default="",
                max_length=11,
            ),
        ),
        migrations.AlterField(
            model_name="applicationrequest",
            name="lastname",
            field=models.CharField(default="", max_length=50),
        ),
    ]
