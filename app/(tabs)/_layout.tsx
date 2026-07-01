import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { 
            position: 'absolute', 
            backgroundColor: '#0D1520', 
            borderTopColor: '#23354E' 
          },
          default: { 
            backgroundColor: '#0D1520', 
            borderTopColor: '#23354E', 
            // This reads your phone's exact gesture height and adds perfect padding
            height: 65 + (insets.bottom > 0 ? insets.bottom : 12),             
            paddingBottom: insets.bottom > 0 ? insets.bottom : 12,      
            paddingTop: 8,         
          },
        }),
        tabBarActiveTintColor: '#0D9488',     
        tabBarInactiveTintColor: '#64748B',   
      }}>
      
      {/* Tab 1: AI Predictor */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'AI Predictor',
          tabBarIcon: ({ color }) => <FontAwesome6 size={18} name="microchip" color={color} />,
        }}
      />
      
      {/* Tab 2: Mix Design */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Mix Design',
          tabBarIcon: ({ color }) => <FontAwesome6 size={18} name="calculator" color={color} />,
        }}
      />

      {/* Tab 3: Steel Weight Estimator */}
      <Tabs.Screen
        name="steel"
        options={{
          title: 'Steel Weight',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🏗️</Text>
          ),
        }}
      />

    </Tabs>
  );
}
