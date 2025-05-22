import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header title="Home" />
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
});
