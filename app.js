console.log('connect to app.js');

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
    
      console.log(content);
    })()  
  };

  (function listAllPosts(){
    fetch(`http://thesi.generalassemb.ly:8080/post/list`)
    .then((response) => {
        return response.json();
      })
      .then ((response) => {
          for (let i = response.length - 1; i > response.length - 30; i--){

            //  Blog Post
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
  console.log(mail)
  console.log(pwd)
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
      console.log("token: ",response.token)
     //   sessionStorage("token", response.token)
   //     console.log("token was saved!!->", sessionStorage.getItem("token"))
    })
    .catch(function(error){
        alert("Wrong Username or password")
    })

    

}