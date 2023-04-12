// getin autorization 
axios.defaults.headers.common['Authorization'] = 'ysWTDGhHN004POzQihqYqW9d';
chatLoggin()
function chatLoggin(){
    const user = window.prompt("digite seu nome")
    const loggin = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', {name:user})
    loggin.then(() => {
        setInterval(()=> {
            renderizarMensagens()
        },3000)
       
    })
    loggin.catch(() => {
        chatLoggin()
    })
}

function renderizarMensagens() {

    const ulmensagens = document.getElementById("ulmessages")
    var msgs
    axios.get("https://mock-api.driven.com.br/api/vm/uol/messages")
    .then((mensagens) =>{
        msgs = mensagens.data
        for(let i = 10; i > 0; i-- ) {
            ulmensagens.innerHTML += 
            `<li><p>
            <time>(${msgs[i].time})</time>
            <strong>${msgs[i].from}</strong>
            ${msgs[i].text}
            </p></li>`
           }
    }).catch()
    
}





