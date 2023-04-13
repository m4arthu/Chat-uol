// getin autorization 
axios.defaults.headers.common['Authorization'] = 'ysWTDGhHN004POzQihqYqW9d';

window.addEventListener('keypress', e => {
    if(e.keyCode === 13){
        enviarMensagem()
    }
})

var user


function chatLoggin(){
    let modal = document.getElementById("modal-loggin")
    let User = document.getElementById("nome").value
    let loggin = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', {name: User})
    loggin.then(() => {
        user = User
        modal.classList.remove("modal-container")
        modal.removeAttribute("id")
        modal.classList.add("d-none")
        setInterval(()=> {

            renderizarMensagens()
        },3000)
    })
    loggin.catch(()=> {
        User.value = "o nome ja esta em uso, erro" 
    })
}

function renderizarMensagens() {
    keepConection()
    const ulmensagens = document.getElementById("ulmessages")
    var msgs
    axios.get("https://mock-api.driven.com.br/api/vm/uol/messages")
    .then((mensagens) =>{
        msgs = mensagens.data
        document.querySelector("ul").innerText = ""
        for(let i = msgs.length; i > 0 ; i-- ) {
                ulmensagens.innerHTML += 
                `<li><p>
                <time>(${msgs[msgs.length - [i]].time})</time>
                <strong>${msgs[msgs.length -[i]].from}</strong>
                ${msgs[msgs.length -[i]].text}
                </p></li>`
        }
    }).catch()
    
}

function keepConection()  {
    axios.post("https://mock-api.driven.com.br/api/vm/uol/status", {name:user})
}

function enviarMensagem() {
    const messages = document.getElementById("message")
    const messageData = {
        from: user,
        to: "todos",
        text: messages.value,
        type: "message"
    }
    axios.post("https://mock-api.driven.com.br/api/vm/uol/messages",messageData).catch(()=> {
        window.location.reload()
    })
    messages.value = ""
}






