const socket = io()

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)





textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    let textarea = document.getElementById('textarea');
let messageArea = document.querySelector('.message__area');

textarea.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const message = textarea.value;
        const currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString();
        messageArea.innerHTML += `<div> <div class="message">${message}</div><div class="time">${timeString}</div></div>`;

        // Clear the textarea
        textarea.value = '';
    }
});

    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

