import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useComponentContext } from '../../context/globalAppContext';

export default function SettingsScreen() {
  const { activeThemeStyles } = useComponentContext();

  // Language / Theme
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  // Toggles
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Modals
  const [aboutVisible, setAboutVisible] = useState(false);
  const [regulationsVisible, setRegulationsVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: activeThemeStyles?.backgroundColor }]}>
      {/* Language */}
      <View style={[styles.pickerContainer, { backgroundColor: activeThemeStyles?.formInputBackground}]}>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
          style={[styles.picker, { color: activeThemeStyles?.textColor }]}
          dropdownIconColor={activeThemeStyles?.textColor}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="עברית" value="he" />
        </Picker>
        <Text style={[styles.label, { color: activeThemeStyles?.unactiveTextColor }]}>
          Language
        </Text>
      </View>

      {/* Theme */}
      <View style={[styles.pickerContainer, { backgroundColor: activeThemeStyles?.formInputBackground}]}>
        <Picker
          selectedValue={theme}
          onValueChange={(itemValue) => setTheme(itemValue)}
          style={[styles.picker, { color: activeThemeStyles?.textColor }]}
          dropdownIconColor={activeThemeStyles?.textColor}
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
        <Text style={[styles.label, { color: activeThemeStyles?.unactiveTextColor }]}>
          Theme
        </Text>
      </View>

      {/* Break Line */}
      <View style={[styles.breakLine, { backgroundColor: activeThemeStyles?.breakLineColor }]} />

      {/* Switches */}
      <View style={styles.switchRow}>
        <Switch
          value={locationEnabled}
          onValueChange={setLocationEnabled}
          trackColor={{false: activeThemeStyles?.switchTrackColor, true: activeThemeStyles?.switchTrackColor}}
          thumbColor={true ?  activeThemeStyles?.switchThumbColor : '#000'}
        />
        <Text style={[styles.switchName, { color: activeThemeStyles?.buttonColorPrimaryDefault }]}>Location</Text>
      </View>

      <View style={styles.switchRow}>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{false: activeThemeStyles?.switchTrackColor, true: activeThemeStyles?.switchTrackColor}}
          thumbColor={true ?  activeThemeStyles?.switchThumbColor : '#000'}
        />
        <Text style={[styles.switchName, { color: activeThemeStyles?.buttonColorPrimaryDefault }]}>
          Notifications
        </Text>
      </View>

      {/* Break Line */}
      <View style={[styles.breakLine, { backgroundColor: activeThemeStyles?.breakLineColor }]} />

      {/* Buttons */}
      <TouchableOpacity
        style={[
          styles.primaryBtn,
          { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
        ]}
        onPress={() => setAboutVisible(true)}
      >
        <Text
          style={[
            styles.primaryText,
            { color: activeThemeStyles?.buttonTextColorPrimary },
          ]}
        >
          About
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.primaryBtn,
          { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
        ]}
        onPress={() => setRegulationsVisible(true)}
      >
        <Text
          style={[
            styles.primaryText,
            { color: activeThemeStyles?.buttonTextColorPrimary, fontWeight: 'bold' },
          ]}
        >
          Regulations
        </Text>
      </TouchableOpacity>

      {/* Bottom Icons + Text */}
      <View style={styles.bottomRow}>
        <View style={styles.connectBtnsContainer}>
        <Ionicons name="chatbubble-ellipses" size={RFValue(24)} color={activeThemeStyles?.buttonColorPrimaryDefault} style={{ marginRight: 10 }} />
        <Ionicons name="call" size={RFValue(24)} color={activeThemeStyles?.buttonColorPrimaryDefault} />
        </View>
        <View>
          <Text style={[styles.bottomText, {color: activeThemeStyles?.formInputTextColor}]}>Do you have a question?</Text>
          <Text style={[styles.bottomText, {color: activeThemeStyles?.formInputTextColor}]}>Just want to cheer?</Text>
          <Text style={[styles.bottomText, {color: activeThemeStyles?.formInputTextColor}]}>Just want to cheer?</Text>
        </View>
      </View>
      <Text style={[styles.versionText, {color: activeThemeStyles?.unactiveTextColor}]}>v1.52</Text>

      {/* About Modal */}
      <Modal visible={aboutVisible} animationType="slide">
        <ModalContent title="FLALX" onClose={() => setAboutVisible(false)} lines={20} />
      </Modal>

      {/* Regulations Modal */}
      <Modal visible={regulationsVisible} animationType="slide">
        <ModalContent title="FLALX" onClose={() => setRegulationsVisible(false)} lines={50} />
      </Modal>
    </View>
  );
}

// Модальное содержимое
function ModalContent({ title, onClose, lines }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{title}</Text>
      </View>
      <ScrollView style={styles.modalContent}>
        {Array.from({ length: lines }).map((_, i) => (
          <Text key={i} style={styles.modalText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(10),
  },
  pickerContainer: {
    marginBottom: RFValue(8),
    borderRadius: RFValue(6),
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(10),
    height: RFValue(50),
    justifyContent: 'center',
    // flexDirection: 'row',
    position: 'relative',
  },
  picker: {
    width: '80%',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  label: {
    position: 'absolute',
    fontSize: RFValue(11),
    right: RFValue(10),
    top: RFValue(5),
  },
  switchName: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  breakLine: {
    height: 1,
    marginVertical: RFValue(8),
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RFValue(16),
  },
  primaryBtn: {
    padding: RFValue(12),
    borderRadius: RFValue(6),
    alignItems: 'center',
    marginVertical: RFValue(5),
  },
  primaryText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: RFValue(20),
  },
  connectBtnsContainer: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(10),
    gap: RFValue(5),
  },
  bottomText: {
    fontSize: RFValue(10),
    textAlign: 'right',
  },
  versionText: {
    textAlign: 'right',
    fontSize: RFValue(10),
    marginTop: RFValue(5),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(10),
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#0A62EA',
  },
  modalContent: {
    padding: RFValue(10),
  },
  modalText: {
    fontSize: RFValue(12),
    marginBottom: RFValue(8),
    lineHeight: RFValue(16),
  },
});
