import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {NewCard} from "./components/Card/NewCard";
import {Card} from "./components/Card/Card";
import {addCardService, getCardsService} from "./services/apiService";
import React, { useState, useEffect } from "react";

import "./App.css";

interface FishkappCard {
  question: string;
  answer: string;
}

interface iCard{
  _id: number,
  face: string,
  back: string,
}

function App() {
  

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
      await addCardService(card.question, card.answer).then(data => console.log(data));
      const newCard = res.flashcard;
      
    //const res = addCardService(card.question, card.answer);
    //console.log(res);
    const newCardObject = {
      id: cardsData.length+1,
      question: card.question,
      answer: card.answer
    }

    setCardsData([...cardsData,
      { _id: newCard.id, face: newCard.question, back: newCard.answer },
    ]);

    setDisplayNewCard(false);
    } catch (error) {
      console.error("Error while adding fish Card:", error);
      throw error;
    }
  };

  const updateCards = (id: number, cardSide: string, input: string) => {
    const updateCard = cardsData.map((card) => {
      if (card._id === id) {
        return { ...card, [cardSide]: input }
      }
      return card
    })

    setCardsData(updateCard);
  };

  
    
  const deleteCard = (id: number) => {
    const cardIndex = cardsData.findIndex((card) => card._id === id);
    cardsData.splice(cardIndex, 1);
    setCardsData([...cardsData]);
  }

  useEffect(() => {
    getCardsService()
      .then((importedCardsArray) => {
        const cardsArray = importedCardsArray as iCard[];
        setCardsData(cardsArray);
        //console.log(cardsData);
      })
      .catch((error) => {
        console.error("Error fetching cards", error);
      });
  }, []);

  const renderCards = () => {

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
            id = {card._id}
            question ={card.face}
            answer = {card.back}
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
