// The base URL for fetching popular movies from The Movie Database (TMDb) API
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';

// The base URL for fetching movie images from TMDb API
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

// The base URL for searching movies on TMDb API
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// DOM elements
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies on page load
getMovies(API_URL);

// Asynchronous function to fetch and display movies
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    // Call the showMovies function to display the fetched movies
    showMovies(data.results);
}

// Import movieTrailers object from MovieLibrary.js
import { movieTrailers } from './MovieLibrary.js';

// Function to display movies on the webpage
function showMovies(movies) {
    // Clear the existing content of the main container
    main.innerHTML = '';

    // Iterate through each movie and create a dynamic HTML element for display
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        // Add click event listener to each movie element
        movieEl.addEventListener('click', () => {
            // Retrieve the YouTube trailer link from the hashmap based on the movie title
            const videoUrl = movieTrailers[title] || 'dQw4w9WgXcQ';
            const encodedTitle = encodeURIComponent(title);
            const encodedDescription = encodeURIComponent(overview);

            // Redirect to videopage.html with the video URL, title, and description as query parameters
            window.location.href = `videopage.html?video=${videoUrl}&title=${encodedTitle}&description=${encodedDescription}`;
        });

        // Set the inner HTML content for each movie element
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        // Append the movie element to the main container
        main.appendChild(movieEl);
    });
}

// Function to determine the CSS class based on the movie vote average
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Event listener for form submission to handle movie search
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the search term from the input field
    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        // Fetch movies based on the search term
        getMovies(SEARCH_API + searchTerm);

        // Clear the search input field
        search.value = '';
    } else {
        // Reload the page if the search term is empty
        window.location.reload();
    }
});
