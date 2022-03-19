import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';

const SalariesVSJobs = () => {
  return (
    <div className="admin__graph-card">
        <h3 className="admin__section-head">Graph of Salary vs Jobs</h3>
        <div className="admin__graph-content">
          <div className="admin__graph-head">
            <div className="admin__icons-wrapper">
                <div className="admin__icon">
                  <span className="admin__las admin__la-eye admin__text-main"><FontAwesomeIcon icon={faEye} /></span>
                </div>

                <div className="admin__icon">
                  <span className="admin__las admin__la-eye admin__text-success"><FontAwesomeIcon icon={faClock} /></span>
                </div>
            </div>
            <div className="admin__graph-select">
              <select name="" id="">
                  <option value="">September</option>
              </select>
            </div>
          </div>
          <div className="admin__graph-board">
            <canvas id="admin__revenueChart" width="100%" height="50px">

            </canvas>
          </div>
        </div>
    </div>
  )
}

export default SalariesVSJobs
