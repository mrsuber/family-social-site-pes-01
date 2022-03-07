import React,{useEffect, useState} from 'react'
import {Social2Header,Pagination,Table} from '../../../../components'
import './FamilyHome.css'
import axios from 'axios'
import portfolio from '../../../../data/portfolio'



const FamilyHome = () => {
  const [info, setInfo] = useState([]);




  return (
    <>

    <section className="social2__main_family">


        <div className="table__constainer">
        <h1 className="text-primary mb-3">Display Phase one with pagination</h1>

        </div>

    </section>
    </>
  )
}

export default FamilyHome
