// estimationEngine.ts

export interface CalculationInput {
  length: number;    // in meters
  width: number;     // in meters
  depth: number;     // in meters
  mixRatio: 'M15' | 'M20' | 'M25';
}

export interface EstimationResult {
  wetVolume: number;      // cubic meters
  dryVolume: number;      // cubic meters
  cementBags: number;     // 50kg bags
  sandCft: number;        // cubic feet
  aggregateCft: number;   // cubic feet
}

export function calculateConcreteQuantities(input: CalculationInput): EstimationResult {
  const { length, width, depth, mixRatio } = input;
  
  // 1. Calculate Wet Volume
  const wetVolume = length * width * depth;
  
  // 2. Convert to Dry Volume using standard Civil engineering factor (1.54)
  const dryVolume = wetVolume * 1.54;
  
  // 3. Define Ratio Parts based on Mix Design Selection
  let cementPart = 1;
  let sandPart = 1.5;
  let aggregatePart = 3;
  
  if (mixRatio === 'M15') {
    sandPart = 2;
    aggregatePart = 4; // 1:2:4
  } else if (mixRatio === 'M25') {
    sandPart = 1;
    aggregatePart = 2; // 1:1:2
  } // Default is M20 -> 1:1.5:3

  const totalParts = cementPart + sandPart + aggregatePart;
  
  // 4. Calculate Material Quantities in Cubic Meters
  const cementVolumeM3 = (dryVolume * cementPart) / totalParts;
  const sandVolumeM3 = (dryVolume * sandPart) / totalParts;
  const aggregateVolumeM3 = (dryVolume * aggregatePart) / totalParts;
  
  // 5. Convert to Practical Site Units
  // 1 Bag of Cement = 0.0347 cubic meters
  const cementBags = Math.ceil(cementVolumeM3 / 0.0347);
  
  // 1 cubic meter = 35.3147 cubic feet (Cft is standard for sand/aggregate delivery)
  const sandCft = Number((sandVolumeM3 * 35.3147).toFixed(2));
  const aggregateCft = Number((aggregateVolumeM3 * 35.3147).toFixed(2));

  return {
    wetVolume: Number(wetVolume.toFixed(2)),
    dryVolume: Number(dryVolume.toFixed(2)),
    cementBags,
    sandCft,
    aggregateCft
  };
}
/**
 * Calculates the total weight of reinforcement steel bars in kilograms.
 * @param diameter Bar diameter in millimeters (mm)
 * @param length Total length of bars in meters (m)
 * @returns Total weight in kilograms (kg) rounded to 2 decimal places
 */
export function calculateSteelWeight(diameter: number, length: number): number {
  if (diameter <= 0 || length <= 0) return 0;
  
  // Standard civil engineering calculation formula (D^2 / 162.2) * Length
  const weightPerMeter = (diameter * diameter) / 162.198;
  const totalWeight = weightPerMeter * length;
  
  return parseFloat(totalWeight.toFixed(2));
}

