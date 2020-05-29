const socket = io();

const form = document.getElementById('send-container');
const messageInput = document = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// const userContainer = document.querySelector(".container2")
var audio = new Audio('ting.mp3');
var audio1 = new Audio('send.mp3'); 


const append = (message , position)=>{

    if (message.length > 40) {
        console.log(message);
        alert("Error: Message length should be less that 40 characters." + message);
        return;
    }
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    // const messageElement2 = document.createElement('div');
    // messageElement2.innerText = message;
    // messageElement2.classList.add('message');
    // messageElement2.classList.add(position);

    if(position == 'left'){
    audio.play();   
    }else if(position == 'right'){
        audio1.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send', message);
    messageInput.value = ''
})

let name = prompt("Enter your name to join");
console.log(name);
while (name == null || name == ""||name.length>20) {
    alert("Error: Name length should be non-empty and less than 20 characters.")
    console.log(name);
    name = prompt("Enter your name to join");
}
socket.emit('new-user-joined', name);
        
socket.on('user-joined' , name =>{
    if(name=="Ronit"||"CJ"){
        append(`${name} : SUPER-ADMIN joined the chat` , 'right')   
    }else{
        append(`${name} : has joined the chat` , 'right')
    }
})

socket.on('receive' , data =>{
    append(`${data.name}: ${data.message}` , 'left')
})
socket.on('left' , name =>{
    append(`${name} left the chat` , 'right')
})