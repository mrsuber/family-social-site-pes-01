import React from 'react'
import {Facebook,Instagram, GitHub,LinkedIn,BusinessCenter,School} from '@material-ui/icons'
import './ProfileAbout.css'

const ProfileAbout = ({profilePic,aboutSectionManagement}) => {
  return (
    <section className="pf__about_section pf__section" id="about">
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
            <a href="#contact" className=" pf__link_item pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1">Hire Me</a>
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
  )
}

export default ProfileAbout
