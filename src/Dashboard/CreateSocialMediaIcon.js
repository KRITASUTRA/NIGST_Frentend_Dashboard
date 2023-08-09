import { Alert, Button, CircularProgress, Switch } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { RgbStringColorPicker } from "react-colorful";
import { FiLink } from "react-icons/fi";
import { IoColorPalette } from "react-icons/io5";


const CreateSocialMediaIcon = ()=>{
    const [responseCircular, setCircularResponse] = useState(false);
    const [emptyFieldAlert,setEmptyFieldAlert] = useState(false);
    const [errorAlert,setErrorAlert] = useState(false);
    const [successAlert,setSuccessAlert] = useState(false);
    const [deleteError,setDeleteAlert] = useState(false);
    const [updateAlert,setUpdateAlert] = useState(false);
    const [editFormButton,setEditFormButton] = useState(false);
    const [viewData,setViewData] = useState([]);
    const [link,setLink] = useState("");
    const [icon,setIcon] = useState("");
    const [color,setColor] = useState("");
    const [showColorPicker1, setShowColorPicker1] = useState(false);
    const [id,setId] = useState("");



    useEffect(()=>{
        viewProject();
      },[])
    
      function handleSubmit(){
        setCircularResponse(true);
        if(!link || !icon){
            setCircularResponse(false);
            setEmptyFieldAlert(true);
            setTimeout(() => {
                setEmptyFieldAlert(false);
            }, 5000);
            return;
        }
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/social_media_create";
        const data = {
            url:`${link}`,
            name:`${icon}`,
            color:`${color}`
        }
        axios.post(url,data).then((res)=>{
            console.log(res.data)
            if(res.data.message === "Successfully Created!"){
            document.getElementById('form').reset()
            setLink("")
            viewProject();
            setCircularResponse(false);
            setSuccessAlert(true);
            setTimeout(() => {
              setSuccessAlert(false);
            }, 5000);
            return;
            }
            
        }).catch((error)=>{
          setCircularResponse(false);
            if(error.response.data.message === "Data Already Exist!"){
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
            return;
            }
          
        })
      }
    
    
      function viewProject(){
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_social_media";
        axios.get(url).then((res)=>{
            setViewData(res.data.data);
        }).catch((error)=>{
            console.log(error)
        })
      } 
 
      function handleEdit(){
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_social_media";
        const data = {
          url:`${link}`,
          name:`${icon}`,
          color:`${color}`,
          SID:`${id}`
      }
        axios.patch(url,data).then((res)=>{
          viewProject();
          setUpdateAlert(true);
          setTimeout(() => {
            setUpdateAlert(false)
          }, 5000);
          console.log(res)
        }).catch((error)=>{
          console.log(error)
          // setErrorAlert(true);
          //   setTimeout(() => {
          //       setErrorAlert(false);
          //   }, 5000);
          //   return;
        })
      }
    
      function handleDelete(id){
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/delete_social_media";
        axios.delete(url,{data:{Sid:id}}).then((res)=>{
          if(res.data.message === "Successfully Deleted!"){
            viewProject()
            setDeleteAlert(true);
            setTimeout(() => {
              setDeleteAlert(false);
            }, 5000);
          }
        }).catch((error)=>{
          console.log(error)
        })
      }

      function handleStatusTrue(id){
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_media";
        const data = {
          SID:id,
          Svisible:true
       }
        axios.patch(url,data).then((res)=>{
          viewProject();
          setUpdateAlert(true);
          setTimeout(() => {
            setUpdateAlert(false)
          }, 5000);
          console.log(res)
        }).catch((error)=>{
          console.log(error)
          // setErrorAlert(true);
          //   setTimeout(() => {
          //       setErrorAlert(false);
          //   }, 5000);
          //   return;
        })
      }
      function handleStatusFalse(id){
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_visible_media";
        const data = {
          SID:id,
          Svisible:false
       }
        axios.patch(url,data).then((res)=>{
          viewProject();
          setUpdateAlert(true);
          setTimeout(() => {
            setUpdateAlert(false)
          }, 5000);
          console.log(res)
        }).catch((error)=>{
          console.log(error)
          // setErrorAlert(true);
          //   setTimeout(() => {
          //       setErrorAlert(false);
          //   }, 5000);
          //   return;
        })
      }

      const handleEditForm =(data) =>{
          setEditFormButton(true);
          setId(data.sm_id);
          setLink(data.icon_url);
          setColor(data.icon_color);
          setIcon(data.icon_name)
      }


    return(
        <>
        {updateAlert && <div style={{textAlign:"center",width:"20%",margin:"auto"}}><Alert severity='success' style={{marginTop:"20px"}}>Update Successfully</Alert></div>}
        {deleteError && <div style={{textAlign:"center",width:"20%",margin:"auto"}}><Alert severity='success' style={{marginTop:"20px"}}>Successfully Deleted!</Alert></div>}
        {errorAlert && <div style={{textAlign:"center",width:"20%",margin:"auto"}}><Alert severity='error' style={{marginTop:"20px"}}>Something went wrong</Alert></div>}
        
        <div className="login-wrapper">
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
          }}
        >
          <CircularProgress style={{ height: "50px", width: "50px" }} />
        </div>
      ) }
          <h3>Creation Social Media</h3>
          {emptyFieldAlert && <Alert severity='error' style={{marginBottom:"20px"}}>All fields required</Alert> }
          {successAlert && <Alert severity='success' style={{marginBottom:"20px"}}>Created Successfully</Alert> }
          {errorAlert && <Alert severity='error' style={{marginBottom:"20px"}}>Data Already Exist!</Alert> }
          <form id='form' style={{display:"flex",flexDirection:"column"}}>
          <input placeholder='URL' type='text' onChange={(e)=>setLink(e.target.value)} value={link}/>
          <select onChange={(e)=>setIcon(e.target.value)}>
                <option>Select Icon</option>
                <option value="fa-brands fa-linkedin">Linkedin</option>
                <option value="fa-brands fa-instagram">Instagram</option>
                <option value="fa-brands fa-youtube">Youtube</option>
                <option value="fa-brands fa-twitter">Twitter</option>
                <option value="fa-brands fa-facebook">Facebook</option>
          </select>
          <div style={{display:"flex"}}>
                        <span style={{marginRight:"4px"}}>Text Color</span> {showColorPicker1 ? (
                            <div style={{ position: 'absolute', zIndex: "1", right: "5px", top: "5px" }}>
                                <RgbStringColorPicker
                                    color={color}
                                    onChange={(newColor) => setColor(newColor)}
                                    onMouseLeave={() => setShowColorPicker1(false)}
                                    />
                            </div>
                        ) : (
                            <IoColorPalette
                            style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }}
                            onClick={() => setShowColorPicker1(true)}
                            />
                            )}
                        </div>
          {editFormButton ? <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleEdit}>Edit</Button> : <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleSubmit}>Submit</Button>}
          </form>
  </div>
        
        <div>
          {
          (viewData.length > 0 ) &&  <div className='user-details-wrapper'>
            <table>
              <tr>
                <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
                <th style={{ backgroundColor: "#ffcb00" }}>Link</th>
                <th style={{ backgroundColor: "#ffcb00" }}>Icon</th>
                <th style={{ backgroundColor: "#ffcb00" }}>Status</th>
                <th style={{ backgroundColor: "#ffcb00" }}>Edit</th>
                <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
              </tr>
              {
                viewData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td><a href={data.icon_url} target="_blank" rel="noreferrer" ><FiLink/></a></td>
                      <td style={{cursor:"pointer"}}><i className={data.icon_name} style={{color:data.icon_color}}></i></td>
                      <td>
                        <Switch
                          checked={data.visibility}
                          onChange={data.visibility ? ()=>handleStatusFalse(data.sm_id) : ()=>handleStatusTrue(data.sm_id) }
                          data={true}
                          sx={{
                            '& .MuiSwitch-thumb': {
                              color: data.visibility ? 'green' : 'red',
                            },
                          }}
                        />
                      </td>
                      <td onClick={()=>handleEditForm(data)}><i class="fa-solid fa-pen-to-square"></i></td>
                      <td onClick={()=>handleDelete(data.sm_id)}><i class="fa-sharp fa-solid fa-trash"></i></td>
                    </tr>
                  )
                })
              }
  
            </table>
          </div>}
          {
          viewData.length <= 0 &&
          <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
        }
          </div>
      
  </>
    )
}

export default CreateSocialMediaIcon;