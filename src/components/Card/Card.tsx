import React, { useEffect, useRef, useState } from "react";
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
    updateCard: (id:number, cardSide: string, input: string) => void;
}

export const Card = (props: CardI) => {
    const [nextPage, setNextPage] = useState(false);
    const [editMode,setEditMode] = useState(props.editMode);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = useState<number>(60);
  
    const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
      question: props.question ? props.question : "",
      answer: props.answer ? props.answer : "",
    });

    useEffect(() => {
      setfishkappObject({question: props.question, answer: props.answer});
    },[props.question, props.answer])

  const changePageClick = () => {
    setNextPage(!nextPage);
    textareaRef.current?.focus();
  };

  const editPageClick = () => {
    setEditMode(!editMode);
  };
  
  
  return (
    editMode ? (
      nextPage ? (
        <BackCardEdit
          id = {props.id}
          updateCard={props.updateCard}
          question={fishkappObject.question} 
          editMode={editMode} 
          setEditMode={editPageClick} />
      ) : (
        <FrontCardEdit id = {props.id} editMode={editMode} 
        setEditMode={editPageClick} 
        updateCard={props.updateCard}/>
      )
    ) : (
      <div className={styles.container}>
        <div className={styles.corner_wrapper}>
          <button className={styles.corner_button} onClick={editPageClick}>
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
          ) : (
            <textarea
              readOnly
              className={styles.output}
              value={fishkappObject.question}
              style={{ height: height + "px" }}
            />
          )}
        </div>
      </div>
    ))};