import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App"; 
import { addCardService, getCardsService } from './services/apiService';
import userEvent from "@testing-library/user-event";



interface iCard{
    _id: string,
    front: string,
    back: string,
  }

const url: string = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards/';

jest.mock("./services/apiService");

const data: { flashcard: iCard } = {
  flashcard: { front: "Test Front", back: "Test Back", _id: "0000" },
};

describe("Integration Test for Adding Card", ()=> {
  const mockAddCardService = addCardService as jest.Mock;
  const mockgetCardsService = getCardsService as jest.Mock;

    it("Should add new card when all values are given", async () => {
      const cards: iCard[] = [];
      mockgetCardsService.mockResolvedValue(cards);
  
      
  
      mockAddCardService.mockResolvedValue(data);
  
      const component = render(<App/>);
  
      // Click add card button
      const addCardButton = screen.getByLabelText("addButton");
      fireEvent.click(addCardButton);
  
      // Type front value in newCard element
      const nextButton = await waitFor(() => screen.getByText("Next"));
      const frontTextInput = await waitFor(() => screen.getByRole("textbox"));
      await userEvent.type(frontTextInput, data.flashcard.front);
      expect(screen.getByText(data.flashcard.front)).toBeInTheDocument(); 
      await userEvent.click(nextButton);
  
      // Type back value in newCard element
      const saveButton = await waitFor(() => screen.getByText("Save"));
      const backTextInput = await waitFor(() => screen.getByRole("textbox"));
      
      await userEvent.type(backTextInput, data.flashcard.back);
      expect(screen.getByText(data.flashcard.back)).toBeInTheDocument(); 
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(data.flashcard.front)).toBeInTheDocument(); 
      });
    });

    it("Should not be able to add new card when front value is not given", async () => {
      const cards: iCard[] = [];
      mockgetCardsService.mockResolvedValue(cards);
  
      render(<App/>);
  
      // Click add card button
      const addCardButton = screen.getByLabelText("addButton");
      fireEvent.click(addCardButton);
  
      // Skip front value in newCard element
      const nextButton = await waitFor(() => screen.getByText("Next"));
      await userEvent.click(nextButton);

      //screen.debug(document);

      await waitFor(() =>
      expect(screen.getByText("Front text is required")).toBeInTheDocument()
    );
    });

    it("Should not be able to add new card when back value is not given", async () => {
      const cards: iCard[] = [];
      mockgetCardsService.mockResolvedValue(cards);
  
      render(<App />);

       // Click add card button
       const addCardButton = screen.getByLabelText("addButton");
       fireEvent.click(addCardButton);
  
  
       // Skip front value in newCard element
       const nextButton = await waitFor(() => screen.getByText("Next"));
        const frontTextInput = await waitFor(() => screen.getByRole("textbox"));
        await userEvent.type(frontTextInput, data.flashcard.front);
        expect(screen.getByText(data.flashcard.front)).toBeInTheDocument(); 
        await userEvent.click(nextButton);
  

       // Type back value in newCard element
       const saveButton = await waitFor(() => screen.getByText("Save"));
       await userEvent.click(saveButton);


       await waitFor(() =>
      expect(screen.getByText("Back text is required")).toBeInTheDocument()
    );
    });
    
});