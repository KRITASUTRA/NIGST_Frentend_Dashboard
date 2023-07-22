import { Alert, Button, CircularProgress, Switch } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import {FiLink} from 'react-icons/fi'



export default function CreateFooter() {
    const [responseCircular, setCircularResponse] = useState(false);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteError, setDeleteAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [type,setType] = useState("");
    const [name,setName] = useState("");
    const [link,setLink] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [viewData, setViewData] = useState([]);
    const [viewForm, setViewForm] = useState(true);
    const [id, setId] = useState("");
    const [editForm,setEditFromButton] = useState(false);


    function handleViewForm(){
        setViewForm(!viewForm);
        setEditFromButton(false);
    }
    function handleEditForm(data){
        setViewForm(true);
        setEditFromButton(true);
        setLink(data.link);
        setPhone(data.phone);
        setEmail(data.email);
        setName(data.name);
        setAddress(data.address);
        setId(data.footer_id)
    }

    useEffect(() => {
        viewProject();
    }, [])

    function handleSubmit() {
        setCircularResponse(true);
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/footer_create";
        const data={
            name,
            link,
            type,
            phone,
            email,
            address
        }
        axios.post(url, data).then((res) => {
            if (res.data.message === "Successfully Created!") {
                document.getElementById('form').reset()
                setName("");
                setLink("");
                setPhone("");
                setEmail("");
                setAddress("");
                viewProject();
                
                setCircularResponse(false);
                setSuccessAlert(true);
                setTimeout(() => {
                    setSuccessAlert(false);
                }, 5000);
                return;
            }

        }).catch((error) => {
            setCircularResponse(false);
            if (error.response.data.message === "Type is required") {
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false);
                }, 5000);
                return;
            }

        })
    }

    function handleEdit() {
        setCircularResponse(true);
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/footer_update";
        const data={
            name,
            link,
            type,
            phone,
            email,
            address,
            footer_id:id
        }
        axios.patch(url, data).then((res) => {
            if (res.data.message === "Successfully Updated!") {
                document.getElementById('form').reset()
                viewProject();
                setCircularResponse(false);
                setUpdateAlert(true);
                setTimeout(() => {
                    setUpdateAlert(false)
                }, 5000);
                return;
            }

        }).catch((error) => {
            setCircularResponse(false);
            if (error.response.data.message === "Data Already Exist!") {
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false);
                }, 5000);
                return;
            }

        })
    }

    function viewProject() {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/footer_view";
        axios.get(url).then((res) => {
            setViewData(res.data.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    function handleDelete(id) {
        console.log(id);
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/footer_delete";
        axios.delete(url, { data: { footer_id: id } }).then((res) => {
            if (res.data.message === "Successfully Deleted!") {
                viewProject()
                setDeleteAlert(true);
                setTimeout(() => {
                    setDeleteAlert(false);
                }, 5000);
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    function handleStatusTrue(id) {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_footer";
        const data = {
            Fid:id,
            Fvisible:true
        }
        axios.patch(url, data).then((res) => {
            viewProject();
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
            console.log(res)
        }).catch((error) => {
            console.log(error)
            // setErrorAlert(true);
            //   setTimeout(() => {
            //       setErrorAlert(false);
            //   }, 5000);
            //   return;
        })
    }
    function handleStatusFalse(id) {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_footer";
        const data = {
            Fid:id,
            Fvisible:false
        }
        axios.patch(url, data).then((res) => {
            viewProject();
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
            console.log(res)
        }).catch((error) => {
            console.log(error)
            // setErrorAlert(true);
            //   setTimeout(() => {
            //       setErrorAlert(false);
            //   }, 5000);
            //   return;
        })
    }
    return (
        <>
            {updateAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Update Successfully</Alert></div>}
            {deleteError && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Successfully Deleted!</Alert></div>}
            {/* {errorAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='error' style={{ marginTop: "20px" }}>Something went wrong</Alert></div>} */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {viewForm && <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleViewForm}>View</Button>}
            {!viewForm &&  <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleViewForm}>Create</Button>}
        </div>
            {viewForm &&  <div className="login-wrapper ">
                {responseCircular && (
                    <div
                        style={{
                            width: "29%",
                            height: "30%",
                            left: "33%",
                            backgroundColor: "rgb(211,211,211)",
                            borderRadius: "10px",
                            top: "50px",
                            position: "absolute",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress style={{ height: "50px", width: "50px" }} />
                    </div>
                )}
                <h3>{editForm ? <>Edit</> : <>Creation</>} Footer</h3>
                {emptyFieldAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>All fields required</Alert>}
                {successAlert && <Alert severity='success' style={{ marginBottom: "20px" }}>Created Successfully</Alert>}
                {errorAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>Type is required</Alert>}
                <form id='form' style={{ display: "flex", flexDirection: "column" }}>
                    <select onChange={(e)=>setType(e.target.value)}>
                        <option>Select Footer Type</option>
                        <option value={"Contact Us"}>Contact Us / Address</option>
                        <option value={"Quick Links"}>Quick Links</option>
                        <option value={"Important Links"}>Important Links</option>
                    </select>
                    <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)}  value={name}/>
                    <input type='url' placeholder='Enter URL' onChange={(e) => setLink(e.target.value)}  value={link}/>
                    <input type='phone' placeholder='Enter Phone' onChange={(e) => setPhone(e.target.value)}  value={phone}/>
                    <input type='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}  value={email}/>
                    <input type='text' placeholder='Enter Address' onChange={(e) => setAddress(e.target.value)}  value={address}/>
                    {editForm ? <Button sx={{ bgcolor: "#1b3058", color: "white" }} variant="contained" onClick={handleEdit}>Edit</Button> : <Button sx={{ bgcolor: "#1b3058", color: "white" }} variant="contained" onClick={handleSubmit}>Submit</Button>}
                </form>
            </div>}
            <div>
                {
                    (!viewForm && viewData.length > 0) && <div className='user-details-wrapper'>
                        <table>
                            <tr>
                                <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Name</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Type</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Link</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Phone</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Email</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Address</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Status</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Edit</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
                            </tr>
                            {
                                viewData.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.type}</td>
                                            <td><a href={data.link} target='_blank'><FiLink/></a> </td>
                                            <td>{data.phone}</td>
                                            <td>{data.email}</td>
                                            <td>{data.address}</td>
                                            <td>
                                                <Switch
                                                    checked={data.visibile}
                                                    onChange={data.visibile ? () => handleStatusFalse(data.footer_id) : () => handleStatusTrue(data.footer_id)}
                                                    data={true}
                                                    sx={{
                                                        '& .MuiSwitch-thumb': {
                                                            color: data.visibile ? 'green' : 'red',
                                                        },
                                                    }}
                                                />
                                            </td>
                                            <td onClick={()=>handleEditForm(data)}><i class="fa-solid fa-pen-to-square"></i></td>
                                            <td onClick={() => handleDelete(data.footer_id)}><i class="fa-sharp fa-solid fa-trash"></i></td>
                                        </tr>
                                    )
                                })
                            }

                        </table>
                    </div>}
                {
                    (viewData.length <= 0) &&
                    <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
                }
            </div>


        </>

    )
}
