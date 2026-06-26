import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { calculateSteelWeight } from '../../utils/estimationEngine';

export default function SteelEstimatorScreen() {
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const d = parseFloat(diameter);
    const l = parseFloat(length);
    
    if (isNaN(d) || isNaN(l) || d <= 0 || l <= 0) {
      alert('Please enter valid positive values for diameter and length.');
      return;
    }

    const totalWeight = calculateSteelWeight(d, l);
    setResult(totalWeight);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Brand Header */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
        <Text style={styles.title}>Steel Estimator</Text>
        <Text style={styles.subtitle}>Standard Material Weight Breakdown</Text>
      </View>

      {/* Input Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Structure Specifications</Text>
        
        <Text style={styles.label}>Bar Diameter (mm)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 12"
          placeholderTextColor="#475569"
          keyboardType="numeric"
          value={diameter}
          onChangeText={setDiameter}
        />

        <Text style={styles.label}>Total Length (meters)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 50"
          placeholderTextColor="#475569"
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calculate Quantities</Text>
          </TouchableOpacity>
        </View>
      </View>

      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Total Estimated Weight:</Text>
          <Text style={styles.resultValue}>{result} kg</Text>
          <Text style={styles.formulaNote}>Formula: (D² / 162.2) × L</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#090F16', paddingBottom: 40 },
  headerContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  logoImage: { width: 80, height: 80, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: '#111A24', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#1D2D3D' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 16 },
  label: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  input: { backgroundColor: '#090F16', color: '#fff', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1D2D3D', fontSize: 16, marginBottom: 20 },
  buttonContainer: { marginTop: 8 },
  calcButton: { backgroundColor: '#0D9488', padding: 16, borderRadius: 8, alignItems: 'center' }, // Clean Emerald Teal Button
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultCard: { marginTop: 24, backgroundColor: '#112A27', padding: 20, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#0D9488' }, // Subtle teal output glow
  resultLabel: { fontSize: 14, color: '#94A3B8', marginBottom: 4 },
  resultValue: { fontSize: 32, fontWeight: 'bold', color: '#2DD4BF' },
  formulaNote: { fontSize: 12, color: '#0D9488', marginTop: 8, fontStyle: 'italic' },
});
