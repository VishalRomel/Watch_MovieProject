const buttons = document.querySelectorAll('.ripple');
const progress = document.getElementById('progress');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
const circles = document.querySelectorAll('.circle');
const form = document.getElementById('signup-form');
const formSteps = document.querySelectorAll('.form-step');

let currentStep = 1;

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const isValid = validateFormStep(currentStep);

        if (isValid) {
            currentStep = this.id === 'nextBtn' ? currentStep + 1 : currentStep - 1;
            update();
            // Get a reference to the form
            const signupForm = document.getElementById('unhide');  // Show the form (remove the 'hidden' class)
            signupForm.classList.remove('hidden');

            // Add ripple effect
            const x = e.pageX;
            const y = e.pageY;

            const buttonTop = this.offsetTop;
            const buttonLeft = this.offsetLeft;

            const xInside = x - buttonLeft;
            const yInside = y - buttonTop;

            const circle = document.createElement('span');
            circle.classList.add('circle');
            circle.style.top = yInside + 'px';
            circle.style.left = xInside + 'px';

            this.appendChild(circle);

            setTimeout(() => circle.remove(), 500);
        }
    });
});

function validateFormStep(step) {
    const inputs = formSteps[step - 1].querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.reportValidity();
        }
    });

    return isValid;
}

function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentStep) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';

    formSteps.forEach(step => (step.style.display = 'none'));
    formSteps[currentStep - 1].style.display = 'block';

    prev.disabled = currentStep === 1;
    next.disabled = currentStep === circles.length;
}


document.addEventListener('DOMContentLoaded', function () {

  });


  // Get the container element where the animation will be displayed
const container = document.querySelector(".lottie-container");

// Load the Lottie animation from the provided URL
lottie.loadAnimation({
  container: container, // Specify the container element
  renderer: "svg", // Choose the renderer (svg, canvas, html)
  loop: true, // Set animation loop
  autoplay: true, //  play automatically
  path: "https://lottie.host/99af2bd4-28e5-41a1-b694-8b476ced6fe1/TRrzffp0C2.json", // Provide the URL of the animation JSON
});
