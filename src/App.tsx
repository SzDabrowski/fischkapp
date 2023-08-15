import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {NewCard} from "./components/NewCard";
import React, { useState } from "react";

import "./App.css";

function App() {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [cardList, setCardList] = useState<JSX.Element[]>([]); 

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
      <AppHeader CurrentCardsNumber={cardList.length} changeMode={addCard} />
      <div className="cardList_container">
        {editMode ? cardList : null}
      </div>
    </AppLayout>
  );
}

export default App;
