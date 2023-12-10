// videopage.js




// Retrieve the video URL, title, and description from the query parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoUrl = urlParams.get('video');
const title = decodeURIComponent(urlParams.get('title'));
const description = decodeURIComponent(urlParams.get('description'));

// Update the src attribute of the iframe with the retrieved video URL
const iframe = document.querySelector('.video');
iframe.src = `https://www.youtube.com/embed/${videoUrl}`;

// Update the title and description in the video-info-container
const videoTitle = document.querySelector('.video-title');
videoTitle.textContent = title;

const videoDescription = document.querySelector('.video-description');
videoDescription.textContent = description;

