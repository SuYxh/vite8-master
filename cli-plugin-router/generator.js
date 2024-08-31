module.exports = async (api, options) => {
    api.render('./template');//实现过了

    api.injectImport(api.entryFile,
        `import {${options.historyMode === 'hash' ? 'HashRouter' : 'BrowserRouter'} as Router,Route} from 'react-router-dom'`);
    api.injectImport(api.entryFile,
        `import routesConfig from './routesConfig'`);
    api.injectImport(api.entryFile,
        `import { renderRoutes } from "react-router-config"`);
     /// ./src/index.js   
    api.transformScript(api.entryFile, require('./injectRouter'))

    api.extendPackage({//扩展依赖包
        dependencies: {
            'react-router-dom': 'latest',
            'react-router-config': 'latest'
        }
    });
}