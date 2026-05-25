import { useRef } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { $getRoot } from "lexical";

function MyOnChangePlugin() {
  const previousTextRef = useRef("");

  function onChange(editorState) {
    editorState.read(() => {
      const currentText = $getRoot().getTextContent();

      const previousText = previousTextRef.current;

      if (previousText !== currentText) {
        console.log("Previous:", previousText);

        console.log("Current:", currentText);

        console.log("Detected Change!");

        previousTextRef.current = currentText;
      }
    });
  }

  return <OnChangePlugin onChange={onChange} />;
}

export default function App() {
  const initialConfig = {
    namespace: "Editor",

    onError(error) {
      console.error(error);
    },

    editorState: `
    {
      "root": {
        "children": [
          {
            "children": [
              {
                "detail": 0,
                "format": 0,
                "mode": "normal",
                "style": "",
                "text": "This is a sample document with one page.",
                "type": "text",
                "version": 1
              }
            ],
            "direction": null,
            "format": "",
            "indent": 0,
            "type": "paragraph",
            "version": 1
          }
        ],
        "direction": null,
        "format": "",
        "indent": 0,
        "type": "root",
        "version": 1
      }
    }
    `,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{
                minHeight: "200px",
                outline: "none",
              }}
            />
          }
          placeholder={<div>Type here...</div>}
        />

        <HistoryPlugin />

        <MyOnChangePlugin />
      </div>
    </LexicalComposer>
  );
}
