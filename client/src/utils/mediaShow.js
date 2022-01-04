export const imageShow = (src) => {
  return(
    <img src={src} alt="images" className="social2__status_modal_img_thumbnail"/>)
}

export const videoShow = (src) => {
  return(
    <video controls src={src} alt="images" className="social2__status_modal_img_thumbnail"/>)
}
