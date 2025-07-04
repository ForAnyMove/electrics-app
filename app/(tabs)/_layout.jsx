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
            store: 'storefront-outline',
            providers: 'people-outline',
            jobs: 'briefcase-outline',
            home: 'home-outline',
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
        tabBarLabel: {
          // 'my-references': 'References',
          store: 'Store',
          providers: 'Providers',
          jobs: 'Jobs',
          // home: 'Home',
        }[route.name],
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f0f0f0', // светло-серый фон
          borderTopColor: 'transparent', // убираем верхнюю границу
        },
        // Кастомный хэдер
        header: () => <Header />,
          // route.name !== 'store'
          //   ? () => <Header title={route.name.replace(/-/g, ' ')} />
          //   : undefined, // store будет рисовать свой хэдер внутри компонента
      })}
    >
      <Tabs.Screen name='store'/>
      <Tabs.Screen name='providers' />
      <Tabs.Screen name='jobs' />
      {/* <Tabs.Screen name='home' /> */}
    </Tabs>
  );
}
