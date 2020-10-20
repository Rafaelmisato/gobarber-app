import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../hooks/auth';
import api from '../services/api';

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
  headerTitle: {
    color: '#f4ede8',
    fontSize: 20,
    fontFamily: 'RobotoSlab-Regular',
    lineHeight: 28,
  },
  username: {
    color: '#ff9000',
    fontFamily: 'RobotoSlab-Medium',
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  providerList: {
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
  },
  providersListTitle: {
    fontSize: 24,
    marginBottom: 24,
    color: '#f4ede8',
    fontFamily: 'RobotoSlab-Medium',
  },
  providerContainer: {
    backgroundColor: '#3e3b47',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 20,
  },
  providerName: {
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 18,
    color: '#f4ede8',
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  providerMetaText: {
    marginLeft: 8,
    color: '#999591',
    fontFamily: 'RobotoSlab-Regular',
  },
});

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigationToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

  const navigateToCreateAppointment = useCallback(
    (providerId) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Bem vindo, {'\n'}
          <Text style={styles.username}>{user.name}</Text>
        </Text>

        <TouchableOpacity onPress={navigationToProfile}>
          <Image source={{ uri: user.avatar_url }} style={styles.userAvatar} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.providerList}
        data={providers}
        ListHeaderComponent={
          <Text style={styles.providersListTitle}>Cabeleleiros</Text>
        }
        keyExtractor={(provider) => provider.id}
        renderItem={({ item }) => {
          return (
            <RectButton
              style={styles.providerContainer}
              onPress={() => navigateToCreateAppointment(item.id)}
            >
              <Image
                source={{ uri: item.avatar_url }}
                style={styles.providerAvatar}
              />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{item.name}</Text>

                <View style={styles.providerMeta}>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <Text style={styles.providerMetaText}>Segunda à sexta</Text>
                </View>
                <View style={styles.providerMeta}>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <Text style={styles.providerMetaText}>8h às 18h</Text>
                </View>
              </View>
            </RectButton>
          );
        }}
      />
    </View>
  );
};

export default Dashboard;
