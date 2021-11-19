import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import profilePic from '../../../images/porfolioImages/me.webp'
import pf1 from '../../../images/porfolioImages/portfolio/thumb/project-1.png'
import pf2 from '../../../images/porfolioImages/portfolio/thumb/project-2.png'
import pf3 from '../../../images/porfolioImages/portfolio/thumb/project-3.png'
import pf4 from '../../../images/porfolioImages/portfolio/thumb/project-4.png'
import pf5 from '../../../images/porfolioImages/portfolio/thumb/project-5.png'
import pf6 from '../../../images/porfolioImages/portfolio/thumb/project-6.png'
import pf7 from '../../../images/porfolioImages/portfolio/thumb/project-7.png'
import pf8 from '../../../images/porfolioImages/portfolio/thumb/project-8.png'


import dsh1 from "../../../images/porfolioImages/portfolio/large/project-1/1.png"
import dsh2 from "../../../images/porfolioImages/portfolio/large/project-1/2.png"
import dsh3 from "../../../images/porfolioImages/portfolio/large/project-1/3.png"
import dsh4 from "../../../images/porfolioImages/portfolio/large/project-1/4.png"
import dsh5 from "../../../images/porfolioImages/portfolio/large/project-1/5.png"
import dsh6 from "../../../images/porfolioImages/portfolio/large/project-1/6.png"


import dsh11 from "../../../images/porfolioImages/portfolio/large/project-2/1.png"
import dsh22 from "../../../images/porfolioImages/portfolio/large/project-2/2.png"


import dsh111 from "../../../images/porfolioImages/portfolio/large/project-3/1.png"
import dsh222 from "../../../images/porfolioImages/portfolio/large/project-3/2.png"
import dsh333 from "../../../images/porfolioImages/portfolio/large/project-3/3.png"
import dsh444 from "../../../images/porfolioImages/portfolio/large/project-3/4.png"
import dsh555 from "../../../images/porfolioImages/portfolio/large/project-3/5.png"


import dsh1111 from "../../../images/porfolioImages/portfolio/large/project-4/1.png"

import dsh11111 from "../../../images/porfolioImages/portfolio/large/project-5/1.png"

import dsh61 from "../../../images/porfolioImages/portfolio/large/project-6/1.png"
import dsh62 from "../../../images/porfolioImages/portfolio/large/project-6/2.png"
import dsh63 from "../../../images/porfolioImages/portfolio/large/project-6/3.png"


import dsh71 from "../../../images/porfolioImages/portfolio/large/project-7/1.png"
import dsh72 from "../../../images/porfolioImages/portfolio/large/project-7/2.png"

import dsh81 from "../../../images/porfolioImages/portfolio/large/project-8/2.png"
import dsh82 from "../../../images/porfolioImages/portfolio/large/project-8/2.png"


import {PlayArrow,Add,Help,Search,Code,Palette,Facebook,Instagram, GitHub,LinkedIn,BusinessCenter,School,PhoneAndroid,ImportantDevices} from "@material-ui/icons"

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

const aboutPortfolioManagement= (e) =>{
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
    slideIndex = 0;
    popupToggle()
    popupSlideshow()
  }
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
  /*---------------------------------------
  popup.querySelector(".pf__pp_loader").classList.add("pf__active2")
  popupImg.src = imgSrc;
  popupImg.onload = () =>{
    // deactivate loader after popupImg loader
    popup.querySelector(".pf__pp_loader").classList.remove("pf__active2")

  }
  -----------------**/

  popupImg.src = imgSrc;
}

const Home = () => {

  // useEffect(()=>{
  //
  //
  // aboutPortfolioManagement()
  //
  // },[])


  return (
    <div className="pf__body">
    <header className="pf__header">
      <div className="pf__container">
        <div className="pf__row pf__justify_content_between">
          <div>
          <Link to="/" className="pf__link pf__logo">s</Link>
          </div>
          <div className="pf__hamburger_btn pf__outer_shadow pf__hover_in_shadow" >
          <span></span>
          </div>
        </div>
      </div>
    </header>


    <nav className="pf__nav_menu">
      <div className="pf__close_nav_menu pf__outer_shadow pf__hover_in_shadow">
        &times;
      </div>
      <div className="pf__nav_menu_inner">
        <ul>
          <li><Link to="/" className="pf__link pf__inner_shadow pf_active">home</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">about</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">services</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">portfolio</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">testimonial</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">contact</Link></li>
        </ul>
      </div>
      <p className="pf__copyright_text">&copy; 2021 MSB-Porfolio Web</p>
    </nav>

    {/*home section starts*/}
    <section className="pf__home_section pf__section">
    {/*effect wrap starts*/}
      <div className="pf__effect_wrap">
        <div className="pf__effect pf__effect1"></div>
        <div className=" pf__effect pf__effect2">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <div className="pf__effect pf__effect3"></div>

        <div className="pf__effect pf__effect4"></div>
        <div className="pf__effect pf__effect5">
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>

    {/*effect wrap end*/}
      <div className="pf__container">
        <div className="pf__row pf__full_screen  pf__align_items_center">
            <div className="pf__home_text">
              <p>Hello</p>
              <h2>I'm Mohamad Siysinyuy</h2>
              <h1>Web Designer & Developer</h1>
              <a href="#" className="pf__btn1 pf__outer_shadow pf__hover_in_shadow pf__link">More About Me</a>
            </div>
            <div className="pf__home_img">
              <div className="pf__img_box pf__inner_shadow">
                <img src={profilePic} alt="Profile-Pic" className="pf__outer_shadow"/>
              </div>
            </div>
        </div>
      </div>
    </section>
    {/*home section end*/}

    {/*about section end*/}
    <section className="pf__about_section pf__section">
      <div className="pf__container">
        <div className="pf__row">
          <div className="pf__section_title">
            <h2 data-heading="main info">About me</h2>
          </div>
        </div>
        <div className="pf__row">
          <div className="pf__about_img">
            <div className="pf__img_box pf__inner_shadow">
              <img src={profilePic} alt="Profile Pic" className="pf__outer_shadow"/>
            </div>
            {/*social links start*/}
            <div className="pf__social_links">
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><Facebook/></a>
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><Instagram/></a>
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><GitHub/></a>
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><LinkedIn/></a>

            </div>
            {/*social links end*/}
          </div>
          <div className="pf__about_info">
            <p><span>Hi! My name is Mohamad Siysinyuy. I am a Web Developer.</span>I was introduce to software development in my very first year in the university studying computer engineering which gave me a direct line to Web Development.
</p>
            <p>Due to personal research and following full-stack online curriculum, i learn about HTML and its evolution to HTML5, used tools like WAVE and W3C for accessibility, CSS3 ,Bootstrap, SASS, SCSS,for styling design and animations, then JavaScript, JQuery for logic and fetching data from REST APIs.</p>
            <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being familiar npm for installing dependencies and tools such as WebPack which came loaded with tools necessary for minifying my code for accessibility, Babel for translating ES6 JavaScript code to ES5 JavaScript code for browser compatability.</p>

            <p>To complete my full stack journey as a full stack developer, i was introduce to back-end technologies such as Nodjs, Python frame work like Flask, Django and NoSQL database like MongoDB, SQL database like MYSQL, and Docker technologies.
</p>
            <p>To showcase my projects to the world, I had to host them with FireBase, Heroku, Github.</p>

            <a href="cv.pdf" className="pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1" >Download Cv</a>
            <a href="#" className="pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1">Hire Me</a>
          </div>
        </div>
        {/*about taps start*/}
        <div className="pf__row">
          <div className="pf__about_tabs" onClick={aboutSectionManagement} >
            <span className="pf__tab_item pf__outer_shadow pf__active" data-target=".pf__skills">skills</span>
            <span className="pf__tab_item" data-target=".pf__experience">experience</span>
            <span className="pf__tab_item" data-target=".pf__education">education</span>
          </div>
        </div>

        {/*about taps end*/}

        {/*skills end*/}
        <div className="pf__row">
            <div className="pf__skills pf__tab_content pf__active">
            <div className="pf__row">

              {/*skill start*/}
                <div className="pf__skill_item" >
                    <p>Html</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(50% - 14px)"}}>
                        <span>50%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>JavaScript</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(60% - 14px)"}}>
                        <span>60%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}


              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>bootstrap</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(70% - 14px)"}}>
                        <span>70%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>jquery</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(80% - 14px)"}}>
                        <span>80%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>angular</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(90% - 14px)"}}>
                        <span>90%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>react</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span>100%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}



            </div>
            </div>
        </div>
        {/*skills end*/}

        {/*experience start*/}
          <div className="pf__row">
            <div className="pf__experience pf__tab_content">
            <div className="pf__row">
            <div className="pf__timeline">
            <div className="pf__row">
                {/*experience start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><BusinessCenter /></span>
                      <span>2019 - 2020</span>
                      <h3>back end developer</h3>
                      <h4>WAZAHUB Cameroon | Buea | Moliko</h4>
                      <p>Developement of transaction service Rest API with python frame work (Flask) implementing the Micro-service architecture, deployment on AWS using Docker technologies and MYSQL Database Management and over 200 different email templates using Html and Css. It was an intresting team of engineers</p>
                    </div>
                  </div>
                {/*experience start*/}

                {/*experience start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow" >
                      <span className="pf__icon"><BusinessCenter /></span>
                      <span>2021 - present</span>
                      <h3>full stack developer</h3>
                      <h4>Personal Projects</h4>
                      <p>Developement of transaction service Rest API with Nodejs implementing the Micro-service architecture, deployment on heroku,FireBase,GitHub and NoSQL Database Management MongoDB and over 20+ different prodjects with Html, css,JavaScript,React and more</p>
                    </div>
                  </div>
                {/*experience start*/}

                {/*experience start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><BusinessCenter /></span>
                      <span>2021 - present</span>
                      <h3>Web Designer</h3>
                      <h4>Personal Projects</h4>
                      <p>Developement of transaction service Rest API with Nodejs implementing the Micro-service architecture, deployment on heroku,FireBase,GitHub and NoSQL Database Management MongoDB and over 20+ different prodjects with Html, css,JavaScript,React and more</p>
                    </div>
                  </div>
                {/*experience start*/}
            </div>
            </div>
            </div>


            </div>
          </div>
        {/*experience ends*/}

          {/*education starts*/}
          <div className="pf__row">
            <div className="pf__education pf__tab_content">
            <div className="pf__row">
            <div className="pf__timeline">
            <div className="pf__row">
                {/*education start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><School /></span>
                      <span>2010 - 2011</span>
                      <h3>General Certificate of Educatiorn (GCE)</h3>
                      <h4>Ordinary Level(4-points | 4 papers)</h4>
                      <p>Government Bilingual High School (GBHS) kumbo</p>
                    </div>
                  </div>
                {/*education start*/}

                {/*education start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow" >
                      <span className="pf__icon"><School /></span>
                      <span>2011 - 2012</span>
                      <h3>General Certificate of Educatiorn (GCE)</h3>
                      <h4>Ordinary Level(17-points | 10 papers)</h4>
                      <p>Government Bilingual High School (GBHS) kumbo</p>
                    </div>
                  </div>
                {/*education start*/}

                {/*education start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><School /></span>
                      <span>2013 - 2014</span>
                      <h3>General Certificate of Educatiorn (GCE)</h3>
                      <h4>Advance Level(15-points | 5 papers)</h4>
                      <p>Government Bilingual High School (GBHS) kumbo</p>
                    </div>
                  </div>
                {/*education start*/}

                {/*education start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><School /></span>
                      <span>2016 - 2020</span>
                      <h3>Bachelor of Science in Computer Engineering(BSCE)</h3>
                      <h4>Incomplete</h4>
                      <p>University Of Buea</p>
                    </div>
                  </div>
                {/*education start*/}

                {/*education start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><School /></span>
                      <span>2020 - present</span>
                      <h3>Full-Stack Engineer</h3>
                      <h4>complete</h4>
                      <p>THE ODIN PROJECT</p>
                    </div>
                  </div>
                {/*education start*/}
            </div>
            </div>
            </div>


            </div>
          </div>
            {/*education ends*/}
      </div>

    </section>
    {/*about section end*/}


    {/*service section start*/}

    <section className="pf__service_section pf__section">
      <div className="pf__container">
        <div className="pf__row">
          <div className="pf__section_title">
            <h2 data-heading="Services">What i do</h2>
          </div>
        </div>
        <div className="pf__row">

            {/*service item start*/}
              <div className="pf__service_item">
                <div className="pf__service_item_inner pf__outer_shadow">
                  <div className="pf__icon pf__inner_shadow">
                    <PhoneAndroid/>
                  </div>
                  <h3>Responsive design</h3>
                  <p>Designs that respond to the user's behavior and environment based on screen size, platform and orientation. The practice consists of a mix of flexible grids and layouts, images and an intelligent use of CSS media queries. </p>
                </div>
              </div>
             {/*service item end*/}

             {/*service item start*/}
               <div className="pf__service_item">
                 <div className="pf__service_item_inner pf__outer_shadow">
                   <div className="pf__icon pf__inner_shadow">
                     <ImportantDevices/>
                   </div>
                   <h3>web design</h3>
                   <p>Good web designs easy to use, aesthetically pleasing, and suits the user group and brand of the website. Many webpages are designed with a focus on simplicity, so that no extraneous information and functionality that might distract or confuse users appears.</p>
                 </div>
               </div>
              {/*service item end*/}

              {/*service item start*/}
                <div className="pf__service_item">
                  <div className="pf__service_item_inner pf__outer_shadow">
                    <div className="pf__icon pf__inner_shadow">
                      <Palette/>
                    </div>
                    <h3>Graphic design</h3>
                    <p>Graphic design in this sense concerns aesthetic appeal to attract viewers using images, color and typography.</p>
                  </div>
                </div>
               {/*service item end*/}

               {/*service item start*/}
                 <div className="pf__service_item">
                   <div className="pf__service_item_inner pf__outer_shadow">
                     <div className="pf__icon pf__inner_shadow">
                       <Code/>
                     </div>
                     <h3>clean code</h3>
                     <p>Clean code reads like well-written prose and never obscures the designer's intent but rather is full of crisp abstractions and straightforward lines of control.</p>
                   </div>
                 </div>
                {/*service item end*/}

                {/*service item start*/}
                  <div className="pf__service_item">
                    <div className="pf__service_item_inner pf__outer_shadow">
                      <div className="pf__icon pf__inner_shadow">
                        <Search/>
                      </div>
                      <h3>seo marketing</h3>
                      <p>SEO stands for “search engine optimization.” In simple terms, it means the process of improving your site to increase its visibility when people search for products or services related to your business in Google, Bing, and other search engines. </p>
                    </div>
                  </div>
                 {/*service item end*/}

                 {/*service item start*/}
                   <div className="pf__service_item">
                     <div className="pf__service_item_inner pf__outer_shadow">
                       <div className="pf__icon pf__inner_shadow">
                         <Help/>
                       </div>
                       <h3>Great support</h3>
                       <p>Support engineer  available 24/7 that delivers product help and advice to registered users </p>
                     </div>
                   </div>
                  {/*service item end*/}
        </div>
      </div>
    </section>
    {/*service section end*/}

    {/*porfolio section start*/}

      <section className="pf__portfolio_section pf__section" onClick={aboutPortfolioManagement}>
          <div className="pf__container">
            <div className="pf__row">
                <div className="pf__section_title">
                  <h2 data-heading="portfolio">Latest Works</h2>
                </div>
            </div>
              {/*porfolio filter start*/}
                <div className="pf__row">
                  <div className="pf__portfolio_filter">
                    <span className="pf__filter_item pf__outer_shadow pf__active" data-target="all">all</span>
                    <span className="pf__filter_item" data-target="web-application">web aplications</span>
                    <span className="pf__filter_item" data-target="blender">blender</span>
                    <span className="pf__filter_item" data-target="mobile-app">mobile app</span>
                    <span className="pf__filter_item" data-target="e-commerce">e commerce</span>
                  </div>
                </div>
                {/*porfolio filter end*/}

                {/*porfolio items start*/}
                  <div className="pf__row pf__portfolio_items" onClick={handlePortfolioItems}>
                  {/*porfolio item start*/}
                    <div className="pf__porfolio_item" data-category="web-application">
                      <div className="pf__porfolio_item_inner pf__outer_shadow">
                        <div className="pf__portfolio_item_img">
                          <img src={pf1} alt="portfolio" data-screenshots={dsh1+","+dsh2+","+dsh3+","+dsh4+","+dsh4+","+dsh5+","+dsh6} />
                          {/*view porject btn*/}
                          <span className="pf__view_project">view project</span>
                         </div>
                         <p className="pf__portfolio_item_tittle">personal portfolio </p>
                         {/*porfolio details start*/}
                          <div className="pf__portfolio_item_details">
                            <div className="pf__row">
                              <div className="pf__description">
                                <h3>Project Brief:</h3>
                                <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                              </div>
                              <div className="pf__info">
                                <h3>Project Info</h3>
                                <ul>
                                  <li>Date - <span>2020</span> </li>
                                  <li>Client - <span>xyz</span> </li>
                                  <li>Tools - <span>html, css, javascript</span> </li>
                                  <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                                  <li>Date - <span>2020</span> </li>

                                </ul>
                              </div>
                            </div>
                          </div>
                         {/*porfolio details ends*/}
                      </div>
                    </div>
                  {/*porfolio item end*/}


                  {/*porfolio item start*/}
                    <div className="pf__porfolio_item" data-category="web-application">
                      <div className="pf__porfolio_item_inner pf__outer_shadow">
                        <div className="pf__portfolio_item_img">
                          <img src={pf2} alt="portfolio" data-screenshots={dsh11+","+dsh22} />
                          {/*view porject btn*/}
                          <span className="pf__view_project">view project</span>
                         </div>
                         <p className="pf__portfolio_item_tittle">wedding couple</p>
                         {/*porfolio details start*/}
                          <div className="pf__portfolio_item_details">
                            <div className="pf__row">
                              <div className="pf__description">
                                <h3>Project Brief:</h3>
                                <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                              </div>
                              <div className="pf__info">
                                <h3>Project Info</h3>
                                <ul>
                                  <li>Date - <span>2020</span> </li>
                                  <li>Client - <span>xyz</span> </li>
                                  <li>Tools - <span>html, css, jquery</span> </li>
                                  <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                                  <li>Date - <span>2020</span> </li>

                                </ul>
                              </div>
                            </div>
                          </div>
                         {/*porfolio details ends*/}
                      </div>
                    </div>
                  {/*porfolio item end*/}



                {/*porfolio item start*/}
                  <div className="pf__porfolio_item" data-category="e-commerce">
                    <div className="pf__porfolio_item_inner pf__outer_shadow" >
                      <div className="pf__portfolio_item_img">
                        <img src={pf3} alt="portfolio" data-screenshots={dsh111+","+dsh222+","+dsh333+","+dsh444+","+dsh555} />
                        {/*view porject btn*/}
                        <span className="pf__view_project">view project</span>
                       </div>
                       <p className="pf__portfolio_item_tittle">product landing page</p>
                       {/*porfolio details start*/}
                        <div className="pf__portfolio_item_details">
                          <div className="pf__row">
                            <div className="pf__description">
                              <h3>Project Brief:</h3>
                              <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                            </div>
                            <div className="pf__info">
                              <h3>Project Info</h3>
                              <ul>
                                <li>Date - <span>2020</span> </li>
                                <li>Client - <span>xyz</span> </li>
                                <li>Tools - <span>html, css, bootstrap-4</span> </li>
                                <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                                <li>Date - <span>2020</span> </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                       {/*porfolio details ends*/}
                    </div>
                  </div>
                {/*porfolio item end*/}




                {/*porfolio item start*/}
                  <div className="pf__porfolio_item" data-category="web-application">
                    <div className="pf__porfolio_item_inner pf__outer_shadow" >
                      <div className="pf__portfolio_item_img">
                        <img src={pf4} alt="portfolio" data-screenshots={dsh1111} />
                        {/*view porject btn*/}
                        <span className="pf__view_project">view project</span>
                       </div>
                       <p className="pf__portfolio_item_tittle">personal porfolio</p>
                       {/*porfolio details start*/}
                        <div className="pf__portfolio_item_details">
                          <div className="pf__row">
                            <div className="pf__description">
                              <h3>Project Brief:</h3>
                              <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                            </div>
                            <div className="pf__info">
                              <h3>Project Info</h3>
                              <ul>
                                <li>Date - <span>2020</span> </li>
                                <li>Client - <span>xyz</span> </li>
                                <li>Tools - <span>html, css, jquery</span> </li>
                                <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                                <li>Date - <span>2020</span> </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                       {/*porfolio details ends*/}
                    </div>
                  </div>
                {/*porfolio item end*/}


                {/*porfolio item start*/}
                  <div className="pf__porfolio_item" data-category="web-application">
                    <div className="pf__porfolio_item_inner pf__outer_shadow" >
                      <div className="pf__portfolio_item_img">
                        <img src={pf5} alt="portfolio" data-screenshots={dsh11111} />
                        {/*view porject btn*/}
                        <span className="pf__view_project">view project</span>
                       </div>
                       <p className="pf__portfolio_item_tittle">fitness & gym</p>
                       {/*porfolio details start*/}
                        <div className="pf__portfolio_item_details">
                          <div className="pf__row">
                            <div className="pf__description">
                              <h3>Project Brief:</h3>
                              <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                            </div>
                            <div className="pf__info">
                              <h3>Project Info</h3>
                              <ul>
                                <li>Date - <span>2020</span> </li>
                                <li>Client - <span>xyz</span> </li>
                                <li>Tools - <span>html, css, jquery</span> </li>
                                <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                                <li>Date - <span>2020</span> </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                       {/*porfolio details ends*/}
                    </div>
                  </div>
                {/*porfolio item end*/}


                {/*porfolio item start*/}
                  <div className="pf__porfolio_item" data-category="web-application">
                    <div className="pf__porfolio_item_inner pf__outer_shadow" >
                      <div className="pf__portfolio_item_img">
                        <img src={pf6} alt="portfolio" data-screenshots={dsh61+","+dsh62+","+dsh63} />
                        {/*view porject btn*/}
                        <span className="pf__view_project">view project</span>
                       </div>
                       <p className="pf__portfolio_item_tittle">Quiz application</p>
                       {/*porfolio details start*/}
                        <div className="pf__portfolio_item_details">
                          <div className="pf__row">
                            <div className="pf__description">
                              <h3>Project Brief:</h3>
                              <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                            </div>
                            <div className="pf__info">
                              <h3>Project Info</h3>
                              <ul>
                                <li>Date - <span>2020</span> </li>
                                <li>Client - <span>xyz</span> </li>
                                <li>Tools - <span>html, css, javascript</span> </li>
                                <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                                <li>Date - <span>2020</span> </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                       {/*porfolio details ends*/}
                    </div>
                  </div>
                {/*porfolio item end*/}


                {/*porfolio item start*/}
                  <div className="pf__porfolio_item" data-category="mobile-app">
                    <div className="pf__porfolio_item_inner pf__outer_shadow" >
                      <div className="pf__portfolio_item_img">
                        <img src={pf7} alt="portfolio" data-screenshots={dsh71+","+dsh72} />
                        {/*view porject btn*/}
                        <span className="pf__view_project">view project</span>
                       </div>
                       <p className="pf__portfolio_item_tittle">xyz app</p>
                       {/*porfolio details start*/}
                        <div className="pf__portfolio_item_details">
                          <div className="pf__row">
                            <div className="pf__description">
                              <h3>Project Brief:</h3>
                              <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                            </div>
                            <div className="pf__info">
                              <h3>Project Info</h3>
                              <ul>
                                <li>Date - <span>2020</span> </li>
                                <li>Client - <span>xyz</span> </li>
                                <li>Tools - <span>java, android</span> </li>
                                <li>play Store - <span><a href="#">xyz</a></span> </li>
                                <li>Date - <span>2020</span> </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                       {/*porfolio details ends*/}
                    </div>
                  </div>
                {/*porfolio item end*/}


                {/*porfolio item start*/}
                  <div className="pf__porfolio_item" data-category="blender">
                    <div className="pf__porfolio_item_inner pf__outer_shadow" >
                      <div className="pf__portfolio_item_img">
                        <img src={pf8} alt="portfolio" data-screenshots={dsh81+","+dsh82} />
                        {/*view porject btn*/}
                        <span className="pf__view_project">view project</span>
                       </div>
                       <p className="pf__portfolio_item_tittle">personal portfolio</p>
                       {/*porfolio details start*/}
                        <div className="pf__portfolio_item_details">
                          <div className="pf__row">
                            <div className="pf__description">
                              <h3>Project Brief:</h3>
                              <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

                            </div>
                            <div className="pf__info">
                              <h3>Project Info</h3>
                              <ul>
                                <li>Date - <span>2020</span> </li>
                                <li>Client - <span>xyz</span> </li>
                                <li>Tools - <span>blender</span> </li>
                                <li>printpress - <span><a href="#">xyz</a></span> </li>
                                <li>Date - <span>2020</span> </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                       {/*porfolio details ends*/}
                    </div>
                  </div>
                {/*porfolio item end*/}


                  </div>
                {/*porfolio items end*/}

          </div>
      </section>
    {/*porfolio section end*/}

    {/*porfolio popup start*/}
      <div className="pf__pp pf__portfolio_popup">
        <div className="pf__pp_details">
          <div className="pf__pp_details_inner">
            <div className="pf__pp_title">
              <h2>personal porfolio</h2>
              <p>Category - <span className="pf__pp_project_category">Web Application</span></p>
            </div>
            <div className="pf__pp_project_details">
            <div className="pf__row">
              <div className="pf__description">
                <h3>Project Brief:</h3>
                <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

              </div>
              <div className="pf__info">
                <h3>Project Info</h3>
                <ul>
                  <li>Date - <span>2020</span> </li>
                  <li>Client - <span>xyz</span> </li>
                  <li>Tools - <span>html, css, javascript</span> </li>
                  <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                  <li>Date - <span>2020</span> </li>

                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="pf__separator"></div>

        <div className="pf__pp_main">
          <div className="pf__pp_main_inner">
          <div className="pf__pp_project_details_btn pf__outer_shadow pf__hover_in_shadow">Project Details <Add/> </div>
          <div className="pf__pp_close pf__outer_shadow pf__hover_in_shadow" onClick={handlePopupClose}>&times;</div>
            <img src={dsh1} alt="img" className="pf__pp_img pf__outer_shadow" />
            <div className="pf__pp_counter">1 of 6</div>
          </div>
          <div className="pf__pp_loader">
            <div></div>
          </div>
            {/*porfolio navigation start*/}
              <div className="pf__pp_prev"><PlayArrow/></div>
              <div className="pf__pp_next"><PlayArrow/></div>
              {/*porfolio navigation start*/}
        </div>
      </div>
    {/*porfolio popup end*/}

    </div>
  )
}

export default Home
