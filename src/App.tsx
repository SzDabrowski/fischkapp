import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {NewCard} from "./components/NewCard";
import {Card} from "./components/Card";
import React, { useState } from "react";

import "./App.css";

interface iCard{
  id: number,
  question: string,
  answer: string,
}

function App() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cardsData, setCardsData] = useState<iCard[]>([
    {
      id: 1,
      question: "How do you write comment in JS?",
      answer:
        "its //comment",
    },
    {
      id: 2,
      question: "How do you write comment in JS?",
      answer:
        "its //comment",
    },
    {
      id: 3,
      question: "How do you write comment in JS?",
      answer:
        "its //comment",
    },
    {
      id: 4,
      question: "How do you write comment in JS?",
      answer:
        "its //comment",
    }
  ])

  const changeMode = () => {
    setEditMode(true);
  };

  const addCard = () => {
    const newCard = <NewCard editMode={editMode} setEditMode={setEditMode} />;

    console.log("added");
  };

  return (
    <AppLayout>
      <AppHeader currentCardsNumber={cardsData.length} changeMode={addCard} />
      <div className="cardList_container">
       
      <NewCard editMode={editMode} setEditMode={setEditMode} />
        {cardsData.length > 0 && (
          <>
          {cardsData.map(card => (
            <Card
            id = {card.id}
            question ={card.question}
            answer = {card.answer}
            />
            ))}
          </>
          )}
      </div>
    </AppLayout>
  );
}

export default App;
