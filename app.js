console.log('connect to app.js')

function signUpUser(email,password,username){
    opts = { email: email, password: password, username: username}
    fetch(`http://thesi.generalassemb.ly:8080/signup`, {
        method: 'post',
        body: JSON.stringify(opts)
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(response)
      })
      ;   
}

// signUpUser("carlos@Ga.com", "carlos", "carlos")

function listAllPosts(){
  let postsBoard = document.getElementById("all-post")
    fetch(`http://thesi.generalassemb.ly:8080/post/list`)
    .then((response) => {
        return response.json();
      })
      .then ((response) => {
          for (let i = 0; i < 30; i++){
        let theTitle = document.createElement('h2')
        theTitle.innerText = response[i].title
        let theParagraph = document.createElement('p')
        theParagraph.innerText = response[i].description
        postsBoard.appendChild(theTitle)
        postsBoard.appendChild(theParagraph)
          }
        console.log(response); 
      })
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => {
        console.log('done');
      })
}

listAllPosts()