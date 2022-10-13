import { useState, useEffect, useReducer } from 'react';
import { ICell } from '../../types/interfaces';
import { EIcons } from '../../types/enums';
import classes from './BoardCell.module.css';

enum EActions {
  MINE = 'mine',
  FLAGGED = 'flagged',
  CLICKED = 'clicked',
}

interface ICellState {
  isMine: boolean;
  isFlagged: boolean;
  isClicked: boolean;
}
interface IProps extends ICell {
  clickHandler: (cell: ICell) => void;
}

const reducer = (state: ICellState, action: { type: EActions }) => {
  switch (action.type) {
    case EActions.MINE:
      return { ...state, isMine: true };
    case EActions.FLAGGED:
      return { ...state, isFlagged: true };
    case EActions.CLICKED:
      return { ...state, isClicked: true };
    default:
      return { ...state, isMine: false, isFlagged: false, isClicked: false }; //TODO: change to reset function
  }
};

export const BoardCell = ({
  xCoord,
  yCoord,
  isMine,
  isFlagged,
  isClicked,
  clickHandler,
}: IProps) => {
  const cellState = { isMine, isFlagged, isClicked };
  const [cell, setCell] = useReducer(reducer, cellState);
  const [cellValue, setCellValue] = useState<EIcons | null>(null);
  const isExploded = cell.isMine && cell.isClicked;

  const onClick = () => {
    setCell({ type: EActions.CLICKED });
    clickHandler({ ...cell, isClicked: true, xCoord, yCoord });
  };

  useEffect(() => {
    let cellValue = null;

    if (isFlagged) {
      cellValue = EIcons.FLAG;
    } else if (isExploded) {
      cellValue = EIcons.EXPLOSION;
    } else if (isMine && isExploded) {
      //TODO: check logic-exposed?
      cellValue = EIcons.MINE;
    }
    setCellValue(cellValue);
  }, [cell]);

  return (
    <td
      className={cell.isClicked ? classes.clicked : classes.unClicked}
      onClick={onClick}
    >
      {cellValue}
    </td>
  );
};
