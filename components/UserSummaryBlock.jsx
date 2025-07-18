import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { JOB_SUB_TYPES } from '../constants/jobSubTypes';
import { JOB_TYPES } from '../constants/jobTypes';
import { LICENSES } from '../constants/licenses';
import { useComponentContext } from '../context/globalAppContext';

const UserSummaryBlock = ({ user, approved=false }) => {
  const { activeThemeStyles } = useComponentContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const {
    avatar,
    name,
    surname,
    professions,
    jobTypes,
    jobSubTypes,
    about,
    email,
    phoneNumber,
  } = user;

  return (
    <>
      {/* Summary Block */}
      <View style={styles.summaryContainer}>
        <View style={styles.avatarNameContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name='person' size={24} color='#666' />
            </View>
          )}
          <Text style={styles.nameText}>
            {name} {surname}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[
            styles.visitButton,
            { backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault },
          ]}
        >
          <Text
            style={[
              styles.visitButtonText,
              { color: activeThemeStyles?.buttonTextColorPrimary },
            ]}
          >
            Visit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Fullscreen Modal */}
      <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setShowContactInfo(false);
            }}
          >
            <Ionicons name='arrow-back' size={28} color='#000' />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>FLALX</Text>
        </View>
        <ScrollView contentContainerStyle={styles.modalContent}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.modalAvatar} />
          ) : (
            <View style={styles.modalAvatarPlaceholder}>
              <Ionicons name='person' size={50} color='#666' />
            </View>
          )}
          <Text style={styles.modalName}>
            {name} {surname}
          </Text>

          {/* Professions */}
          <View style={styles.centerRow}>
            {professions.map((p, index) => (
              <View key={index} style={styles.professionBadge}>
                <Text style={styles.professionText}>{LICENSES[p]}</Text>
              </View>
            ))}
          </View>

          {/* Job Types */}
          <Text style={styles.sectionTitle}>
            Types of job I&apos;m looking for
          </Text>
          <View style={styles.wrapRow}>
            {jobTypes.map((type, index) => (
              <View key={index} style={styles.typeBadge}>
                <Text style={styles.typeText}>{JOB_TYPES[type]}</Text>
              </View>
            ))}
          </View>

          {/* Sub Types */}
          <Text style={styles.sectionTitle}>
            Sub types of job am I interested
          </Text>
          <View style={styles.wrapRow}>
            {jobSubTypes.map((sub, index) => (
              <View key={index} style={styles.typeBadge}>
                <Text style={styles.typeText}>{JOB_SUB_TYPES[sub]}</Text>
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>A little about me</Text>
          <Text style={styles.aboutText}>{about}</Text>

          {/* Contact Info */}
          <Text style={styles.sectionTitle}>Contact information</Text>
          {!showContactInfo && !approved ? (
            <TouchableOpacity
              style={[
                styles.primaryBtn,
                {
                  backgroundColor: activeThemeStyles?.buttonColorPrimaryDefault,
                  marginHorizontal: 0,
                },
              ]}
              onPress={() => setShowContactInfo(true)}
            >
              <Text
                style={[
                  styles.primaryText,
                  { color: activeThemeStyles?.buttonTextColorPrimary },
                ]}
              >
                Open contact information for 1.50$
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.contactInfo}>📞 {phoneNumber}</Text>
              <Text style={styles.contactInfo}>✉️ {email}</Text>
            </>
          )}
        </ScrollView>
        {!approved && <View>
          {!showContactInfo && (
            <Text style={{color: '#f33', textAlign: 'center', fontSize: RFValue(10),}}>Open contact information to be able to approve provider</Text>
          )}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              {
                backgroundColor: showContactInfo
                  ? activeThemeStyles?.buttonColorPrimaryDefault
                  : activeThemeStyles?.buttonColorPrimaryDisabled,
              },
            ]}
            onPress={() => {
              if (showContactInfo) {
                setModalVisible(false);
                setShowContactInfo(false);
              } else {
              }
            }}
          >
            <Text
              style={[
                styles.primaryText,
                { color: activeThemeStyles?.buttonTextColorPrimary },
              ]}
            >
              Approve
            </Text>
          </TouchableOpacity>
        </View>}
      </Modal>
    </>
  );
};

export default UserSummaryBlock;

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  avatarNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
  },
  visitButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  visitButtonText: {
    fontWeight: '600',
  },
  modalContent: {
    padding: 20,
    paddingBottom: 40,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalAvatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  professionBadge: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  professionText: {
    fontSize: 13,
    color: '#444',
  },
  typeBadge: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 4,
  },
  typeText: {
    fontSize: 13,
    color: '#444',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  aboutText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
  },
  contactButton: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 15,
    marginVertical: 10,
  },
  contactInfo: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  closeButton: {
    marginTop: 24,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#333',
    fontWeight: '500',
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
  primaryBtn: {
    padding: RFValue(12),
    marginHorizontal: RFValue(12),
    borderRadius: RFValue(6),
    alignItems: 'center',
    marginVertical: RFValue(5),
  },
  primaryText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
});
