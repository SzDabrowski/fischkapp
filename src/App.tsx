import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {NewCard} from "./components/Card/NewCard";
import {Card} from "./components/Card/Card";
import React, { useState } from "react";

import "./App.css";

interface FishkappCard {
  question: string;
  answer: string;
}

interface iCard{
  id: number,
  question: string,
  answer: string,
}

function App() {
  const [displayNewCard, setDisplayNewCard] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cardsData, setCardsData] = useState<iCard[]>([
    {
      id: 1,
      question: "1:How do you write comment in JS?",
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

  

  const addCard = () => {
    setDisplayNewCard(true);
  };

  const saveCard = ( card: FishkappCard) => {
    const newCardObject = {
      id: cardsData.length+1,
      question: card.question,
      answer: card.answer
    }

    setCardsData([...cardsData, newCardObject]);
    setDisplayNewCard(false);
  };

  const updateCard = (id: number, cardSide: string, input: string) => {
    const updateCard = cardsData.map((card) => {
      if (card.id === id) {
        return { ...card, cardSide: input }
      }
      return card
    });
    
    setCardsData(updateCard);
    }

  return (
    <AppLayout>
      <AppHeader currentCardsNumber={cardsData.length} addCard={addCard} />

      <div className="cardList_container">
       
       {displayNewCard ? (
        <NewCard  

        deleteNewCard={() => {setDisplayNewCard(false)}} 
        saveNewCard={saveCard} />
       ):(<></>)}
      
        {cardsData.length > 0 && (
          <>
          {cardsData.map(card => (
            <Card
            id = {card.id}
            question ={card.question}
            answer = {card.answer}
            editMode={false}
            updateCard={updateCard}
            />
            ))}
          </>
          )}
      </div>
    </AppLayout>
  );
}

export default App;
