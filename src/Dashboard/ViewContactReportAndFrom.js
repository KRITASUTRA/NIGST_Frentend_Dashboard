import { Button } from '@mui/material'
import React, { useState } from 'react'
import ViewContactFormReport from "./ViewContactFormReport"
import ContactUs from "./ContactUs"

export default function ViewContactReportAndFrom() {
    const [viewForm,setViewForm] = useState(false);

    function handleForm(){
        setViewForm(!viewForm);
    }
  return (
    <>
    <div style={{position:"absolute",right:"5px",top:"130px"}}>{viewForm ? <Button onClick={handleForm} variant='contained' sx={{bgcolor:"#1b3058",color:"white"}}>View Form</Button> : <Button onClick={handleForm} variant='contained' sx={{bgcolor:"#1b3058",color:"white"}}>View Enquiry</Button> }</div>
    {
        viewForm ? <ViewContactFormReport/> : <ContactUs/>
    }
    </>
  )
}
