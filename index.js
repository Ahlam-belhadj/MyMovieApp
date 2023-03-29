const API_key = 'api_key=67b76838a7f6737ae54742330812baf0'; //clé
const Base_URL = 'https://api.themoviedb.org/3/';
const API_URL = Base_URL + '/discover/movie?sort_by=popularity.desc&' + API_key;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = Base_URL + '/search/movie?'+API_key;
const container = document.getElementById('container');
const form = document.getElementById('form');
const search = document.getElementById('search');
const contenue = document.getElementById('container2');


getMovies(API_URL); //fonction


function getMovies(url) {
//recupére l'url 
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}



function showMovies(data) {
    container.innerHTML = '';
    data.forEach(movie => {
        const {title , poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="cardss">
             <div class="cards">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <img class="imaage" src="${IMG_URL+poster_path}" alt="${title}">
                        <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getColor(vote_average)}">${vote_average}</span>
                    </div>
                        </div>
                       
                        <div class="flip-card-back">
                            <h3>Overview</h3>
                            ${overview}
                        </div>
                    </div>
                </div>
            </div>
        </div>`
container.appendChild(movieEl);
});
}


function getColor(vote) {
    if(vote >=7){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else {
        return 'red';
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{

        getMovies(API_URL)
    }
})


