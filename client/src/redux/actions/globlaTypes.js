export const GLOBALTYPES = {
  AUTH:"AUTH",
  ALERT:"ALERT",
  THEME:'THEME',
  STATUS:'STATUS',
  MODAL:'MODAL',
  SOCKET:'SOCKET',
  ONLINE:'ONLINE',
  OFFLINE:'OFFLINE',
  CALL: 'CALL'
}

export const EditData = (data,id,post) =>{
  const newData = data.map(item =>
    (item._id ===id? post : item)
  )
  return newData
}

export const DeletData = (data,id)=>{
  const newData = data.filter(item => item._id !==id)
  return newData
}
