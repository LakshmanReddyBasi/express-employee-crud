# Express.js Employee CRUD Application

A simple, full-stack web application for managing employee records. This project features a RESTful API built with Node.js and Express, and a clean, interactive frontend built with vanilla JavaScript, HTML, and CSS.


## ## Features

* **View All Employees**: See a list of all employees on the landing page.
* **View Employee Details**: Click on any employee to see their complete information (including salary and department) in a popup modal.
* **Add New Employee**: Add a new employee to the system through a simple and clean form.
* **Dynamic UI**: The user interface is updated in real-time without page reloads.
* **Loading States**: A loading indicator is shown while fetching data from the server.
* **Full CRUD API**: The backend API supports all four CRUD (Create, Read, Update, Delete) operations.

---

## ## Technology Stack

* **Backend**:
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [CORS](https://expressjs.com/en/resources/middleware/cors.html)
* **Frontend**:
    * HTML5
    * CSS3
    * Vanilla JavaScript (ES6+)

---

## ## Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/download/) (v14 or higher is recommended)
* npm (comes bundled with Node.js)

---

## ## Getting Started

Follow these steps to get the project up and running on your local machine.

### ### 1. Clone the Repository

```bash
git clone [https://[github.com/LakshmanReddyBasi/express-employee-crud.git](https://github.com/LakshmanReddyBasi/express-employee-crud.git)
cd express-employee-crud
```

### ### 2. Install Dependencies

Install the necessary npm packages for the server.

```bash
npm install express cors
```

### ### 3. Run the Server

Start the backend Express server.

```bash
node server.js
```

You should see the following message in your terminal, indicating that the server is running:
```
Server is running on http://localhost:3001
```

### ### 4. Open the Application

Open your favorite web browser and navigate to:
**[http://localhost:3001](http://localhost:3001)**

The application should now be running in your browser.

---

## ## API Endpoints

The backend server provides the following RESTful API endpoints.

| Method | Endpoint                    | Description                                       |
| :----- | :-------------------------- | :------------------------------------------------ |
| `GET`  | `/api/employees`            | Retrieves a list of all employees.                |
| `GET`  | `/api/employees/:id`        | Retrieves the personal info of a single employee. |
| `GET`  | `/api/salaries/:id`         | Retrieves the salary info of a single employee.   |
| `GET`  | `/api/departments/:id`      | Retrieves the department info of a single employee.|
| `POST` | `/api/employees`            | Adds a new employee to the system.                |
| `PUT`  | `/api/employees/:id`        | Updates an existing employee's information.       |
| `DELETE`| `/api/employees/:id`       | Deletes an employee from the system.              |
