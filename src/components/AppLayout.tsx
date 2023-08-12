import React, { ReactNode } from 'react';
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = (props: AppLayoutProps) => (
  <div className={styles.layout}>{props.children}</div>
);
