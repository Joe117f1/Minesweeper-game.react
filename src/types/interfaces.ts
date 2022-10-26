export enum EActions {
  MINE = 'mine',
  FLAGGED = 'flagged',
  CLICKED = 'clicked',
} //TODO: move to enums

export interface CellState {
  id?: string;
  xCoord: number;
  yCoord: number;
  isMine: boolean;
  isFlagged: boolean;
  isClicked: boolean;
  value: any; //TODO: fix any type, fix duplication with ICell
}

export interface Cell {
  id?: string;
  xCoord: number;
  yCoord: number;
  isMine: boolean;
  isFlagged: boolean;
  isClicked: boolean;
  value: any;
  cellReducer?: (
    state: CellState,
    action: { type: EActions; id: string }
  ) => CellState;
}
