from api.models import ApplicationRequest,Reviewers
import logging
from api.constants import GenderChoices,DistrictChoices,ConnectionTypeChoices,CategoryChoices,GovtIdTypeChoices, StatusChoices
import random
import string
logger = logging.getLogger(__name__)



def get_reviewer_with_least_applications():
        reviewers = Reviewers.objects.all()
        least_applications = float('inf')
        least_applications_reviewer = None
        
        for reviewer in reviewers:
            in_progress_count = reviewer.count_in_progress_applications()
            if in_progress_count < least_applications:
                least_applications = in_progress_count
                least_applications_reviewer = reviewer
        
        return least_applications_reviewer


def save_application_helper(requested_data):
    try:
        application_id = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
        firstname = requested_data["firstname"]
        lastname =requested_data["lastname"]
        gender = GenderChoices[requested_data["gender"]]
        district = DistrictChoices[requested_data["district"]]
        pin_code = requested_data["pin_code"]
        connection_type = ConnectionTypeChoices[requested_data["connection_type"]]
        category =CategoryChoices[requested_data["category"]]
        govt_id_type =  GovtIdTypeChoices[requested_data["govt_id_type"]]
        govt_id_number = requested_data["govt_id_number"]
        load_applied = requested_data["load_applied"]
        status = StatusChoices.IN_PROGRESS
        if ApplicationRequest.objects.filter(govt_id_number = govt_id_number).exists():
            return False, "Application Already exists or has been resolved"
        reviewer = get_reviewer_with_least_applications()
        application = ApplicationRequest.objects.create(reviewer = reviewer, application_id=application_id,firstname = firstname, lastname = lastname, gender = gender, district = district, pin_code = pin_code, connection_type = connection_type, category = category,
                                          govt_id_number = govt_id_number, govt_id_type = govt_id_type, load_applied = load_applied, status=status )
        application.save()
        return True, "Application was saved successfully"
        
    except Exception as e:
        logger.exception(e)
        