import React from 'react'
import {Facebook,YouTube, GitHub,LinkedIn,BusinessCenter,School} from '@material-ui/icons'
import './ProfileAbout.css'
import cv from '../../../images/master.pdf'

const ProfileAbout = ({profilePic,aboutSectionManagement}) => {
  return (
    <section className="pf__about_section pf__section" id="about">
      <div className="pf__container">
        <div className="pf__row">
          <div className="pf__section_title">
            <h2 data-heading="main info">Mohamad Siysinyuy Banbong: A Biography of Vision, Grit, and Innovation</h2>
          </div>
        </div>
        <div className="pf__row">
          <div className="pf__about_img">
            <div className="pf__img_box pf__inner_shadow">
              <img src={profilePic} alt="Profile Pic" className="pf__outer_shadow"/>
            </div>
            {/*social links start*/}
            <div className="pf__social_links">
                <a href="https://www.facebook.com/mohamad.siysinyuy" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><Facebook/></a>
                <a href="https://www.youtube.com/channel/UC1DjtEqj9566DSexb-BAtQw" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><YouTube/></a>
                <a href="https://github.com/mrsuber" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><GitHub/></a>
                <a href="https://www.linkedin.com/in/mohamad-siysinyuy-26154215b/" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><LinkedIn/></a>

            </div>
            {/*social links end*/}
          </div>
          <div className="pf__about_info">


            <p><span>Roots: From the Farm to the Future</span><br/>

<b></b><br/>

My story begins in the fertile soils of Cameroon, where my father—a dedicated crop and animal farmer—taught me the timeless principles of hard work, patience, and the cyclical beauty of growth. By age 10, I was knee-deep in the family farm, learning how dung enriched crops, how milk transformed into butter, and how a single seed could yield hundreds. But it was our neighbor, Ndiz—an agronomist with military precision in his fields—who showed me the power of systems. His fish ponds, egg-laying chickens, and geometrically perfect crops were my first lessons in scalability.</p>

<p>Yet, a pivotal field trip to Ndawara Tea Plantation revealed the missing link: technology. Watching machines—orchestrated by computers—process tea while human hands delicately harvested shoots, I realized the future of farming (and beyond) lay at the intersection of <b>agriculture, engineering, and software.</b></p>

<p><b>Education: The Engineering Mindset</b></p>

<p>I pursued <b>Computer Engineering at the University of Buea,</b> but my curiosity was never confined to a classroom. Chemistry explained my father’s pesticides; biology decoded animal husbandry; physics and advanced math laid the groundwork for machines. Yet, it was computer science that became my compass—a tool to bridge gaps across industries.</p>

<p>After graduation, I faced a harsh truth: investors wanted proof, not just plans. So I turned to <b>software engineering, </b>mastering full-stack development (React, Node.js, MERN) through The Odin Project, solving HackerRank challenges, and freelancing to fund my vision.</p>

<p><b>Leadership: Building Systems That Build People</b></p>

<p>As <b>General Manager of Camsol Technologies,</b> I led 20+ teams across international projects like Gasvisor and ValletPay, merging tech with business strategy. But my heart remained in solving systemic problems:</p>

<p>1.) <b>Round Table Cameroon:</b> Shocked by the lack of documented projects, I built a digital platform (roundtable.subercraftex.com) for tracking members, projects, and donations. When funding gaps stalled progress, I proposed a self-sustaining clubhouse—only to hit bureaucratic walls.</p>

<p>2.) <b>SUBER-Craftex:</b> Undeterred, I launched a multi-disciplinary design empire (subercraftex.com)—woodworking, fashion, digital design—funded by 7.1M FCFA of my own salary. It’s more than a business; it’s a training hub for 200+ youth/year and a revenue engine for community projects.</p>
<p> <b>The Core of Who I Am</b></p>

<p>1.) <b>The Farmer’s Son:</b> I measure success like harvests—outputs must dwarf inputs.</p>

<p>2.) <b>The Engineer:</b> I dissect problems into systems (whether code, supply chains, or crop cycles).</p>
<p>3.) <b>The Craftsman:</b> From embroidery (which paid my tuition) to full-stack development, <i>I build with my hands and mind.</i></p>
<p>4.) <b>The Leader:</b> At Camsol and SUBER-Craftex, I prove that <b>technology + tradition = transformation.</b></p>
<p><b>Why This Matters</b></p>

<p>My journey isn’t about titles—it’s about leverage.</p>

<p>--<b>For Farmers:</b> How AI can predict crop yields or fintech can streamline payments (like ValletPay).</p>

<p>--<b>For Youth:</b> How SUBER-Craftex’s apprenticeship model turns skills into livelihoods.</p>

<p>--<b>For Africa:</b> How blending agro-tech, design, and software can rewrite "developing" to "dominant."</p>

<p><b>What’s Next?</b></p>

<p>I’m seeking <b>allies</b>—remote internships, investors, or collaborators—who see the blueprint:</p>

<p>1.) <b>High-impact tech roles</b> where my hybrid skills (dev + design + strategy) can scale solutions.</p>
<p>2.) <b>Global platforms</b> to amplify African innovation (like my Round Table Tracker or Profundra for fundraising).</p>
<p>3.) <b>Mentorship</b> to refine my vision, because the best systems evolve with feedback.</p>
<p><i>"I don’t just build apps or furniture—I build ecosystems where people and ideas grow."</i></p>

            <a href={cv} className="pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1" >Download Cv</a>
            <a href="#contact" className=" pf__link_item pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1">Hire Me</a>
            <a href="#portfolio" className=" pf__link_item pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1">portfolio</a>

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
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span className="pf__project_num">100%(70-projects)</span>
                        <span className="pf__project_num1">100%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item" >
                    <p>Css</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span className="pf__project_num">100%(60-projects)</span>
                        <span className="pf__project_num1">100%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>JavaScript</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span className="pf__project_num">100%(65-projects)</span>
                        <span className="pf__project_num1">100%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}


              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>bootstrap</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span className="pf__project_num">100%(20-projects)</span>
                        <span className="pf__project_num1">100%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>jquery</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(80% - 14px)"}}>
                        <span className="pf__project_num">80%(8-projects)</span>
                        <span className="pf__project_num1">80%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>Git/Github</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span className="pf__project_num">100%(80-projects)</span>
                        <span className="pf__project_num1">100%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>Docker</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(80% - 14px)"}}>
                        <span className="pf__project_num">80%(8-projects)</span>
                        <span className="pf__project_num1">80%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>angular</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(80% - 14px)"}}>
                        <span className="pf__project_num">80%(8-project)</span>
                        <span className="pf__project_num1">80%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>react</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span className="pf__project_num">100%(25-projects)</span>
                        <span className="pf__project_num1">100%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>Nodejs</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(75% - 14px)"}}>
                        <span className="pf__project_num">75%(15-projects)</span>
                        <span className="pf__project_num1">75%</span>
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
                      <p>Developement of web applications and rest APIs, implementing the Micro-service architecture, deployment on heroku,FireBase,GitHub and NoSQL Database Management MongoDB and over 20+ different prodjects with Html, css,JavaScript,React and more</p>
                    </div>
                  </div>
                {/*experience start*/}

                {/*experience start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><BusinessCenter /></span>
                      <span>2021 - present</span>
                      <h3>Graphic Designer</h3>
                      <h4>Personal Projects</h4>
                      <p>Design of Graphics such as logos and websites as well as Photoshoots using tools like blender</p>

                    </div>
                  </div>
                {/*experience start*/}

                  {/*experience start*/}
                  <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><BusinessCenter /></span>
                      <span>2022 - 2023</span>
                      <h3>Chief Operational Officer</h3>
                      <h4>Company Projects</h4>
                      <p>Vallet Pay</p>

                    </div>
                  </div>
                {/*experience start*/}

                   {/*experience start*/}
                   <div className="pf__timeline_item">
                    <div className="pf__timeline_item_inner pf__outer_shadow">
                      <span className="pf__icon"><BusinessCenter /></span>
                      <span>2022 - present</span>
                      <h3>General Manager</h3>
                      <h4>Company Projects</h4>
                      <p>Vallet pay, Profundra</p>

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
                      <h4>complete</h4>
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
