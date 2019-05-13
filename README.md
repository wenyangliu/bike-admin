This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

### `yarn add react-router-dom axios less-loader less`

### `yarn eject`

暴露 webpack
修改 webpack.config.js 
使其支持 less
```sh
   {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'less-loader'
              ),
              sideEffects: true,
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
                'less-loader'
              ),
            },
``` 

### `yarn add antd`
安装 antd ui库

### `yarn add babel-plugin-import`
修改webpack
```sh
['import', {
        libraryName: 'antd',
        style: true
      }],
```

less@3.x 有问题
需要修改 添加 `{ loader: 'less-loader', options: { javascriptEnabled: true } }`

### 使用百度地图
public 目录下 index.html 直接引入 script

### 使用echarts
`yarn add echarts echarts-for-react`

### 使用富文本
`yarn add braft-editor`

### Redux 使用
`yarn add redux react-redux redux-devtools-extension`