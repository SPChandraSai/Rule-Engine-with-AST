// backend/controllers/ruleController.js
const db = require('../config/database');
const { parseRuleToAST } = require('../models/Rule');

exports.createRule = (req, res) => {
  const { ruleString } = req.body;
  const ruleAST = parseRuleToAST(ruleString);
  db.query("INSERT INTO rules (rule_string, description) VALUES (?, ?)", [ruleString, "Sample rule"], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Rule created successfully", ruleId: result.insertId });
  });
};

exports.evaluateRule = (req, res) => {
  const { ruleId, data } = req.body;
  // Evaluation logic
  db.query("SELECT * FROM rule_nodes WHERE rule_id = ?", [ruleId], (err, result) => {
    if (err) return res.status(500).send(err);
    // Mock evaluation logic, extend to actual evaluation
    res.json({ result: "Evaluation result here" });
  });
};
