/* eslint-disable react/prop-types */
import { Modal, Select, Input, Alert } from "antd";
import {
  APPLICANT_NAME,
  CATEGORY,
  CONNECTION_TYPE,
  DISTRICT,
  EXPECTED_LOAD,
  FIRST_AND_LAST_NAME,
  GENDER,
  GOVT_ID_TYPE_AND_NUMBER,
  PINCODE,
  statusChoice,
} from "../assets/constants";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_REVIEWER_ACTION } from "../graphql/mutations";
const { TextArea } = Input;

//actions modal on handling user action towards applications

export const ActionsModal = ({ openModal, setOpenModal, currentData }) => {
  const [loadApplied, setLoadApplied] = useState();
  const [reviewersComment, setReviewersComment] = useState("");
  const [status, setStatus] = useState("");
  const [saveApplication] = useMutation(SAVE_REVIEWER_ACTION);

  useEffect(() => setLoadApplied(currentData?.loadApplied), [currentData]);
  const handleSubmitReviewer = () => {
    // calling mutation to save the reviewer action
    saveApplication({
      variables: {
        applicationId: currentData?.applicationId,
        loadApplied: loadApplied ? loadApplied : currentData?.loadApplied,
        status: status ? statusChoice[status] : currentData?.status,
        reviewerComment: reviewersComment
          ? reviewersComment
          : currentData?.reviewerComment,
      },
    });
    setOpenModal(false);
    window.location.reload();
  };
  // HTML JSX for actions modal handled by a state variable OpenModal taken care in parent component
  return (
    <Modal
      open={openModal}
      onCancel={() => setOpenModal(false)}
      title="Actions Modal"
      className="dashboard__modal"
      okButtonProps={loadApplied > 200 && { disabled: true }}
      onOk={handleSubmitReviewer}
    >
      <div className="mb-3">
        <label className="form-label">{APPLICANT_NAME}</label>
        <div className="input-group">
          <span className="input-group-text">{FIRST_AND_LAST_NAME}</span>
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            disabled
            value={currentData?.firstname}
          />
          <input
            type="text"
            aria-label="Last name"
            className="form-control"
            disabled
            value={currentData?.lastname}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{GENDER}</label>
          <input
            type="text"
            aria-label="gender"
            className="form-control"
            disabled
            value={currentData?.gender}
          />
          <label className="form-label">{DISTRICT}</label>
          <input
            type="text"
            aria-label="district"
            className="form-control"
            disabled
            value={currentData?.district}
          />
          <label className="form-label">{CONNECTION_TYPE}</label>
          <input
            type="text"
            aria-label="ownership"
            className="form-control"
            disabled
            value={currentData?.connectionType}
          />
          <label className="form-label">{CATEGORY}</label>
          <input
            type="text"
            aria-label="category"
            className="form-control"
            disabled
            value={currentData?.category}
          />
          <label className="form-label">{EXPECTED_LOAD}</label>
          <input
            type="number"
            aria-label="load"
            className="form-control"
            defaultValue={currentData?.loadApplied}
            onChange={(e) => {
              setLoadApplied(parseInt(e.target.value));
            }}
          />
          {loadApplied && loadApplied > 200 && (
            <Alert type="error" message="You are beyond the 200 limit"></Alert>
          )}
          <label className="form-label">{PINCODE}</label>
          <input
            type="text"
            aria-label="pinCode"
            className="form-control"
            disabled
            value={currentData?.pinCode}
          />
          <label className="form-label">{GOVT_ID_TYPE_AND_NUMBER}</label>
          <div className="input-group">
            <input
              type="text"
              aria-label="govtIdType"
              className="form-control"
              disabled
              value={currentData?.govtIdType}
            />
            <input
              type="text"
              aria-label="govtIdNumber"
              className="form-control"
              disabled
              value={currentData?.govtIdNumber}
            />
          </div>
          <div className="reviewers_actions">
            <div className="dashboard_textarea">
              <TextArea
                onChange={(e) => setReviewersComment(e.target.value)}
                placeholder="Enter Reviewer's comment"
                defaultValue={currentData?.reviewerComment}
              />
            </div>
            <div className="status_change_select">
              <Select
                onChange={(e) => setStatus(e)}
                defaultValue={statusChoice[currentData?.status]}
                options={[
                  { value: "PENDING", label: "Pending" },
                  { value: "IN_PROGRESS", label: "In Progress" },
                  { value: "COMPLETED", label: "Approved" },
                  {
                    value: "CONNECTION_RELEASED",
                    label: "Connection released",
                  },
                ]}
              ></Select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
