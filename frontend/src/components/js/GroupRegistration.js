import React, { useState } from "react";
import CustomStepper from "./CustomStepper";
import RegisterForm from "./RegisterForm";
import { createAtm } from "../service/createAtm";

export default function GroupRegistration({ data }) {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
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
      setError('Please fill out all required fields.');
    }
  }

  function handleBack() {
    setPage(page - 1);
  }

  function validateData() {
    const requiredFields = ['name', 'location_name', 'dzongkhag', 'gewog', 'website', 'email', 'phone', 'service_status'];
    let isValid = true;
  
    requiredFields.forEach(field => {
      if (!formData[field]) {
        if (field === 'service_status' &&  !formData['custom_time']){
          isValid = false;
        }
        isValid = false;
      }
    });
  
    return isValid;
  }

  function handleSubmit(){
    if (formData.latitude && formData.longitude) {
      setError(null);
      createAtm(formData)
     .then(response => {
        console.log("Form submitted successfully:", response);
      })
     .catch(error => {
        console.error("Error submitting form:", error);
        setError('There was an error submitting the form. Please try again.');
      });
    }
    else{
      setError('Please fill out all required fields.');
    }
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
        error = {error}
        onSubmit = {handleSubmit}
      />
    </>
  );
}
