import React, { useState } from 'react';

import { FAB } from 'components/FAB';
import KeywordFormDialog from './KeywordFormDialog';
import KeywordList from './KeywordList';

const KeywordScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(!isOpen);

  return (
    <>
      <KeywordList />
      <FAB onPress={() => setIsOpen(true)} />
      {isOpen && <KeywordFormDialog isOpen={isOpen} onClose={handleClose} />}
    </>
  );
};

export default KeywordScreen;
