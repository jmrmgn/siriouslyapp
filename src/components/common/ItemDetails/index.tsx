import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

interface Props {
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

const ItemDetails: React.FC<Props> = ({ icon, value, subtitle }) => {
  return (
    <View style={style.valueContainer}>
      {icon && <Avatar.Icon size={35} icon='account' color='#FFF' />}
      <View style={icon ? style.itemContainer : {}}>
        <Text style={style.itemValue}>{value}</Text>
        {subtitle && <Text style={style.itemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  valueContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: { marginLeft: 20 },
  itemValue: { fontSize: 15 },
  itemSubtitle: { fontSize: 12, color: '#707070' },
});

export default ItemDetails;
