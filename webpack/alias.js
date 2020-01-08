const path = require('path');
const resolve = p => path.resolve(__dirname, '../', p);

module.exports =  {
    dist: resolve('dist/app-monitor-static'),
    server: resolve('server'),
    src: resolve('src'),
    images: resolve('src/images'),
    scripts: resolve('src/scripts'),
    utils: resolve('src/scripts/utils'),
    services: resolve('src/scripts/services'),
    app: resolve('src/scripts/app'),
    sdk: resolve('src/sdk'),
    webpack: resolve('webpack'),
    node_modules: resolve('node_modules'),
}
