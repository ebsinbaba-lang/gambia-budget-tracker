// EXCLUSIVE PREFIX DATABASE (GG, NAM, SH, SG, PR)
const prefixDatabase = {
  "NAM": {
    model: "Toyota Land Cruiser Prado (NAM Scheme)",
    estimatedCostDasi: 2500000, 
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 45000,
    budgetImpact: "D2,500,000 procurement cost plus D540,000 annual operational drain per vehicle.",
    alternativePublicValue: "Can fully fund 12 months of essential antibiotic & antimalarial supplies for a regional health clinic, or purchase 150 high-quality desks for community primary schools."
  },
  "GG": {
    model: "Mercedes-Benz E-Class / Ministry Fleet",
    estimatedCostDasi: 3800000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 60000,
    budgetImpact: "High-premium luxury fleet maintenance. Annual operational drain estimated at D720,000.",
    alternativePublicValue: "Equivalent to sinking 3 solar-powered clean water boreholes in rural Central River Region (CRR) communities."
  },
  "SH": {
    model: "Toyota Land Cruiser V8 (State House Security)",
    estimatedCostDasi: 7500000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 95000,
    budgetImpact: "VVIP armored/high-displacement vehicle. Annual operational drain exceeding D1,140,000.",
    alternativePublicValue: "Could provide full 4-year university tuition scholarships for 25 Gambian students at the University of The Gambia (UTG)."
  },
  "SG": {
    model: "Nissan Hardbody Pick-up (State Agency)",
    estimatedCostDasi: 1800000,
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 35000,
    budgetImpact: "Standard utility fleet vehicle. Annual operational drain estimated at D420,000.",
    alternativePublicValue: "Could purchase 1,400 bags of fertilizer to support smallholder rice farmers in the North Bank Region."
  },
  "PR": {
    model: "Range Rover Sentinel (Presidential Protocol)",
    estimatedCostDasi: 8200000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 110000,
    budgetImpact: "High-tier armored protocol asset. Annual maintenance and fuel costs D1,320,000.",
    alternativePublicValue: "Could completely rebuild and modernize 4 dilapidated nursery blocks with sanitation facilities in rural settlements."
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { plate } = req.query;
  if (!plate) {
    return res.status(400).json({ error: "Missing plate query parameter." });
  }

  // Clean the text typed by the user
  const cleanPlate = plate.replace(/\s+/g, '').toUpperCase();
  const allowedPrefixes = ['GG', 'NAM', 'SH', 'SG', 'PR'];

  // Find which allowed prefix the plate starts with
  const matchedPrefix = allowedPrefixes.find(prefix => cleanPlate.startsWith(prefix));

  if (!matchedPrefix) {
    return res.status(400).json({ error: "Invalid prefix. Plate must start with GG, NAM, SH, SG, or PR." });
  }

  // Get data for that specific prefix group
  const vehicleData = prefixDatabase[matchedPrefix];

  return res.status(200).json(vehicleData);
}
