import { Text, View } from 'react-native';

export default function CarriedOutScreen() {
  return (
    <View style={styles.container}>
      <Text>Here you will see all the work you have done</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};