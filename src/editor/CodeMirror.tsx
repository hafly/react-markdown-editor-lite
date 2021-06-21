import * as React from 'react';
import * as codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';

class CodeMirror extends React.Component<any> {
  private editor: any;
  private cursor: object = {};
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { onChange, value = '', onScroll, onInit } = this.props;

    if (this.ref.current) {
      this.editor = codemirror(this.ref.current, {
        lineNumbers: true,
        lineWrapping: true,
        theme: 'default',
        mode: 'markdown',
        value,
      });
      const { editor, setCursor } = this;

      setCursor(editor, true);
      const changeDelay = (e: any) => {
        onChange && onChange(e.getValue());
      };
      editor.on('change', changeDelay);
      onInit && onInit(this.editor);
      onScroll && editor.on('scroll', onScroll);
    }
  }

  setCursor = (editor: any, toEnd: any) => {
    const { line, ch } = editor.doc.getCursor();
    this.cursor = { ch, line: toEnd ? line + 1 : line };
  };

  focus() {
    const { editor } = this;
    const { useFocus } = this.props;
    if (!useFocus) return;
    editor.focus();
    editor.setCursor({ ...this.cursor });
  }

  render() {
    const { className } = this.props;
    return <div ref={ this.ref } className={ `ReactCodeMirror ${className}` } />;
  }
}

export default CodeMirror;
