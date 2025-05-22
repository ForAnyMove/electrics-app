import { Text, View } from 'react-native';

export default function PendingScreen() {
  return (
    <View style={styles.container}>
      <Text>Here are references that await the other party`s approval</Text>
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