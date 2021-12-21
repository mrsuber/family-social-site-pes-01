
let users = []
const SocketServer = (socket)=>{
  //Connect - Disconnect
socket.on('jionUser', id =>{
  users.push({id, socketId: socket.id})
})

socket.on('disconnect',() =>{
  users= users.filter(user=>user.socketId !==socket.id)
})


//likes
socket.on('likePost', newPost =>{
  const ids= [...newPost.user.followers, newPost.user._id]
  const clients = users.filter(user => ids.includes(user.id))
    if(clients.length>0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeToClient',newPost)
      })
    }
})


// unlike
socket.on('unLikePost', newPost =>{
  const ids= [...newPost.user.followers, newPost.user._id]
  const clients = users.filter(user => ids.includes(user.id))
    if(clients.length>0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('unLikeToClient',newPost)
      })
    }
})



}


module.exports = SocketServer
