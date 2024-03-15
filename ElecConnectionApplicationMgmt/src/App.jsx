import { useState } from "react";
import "./App.css";
import { useMutation } from "@apollo/client";
import { SAVE_APPLICATION } from "./graphql/mutations";
import Navbar from "./Components/Navbar";
import {
  AADHAR,
  APPLICANT_NAME,
  CATEGORY,
  COMMERCIAL,
  CONNECTION_PLACEHOLDER,
  CONNECTION_TYPE,
  DISTRICT,
  DRIVING_LICENCE,
  EAST,
  EXPECTED_LOAD,
  FEMALE,
  FIRST_AND_LAST_NAME,
  GENDER,
  GOVT_ID_NUMBER,
  GOVT_ID_TYPE,
  INDIVIDUAL,
  JOINT,
  MALE,
  NORTH,
  OTHER,
  PAN,
  PINCODE,
  RESIDENTIAL,
  SOUTH,
  SUBMIT,
  WEST,
} from "./assets/constants";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [district, setDistrict] = useState("North");
  const [ownership, setOwnership] = useState("Individual");
  const [pincode, setPincode] = useState("");
  const [category, setCategory] = useState("Commercial");
  const [idType, setIdType] = useState("Aadhar");
  const [idNumber, setIdNumber] = useState("");
  const [loadApplied, setLoadApplied] = useState(0);
  const [saveApplication, { error, loading }] = useMutation(SAVE_APPLICATION);

  if (loading) {
    return "Submitting";
  }
  if (error) {
    return "Submission error";
  }
  const handleOnClick = () => {
    // calling mutation to save the application to backend
    saveApplication({
      variables: {
        input: {
          firstname: firstName,
          lastname: lastName,
          gender: gender.toUpperCase(),
          district: district.toUpperCase(),
          connectionType: ownership.toUpperCase(),
          pinCode: pincode,
          category: category.toUpperCase(),
          govtIdType: idType.toUpperCase(),
          govtIdNumber: idNumber,
          loadApplied: loadApplied,
        },
      },
    });
  };
  // application form HTML JSX
  return (
    <>
      <Navbar />
      <div className="container">
        <form onSubmit={handleOnClick}>
          <div className="mb-3">
            <label className="form-label">{APPLICANT_NAME}</label>
            <div className="input-group">
              <span className="input-group-text">{FIRST_AND_LAST_NAME}</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div id="emailHelp" className="form-text">
              {CONNECTION_PLACEHOLDER}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">{GENDER}</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="Male">{MALE}</option>
              <option value="Female">{FEMALE}</option>
              <option value="Others">{OTHER}</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">{DISTRICT}</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              <option value="north">{NORTH}</option>
              <option value="south">{SOUTH}</option>
              <option value="east">{EAST}</option>
              <option value="west">{WEST}</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">{PINCODE}</label>
            <input
              type="text"
              aria-label="Pincode"
              className="form-control"
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{CONNECTION_TYPE}</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setOwnership(e.target.value)}
              required
            >
              <option value="solo">{INDIVIDUAL}</option>
              <option value="joint">{JOINT}</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">{CATEGORY}</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="commercial">{COMMERCIAL}</option>
              <option value="residential">{RESIDENTIAL}</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">{GOVT_ID_TYPE}</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setIdType(e.target.value)}
              required
            >
              <option value="aadhar">{AADHAR}</option>
              <option value="pan">{PAN}</option>
              <option value="DL">{DRIVING_LICENCE}</option>
            </select>
            <label>{GOVT_ID_NUMBER}</label>
            <input
              type="text"
              aria-label="Id number"
              className="form-control"
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{EXPECTED_LOAD}</label>
            <input
              type="text"
              aria-label="Id number"
              className="form-control"
              onChange={(e) => setLoadApplied(parseInt(e.target.value))}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {SUBMIT}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
