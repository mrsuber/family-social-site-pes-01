
let users = []

const EditData = (data, id, call) =>{
  const newData = data.map(item =>
      item.id === id ? {...item, call} : item
  )
  return newData;
}


const SocketServer = (socket)=>{
  //Connect - Disconnect
socket.on('jionUser', user =>{
  users.push({id: user._id, socketId: socket.id, followers: user.followers})
})

socket.on('disconnect',() =>{
  const data = users.find(user => user.socketId === socket.id)

  if(data){
    const clients = users.filter( user =>
      data.followers.find( item => item._id === user.id)
    )
    if(clients.length > 0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
      })
    }
  }
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

//Notifications

socket.on('createNotify', msg =>{
  const clients = users.filter(user => msg.recipients.includes(user.id))
    if(clients.length>0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('createNotifyToClient',msg)
      })
    }
})

socket.on('removeNotify', msg =>{
  const clients = users.filter(user => msg.recipients.includes(user.id))
    if(clients.length>0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('removeNotifyToClient',msg)
      })
    }
})


//message
socket.on('addMessage', msg =>{
  const user = users.find(user => user.id === msg.recipient)
  user && socket.to(`${user.socketId}`).emit(`addMessageToClient`, msg)
})


// chec user online / offline

  socket.on('checkUserOnline', data => {
    const following = users.filter(user => data.following.find(item => item._id === user.id))

    socket.emit('checkUserOnlineToMe', following)

    const clients = users.filter(user => data.followers.find(item => item._id === user.id))

    if(clients.length > 0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id)
      })
    }
  })


  //calls to user

   socket.on('callUser', data =>{

     // console.log({oldUsers: users})

     users = EditData(users, data.sender, data.recipient)

     const client = users.find(user => user.id === data.recipient)
     if(client){
        if(client.call){
           users = EditData(users, data.sender, null)
           socket.emit('userBusy', data)
        }else{
           users = EditData(users, data.recipient, data.sender)
           socket.to(`${client.socketId}`).emit(`callUserToClient`, data)
        }
     }

     // console.log({newUsers:users})
   })

   socket.on('endCall', data =>{
     // console.log({old:users})

    const client = users.find(user => user.id === data.sender)

    if(client){
      socket.to( `${client.socketId}`).emit('endCallToClient', data)
        users = EditData(users, client.id, null)

      if(client.call){
        const clientCall = users.find(user => user.id === client.call)
        clientCall && socket.to( `${clientCall.socketId}`).emit('endCallToClient', data)
          users = EditData(users, client.call, null)
      }
    }




    // console.log({new:users})
   })


}


module.exports = SocketServer
