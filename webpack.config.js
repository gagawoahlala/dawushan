
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
        // HTML LOADER
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            root: path.resolve(__dirname, './src'),
            attributes: ['img:src', 'link:href']

            // attributes: false,
            // interpolate: true
          }
        },
      },
      { test: /\.(svg|gif|png|eot|jpg|woff|ttf)$/, 
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[path][name].[ext]',
            // outputPath: 'images/',
            // limit: 1024
          }
        }
      },
      // {
      //   test: /\.(svg|gif|png|eot|jpg|woff|ttf)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[path][name].[ext]',
      //     esModule: false
      //   },
      // },
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
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        },
      },
      { test: /\.js$/,
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
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js'
                }
              }
            },
            'sass-loader'
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