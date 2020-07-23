import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichTextEditor extends Component {
  constructor(props){
    super(props);
    let html = this.props.detail;
    let editorState = EditorState.createEmpty();
    if(html!==""){
      let contentBlock = htmlToDraft(html);
      let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      editorState = EditorState.createWithContent(contentState);
    }
    this.state = {
      editorState: editorState
    }
  }

  onEditorStateChange= (editorState) => {
    this.setState({editorState,});

  };
  uploadImageCallBack=(file)=>{
    return new Promise((resolve,reject)=>{
      const xhr = new XMLHttpRequest();
      xhr.open('POST','/manage/img/upload');
      const data = new FormData();
      data.append('image',file);
      xhr.send(data);
      xhr.addEventListener('load', ()=>{
        const res = JSON.parse(xhr.responseText);
        const url = res.data.url;
        resolve({data:{link:url}})
      })
      xhr.addEventListener('error', ()=>{
        const res = JSON.parse(xhr.responseText);
        reject(res)
      })
    })
  }
  getEditorValue=()=>{
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border:"solid 1px #ccc",minHeight:200,paddingLeft:10}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image:{uploadCallback:this.uploadImageCallBack,alt:{present:true,mandatory:true}}
          }}
        />
      </div>
    );
  }
}
export default RichTextEditor;