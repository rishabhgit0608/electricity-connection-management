import graphene

class ApplicationInput(graphene.InputObjectType):
    firstname = graphene.String()
    lastname = graphene.String()
    gender = graphene.String()
    district = graphene.String()
    pin_code = graphene.String()
    connection_type =graphene.String()
    category =graphene.String()
    govt_id_type =graphene.String()
    govt_id_number = graphene.String()
    load_applied = graphene.Int()