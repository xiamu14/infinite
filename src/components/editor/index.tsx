"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/toolbar-plugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
type LexicalEditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

export function LexicalEditor(props: LexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={props.config}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        // placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

const Placeholder = () => {
  return <div className="absolute top-[5.25rem] left-[1.125rem] opacity-50">Start writing...</div>;
};

export default function Editor() {
  return (
    <div
      id="editor-wrapper"
      className={
        "relative prose prose-slate prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2 w-full"
      }
    >
      <LexicalEditor
        config={{
          namespace: "lexical-editor",
          theme: {
            root: "p-4 border-none rounded h-full min-h-[200px] focus:outline-none focus-visible:border-black",
            link: "cursor-pointer",
            text: {
              bold: "font-semibold",
              underline: "underline",
              italic: "italic",
              strikethrough: "line-through",
              underlineStrikethrough: "underlined-line-through",
            },
          },
          onError: (error) => {
            console.log(error);
          },
        }}
      />
    </div>
  );
}
