import React from 'react'
import './index.less'

export default class Footer extends React.Component {
  render() {
    const {loginType} = this.props
    return (
      <div className={loginType ? 'footer2': 'footer'}>
        版权所有@文道诗洋
      </div>
    )
  }
}