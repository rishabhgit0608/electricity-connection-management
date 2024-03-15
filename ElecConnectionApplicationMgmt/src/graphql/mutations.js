import { gql } from "@apollo/client";

// graph ql mutations are defined here

export const SAVE_APPLICATION = gql`
  mutation SAVE_APPLICATION($input: ApplicationInput!) {
    saveApplication(input: $input) {
      success
    }
  }
`;

export const SAVE_REVIEWER_ACTION = gql`
  mutation SAVE_REVIEWER_ACTION(
    $applicationId: String!
    $loadApplied: Int
    $reviewerComment: String
    $status: String
  ) {
    saveReviewerInputs(
      applicationId: $applicationId
      loadApplied: $loadApplied
      reviewerComment: $reviewerComment
      status: $status
    ) {
      success
    }
  }
`;
