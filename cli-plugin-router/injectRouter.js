/***
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
 */
module.exports = (file, api) => {
    const jscodeshift = api.jscodeshift
    //把源代码转成AST语法树
    const root = jscodeshift(file.source)
    const appImportDeclaration = root.find(jscodeshift.ImportDeclaration, (node) => {
        if(node.specifiers[0].local.name === 'App'){
            return true
        }
    })
    if(appImportDeclaration)
        appImportDeclaration.remove();

    const appJSXElement = root.find(jscodeshift.JSXElement, (node) => {
        if (node.openingElement.name.name === 'App') {
            return true
        }
    })
    if(appJSXElement)//<App>
     appJSXElement.replaceWith(() => {
         //<Router>{renderRoutes(routesConfig)}</Router>
         return jscodeshift.jsxElement(
            jscodeshift.jsxOpeningElement(jscodeshift.jsxIdentifier('Router')), 
            jscodeshift.jsxClosingElement(jscodeshift.jsxIdentifier('Router')), [
                jscodeshift.jsxExpressionContainer(
                    jscodeshift.callExpression(jscodeshift.identifier('renderRoutes'),[jscodeshift.identifier('routesConfig')])
                )
            ], false
         );
    })
    return root.toSource()
}
