// public/js/search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');

    let coursesData = []; // To store fetched courses

    // Fetch courses data from courses.json
    fetch('data/courses.json')
        .then(response => response.json())
        .then(data => {
            coursesData = data;
        })
        .catch(error => {
            console.error('Error fetching courses data:', error);
            if (searchResults) {
                searchResults.innerHTML = '<p class="text-center text-danger">Failed to load courses data.</p>';
            }
        });

    if (searchForm && searchResults) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const query = document.getElementById('searchQuery').value.trim().toLowerCase();
            const department = document.getElementById('filterDepartment') ? document.getElementById('filterDepartment').value : '';
            const level = document.getElementById('filterLevel') ? document.getElementById('filterLevel').value : '';
            const type = document.getElementById('filterType') ? document.getElementById('filterType').value : '';

            // Filter courses based on search criteria
            let filteredCourses = coursesData.filter(course => {
                const matchesQuery = course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query);
                const matchesDepartment = department ? course.department === department : true;
                const matchesLevel = level ? course.level === level : true;
                const matchesType = type ? course.type === type : true;
                return matchesQuery && matchesDepartment && matchesLevel && matchesType;
            });

            // Display search results
            displaySearchResults(filteredCourses);
        });
    }

    function displaySearchResults(courses) {
        if (!searchResults) return;

        searchResults.innerHTML = ''; // Clear previous results

        if (courses.length === 0) {
            searchResults.innerHTML = '<p class="text-center">No courses found matching your criteria.</p>';
            return;
        }

        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('row', 'g-4');

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('col-md-6', 'col-lg-4');

            const cardHTML = `
                <div class="card h-100">
                    <img src="${course.image || 'images/course-placeholder.jpg'}" class="card-img-top" alt="${course.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${course.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${course.department} | ${course.level} | ${course.type}</h6>
                        <p class="card-text">${course.description}</p>
                        <a href="course-details.html" class="mt-auto btn btn-primary">Learn More</a>
                    </div>
                </div>
            `;

            courseCard.innerHTML = cardHTML;
            resultsContainer.appendChild(courseCard);
        });

        searchResults.appendChild(resultsContainer);
    }
});
