import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';

interface Props {
  headerLabel: string;
  actionLabel?: string | React.ReactNode;
  onClickAction?: () => void;
}

const ItemHeader: React.FC<Props> = ({
  headerLabel,
  onClickAction,
  actionLabel,
}) => {
  return (
    <View style={style.labelContainer}>
      <Caption style={style.headerLabel}>{headerLabel}</Caption>
      {actionLabel && (
        <Caption style={style.button} onPress={onClickAction}>
          {actionLabel}
        </Caption>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLabel: {
    fontSize: 15,
  },
  button: {
    color: '#E4771F',
    fontSize: 14,
  },
});

export default ItemHeader;
