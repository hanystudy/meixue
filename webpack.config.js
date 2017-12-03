module.exports = {
    entry: "./src/assets/renderer.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    target: 'electron-renderer',
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-2']
                        }
                    },
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules(?![\\/]vue-awesome[\\/])/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};
