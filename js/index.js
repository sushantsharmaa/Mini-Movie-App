    // Debouncing Stuff 

    let movies_div = document.getElementById("movies");
    movies_div.addEventListener("mouseover", function(){
      movies_div.style.display = "block";
    });
    movies_div.addEventListener("mouseout", function(){
        movies_div.style.display = "none";
    });

      var timerId;

      async function searchMovies(movie_name) {
        try {
          let res = await fetch(
            `http://www.omdbapi.com/?s=${movie_name}&apikey=d974f9d4`
          );
          let data = await res.json();
          return data;
        } catch (e) {
          console.log(e);
        }
      }

      function appendMovies(movies) {
        if (movies === undefined) {
          return false;
        }
        movies_div.innerHTML = null;
        movies.forEach(function (movie) {
           
         let searchDiv = document.createElement("div");
         searchDiv.setAttribute("class", "searchDiv");
           
          let searchImage = document.createElement("img");
          searchImage.src = movie.Poster;
          
          var p = document.createElement("p");
          p.innerText = movie.Title;
          p.addEventListener("click", function(){
                searchMovie(p.innerText);
          });

          searchDiv.append(searchImage,p);
          movies_div.append(searchDiv);
        });
      }

      async function main() {
        let name = document.getElementById("movie").value;

        if(name.length < 3){
          return false;
        }

        let res = await searchMovies(name);

        appendMovies(res.Search);

        console.log(res);
      }

      function debounce(func, delay){
        
        movies_div.style.display = "block";

        if(timerId){
          clearTimeout(timerId);
        }

        timerId = setTimeout(function(){
 
          func();

        }, delay);
      }

// Movie Details Stuff      

let container = document.getElementById("data");

    async function searchMovie(movie_name) {

      try {
        let res = await fetch(
          `http://www.omdbapi.com/?t=${movie_name}&apikey=d974f9d4`
        );
        let data = await res.json();
        if(data.Response === "False"){
        container.innerHTML = null;
        let img1 = document.createElement("img");
        img1.src = "https://www.computerhope.com/jargon/e/error.png";
        img1.setAttribute("class", "error-img");
        container.append(img1);
    } else {
        showData(data);
        console.log(data);
    }
      } catch (e) {
        console.log(e);
      }
    }

    function showData(el) {
      container.innerHTML = null;

      let div1 = document.createElement("div");
      div1.setAttribute("class", "div1");

      let div2 = document.createElement("div");
      div2.setAttribute("class", "div2");

      let title = document.createElement("h1");
      title.textContent = el.Title;

      let rating = document.createElement("p");
      rating.textContent = `Rating: ${el.imdbRating}`;

      let runtime = document.createElement("p");
      runtime.textContent = `Runtime: ${el.Runtime}`;

      let language = document.createElement("p");
      language.textContent = `Language: ${el.Language}`;

      let releaseDate = document.createElement("p");
      releaseDate.innerText = `Release Date: ${el.Released}`;

      let plot = document.createElement("p");
      plot.innerHTML = `Description : ${el.Plot}`

      let poster = document.createElement("img");
      poster.src = el.Poster;
      poster.setAttribute("class", "movie-img");

      if (Number(el.imdbRating) > 8.5) {
        let recommended = document.createElement("div");
        recommended.textContent = "RECOMMENDED";
        recommended.setAttribute("class", "recommended");
        div1.append(poster, recommended);
        div2.append(title,rating,runtime,language,releaseDate,plot);
      } else {
        div1.append(poster);
        div2.append(title,rating,runtime,language,releaseDate,plot);
      }
      container.append(div1,div2);
    }
    

// MostPopularMovies Stuff

let popularMovies = document.getElementById('data-two');

async function getMoviesData(){
   
  try {
    let res = await fetch('https://imdb-api.com/en/API/MostPopularMovies/k_8gphg7ks');
    let data = await res.json();
     appendMoviesData(data.items);
    console.log(data.items);
  } catch (e){
    console.log(e);
  }
}

getMoviesData();

function appendMoviesData(el){

  el.forEach(({fullTitle, image}) => {
    let innerDiv = document.createElement("div");

    let movieName = document.createElement("h3");
    movieName.innerText = fullTitle;
    
    let movieImage = document.createElement("img");
    movieImage.src = image;

    innerDiv.append(movieImage,movieName);

    popularMovies.append(innerDiv);
  })

}