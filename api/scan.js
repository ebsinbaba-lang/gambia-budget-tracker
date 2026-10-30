// EXCLUSIVE DATABASE MATRIX: GG, NAM, SH, SG, PR
const vehicleDatabase = {
  // --- National Assembly Member Fleet ---
  "NAM 112 A": {
    model: "Toyota Land Cruiser Prado",
    estimatedCostDasi: 2500000, 
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 45000,
    budgetImpact: "D2,500,000 procurement cost plus D540,000 annual operational drain per vehicle.",
    alternativePublicValue: "Can fully fund 12 months of essential antibiotic & antimalarial supplies for a regional health clinic, or purchase 150 high-quality desks for community primary schools."
  },

  // --- Government General Fleet ---
  "GG 204 B": {
    model: "Mercedes-Benz E-Class (OIC Fleet)",
    estimatedCostDasi: 3800000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 60000,
    budgetImpact: "High-premium luxury fleet maintenance. Annual operational drain estimated at D720,000.",
    alternativePublicValue: "Equivalent to sinking 3 solar-powered clean water boreholes in rural Central River Region (CRR) communities."
  },

  // --- State House Security Fleets ---
  "SH 001 A": {
    model: "Toyota Land Cruiser V8 VVIP",
    estimatedCostDasi: 7500000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 95000,
    budgetImpact: "VVIP armored/high-displacement vehicle. Annual operational drain exceeding D1,140,000.",
    alternativePublicValue: "Could provide full 4-year university tuition scholarships for 25 Gambian students at the University of The Gambia (UTG)."
  },

  // --- Sovereign State Government Agencies ---
  "SG 412 C": {
    model: "Nissan Hardbody Pick-up",
    estimatedCostDasi: 1800000,
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 35000,
    budgetImpact: "Standard utility fleet vehicle. Annual operational drain estimated at D420,000.",
    alternativePublicValue: "Could purchase 1,400 bags of fertilizer to support smallholder rice farmers in the North Bank Region."
  },

  // --- Presidential Protocol Fleets ---
  "PR 003 X": {
    model: "Range Rover Sentinel (VIP Protocol)",
    estimatedCostDasi: 8200000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 110000,
    budgetImpact: "High-tier armored protocol asset. Annual maintenance and high-displacement fuel footprint costs D1,320,000.",
    alternativePublicValue: "Could completely rebuild and modernize 4 dilapidated nursery blocks with sanitation facilities in rural settlements."
  }
};

export default async function handler(req, res) {
  // Enable CORS headers so your frontend can communicate securely
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { plate } = req.query;
  
  if (!plate) {
    return res.status(400).json({ error: "No plate provided" });
  }

  // Formatting lookup string to match exactly
  const cleanPlate = plate.toUpperCase().trim();
  const matchedVehicle = vehicleDatabase[cleanPlate];

  if (!matchedVehicle) {
    return res.status(404).json({ error: "Registration not found or custom prefix omitted." });
  }

  return res.status(200).json(matchedVehicle);
}
