// server.js
const express = require('express');
const cors =require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Using objects with IDs as keys for efficient lookups
let employees = {
    '1': { id: 1, name: 'Vishnu', age: 29, mobile: '912345678', city: 'Chennai' },
    '2': { id: 2, name: 'Rajesh', age: 30, mobile: '9412345678', city: 'Bangalore' },
    '3': { id: 3, name: 'Saravanan', age: 31, mobile: '6812345678', city: 'Hyderabad' },
    '4': { id: 4, name: 'Ramesh', age: 32, mobile: '9781234561', city: 'Mumbai' },
    '5': { id: 5, name: 'John', age: 33, mobile: '9456781234', city: 'Delhi' },
};

let salaries = {
    '1': { id: 1, salary: '60000' },
    '2': { id: 2, salary: '75000' },
    '3': { id: 3, salary: '80000' },
    '4': { id: 4, salary: '92000' },
    '5': { id: 5, salary: '110000' },
};

let departments = {
    '1': { id: 1, department: 'Technology' },
    '2': { id: 2, department: 'Sales' },
    '3': { id: 3, department: 'Marketing' },
    '4': { id: 4, department: 'Technology' },
    '5': { id: 5, department: 'Human Resources' },
};

//middlewares
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json()); 

//API Endpoints

// READ (All Employees for landing page)
app.get('/api/employees', (req, res) => {
    res.json(Object.values(employees));
});

// READ (Specific Employee Personal Info)
app.get('/api/employees/:id', (req, res) => {
    const employee = employees[req.params.id];
    if (employee) res.json(employee);
    else res.status(404).json({ error: 'Employee not found' });
});

// READ (Specific Employee Salary)
app.get('/api/salaries/:id', (req, res) => {
    const salary = salaries[req.params.id];
    if (salary) res.json(salary);
    else res.status(404).json({ error: 'Salary information not found' });
});

// READ (Specific Employee Department)
app.get('/api/departments/:id', (req, res) => {
    const department = departments[req.params.id];
    if (department) res.json(department);
    else res.status(404).json({ error: 'Department information not found' });
});

//CREATE(Addinf a New Employee)
app.post('/api/employees', (req, res) => {
    const newId = Date.now().toString();
    
    employees[newId] = {
        id: newId,
        name: req.body.name,
        age: parseInt(req.body.age, 10),
        mobile: req.body.mobile,
        city: req.body.city,
    };
    salaries[newId] = { id: newId, salary: req.body.salary };
    departments[newId] = { id: newId, department: req.body.department };
    
    console.log('Added new employee:', employees[newId]);
    res.status(201).json(employees[newId]);
});

//UPDATE(Edit an existing employee)
app.put('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    if (employees[id]) {
        employees[id] = { ...employees[id], ...req.body };
        res.json(employees[id]);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

// DELETE(Remove an employee)
app.delete('/api/employees/:id', (req, res) => {
    const { id } = req.params;
    if (employees[id]) {
        delete employees[id];
        delete salaries[id];
        delete departments[id];
        res.status(204).send(); 
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
