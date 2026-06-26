import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type mixRatio = 'M15' | 'M20' | 'M25';

export default function ConcreteMixScreen() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [selectedMix, setSelectedMix] = useState<mixRatio>('M20');
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);

    if (isNaN(l) || isNaN(w) || isNaN(d)) {
      alert('Please enter valid dimensions.');
      return;
    }

    const wetVolume = l * w * d;
    const dryVolume = wetVolume * 1.54;
    
    let cementPart = 1, sandPart = 1.5, aggregatePart = 3;
    if (selectedMix === 'M15') { sandPart = 2; aggregatePart = 4; }
    else if (selectedMix === 'M25') { sandPart = 1; aggregatePart = 2; }

    const totalParts = cementPart + sandPart + aggregatePart;
    const cementBags = Math.ceil(((dryVolume * cementPart) / totalParts) / 0.0347);
    const sandCft = (((dryVolume * sandPart) / totalParts) * 35.3147).toFixed(1);
    const aggregateCft = (((dryVolume * aggregatePart) / totalParts) * 35.3147).toFixed(1);

    setResults({ wetVolume: wetVolume.toFixed(2), cementBags, sandCft, aggregateCft });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Mix Estimator</Text>
        <Text style={styles.subtitle}>Standard Material Ratio Breakdown</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Structure Dimensions (Meters)</Text>
        
        <Text style={styles.label}>Length (m)</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 4.0" placeholderTextColor="#666" value={length} onChangeText={setLength} />

        <Text style={styles.label}>Width (m)</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 0.3" placeholderTextColor="#666" value={width} onChangeText={setWidth} />

        <Text style={styles.label}>Depth (m)</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 0.3" placeholderTextColor="#666" value={depth} onChangeText={setDepth} />

        <Text style={styles.label}>Concrete Grade</Text>
        <View style={styles.mixSelectorGroup}>
          {(['M15', 'M20', 'M25'] as mixRatio[]).map((mix) => (
            <TouchableOpacity key={mix} style={[styles.mixButton, selectedMix === mix && styles.mixButtonActive]} onPress={() => setSelectedMix(mix)}>
              <Text style={[styles.mixButtonText, selectedMix === mix && styles.mixButtonTextActive]}>{mix}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
          <Text style={styles.calculateButtonText}>Calculate Quantities</Text>
        </TouchableOpacity>
      </View>

      {results && (
        <View style={[styles.card, styles.resultsCard]}>
          <Text style={styles.resultsTitle}>Material Quantities</Text>
          <View style={styles.divider} />
          <View style={styles.materialRow}><Text style={styles.materialEmoji}>🧱</Text><View><Text style={styles.materialName}>Cement</Text><Text style={styles.materialTotal}>{results.cementBags} Bags</Text></View></View>
          <View style={styles.materialRow}><Text style={styles.materialEmoji}>⏳</Text><View><Text style={styles.materialName}>Sand</Text><Text style={styles.materialTotal}>{results.sandCft} Cft</Text></View></View>
          <View style={styles.materialRow}><Text style={styles.materialEmoji}>🪨</Text><View><Text style={styles.materialName}>Aggregate</Text><Text style={styles.materialTotal}>{results.aggregateCft} Cft</Text></View></View>
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
  mixSelectorGroup: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 15 },
  mixButton: { flex: 1, backgroundColor: '#0D1520', paddingVertical: 12, marginHorizontal: 4, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#23354E' },
  mixButtonActive: { backgroundColor: '#3182CE', borderColor: '#3182CE' },
  mixButtonText: { color: '#A0AEC0', fontWeight: '600' },
  mixButtonTextActive: { color: '#ffffff' },
  calculateButton: { backgroundColor: '#3182CE', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  calculateButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  resultsCard: { borderColor: '#3182CE', borderWidth: 1 },
  resultsTitle: { color: '#3182CE', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#23354E', marginVertical: 10 },
  materialRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  materialEmoji: { fontSize: 28, marginRight: 15 },
  materialName: { color: '#8A99AD', fontSize: 12 },
  materialTotal: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
