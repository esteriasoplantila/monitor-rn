import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import MonitorScreen from './screens/MonitorScreen';
import HistoryLogScreen from './screens/HistoryLogScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  const [token, setToken] = useState('');

  if (!token) {
    return (
      <PaperProvider>
        <LoginScreen setToken={setToken} />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Monitor"
          drawerContent={(props) => <CustomDrawerContent {...props} onLogout={() => setToken('')} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#f8f9fa',
              width: 240,
            },
            headerShown: true,
          }}
        >
          <Drawer.Screen name="Monitor">
            {(props) => <MonitorScreen {...props} token={token} />}
          </Drawer.Screen>
          <Drawer.Screen name="History Log">
            {(props) => <HistoryLogScreen {...props} token={token} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// ✅ Custom Drawer with Logout
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ marginTop: 'auto' }}>
        <DrawerItem
          label="Logout ⎋"
          labelStyle={{ color: '#dc3545', fontWeight: 'bold' }}
          onPress={props.onLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}
