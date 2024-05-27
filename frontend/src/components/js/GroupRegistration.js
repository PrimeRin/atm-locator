import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomStepper from "./CustomStepper";
import RegisterForm from "./RegisterForm";
import { createAtm } from "../service/createAtm";
import { updateAtm } from "../service/updateAtm";
import Notice from "./Notice";

export default function GroupRegistration({ data }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showNotice, setShowNotice] = useState(false);
  const [notice, setNotice] = useState(null);
  const [type, setType] = useState("error");
  const [formData, setFormData] = useState({
    name: data ? data.name : "",
    location_name: data ? data.location_name : "",
    dzongkhag: data ? data.dzongkhag : "",
    gewog: data ? data.gewog : "",
    website: data ? data.website : "",
    email: data ? data.email : "",
    phone: data ? data.phone : "",
    service_status: data ? data.service_status : "",
    custom_time: data ? data.custom_time : "",
    latitude: data ? data.latitude : "",
    longitude: data ? data.longitude : "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  function handleStepper() {
    if (validateData()) {
      setPage(page + 1);
      setError(null);
    } else {
      setError("Please fill out all required fields.");
    }
  }

  function handleBack() {
    setPage(page - 1);
  }

  function validateData() {
    const requiredFields = [
      "name",
      "location_name",
      "dzongkhag",
      "gewog",
      "website",
      "email",
      "phone",
      "service_status",
    ];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        if (field === "service_status" && !formData["custom_time"]) {
          isValid = false;
        }
        isValid = false;
      }
    });

    return isValid;
  }

  console.log("form data", formData);

  function handleSubmit() {
    if (formData.latitude && formData.longitude) {
      setError(null);
      if (data) {
        updateAtm(data.id, formData)
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              setType("success");
              setNotice("ATM Updated Successfully!");
              setShowNotice(true);
              setTimeout(() => {
                navigate("/admin-atm-list");
                setPage(1);
                setFormData({
                  name: "",
                  location_name: "",
                  dzongkhag: "",
                  gewog: "",
                  website: "",
                  email: "",
                  phone: "",
                  service_status: "",
                  custom_time: "",
                  latitude: "",
                  longitude: "",
                });
              }, 2000);
            } else{
            setType("error");
            setShowNotice(true);
            setNotice(
              "There was an error updating the form. Please try again."
            );
            setTimeout(() => {
              setShowNotice(false);
              setPage(1);
            }, 2000);
            }
          })
          .catch((error) => {
            setType("error");
            setShowNotice(true);
            setNotice(
              "There was an error updating the form. Please try again."
            );
            setTimeout(() => {
              setShowNotice(false);
              setPage(1);
            }, 2000);
          });
      } else {
        createAtm(formData)
          .then((response) => {
            console.log("response", response);
            if (response.status >= 200) {
              setType("success");
              setNotice("ATM Created Successfully!");
              setShowNotice(true);
              setTimeout(() => {
                navigate("/admin-register-atm");
                setPage(1);
                setFormData({
                  name: "",
                  location_name: "",
                  dzongkhag: "",
                  gewog: "",
                  website: "",
                  email: "",
                  phone: "",
                  service_status: "",
                  custom_time: "",
                  latitude: "",
                  longitude: "",
                });
              }, 2000);
            }
            else{
              setType("error");
              setShowNotice(true);
              setNotice(
                "There was an error submitting the form. Please try again."
              );
              setTimeout(() => {
                setShowNotice(false);
                setPage(1);
              }, 2000);
            }
          })
          .catch((error) => {
            setType("error");
            setShowNotice(true);
            setNotice(
              "There was an error submitting the form. Please try again."
            );
            setTimeout(() => {
              setShowNotice(false);
              setPage(1);
            }, 2000);
          });
      }
    } else {
      setError("Please fill out all required fields.");
    }
  }

  function handleFormReset() {
    setFormData({
      name: data ? data.name : "",
      location_name: data ? data.location_name : "",
      dzongkhag: data ? data.dzongkhag : "",
      gewog: data ? data.gewog : "",
      website: data ? data.website : "",
      email: data ? data.email : "",
      phone: data ? data.phone : "",
      service_status: data ? data.service_status : "",
      custom_time: data ? data.custom_time : "",
      latitude: data ? data.latitude : "",
      longitude: data ? data.longitude : "",
    });
  }

  return (
    <>
      <CustomStepper page={page} />
      <RegisterForm
        page={page}
        onNext={handleStepper}
        onBack={handleBack}
        data={data}
        formData={formData}
        onType={handleInputChange}
        error={error}
        onSubmit={handleSubmit}
        formReset={handleFormReset}
      />
      <Notice type={type} message={notice} showNotice={showNotice} />
    </>
  );
}
