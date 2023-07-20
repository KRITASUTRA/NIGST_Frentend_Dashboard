import { Alert, Button, CircularProgress, Input, Switch } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsImageFill } from 'react-icons/bs';


export default function HomeCarouselImage() {
    const [responseCircular, setCircularResponse] = useState(false);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteError, setDeleteAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [image, setImage] = useState(null);
    const [viewData, setViewData] = useState([]);
    const [viewForm, setViewForm] = useState(false);
    const [id, setId] = useState("");


    useEffect(() => {
        viewProject();
    }, [])

    function handleSubmit() {
        setCircularResponse(true);
        if (!image) {
            setCircularResponse(false);
            setEmptyFieldAlert(true);
            setTimeout(() => {
                setEmptyFieldAlert(false);
            }, 5000);
            return;
        }
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/upload_carousel";
        const formData = new FormData();
        formData.append("image", image);
        axios.post(url, formData).then((res) => {
            if (res.data.message === "Successfully Uploaded.") {
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
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/carousel_admin";
        axios.get(url).then((res) => {
            setViewData(res.data.images);
        }).catch((error) => {
            console.log(error)
        })
    }




    function viewImage(url) {
        console.log(url)
        const newWindow = window.open();
        if (!newWindow) {
            alert('Pop-up blocked. Please allow pop-ups for this website.');
        } else {
            newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + url + "' ></embed>";
        }
    }



    function handleDelete(id) {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/delete_carousel";
        axios.delete(url, { data: { cid: id } }).then((res) => {
            if (res.data.message === "Successfully Deleted") {
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
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/carousel_visibility";
        const data = {
            cid: id,
            status: true
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
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/carousel_visibility";
        const data = {
            cid: id,
            status: false
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
            {errorAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='error' style={{ marginTop: "20px" }}>Something went wrong</Alert></div>}
            {<div className="login-wrapper ">
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
                <h3>Carousel Image Upload</h3>
                {emptyFieldAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>All fields required</Alert>}
                {successAlert && <Alert severity='success' style={{ marginBottom: "20px" }}>Created Successfully</Alert>}
                {errorAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>Data Already Exist!</Alert>}
                <form id='form' style={{ display: "flex", flexDirection: "column" }}>
                    <input type='file' onChange={(e) => setImage(e.target.files[0])}  />
                    <Button sx={{ bgcolor: "#1b3058", color: "white" }} variant="contained" onClick={handleSubmit}>Submit</Button>
                </form>
            </div>}
            <div>
                {
                    (viewData.length > 0) && <div className='user-details-wrapper'>
                        <table>
                            <tr>
                                <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>View Image</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Status</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
                            </tr>
                            {
                                viewData.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td style={{ cursor: "pointer" }} onClick={() => viewImage(data.imageurl)}><BsImageFill /></td>
                                            <td>
                                                <Switch
                                                    checked={data.cstatus}
                                                    onChange={data.cstatus ? () => handleStatusFalse(data.CId) : () => handleStatusTrue(data.CId)}
                                                    data={true}
                                                    sx={{
                                                        '& .MuiSwitch-thumb': {
                                                            color: data.cstatus ? 'green' : 'red',
                                                        },
                                                    }}
                                                />
                                            </td>
                                            <td onClick={() => handleDelete(data.CId)}><i class="fa-sharp fa-solid fa-trash"></i></td>
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
