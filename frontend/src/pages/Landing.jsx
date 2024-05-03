import React from 'react'
import Layout from '../components/layout/Layout'
import BankInfo from '../components/js/BankInfo'
import Map from '../components/js/Map'
import FilterAtm from '../components/js/FilterAtm'

const LandingPage = () => {
  return (
    <Layout>
         <BankInfo/>
         <Map/>
         <FilterAtm/>
    </Layout>
  )
}

export default LandingPage