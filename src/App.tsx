import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {NewCard} from "./components/Card/NewCard";
import {Card} from "./components/Card/Card";
import {addCardService, getCardsService, editCardService, deleteCardService} from "./services/apiService";
import React, { useState, useEffect } from "react";


import "./App.css";

interface FishkappCard {
  question: string;
  answer: string;
}

interface iCard{
  _id: string,
  front: string,
  back: string,
}

export function App() {
  const [displayNewCard, setDisplayNewCard] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cardsData, setCardsData] = useState<iCard[]>([]);

  const addCard = () => {
    setDisplayNewCard(true);
  };

  const saveCard = async ( card: FishkappCard) => {
    setDisplayNewCard(false);
    try {
      const res = await addCardService(card.question, card.answer);
      const newCard = res.flashcard;
      

    setCardsData([...cardsData,
      { _id: newCard.id, front: newCard.question, back: newCard.answer },
    ]);

    setDisplayNewCard(false);
    } catch (error) {
      console.error("Error while adding fish Card:", error);
      throw error;
    }
  };

  const renderCards = () => {
    getCardsService()
      .then((importedCardsArray) => {
        const cardsArray = importedCardsArray as iCard[];
        setCardsData(cardsArray);
      })
      .catch((error) => {
        console.error("Error fetching cards", error);
      });
  }

  const updateCards = (id: string, cardSide: string, input: string) => {
    const updateCard = () => {
      for (const card of cardsData){
        if (card._id === id) {
          return { ...card, [cardSide]: input }
        }
      } 
    }
    const card = updateCard()
    editCardService(String(card?._id), String(card?.front), String(card?.back));
    renderCards();
  };

  
  const deleteCard = (id: string) => {
    deleteCardService(id);
    renderCards();
  }

  useEffect(() => {
    renderCards();
  }, []);

  useEffect(() => {
    renderCards();
  }, [cardsData]);

  return (
    <AppLayout>
      <AppHeader 
      currentCardsNumber={cardsData.length + (displayNewCard? 1 : 0)} 
      addCard={addCard} />

      <div  className="cardList_container">
       
       {displayNewCard ? (
        <NewCard  

        deleteNewCard={() => {setDisplayNewCard(false)}} 
        saveNewCard={saveCard} />
        ):(<></>)}
      
        {cardsData.length > 0 && (
          <>
          {cardsData.map(card => (
            <Card
            
            id = {card._id}
            question ={card.front}
            answer = {card.back}
            editMode={false}
            updateCard={updateCards}
            deleteCard={deleteCard}
            />
            ))}
          </>
          )}
      </div>
    </AppLayout>
  );
}

export default App;
