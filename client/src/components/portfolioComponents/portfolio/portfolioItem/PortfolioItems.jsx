import React from 'react'

const PortfolioItem = ({img,dsh,title,cat,tools,client,date,site}) => {
  return (
    <div className="pf__porfolio_item" data-category={cat}>
      <div className="pf__porfolio_item_inner pf__outer_shadow">
        <div className="pf__portfolio_item_img">
          <img src={img} alt="portfolio" data-screenshots={dsh} />
          {/*view porject btn*/}
          <span className="pf__view_project">view project</span>
         </div>
         <p className="pf__portfolio_item_tittle">{title} </p>
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
                  <li>Date - <span>{date}</span> </li>
                  <li>Client - <span>{client}</span> </li>
                  <li>Tools - <span>{tools}</span> </li>
                  <li>Web - <span><a href="#">{site}</a></span> </li>


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
