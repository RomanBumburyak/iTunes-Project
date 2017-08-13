/*
  Here is a rough idea for the steps you could take:
*/

// 4. Create a way to append the fetch results to your page

// // Hitting the itunes API:
// function apiRequest(url){
//   fetch(url).then(function(response) {
//     console.log(response);
//   })
// }
//
// var response = apiRequest("https://itunes.apple.com/search?term=beyonce&country=us")
// // console.log("response is: " + response);

// 1. First select and store the elements you'll be working with
let inputBox = document.querySelector('.inputBox');
let button = document.querySelector('.button');
let display= document.querySelector('.results');

var input;//just declared variables at this point, and will be set later.
var query;
var response;

// 2. Create your `submit` event for getting the user's search term
function submit(){
  input = inputBox.value;
  if (input) { //if imput is set to something.
    getResults(); //if imput is set to something then "get results"
  }
}
button.addEventListener('click', submit); //here, submit is being called.

// 3. Create your `fetch` request that is called after a submission
function getResults () {
  //this will keep the page from automatically refreshing
  event.preventDefault();// this right here prevents it from refreshing automatically.

  query = input.split(" ").join("+");//takes the input, and adds a + in any spaces
  let url = ("https://itunes.apple.com/search?term=" + query)

    fetch(url)
        .then(function(response){

          response.json().then(function(data){
          console.log(data);

          //  let resultsHTML = '';

           for (var i = 0; i < data.results.length; i++) { //now we do a for loop to run through the data in the response from the API.

             let result = document.createElement('article');
              result.setAttribute('class', 'searchResults');//
              result.id = i;

             result.innerHTML += //we do the plus equals because we want to
             `
               <div class="artistPic">
                 <img src="${data.results[i].artworkUrl100}">
               </div>

               <div class="song">
                 ${data.results[i].trackName}
               </div>

               <div class="Name">
                 ${data.results[i].artistName}
             `
             result.addEventListener('click', function(event){
                playSong(event.target.id); //we're calling the playMusic
              });

               display.appendChild(result);
               function playSong(x) {

                 let index = Number(x);
                 let player = document.getElementById('music-player');
                 let musicUrl = data.results[index].previewUrl;
                 player.setAttribute('src', musicUrl);
                 player.play();
               }

           }



          //  display.innerHTML = resultsHTML

      });

    });

}

// button.addEventListener('click', getResults);
// let song = document.querySelector(".searchResults");
// song.addEventListener("click", playSong);
