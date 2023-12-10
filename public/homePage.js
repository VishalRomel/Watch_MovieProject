// Selecting DOM elements for slider functionality
const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
const slidesLength = slideRight.querySelectorAll('div').length;

// Initial setup for slider position and indices
let activeSlideIndex = 0;
let scrollInterval;

// Position the left slide to show the last slide initially
slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

// Event listener for the 'up' button to manually change slide upwards
upButton.addEventListener('click', () => {
    stopAutoScroll();
    changeSlide('up');
});

// Event listener for the 'down' button to manually change slide downwards
downButton.addEventListener('click', () => {
    stopAutoScroll();
    changeSlide('down');
});

// Function to handle changing slides based on direction (up or down)
const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight;
    if (direction === 'up') {
        activeSlideIndex++;
        if (activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0;
        }
    } else if (direction === 'down') {
        activeSlideIndex--;
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesLength - 1;
        }
    }

    // Update slide positions based on the active index
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
};

// Function to start auto-scrolling through slides at regular intervals
const startAutoScroll = () => {
    scrollInterval = setInterval(() => {
        changeSlide('up');
    }, 3000); //(e.g., 3000 milliseconds = 3 seconds)
};

// Function to stop auto-scrolling
const stopAutoScroll = () => {
    clearInterval(scrollInterval);
};

// Start auto-scrolling on page load
startAutoScroll();
