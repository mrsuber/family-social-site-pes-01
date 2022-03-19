import React from 'react'
import {Facebook,YouTube, GitHub,LinkedIn,BusinessCenter,School} from '@material-ui/icons'
import './ProfileAbout.css'
import cv from '../../../images/cv.pdf'

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
                <a href="https://www.facebook.com/mohamad.siysinyuy" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><Facebook/></a>
                <a href="https://www.youtube.com/channel/UC1DjtEqj9566DSexb-BAtQw" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><YouTube/></a>
                <a href="https://github.com/mrsuber" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><GitHub/></a>
                <a href="https://www.linkedin.com/in/mohamad-siysinyuy-26154215b/" target="__blank" className="pf__link pf__outer_shadow pf__hover_in_shadow"><LinkedIn/></a>

            </div>
            {/*social links end*/}
          </div>
          <div className="pf__about_info">


            <p><span>Hi! My name is Mohamad Siysinyuy. I am a Web Developer.</span>

If you are to know about me, you have to understand my background story, what drives me to be who I am.</p>

<p>I will at my level best try to be brief as much as possible.</p>

<p>My father was a farmer when I was in class four, Understand he is a farmer currently and he was probably a farmer long before I was born. but I choose to coin when I was in class four because that was when the farming truly got to me, this was when I truly developed a love for farming.</p>

<p>My father's specialty was both crop and animal farming, dung from the cow was put in a hole, for it to mature(as he called it), and then after a while, it was transported to the crops which did excessively well, dark green in color and the produce was high.</p>

<p>I use to help him on the farm so often, we will sell products to customers together and use pesticides chemicals to treat crops like cabbages, tomatoes, and more.</p>

<p>This is when I noticed that no business in the world made profit literally as farming, example, you plant one seed of corn and you harvest 500 seeds, products from cows like milk was an expensive gain on its own, not to talk of the butter gotten from it, as well as the yogurt made from milk that some butter has been extracted from.</p>

<p>My father also introduced me to some of his friends in the business only one of them outshine all, I use to call him Ndiz, he had finished the school of agriculture he says and from what he could do confirms his story strongly.</p>

<p>His specialty was also crop farming but he was also into bird and fish farming. His farm was amazing to look at, all partitioned, all in very stright lines as if he told the crops what height to take and what lines not to cross as they grew.</p>

<p>The chicken he kept were “layers” he called them because they were not for consumption but for laying eggs. I have never seen so many eggs in one place to this day. I used to help him pick some of those eggs, some very normal, other funny-looking.</p>
<p> His fish pond was never of so much interest to me at first because you only see fish when he feeds them but during an Agro-Pastoral show, I saw what they describe a fish, the kind you see only on TV and in a book, a fish with whiskers so calm, so confident in the water as if it knew it was the star of the show.</p>

<p>when I finished class seven and went into secondary school, my dad advised me to study science, because it will tell me more about the chemicals he used and he was right, chemistry and biology did a thorough job in that.</p>

<p>But it did not just explain and end there. very much more than my expectation I was introduced to computer science and went on a field trip to Ndawara Tea Plantation.
This was the biggest piece of land I ever saw and I learned two very important things that day.</p>
<p>First and most important was that machines did most of the work on the farm, either it was tractors in working the farm or the machines that help process tea right to sealing it in bags,</p>
<p>secondly I also learn that these machines were controlled by computers</p>
<p>Thirdly I learn that certain aspects of farming will always need a human touch, for example, harvesting tea, human hands needed to pick the soft shoot part of the plant, and normally machines will just harvest uniformly and lastly I learn that such labor in Cameroon was cheap.</p>

<p>Labour has always been cheap and that is why colonial masters came to Africa according to African history thought in school. </p>

<p>For the first time I researched something, how do I get a computer to do all that as well as how do I build machines to do that, this lead me  to three fields of study,<br/>
computer engineering,<br/>
mechanical engineering, and agriculture<br/>
when I was done with the ordinary level and had to go to high school, I decided to study something that will expose me in any of the there fields above, that was chemistry, biology, physics, pure maths, and further maths,</p>

<p>while in high school we went for another field trip to Tadu Dairy Cooperative. This was a trip to teach us about cross-breeding and the different products of milk,
in addition to normal school learning, I saw for the first time an entire building can be made into a refrigerator, you can probably guess what ran in my head if such technology was applied to the whole farming process.
I also learn that we gave our milk out for free compared to Tardu Dairy price and we never extracted half of the products that can be harvested from milk.</p>

<p>After high school, I had to make a choice how to further my education and my choice was computer engineering because it cuts across all fields of studies, a doctor needs a computer system to manage drug prescriptions as much as a farmer to manage accounts.
I dived into computer engineering and as you know my specialty was software engineering, in the university I was introduced to the accounting and business part.
I understood knowing about farming was not enough if I intended to lead in business, I had to see it from the business perspective, I am talking about investment, shares, shareholders, partnership, balance sheet, and all the complicated business terms you can read about. This was necessary to understand if not, my government will shut me down themselves.</p>

<p>immediately after graduation, I did a demo, wrote a business plan, and move around talking to business investors, this took about 6 months of travel and presentations and I notice that business investors are more likely to invest in something solid, some part of this project can be traced, ether proper documentation or some portion of the land has produced the product and is flourishing,</p>

<p>I quickly knew that the initial capital for such will be raised by me, and the second most paying job is engineering, software engineering at the very top of the list.</p>

<p>I decided that to sharpen my skills and for me to  compete with the world I have to be truly good with computers, I took on The Odin Project which teaches and shapes you into a web developer, I have done this in school before but this was another level in the specialty, with lost of links to read and lots of assignments, I am currently on the last chapter of The Odin Project which is "Getting Hired"
</p>

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
                      <div class="pf__progress_bar" style={{width:"calc(40% - 14px)"}}>
                        <span className="pf__project_num">40%(8-projects)</span>
                        <span className="pf__project_num1">40%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>jquery</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(40% - 14px)"}}>
                        <span className="pf__project_num">40%(8-projects)</span>
                        <span className="pf__project_num1">40%</span>

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
                      <div class="pf__progress_bar" style={{width:"calc(40% - 14px)"}}>
                        <span className="pf__project_num">40%(8-projects)</span>
                        <span className="pf__project_num1">40%</span>

                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>angular</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(40% - 14px)"}}>
                        <span className="pf__project_num">40%(8-project)</span>
                        <span className="pf__project_num1">40%</span>

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
