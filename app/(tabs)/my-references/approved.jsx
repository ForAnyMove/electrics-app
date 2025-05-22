import { Text, View } from 'react-native';

export default function ApprovedScreen() {
  return (
    <View style={styles.container}>
      <Text>Here you will see all the references that approved you for work. You can get in touch and start working together. Don`t forget to attach a photo at the end of the work</Text>
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