import graphene
from graphene_django import DjangoObjectType
from api.models import ApplicationRequest,Reviewers

# defining model types here

class ReviewerType(DjangoObjectType):
    class Meta:
        model = Reviewers
        fields = "__all__"


class ApplicationType(DjangoObjectType):
    class Meta:
        model = ApplicationRequest
        fields = "__all__"