import graphene
from .inputs import ApplicationInput
from .types import ApplicationType
from api.models import ApplicationRequest,Reviewers
from api.constants import StatusChoices
from datetime import datetime
from api.graphql.helpers.save_application_helper import save_application_helper

# making graphql mutation

class CreateApplicationMutation(graphene.Mutation):
    class Arguments:
        input = ApplicationInput(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):
        requested_data = {
            "firstname": input.get("firstname"),
            "lastname": input.get("lastname"),
            "gender": input.get("gender"),
            "district": input.get("district"),
            "pin_code": input.get("pin_code"),
            "connection_type": input.get("connection_type"),
            "category": input.get("category"),
            "govt_id_type": input.get("govt_id_type"),
            "govt_id_number": input.get("govt_id_number"),
            "load_applied": input.get("load_applied"),
        }

        (success,message) = save_application_helper(requested_data)
        return CreateApplicationMutation(
            success=success
        )

class SaveReviewerActionMutation(graphene.Mutation):
    class Arguments: 
        application_id = graphene.String(required = True)
        reviewer_comment= graphene.String(required = False)
        status = graphene.String(required = False)
        load_applied = graphene.Int(required = False)
    success = graphene.Boolean()
    message = graphene.String()
    def mutate(self,info,application_id,reviewer_comment,status,load_applied):
        try:
            application = ApplicationRequest.objects.get(application_id=application_id)
            application.status = StatusChoices[status]
            application.reviewer_comment = reviewer_comment
            application.load_applied = load_applied
            if application.status == StatusChoices.COMPLETED:
                application.date_of_approval = datetime.now
            application.save() 
            return SaveReviewerActionMutation(success = True, message="Saved Successfully")
        except Exception as e:
            print(e)

class Mutation:
    save_application = CreateApplicationMutation.Field()
    save_reviewer_inputs = SaveReviewerActionMutation.Field()