import React, { useRef, useState } from "react";
import styles from "./Card.module.css";
import editIcon from "../assets/editIcon.svg";


interface FishkappCard {
  question: string;
  answer: string;
}

interface CardI {
    id: number;
    question: string;
    answer: string;
}

export const Card = (props: CardI) => {
    const [nextPage, setNextPage] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = useState<number>(60);
  
    const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
      question: props.question ? props.question : "",
      answer: props.answer ? props.answer : "",
    });


  const changePageClick = () => {
    setNextPage(!nextPage);
    textareaRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <div className={styles.corner_wrapper}>
                <button className={styles.corner_button}>
                    <img src={editIcon} alt="edit" />
                </button>
      </div>

      <div className={styles.text_wrapper} onClick={changePageClick}>
        {nextPage ? (
            <textarea
            readOnly
            className={styles.output}
            value={fishkappObject.answer}
            style={{ height: height + "px" }}
            />
        ):
        (
            <textarea
            readOnly
            className={styles.output}
            value={fishkappObject.question}
            style={{ height: height + "px" }}
            />
        )}
      </div>
    </div>
  );
};