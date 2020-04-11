// webpack是基于nodeJS的
// 所以要使用CommonJS规范导出一个对象

const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    // 输出路径，必须是绝对路径
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js"
  },
  // 开发：development，生产：production。开发模式下，代码不会被压缩，便于调试
  mode: "development", 
  // 代码的映射关系，生产环境设置为none
  devtool: "source-map", // source-map、none、inline-source-map
  // 处理模块
  module: {
    rules: [ // 做检测用：.css .png .ts等等
      // 处理图片：npm i file-loader -D
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: ["file-loader"] // 单独使用loader时的写法
        use: [{ // 需要使用options时的写法
          loader: "file-loader",
          options: {
            name: "[name]_[hash:8].[ext]",
            outputPath: "images/" // 会在dist目录下创建一个images文件夹，图片都会放在里面，方便统一管理
          }
        }]
      },
      // 处理字体文件（这里只列举.woff2）
      {
        test: /\.woff2$/,
        use: [{
          loader: "file-loader"
        }]
      },
      // 处理CSS：npm i style-loader css-loader -D
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader",
          options: {
            injectType: "singletonStyleTag" // 将多个style合并成一个style
          }
        }, "css-loader"]
      },
      // 处理scss： npm install sass-loader node-sass -D
      {
        test: /.(sass|scss)$/,
        // 这里是将css以style标签的方式放在html文件中
        // use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] // postcss-loader的配置在 postcss.config.js 文件中

        // 这里是将css抽离独立文件的方式
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    // 可以开启缓存、压缩等操作
    new HtmlWebpackPlugin({ // npm i html-webpack-plugin -D
      template: "./public/index.html",
      filename: "index.html"
    }),
    new CleanWebpackPlugin(), // npm i clean-webpack-plugin -D
    // 将css以独立文件的方式抽离出来
    new MiniCssExtractPlugin({ // npm i mini-css-extract-plugin -D
      filename: "[name]_[chunkhash:8].css"
    })
  ]
}