const serverlink = "https://projetoweb3.onrender.com/";

function login(event){
    //Codigo da funcao fetch, obtida de: 
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data

    event.preventDefault(); //previne o botao submit de recarregar a pagina

    const data = {
        "email": document.getElementById("email-input").value,
        "password": document.getElementById("password-input").value,
    };

    fetch(serverlink + 'login/login', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            
            if(!data.error){
                //Caso nao haja erro no login, ira aparecer a barra de pesquisa:
                localStorage.setItem("token", data.token);

                document.getElementById("searcharea").classList.add("turnvisible");
                document.getElementById("logout-button").classList.add("turnvisible");
                document.getElementById("form-login").classList.add("turninvisible");
                document.getElementById("error-login").classList.add("turninvisible")
            }
            else {
                document.getElementById("error-login").classList.add("turnvisible");
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
            
        });
        
}

function logout(){
    localStorage.removeItem("token");
    document.getElementById("form-login").classList.add("turnvisible");
    document.getElementById("logout-button").classList.add("turninvisible");

    window.location.reload();
}

function validate(event){
    event.preventDefault();

    const search = document.getElementById("searchbar").value;
    const urlapi= serverlink+ "swapi/?name=" + search; //Passando o link para a API

    const resultadoPesquisa = document.querySelector("[resultado-pesquisa]");
    const containerNome = document.querySelector("[conteudo-nome]");

    containerNome.innerHTML = "";

    fetch(urlapi, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem("token"),
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);

        if(data.length == 0) {
            document.getElementById("search-error").classList.add("turnvisible");
            console.log('No character found');
            
        }
        else {
            data.forEach(personagem => {
                const nomeResultado = resultadoPesquisa.content.cloneNode(true);
                nomeResultado.children[1].innerHTML = personagem.name;
                nomeResultado.children[2].src = personagem.link;
                containerNome.append(nomeResultado);
            });
            
            //console.log('Success:', data.results[0].name);
            document.getElementById("search-error").classList.remove("turnvisible");
            //const resultado = resultadoPesquisa.content.cloneNode(true);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function register(event) {
    event.preventDefault();

    const data = {
        "email": document.getElementById("email-input-reg").value,
        "password": document.getElementById("password-input-reg").value,
    };
    
    fetch(serverlink + 'login/register', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            
            if(!data.error){
                //Caso nao haja erro no login, ira aparecer a barra de pesquisa:
                localStorage.setItem("token", data.token);

                document.getElementById("searcharea").classList.add("turnvisible");
                document.getElementById("logout-button").classList.add("turnvisible");
                document.getElementById("register").classList.add("turninvisible");
            }
            else {
                document.getElementById("error-register").classList.add("turnvisible");
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
            
        });
}

if(localStorage.getItem("token") != null) {
    document.getElementById("searcharea").classList.add("turnvisible");
    document.getElementById("logout-button").classList.add("turnvisible");
    document.getElementById("form-login").classList.add("turninvisible");
}

function gotoregister(){
    document.getElementById("register").classList.add("turnvisible");
    document.getElementById("form-login").classList.add("turninvisible");
    document.getElementById("sign-btn").classList.add("turninvisible");
    
    console.log("gotoregister registrado");
}

function returnhome() {
    // document.getElementById("form-login").classList.add("turnvisible");
    // document.getElementById("sign-btn").classList.add("turnvisible");
    // document.getElementById("register").classList.add("turninvisible");

    window.location.reload();

    console.log("returnhome registrado");

}

function addCharacter(event) {

    event.preventDefault();

    const data = {
        "name": document.getElementById("input-character").value,
        "charPic": document.getElementById("input-img").files[0],
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("charPic", data.charPic);

    fetch(serverlink + 'addcharacter/', {
        method: 'POST', // or 'PUT'
        headers: {
            'token': localStorage.getItem("token"),
        },
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            
            if(!data.error){
                document.getElementById("msg-char-success").classList.add("turnvisible");
                setTimeout(successInvisible, 5000);
            }
            else {

            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function successInvisible() {
    document.getElementById("msg-char-success").classList.remove("turnvisible");
    document.getElementById("input-character").value = "";
}