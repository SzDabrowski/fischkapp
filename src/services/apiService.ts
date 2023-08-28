interface iCard{
    id: number,
    question: string,
    answer: string,
  }

  interface ResponseCard {
    flashcard: iCard;
  }

export const addCardService = async(question: string, answer: string): Promise<ResponseCard> => {

    const url: string = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards';

    const front: string = question; //"What is life?";
    const back: string = answer //"I have no idea."

    if (!url) {
        throw new Error("FISHKAPP_POST environment variable is not set.");
      }
      if (!front && !back) {
        throw new Error("Front and back are required");
      }
      if (!front) {
        throw new Error("Front is required");
      }
      if (!back) {
        throw new Error("Back is required");
      }

    try{
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Authorization': 'secret_token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                front: front,
                 back: back}),
            });
        
            if (!response.ok) {
                throw new Error("Failed to upload FishCard");
              }
              const res = response.json();
        
              return response.json();
    } catch(error){
        throw(error);
    }
 
};


export const getCardsService = async<data>():Promise<data> => {
  const url: string = "https://training.nerdbord.io/api/v1/fischkapp/flashcards"

  try {
    const response = await fetch(url, {});

    if (!response.ok){
      throw new Error("reponse was not okey");
    }
    return (await response.json()) as data;

  } catch (error){
    throw(error);
  }

}