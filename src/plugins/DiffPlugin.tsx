import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useEffect, useRef } from "react";

function MyOnChangePlugin() {
  const previousTextRef = useRef("");

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        editorState.read(() => {
          const currentText = $getRoot().getTextContent();

          const previousText = previousTextRef.current;

          if (previousText !== currentText) {
            console.clear();

            console.log("Previous:", previousText);

            console.log("Current:", currentText);

            console.log("Dirty Elements:");

            console.log(dirtyElements);

            console.log("Dirty Leaves:");

            console.log(dirtyLeaves);

            console.log("Incremental change detected");

            previousTextRef.current = currentText;
          }
        });
      },
    );
  }, [editor]);

  return null;
}

export default MyOnChangePlugin;
