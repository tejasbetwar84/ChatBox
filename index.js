const express=require('express');
const app=express();
const port =8000;
const http=require('http').createServer(app);

app.use(express.static('Assets'));


app.use('/',function(req,res){
    res.sendFile(__dirname+'/home.html');
});

http.listen(port,function(){
console.log('we are running on port',port);
})

//SOCKET
const io=require('socket.io')(http);

io.on('connection',function(socket){
    console.log('connected...')
   
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    }
)
})
