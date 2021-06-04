const express = require('express')
const app = express();


app.set("view engine","ejs");

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index')
})


const server = app.listen(4000, ()=>{
    console.log("server started on port 4000");
})


// sever connection

const io = require('socket.io')(server);

io.on('connection',(socket) =>
{
    console.log(`New client has been connected ${socket.id}`);

    socket.username = 'Unkown'

    socket.on('new_message', (data) =>{
        io.sockets.emit('new_message',{message:data.message, username: socket.username})
    })

    socket.on('change_username', data =>{
        socket.username = data.username;
    })



})