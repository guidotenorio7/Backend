import { View, Text } from 'react-native';

export default function Screen({ title, children }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      {title && <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold' }}>{title}</Text>}
      {children}
    </View>
  );
}
