import React, { PropsWithChildren } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
    /**Toggle ON returns a black button, OFF returns a white one. */
  colorToggle: boolean;
  onClick: (event: React.MouseEvent) => void;
}
export const BigButton = (props: ButtonProps) => {
  const dynamicClasses = [
    styles.button,
    props.colorToggle ? styles.black : styles.white,
  ].join(" ");

  return (
    <button className={dynamicClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
};