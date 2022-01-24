import {useEffect} from 'react'
import './IndexPage.css'
import {MainHeader,SelectFamilyCard,DisplayCard} from '../../../components'
import {
  gs1,gs2,gs3,gs4,gs5,gs6,logo,
  gb1,gb2,gb3,gb4,gb5,gb6
} from '../../../images'
import {useSelector,useDispatch} from 'react-redux'
import {FAMILY_TYPES} from '../../../redux/actions/familyAction'
import {useHistory} from 'react-router-dom'

const IndexPage = () => {
  const{family,auth} = useSelector(state=>state)
  const dispatch = useDispatch()

  const history = useHistory()
  const redirectBlogHomePage = () => {
    history.push('/blog_home');
  }

  const redirectSocialHomePage = () =>{
    if(auth.token){
      history.push('/social_home');
    }else{
      history.push('/login');
    }

    // dispatch({type:FAMILY_TYPES.SELECT_FAMILY, payload:true})
  }

  return (

    <>


        <MainHeader/>
        {
          family.selectFamily && <SelectFamilyCard/>
        }
        <div className="index__card_wrapper">

        <span className="social2__index_card">
                <DisplayCard
                heading='Info'

                gs1={gb1}
                gs2={gb2}
                gs3={gb3}
                gs4={gb4}
                gs5={gb5}
                gs6={gb6}
                logo={logo}

                text='Information center!!'
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






        </div>

    </>

  )
}

export default IndexPage
