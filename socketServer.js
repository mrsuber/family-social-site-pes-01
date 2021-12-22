
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



// createcomment
socket.on('createComment', newPost =>{
  const ids= [...newPost.user.followers, newPost.user._id]
  const clients = users.filter(user => ids.includes(user.id))
    if(clients.length>0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('createCommentToClient',newPost)
      })
    }
})
// deletecomment
socket.on('deleteComment', newPost =>{
  const ids= [...newPost.user.followers, newPost.user._id]
  const clients = users.filter(user => ids.includes(user.id))
    if(clients.length>0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('deleteCommentToClient',newPost)
      })
    }
})


// follow user
socket.on('follow', newUser =>{
  const user = users.find(user => user.id === newUser._id)
  user && socket.to(`${user.socketId}`).emit('followToClient',newUser)
})

// unfollow user
socket.on('unFollow', newUser =>{
  const user = users.find(user => user.id === newUser._id)
  user && socket.to(`${user.socketId}`).emit('unFollowToClient',newUser)
})







}


module.exports = SocketServer