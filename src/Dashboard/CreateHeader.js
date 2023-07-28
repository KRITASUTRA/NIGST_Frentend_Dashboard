import { Alert, Button, CircularProgress, Switch } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsImageFill } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';



export default function CreateHeader() {
    const [responseCircular, setCircularResponse] = useState(false);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorTwoAlert, setErrorTwoAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteError, setDeleteAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("");
    const [viewData, setViewData] = useState([]);
    const [viewForm, setViewForm] = useState(true);
    const [id, setId] = useState("");
    const [editForm,setEditFromButton] = useState(false);
    const [urlValidation,setUrlValidation] = useState(false);



    function handleViewForm(){
        setViewForm(!viewForm);
        setEditFromButton(false);
    }

    function handleEditForm(data){
        setEditFromButton(true);
        setViewForm(true);
        setName(data.h_name);
        setUrl(data.header_url);
        setId(data.h_id);
    }

    useEffect(() => {
        viewProject();
    }, [])

    function handleSubmit() {
        if(!(url.startsWith("http") || url.startsWith("https"))){
            setUrlValidation(true);
            setTimeout(() => {
                setUrlValidation(false)
            }, 5000);
            return;
        }

        if(!name){
            setEmptyFieldAlert(true);
            setTimeout(() => {
                setEmptyFieldAlert(false);
            }, 5000);
            return;
        }
        setCircularResponse(true);
        const urlCreate = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_header";
        const formData = new FormData();
        formData.append("Hname",name);
        formData.append("url",url);
        formData.append("image",image);
        axios.post(urlCreate, formData).then((res) => {
            if (res.data.message === "Successfully Created") {
                setName("");
                setUrl("");
                setImage(null);
                document.getElementById('form').reset()
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
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_header";
        axios.get(url).then((res) => {
            setViewData(res.data.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    function handleDelete(id) {
        const urlDelete = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/delete_header";
        axios.delete(urlDelete, { data: { hid: id } }).then((res) => {
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
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_header";
        const data = {
            HID:id,
            Hvisible:true
        }
        axios.patch(url, data).then((res) => {
            viewProject();
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
            console.log(res)
        }).catch((error) => {
            if(error.response.data.message === "Only two images are allowed to display in the header"){
                setErrorTwoAlert(true);
                setTimeout(() => {
                  setErrorTwoAlert(false);
                }, 5000);
                return;
            }
            
        })
    }
    function handleStatusFalse(id) {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_header";
        const data = {
            HID:id,
            Hvisible:false
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
    function viewImage(url){
        console.log(url)
        const newWindow = window.open();
        if (!newWindow) {
          alert('Pop-up blocked. Please allow pop-ups for this website.');
        } else {
          newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + url + "' ></embed>";
        }
      }
      function handleEdit(){
        setCircularResponse(true);
        if(!(url.startsWith("http") || url.startsWith("https"))){
            setCircularResponse(false);
            setUrlValidation(true);
            setTimeout(() => {
                setUrlValidation(false)
            }, 5000);
            return;
        }
        const urlUpdate = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_header";
        const data={
            Hname:name,
            url:url,
            HID:id
        }
        axios.patch(urlUpdate, data).then((res) => {
           
            if (res.data.message === "Successfully Updated!") {
                setName("");
                setUrl("");
                setImage(null);
                document.getElementById('form').reset()
                viewProject();
                setCircularResponse(false);
                setUpdateAlert(true);
                setTimeout(() => {
                    setUpdateAlert(false);
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
    return (
        <>
            {updateAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Update Successfully</Alert></div>}
            {deleteError && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Successfully Deleted!</Alert></div>}
            {errorAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='error' style={{ marginTop: "20px" }}>Something went wrong</Alert></div>}
            {errorTwoAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='error' style={{ marginTop: "20px" }}>Only two images are allowed to display in the header</Alert></div>}
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
                <h3>{editForm ? <>Edit</> : <>Creation</>} Header</h3>
                {emptyFieldAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>All fields required</Alert>}
                {successAlert && <Alert severity='success' style={{ marginBottom: "20px" }}>Created Successfully</Alert>}
                {errorAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>Data Already Exist!</Alert>}
                {urlValidation && <Alert severity='error' style={{ marginBottom: "20px" }}>URL must contain HTTP/HTTPS</Alert>}
                <form id='form' style={{ display: "flex", flexDirection: "column" }}>
                    <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)}  value={name}/>
                    <input type='url' placeholder='Enter URL' onChange={(e) => setUrl(e.target.value)}  value={url}/>
                    <input type='file' placeholder='Enter URL' onChange={(e) => setImage(e.target.files[0])}  />
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
                                <th style={{ backgroundColor: "#ffcb00" }}>Image</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>URL</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Edit</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Status</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
                            </tr>
                            {
                                viewData.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.h_name}</td>
                                            <td onClick={()=>viewImage(data.imageurl)}><BsImageFill/></td>
                                            <td><a href={data.header_url} target='_blank' rel="noreferrer"><FiLink/></a> </td>
                                            <td onClick={()=>handleEditForm(data)}><i class="fa-solid fa-pen-to-square"></i></td>
                                            <td>
                                                <Switch
                                                    checked={data.visibility}
                                                    onChange={data.visibility ? () => handleStatusFalse(data.h_id) : () => handleStatusTrue(data.h_id)}
                                                    data={true}
                                                    sx={{
                                                        '& .MuiSwitch-thumb': {
                                                            color: data.visibility ? 'green' : 'red',
                                                        },
                                                    }}
                                                />
                                            </td>
                                            <td onClick={() => handleDelete(data.h_id)}><i class="fa-sharp fa-solid fa-trash"></i></td>
                                        </tr>
                                    )
                                })
                            }

                        </table>
                    </div>}
                {
                    (!viewForm && viewData.length <= 0) &&
                    <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
                }
            </div>


        </>

    )
}
