import React, { useState } from 'react';
import classes from './GameHeader.module.css';

enum eTexts {
  TIME = 'Your Time:',
  SCORE = 'Best score:',
}

export const GameLine = ({
  text,
  time,
}: {
  text: string;
  time: number | string;
}) => {
  return (
    <div className={classes.panelLine}>
      <span>{text}</span>
      <span className={classes.time}>{time}</span>
    </div>
  );
};

export const GameHeader = () => {
  const [time, setTime] = useState(0);
  const [bestScore, setBestScore] = useState<string | number>('N/A');

  return (
    <div className={classes.panel}>
        <GameLine text={eTexts.TIME} time={time} />
        <GameLine text={eTexts.SCORE} time={bestScore} />
    </div>
  );
};
