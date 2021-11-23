import React from 'react'

const PortfolioItem = ({gitLink,siteLink,thumb,siteName,dssh,title,category,tools,client,date,description}) => {
  return (
    <div className="pf__porfolio_item" data-category={category}>
      <div className="pf__porfolio_item_inner pf__outer_shadow">
        <div className="pf__portfolio_item_img">
          <img src={thumb} alt="portfolio" data-screenshots={dssh} />
          {/*view porject btn*/}
          <span className="pf__view_project">view project</span>
         </div>
         <p className="pf__portfolio_item_tittle">{title} </p>
         {/*porfolio details start*/}
          <div className="pf__portfolio_item_details">
            <div className="pf__row">
              <div className="pf__description">
                <h3>Project Brief:</h3>
                <p>{description}</p>

              </div>
              <div className="pf__info">
                <h3>Project Info</h3>
                <ul>
                  <li>Date - <span>{date}</span> </li>
                  <li>Client - <span>{client}</span> </li>
                  <li>Tools - <span>{tools}</span> </li>
                  <li>Web - <span><a href={siteLink}>{siteName}</a></span> </li>
                  <li>Github - <span><a href={gitLink}>{siteName}</a></span> </li>


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
