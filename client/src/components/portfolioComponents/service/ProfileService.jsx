import React from 'react'
import './ProfileService.css'
import {Help,Search,Code,Palette,PhoneAndroid,ImportantDevices} from '@material-ui/icons'

const ProfileService = () => {
  return (
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
  )
}

export default ProfileService
