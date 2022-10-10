import { useState, useEffect } from 'react';
import { ICell } from '../../types/interfaces';
import { EIcons } from '../../types/enums';
import classes from './BoardCell.module.css';

interface Props {
  xCoord: number;
  yCoord: number;
  isMineCell: boolean;
  isFlaggedCell: boolean;
  isClickedCell: boolean;
  clickHandler: (x: number, y: number) => void;
}

export const BoardCell = ({
  xCoord,
  yCoord,
  isMineCell,
  isFlaggedCell,
  isClickedCell,
  clickHandler,
}: Props) => {
  const [isMine, setIsMine] = useState<boolean>(false);
  const [isFlagged, setIsFlagged] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const isExploded = isMine && isClicked;
  const onClick = () => {
    clickHandler(xCoord, yCoord);
  };

  useEffect(() => {
    setIsMine(isMineCell);
  }, [isMineCell]);

  useEffect(() => {
    setIsFlagged(isFlaggedCell);
  }, [isFlaggedCell]);

  useEffect(() => {
    setIsClicked(isClickedCell);
  }, [isClickedCell]);

  useEffect(() => {
    let cellValue;
    if (isFlagged) {
      cellValue = EIcons.FLAG;
    } else if (isMine && isClicked) {
      cellValue = EIcons.EXPLOSION;
    } else if (isMine && isExploded) {
      cellValue = EIcons.MINE;
    }
  }, [isClicked, isMine, isFlagged]);

  return (
    <td
      className={isClicked ? classes.clicked : classes.unClicked}
      onClick={onClick}
    >
      {}
    </td>
  );
};
