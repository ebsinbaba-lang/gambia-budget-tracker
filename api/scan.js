// EXCLUSIVE DATABASE MATRIX: GG, NAM, SH, SG, PR
const prefixDatabase = {
  "NAM": {
    model: "Toyota Land Cruiser Prado",
    estimatedCostDasi: 2500000, 
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 45000,
    budgetImpact: "**BUDGET IMPACT:** D2,500,000 procurement cost plus D540,000 annual operational drain per vehicle.",
    alternativePublicValue: "**ALTERNATIVE PUBLIC VALUE:** Can fully fund 12 months of essential antibiotic & antimalarial supplies for a regional health clinic, or purchase 150 high-quality desks for community primary schools."
  },
  "GG": {
    model: "Mercedes-Benz E-Class (OIC Fleet)",
    estimatedCostDasi: 3800000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 60000,
    budgetImpact: "**BUDGET IMPACT:** High-premium luxury fleet maintenance. Annual operational drain estimated at D720,000.",
    alternativePublicValue: "**ALTERNATIVE PUBLIC VALUE:** Equivalent to sinking 3 solar-powered clean water boreholes in rural Central River Region (CRR) communities."
  },
  "SH": {
    model: "Toyota Land Cruiser V8 VVIP",
    estimatedCostDasi: 7500000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 95000,
    budgetImpact: "**BUDGET IMPACT:** VVIP armored/high-displacement vehicle. Annual operational drain exceeding D1,140,000.",
    alternativePublicValue: "**ALTERNATIVE PUBLIC VALUE:** Could provide full 4-year university tuition scholarships for 25 Gambian students at the University of The Gambia (UTG)."
  },
  "SG": {
    model: "Nissan Hardbody Pick-up",
    estimatedCostDasi: 1800000,
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 35000,
    budgetImpact: "**BUDGET IMPACT:** Standard utility fleet vehicle. Annual operational drain estimated at D420,000.",
    alternativePublicValue: "**ALTERNATIVE PUBLIC VALUE:** Could purchase 1,400 bags of fertilizer to support smallholder rice farmers in the North Bank Region."
  },
  "PR": {
    model: "Range Rover Sentinel (VIP Protocol)",
    estimatedCostDasi: 8200000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 110000,
    budgetImpact: "**BUDGET IMPACT:** High-tier armored protocol asset. Annual maintenance footprint costs D1,320,000.",
    alternativePublicValue: "**ALTERNATIVE PUBLIC VALUE:** Could completely rebuild and modernize 4 dilapidated nursery blocks with sanitation facilities in rural settlements."
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
    return res.status(400).json({ error: "No plate provided" });
  }

  // Look up by matching the starting characters (NAM, GG, SH, SG, PR)
  const cleanPlate = plate.toUpperCase().trim();
  const allowedPrefixes = ['GG', 'NAM', 'SH', 'SG', 'PR'];
  const matchedPrefix = allowedPrefixes.find(prefix => cleanPlate.startsWith(prefix));

  if (!matchedPrefix) {
    return res.status(400).json({ error: "Invalid prefix." });
  }

  const vehicleData = prefixDatabase[matchedPrefix];
  return res.status(200).json(vehicleData);
}
