const app = require('express')();
const http = require('http').Server(app);
const path = require('path')
const port = 4500;
const io = require('socket.io')(http);


app.get('/',(req,res)=>{
    var option = {
        root :path.join(__dirname)
    }
    var fileName = 'client.html'
    res.sendFile(fileName,option)
})

var users = [];
io.on('connection',(socket)=>{
   //name catch
  socket.on('setName',(data)=>{
        var compare = users.indexOf(data) > -1
        if(compare){
            socket.emit('userExists',`${data} userName is already exists please try a different Name`)
        }else{
            users.push(data);
            socket.emit('setUser',{userName:data})
        }
  })

  socket.on('msg',(data)=>{
    io.sockets.emit('newMsg',data)
  })

})

http.listen(port,()=>{
    console.log("Server is Running on Port "+ port )
})