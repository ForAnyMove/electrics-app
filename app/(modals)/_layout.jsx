// app/(modals)/_layout.jsx
import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal', // можно заменить на 'card' если не хочешь анимации модального окна
      }}
    />
  );
}
