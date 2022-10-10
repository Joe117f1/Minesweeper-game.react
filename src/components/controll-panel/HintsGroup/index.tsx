import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';

import classes from './HintsGroup/Hints.module.css';

export const HintsGroup = ({ numberOfHints }: { numberOfHints: number }) => {
  const [hints, setHints] = useState<any[]>([]);
  const [hintsLeft, setHintsLeft] = useState(numberOfHints);
  // console.log('hints: ', hints);

  const getHint = (n: number) => {
    console.log('hints!! ', n);
    setHintsLeft(prevHints => prevHints - 1);
    //   if (gHints.includes(num)) return;
    //   startGame();
    //   gHints.push(num);
    //   renderHintIcon(num);
    //   const randomLocation = getRandomCell();
    //   let minesCounter = 0;
    //   for (let i = 0; i < gBoard.length; i++) {
    //       for (let j = 0; j < gBoard[0].length; j++) {
    //           if (gBoard[i][j].isMine && (!gBoard[i][j].isClicked) && (!gBoard[i][j].isFlagged)) {
    //               minesCounter++;
    //               if (minesCounter === randomLocation) {
    //                   showMine(i, j);
    //                   return;
    //               }
    //           }
    //       }
    //   }
  };

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < numberOfHints; i++) {
      const el = { id: `${Math.random()}-${i}` };
      arr.push(el);
    }
    setHints(arr);
  }, [numberOfHints]);

  return (
    <div>
      {hints.map(hint => {
        return (
          <Button key={hint.id} caption={'💡'} action={() => getHint(1)} />
        );
      })}
    </div>
  );
};
