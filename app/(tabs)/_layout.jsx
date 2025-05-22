import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import 'expo-router/entry'; // если expo-router
import 'react-native-gesture-handler'; // ← обязательно первой строкой
import Header from '../../components/Header';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            'my-references': 'document-text-outline',
            'my-readings': 'book-outline',
            'store': 'cart-outline',
            'job-calls': 'briefcase-outline',
            'home': 'home-outline',
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        // Кастомный хэдер
        header: route.name !== 'store'
          ? () => <Header title={route.name.replace(/-/g, ' ')} />
          : undefined, // store будет рисовать свой хэдер внутри компонента
      })}
    >
      <Tabs.Screen name="my-references" />
      <Tabs.Screen name="my-readings" />
      <Tabs.Screen name="store" />
      <Tabs.Screen name="job-calls" />
      <Tabs.Screen name="home" />
    </Tabs>
  );
}
