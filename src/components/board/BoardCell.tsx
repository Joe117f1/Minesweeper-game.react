import { useState, useEffect, useReducer, memo } from 'react';
import { Cell, CellState, EActions } from '../../types/interfaces';
import { EIcons } from '../../types/enums';
import classes from './BoardCell.module.css';

interface Props extends Cell {
  clickHandler: (cell: Cell) => void;
}

const reducer = (state: CellState, action: { type: EActions; id: string }) => {
  const actions = {
    clicked: { ...state, isClicked: true },
    flagged: { ...state, isFlagged: true },
    mine: { ...state, isMine: true },
    default: { ...state, isMine: false, isFlagged: false, isClicked: false }, //TODO: change to reset function
  };

  return actions[action.type];
};

export const BoardCell = memo(
  ({
    // id,
    xCoord,
    yCoord,
    isMine,
    isFlagged,
    isClicked,
    value,
    clickHandler,
    cellReducer,
  }: Props) => {
    // console.count('--- cell run --- ');
    const cellState: CellState = {
      isMine,
      isFlagged,
      isClicked,
      value,
      xCoord,
      yCoord,
    };
    const [cell, setCell] = useReducer(reducer, cellState);
    const [cellValue, setCellValue] = useState<EIcons | null>(null);
    const [click, setClick] = useState(false);
    // const isExploded = cell.isMine && cell.isClicked;
    const isExploded = isMine && isClicked;

    const onClick = () => {
      setCell({ type: EActions.CLICKED, id: `${xCoord}-${yCoord}` });
      clickHandler({ ...cellState, xCoord, yCoord });
    };

    useEffect(() => {
      let cellValue = value;
      const { isFlagged, isMine } = cellState;
      if (isFlagged) {
        cellValue = EIcons.FLAG;
      } else if (isExploded) {
        cellValue = EIcons.EXPLOSION;
      } else if (isMine && isExploded) {
        //TODO: check logic-exposed?
        cellValue = EIcons.MINE;
      }
      setCellValue(cellValue);
    }, [cellState, cellValue]);

    return (
      <td
        className={cell.isClicked ? classes.clicked : classes.unClicked}
        // className={click ? classes.clicked : classes.unClicked}
        onClick={onClick}
      >
        {cellValue === EIcons.FLAG ? cellValue : (cell.isClicked && cellValue)}
        {/* {cellValue === EIcons.FLAG ? cellValue : click && cellValue} */}
      </td>
    );
  }
);
