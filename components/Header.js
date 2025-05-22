import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header({ title }) {
const router = useRouter();
  const userAvatar = null; // Здесь позже будет аватар

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/notifications')}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        {userAvatar ? (
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        ) : (
          <FontAwesome name="user-circle-o" size={28} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
