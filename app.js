function signUpUser(email,password,username){
    opts = { email: email, password: password, username: username}
    fetch('http://thesi.generalassemb.ly:8080/signup', {
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
    fetch(`http://thesi.generalassemb.ly:8080/post/list`)
    .then((response) => {
        return response.json();
      })
      .then ((response) => {
        console.log(response);
      })
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => {
        console.log('done');
      })
}