import { Dialog, Portal } from 'react-native-paper';

import React from 'react';
import { StyleSheet } from 'react-native';

interface IFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const FormDialog = (props: IFormDialogProps) => {
  const { isOpen, onClose, title, children, actions } = props;

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
        <Dialog.Actions style={styles.formActions}>{actions}</Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  formActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between'
  }
});

export default FormDialog;
