import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  FontBoldIcon,
  FontItalicIcon,
  ReloadIcon,
  UnderlineIcon,
  ImageIcon,
  Link2Icon,
} from "@radix-ui/react-icons";

// src/components/editor/plugins/toolbar-plugin.tsx
export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);

  return (
    <div className="w-full px-4 py-2 z-10 flex items-center justify-between">
      <div className="flex space-x-2 justify-start items-center">
        <div className="bg-[#e9fbfa] px-4 rounded-md h-7 inline-flex justify-center items-center cursor-pointer">
          <ImageIcon color="#19b2a6" />
        </div>
        <div className="bg-[#ebedfc] px-4 rounded-md h-7 inline-flex justify-center items-center cursor-pointer">
          <Link2Icon color="#4f5be2" />
        </div>
      </div>
      <div className="flex space-x-2 justify-center">
        <Toggle
          area-label="Bold"
          size="sm"
          pressed={isBold}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            setIsBold(pressed);
          }}
        >
          <FontBoldIcon />
        </Toggle>

        <Toggle
          area-label="Italic"
          size="sm"
          pressed={isItalic}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            setIsItalic(pressed);
          }}
        >
          <FontItalicIcon />
        </Toggle>

        <Toggle
          area-label="Underline"
          size="sm"
          pressed={isUnderline}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            setIsUnderline(pressed);
          }}
        >
          <UnderlineIcon />
        </Toggle>
      </div>
    </div>
  );
}
