import './IndexPage.css'
import {DisplayCard} from '../../../components'
import {
  gs1,gs2,gs3,gs4,gs5,gs6,logo,
  gb1,gb2,gb3,gb4,gb5,gb6,
  sc1,sc2,sc3,sc4,sc5,sc6,
  ad1,ad2,ad3,ad4,ad5,
} from '../../../images'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const IndexPage = () => {
  const{auth} = useSelector(state=>state)

  const history = useHistory()


  const redirectBlogHomePage = () => {
    window.location.href = "/porfolio/home"
  }
  const redirectAdminHome = () =>{
    window.location.href = "/admin"
  }
  const redirectSchool = () =>{
    window.location.href = "/school/devcourse/"
  }

  const redirectSocialHomePage = () =>{
    if(auth.token){
      // history.push('/social_home');
      history.push('/social_home');
    }else{
      window.location.pathname ='/login';
    }
  }

  return (

    <>



        <div className="index__card_wrapper" >
        {/*
          data
          ? data.map((index,item)=>(
            <span className="social2__index_card" key={index}>
                    <DisplayCard
                    heading={item.heading}

                    gs1={item.gs1}
                    gs2={item.gs2}
                    gs3={item.gs3}
                    gs4={item.gs4}
                    gs5={item.gs5}
                    gs6={item.gs6}
                    logo={item.logo}

                    text={item.text}
                    dislayCardId={item.id}
                    page={item.page}
                    link={redirect(item.link)}
                    />

                    </span>
          ))
          :<span>Loading....</span>
        */}

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
        heading='School'

        gs1={sc1}
        gs2={sc2}
        gs3={sc3}
        gs4={sc4}
        gs5={sc5}
        gs6={sc6}
        logo={logo}

        text='Studies'
        dislayCardId={3}
        page='school'
        link={redirectSchool}
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
        dislayCardId={4}
        page='admin'
        link={redirectAdminHome}
        />
        </span>






        </div>

    </>

  )
}

export default IndexPage
