import { useState, useEffect, useMemo } from 'react';
import { BoardCell } from './BoardCell';
import { Cell } from '../../types/interfaces';
import classes from './Board.module.css';

type Boardow = Cell[];
type Board = Boardow[];

interface Props {
  boardSize: number;
}

export const Board = ({ boardSize }: Props) => {
  const [isGameActive, setIsGameActive] = useState(false);
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

  const firstClickHandler = (cellElement:any, i: number, j: number) => {
    const cell = gameBoard[i][j];
    if (!isGameActive || gameBoard[i][j].isFlagged) {
        throw new Error('Cannot click on flags OR while game is over');
    }

    if (!isGameActive) {
        if (cell.isMine) {
            // restart();
            // cellClickedHandler(cellElement, i, j);
            throw new Error('First click was a mine!')
        }
    }
    return cell;
};

  const cellClickedHandler = (i: number, j: number) => {
    console.log(i,j);
  };
//   const cellClickedHandler = (cellElement:any, i: number, j: number) => {
//     let cell;
//     try {
//         cell = firstClickHandler(i, j, cellElement);
//     } catch (error:any) {
//         console.log(error.message);
//         return;
//     }
//     // startGame();
//     // getSmiely(IN_GAME_EMOJI);
//     // exposeCell(cell, i, j);
//     // checkForWin(gBoard);
// };

  useEffect(() => {
    setGameBoard(createBoard);
  }, [gameBoard]);

  return (
    <div className={classes.board}>
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
    </div>
  );
};
