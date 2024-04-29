import React, { useState } from "react";
import "./BankInfo.css";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";

export default function BankInfo() {
  return (
    <div className="bank-info-container">
      <span className="heading">RMA Bank Branches & ATM</span>
      <div className="bank-des-container">
        <span>
          These are comprehensive list of all ATMs in Bhutan aims to simplify
          the process of finding the nearest ATM or branch. By offering this
          information, both residents and tourists will enjoy convenient access
          to essential banking services. This endeavor not only enriches the
          overall banking experience but also promotes financial inclusivity and
          accessibility throughout the country.
        </span>
        <span className="sub-heading">Bank Branches</span>
        <span> List of Banks in Bhutan that provide ATM services:</span>
        <ul>
          <li>
            <a href="https://www.bob.bt/">Bank of Bhutan</a>
          </li>
          <li>
            <a href="https://bdb.bt/">Bhutan Development Bank Limited</a>
          </li>
          <li>
            <a href="https://bnb.bt/">Bhutan National Bank</a>
          </li>
          <li>
            <a href="https://drukpnbbank.bt/">Druk PNB Bank</a>
          </li>
          <li>
            <a href="https://www.digitalkidu.bt/">Digital Kidu Bank</a>
          </li>
        </ul>
        <span>
          For more detailed information, please click on the link provided
          above.
        </span>
        <span className="sub-heading">ATM Services</span>
        <span>
          ATM services in Bhutan offers convenient access to financial services
          for both residents and tourists. Major banks have established
          extensive ATM networks across major cities and towns, ensuring
          widespread availability. These ATMs provide a range of services,
          including cash withdrawals, balance inquiries, accessible 24/7 for
          customer convenience.
        </span>
        <span className="atm-service">
          Security measures such as CCTV surveillance and PIN authentication are
          implemented to safeguard transactions. Tourists visiting Bhutan also
          benefit from these services, allowing them to withdraw the local
          currency, the Bhutanese Ngultrum (BTN), easily. As digital banking
          services continue to expand, ATM networks in Bhutan are expected to
          grow and enhance their services to meet the evolving needs of
          customers.
        </span>
      </div>
    </div>
  );
}
