from api.graphql.types import ApplicationType
import graphene
from api.models import ApplicationRequest
from api.constants import GenderChoices, ConnectionTypeChoices, DistrictChoices, GovtIdTypeChoices, CategoryChoices
from datetime import datetime

# making graphql Queries 

class FetchAllQuery(graphene.ObjectType):
    all_applications = graphene.List(ApplicationType)
    
    def resolve_all_applications(self, info):
        all_applications = ApplicationRequest.objects.all()
        print(all_applications[0].reviewer)
        return all_applications
        

class FetchSearchedQuery(graphene.ObjectType):
    searched_results = graphene.List(ApplicationType,applicationId = graphene.String(),fromDate = graphene.String(),toDate = graphene.String())

    def resolve_searched_results(self,info, **kwargs):
        applicationId = kwargs.get("applicationId")
        fromDate = kwargs.get("fromDate")
        toDate = kwargs.get("toDate")
        applications = ApplicationRequest.objects.all()
        if applicationId:
            applications=applications.filter(application_id=applicationId)
        if fromDate and toDate: 
            fromDate = datetime.strptime(fromDate, '%d-%m-%Y')
            toDate = datetime.strptime(toDate, '%d-%m-%Y')
            filtered_applications = []
            for application in applications:
                if application.date_of_application.timestamp() > fromDate.timestamp() and application.date_of_application.timestamp()<toDate.timestamp():
                    filtered_applications.append(application)
            applications = filtered_applications
        return applications
class MonthlyApplicationType(graphene.ObjectType):
    month = graphene.String()
    count = graphene.Int()

class MonthlyApplicationCount(graphene.ObjectType):
    monthly_application_counts = graphene.List(MonthlyApplicationType)

    def resolve_monthly_application_counts(self, info):
        current_month = datetime.now().month
        current_year = datetime.now().year

        monthly_counts = []
        for month in range(1, current_month + 1):
            count = ApplicationRequest.objects.filter(
                date_of_application__year=current_year,
                date_of_application__month=month
            ).count()
            month_name = datetime(current_year, month, 1).strftime("%B")
            monthly_counts.append(MonthlyApplicationType(month=month_name, count=count))

        return monthly_counts


