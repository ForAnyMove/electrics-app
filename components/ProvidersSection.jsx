import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useComponentContext } from '../context/globalAppContext';
import CustomFlatList from './ui/CustomFlatList';
import UserSummaryBlock from './UserSummaryBlock';

export default function ProvidersSection({styles, currentJobInfo, approved=false}) {
  const { getUserById, activeThemeStyles } = useComponentContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const providerList = approved ? [currentJobInfo?.approvedProvider] : currentJobInfo?.providers;
  const renderProviderList = (approved=false) => (
    <>
      {Platform.OS === 'web' ? (
        <CustomFlatList
          data={providerList || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <UserSummaryBlock approved={approved} user={getUserById(item)} />}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        />
      ) : (
        <FlatList
          data={providerList || []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <UserSummaryBlock approved={approved} user={getUserById(item)} />}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        />
      )}
    </>
  );
  
  return (
    <View
      style={[
        styles.inputBlock,
        { backgroundColor: activeThemeStyles?.formInputBackground, maxHeight: RFValue(200), overflow: 'hidden' },
      ]}
      key='providers'
    >
      <View>
        <View style={styleRow.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {!approved && providerList?.length > 0 && (
              <View style={[styles.badge, { backgroundColor: activeThemeStyles?.secondaryBadgeBackground }]}> 
                <Text style={[styles.badgeText, { color: activeThemeStyles?.badgeTextColor }]}> 
                  {providerList.length} 
                </Text>
              </View>
            )}
            <Text style={[styles.label, {marginBottom: 0, marginLeft: 10}]}>{approved ? 'Provider working on request' : 'Interested Providers'}</Text>
          </View>

          {!approved && <Pressable onPress={() => setIsModalVisible(true)} style={styleRow.iconButton}>
            <Ionicons name="expand" size={20} color={activeThemeStyles?.textColor} />
          </Pressable>}
        </View>
      </View>

      {renderProviderList(approved)}

      <Modal
        visible={isModalVisible}
        animationType='slide'
        presentationStyle='fullScreen'
      >
        <View style={[styleRow.modalContainer, { backgroundColor: activeThemeStyles?.backgroundColor }]}>
          <View style={styleRow.modalHeader}>
            <Text style={styleRow.modalTitle}>Interested Providers</Text>
            <Pressable onPress={() => setIsModalVisible(false)}>
              <Ionicons name="contract" size={24} color={activeThemeStyles?.textColor} />
            </Pressable>
          </View>
          {renderProviderList()}
        </View>
      </Modal>
    </View>
  );
}

const styleRow = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
