import React, { useState } from 'react';

import CategoryFormDialog from 'screens/Category/CategoryFormDialog';
import { FAB } from 'components/FAB';
import KeywordFormDialog from './KeywordFormDialog';
import KeywordList from './KeywordList';
import { View } from 'react-native';

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
