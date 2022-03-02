import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const Editor = ({ value, onChange }) => {
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      value={value}
      onChange={onChange}
      name="main_editor"
    />
  );
};

export default Editor;
