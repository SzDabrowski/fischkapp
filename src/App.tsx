import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {NewCard} from "./components/Card/NewCard";
import {Card} from "./components/Card/Card";
import {addCardService} from "./services/apiService";
import React, { useState, useEffect } from "react";

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
  ]);

  

  const addCard = () => {
    setDisplayNewCard(true);
  };
    

  const saveCard = async ( card: FishkappCard) => {
    try {
      const res = await addCardService(card.question, card.answer);
      const newCard = res.flashcard;
    //const res = addCardService(card.question, card.answer);
    //console.log(res);
    const newCardObject = {
      id: cardsData.length+1,
      question: card.question,
      answer: card.answer
    }

    setCardsData([...cardsData,
      { id: newCard.id, question: newCard.question, answer: newCard.answer },
    ]);

    setDisplayNewCard(false);
    } catch (error) {
      console.error("Error while adding fish Card:", error);
      throw error;
    }
  };

  const updateCards = (id: number, cardSide: string, input: string) => {
    const updateCard = cardsData.map((card) => {
      if (card.id === id) {
        return { ...card, [cardSide]: input }
      }
      return card
    })

    setCardsData(updateCard);
  };
    
  const deleteCard = (id: number) => {
    const cardIndex = cardsData.findIndex((card) => card.id === id);
    cardsData.splice(cardIndex, 1);
    setCardsData([...cardsData]);
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
            updateCard={updateCards}
            />
            ))}
          </>
          )}
      </div>
    </AppLayout>
  );
}

export default App;
