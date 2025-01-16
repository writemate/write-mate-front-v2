import { createContext, useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { fontSize, font } from "@/components/workspace/script/Toolbar";

export function useScript() {
  const editorRef = useRef<ReactQuill | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("");
  const handleChange = (content: string) => {
    setValue(content);
  };

  const getCursorMetrics = useCallback(() => {
    if (!editorRef.current)
      return { distanceFromTop: 0, lineHeight: 0, hasFocus: false };
    const quill = editorRef.current.getEditor();
    let distanceFromTop = 0;
    let lineHeight = 0;

    const hasFocus = quill.hasFocus();
    if (hasFocus) {
      const range = quill.getSelection();
      if (range) {
        const bounds = quill.getBounds(range.index);
        const editorContainer = document.querySelector(
          ".ql-editor"
        ) as HTMLElement;
        if (editorContainer) {
          const lineElement = editorContainer.querySelector(
            `p span[data-line-index="${range.index}"]`
          ) as HTMLElement;
          if (bounds) {
            distanceFromTop = bounds.top;
            lineHeight = lineElement ? lineElement.offsetHeight : bounds.height;
          }
        }
      }
    }
    return { distanceFromTop, lineHeight, hasFocus };
  }, [editorRef]);

  const editorContainerPaddingTop = useCallback(() => {
    if (containerRef.current) {
      return parseFloat(
        window.getComputedStyle(containerRef.current).paddingTop
      );
    }
    return 0;
  }, [containerRef]);

  const handleAutoScroll = useCallback(() => {
    if (!mainRef.current) return;

    const container = mainRef.current;
    const CursorMetrics = getCursorMetrics();

    const currentLine =
      50 +
      editorContainerPaddingTop() +
      12 +
      CursorMetrics.distanceFromTop +
      CursorMetrics.lineHeight;

    const autoScrollStartThreshold =
      container.scrollTop +
      container.clientHeight -
      editorContainerPaddingTop() * 0.7;

    const isOverflow = currentLine >= autoScrollStartThreshold;

    const targetAutoScrollTop =
      currentLine + editorContainerPaddingTop() * 0.7 - container.clientHeight;

    if (isOverflow) {
      container.scrollTo(0, targetAutoScrollTop);
    }
  }, [mainRef, getCursorMetrics, editorContainerPaddingTop]);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!editorRef.current) return;
      const quillEditor = editorRef.current.getEditor().root;
      if (quillEditor && quillEditor.contains(event.target as Node)) {
        return;
      } else {
        event.preventDefault();
      }
    },
    [editorRef]
  );

  const [cursorPositionAfterPaste, setCursorPositionAfterPaste] = useState<
    number | null
  >(null);

  const handleEditorChange = useCallback(
    (quill: any) =>
      (eventName: string, ...args: any[]) => {
        if (eventName === "selection-change") {
          if (cursorPositionAfterPaste !== null) {
            quill.setSelection(cursorPositionAfterPaste);
            setCursorPositionAfterPaste(null);
          }
          handleAutoScroll();
          return;
        }
        if (eventName === "text-change" && args[0]?.ops) {
          if (args[0].ops.length !== 2) return;
          const retain = args[0].ops[0]?.retain;
          if (retain === undefined) return;
          const insert = args[0].ops[1]?.insert;
          if (insert === undefined) return;
          if (typeof insert !== "string" || insert.length < 2) return;
          setCursorPositionAfterPaste(retain + insert.length);
        }
      },
    [cursorPositionAfterPaste, handleAutoScroll]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseDown]);

  useEffect(() => {
    if (!editorRef.current) return;
    const quill = editorRef.current.getEditor();
    const handler = handleEditorChange(quill);
    quill.on("editor-change", handler);
    return () => {
      quill.off("editor-change", handler);
    };
  }, [editorRef, handleEditorChange]);

  useEffect(() => {
    const Font = ReactQuill.Quill.import("formats/font") as any;
    Font.whitelist = font;
    ReactQuill.Quill.register(Font, true);

    const fontSizeStyle = ReactQuill.Quill.import(
      "attributors/style/size"
    ) as any;
    fontSizeStyle.whitelist = fontSize;
    ReactQuill.Quill.register(fontSizeStyle, true);
  }, []);

  return {
    editorRef,
    mainRef,
    containerRef,
    value,
    handleChange,
    getCursorMetrics,
    editorContainerPaddingTop,
    handleAutoScroll,
    handleMouseDown,
  };
}

export const ScriptContext = createContext({} as ReturnType<typeof useScript>);
