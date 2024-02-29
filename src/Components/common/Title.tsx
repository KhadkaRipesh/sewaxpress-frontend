import { ReactNode } from 'react';
import style from './Title.module.css';

export interface TitleProps {
  title: string;
  leading?: ReactNode;
}
export function Title({ title, leading }: TitleProps) {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{title}</h1>
      {leading}
    </div>
  );
}
