import {useEffect} from 'react'
import './IndexPage.css'
import {SelectFamilyCard,DisplayCard} from '../../../components'
import {
  gs1,gs2,gs3,gs4,gs5,gs6,logo,
  gb1,gb2,gb3,gb4,gb5,gb6,
  ad1,ad2,ad3,ad4,ad5,
} from '../../../images'
import {useSelector,useDispatch} from 'react-redux'
import {FAMILY_TYPES} from '../../../redux/actions/familyAction'
import {useHistory} from 'react-router-dom'

const IndexPage = () => {
  const{family,auth} = useSelector(state=>state)
  const dispatch = useDispatch()

  const history = useHistory()
  const redirectBlogHomePage = () => {
    window.location.href = "/porfolio/home"
  }



  const redirectAdminHome = () =>{
    window.location.href = "/admin"
  }

  const redirectSocialHomePage = () =>{
    if(auth.token){
      // history.push('/social_home');
      dispatch({type:FAMILY_TYPES.SELECT_FAMILY, payload:true})
      history.push('/social_home');
    }else{
      window.location.pathname ='/login';
    }


  }

  return (

    <>


        {
          family.selectFamily && <SelectFamilyCard/>
        }
        <div className="index__card_wrapper" >

        <span className="social2__index_card">
                <DisplayCard
                heading='Portfolio'

                gs1={gb1}
                gs2={gb2}
                gs3={gb3}
                gs4={gb4}
                gs5={gb5}
                gs6={gb6}
                logo={logo}

                text='About Mohamad S.B'
                dislayCardId={1}
                page='blog_home'
                link={redirectBlogHomePage}
                />

                </span>

        <span className="social2__index_card">
        <DisplayCard
        heading='Geneasocial'

        gs1={gs1}
        gs2={gs2}
        gs3={gs3}
        gs4={gs4}
        gs5={gs5}
        gs6={gs6}
        logo={logo}

        text='Socialize Here!!'
        dislayCardId={2}
        page='social_home'
        link={redirectSocialHomePage}
        />
        </span>


        <span className="social2__index_card">
        <DisplayCard
        heading='Dashboard'

        gs1={ad1}
        gs2={ad2}
        gs3={ad3}
        gs4={ad4}
        gs5={ad5}
        gs6={ad1}
        logo={logo}

        text='Manage All'
        dislayCardId={3}
        page='admin'
        link={redirectAdminHome}
        />
        </span>






        </div>

    </>

  )
}

export default IndexPage
