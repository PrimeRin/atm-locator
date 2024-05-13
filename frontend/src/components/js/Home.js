import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
} from "recharts";
import AtmHeader from "./AtmHeader";

function Home() {
  const data = [
    { street: "Bumthang", vehicles: 16 },
    { street: "Chhukha", vehicles: 34 },
    { street: "Dagana", vehicles: 40 },
    { street: "Gasa", vehicles: 16 },
    { street: "Haa", vehicles: 94 },
    { street: "Lhuntse", vehicles: 16 },
    { street: "Mongar", vehicles: 51 },
    { street: "Paro", vehicles: 47 },
    { street: "Pemagatshel", vehicles: 84 },
    { street: "Punakha", vehicles: 43 },
    { street: "Samdrup Jongkhar", vehicles: 27 },
    { street: "Samtse", vehicles: 88 },
    { street: "Sarpang", vehicles: 14 },
    { street: "Thimphu", vehicles: 53 },
    { street: "Trashigang", vehicles: 55 },
    { street: "Trashiyangtse", vehicles: 83 },
    { street: "Trongsa", vehicles: 33 },
    { street: "Tsirang", vehicles: 52 },
    { street: "Wangdue Phodrang", vehicles: 99 },
    { street: "Zhemgang", vehicles: 79 },
  ];
  console.log(data);

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
        <div className="card">
          <div className="card-inner">
            <h3>BANK OF BHUTAN(BoB)</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>

          <div className="atm-count-con">
            <h5>ATM COUNT</h5>
            <h1>107</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>BHUTAN NATIONAL BANK(BNB)</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <div className="atm-count-con">
            <h5>ATM COUNT</h5>
            <h1>12</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>DRUK PNB BANK</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <div className="atm-count-con">
            <h5>ATM COUNT</h5>
            <h1>122</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>T-BANK</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <div className="atm-count-con">
            <h5>ATM COUNT</h5>
            <h1>44</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>DK BANK</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <div className="atm-count-con">
            <h5>ATM COUNT</h5>
            <h1>33</h1>
          </div>
        </div>
      </div>

      <div className="charts">
        <h2>Number of ATMs in Each Dzongkhag</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="street" name="Street" angle={-20} interval={0} textAnchor="end"/>
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
            <Bar dataKey="vehicles" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
