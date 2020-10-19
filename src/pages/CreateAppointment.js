import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  TouchableOpacity,
  FlatList,
  RectButton,
} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useAuth } from '../hooks/auth';
import api from '../services/api';

const CreateAppointment = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 24,
      backgroundColor: '#28262e',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: getStatusBarHeight(24),
    },
    backButton: {},
    headerTitle: {
      color: '#f4ede8',
      fontFamily: 'RobotoSlab-Medium',
      fontSize: 20,
      marginLeft: 16,
    },
    userAvatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginLeft: 'auto',
    },
    providerListContainer: {
      height: 112,
    },
    providerList: {
      paddingTop: 32,
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 32,
    },
    providerContainer: {
      backgroundColor: '#3e3b47',
      flexDirection: 'row',
      paddingTop: 8,
      paddingLeft: 12,
      paddingRight: 12,
      paddingBottom: 8,
      alignItems: 'center',
      marginRight: 16,
      borderRadius: 10,
    },
    providerContainerSelected: {
      backgroundColor: '#ff9000',
      flexDirection: 'row',
      paddingTop: 8,
      paddingLeft: 12,
      paddingRight: 12,
      paddingBottom: 8,
      alignItems: 'center',
      marginRight: 16,
      borderRadius: 10,
    },
    providerAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    providerName: {
      marginLeft: 8,
      fontFamily: 'RobotoSlab-Medium',
      fontSize: 16,
      color: '#f4ede8',
    },
    providerNameSelected: {
      marginLeft: 8,
      fontFamily: 'RobotoSlab-Medium',
      fontSize: 16,
      color: '#232129',
    },
    calendar: {},
    calendarTitle: {},
  });

  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const [providers, setProviders] = useState([]);
  const routeParams = route.params;

  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  );

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId) => {
    setSelectedProvider(providerId);
  }, []);

  return (
    <View styles={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Icon name="chevron-left" color="#999591" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cabeleleiros</Text>

        <Image source={{ uri: user.avatar_url }} style={styles.userAvatar} />
      </View>

      <View style={styles.providerListContainer}>
        <FlatList
          horizontal
          style={styles.providerList}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => {
            return (
              <RectButton
                style={
                  provider.id === selectedProvider
                    ? styles.providerContainerSelected
                    : styles.providerContainer
                }
                onPress={() => {
                  handleSelectProvider(provider.id);
                }}
              >
                <Image
                  source={{ uri: provider.avatar_url }}
                  style={styles.providerAvatar}
                />
                <Text
                  style={
                    provider.id === selectedProvider
                      ? styles.providerNameSelected
                      : styles.providerName
                  }
                >
                  {provider.name}
                </Text>
              </RectButton>
            );
          }}
        />
      </View>

      <View style={styles.calendar}>
        <Text style={styles.calendarTitle}>Escolha a data</Text>
        <DateTimePicker
          mode="date"
          display="inline"
          textColor="#f4ede8"
          value={new Date()}
        />
      </View>
    </View>
  );
};

export default CreateAppointment;
