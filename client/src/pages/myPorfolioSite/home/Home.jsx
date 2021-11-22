import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import profilePic from '../../../images/porfolioImages/me.webp'

import {Preloader,Switcher,Contact,Testimonial,Popup,ProfilePortfolio,ProfileNavbar,ProfileHeader,ProfileHome,ProfileAbout,ProfileService} from '../../../components'




const Home = () => {
const[remove, setRemove]=useState(false)
const[color1,setColorOne] = useState(true)
const[color2,setColorTwo] = useState(false)
const[color3,setColorThree] = useState(false)
const[color4,setColorFour] = useState(false)
const[color5,setColorFive] = useState(false)

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

function handlePortfolioItems(event){
if(event.target.closest(".pf__porfolio_item_inner")){
  const portfolioItem = event.target.closest(".pf__porfolio_item_inner").parentElement;
  // get the portfolioItem index
  itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem)
  const portfolioItems = document.querySelectorAll(".pf__porfolio_item")
   screenshots = portfolioItems[itemIndex].querySelector(".pf__portfolio_item_img img").getAttribute("data-screenshots")
  // convert screen shots into an array
  screenshots=screenshots.split(",")
  if(screenshots.length=== 1){
  const  prevBtn2 = document.querySelector(".pf__next_and_prev_btn_container")

  prevBtn2.style.display="none"


}else{
  // const popup = document.querySelector(".pf__portfolio_popup")
  const  prevBtn2 = document.querySelector(".pf__next_and_prev_btn_container")
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
  const filterContainer = document.querySelector(".pf__portfolio_filter"),
  portfolioItemsContainer = document.querySelector(".pf__portfolio_items"),
  portfolioItems = document.querySelectorAll(".pf__porfolio_item"),
  popup = document.querySelector(".pf__portfolio_popup"),
  prevBtn = popup.querySelector(".pf__pp_prev"),
  nextBtn = popup.querySelector("pf__pp_next"),
  closeBtn = popup.querySelector("pf__pp_close"),
  porjectDetailsContainer = popup.querySelector(".pf__pp_details"),
  projectDetailsBtn = popup.querySelector(".pf__pp_project_details_btn")

  if(!portfolioItems[itemIndex].querySelector(".pf__portfolio_item_details")){
    projectDetailsBtn.style.display="none"
    return;
  }
    projectDetailsBtn.style.display="block"
  const details = portfolioItems[itemIndex].querySelector(".pf__portfolio_item_details").innerHTML;
  popup.querySelector(".pf__pp_project_details").innerHTML = details
  const title = portfolioItems[itemIndex].querySelector(".pf__portfolio_item_tittle").innerHTML
  popup.querySelector(".pf__pp_title h2").innerHTML=title;
  const category =  portfolioItems[itemIndex].getAttribute("data-category")
  popup.querySelector(".pf__pp_project_category").innerHTML=category.split("-").join(" ")
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

// hide all section expect the active


useEffect(()=>{
  function handleHamburgerBtn(){
    const hamburgerBtn = document.querySelector(".pf__hamburger_btn"),
    navMenu = document.querySelector(".pf__nav_menu"),
    closeNavBtn = navMenu.querySelector(".pf__close_nav_menu");

    hamburgerBtn.addEventListener("click",showNavMenu)
    closeNavBtn.addEventListener("click",hideNavMenu)
    function showNavMenu(){
      navMenu.classList.add("pf__open")
      bodyScrollingToggle()
    }
    function hideNavMenu(){
      navMenu.classList.remove("pf__open")
      fadeOutEffect()
      bodyScrollingToggle()
    }

    function fadeOutEffect(){
      document.querySelector(".pf__fade_out_effect").classList.add("pf__active");
      setTimeout(()=>{
        document.querySelector(".pf__fade_out_effect").classList.remove("pf__active");
      },300)
    }
//attach an event handler to document
    document.addEventListener("click",(event) =>{
      if(event.target.classList.contains('pf__link_item')){
        /*make sure event.target.hash has a value before overriding default behavior*/
        if(event.target.hash !==""){
          // prevent default anchor click behavior
          event.preventDefault();
          const hash = event.target.hash;
          //deactivate existing active sections
          document.querySelector(".pf__section.pf__active").classList.add("pf__hide");
          document.querySelector(".pf__section.pf__active").classList.remove("pf__active");

          //activate new section
          document.querySelector(hash).classList.add("pf__active")
          document.querySelector(hash).classList.remove("pf__hide")

          /*deactivate existing active navigation menu 'link-item'*/
          navMenu.querySelector(".pf__active").classList.add("pf__outer_shadow","pf__hover_in_shadow")
          navMenu.querySelector(".pf__active").classList.remove("pf__active","pf__inner_shadow")
          /*if the cliked link is contained within the navigation menu*/
          if(navMenu.classList.contains("pf__open")){
              //activate new navigation menu 'link-item'
              event.target.classList.add("pf__active","pf__inner_shadow")
              event.target.classList.add("pf__outer_shadow","pf__hover_in_shadow")
              // hide navigation menubar
              hideNavMenu()
        }else{
          let navItems = navMenu.querySelectorAll(".pf__link_item")
          navItems.forEach((item)=>{
            if(hash === item.hash){
              //activate a new navigation menu 'link-item'
              item.classList.add("pf__active","pf__inner_shadow")
              item.classList.add("pf__outer_shadow","pf__hover_in_shadow")
            }
          })
          fadeOutEffect()

        }
        //add hash (#) to a url
        window.location.hash=hash
        }

      }
    })

  }
  function hideSection(){
    const sections = document.querySelectorAll(".pf__section")
    sections.forEach((section)=>{
      if(!section.classList.contains("pf__active")){
        section.classList.add("pf__hide")
      }
    })

  }
  hideSection()
  handleHamburgerBtn()
},[])


function setColor1(){
setColorOne(true)
setColorTwo(false)
setColorThree(false)
setColorFour(false)
setColorFive(false)
if(color1===true){
  if(document.querySelector(".pf__body").classList.contains("pf__color2")){
    document.querySelector(".pf__body").classList.remove("pf__color2")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color3")){
    document.querySelector(".pf__body").classList.remove("pf__color3")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color4")){
    document.querySelector(".pf__body").classList.remove("pf__color4")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color5")){
    document.querySelector(".pf__body").classList.remove("pf__color5")
  }
  document.querySelector(".pf__body").classList.add("pf__color1")
}

}
function setColor2(){
setColorOne(false)
setColorTwo(true)
setColorThree(false)
setColorFour(false)
setColorFive(false)
if(color2===true){
  if(document.querySelector(".pf__body").classList.contains("pf__color1")){
    document.querySelector(".pf__body").classList.remove("pf__color1")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color3")){
    document.querySelector(".pf__body").classList.remove("pf__color3")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color4")){
    document.querySelector(".pf__body").classList.remove("pf__color4")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color5")){
    document.querySelector(".pf__body").classList.remove("pf__color5")
  }
  document.querySelector(".pf__body").classList.add("pf__color2")
}
}
function setColor3(){
setColorOne(false)
setColorTwo(false)
setColorThree(true)
setColorFour(false)
setColorFive(false)
if(color3===true){
  if(document.querySelector(".pf__body").classList.contains("pf__color1")){
    document.querySelector(".pf__body").classList.remove("pf__color1")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color2")){
    document.querySelector(".pf__body").classList.remove("pf__color2")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color4")){
    document.querySelector(".pf__body").classList.remove("pf__color4")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color5")){
    document.querySelector(".pf__body").classList.remove("pf__color5")
  }
  document.querySelector(".pf__body").classList.add("pf__color3")
}
}
function setColor4(){
setColorOne(false)
setColorTwo(false)
setColorThree(false)
setColorFour(true)
setColorFive(false)
if(color4===true){
  if(document.querySelector(".pf__body").classList.contains("pf__color1")){
    document.querySelector(".pf__body").classList.remove("pf__color1")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color2")){
    document.querySelector(".pf__body").classList.remove("pf__color2")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color3")){
    document.querySelector(".pf__body").classList.remove("pf__color3")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color5")){
    document.querySelector(".pf__body").classList.remove("pf__color5")
  }
  document.querySelector(".pf__body").classList.add("pf__color4")
}
}
function setColor5(){
setColorOne(false)
setColorTwo(false)
setColorThree(false)
setColorFour(false)
setColorFive(true)

if(color5===true){
  if(document.querySelector(".pf__body").classList.contains("pf__color1")){
    document.querySelector(".pf__body").classList.remove("pf__color1")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color2")){
    document.querySelector(".pf__body").classList.remove("pf__color2")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color3")){
    document.querySelector(".pf__body").classList.remove("pf__color3")
  }
  if(document.querySelector(".pf__body").classList.contains("pf__color4")){
    document.querySelector(".pf__body").classList.remove("pf__color4")
  }
  document.querySelector(".pf__body").classList.add("pf__color5")
}
}
  return (
    <div className="pf__body" >

    <Preloader />
    <ProfileHeader

    />

    <ProfileNavbar

    />


    {/*home section starts*/}
    <ProfileHome profilePic={profilePic}

    />
    {/*home section end*/}

    {/*about section end*/}
    <ProfileAbout profilePic={profilePic} aboutSectionManagement={aboutSectionManagement}

    />
    {/*about section end*/}


    {/*service section start*/}
    <ProfileService

    />

    {/*service section end*/}

    {/*porfolio section start*/}
    <ProfilePortfolio aboutPortfolioManagement={aboutPortfolioManagement} handlePortfolioItems={handlePortfolioItems}

    />

    {/*porfolio section end*/}

    {/*testimonial section start*/}
    <Testimonial

    />
    {/*testimonial section end*/}

    {/*contact section end*/}
      <Contact

      />
    {/*contact section end*/}

    {/*porfolio popup start*/}
      <Popup handlepopupDetails={handlepopupDetails} handlePopupClose={handlePopupClose} handlePrevSlide={handlePrevSlide} handleNextSlide={handleNextSlide} remove={remove}

      />
    {/*porfolio popup end*/}

    {/*style_switcher start*/}
    <Switcher
    setColor1={setColor1}
    setColor2={setColor2}
    setColor3={setColor3}
    setColor4={setColor4}
    setColor5={setColor5}
    />
    {/*style_switcher end*/}

    </div>
  )
}

export default Home
