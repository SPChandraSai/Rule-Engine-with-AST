# Rule Engine Project

A simple rule engine web application that allows users to create rules, evaluate data against them, and receive evaluation results as `True` or `False`. The application includes a backend API to store and evaluate rules in a MySQL database.

## Project Structure

The project structure is as follows:
```
rule-engine/
├── backend/
│   ├── app.js              # Main backend application file
│   ├── package.json        # Node.js dependencies
├── frontend/
│   ├── style.css           # CSS for styling the frontend
├── index.html              # Main HTML file for the frontend
└── README.md               # Project documentation
```

## Features

- **Create Rules:** Enter logical expressions in natural language, e.g., `(age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')`.
- **Evaluate Rules:** Evaluate JSON data against created rules and receive a `True` or `False` result.
- **Database Storage:** Stores created rules in a MySQL database for persistent rule management.
- **REST API Endpoints:** API endpoints to create and evaluate rules.

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (for database storage)
- **GitHub** (for deployment via GitHub Pages, if desired)

### Database Setup

1. Install MySQL if not already installed.
2. Create a new database called `rule_engine_db`.
3. Create a table for rules:
   ```sql
   CREATE TABLE rules (
       id INT AUTO_INCREMENT PRIMARY KEY,
       rule_string TEXT NOT NULL
   );
   ```
4. Update the MySQL connection settings in `backend/app.js` with your MySQL username and password.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SPChandraSai/Rule-Engine-with-AST
   cd rule-engine
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   node app.js
   ```
   This will start the server on `http://localhost:3000`.

2. **Access the Frontend**
   Open `index.html` in a browser to access the frontend interface.

### File Structure Notes

- `index.html` has been placed in the root directory, with CSS file references pointing to `frontend/style.css`.
- No changes are needed for JavaScript functions or relative paths since we explicitly define paths within the HTML file.

## API Endpoints

### POST /api/create_rule

- **Description:** Creates a new rule and stores it in the database.
- **Request Body:** `{ "rule": "string" }`
- **Response:** `{ "message": "Rule created successfully", "ruleId": <int> }`

### POST /api/evaluate_rule

- **Description:** Evaluates provided data against a stored rule.
- **Request Body:** `{ "data": <JSON object>, "ruleId": <int> }`
- **Response:** `{ "result": "True" | "False" }`

## Example Data for Testing

- **Rule Example:** `(age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing') AND (salary > 50000 OR experience > 5)`
- **True Case:**
  ```json
  {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 6
  }
  ```
- **False Case:**
  ```json
  {
    "age": 28,
    "department": "HR",
    "salary": 40000,
    "experience": 3
  }
  ```

## Design Choices

- **Rule Storage:** Rules are stored as text strings in the database. Future versions could use a more complex AST-based rule storage.
- **Simple Parser:** The `evaluateAST` function interprets the rule text directly for basic use cases.
- **Frontend-Backend Separation:** The frontend (`index.html` and `style.css`) and backend (`app.js`) are separated for modularity. The frontend communicates with the backend API using `fetch` requests.

## Dependencies

The dependencies for the backend are specified in `backend/package.json`. Key dependencies include:

- **express** - For building the backend server.
- **mysql2** - For connecting to the MySQL database.
- **body-parser** - For handling JSON requests.
- **cors** - For enabling cross-origin requests from the frontend.
