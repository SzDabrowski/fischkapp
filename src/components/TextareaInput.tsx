import React, { LegacyRef, useRef, useEffect } from "react";
import styles from "./TextareaInput.module.css";
interface InputArea {
  fishkappObject: { answer: string; question: string };
  nextPage: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaInput = React.forwardRef(
  (props: InputArea, ref: LegacyRef<HTMLTextAreaElement>) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const setCursorAtEnd = () => {
  
      if (textareaRef.current) {
        const textLength = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(textLength, textLength);
      }
    };

    const setHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    useEffect(() => {
      setCursorAtEnd();
    }, []);

    useEffect(() => {
      textareaRef.current?.focus();
      setHeight();
    }, [props.nextPage]);

    useEffect(() => {
      textareaRef.current?.focus();
      setHeight();
    }, [props.fishkappObject]);

    return (
      <textarea
        ref={textareaRef}
        className={styles.input_text}
        rows={1}
        value={
          props.nextPage
            ? props.fishkappObject.answer
            : props.fishkappObject.question
        }
        onChange={props.handleInputChange}
        autoFocus={true}
      />
    );
  }
);