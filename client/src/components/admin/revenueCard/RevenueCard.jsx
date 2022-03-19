import React from 'react'

const RevenueCard = ({profile}) => {
  return (
    <div  className="admin__revenue-card">
      <h3 className="admin__section-head">Total Revenue</h3>
        <div className="admin__rev-content">
            <img className="admin__img_rev" src={profile} alt="j" />
            <div className="admin__rev-info">
              <h3>Mohamad Siysinyuy</h3>
              <h1>3.5M <small>Subscribers</small></h1>
            </div>
            <div className="admin__rev-sum">
              <h4>Total income</h4>
              <h2>$70,859</h2>
            </div>
        </div>

    </div>
  )
}

export default RevenueCard
