// console.log('connect to app.js');

const signUpButton = document.getElementById('register-btn');

signUpButton.addEventListener('click', function (event) {
 // alert('Element clicked through function!');
 event.preventDefault()

 let mail = document.getElementById("register-email").value;
 let pwd = document.getElementById("register-password").value;
 let uname = document.getElementById("register-username").value;
 console.log("mail", mail)
 console.log("password",pwd)
  console.log("username",uname)
 signUpUser(mail, pwd,uname)

 mail.value = ""
 pwd.value = ""
 uname.value = ""
});


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
    
      // console.log(content);
    })()  
  };

  (function listAllPosts(){
    fetch(`http://thesi.generalassemb.ly:8080/post/list`)
    .then((response) => {
        return response.json();
      })
      .then ((response) => {
          for (let i = response.length - 1; i > response.length - 30; i--){

            //  generate Recent Posts dynamically
         let postsBoard = document.createElement("div");
         postsBoard.id="post";
         postsBoard.className = "card mb-4";

         document.querySelector("#main-content").appendChild(postsBoard);

         let postMain = document.createElement("div");
         postMain.id = "post-main";
         postMain.className = "card-body text-truncate";
         
         let cardTitle = document.createElement("h2");
         cardTitle.className = "card-title";
         cardTitle.innerHTML = response[i].title;
         cardTitle.setAttribute("data-post-id", response[i].id);
      
          let cardText = document.createElement("p");
          cardText.className = "card-text";
          cardText.innerHTML = response[i].description;
      
          let cardBtn = document.createElement("a");
          cardBtn.id = "read-more";
          cardBtn.setAttribute("href", "#");
          cardBtn.className = "btn btn-primary";
          cardBtn.innerHTML = "Read More →"

          postsBoard.appendChild(postMain);
           postMain.appendChild(cardTitle);
           postMain.appendChild(cardText);
           postMain.appendChild(cardBtn);


           let postFooter = document.createElement("div");
           postFooter.id = "post-footer";
           postFooter.className = "card-footer text-muted";
           postFooter.innerHTML = `created by: ${response[i].user.username}`;
          
          postsBoard.appendChild(postFooter);

         let commentBtn = document.createElement("a");
         commentBtn.id ="comment-btn";
         commentBtn.className = "float-right d-none";
         commentBtn.setAttribute("href", "#");
         commentBtn.innerHTML = "DELETE";

         postFooter.appendChild(commentBtn);
        
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

const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', function (event) {
  event.preventDefault()

 let mail = document.getElementById("login-email").value;
 let pwd = document.getElementById("login-password").value;
  login(mail, pwd)

  mail.value = ""
  pwd.value = ""
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
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem("userName", response.username);
      window.location.reload();

    })
    .catch(function(error){
        alert("Wrong Username or password")
        console.log(error);
    })
  }

  // on login 

  window.onload = function(){
    const token = sessionStorage.getItem("token");
    const userName = sessionStorage.getItem("userName");

    if(userName){
      let elem = document.querySelector("#displayUser");
    let userName = sessionStorage.getItem("userName");

    // on login display welcome message
      elem.innerHTML = `Welcome, ${userName}`;

    // and display the logout and create post options
    let createPost = document.querySelector("#post-dropdown");
    let logout = document.querySelector("#logout");

    createPost.className ="btn-group";
    logout.className = "btn btn-primary";

    // target register and login dropdowns
    let registerDrop = document.querySelector("#register-dropdown");
    let loginDrop = document.querySelector("#login-dropdown");

    // remove display of register and login dropdowns
    registerDrop.className = "d-none";
    loginDrop.className = "d-none";
      
    }
  }


const postButton = document.getElementById('create-post');

postButton.addEventListener('click', function (event) {
  event.preventDefault()

let token = sessionStorage.getItem("token") 
 let title = document.getElementById("post-title").value;
 let description = document.getElementById("post-description").value;
  createPost(token, title, description)

  title.value = ""
  description.value = ""

});


function createPost(bearer_token, title, description){
  let bearer = 'Bearer ' + bearer_token;
  fetch("http://thesi.generalassemb.ly:8080/post", {
    method: 'POST',

    headers:{
      'Authorization': bearer,
      'Accept': 'application/json',
      'Content-Type': 'application/json'          
  },

    body: JSON.stringify({
        title: title,
        description: description,
           })
    }) 

    // window.location.reload();
    
}

