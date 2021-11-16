export const checkImage = (file) => {
  let err = ""
  if(!file){
    return err = "File does not exist."
  }

  if(file.size > 1024*1024){
    err = "The largest image size is 1mb."
  }
  if(file.type !== "image/jpeg" && file.type !=='image/png'){
    err = "Image format is incorrect."
  }

  return err;
}

export const imageUpload = (images) => {
  let imgArr = [];
  for(const item of images){
    const formData = new FormData()
    formData.append("file",item)
    formData.append("upload_preset","otq8kae0")
    formData.append("cloud_name","otq8kae0")
  }
}
