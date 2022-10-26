import { useState, useEffect, useMemo, memo } from 'react';
import { BoardCell } from './BoardCell';
import { ICell } from '../../types/interfaces';
import { EIcons } from '../../types/enums';
import classes from './Board.module.css';

type Boardow = ICell[];
type Board = Boardow[];

interface IProps {
  boardSize: number;
}

const assignValueOfNeigborMines = (
  xCoord: number,
  yCoord: number,
  board: Board
) => {
  let minesCounter = 0;
  for (let i = xCoord - 1; i <= xCoord + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (let j = yCoord - 1; j <= yCoord + 1; j++) {
      if (i === xCoord && j === yCoord) continue;
      if (j < 0 || j >= board[i].length) continue;
      const currCell = board[i][j];

      if (currCell.isMine) minesCounter++;
    }
  }
  // if (request === ECellsActions.COUNT_MINES) {
  //   return minesCounter;
  // }
  return minesCounter;
};
  return {
    xCoord: x,
    yCoord: y,
    isMine: false,
    isFlagged: false,
    isClicked: false,
  };
};

export const Board = memo(({ boardSize }: IProps) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [gameBoard, setGameBoard] = useState<Board>([]);

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

  const cellClickedHandler = (cell: ICell) => {
    try {
      const { xCoord, yCoord } = cell;
      gameBoard[xCoord][yCoord].isClicked = true;

      isFirstClick && firstClickHandler(cell);
      console.log('cellClickedHandler: ', cell);

      // startGame();
      // getSmiely(IN_GAME_EMOJI);
      exposeCell(cell);
      // checkForWin(gBoard);
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  };

  const firstClickHandler = (cell: ICell) => {
    setIsGameActive(true);
    // if (!isGameActive || gameBoard[i][j].isFlagged) {
    if (cell.isFlagged) {
      // throw new Error('Cannot click on flags OR while game is over');
    }

    if (isFirstClick) {
      if (cell.isMine) {
        console.log('cell.isMine: ', cell.isMine);
        // restart();
        // cellClickedHandler(cell); //infinite loop, need toreset the board
        throw new Error('First click was a mine!');
      }
      setIsFirstClick(false);
    }
  };

  const exposeCell = (cell: ICell) => {
    if (cell.isMine) {
      console.log('MINE! ', cell);
      // updateLivesAndGameStatus(i, j);
      // renderCell(i, j, EXPLODED)
      return;
    } else {
      // workOnNeigborCells(i, j);
    }
  };

  const renderCell = (cell: ICell, value: EIcons) => {
    if (cell.isClicked) return;

    if (value !== EIcons.FLAG && value !== null) {
      cell.isClicked = true;
      // removeAndAddClass(cellElement, 'unClicked', 'clicked');
    }
    // updateCellHtmlContent(cellElement, value);
  };

  useEffect(() => {
    setGameBoard(createBoard);
  }, [boardSize]);
  console.count('+ + +  board run + + +');
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
                    key={`${idx}-${x}-${y}`}
                    xCoord={x}
                    yCoord={y}
                    isMine={cell.isMine}
                    isFlagged={cell.isFlagged}
                    isClicked={cell.isClicked}
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
});
