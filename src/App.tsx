import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import {Card} from "./components/Card";

import "./App.css";
import React from "react";

function App() {
  return (
    <AppLayout>
      <AppHeader cardsNumber = {1}/>
    </AppLayout>
  );
}

export default App;
