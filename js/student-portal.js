// public/js/student-portal.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const studentNameSpan = document.getElementById('studentName');
    const studentNumberDisplay = document.getElementById('studentNumberDisplay');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileDepartment = document.getElementById('profileDepartment');
    const coursesTableBody = document.getElementById('coursesTableBody');
    const logoutButton = document.getElementById('logoutButton');

    // Mock Student Data
    const mockStudentData = {
        username: 'john.doe',
        password: 'password123',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        studentNumber: 'MA202400123',
        department: 'Engineering',
        courses: [
            { code: 'ENG101', name: 'Introduction to Engineering', instructor: 'Dr. Smith', grade: 'A' },
            { code: 'ENG202', name: 'Mechanical Systems', instructor: 'Prof. Johnson', grade: 'B+' },
            { code: 'ENG303', name: 'Thermodynamics', instructor: 'Dr. Williams', grade: 'A-' },
            // Add more courses as needed
        ]
    };

    // Handle Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value.trim();

        // Simple Authentication Check
        if (usernameInput === mockStudentData.username && passwordInput === mockStudentData.password) {
            // Populate Dashboard with Student Data
            studentNameSpan.textContent = mockStudentData.fullName;
            studentNumberDisplay.textContent = mockStudentData.studentNumber;
            profileName.textContent = mockStudentData.fullName;
            profileEmail.textContent = mockStudentData.email;
            profileDepartment.textContent = mockStudentData.department;

            // Populate Courses Table
            coursesTableBody.innerHTML = ''; // Clear existing content
            mockStudentData.courses.forEach(course => {
                const row = document.createElement('tr');

                const codeCell = document.createElement('td');
                codeCell.textContent = course.code;
                row.appendChild(codeCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = course.name;
                row.appendChild(nameCell);

                const instructorCell = document.createElement('td');
                instructorCell.textContent = course.instructor;
                row.appendChild(instructorCell);

                const gradeCell = document.createElement('td');
                gradeCell.textContent = course.grade;
                row.appendChild(gradeCell);

                coursesTableBody.appendChild(row);
            });

            // Show Dashboard and Hide Login
            loginSection.style.display = 'none';
            dashboardSection.style.display = 'block';
        } else {
            // Display Error Message
            alert('Invalid username or password. Please try again.');
        }
    });

    // Handle Logout
    logoutButton.addEventListener('click', () => {
        // Clear Dashboard Data
        studentNameSpan.textContent = '';
        studentNumberDisplay.textContent = '';
        profileName.textContent = '';
        profileEmail.textContent = '';
        profileDepartment.textContent = '';
        coursesTableBody.innerHTML = '';

        // Show Login and Hide Dashboard
        loginSection.style.display = 'block';
        dashboardSection.style.display = 'none';

        // Optionally, clear form inputs
        loginForm.reset();
    });
});
