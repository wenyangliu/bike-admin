import React from 'react'
import { Card, Button, Modal } from 'antd'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css'

export default class Rich extends React.Component {
  state = {
    editorState: null,
    showRichText: false
  }
  handleChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  clearHTML = () => {
    this.setState({
      editorState: ContentUtils.clear(this.state.editorState)
    })
  }
  getHTML = () => {
    this.setState({
      showRichText: true
    })
  }
  render() {
    const {editorState} = this.state
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.clearHTML} style={{marginRight: 20}}>清空内容</Button>
          <Button type="primary" onClick={this.getHTML}>获取HTML文本</Button>
        </Card>

        <Card title="富文本">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </Card>

        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={()=>{
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {this.state.editorState && this.state.editorState.toHTML()}
        </Modal>
      </div>
    )
  }
}