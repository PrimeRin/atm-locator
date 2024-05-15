import React, { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import AtmHeader from "./AtmHeader";
import { atmCount } from "../service/atmCount";

function Home() {
  const [bankATMCount, setBankATMCount] = useState([])
  const [dzongATMCount, setDzongATMCount] = useState([])
  const bankFullName = {
    BOB: 'Bank of Bhutan(Bob)',
    BNB: 'Bhutan National Bank(BNB)',
    DPNB: 'Druk PNB Bank(DPNB)',
    DK: 'Digital Kidu Bank(DK)',
    TB: 'T Bank(TB)',
    BDBL: 'Bhutan Development Bank Limited'
  }

  useEffect(() => {
    atmCount('bank')
    .then(data => {
        const filteredData = data.filter(item => item.bank_category!== 'DK');
        setBankATMCount(filteredData);
     })
    .catch(error => {
        console.error('Failed to fetch bank ATM counts:', error);
     });

    atmCount('dzongkhag')
    .then(data => {
        setDzongATMCount(data);
     })
    .catch(error => {
        console.error('Failed to fetch dzongkhag ATM counts:', error);
     });
  }, []);

  const transformedData = dzongATMCount.map(item => ({
    dzongkhag: item.dzongkhag, 
    count: item.count 
  }));

  console.log(dzongATMCount);
  console.log(transformedData);
  

  return (
    <main className="main-container">
      <AtmHeader
        showDropdown={false}
        onSelect={() => {}}
        showWarning={false}
        onDelete={() => {}}
        onCancel={() => {}}
        onDeleteConfirm={() => {}}
        text={"DASHBOARD"}
        showThreeDot={false}
      />

      <div className="main-cards">

      {bankATMCount.map((item, index) => (
          <div key={index} className="card">
            <div className="card-inner">
              <h3>{bankFullName[item.bank_category]}</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>

            <div className="atm-count-con">
              <h5>ATM COUNT</h5>
              <h1>{item.count}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="charts">
        <h2>Number of ATMs in Each Dzongkhag</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={transformedData}
            margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dzongkhag" name="dzongkhag" angle={-20} interval={0} textAnchor="end"/>
            <YAxis>
              <Label
                value="Number Of ATM"
                position="insideLeft"
                angle={-90}
                offset={0}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
