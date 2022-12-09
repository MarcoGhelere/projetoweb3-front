function login(event){
    //Codigo da funcao fetch, obtida de: 
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data

    event.preventDefault(); //previne o botao submit de recarregar a pagina

    const data = {
        "email": document.getElementById("email-input").value,
        "password": document.getElementById("password-input").value,
    };

    //"email": "eve.holt@reqres.in",
    //"password": "cityslicka"

    fetch('http://localhost:3000/login/login', {
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

                document.getElementById("searchtext").classList.add("turnvisible");
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
    const urlapi= "https://swapi.dev/api/people/?search=" + search; //Passando o link para a API

    const resultadoPesquisa = document.querySelector("[resultado-pesquisa]");
    const containerNome = document.querySelector("[conteudo-nome]");

    containerNome.innerHTML = "";

    fetch(urlapi, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);

        if(data.count == 0) {
            document.getElementById("search-error").classList.add("turnvisible");
            console.log('No character found');
            
        }
        else {
            data.results.forEach(personagem => {
                const nomeResultado = resultadoPesquisa.content.cloneNode(true);
                nomeResultado.children[1].innerHTML = personagem.name;
                containerNome.append(nomeResultado);
            });
            
            console.log('Success:', data.results[0].name);
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
    
    fetch('http://localhost:3000/login/register', {
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

                document.getElementById("searchtext").classList.add("turnvisible");
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
    document.getElementById("searchtext").classList.add("turnvisible");
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