import React,{useEffect} from 'react'
import './SelectFamilyCard.css'
import {FAMILY_TYPES} from '../../../redux/actions/familyAction'
import {useSelector,useDispatch} from 'react-redux'


const SelectFamilyCard = () => {
  const {family} = useSelector(state=>state)
  const dispatch = useDispatch()

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
                  <span onClick={() => dispatch({type:FAMILY_TYPES.SELECT_FAMILY, payload:false})}>&times;</span>
              </div>
              {/* sample code begin*/}
              <div class="social2__family_container">

                  <input type="radio" name="tab" id="gotoFamily" checked="checked"/>
                  <input type="radio" name="tab" id="jionFamily"/>
                  <input type="radio" name="tab" id="createFamily"/>


                  <div class="social2__family_pages">

                        {/* start of go to family */}
                        <div class="social2__family_page">
                        <form>
                            <div class="social2__family_input">
                                <div class="social2__family_title">
                                    Go To Your Family
                                </div>
                                <input class="social2__family_text" type="text" placeholder="Enter Family Name"/>
                            </div>
                            <div class="social2__family_input">
                                    <button type="submit">GO TO FAMILY</button>
                            </div>
                            </form>
                        </div>
                            {/* end of go to family */}

                            {/* start to jion family */}
                          <div class="social2__family_page social2__family_signup">
                            <form>
                                <div class="social2__family_input">
                                      <div class="social2__family_title">
                                          Jion A Family
                                      </div>
                                      <input class="social2__family_text" type="text" placeholder="Enter Family Name"/>
                                  </div>
                                  <div class="social2__family_input">
                                          <button type="submit" >JION OLD FAMILY</button>
                                  </div>
                                    </form>
                          </div>

                          {/* end of join a family */}


                          {/* start to create family */}
                        <div class="social2__family_page social2__family_create">
                          <form>
                              <div class="social2__family_input">
                                    <div class="social2__family_title">
                                        Create A Family
                                    </div>
                                    <input class="social2__family_text" type="text" placeholder="Enter Family Name"/>
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
                        <div class="social2__family_text">Go To Family</div>
                      </label>
                      <label class="social2__family_tab" for="jionFamily">
                        <div class="social2__family_text">Jion An Old Family</div>
                      </label>
                      <label class="social2__family_tab" for="createFamily">
                        <div class="social2__family_text">Create New Family</div>
                      </label>
                  </div>
        </div>
    {/* sample code end*/}

          </div>
    </div>
  )
}

export default SelectFamilyCard
