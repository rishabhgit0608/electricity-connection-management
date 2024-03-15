import { useEffect, useState } from "react";
import { Table, Input, Tag } from "antd";
import {
  FETCH_ALL_APPLICANTS,
  FETCH_SEARCHED_APPLICANT,
} from "../graphql/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, DatePicker } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "./common.css";
import dayjs from "dayjs";
import { colorpicker, statusChoiceUser } from "../assets/constants";
import { ActionsModal } from "./ActionsModal";
import Navbar from "./Navbar";
const { RangePicker } = DatePicker;
const Dashboard = () => {
  const { data } = useQuery(FETCH_ALL_APPLICANTS);
  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [getData] = useLazyQuery(FETCH_SEARCHED_APPLICANT);
  useEffect(() => {
    setDataSource(data?.allApplications);
  }, [data]);
  const columns = [
    {
      title: "Application ID",
      dataIndex: "applicationId",
      key: "applicationId",
    },
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "name",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Ownership",
      dataIndex: "connectionType",
      key: "connectionType",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Load Applied",
      dataIndex: "loadApplied",
      key: "loadApplied",
    },

    {
      title: "Pincode",
      dataIndex: "pinCode",
      key: "pinCode",
    },
    {
      title: "Govt ID Type",
      dataIndex: "govtIdType",
      key: "govtIdType",
    },
    {
      title: "Govt ID Number",
      dataIndex: "govtIdNumber",
      key: "govtIdNumber",
    },
    {
      title: "Reviewer name",
      dataIndex: "reviewer",
      key: "reviewerName",
      render: (data) => {
        return <b>{data?.reviewerName}</b>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "In Progress", value: "IN_PROGRESS" },
        { text: "Pending", value: "PENDING" },
        { text: "Approved", value: "COMPLETED" },
        { text: "Connection Released", value: "CONNECTION_RELEASED" },
      ],
      onFilter: (value, record) => {
        return record?.status === value;
      },
      render: (data) => {
        return <Tag color={colorpicker[data]}>{statusChoiceUser[data]}</Tag>;
      },
    },
    {
      title: "Actions Modal",
      key: "actionsModal",
      render: (data) => {
        return (
          <SettingOutlined
            onClick={() => {
              setOpenModal(true);
              setCurrentData(data);
            }}
            className="settings_outlined"
          />
        );
      },
    },
  ];
  const handleSearch = () => {
    getData({
      variables: {
        applicationId: applicationId,
        fromDate: fromDate,
        toDate: toDate,
      },
    }).then((res) => setDataSource(res.data.searchedResults));
  };
  const handleOnChangeDateRange = (datesArray) => {
    const fromDate = dayjs(datesArray[0]).format("DD-MM-YYYY");
    const toDate = dayjs(datesArray[1]).format("DD-MM-YYYY");
    setFromDate(fromDate);
    setToDate(toDate);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="search_functionality">
          <Input
            placeholder="Search for Application ID"
            onChange={(e) => setApplicationId(e.target.value)}
            value={applicationId}
          />
          <div className="search_functionality__datepicker">
            <RangePicker onChange={handleOnChangeDateRange} />
          </div>
          <Button
            className="search_functionality__btn"
            type="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        <Table columns={columns} dataSource={dataSource} />
      </div>

      <ActionsModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        currentData={currentData}
        setDataSource={setDataSource}
        dataSource={dataSource}
      />
    </>
  );
};
export default Dashboard;
