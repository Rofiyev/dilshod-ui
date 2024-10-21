"use client";

import { FC } from "react";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ProductDescriptionProps {
  content: JSONContent;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ content }) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base prose-h1:text-2xl prose-p:my-4",
      },
    },
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
};

export default ProductDescription;
