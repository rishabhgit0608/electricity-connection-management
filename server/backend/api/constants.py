from enum import Enum
from django.db import models
MALE = "Male"
FEMALE = "Female"
OTHERS = "Others"
NORTH = "North"
SOUTH = "South"
EAST = "East"
WEST = "West"
INDIVIDUAL = "Individual"
JOINT = "Joint"
COMMERCIAL = "Commercial"
RESIDENTIAL = "Residential"
AADHAR = "Aadhar"
PAN = "PAN"
DL = "DL"
IN_PROGRESS = "In-Progress"
COMPLETED = "Completed"
PENDING = "Pending"
CONNECTION_RELEASED = "Connection Released"

class GenderChoices(models.TextChoices):
    MALE = MALE, "Male"
    FEMALE = FEMALE , "Female"
    OTHERS = OTHERS, "Others"

class DistrictChoices(models.TextChoices):
    NORTH = NORTH,"North"
    SOUTH = SOUTH,"South"
    EAST = EAST,"East"
    WEST = WEST,"West"

class ConnectionTypeChoices(models.TextChoices):
    INDIVIDUAL = INDIVIDUAL,"Individual"
    JOINT = JOINT,"Joint"

class CategoryChoices(models.TextChoices):
    COMMERCIAL = COMMERCIAL,"Commercial"
    RESIDENTIAL = RESIDENTIAL,"Residential" 

class GovtIdTypeChoices(models.TextChoices):
    AADHAR = AADHAR,"Aadhar"
    PAN = PAN,"PAN"
    DL = DL,"DL"

class StatusChoices(models.TextChoices):
    IN_PROGRESS = IN_PROGRESS, "In-Progress"
    COMPLETED = COMPLETED, "Completed"
    PENDING = PENDING, "Pending",
    CONNECTION_RELEASED = CONNECTION_RELEASED , "Connection Released"
