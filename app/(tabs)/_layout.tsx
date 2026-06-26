import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
// Use standard built-in vector icons to bypass path errors entirely
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute', backgroundColor: '#0D1520', borderTopColor: '#23354E' },
          default: { backgroundColor: '#0D1520', borderTopColor: '#23354E', height: 60, paddingBottom: 8 },
        }),
        tabBarActiveTintColor: '#3182CE',     // Sharp electric blue for active navigation
        tabBarInactiveTintColor: '#64748B',   // Muted gray for resting tabs
      }}>
      
      {/* Tab 1: AI Predictor */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'AI Predictor',
          tabBarIcon: ({ color }) => <FontAwesome6 size={20} name="microchip" color={color} />,
        }}
      />
      
      {/* Tab 2: Mix Design */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Mix Design',
          tabBarIcon: ({ color }) => <FontAwesome6 size={20} name="calculator" color={color} />,
        }}
      />
    </Tabs>
  );
}
