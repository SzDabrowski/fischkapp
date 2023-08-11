import styles from "Card.module.css";
import { BigButton } from "./BigButton";
import { SmallButton} from "./SmallButton";
import { MouseEvent } from "react";


export function Card (){

    let bCardSide : boolean = true;
    //true - front
    //false - back

    

    if(bCardSide){
        return (
                <div onClick={() => {
                    bCardSide = !bCardSide;
                }}>
                    <input type="text" />
                    <BigButton colorToggle={false} onClick={function (event: MouseEvent<Element, MouseEvent>): void {
                    throw new Error("Function not implemented.");
                } }>
                        Cancel
                    </BigButton>
                    <BigButton colorToggle={true}>
                        Next
                    </BigButton>
                </div>
            )
        }
        else
        {
            return(
                <div>
                    <SmallButton/>
                    <h1></h1>
                    <input></input>

                </div>
            )
        }
    )
};