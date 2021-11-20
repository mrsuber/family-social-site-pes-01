import React from 'react'

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

import './ProfilePortfolio.css'
import {PortfolioItem} from '../../../components'

const ProfilePortfolio = ({aboutPortfolioManagement,handlePortfolioItems}) => {
  return (
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
                <PortfolioItem img={pf1} site="www.domain.com" date="2020" client="client1" tools="html, css, javascript" cat="web-application" title="Personal portfolio" dsh={dsh1+","+dsh2+","+dsh3+","+dsh4+","+dsh4+","+dsh5+","+dsh6} />
                {/*porfolio item end*/}


                {/*porfolio item start*/}

                <PortfolioItem img={pf2} site="www.domain2.com" date="2020" client="client2" tools="html, css, jqeury" cat="web-application" title="Weding couple" dsh={dsh11+","+dsh22} />


                {/*porfolio item end*/}



              {/*porfolio item start*/}
              <PortfolioItem img={pf3} site="www.domain.com" date="2020" client="client3" tools="html, css, bootstrap-4" cat="e-commerce" title="Product landing page" dsh={dsh111+","+dsh222+","+dsh333+","+dsh444+","+dsh555} />


              {/*porfolio item end*/}




              {/*porfolio item start*/}
              <PortfolioItem site="www.domain.com" date="2020" client="client4" tools="html, css, jquery" cat="web-application" title="Personal portfolio" img={pf4} dsh={dsh1111} />

              {/*porfolio item end*/}


              {/*porfolio item start*/}
              <PortfolioItem site="www.domain.com" date="2020" client="client5" tools="html, css, javascript" cat="web-application" title="fitness & gym" img={pf5} dsh={dsh11111} />

              {/*porfolio item end*/}


              {/*porfolio item start*/}
              <PortfolioItem site="www.domain.com" date="2020" client="client6" tools="html, css, javascript" cat="web-application" title="quize application" img={pf6} dsh={dsh61+","+dsh62+","+dsh63} />


              {/*porfolio item end*/}


              {/*porfolio item start*/}
              <PortfolioItem site="play store" date="2020" client="client7" tools="html, css, javascript" cat="mobile-app" title="xyz app" img={pf7} dsh={dsh71+","+dsh72} />


              {/*porfolio item end*/}


              {/*porfolio item start*/}
              <PortfolioItem site="www.domain.com" date="2020" client="client8" tools="html, css, javascript" cat="blender" title="Personal portfolio" img={pf8} dsh={dsh81+","+dsh82} />


              {/*porfolio item end*/}


                </div>
              {/*porfolio items end*/}

        </div>
    </section>
  )
}

export default ProfilePortfolio
