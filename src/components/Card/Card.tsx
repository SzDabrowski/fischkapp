import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import editIcon from "../../assets/editIcon.svg";
import { FrontCardEdit } from "./FrontCardEdit";
import { BackCardEdit } from "./BackCardEdit";
import { CardSide } from "./CardSide";


interface FishkappCard {
  question: string;
  answer: string;
}

interface CardI {
    id: string;
    question: string;
    answer: string;
    editMode: boolean;
    updateCard: (id:string, cardSide: string, input: string) => void;
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


  const updateCard = (cardSide: string, input: string) => {
    props.updateCard(props.id, cardSide, input);
    console
    editPageClick();
  }
    
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
      
          nextPage ? (
            <CardSide
            sideName= {styles.back}
            editMode= {editMode}
            value= {fishkappObject.answer}
            changePageClick = {changePageClick}
            editPageClick = {editPageClick}
            nextPage = {nextPage}
            />
          ) : (
            <CardSide
            sideName={styles.front}
            editMode= {editMode}
            value= {fishkappObject.question}
            changePageClick = {changePageClick}
            editPageClick = {editPageClick}
            nextPage = {nextPage}
            />
          )
    ))};