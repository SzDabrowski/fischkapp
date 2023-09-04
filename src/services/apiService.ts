

interface iCard{
    id: string,
    question: string,
    answer: string,
  }

  interface ResponseCard {
    flashcard: iCard;
  }

  const url: string = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards/';


export const addCardService = async(propFront: string, propBack: string): Promise<ResponseCard> => {

    const front: string = propFront; //"What is life?";
    const back: string = propBack //"I have no idea."

    if (!url) {
        throw new Error("FISHKAPP_POST environment variable is not set.");
      }
      if (!front && !back) {
        throw new Error("Front and back are required");
      }
      if (front === "") {
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
        
              return response.json();
    } catch(error){
        throw(error);
    }
 
};

export const editCardService = async(
  id: string,
  front: string,
  back: string,):Promise<void> => {

  try{
    const response = await fetch(url+id, {
      method: 'PATCH',
      headers: {
        'Authorization': 'secret_token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id,
        front: front,
        back: back}),
      });

      console.log(response.json());
    } catch(error) {
    throw error;
  }
  
}

export const getCardsService = async<data>():Promise<data> => {

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

export const deleteCardService = async(id:string):Promise<void> => {
  try {
    const response = fetch(url+id,{
      headers: {
        Authorization: "secret_token"
      },
      method: "DELETE"
    })
  } catch (error){
    throw(error);
  }
}