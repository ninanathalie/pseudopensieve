"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import TextareaAutoSize from "react-textarea-autosize";
import { Save } from "lucide-react";
import { updatePost } from "@/actions/update-post";
import { cn } from "@/utils/cn";
import { FloatingNav } from "@/components/ui/floating-navbar";
import BackgroundBlob from "@/components/ui/background-blob";
import { useRouter } from "next/navigation";

interface UpdatePostProps {
  post: {
    slug: string;
    title: string;
    body: string | null;
  };
}

export default function UpdatePost({ post }: UpdatePostProps) {
  const router = useRouter();
  const [html, setHTML] = useState("");
  const [textInput, setTextInput] = useState(post.title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const editor: BlockNoteEditor = useCreateBlockNote();

  const handleChange = useCallback(async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    setHTML(html);
    setIsContentChanged(true);
  }, [editor, setHTML]);

  useEffect(() => {
    async function loadInitialContent() {
      if (post.body) {
        const blocks = await editor.tryParseHTMLToBlocks(post.body);
        editor.replaceBlocks(editor.document, blocks);
      }
    }
    loadInitialContent();
  }, [editor, post.body]);

  const handleTextInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    setIsContentChanged(true);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const html = await editor.blocksToHTMLLossy(editor.document);

    // Call the server-side function and get the updated slug
    const updatedSlug = await updatePost(post.slug, html, textInput);

    // If the slug has changed, navigate to the new route
    if (updatedSlug !== post.slug) {
      router.push(`/blogs/${updatedSlug}`);
    }

    setIsSubmitting(false);
    setIsContentChanged(false);
  };

  const navItems = [
    {
      title: "Save",
      component: <Save className="w-4 h-4 md:w-full md:h-full" />,
    },
  ];

  return (
    <section className="relative w-full md:max-w-4xl">
      <BackgroundBlob variant="center" />

      <div className="mb-8 text-center w-full md:max-w-4xl">
         <TextareaAutoSize value={textInput} onChange={handleTextInputChange} placeholder="Untitled" className="text-center w-full resize-none appearance-none overflow-hidden bg-transparent text-4xl md:text-6xl font-polysans-bold mb-2 focus:outline-none" />
      </div>
      <div className="-mx-12 w-full md:max-w-4xl">
        <BlockNoteView className="blog-editor" editor={editor} editable={true} theme="light" onChange={handleChange} />
      </div>
      <button
        className={cn("hidden md:flex", {
          "cursor-not-allowed opacity-50": isSubmitting || !isContentChanged,
        })}
        onClick={handleSubmit}
        disabled={isSubmitting || !isContentChanged}
      >
        <div className="hidden md:flex max-w-fit fixed top-6 right-4 border border-transparent rounded-2xl z-40 ">
          <FloatingNav items={navItems} />
        </div>
      </button>
    </section>
  );
}
