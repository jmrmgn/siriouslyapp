import React, { useState } from 'react';

import CategoryFormDialog2 from './CategoryFormDialog2';
import CategoryList from './CategoryList';
import { FAB } from 'components/FAB';

const CategoriesScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(!isOpen);

  return (
    <>
      <CategoryList />
      <FAB onPress={() => setIsOpen(true)} />
      {isOpen && <CategoryFormDialog2 isOpen={isOpen} onClose={handleClose} />}
    </>
  );
};

export default CategoriesScreen;
