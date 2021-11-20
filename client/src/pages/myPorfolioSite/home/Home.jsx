import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import profilePic from '../../../images/porfolioImages/me.webp'

import {Popup,ProfilePortfolio,ProfileNavbar,ProfileHeader,ProfileHome,ProfileAbout,ProfileService} from '../../../components'




const Home = () => {
const[remove, setRemove]=useState(false)

let itemIndex, slideIndex, screenshots;
const aboutSectionManagement=(e)=>{
const aboutSection = document.querySelector(".pf__about_section"),
tabsContainer = document.querySelector(".pf__about_tabs");
if(e.target.classList.contains("pf__tab_item") && !e.target.classList.contains("pf__active")){
const target = e.target.getAttribute("data-target")
// deactivate existing activ pf__tab_item
tabsContainer.querySelector(".pf__active").classList.remove("pf__outer_shadow","pf__active")
// active new pf__tab_item
e.target.classList.add("pf__active","pf__outer_shadow")
// deactivate exiting pf__tab_content
aboutSection.querySelector(".pf__tab_content.pf__active").classList.remove("pf__active")
// activate new pf__tab_content


aboutSection.querySelector(target).classList.add("pf__active")


}

}

const aboutPortfolioManagement= () =>{
const filterContainer = document.querySelector(".pf__portfolio_filter"),
portfolioItemsContainer = document.querySelector(".pf__portfolio_items"),
portfolioItems = document.querySelectorAll(".pf__porfolio_item"),
popup = document.querySelector(".pf__portfolio_popup"),
prevBtn = popup.querySelector(".pf__pp_prev"),
nextBtn = popup.querySelector("pf__pp_next"),
closeBtn = popup.querySelector("pf__pp_close"),
porjectDetailsContainer = popup.querySelector(".pf__pp_details"),
projectDetailsBtn = popup.querySelector(".pf__pp_project_details_btn")



filterContainer.addEventListener("click",(event)=>{
  if(event.target.classList.contains("pf__filter_item") && !event.target.classList.contains("pf__active")){
    // deactivate existing active filterContainer
    filterContainer.querySelector(".pf__active").classList.remove("pf__outer_shadow", "pf__active");
    // activate new filter item
    event.target.classList.add("pf__active","pf__outer_shadow")
    const target = event.target.getAttribute("data-target");

    portfolioItems.forEach((item) => {
      if(target === item.getAttribute("data-category") || target === 'all'){

        item.classList.remove("pf__hide")
        item.classList.add("pf__show")
      }else{
        item.classList.remove("pf__show")
        item.classList.add("pf__hide");
      }
    })




  }
})

// closeBtn.addEventListener("click",()=>{
//   popupToggle()
// })

}

const handlePortfolioItems = (event) =>{
if(event.target.closest(".pf__porfolio_item_inner")){
  const portfolioItem = event.target.closest(".pf__porfolio_item_inner").parentElement;
  // get the portfolioItem index
  itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem)
  const portfolioItems = document.querySelectorAll(".pf__porfolio_item")
   screenshots = portfolioItems[itemIndex].querySelector(".pf__portfolio_item_img img").getAttribute("data-screenshots")
  // convert screen shots into an array
  screenshots=screenshots.split(",")
  if(screenshots.length=== 1){
  const  prevBtn2 = document.querySelector(".pf__pp_prev")
  // let nextBtn2 = document.querySelector("pf__pp_next")
  // console.log(nextBtn2)
  prevBtn2.style.display="none"
  // nextBtn.style.display="none"

}else{
  // const popup = document.querySelector(".pf__portfolio_popup")
  const  prevBtn2 = document.querySelector(".pf__pp_prev")
  // const nextBtn = document.querySelector("pf__pp_next")
  prevBtn2.style.display="block"
  // nextBtn.style.display="block"
}
  slideIndex = 0;
  popupToggle()
  popupSlideshow()
  popupDetails()
}
}

function popupDetails(){
  //get the project details
  const portfolioItems = document.querySelectorAll(".pf__porfolio_item")
  const details = portfolioItems[itemIndex].querySelector(".pf__portfolio_item_details").innerHtml
  document.querySelector(".pf__pp_project_details").innerHtml = details;
  const title = portfolioItems[itemIndex].querySelector(".pf__portfolio_item_tittle").innerHtml
  console.log("title",itemIndex)
}

function popupToggle(){
const popup = document.querySelector(".pf__portfolio_popup")

popup.classList.toggle("pf__open")
bodyScrollingToggle()
}



function bodyScrollingToggle(){
document.body.classList.toggle("pf__stop_scrolling")
}


function handlePopupClose(){
popupToggle()
}

function popupSlideshow(){
const imgSrc = screenshots[slideIndex];
  const popup = document.querySelector(".pf__portfolio_popup")
const popupImg = popup.querySelector(".pf__pp_img")
// activate the loader untill the popupImg loader

popup.querySelector(".pf__pp_loader").classList.add("pf__active2")
popupImg.src = imgSrc;
popupImg.onload = () =>{
  // deactivate loader after popupImg loader
  popup.querySelector(".pf__pp_loader").classList.remove("pf__active2")

}

popup.querySelector(".pf__pp_counter").innerHTML = (slideIndex+1) +" of " + screenshots.length;
// popupImg.src = imgSrc;
}

//next slide:
function handleNextSlide(){
if(slideIndex ===screenshots.length-1){
  slideIndex = 0;

}else{
  slideIndex++;
}
popupSlideshow()
}

function handlePrevSlide(){
if(slideIndex===0){
  slideIndex = screenshots.length-1
}
else{
  slideIndex--;
}
popupSlideshow()
}




function handlepopupDetails(){
  popupDetailsToggle()
}

function popupDetailsToggle(){
  const   porjectDetailsContainer = document.querySelector(".pf__pp_details")
  const popup = document.querySelector(".pf__portfolio_popup")

  if(porjectDetailsContainer.classList.contains("pf__active")){
      porjectDetailsContainer.classList.remove("pf__active")
      porjectDetailsContainer.style.maxHeight=0 + "px"
        setRemove(false)
  }else{

    porjectDetailsContainer.classList.add("pf__active")
    porjectDetailsContainer.style.maxHeight = porjectDetailsContainer.scrollHeight + "px";
    popup.scrollTo(0,porjectDetailsContainer.offsetTop)
    setRemove(true)
  }
}



  return (
    <div className="pf__body">
    <ProfileHeader/>

    <ProfileNavbar/>


    {/*home section starts*/}
    <ProfileHome profilePic={profilePic} />
    {/*home section end*/}

    {/*about section end*/}
    <ProfileAbout profilePic={profilePic} aboutSectionManagement={aboutSectionManagement} />
    {/*about section end*/}


    {/*service section start*/}
    <ProfileService/>

    {/*service section end*/}

    {/*porfolio section start*/}
    <ProfilePortfolio aboutPortfolioManagement={aboutPortfolioManagement} handlePortfolioItems={handlePortfolioItems}/>

    {/*porfolio section end*/}

    {/*porfolio popup start*/}
      <Popup handlepopupDetails={handlepopupDetails} handlePopupClose={handlePopupClose} handlePrevSlide={handlePrevSlide} handleNextSlide={handleNextSlide} remove={remove}/>
    {/*porfolio popup end*/}

    </div>
  )
}

export default Home