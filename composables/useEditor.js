import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css'
import Prism from 'prismjs';

export default async (initialValue) => {
  const {Editor} = await import('@toast-ui/editor')
  const {default:codeSyntaxHighlight} = await import('@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js');

  return new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialValue: initialValue,
    plugins: [codeSyntaxHighlight],
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    hooks :{
      addImageBlobHook: async (blob, callback) => {
        const image = await useImageUpload(blob);
        callback(useImage(image.url), '')
        return false
      }
    }
  })
}