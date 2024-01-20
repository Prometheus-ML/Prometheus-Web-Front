import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default async (initialValue, target) => {
  const {default: Viewer} = await import('@toast-ui/editor/dist/toastui-editor-viewer')
  const {default: codeSyntaxHighlight} = await import('@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js');
  return new Viewer({
    el: document.querySelector('#viewer'),
    height: '600px',
    initialValue: initialValue,
    plugins: [codeSyntaxHighlight],
  });
}