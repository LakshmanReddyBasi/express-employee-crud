// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// --- Mock Data ---
const employees = {
    '1': { id: 1, name: 'Vishnu', age: 29, mobile: '912345678', city: 'Chennai' },
    '2': { id: 2, name: 'Rajesh', age: 30, mobile: '9412345678', city: 'Bangalore' },
    '3': { id: 3, name: 'Saravanan', age: 31, mobile: '6812345678', city: 'Hyderabad' },
    '4': { id: 4, name: 'Ramesh', age: 32, mobile: '9781234561', city: 'Mumbai' },
    '5': { id: 5, name: 'John', age: 33, mobile: '9456781234', city: 'Delhi' },
};

const salaries = {
    '1': { id: 1, salary: '60000' },
    '2': { id: 2, salary: '75000' },
    '3': { id: 3, salary: '80000' },
    '4': { id: 4, salary: '92000' },
    '5': { id: 5, salary: '110000' },
};

const departments = {
    '1': { id: 1, department: 'Technology' },
    '2': { id: 2, department: 'Sales' },
    '3': { id: 3, department: 'Marketing' },
    '4': { id: 4, department: 'Technology' },
    '5': { id: 5, department: 'Human Resources' },
};

// --- Middleware ---
app.use(cors()); // Enable CORS for all routes
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// --- API Endpoints ---

// GET All Employees (for the landing page)
app.get('/api/employees', (req, res) => {
    res.json(Object.values(employees));
});

// GET Employee Personal Information by ID
app.get('/api/employees/:id', (req, res) => {
    const employee = employees[req.params.id];
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

// GET Employee Salary by ID
app.get('/api/salaries/:id', (req, res) => {
    const salary = salaries[req.params.id];
    if (salary) {
        res.json(salary);
    } else {
        res.status(404).json({ error: 'Salary information not found' });
    }
});

// GET Employee Department by ID
app.get('/api/departments/:id', (req, res) => {
    const department = departments[req.params.id];
    if (department) {
        res.json(department);
    } else {
        res.status(404).json({ error: 'Department information not found' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});