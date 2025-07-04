import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ComponentProvider } from '../context/globalAppContext'; // Путь подкорректируй, если у тебя папка context лежит в другом месте

export default function RootLayout() {
  return (
    <ComponentProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </ComponentProvider>
  );
}
