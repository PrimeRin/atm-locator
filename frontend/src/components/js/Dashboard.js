import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import SearchAtm from "./SearchAtm";
import AtmLists from "./AtmLists";
import Pagination from "./Pagination";

export default function Dashboard() {
  return (
    <Layout>
      <SearchAtm/>
      <AtmLists/>
    </Layout>
  );
}
