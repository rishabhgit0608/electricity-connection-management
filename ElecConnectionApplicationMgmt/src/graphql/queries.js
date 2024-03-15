import { gql } from "@apollo/client";
// defining graphql queries

export const FETCH_ALL_APPLICANTS = gql`
  query {
    allApplications {
      reviewer {
        reviewerName
      }
      status
      applicationId
      firstname
      lastname
      gender
      district
      connectionType
      category
      loadApplied
      pinCode
      govtIdType
      govtIdNumber
      reviewerComment
    }
  }
`;

export const FETCH_SEARCHED_APPLICANT = gql`
  query SEARCHED_RESULTS(
    $applicationId: String
    $fromDate: String
    $toDate: String
  ) {
    searchedResults(
      applicationId: $applicationId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      reviewer {
        reviewerName
      }
      status
      applicationId
      firstname
      lastname
      gender
      district
      connectionType
      category
      loadApplied
      pinCode
      govtIdType
      reviewerComment
      govtIdNumber
    }
  }
`;

export const FETCH_MONTH_ON_MONTH = gql`
  query {
    monthlyApplicationCounts {
      month
      count
    }
  }
`;
