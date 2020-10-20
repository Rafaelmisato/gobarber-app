import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
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
    title: {
      fontFamily: 'RobotoSlab-Medium',
      color: '#f4ede8',
      fontSize: 24,
      margin: 24,
      marginTop: 0,
    },
    openDatePickerButton: {
      height: 46,
      backgroundColor: '#ff9000',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
    },
    openDatePickerText: {
      fontFamily: 'RobotoSlab-Medium',
      fontSize: 16,
      color: '#232129',
    },
    schedule: {
      paddingTop: 24,
      paddingBottom: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      color: '#999591',
      fontFamily: 'RobotoSlab-Regular',
      marginLeft: 24,
      marginBottom: 12,
    },
    sectionContent: {
      paddingLeft: 24,
    },
    hourAvailable: {
      padding: 12,
      backgroundColor: '#3e3b47',
      borderRadius: 10,
      marginRight: 8,
    },
    hourSelected: {
      padding: 12,
      backgroundColor: '#ff9000',
      borderRadius: 10,
      marginRight: 8,
    },
    hour: {
      padding: 12,
      backgroundColor: '#3e3b47',
      borderRadius: 10,
      marginRight: 8,
      opacity: 0.3,
    },
    hourText: {
      color: '#f4ede8',
      fontFamily: 'RobotoSlab-Regular',
      fontSize: 16,
    },
  });

  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const [providers, setProviders] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [selectedHour, setSelectedHour] = useState(0);
  const routeParams = route.params;

  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  );

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChange = useCallback((event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFomatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFomatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const handleSelectHour = useCallback((hour) => {
    setSelectedHour(hour);
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

      <ScrollView style={styles.content}>
        <View style={styles.providerListContainer}>
          <FlatList
            horizontal
            style={styles.providerList}
            data={providers}
            keyExtractor={(provider) => provider.id}
            showsHorizontalScrollIndicator={false}
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
          <Text style={styles.title}>Escolha a data</Text>

          <RectButton
            style={styles.openDatePickerButton}
            onPress={handleToggleDatePicker}
          >
            <Text style={styles.openDatePickerText}>Selecionar outra data</Text>
          </RectButton>

          {showDatePicker && (
            <DateTimePicker
              display="spinner"
              textColor="#f4ede8"
              value={selectedDate}
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.Schedule}>
          <Text style={styles.title}>Escolha o horário</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manhã</Text>

            <ScrollView
              style={styles.sectionContent}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {morningAvailability.map(({ hourFomatted, hour, available }) => {
                return (
                  <RectButton
                    style={available ? styles.hourAvailable : styles.hour}
                    key={hourFomatted}
                    onPress={() => {
                      handleSelectHour();
                    }}
                    selected={selectedHour === hour}
                  >
                    <Text style={styles.hourText}>{hourFomatted}</Text>
                  </RectButton>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tarde</Text>

            <ScrollView
              style={styles.sectionContent}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {afternoonAvailability.map(
                ({ hourFomatted, hour, available }) => {
                  return (
                    <RectButton
                      style={available ? styles.hourAvailable : styles.hour}
                      key={hourFomatted}
                      onPress={() => {
                        handleSelectHour();
                      }}
                      selected={selectedHour === hour}
                    >
                      <Text style={styles.hourText}>{hourFomatted}</Text>
                    </RectButton>
                  );
                }
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAppointment;
