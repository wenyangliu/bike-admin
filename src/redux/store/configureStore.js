// 引入createStore创建store，引入applyMiddleware 来使用中间件
import { createStore, applyMiddleware } from 'redux'

// 引入所有的 reducer
import reducer from '../reducer'

// 安装 redux-devtools-extension的可视化工具
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  menuName: ''
}
const configureStore = () => createStore(reducer, composeWithDevTools())

export default configureStore