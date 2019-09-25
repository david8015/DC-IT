console.log('connect to app.js');

  function signUpUser(mail,pwd,uname){

    (async () => {
      const rawResponse = await fetch('http://thesi.generalassemb.ly:8080/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: mail, password: pwd, username: uname})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })()
    
    
   
  };

  

(function listAllPosts(){
  let postsBoard = document.getElementById("all-post")
    fetch(`http://thesi.generalassemb.ly:8080/post/list`)
    .then((response) => {
        return response.json();
      })
      .then ((response) => {
          for (let i = response.length - 1; i > response.length - 30; i--){
        let theTitle = document.createElement('h2');
        theTitle.innerText = response[i].title;

        let theParagraph = document.createElement('p');
        let theCreator = document.createElement('p');
        theParagraph.innerText = response[i].description;
        theCreator.innerText = `created by: ${response[i].user.username}`;
        postsBoard.appendChild(theTitle);
        postsBoard.appendChild(theParagraph);
        postsBoard.appendChild(theCreator);
          }
        console.log(response); 
      })
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => {
        console.log('done');
      })
})();

// LOGIN

const loginButton = document.getElementById('login');

loginButton.addEventListener('click', function (event) {
 // alert('Element clicked through function!');
 let mail = document.getElementById("email-login").value;
 let pwd = document.getElementById("password-login").value;
 //console.log("mail", mail)
 //console.log("password",pwd)
 login(mail, pwd)

 mail.innerText = ""
 pwd.innerText = ""
});

function login(mail, pwd){
  fetch("http://thesi.generalassemb.ly:8080/login", {
    method: 'POST',

    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },

    body: JSON.stringify({
        email: mail,
        password: pwd,
           })
    })
    .then((response )=> {
        return response.json();
    })
    .then((response) =>{
  //    console.log("token: ",response.token)
        sessionStorage("token", response.token)
   //     console.log("token was saved!!->", sessionStorage.getItem("token"))
    })
    .catch(function(error){
        alert("Wrong Username or password")
    })

    

}