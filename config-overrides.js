// Created by liuliyuan on 2018/6/22
//TODO: javascriptEnabled: true,

const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: {
            "@primary-color": "#47ADBF",
            //form
            "@form-item-margin-bottom":"12px",
            //input
            //"@input-height-base":'25px'
        },

    })(config, env);
    return config;
};