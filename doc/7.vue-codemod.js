const {runTransformation} = require('vue-codemod');
let file = 'index.js';
let source = `import React from 'react'\n`;

let imports = [`import ReactDOM from 'react-dom'`,`import {HashRouter} from 'react-router-dom'`];
let transformed = runTransformation(
    {path:file,source},
    injectImports,
    {imports}
);
console.log(transformed);

function injectImports(fileInfo,api,{imports}){
    let jscodeshift = api.jscodeshift;
    let astRoot = jscodeshift(fileInfo.source);
    //存放着语法中所有的import语句
    const toImportAstNode = imp=>jscodeshift(`${imp}\n`).nodes()[0].program.body[0];
    let importASTNodes = imports.map(toImportAstNode);
    let declarations = astRoot.find(jscodeshift.ImportDeclaration);
    console.log(declarations);
    //import只能放置在顶端
    if(declarations.length>0){//如果以前有import 向第一条上面添加imports
        declarations.at(-1).insertAfter(importASTNodes);
    }else{
        astRoot.get().node.program.body.unshift(...importASTNodes);
    }
    return astRoot.toSource();
}
/* import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import React from 'react' */