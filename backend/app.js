const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password', // replace with your MySQL password
    database: 'rule_engine_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// API to create a rule and save it in the database
app.post('/api/create_rule', (req, res) => {
    const ruleString = req.body.rule;
    const sql = "INSERT INTO rules (rule_string) VALUES (?)";
    db.query(sql, [ruleString], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Rule created successfully', ruleId: result.insertId });
    });
});

// Mock function to evaluate the rule (for demonstration purposes)
function evaluateAST(ruleString, data) {
    const rule = ruleString.toLowerCase();
    const age = data.age;
    const department = data.department.toLowerCase();
    const salary = data.salary;
    const experience = data.experience;

    let result = false;
    if ((age > 30 && department === 'sales') || (age < 25 && department === 'marketing')) {
        result = (salary > 50000 || experience > 5);
    }

    return result;
}

// API to evaluate a rule
app.post('/api/evaluate_rule', (req, res) => {
    const evaluationData = req.body.data;
    const ruleId = req.body.ruleId;

    const sql = "SELECT rule_string FROM rules WHERE id = ?";
    db.query(sql, [ruleId], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const rule = result[0].rule_string;
            const isValid = evaluateAST(rule, evaluationData);

            // Send back True/False as the evaluation result
            res.json({ result: isValid ? 'True' : 'False' });
        } else {
            res.json({ result: "Rule not found!" });
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
