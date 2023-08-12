import React, { LegacyRef, useEffect, useState } from "react";
import styles from "./TextareaInput.module.css";
interface InputArea {
  fishkappObject: { answer: string; question: string };
  nextPage: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaInput = React.forwardRef(
  (props: InputArea, ref: LegacyRef<HTMLTextAreaElement>) => {
    return (
      <textarea
        className={styles.input_text}
        value={
          props.nextPage
            ? props.fishkappObject.answer
            : props.fishkappObject.question
        }
        onChange={props.handleInputChange}
        ref={ref}
        autoFocus={true}
      />
    );
  }
);