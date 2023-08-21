import React, { useRef, useState } from "react";
import styles from "./Card.module.css";
import editIcon from "../../assets/editIcon.svg";
import { FrontCardEdit } from "./FrontCardEdit";
import { BackCardEdit } from "./BackCardEdit";


interface FishkappCard {
  question: string;
  answer: string;
}

interface CardI {
    id: number;
    question: string;
    answer: string;
    editMode: boolean;
    setEditMode: (value: boolean) => void;
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

  const editPageClick = () => {
    props.setEditMode(true);
    console.log(props.editMode);
  };

  return (
    <div className={styles.container}>
      {props.editMode? (
        <></>
      ) : (
        <div className={styles.corner_wrapper}>
                <button className={styles.corner_button} onClick={editPageClick}>
                    <img src={editIcon} alt="edit" />
                </button>
      </div>
      )   
    }

  <div className={styles.text_wrapper} onClick={changePageClick}>
    {nextPage ? (
      // Rendering based on nextPage condition
      props.editMode ? (
        <BackCardEdit editMode={props.editMode} setEditMode={editPageClick}/>
      ) : (
        <textarea
          readOnly
          className={styles.output}
          value={fishkappObject.answer}
          style={{ height: height + "px" }}
        />
      )
    ) : (
      // Rendering when nextPage condition is false
      props.editMode ? (
        <BackCardEdit editMode={props.editMode} setEditMode={editPageClick}/>
      ) : (
        <textarea
          readOnly
          className={styles.output}
          value={fishkappObject.question}
          style={{ height: height + "px" }}
        />
      )
    )}
  </div>

      
  </div>
  );
};