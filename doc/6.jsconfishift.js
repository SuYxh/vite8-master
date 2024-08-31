let jscodeshift = require('jscodeshift')
//parser JS源代码转成AST 
const ast = jscodeshift(`import ReactDOM from 'react-dom';`);
console.log(ast.nodes()[0].program.body[0]);

