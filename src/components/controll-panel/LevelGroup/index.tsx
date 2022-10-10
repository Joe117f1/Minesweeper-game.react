import React from 'react';
import { Button } from '../../ui/Button';

// import classes from './LevelGroup.module.css';

export const LevelGroup = () => {
  const chooseLvl = (n: number) => {
    console.log('n: ', n);
  };
  return (
    <div>
      <Button action={() => chooseLvl(4)} caption={'Begginer'} />
      <Button action={() => chooseLvl(8)} caption={'Intermediate'} />
      <Button action={() => chooseLvl(12)} caption={'Pro'} />
    </div>
  );
};