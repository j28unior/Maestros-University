// public/js/admissions.js

document.addEventListener('DOMContentLoaded', () => {
    const admissionForm = document.getElementById('admissionForm');
    const departmentSelect = document.getElementById('department');
    const programSelect = document.getElementById('program');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const studentNumberElement = document.getElementById('studentNumber');

    // Define programs per department
    const programs = {
        'Engineering': ['Computer Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'],
        'Business': ['Business Administration', 'Finance', 'Marketing', 'International Business'],
        'Arts': ['Fine Arts', 'Performing Arts', 'Literature', 'Graphic Design'],
        'Science': ['Biology', 'Chemistry', 'Physics', 'Environmental Science']
        // Add more departments and programs as needed
    };

    // Populate program options based on department selection
    departmentSelect.addEventListener('change', () => {
        const selectedDept = departmentSelect.value;
        programSelect.innerHTML = '<option value="" selected disabled>Select Program</option>';
        if (programs[selectedDept]) {
            programs[selectedDept].forEach(program => {
                const option = document.createElement('option');
                option.value = program;
                option.textContent = program;
                programSelect.appendChild(option);
            });
        }
    });

    // Handle form submission
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form processing delay
        setTimeout(() => {
            // Generate a random 6-digit student number
            const studentNumber = 'MA' + Math.floor(100000 + Math.random() * 900000);

            // Display the student number in the modal
            studentNumberElement.textContent = studentNumber;

            // Reset the form
            admissionForm.reset();
            programSelect.innerHTML = '<option value="" selected disabled>Select Program</option>';

            // Show the confirmation modal
            confirmationModal.show();
        }, 1000);
    });
});
