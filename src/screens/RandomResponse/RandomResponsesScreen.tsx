import React, { useState } from 'react';

import { FAB } from 'components/FAB';
import RandomResponseFormDialog from './RandomResponseFormDialog';
import RandomResponseList from './RandomResponseList';

const RandomResponsesScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(!isOpen);

  return (
    <>
      <RandomResponseList />
      <FAB onPress={() => setIsOpen(true)} />
      {isOpen && (
        <RandomResponseFormDialog isOpen={isOpen} onClose={handleClose} />
      )}
    </>
  );
};

export default RandomResponsesScreen;
