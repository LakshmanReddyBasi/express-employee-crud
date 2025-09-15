// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'http://localhost:3001/api';
    const tableBody = document.getElementById('employee-table-body');
    const modal = document.getElementById('employee-modal');
    const modalBody = document.getElementById('modal-body');
    const loader = document.getElementById('loader');
    const closeButton = document.querySelector('.close-button');

    // --- 1. Fetch and Display All Employees on Landing Page (Using .then/.catch) ---
    function fetchEmployees() {
        fetch(`${apiBaseUrl}/employees`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(employees => {
                tableBody.innerHTML = ''; // Clear existing rows
                employees.forEach(employee => {
                    const row = document.createElement('tr');
                    row.setAttribute('data-id', employee.id); // Set data-id attribute
                    row.innerHTML = `
                        <td>${employee.name}</td>
                        <td>${employee.age}</td>
                        <td>${employee.mobile}</td>
                        <td>${employee.city}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Error fetching employees:", error);
                tableBody.innerHTML = `<tr><td colspan="4">Could not load employee data.</td></tr>`;
            });
    }
    
    // --- 2. Fetch Complete Details for One Employee (Using async/await) ---
    async function showEmployeeDetails(employeeId) {
        // Show modal and loader
        modal.style.display = 'block';
        loader.style.display = 'block';
        modalBody.innerHTML = ''; // Clear previous content

        try {
            // Fetch all data in parallel using Promise.all
            const [empRes, salaryRes, deptRes] = await Promise.all([
                fetch(`${apiBaseUrl}/employees/${employeeId}`),
                fetch(`${apiBaseUrl}/salaries/${employeeId}`),
                fetch(`${apiBaseUrl}/departments/${employeeId}`)
            ]);

            // Check if all requests were successful
            if (!empRes.ok || !salaryRes.ok || !deptRes.ok) {
                throw new Error('Failed to fetch all employee details.');
            }

            // Parse JSON from all responses
            const employee = await empRes.json();
            const salary = await salaryRes.json();
            const department = await deptRes.json();

            // Hide loader
            loader.style.display = 'none';
            
            // Display the combined data in the modal
            modalBody.innerHTML = `
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Age:</strong> ${employee.age}</p>
                <p><strong>Mobile:</strong> ${employee.mobile}</p>
                <p><strong>City:</strong> ${employee.city}</p>
                <p><strong>Salary:</strong> ${salary.salary}</p>
                <p><strong>Department:</strong> ${department.department}</p>
            `;

        } catch (error) {
            console.error("Error fetching employee details:", error);
            loader.style.display = 'none';
            modalBody.innerHTML = `<p>Could not load employee details. Please try again later.</p>`;
        }
    }

    // --- 3. Event Listeners ---

    // Handle clicks on the table to show the modal
    tableBody.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        if (row && row.dataset.id) {
            const employeeId = row.dataset.id;
            showEmployeeDetails(employeeId);
        }
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initial load of the employee list
    fetchEmployees();
});