import { useState, useEffect, useMemo } from 'react';
import { BoardCell } from './BoardCell';
import { Cell } from '../types/interfaces';

type Boardow = Cell[];
type Board = Boardow[];

interface Props {
  boardSize: number;
}

export const Board = ({ boardSize }: Props) => {
  const [gameBoard, setGameBoard] = useState<Board>([]);

  const createCell = (x: number, y: number) => {
    return {
      xCoord: x,
      yCoord: y,
      isMine: false,
      isFlagged: false,
      isClicked: false,
    };
  };

  const createBoard = useMemo(() => {
    const board: Board = [];
    for (let i = 0; i < boardSize; i++) {
      board.push([]);
      for (let j = 0; j < boardSize; j++) {
        board[i][j] = createCell(i, j);
        if (Math.random() > 0.8) {
          board[i][j].isMine = true;
        }
      }
    }
    return board;
  }, []);

  const cellClickedHandler = (i: number, j: number) => {
    console.log(`Cell clicked ${i} ${j}`);
  };

  useEffect(() => {
    setGameBoard(createBoard);
  }, [gameBoard]);

  return (
    <table>
      <tbody>
        {gameBoard.map((row, idx) => (
          <tr key={`${idx}-${Math.random().toString()}`}>
            {row.map((cell, idx) => {
              const { xCoord: x, yCoord: y } = cell;
              return (
                <BoardCell
                  key={`${idx}-${x}-${y}-${Math.random().toString()}`}
                  xCoord={x}
                  yCoord={y}
                  isMineCell={cell.isMine}
                  isFlaggedCell={cell.isFlagged}
                  isClickedCell={cell.isClicked}
                  clickHandler={cellClickedHandler}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
