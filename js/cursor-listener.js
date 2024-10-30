// public/js/cursor-listener.js

AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener('click', () => {
            const target = this.el.getAttribute('hotspot').target;
            const sky = document.getElementById('sky');
            const title = this.el.getAttribute('hotspot').title;

            // Change the sky to the target image
            sky.setAttribute('src', `images/${target}.jpg`);

            // Listen for the texture load event
            sky.addEventListener('materialtextureloaded', () => {
                showTitle(title);
            });

            sky.addEventListener('materialtextureerror', () => {
                showError(`Failed to load image: images/${target}.jpg`);
            });
        });
    }
});

function showTitle(title) {
    let titleElement = document.getElementById('tourTitle');
    if (!titleElement) {
        titleElement = document.createElement('div');
        titleElement.id = 'tourTitle';
        titleElement.classList.add('tour-title');
        document.body.appendChild(titleElement);
    }
    titleElement.textContent = title;
    titleElement.classList.add('visible');

    // Hide the title after 3 seconds
    setTimeout(() => {
        titleElement.classList.remove('visible');
    }, 3000);
}

function showError(message) {
    let errorElement = document.getElementById('tourError');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'tourError';
        errorElement.classList.add('tour-error');
        document.body.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.classList.add('visible');

    // Hide the error after 5 seconds
    setTimeout(() => {
        errorElement.classList.remove('visible');
    }, 5000);
}
