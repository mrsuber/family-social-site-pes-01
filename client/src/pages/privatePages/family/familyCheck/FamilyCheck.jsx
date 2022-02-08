import React,{useEffect,useState} from 'react'
import './FamilyCheck.css'
import {FAMILY_TYPES} from '../../../../redux/actions/familyAction'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../../../redux/actions/authAction'
import { Field, reduxForm } from 'redux-form'


const FamilyCheck = () => {
  const {family} = useSelector(state=>state)
  const dispatch = useDispatch()

  const initialState1 = {name:''}
  const[userData1,setUserData1]= useState(initialState1)
  const {name} = userData1
  const handleChangeInput1 = e=>{
    const {name,value} = e.target
    setUserData1({...userData1,[name]:value})
  }

  const handleJionFamily=(e)=>{
    e.preventDefault()
    console.log("the name is",name)
  }

  const handleContinueToFamily=(e)=>{
      e.preventDefault()
    dispatch({type:FAMILY_TYPES.SELECT_FAMILY, payload:false})
    window.location.pathname ='/social_home'
  }

  useEffect(() =>{

var gotoFamily = document.querySelector('#gotoFamily')
var jionFamily = document.querySelector('#jionFamily')
var createFamily = document.querySelector('#createFamily')
setTimeout(function(){ jionFamily.checked = true}, 1000)
setTimeout(function(){ gotoFamily.checked = true}, 2000)
setTimeout(function(){ createFamily.checked = true}, 2000)

},[])

  return (
    <div className="social2__select_family_card_wrapper">

          <div className="social2__select_family_card">

              <div className="social2__family_modal_header">
                  <h5 className="social2__family_modal_title">Select Family Obtion</h5>
              </div>
              {/* sample code begin*/}
              <div class="social2__family_container">

                  <input type="radio" name="tab" id="gotoFamily" checked="checked"/>
                  <input type="radio" name="tab" id="jionFamily"/>
                  <input type="radio" name="tab" id="createFamily"/>


                  <div class="social2__family_pages" style={{zIndex:'35'}}>

                        {/* start of go to family */}
                        <div class="social2__family_page">
                        <form onSubmit={handleContinueToFamily}>
                            <div class="social2__family_input">
                                <div class="social2__family_title">
                                    Continue to Family
                                </div>
                                <h3>"Family Name 1"</h3>
                            </div>
                            <div class="social2__family_input">
                                    <button type="submit">CONTINUE TO FAMILY</button>
                            </div>
                            </form>
                        </div>
                            {/* end of go to family */}

                            {/* start to jion family */}
                          <div class="social2__family_page social2__family_signup">
                            <form onSubmit={handleContinueToFamily}>
                                <div class="social2__family_input">
                                      <div class="social2__family_title">
                                          Jion A Family
                                      </div>
                                      <input class="social2__family_text" type="text" value={name} placeholder="Enter Family Name"/>
                                      <textarea class="social2__family_textarea" type="text" placeholder="How do you relate to this family"/>

                                  </div>
                                  <div class="social2__family_input">
                                          <button type="submit" >JION OLD FAMILY</button>
                                  </div>
                                    </form>
                          </div>

                          {/* end of join a family */}


                          {/* start to create family */}
                        <div class="social2__family_page social2__family_create">
                          <form onSubmit={handleContinueToFamily}>
                              <div class="social2__family_input">
                                    <div class="social2__family_title">
                                        Create A Family
                                    </div>
                                    <input class="social2__family_text" type="text" placeholder="Enter Family Name"/>
                                    <input class="social2__family_text" type="text" placeholder="Enter Mothers Name"/>
                                    <input class="social2__family_text" type="text" placeholder="Enter Fathers Name"/>
                                </div>
                                <div class="social2__family_input">
                                        <button type="submit">CREATE NEW FAMILY</button>
                                </div>
                                </form>
                        </div>
                        {/* end of create a family */}
                  </div>



                  <div class="social2__family_tabs">
                      <label class="social2__family_tab" for="gotoFamily">
                        <div class="social2__family_text social2_pointer">Go To Family</div>
                      </label>
                      <label class="social2__family_tab" for="jionFamily">
                        <div class="social2__family_text social2_pointer">Jion An Old Family</div>
                      </label>
                      <label class="social2__family_tab" for="createFamily">
                        <div class="social2__family_text social2_pointer">Create New Family</div>
                      </label>
                  </div>
        </div>
    {/* sample code end*/}
            <a href="/social_home" onClick={()=>dispatch(logout())} className="dropdown-item social2__family_check_logout"> Logout </a>
          </div>

    </div>
  )
}

export default FamilyCheck
