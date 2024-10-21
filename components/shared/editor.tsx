"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import StarterKit from "@tiptap/starter-kit";
import {
  EditorContent,
  JSONContent,
  useEditor,
  type Editor,
} from "@tiptap/react";

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div
      className="
      grid
      grid-cols-2
      sm:grid-cols-4
      md:grid-cols-8
      lg:grid-cols-12
      gap-2
      "
    >
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
        className="w-full"
      >
        H1
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
        className="w-full"
      >
        H2
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
        className="w-full"
      >
        H3
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
        className="w-full font-bold"
      >
        Bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
        className="w-full italic"
      >
        Italic
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
        className="w-full line-through"
      >
        Strike
      </Button>
    </div>
  );
};

const TipTapEditor: FC<{
  json: JSONContent | null;
  setJson: Dispatch<SetStateAction<null | JSONContent>>;
}> = ({ json, setJson }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Description here!",
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
    onUpdate: ({ editor }) => setJson(editor.getJSON()),
  });

  return (
    <div
      className="
      flex
      flex-col
      gap-y-3
      "
    >
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="
        rounded-lg
        border
        p-2
        min-h-[150px]
        "
      />
    </div>
  );
};

export default TipTapEditor;
