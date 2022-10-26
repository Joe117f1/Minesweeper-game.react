import {
  useState,
  useEffect,
  useMemo,
  useReducer,
  memo,
  useRef,
  ReactNode,
} from 'react';
import { BoardCell } from './BoardCell';
import { Cell, CellState, EActions } from '../../types/interfaces';
import { EIcons } from '../../types/enums';
import classes from './Board.module.css';

enum ECellsActions {
  COUNT_MINES = 'count-mines',
  REVEAL_NEIGHBORS = 'reveal-neighbors',
}

type Boardow = Cell[];
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

const boardReducer = (
  state: Board,
  action: { type: string; board?: Board; cell?: Cell }
) => {
  // let newBoard;
  if (action.cell) {
    // console.log('cell in reducer: ', action.cell);

    // const newBoardHelper = state;
    // newBoardHelper[action.cell.xCoord][action.cell.yCoord] = action.cell;
    // newBoard = newBoardHelper;
    state[action.cell.xCoord][action.cell.yCoord] = action.cell;
  }
  const actions = {
    updateCell: action.cell && [...state], //state,
    board: action.board && [...action.board],
    default: null, //TODO: change to reset function
  };

  //@ts-ignore
  return actions[action.type] as Board;
};

const cellReducer = (
  state: CellState,
  action: { type: EActions; id: string }
) => {
  console.count('reducer run');
  if (state.id !== action.id) return state;
  const actions = {
    clicked: { ...state, isClicked: true },
    flagged: { ...state, isFlagged: true },
    mine: { ...state, isMine: true },
    default: { ...state, isMine: false, isFlagged: false, isClicked: false }, //TODO: change to reset function
  };

  return actions[action.type];
};

const createCell = (x: number, y: number): Cell => {
  return {
    id: `${x}-${y}`,
    xCoord: x,
    yCoord: y,
    isMine: false,
    isFlagged: false,
    isClicked: false,
    value: null,
    cellReducer,
  };
};

export const Board = memo(({ boardSize }: IProps) => {

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
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const currCell = board[i][j];
        if (currCell.isMine) {
          currCell.value = EIcons.EXPLOSION;
        } else {
          const v = assignValueOfNeigborMines(i, j, board);
          currCell.value = v;
        }
      }
    }
    return board;
  }, [boardSize]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  // const [gameBoard, setGameBoard] = useReducer(boardReducer, createBoard);
  const [gameBoard, setGameBoard] = useState<Board>(createBoard);

  const cellClickedHandler = (cell: Cell, v?: any) => {
    try {
      const { xCoord, yCoord } = cell;
      gameBoard[xCoord][yCoord].isClicked = true;
      // v && (gameBoard[xCoord][yCoord].value = v);

      isFirstClick && firstClickHandler(cell);
      console.log('cellClickedHandler: ', cell);
      if (v) {
        console.log('+++ C L I C K  B Y  F U N C +++');
        const id = `${cell.xCoord}-${cell.yCoord}`;
        console.log('cell id: ', id);
      }
      // startGame();
      // getSmiely(IN_GAME_EMOJI);
      exposeCell(cell);
      // checkForWin(gBoard);
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  };

  const firstClickHandler = (cell: Cell) => {
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

  const exposeCell = (cell: Cell) => {
    if (cell.isMine) {
      console.log('MINE! ', cell);
      // updateLivesAndGameStatus(i, j);
      // renderCell(i, j, EXPLODED)
      return;
    } else {
      workOnNeigborCells(cell);
    }
  };

  const workOnNeigborCells = (cell: Cell) => {
    const { xCoord: i, yCoord: j, value } = cell;
    // const neighborMines = neighborCellsActionsHandler(
    //   i,
    //   j,
    //   gameBoard,
    //   ECellsActions.COUNT_MINES
    // );
    if (value > 0) {
      renderCell(cell, value);
    } else {
      renderCell(cell, null);
      neighborCellsActionsHandler(
        i,
        j,
        gameBoard,
        ECellsActions.REVEAL_NEIGHBORS
      );
    }
    // !neighborMines ? renderCell(cell, null) : renderCell(cell, neighborMines);
    // if (!neighborMines) {
    //   neighborCellsActionsHandler(
    //     i,
    //     j,
    //     gameBoard,
    //     ECellsActions.REVEAL_NEIGHBORS
    //   );
    // }

    // if (neighborMine) gRecursiveLoop = 0;
  };

  const neighborCellsActionsHandler = (
    xCoord: number,
    yCoord: number,
    board: Board,
    request: ECellsActions
  ) => {
    const BOARD_LENGTH = board.length;
    let minesCounter = 0;
    for (let i = xCoord - 1; i <= xCoord + 1; i++) {
      if (i < 0 || i >= BOARD_LENGTH) continue;
      for (let j = yCoord - 1; j <= yCoord + 1; j++) {
        if (i === xCoord && j === yCoord) continue;
        // if (j < 0 || j >= board[i].length) continue;
        if (j < 0 || j >= BOARD_LENGTH) continue;
        const currCell = board[i][j];

        if (currCell.isMine) minesCounter++;
        if (currCell.isFlagged) continue;
        if (currCell.isClicked) continue;
        if (request === ECellsActions.REVEAL_NEIGHBORS) {
          const val = currCell.value;
          // const val = neighborCellsActionsHandler(
          //   i,
          //   j,
          //   board,
          //   ECellsActions.COUNT_MINES
          // );
          renderCell(currCell, val);
          if (!val) {
            cellClickedHandler(currCell, true);
          }
        }
      }
    }
    if (request === ECellsActions.COUNT_MINES) {
      return minesCounter;
    }
  };

  // const renderCell = (cell: ICell, value: EIcons | null) => {
  const renderCell = (cell: Cell, value: any) => {
    // if (cell.isClicked) return;

    if (value !== EIcons.FLAG) {
      cell.isClicked = true;
    }
    const currCell = gameBoard[cell.xCoord][cell.yCoord];
    console.log('value in  render: ', value);
    currCell.value = value;
    // setGameBoard({ type: 'updateCell', cell: currCell });
    setGameBoard(prevBoard => {
      prevBoard[cell.xCoord][cell.yCoord] = currCell;
      return [...prevBoard];
      // return prevBoard;
    });
  };

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
                    value={cell.value}
                    clickHandler={cellClickedHandler}
                    cellReducer={cellReducer}
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
