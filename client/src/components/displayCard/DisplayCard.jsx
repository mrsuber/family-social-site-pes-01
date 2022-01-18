import React,{useEffect} from 'react'
import './DisplayCard.css'

import {Link} from 'react-router-dom'


const DisplayCard = ({gs1,gs2,gs3,gs4,gs5,gs6,logo,heading,dispatch, text,family_type,dislayCardId,page,link}) => {

  const dragId = `slider2-drag-${dislayCardId}`;
  const spinId = `slider2-spin-${dislayCardId}`;
  const groundId = `slider2-ground-${dislayCardId}`;

  useEffect(()=>{
    console.log(dislayCardId, dragId,spinId,groundId)
    // seletion of id1
    var odrag = document.getElementById(dragId);
    var ospin = document.getElementById(spinId);
    var ground = document.getElementById(groundId);
    //end selection of id1

    // selection of tag1
    var aImg = ospin.getElementsByTagName("img");
    // end selection of tag1

    // declearing variables
    var radius = 340;
    var autoRotate = true;
    var rotateSpeed = -60;
    var imgWidth = 190;
    var imgHeight = 230;
    var aEle = [...aImg];
    var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;
    // end of declearing variables

    // using ids selected
    ospin.style.width = imgWidth + "px";
    ospin.style.height = imgHeight + "px";
    ground.style.width = radius * 3 + "px";
    ground.style.height = radius * 3 + "px";
    // end of using ids selected

    // function decleartion
    function init(delayTime){
       for(var i=0; i<aEle.length; i++){
           let element = aEle[i];

           element.style.transform = "rotateY(" + (i*(360 / aEle.length)) +"deg) translateZ("+radius + "px)";
           element.style.transition = "transform 1s";
           element.style.transitionDelay = delayTime || (aEle.length - i) /4 + "s";
         }
    }

    function applyTransform(obj){
      if(tY > 180) tY = 180;
      if(tY < 0) tY = 0;
      obj.style.transform = "rotateX(" + (-tY) +"deg) rotateY("+(tX) +"deg)";
    }

    function playSpin(yes){
      ospin.style.animationPlayState = (yes ? 'running' : 'paused');
    }

    setTimeout(init,1000);
    document.onpointerdown = function(e){
       clearInterval(odrag.timer);
       e = e || window.event;
       var sX = e.clientX,
            sY = e.clientY;

      this.onpointermove = function (e){
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;


            desX = nX - sX;
            desY = nY - sY;

            tX += desX * 0.1;
            tY += desY * 0.1;

            applyTransform(odrag);

            sX = nX;
            sY = nY;
      };

      this.onpointerup = function(e){
      odrag.timer = setInterval( function (){
        desX *= 0.95;
        desY *= 0.95;
        tX += desX * 0.1;
        tY += desY * 0.1;

        applyTransform(odrag);

        playSpin(false);

        if(Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5){
          clearInterval(odrag.timer);
          playSpin(true);
        }
      }, 17 );

      this.onpointermove = this.onpointerup = null;
    };
      return false;
  }





  if(autoRotate){
    var animationName = (rotateSpeed>0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;

  }




},[dislayCardId])


  return (
    <div className="index-box1 display-card">
     <Link to={`/${page}`} className="social2__link">
    <span className="social2__brand_wrapper"  style={{display:'flex',justifyContent:'center'}}>
       <Link to="/" className="social2__link"> <img src={logo} className="social2__brand_img" alt=""/></Link>
       <h1 className="social2_logoText1" onClick={()=>window.scrollTo({top:0})}>{heading}</h1>

     </span>
     </Link>
    <div className="slider2">
    <div id={dragId} style={{

        position: 'relative',
        display: 'flex',
        marginRight: 'auto',
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-10deg)'

    }}>

      <div id={spinId} style={{

           position: 'relative',
           display: 'flex',
           marginRight: 'auto',
           transformStyle: 'preserve-3d',
           transform: 'rotateX(-10deg)',
           left: '153%',
             top: '20%',

      }}>
      <div className="social2__spin_image">
          <img src={gs1} alt="" />
          <img src={gs2} alt="" />
          <img src={gs3} alt="" />
          <img src={gs4} alt="" />
          <img src={gs5} alt="" />
          <img src={gs6} alt="" />
          </div>

      </div>
      <div id={groundId} style={{

          width: '900px',
          height: '900px',
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translate(-50%. -50%) rotateX(90deg)'


      }}></div>
    </div>
    </div>
    <div className="social2__click_btn">
    <button className="social2__link"
    onClick={link}
    >
    {text}
    </button>
    </div>
  </div>
  )
}

export default DisplayCard
