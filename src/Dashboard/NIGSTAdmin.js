import React, { useState } from "react";
// import "../CSS/app.css";
import DepartmentCreation from "./DepartmentCreation";
import CreationFacultyPosition from "./CreationFacultyPosition";
import Button from "../components/Button";
import NewUserVerification from "./NewUserVerification";
import DepartmentCourseAssignment from "./DepartmentCourseAssignment";
import Tender from "./Tender";
import Galleryupload from "./galleryuploads"
import Logo from '../images/logo1.png'
import AnnouncementCreation from "./AnnouncementCreation";
import SOIProject from "./SOIProject";
import CreateBanner from "./CreateBanner";
import Marquee from "./Marquee";
import ViewContactReportAndFrom from "./ViewContactReportAndFrom";
import HomeCarouselImage from "./HomeCarouselImage";
import CreateFooter from "./CreateFooter";
import CreateHeader from "./CreateHeader";
import CreateSocialMediaIcon from "./CreateSocialMediaIcon";


export default function NIGSTAdmin() {
  const [departmentCreation, setDepartmentCreation] = useState(true);
  const [facultyPositionCreation, setFacultyPositionCreation] = useState(false);
  const [users, setUsers] = useState(false);
  const [courseAssignment, setCourseAssignment] = useState(false);
  const [tender, setTender] = useState(false);
  const [announcement , setAnnouncement] = useState(false);
  const [galleryimage,setGalleryimage] = useState(false);
  const [SOI,setSOIProject] = useState(false);
  const [CBanner,setCBanner] = useState(false);
  const [marquee,setMarquee] = useState(false);
  const [viewContactFormReport,setViewContactFormReport] = useState(false);
  const [homeCarousel,setHomeCarousel] = useState(false);
  const [footer,setFooter] = useState(false);
  const [header,setHeader] = useState(false);
  const [socialMedia,setSocialMedia] = useState(false);

  function departmentFun() {
    setDepartmentCreation(true);
    setFacultyPositionCreation(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
    setAnnouncement(false);
    setGalleryimage(false);
    setSOIProject(false);
    setCBanner(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function facultyPositionFun() {
    setFacultyPositionCreation(true);
    setDepartmentCreation(false);
    // setCourseCategory(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
    setAnnouncement(false);
    setGalleryimage(false);
    setSOIProject(false);
    setCBanner(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function usersFun() {
    setUsers(true);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setCourseAssignment(false);
    setTender(false);
    setAnnouncement(false);
    setGalleryimage(false);
    // setFacultyAdmin(false)
    setSOIProject(false);
    setCBanner(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function courseAssignmentFun() {
    setCourseAssignment(true);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setTender(false);
    setAnnouncement(false);
    setGalleryimage(false);
    // setFacultyAdmin(false)
    setSOIProject(false);
    setCBanner(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function handleTenderFun() {
    setTender(true);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    // setFacultyAdmin(false)
    setAnnouncement(false);
    setGalleryimage(false);
    setSOIProject(false);
    setCBanner(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function announcementFun(){
    setAnnouncement(true);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setGalleryimage(false);
    setSOIProject(false);
    setCBanner(false)
    // setFacultyAdmin(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);
    
  }
  function ImageUploadFun(){
    setGalleryimage(true);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setSOIProject(false);
    setCBanner(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }

  function SOIFun(){
    setSOIProject(true);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setCBanner(false);
    setMarquee(false)
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }

  function CreateBannerFun(){
    setCBanner(true)
    setSOIProject(false);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setMarquee(false);
    setViewContactFormReport(false);
    setHomeCarousel(false)
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }

  function marqueeFun(){
    setMarquee(true)
    setCBanner(false)
    setSOIProject(false);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setHomeCarousel(false)
    setViewContactFormReport(false);
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }


  function contactFormFun(){
    setViewContactFormReport(true);
    setMarquee(false)
    setCBanner(false)
    setSOIProject(false);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setHomeCarousel(false);
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function carouselFun(){
    setHomeCarousel(true);
    setViewContactFormReport(false);
    setMarquee(false)
    setCBanner(false)
    setSOIProject(false);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setFooter(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function createFooterFun(){
    setFooter(true);
    setHomeCarousel(false);
    setViewContactFormReport(false);
    setMarquee(false)
    setCBanner(false)
    setSOIProject(false);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setHeader(false);
    setSocialMedia(false);

  }
  function createHeaderFun(){
    setHeader(true);
    setFooter(false);
    setHomeCarousel(false);
    setViewContactFormReport(false);
    setMarquee(false)
    setCBanner(false)
    setSOIProject(false);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setSocialMedia(false);

  }

  function createSocialFun(){
    setSocialMedia(true);
    setHeader(false);
    setFooter(false);
    setHomeCarousel(false);
    setViewContactFormReport(false);
    setMarquee(false)
    setCBanner(false)
    setSOIProject(false);
    setGalleryimage(false);
    setAnnouncement(false);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
  }
  function logout(){

    window.location.hash = "/";
    localStorage.clear("user");
  }
  return (
    <div className="flex justify-between main-page-header">
      <div className="side-bar sticky top-0 border-r-2 side-bar-wrapper">
        <div className=" text-center mb-8">
          <h3 className="text-lg   text-white font-bold ">
            Welcome NIGST Admin
          </h3>
        </div>
        <div>
          <ul className=" text-white cursor-pointer ">
            {departmentCreation ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={departmentFun}>
              Organization Creation
            </li> : <li onClick={departmentFun}>
              Organization Creation
            </li>}
            {facultyPositionCreation ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={facultyPositionFun}>
              Creation of Faculty Positions{" "}
            </li> : <li className="p-3 " onClick={facultyPositionFun}>
              Creation of Faculty Positions{" "}
            </li>}
           
            {courseAssignment ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={courseAssignmentFun}>
              Organization-Course Assignment
            </li> : <li className="p-3 " onClick={courseAssignmentFun}>
              Organization-Course Assignment
            </li>}
            {users ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={usersFun}>
              New User verifications
            </li> : <li className="p-3 " onClick={usersFun}>
              New User verifications
            </li>}
            {tender ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={handleTenderFun}>
              Tender
            </li> : <li className="p-3 " onClick={handleTenderFun}>
              Tender
            </li>}
            {
              announcement ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={announcementFun}>
              Announcement
            </li> : <li className="p-3 " onClick={announcementFun}>
              Announcement
            </li>
            
            }
            {
              galleryimage ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={ImageUploadFun}>
              Gallery
            </li> : <li className="p-3 " onClick={ImageUploadFun}>
              Gallery
            </li>
            
            }
            {
              SOI ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={SOIFun}>
                SOI Project
            </li> : <li className="p-3 " onClick={SOIFun}>
              SOI Project
            </li>
            
            }
            {
              CBanner ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={CreateBannerFun}>
                Banner
            </li> : <li className="p-3 " onClick={CreateBannerFun}>
              Banner
            </li>
            }
              {
              marquee ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={marqueeFun}>
                Marquee
            </li> : <li className="p-3 " onClick={marqueeFun}>
              Marquee
            </li>
            }
            {
              viewContactFormReport ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={contactFormFun}>
              Contact
            </li> : <li className="p-3 " onClick={contactFormFun}>
            Contact
            </li>
            }
            {
              homeCarousel ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={carouselFun}>
              Home Carousel
            </li> : <li className="p-3 " onClick={carouselFun}>
            Home Carousel
            </li>
            }
             {
              footer ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={createFooterFun}>
              Footer
            </li> : <li className="p-3 " onClick={createFooterFun}>
            Footer
            </li>
            }
             {
              header ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={createHeaderFun}>
              Header
            </li> : <li className="p-3 " onClick={createHeaderFun}>
            Header
            </li>
            }
            {
              socialMedia ? <li style={{ background: "#1b3058", color: "#ffcb00" }}  onClick={createSocialFun}>
              Social Media
            </li> : <li className="p-3 " onClick={createSocialFun}>
              Social Media
            </li>
            }
            {/* {
              facultyAdmin ? <li style={{background:"#ffcb00"}} onClick={facultyAdminCreationFun}>
              Faculty Admin </li> : <li className="p-3 " onClick={facultyAdminCreationFun}>
              Faculty Admin
              </li>
            }
            <li className="p-3 ">Content Updation </li> */}
          </ul>
        </div>
      </div>
      <div className="content-wrapper-admin-panel w-full">
        <header className='h-240  w-full flex justify-evenly items-center'>

          <div>
            <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
          </div>
          <div style={{ position: 'absolute', right: '20px' }}><Button value={"Logout"} fun={logout} /> </div>
        </header>
        <div className="min-h-max flex justify-center border-t-2 min-h-[80%] flex-col">
          {departmentCreation ? <DepartmentCreation /> : ""}
          {facultyPositionCreation ? <CreationFacultyPosition /> : ""}
          {/* {courseCategory ? <CourseCategoryCreation /> : ""} */}
          {users ? <NewUserVerification /> : ""}
          {courseAssignment ? <DepartmentCourseAssignment /> : ""}
          {tender ? <Tender /> : ""}
          {announcement && <AnnouncementCreation/>}
          {/* {facultyAdmin ? <CreationFacultysAdmin/> : ""} */}
          {galleryimage? <Galleryupload/>:""}
          {SOI && <SOIProject/> }
          {CBanner && <CreateBanner/>}
          {marquee && <Marquee/>}
          {viewContactFormReport && <ViewContactReportAndFrom/>}
          {homeCarousel && <HomeCarouselImage/>}
          {footer && <CreateFooter/>}
          {header && <CreateHeader/>}
          {socialMedia && <CreateSocialMediaIcon/>}
        </div>
      </div>
    </div>
  );
}
