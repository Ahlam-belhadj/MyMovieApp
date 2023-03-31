const API_key = 'api_key=67b76838a7f6737ae54742330812baf0'; //clé
const Base_URL = 'https://api.themoviedb.org/3/';
const API_URL = Base_URL + '/discover/movie?sort_by=popularity.desc&' + API_key;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = Base_URL + '/search/movie?' + API_key;
const container = document.getElementById('container');
const form = document.getElementById('form');
const search = document.getElementById('search');
const contenue = document.getElementById('container2');


getMovies(API_URL); //fonction

function getMovies(url) {
    //recupére l'url 
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
        console.log(data.results);
    })
}


function showMovies(data) {
    container.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id} = movie;
        const urltrailer = `${Base_URL}/movie/${id}?${API_key}&append_to_response=videos`;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="cardss">
             <div class="cards">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <img class="imaage" src="${IMG_URL + poster_path}" alt="${title}">
                        <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getColor(vote_average)}">${vote_average}</span>
                    </div>
                        </div>
                       
                        <div class="flip-card-back">
                            <h3>Overview</h3>
                            ${overview}
                            <button id="ba">Trailer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        container.appendChild(movieEl);


        fetch(urltrailer).then(res => res.json()).then(data => {
            const keyba = data.videos.results[0].key;
            const buttonTrailer = movieEl.querySelector('#ba');
            const button_Trailer = `https://www.youtube.com/watch?v=${keyba}`

            buttonTrailer.addEventListener('click' ,e => {
                e.preventDefault()
                window.location.href= button_Trailer ;
            } )
        })
    });
}


// couleur des notes 
function getColor(vote) {
    if (vote >= 7) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


// bar de recherche 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    } else {

        getMovies(API_URL)
    }
})
