// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    /*-----------------------*/
    /* 1. Read-Aloud Button  */
    /*-----------------------*/

    const audioToggle = document.getElementById('audioToggle');
    const playIcon = document.getElementById('playIcon');
    const volumeIcon = audioToggle ? audioToggle.querySelector('.bi-volume-up-fill') : null;
    const smallPlayIcon = audioToggle ? audioToggle.querySelector('img') : null;

    if (audioToggle && playIcon && volumeIcon && smallPlayIcon) {
        let isSpeaking = false;
        let synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance();
        utterance.text = 'Welcome to Maestros University. Please fill out the application form to apply.';

        audioToggle.addEventListener('click', () => {
            if (!isSpeaking) {
                synth.speak(utterance);
                isSpeaking = true;
                // Toggle Icons: Hide Play icon and small play icon
                playIcon.classList.add('d-none');
                smallPlayIcon.classList.add('d-none');
                // Optionally, change Volume icon to indicate speaking state
                volumeIcon.classList.add('text-primary'); // Example: Change color
            } else {
                synth.cancel();
                isSpeaking = false;
                // Toggle Icons: Show Play icon and small play icon
                playIcon.classList.remove('d-none');
                smallPlayIcon.classList.remove('d-none');
                // Revert Volume icon
                volumeIcon.classList.remove('text-primary');
            }
        });

        // Listen for the end of the speech to reset the button state
        utterance.onend = () => {
            isSpeaking = false;
            playIcon.classList.remove('d-none');
            smallPlayIcon.classList.remove('d-none');
            volumeIcon.classList.remove('text-primary');
        };
    }

    /*-----------------------*/
    /* 2. Contrast Toggle    */
    /*-----------------------*/

    const contrastToggle = document.getElementById('contrastToggle');
    let currentMode = localStorage.getItem('contrastMode') || 'default'; // Retrieve saved mode

    const applyMode = (mode) => {
        const body = document.body;
        body.classList.remove('high-contrast', 'grayscale');

        if (mode === 'high-contrast') {
            body.classList.add('high-contrast');
            contrastToggle.innerHTML = '<i class="fas fa-adjust"></i> Default';
            contrastToggle.setAttribute('aria-label', 'Switch to Default Contrast Mode');
        } else if (mode === 'grayscale') {
            body.classList.add('grayscale');
            contrastToggle.innerHTML = '<i class="fas fa-adjust"></i> Grayscale';
            contrastToggle.setAttribute('aria-label', 'Switch to Grayscale Mode');
        } else {
            contrastToggle.innerHTML = '<i class="fas fa-adjust"></i> Contrast';
            contrastToggle.setAttribute('aria-label', 'Switch to High Contrast Mode');
        }

        currentMode = mode;
        localStorage.setItem('contrastMode', currentMode); // Save mode
    };

    // Apply the saved mode on page load
    applyMode(currentMode);

    contrastToggle.addEventListener('click', () => {
        if (currentMode === 'default') {
            applyMode('high-contrast');
        } else if (currentMode === 'high-contrast') {
            applyMode('grayscale');
        } else if (currentMode === 'grayscale') {
            applyMode('default');
        }
    });

    /*-----------------------*/
    /* 3. Interest Form      */
    /*-----------------------*/

    const interestForm = document.getElementById('interestForm');
    if (interestForm) {
        const predictedCourseDiv = document.getElementById('predictedCourse');
        const courseNameP = document.getElementById('courseName');
        const applyButton = document.getElementById('applyButton');

        const courseRecommendations = {
            'data analysis': 'Data Science Fundamentals',
            'machine learning': 'Machine Learning Advanced',
            'natural language': 'Natural Language Processing',
            'computer vision': 'Computer Vision Essentials',
            'deep learning': 'Deep Learning Mastery',
            'ai ethics': 'AI Ethics and Governance',
            'robotics': 'Robotics Engineering',
            'big data': 'Big Data Analytics',
            // Add more mappings as needed
        };

        interestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userInterest = document.getElementById('interestInput').value.trim().toLowerCase();

            // Simulate course prediction
            let recommendedCourse = courseRecommendations[userInterest] || 'Introduction to Artificial Intelligence';

            courseNameP.textContent = recommendedCourse;
            predictedCourseDiv.style.display = 'block';
        });

        // Handle Apply Button Click
        if (applyButton) {
            applyButton.addEventListener('click', () => {
                // Redirect to the apply page
                window.location.href = 'apply.html';
            });
        }
    }

    /*-----------------------*/
    /* 4. Feedback Form      */
    /*-----------------------*/

    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackConfirmation = document.getElementById('feedbackConfirmation');

    if (feedbackForm && feedbackConfirmation) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('feedbackName').value.trim();
            const email = document.getElementById('feedbackEmail').value.trim();
            const message = document.getElementById('feedbackMessage').value.trim();

            // Basic Validation (Already handled by 'required' attribute)
            if (name && email && message) {
                // Simulate feedback submission (e.g., send to server)
                // For now, just display a confirmation message
                feedbackConfirmation.classList.remove('d-none');
                feedbackForm.reset();

                // Optionally, hide the confirmation after a few seconds
                setTimeout(() => {
                    feedbackConfirmation.classList.add('d-none');
                }, 5000);
            }
        });
    }

    /*-----------------------*/
    /* 5. Search Bar Enhancements */
    /*-----------------------*/

    // Voice Search Functionality Placeholder
    const voiceSearchBtn = document.getElementById('voiceSearchBtn');
    if (voiceSearchBtn) {
        voiceSearchBtn.addEventListener('click', () => {
            // Placeholder for voice command functionality
            alert('Voice search activated! (Functionality to be implemented)');
            
            /*
            // Future Implementation:
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert('Your browser does not support Speech Recognition.');
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('searchQuery').value = transcript;
                recognition.stop();
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                alert('Voice recognition failed. Please try again.');
                recognition.stop();
            };
            */
        });
    }

    // Upload Search File Functionality Placeholder
    const uploadInput = document.getElementById('uploadInput');
    if (uploadInput) {
        uploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                // Placeholder for file upload functionality
                alert(`File "${file.name}" selected for search. (Functionality to be implemented)`);
                
                /*
                // Future Implementation:
                // Implement file upload handling here, possibly sending the file to the server for processing
                */
            }
        });
    }

    /*-----------------------*/
    /* 6. Virtual Tour Handling */
    /*-----------------------*/

    // Assuming cursor-listener.js handles hotspot interactions

});

// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // [Existing JavaScript Content]

    /*-----------------------*/
    /* 7. Digital Certificate Verification */
    /*-----------------------*/

    const certificateForm = document.getElementById('certificateForm');
    const certificateNumberInput = document.getElementById('certificateNumber');
    const verificationMessage = document.getElementById('verificationMessage');

    if (certificateForm && certificateNumberInput && verificationMessage) {
        certificateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const certNumber = certificateNumberInput.value.trim();

            if (certNumber === '') {
                // Display error message if input is empty
                verificationMessage.classList.remove('d-none', 'alert-success');
                verificationMessage.classList.add('alert-danger');
                verificationMessage.textContent = 'Please enter a certificate number.';
                return;
            }

            // Simulate verification logic
            // For demonstration, we'll assume any 8-digit number is valid
            const certRegex = /^\d{8}$/; // Example: 8-digit certificate number

            if (certRegex.test(certNumber)) {
                // Display success message
                verificationMessage.classList.remove('d-none', 'alert-danger');
                verificationMessage.classList.add('alert-success');
                verificationMessage.textContent = 'Certificate Verified Successfully!';
            } else {
                // Display failure message
                verificationMessage.classList.remove('d-none', 'alert-success');
                verificationMessage.classList.add('alert-danger');
                verificationMessage.textContent = 'Invalid Certificate Number. Please try again.';
            }

            // Optional: Reset the form after submission
            certificateForm.reset();
        });
    }

    // [Remaining JavaScript Content]
});

