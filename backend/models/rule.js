// backend/models/Rule.js
class Node {
    constructor(type, left = null, right = null, value = null) {
      this.type = type; // "operator" or "operand"
      this.left = left;
      this.right = right;
      this.value = value;
    }
  }
  
  function parseRuleToAST(ruleString) {
    // Simple parser (extend this to parse actual logical expressions)
    // This should be extended to create Node objects based on ruleString
    const tokens = ruleString.split(" ");
    let root = new Node("operator", null, null, tokens[1]); // assumes AND/OR operators
    root.left = new Node("operand", null, null, { attribute: "age", operator: ">", value: 30 });
    root.right = new Node("operand", null, null, { attribute: "department", operator: "=", value: "Sales" });
    return root;
  }
  
  module.exports = { Node, parseRuleToAST };
  