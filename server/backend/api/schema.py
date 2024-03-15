import graphene
from api.graphql import queries, mutations
 

class Query(queries.FetchAllQuery,queries.FetchSearchedQuery, queries.MonthlyApplicationCount,graphene.ObjectType):
    pass

class Mutation(mutations.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query,mutation=Mutation)