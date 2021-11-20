import React from 'react'

const PortfolioItem = ({img,dsh}) => {
  return (
    <div className="pf__porfolio_item" data-category="web-application">
      <div className="pf__porfolio_item_inner pf__outer_shadow">
        <div className="pf__portfolio_item_img">
          <img src={img} alt="portfolio" data-screenshots={dsh} />
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
  )
}

export default PortfolioItem
