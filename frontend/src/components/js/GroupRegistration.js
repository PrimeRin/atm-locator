import React, { useState } from "react";
import CustomStepper from "./CustomStepper";
import RegisterForm from "./RegisterForm";

export default function GroupRegistration({data}) {
  const [page, setPage] = useState(1);

  function handleStepper() {
    setPage(page + 1);
  }

  function handleBack() {
    setPage(page - 1);
  }

  return (
    <>
      <CustomStepper page={page} />
      <RegisterForm page={page} onNext={handleStepper} onBack={handleBack} data={data}/>
    </>
  );
}
