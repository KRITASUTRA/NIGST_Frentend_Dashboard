import { Alert, Button, CircularProgress, Switch } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsImageFill } from 'react-icons/bs';



const About = () => {
    const [responseCircular, setCircularResponse] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteError, setDeleteAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
    const [image,setImage] = useState("");
    const [deleteErrorAlert,setDeleteErrorAlert] = useState(false);

    function handleSubmit() {
        setCircularResponse(true);
        if ( !image ) {
            setCircularResponse(false);
            setEmptyFieldAlert(true);
            setTimeout(() => {
                setEmptyFieldAlert(false);
            }, 5000);
            return;
        }
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_about_section_images";
        const formData = new FormData();
        formData.append('image', image);
        axios.post(mUrl, formData).then((res) => {
            console.log(res.data)
            document.getElementById('form').reset();
            viewMarquee();
            setCircularResponse(false);
            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false)
            }, 5000);
        }).catch((error) => {
            setCircularResponse(false);
            if(error.response.data.message === "Error creating campus!"){
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false);
                }, 5000);
                return;
            }
            
        })
    }



    function handleDelete(id) {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/delete_images";
        axios.delete(url,{data:{id:id}}).then((res)=>{
            viewMarquee();
            setDeleteAlert(true);
            setTimeout(() => {
                setDeleteAlert(false)
            }, 5000);
        }).catch((error)=>{
            setDeleteErrorAlert(true);
            setTimeout(() => {
                setDeleteErrorAlert(false)
            }, 5000);
        })
    }
    function handleStatusTrue(id) {
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_image";
        const data={
            id:`${id}`,
            visibility: true,
        };
        axios.patch(mUrl,data).then((res)=>{
            viewMarquee();
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
        }).catch((error)=>{
            console.log(error)
        })
    }
    function handleStatusFalse(id){
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_image";
        const data={
            id:`${id}`,
            visibility: false,
        };
        axios.patch(mUrl,data).then((res)=>{
            viewMarquee();
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
        }).catch((error)=>{
            console.log(error)
        })
    }
   
    function viewMarquee() {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_images";
        axios.get(url).then((res) => {
            setViewData(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function viewImage(url){
        const newWindow = window.open();
        if (!newWindow) {
            alert('Pop-up blocked. Please allow pop-ups for this website.');
        } else {
            newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + url + "' ></embed>";
        }
      }

    useEffect(() => {
        viewMarquee();
    }, []);
    
  return (
    <>
            {updateAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Update Successfully</Alert></div>}
            {deleteError && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Successfully Deleted!</Alert></div>}
            {deleteErrorAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='error' style={{ marginTop: "20px" }}>Something went wrong</Alert></div>}
            
            <div className="login-wrapper ">
                {responseCircular && (
                    <div
                        style={{
                            width: "29%",
                            height: "30%",
                            left: "33%",
                            backgroundColor: "rgb(211,211,211)",
                            borderRadius: "10px",
                            top: "100px",
                            position: "absolute",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: "2"
                        }}
                    >
                        <CircularProgress style={{ height: "50px", width: "50px" }} />
                    </div>
                )}
                <h3 style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold" , marginBottom:"0px"}}>Create New  About Section </h3>
                {emptyFieldAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>All fields required</Alert>}
                {successAlert && <Alert severity='success' style={{ marginBottom: "20px" }}>Studies created successfully</Alert>}
                {errorAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>Error creating Studies!</Alert>}
                <form id="form" style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type='file'
                            onChange={(e)=>setImage(e.target.files[0])}
                        />
                        <Button
                        sx={{ bgcolor: '#1b3058', color: 'white' }}
                            variant="contained"
                            onClick={handleSubmit}
                            style={{ width: '100%' }}
                        >
                            Create
                        </Button>
                </form>
            </div>
        {(viewData.length >0)&& <div>
                <div className="user-details-wrapper" style={{ maxHeight: "180px", overflowY: "scroll" }}>
                    <table >
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>View Image</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Status</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {viewData.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{cursor:"pointer"}} onClick={()=>viewImage(data.path)}><BsImageFill/></td>
                                    <td>
                                        <Switch
                                            checked={data.visibility}
                                            onChange={data.visibility ? () => handleStatusFalse(data.id) : () => handleStatusTrue(data.id)}
                                            data={true}
                                            sx={{
                                                "& .MuiSwitch-thumb": {
                                                    color: data.visibility ? "green" : "red",
                                                },
                                            }}
                                        />
                                    </td>                                   
                                    <td onClick={() => handleDelete(data.id)}>
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>}
            {
        viewData.length <=0  && 
        <div style={{width:"100%",textAlign:"center" , fontSize:"30px",marginTop:"200px"}}>No data to show</div>
    }
            <div style={{margin:"15px 0px 0px 28px"}}>
            </div>
        </>
  )
}

export default About