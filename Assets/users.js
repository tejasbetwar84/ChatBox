


const socket = io();
 let name;
 let textarea=document.querySelector("#textarea");
 let messagearea=document.querySelector(".message__area");

 do{
    name=prompt("Enter your name !");
 }while(!name);

 textarea.addEventListener('keyup',function(e){
     if(e.key=="Enter"){
       return sendMessage(e.target.value);
     }
 })

 function sendMessage(message){
    let msg ={
        user : name,
        message:message.trim(),
    }

    appendMessage(msg,"outgoing");
    textarea.value=" ";

    //sent to server
    socket.emit('message',msg);
    
 }


 function appendMessage(msg,type){

    let maindiv=document.createElement('div');
    let classname=type;
    maindiv.classList.add(classname,"message");

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
`
    
       maindiv.innerHTML=markup;
       messagearea.appendChild(maindiv)
       scrolltobottom();
    
}
 
//revceive 
socket.on('message',(msg)=>{
appendMessage(msg,'incoming')
scrolltobottom();
}
)

function scrolltobottom(){
    messagearea.scrollTop=messagearea.scrollHeight;
}