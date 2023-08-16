import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {NewCard} from "./components/NewCard";
import React, { useState } from "react";

import "./App.css";

interface iCard{
  id: number,
  question: string,
  answer: string,
}

function App() {
  const [editMode, setEditMode] = useState<boolean>(true);
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
    setCardList([...cardList, newCard]); // Dodajemy nowy komponent Card do listy
    console.log("added");
  };

  return (
    <AppLayout>
      <AppHeader currentCardsNumber={cardList.length} changeMode={addCard} />
      <div className="cardList_container">
       
      <NewCard editMode={editMode} setEditMode={setEditMode} />
        {cards.length > 0 && (
            {cards.map(card => (
              

              />
            ))})}
          </>

      </div>
    </AppLayout>
  );
}

export default App;
