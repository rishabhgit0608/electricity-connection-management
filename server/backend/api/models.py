from django.db import models
from api.constants import GenderChoices,DistrictChoices,ConnectionTypeChoices,CategoryChoices,GovtIdTypeChoices,StatusChoices
from datetime import datetime
from datetime import timezone

# defining models here 

class Reviewers(models.Model):
    reviewer_name = models.CharField(max_length = 50)
    reviewer_age = models.IntegerField()
    
    def __str__(self):
        return self.reviewer_name
    def count_in_progress_applications(self):
        return self.applicationrequest_set.filter(status=StatusChoices.IN_PROGRESS).count()



class ApplicationRequest(models.Model):
    application_id = models.CharField(max_length = 50)
    reviewer = models.ForeignKey(Reviewers,on_delete = models.CASCADE, null = True)
    firstname = models.CharField(max_length = 50, default = "")
    lastname = models.CharField(max_length = 50,default = "")
    gender = models.CharField(max_length=10, choices=GenderChoices.choices)    
    district = models.CharField(max_length=10, choices=DistrictChoices.choices)    
    pin_code = models.CharField(max_length = 11,default = "")
    connection_type = models.CharField(max_length=10, choices=ConnectionTypeChoices.choices)  
    date_of_application = models.DateTimeField(default = datetime.now)  
    category = models.CharField(max_length=12, choices=CategoryChoices.choices)   
    govt_id_type = models.CharField(max_length=10, choices=GovtIdTypeChoices.choices)    
    govt_id_number = models.CharField(max_length = 16,default = "100")
    load_applied = models.IntegerField(default= 0)
    status = models.CharField(choices = StatusChoices.choices,max_length = 50)
    reviewer_comment = models.CharField(default = "",max_length= 250)
    

    def __str__(self):
        return self.firstname
    


    
    

    