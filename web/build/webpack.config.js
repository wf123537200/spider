const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const pkg = require('../package.json');

const isAnalyze = process.argv.includes('--analyze');

// utils
const ROOT_DIR = path.resolve(__dirname, '../');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

// settings
const SRC_DIR = resolvePath('src');
const BUILD_DIR = resolvePath('dist');
const PUBLIC_DIR = resolvePath('src/public');

// params
const isDebug = process.env.NODE_ENV !== 'production';

/* custom START */
// alias
const alias = {
 src: SRC_DIR

  // 【用来缩减antd-icon的体积，可以配合themes/antd.icons.js来使用，按自己的需要放置图标】
  // '@ant-design/icons/lib/dist$': resolvePath('src/themes/antd.icons.js')
};
// externals
const externals = {};
/* custom END */

// common loader options for styles
const styleLoader = isDebug ? 'style-loader' : MiniCssExtractPlugin.loader;
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: isDebug
  }
};
const cssLoaderWithModule = {
  loader: 'css-loader', // translates CSS into CommonJS
  options: Object.assign({}, cssLoader.options, {
    modules: {
      localIdentName: '[path][name]__[local]--[hash:base64:5]'
    }
  })
};

const babelLoaderOptions = {
  babelrc: false,
  cacheDirectory: isDebug,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: pkg.browserslist
        },
        forceAllTransforms: !isDebug, // for UglifyJS
        modules: false,
        useBuiltIns: false,
        debug: false
      }
    ],
    [
      '@babel/preset-react',
      {
        development: isDebug
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 2 }],
    // stage 0
    '@babel/plugin-proposal-function-bind',
    // stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: false
      }
    ],
    '@babel/plugin-proposal-json-strings',
    // ['transform-es2015-modules-commonjs', {
    //   "allowTopLevelThis": true
    // }],
    // 热加载
    ...(isDebug ? ['dva-hmr', 'react-hot-loader/babel'] : []),

    // 按需加载antd
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true
      }
    ]
  ]
};

module.exports = {
  mode: isDebug ? 'development' : 'production',

  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: isDebug ? 'cheap-module-eval-source-map' : false,

  entry: {
    app: [
      ...(isDebug ? ['webpack-hot-middleware/client?path=/__webpack_hmr'] : []),
      './src/index.ts'
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 5,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        antd: {
          test: /[\\/]node_modules[\\/]antd/,
          name: 'antd',
          chunks: 'all',
          enforce: true,
          priority: 0
        },
        react: {
          test: /[\\/]node_modules[\\/]react\-dom/,
          name: 'react',
          chunks: 'all',
          enforce: true,
          priority: 0
        },
        vendors: {
          test: /[\\/]node_modules[\\/]([^(antd))|(^(react\-dom)])/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
          priority: 0
        },
        commons: {
          chunks: 'initial',
          minChunks: 3,
          name: 'syncs',
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          priority: -3,
          reuseExistingChunk: true
        },
        asyncs: {
          chunks: 'async',
          minChunks: 2,
          name: 'asyncs',
          maxInitialRequests: 1, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          priority: -4,
          reuseExistingChunk: true
        }
      }
    }
  },

  output: {
    path: BUILD_DIR,
    filename: isDebug ? '[name].js' : '[name].[hash:7].js',
    chunkFilename: isDebug
      ? 'chunks/[name].js'
      : 'chunks/[name].[chunkhash:8].js',
    publicPath: '/'
  },

  externals,

  resolve: {
    modules: ['node_modules', SRC_DIR],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias
  },

  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        include: [SRC_DIR],
        use: [
          {
            loader: 'babel-loader',
            options: babelLoaderOptions
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, '../src'),
        options: {
          formatter: eslintFormatter,
          failOnError: !isDebug,
          configFile: isDebug
            ? resolvePath('.eslintrc.dev.js')
            : resolvePath('.eslintrc.js')
        }
      },
      {
        test: /\.js[x]?$/,
        include: [SRC_DIR],
        loader: 'babel-loader',
        options: babelLoaderOptions
      },
      /* font */
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelLoaderOptions
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true
            }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      /* images */
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [styleLoader, cssLoader]
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /local/,
            use: [
              styleLoader,
              cssLoaderWithModule,
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: resolvePath('build/postcss.config.js')
                  }
                }
              },
              {
                loader: 'less-loader', // compiles less to CSS
                options: {
                  javascriptEnabled: true
                }
              }
            ]
          },
          {
            use: [
              styleLoader,
              cssLoader,
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: resolvePath('build/postcss.config.js')
                  }
                }
              },
              {
                loader: 'less-loader', // compiles less to CSS
                options: {
                  modifyVars: {
                    'hack': `true; @import "${SRC_DIR}/themes/antd.var.less";`, // Override antd
                  },
                  javascriptEnabled: true
                }
              }
            ]
          }
        ]
      }
    ]
  },

  plugins: [
    // webpack构建失败错误抛出
    {
      apply: (compiler) => {
        // compiler.hooks.done.tap('donePlugin', (stats) => {
        //   if (stats.compilation.errors && stats.compilation.errors.length) {
        //     console.log(stats.compilation.errors);
        //   }
        // });
        compiler.hooks.failed.tap('failedPlugin', (error) => {
          console.log(error);
        });
      }
    },
    new webpack.DefinePlugin({ __DEV__: isDebug }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      {
        from: PUBLIC_DIR,
        to: 'public' // 相对于output
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'index.ejs'),
      filename: 'index.html'
    }),
    //
    ...(isDebug
      ? [
        /* 开发环境 START */
        // 如果使用了dll才注入相关文件
        ...(fs.existsSync(resolvePath('webpack/dist'))
          ? [
            new webpack.DllReferencePlugin({
              // 链接dll
              manifest: require(resolvePath(
                'webpack/dist',
                'dependencies.manifest.json'
              ))
            }),
            new HtmlIncludeAssetsPlugin({
              // 插入到html中的dll库，必须放在HtmlWebpackPlugin之后
              assets: ['webpack/dependencies.dll.js'],
              append: false
            }),
            new CopyWebpackPlugin([
              {
                from: resolvePath('webpack/dist'),
                to: 'webpack' // 相对于output
              }
            ])
          ]
          : []),
        new webpack.HotModuleReplacementPlugin()
        /* 开发环境 END */
      ]
      : [
        /* 生产环境 START */
        new CleanWebpackPlugin([BUILD_DIR], { root: ROOT_DIR }),
        new MiniCssExtractPlugin({
          // 配合module中loader使用，生产环境才需要
          filename: '[name].[hash].css',
          chunkFilename: '[id].[hash].css'
        }),
        new optimizeCssAssetsWebpackPlugin(),
        ...(isAnalyze
          ? [
            new BundleAnalyzerPlugin({
              analyzerHost: 'localhost',
              analyzerPort: 5000
            })
          ]
          : [])
        /* 生产环境 END */
      ])
    //
  ],

  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: isDebug,
    timings: true,
    version: false
  }
};
