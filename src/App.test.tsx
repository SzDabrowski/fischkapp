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

const mockAddCardService = addCardService as jest.Mock;
const mockGetCardsService = getCardsService as jest.Mock;

describe("Integration Test for Adding Card", ()=> {

  const cardTest: { flashcard: iCard } = {
    flashcard: { front: "Test Front", back: "Test Back", _id: "0000" },
  };

    it("Should add new card when all values are given", async () => {
      const cards: iCard[] = [];
      mockGetCardsService.mockResolvedValue(cards);
  
      
  
      mockAddCardService.mockResolvedValue(cardTest);
  
      const component = render(<App/>);
  
      // Click add card button
      const addCardButton = screen.getByLabelText("addButton");
      fireEvent.click(addCardButton);
  
      // Type front value in newCard element
      const nextButton = await waitFor(() => screen.getByText("Next"));
      const frontTextInput = await waitFor(() => screen.getByRole("textbox"));
      await userEvent.type(frontTextInput, cardTest.flashcard.front);
      expect(screen.getByText(cardTest.flashcard.front)).toBeInTheDocument(); 
      await userEvent.click(nextButton);
  
      // Type back value in newCard element
      const saveButton = await waitFor(() => screen.getByText("Save"));
      const backTextInput = await waitFor(() => screen.getByRole("textbox"));
      
      await userEvent.type(backTextInput, cardTest.flashcard.back);
      expect(screen.getByText(cardTest.flashcard.back)).toBeInTheDocument(); 
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(cardTest.flashcard.front)).toBeInTheDocument(); 
      });
    });

    it("Should not be able to add new card when front value is not given", async () => {
      const cards: iCard[] = [];
      mockGetCardsService.mockResolvedValue(cardTest);
  
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
      mockGetCardsService.mockResolvedValue(cards);
  
      render(<App />);

       // Click add card button
       const addCardButton = screen.getByLabelText("addButton");
       fireEvent.click(addCardButton);
  
  
       // Skip front value in newCard element
       const nextButton = await waitFor(() => screen.getByText("Next"));
        const frontTextInput = await waitFor(() => screen.getByRole("textbox"));
        await userEvent.type(frontTextInput, cardTest.flashcard.front);
        expect(screen.getByText(cardTest.flashcard.front)).toBeInTheDocument(); 
        await userEvent.click(nextButton);
  

       // Type back value in newCard element
       const saveButton = await waitFor(() => screen.getByText("Save"));
       await userEvent.click(saveButton);


       await waitFor(() =>
      expect(screen.getByText("Back text is required")).toBeInTheDocument()
    );
    });
});


describe("Integration Test for editing flashcard", () => {

  const cards: iCard[] = [
    { front: "front1", back: "back1", _id: "123" },
  ];

  it("Should be able edit flashcard when the text value is given ", async () => {

    const editedValue:string = "edited Front";

    render(<App />);

    mockGetCardsService.mockResolvedValue(cards);
    

    //go to card edit mode
    const editButton = await waitFor(() => screen.getByLabelText("editBtn"));

    await userEvent.click(editButton);

    //find input field and type new value 
    const textInput = await waitFor(() => screen.getByRole("textbox")); 
    await userEvent.type(textInput, editedValue);
    
    //save new value
    const saveBtn = await waitFor(() => screen.getByText("Save"));
    await userEvent.click(saveBtn);

    await waitFor(() => {
      setTimeout(()=>{
        expect(screen.getByText("edited Front")).toBeInTheDocument();
      }, 100);
    });
  });

  it("Should not be possible to change value of flashcard when new value is empty", async () => {
    const editedValue:string = "edited Front";

    render(<App />);
    mockGetCardsService.mockResolvedValue(cards);


    //go to card edit mode
    const editButton = await waitFor(() => screen.getByLabelText("editBtn"));

    await userEvent.click(editButton);
    
    //save new value
    const saveBtn = await waitFor(() => screen.getByText("Save"));
    await userEvent.click(saveBtn);

    const errorText = await waitFor(() =>
      screen.getByText("New text value is required"),
    );

    await waitFor(()=>{
      expect(errorText).toBeInTheDocument();
    })
    
  });

  it("Should exit editing mode when clicking cancel button", async () => {
    
    const editedValue:string = "edited Front";

    render(<App />);

    mockGetCardsService.mockResolvedValue(cards);
    

    //go to card edit mode
    const editButton = await waitFor(() => screen.getByLabelText("editBtn"));

    await userEvent.click(editButton);
    
    //save new value
    const cancelBtn = await waitFor(() => screen.getByText("Cancel"));
    await userEvent.click(cancelBtn);

    await waitFor(()=>{
      expect(cancelBtn).not.toBeInTheDocument();
    })
  });

});