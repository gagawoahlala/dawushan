
var path = require("path");
const isDevelopment = process.env.NODE_ENV === 'development'
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.min.js'
  },
  devtool: 'source-map',
  optimization: {
    concatenateModules: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
  }), new HtmlWebpackPlugin({
    template: './src/index.html'
  })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            root: path.resolve(__dirname, './src'),
            attributes: ['img:src', 'link:href']
          }
        },
      },
      { test: /\.(svg|gif|png|eot|jpe?g|woff|ttf)$/, 
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[path][name].[ext]',
            // outputPath: 'images/',
            limit: 1024 * 50
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'image-webpack-loader',
          options: {
            enforce: 'pre',
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: true,
              optimizationLevel: 3
            },
            // the webp option will enable WEBP
            // webp: {
            //   quality: 75,
            //   size: 100 * 1024
            // }
          }
        },
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ['es2015']}
        }
      },
      {
        test: /\.(sa|sc)ss$/,
        // exclude: [/node_modules/],
        use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js'
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
      },
      {
        test: /\.css$/,
        // exclude: [/node_modules/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
            }
          }, 
          'css-loader'
        ]
      }
    ]
  }
}