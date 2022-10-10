import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { HintsGroup } from './HintsGroup';
import { LevelGroup } from './LevelGroup';

import classes from './ControllPanel.module.css';

export const SmeilyStatus = () => {
  return (
    <div>😃</div>
  );
};

export const ControllPanel = () => {

  return (
    <div className={classes.panel}>
      <SmeilyStatus/>
      <HintsGroup numberOfHints={3} />
      <LevelGroup />

      {/* <Button cssClass='safe-step' onClick={safeStep()}/> */}
      <Button
        caption={'3 safe Step'}
        action={() => console.log('safe step func')}
        // cssClass='safe-step'
      />
    </div>
  );
};
