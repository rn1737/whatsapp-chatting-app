const socket = io('http://localhost:8000'); 

// Get DOM elements in respective jS variables // 

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio("file:///C:/Users/HP/Downloads/whatsapp_iphone.mp3");


// Function which will append info to the container // 
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

  if (position === 'left') {
    audio.play();
  }
};


form.addEventListener('submit',(e)=>{ 
  e.preventDefault(); 
  const message=messageInput.value; 
  append(`You: ${message}`,'right')  
  socket.emit('send',message); 
  messageInput.value='';  
}) 

// Ask new user for his/her names and let the server know // 
const name = prompt('Enter Your Name to join');
socket.emit('new-user-joined', name);

// if a new user joins ,receive his/her name from the server // 

socket.on('user-joined', name => { 
  append(`${name} joined the chat`, 'right'); 
}); 

// if server sends a message receive it // 

socket.on('receive', data => {  
  append(`${data.name}: ${data.message}`, 'left'); 
});

socket.on('left',  name=> {  
  append(`${name} left the chat`, 'right');  
});

// if the form gets submitted ,send server the message 
form.addEventListener('submit',(e)=>{ 
  e.preventDefault(); 
  const message=messageInput.value; 
  append(`You:${message}`,'right'); 
  socket.emit('send',message); 
  messageInput.value=''
}) 