document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'http://localhost:3001/api';

    // Get references to all necessary DOM elements
    const tableBody = document.getElementById('employee-table-body');
    
    // For Details Modal
    const detailsModal = document.getElementById('employee-modal');
    const detailsModalBody = document.getElementById('modal-body');
    const detailsLoader = document.getElementById('loader');
    const detailsCloseBtn = detailsModal.querySelector('.close-button');
    
    // For Add Modal
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const addModal = document.getElementById('add-modal');
    const addEmployeeForm = document.getElementById('add-employee-form');
    const addModalCloseBtn = addModal.querySelector('.close-button');

    //read all employees
    function fetchEmployees() {
        fetch(`${apiBaseUrl}/employees`)
            .then(response => response.json())
            .then(employees => {
                tableBody.innerHTML = ''; // Clear table
                employees.forEach(employee => {
                    const row = document.createElement('tr');
                    row.setAttribute('data-id', employee.id);
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
                tableBody.innerHTML = `<tr><td colspan="4">Could not load data.</td></tr>`;
            });
    }
    
    //READ ONE: Fetch complete details for one employee
    async function showEmployeeDetails(employeeId) {
        detailsModal.style.display = 'block';
        detailsLoader.style.display = 'block';
        detailsModalBody.innerHTML = '';

        try {
            const [empRes, salaryRes, deptRes] = await Promise.all([
                fetch(`${apiBaseUrl}/employees/${employeeId}`),
                fetch(`${apiBaseUrl}/salaries/${employeeId}`),
                fetch(`${apiBaseUrl}/departments/${employeeId}`)
            ]);

            const employee = await empRes.json();
            const salary = await salaryRes.json();
            const department = await deptRes.json();
            
            detailsLoader.style.display = 'none';
            detailsModalBody.innerHTML = `
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Age:</strong> ${employee.age}</p>
                <p><strong>Mobile:</strong> ${employee.mobile}</p>
                <p><strong>City:</strong> ${employee.city}</p>
                <p><strong>Salary:</strong> ${salary.salary}</p>
                <p><strong>Department:</strong> ${department.department}</p>
            `;
        } catch (error) {
            console.error("Error fetching employee details:", error);
            detailsLoader.style.display = 'none';
            detailsModalBody.innerHTML = `<p>Could not load details.</p>`;
        }
    }

    //create new employee
    addEmployeeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const newEmployeeData = Object.fromEntries(formData.entries());

        fetch(`${apiBaseUrl}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployeeData),
        })
        .then(response => response.json())
        .then(() => {
            addModal.style.display = 'none';
            addEmployeeForm.reset();
            fetchEmployees(); // Refresh the table
        })
        .catch(error => console.error('Error adding employee:', error));
    });

    // Event Listeners
    tableBody.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        if (row && row.dataset.id) {
            showEmployeeDetails(row.dataset.id);
        }
    });

    addEmployeeBtn.addEventListener('click', () => {
        addModal.style.display = 'block';
    });

    detailsCloseBtn.addEventListener('click', () => {
        detailsModal.style.display = 'none';
    });

    addModalCloseBtn.addEventListener('click', () => {
        addModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === detailsModal) {
            detailsModal.style.display = 'none';
        }
        if (event.target === addModal) {
            addModal.style.display = 'none';
        }
    });


    fetchEmployees();
});
