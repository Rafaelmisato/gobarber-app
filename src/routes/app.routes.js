import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated/AppointmentCreated';

const App = createStackNavigator();

const AppRoutes = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="CreateAppointment" component={CreateAppointment} />
      <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  );
};

export default AppRoutes;
