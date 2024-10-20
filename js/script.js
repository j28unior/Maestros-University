// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Handle Read-Aloud Button
    const audioToggle = document.getElementById('audioToggle');
    const playIcon = document.getElementById('playIcon');
    const volumeIcon = audioToggle.querySelector('.bi-volume-up-fill');
    const smallPlayIcon = audioToggle.querySelector('img');

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
                // Optionally, you can change the Volume icon to indicate speaking state
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

    // Handle Contrast Toggle
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

    // Handle Application Form Submission (if present)
    const applyForm = document.getElementById('applyForm');
    const decisionForm = document.getElementById('decisionForm');

    if (applyForm) {
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Implement form submission logic here
            // For example, send data to server or display a success message
            alert('Application submitted successfully!');
            applyForm.reset();
        });
    }

    if (decisionForm) {
        decisionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const unsure = document.querySelector('input[name="unsure"]:checked').value;
            const happy = document.querySelector('input[name="happy"]:checked').value;

            // Example Logic:
            // If user is unsure about applying or unhappy with current opportunities, redirect to extra-info.html
            if (unsure === 'yes' || happy === 'no') {
                window.location.href = 'extra-info.html';
            } else {
                // If user is not unsure and happy with current opportunities, perhaps redirect to admissions or another page
                window.location.href = 'admissions.html';
            }
        });
    }

    // Handle Interest Form Submission (if present)
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

    // Handle Sign-In and Dashboard (if present)
    const signInForm = document.getElementById('signInForm');
    const signOutBtn = document.getElementById('signOutBtn');
    const dashboardSection = document.querySelector('.dashboard-section');

    // Handle Sign-In Form Submission
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Dummy Authentication Logic
            if (username.toLowerCase() === 'maestros' && password === 'password') {
                // Set login state in localStorage
                localStorage.setItem('isLoggedIn', 'true');

                // Redirect to dashboard page
                window.location.href = 'student-dashboard.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Handle Sign-Out
    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
            // Remove login state from localStorage
            localStorage.removeItem('isLoggedIn');

            // Redirect to the main university website (e.g., index.html)
            window.location.href = 'index.html';
        });
    }

    // Protect Dashboard Page
    if (dashboardSection) {
        // Check if user is logged in
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            // If not logged in, redirect to login page
            window.location.href = 'student-login.html';
        } else {
            // Initialize Charts
            const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
            const performanceCtx = document.getElementById('performanceChart').getContext('2d');

            // Attendance Chart (Dummy Data)
            const attendanceChart = new Chart(attendanceCtx, {
                type: 'bar',
                data: {
                    labels: ['Data Analytics', 'IT Project Management', 'Cybersecurity Essentials'],
                    datasets: [{
                        label: 'Attendance (%)',
                        data: [95, 88, 92],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });

            // Performance Chart (Dummy Data)
            const performanceChart = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May'],
                    datasets: [{
                        label: 'GPA',
                        data: [3.5, 3.6, 3.7, 3.8, 3.9],
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true
                        }
                    },
                    scales: {
                        y: {
                            suggestedMin: 3.0,
                            suggestedMax: 4.0
                        }
                    }
                }
            });
        }
    }
});
