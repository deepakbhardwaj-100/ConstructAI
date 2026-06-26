import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AIOutput {
  concreteVolume: number;
  steelWeight: number;
  safetyStatus: string;
}

export default function LoadVectorScreen() {
  const [axialLoad, setAxialLoad] = useState('');
  const [momentX, setMomentX] = useState('');
  const [shearForce, setShearForce] = useState('');
  const [results, setResults] = useState<AIOutput | null>(null);

  const handlePredict = () => {
    const p = parseFloat(axialLoad);
    const mx = parseFloat(momentX);
    const v = parseFloat(shearForce);

    if (isNaN(p) || isNaN(mx) || isNaN(v)) {
      alert('Please fill out all Load Vector components.');
      return;
    }

    // AI weight calculations
    const concreteEstimate = (p * 0.0015) + (mx * 0.003) + 0.5;
    const steelEstimate = (p * 0.05) + (mx * 0.25) + (v * 0.1);

    setResults({
      concreteVolume: Number(concreteEstimate.toFixed(2)),
      steelWeight: Number(steelEstimate.toFixed(2)),
      safetyStatus: p > 2500 ? "WARNING: STRESS OVERLIMIT" : "DESIGN MIX COMPLIANT"
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>ConstructAI</Text>
        <Text style={styles.subtitle}>AI Structural Load Vector Estimator</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Structural Input Vector [P, Mx, V]</Text>
        
        <Text style={styles.label}>Axial Load - P (kN)</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 1200" placeholderTextColor="#666" value={axialLoad} onChangeText={setAxialLoad} />

        <Text style={styles.label}>Bending Moment - Mx (kNm)</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 150" placeholderTextColor="#666" value={momentX} onChangeText={setMomentX} />

        <Text style={styles.label}>Shear Force - V (kN)</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 80" placeholderTextColor="#666" value={shearForce} onChangeText={setShearForce} />

        <TouchableOpacity style={styles.calculateButton} onPress={handlePredict}>
          <Text style={styles.calculateButtonText}>Run AI Prediction</Text>
        </TouchableOpacity>
      </View>

      {results && (
        <View style={[styles.card, styles.resultsCard]}>
          <Text style={styles.resultsTitle}>Model Metrics</Text>
          <Text style={[styles.statusText, results.safetyStatus.includes('WARNING') ? styles.statusWarning : styles.statusSafe]}>{results.safetyStatus}</Text>
          <View style={styles.divider} />
          <View style={styles.resultRow}><Text style={styles.resultLabel}>Concrete Volume:</Text><Text style={styles.resultValue}>{results.concreteVolume} m³</Text></View>
          <View style={styles.resultRow}><Text style={styles.resultLabel}>Reinforcement Steel:</Text><Text style={styles.resultValue}>{results.steelWeight} kg</Text></View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1520' },
  header: { alignItems: 'center', marginTop: 50, marginBottom: 20 },
  logo: { width: 90, height: 90 },
  title: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  subtitle: { color: '#8A99AD', fontSize: 14, marginTop: 4 },
  card: { backgroundColor: '#162235', borderRadius: 12, padding: 20, marginHorizontal: 16, marginVertical: 10 },
  cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: '600', marginBottom: 15 },
  label: { color: '#A0AEC0', fontSize: 12, fontWeight: '500', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#0D1520', color: '#ffffff', borderRadius: 8, padding: 12, fontSize: 16 },
  calculateButton: { backgroundColor: '#3182CE', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  calculateButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  resultsCard: { borderColor: '#3182CE', borderWidth: 1 },
  resultsTitle: { color: '#3182CE', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#23354E', marginVertical: 10 },
  statusText: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', padding: 8, borderRadius: 6 },
  statusSafe: { backgroundColor: '#1C3D27', color: '#68D391' },
  statusWarning: { backgroundColor: '#4A2323', color: '#FC8181' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  resultLabel: { color: '#A0AEC0', fontSize: 14 },
  resultValue: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
});
