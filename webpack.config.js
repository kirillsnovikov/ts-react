const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

module.exports = {
    context: paths.src, // базовая директория для точек входа и загрузчиков    
    entry: {
        app: './index'  // точка входа в приложение, наш src/index.ts файл, названием итогового бандла будет имя свойства - app
    },

    output: {
        path: paths.dist,  // путь для результатов сборки 
        filename: '[name].bundle.js'  // название итогового бандла, получится dist/app.bundle.js
    },

    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'] // указание расширений файлов, которые webpack будет обрабатывать, и пытаться добавить автоматически (например получив запрос на index, не найдет его и попробует index.ts)
    },

    devtool: 'source-map', // дополнительные настройки и загрузчики не требуются, хотя даже официальный рецепт от TypeScript рекомендует source-map-loader и поле в tsconfig - "sourceMap": true 

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            } // загрузчик для обработки файлов с расширением .ts
        ]
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './assets/index.html',
            title: 'TSX React'
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        contentBase: path.dist,
        compress: true,
        port: 9000
    }
};