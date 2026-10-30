// ==========================================
// 1. PLACE THE EXPANDED DATABASE RIGHT HERE AT THE VERY TOP
// ==========================================
const vehicleDatabase = {
  "NAM 112 A": {
    model: "Toyota Land Cruiser Prado",
    estimatedCostDasi: 2500000, 
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 45000,
    budgetImpact: "D2,500,000 procurement cost plus D540,000 annual operational drain per vehicle.",
    alternativePublicValue: "Can fully fund 12 months of essential antibiotic & antimalarial supplies for a regional health clinic, or purchase 150 high-quality desks for community primary schools."
  },
  "GG 204 B": {
    model: "Mercedes-Benz E-Class (OIC Fleet)",
    estimatedCostDasi: 3800000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 60000,
    budgetImpact: "High-premium luxury fleet maintenance. Annual operational drain estimated at D720,000.",
    alternativePublicValue: "Equivalent to sinking 3 solar-powered clean water boreholes in rural Central River Region (CRR) communities."
  },
  "SH 001 A": {
    model: "Toyota Land Cruiser V8 VVIP",
    estimatedCostDasi: 7500000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 95000,
    budgetImpact: "VVIP armored/high-displacement vehicle. Annual operational drain exceeding D1,140,000.",
    alternativePublicValue: "Could provide full 4-year university tuition scholarships for 25 Gambian students at the University of The Gambia (UTG)."
  },
  "SG 412 C": {
    model: "Nissan Hardbody Pick-up",
    estimatedCostDasi: 1800000,
    fuelType: "Diesel",
    monthlyFuelMaintenanceDasi: 35000,
    budgetImpact: "Standard utility fleet vehicle. Annual operational drain estimated at D420,000.",
    alternativePublicValue: "Could purchase 1,400 bags of fertilizer to support smallholder rice farmers in the North Bank Region."
  },
  "PR 003 X": {
    model: "Range Rover Sentinel (VIP Protocol)",
    estimatedCostDasi: 8200000,
    fuelType: "Petrol",
    monthlyFuelMaintenanceDasi: 110000,
    budgetImpact: "High-tier armored protocol asset. Annual maintenance and high-displacement fuel footprint costs D1,320,000.",
    alternativePublicValue: "Could completely rebuild and modernize 4 dilapidated nursery blocks with sanitation facilities in rural settlements."
  }
};

// ==========================================
// 2. YOUR EXISTING HANDLER FUNCTION CONTINUES BELOW IT
// ==========================================
export default async function handler(req, res) {
  // Enable CORS headers so your frontend can communicate securely
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // ... the rest of your original validation and matching logic continues down here

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

  const cleanPlate = plate.replace(/\s+/g, '').toUpperCase();
  const allowedPrefixes = ['GG', 'NAM', 'SH', 'SG', 'PR'];
  const hasValidPrefix = allowedPrefixes.some(prefix => cleanPlate.startsWith(prefix));

  if (!hasValidPrefix) {
    return res.status(400).json({ 
      error: "Access Denied: Private vehicles are excluded. Please input an official plate starting with GG, NAM, SH, SG, or PR." 
    });
  }

  // Gambian Fuel Price Constants
  const PETROL_PRICE = 109.80; 
  const DIESEL_PRICE = 120.00; 

  // EXPANDED FLEET REGISTRY
  const fleetDatabase = {
    // Executive / Ministerial Fleet (GG)
    "GG1101A": { model: "Toyota Land Cruiser Prado TXL", engine: "2.8L", fuelType: "Diesel", tankSizeLitre: 87, cost: 3800000 },
    "GG1402A": { model: "Toyota Land Cruiser Prado TXL", engine: "2.8L", fuelType: "Diesel", tankSizeLitre: 87, cost: 3800000 },
    "GG2020A": { model: "Toyota Land Cruiser VXR (OIC Executive)", engine: "3.5L V6", fuelType: "Petrol", tankSizeLitre: 110, cost: 8500000 },
    "GG2550B": { model: "Mercedes-Benz S-Class (Ministerial Issue)", engine: "3.0L Inline-6", fuelType: "Petrol", tankSizeLitre: 76, cost: 7200000 },
    "GG2931B": { model: "Toyota Hilux Pickup Double Cab", engine: "2.4L", fuelType: "Diesel", tankSizeLitre: 80, cost: 2600000 },
    "GG4011A": { model: "Toyota Land Cruiser Hardtop (Ministry Workhorse)", engine: "4.2L", fuelType: "Diesel", tankSizeLitre: 90, cost: 3400000 },
    "GG8804A": { model: "Toyota Corolla Sedan (Official Issue)", engine: "1.8L", fuelType: "Petrol", tankSizeLitre: 50, cost: 1500000 },

    // State House Fleet (SH)
    "SH1001A": { model: "Toyota Land Cruiser 300 V8 LC300", engine: "3.3L Twin-Turbo", fuelType: "Diesel", tankSizeLitre: 110, cost: 6800000 },
    "SH1002A": { model: "Toyota Land Cruiser 300 V8 LC300", engine: "3.3L Twin-Turbo", fuelType: "Diesel", tankSizeLitre: 110, cost: 6800000 },
    "SH4522B": { model: "Toyota Land Cruiser Prado V6", engine: "4.0L", fuelType: "Petrol", tankSizeLitre: 87, cost: 4100000 },

    // National Assembly Members Scheme Fleet (NAM - Documented D2.5M Cars)
    "NAM112A": { model: "Toyota Land Cruiser Prado 150 (2023 Scheme)", engine: "2.7L", fuelType: "Petrol", tankSizeLitre: 87, cost: 2500000 },
    "NAM115A": { model: "Toyota Land Cruiser Prado 150 (2023 Scheme)", engine: "2.7L", fuelType: "Petrol", tankSizeLitre: 87, cost: 2500000 },
    "NAM204B": { model: "Toyota Land Cruiser Prado 150 (2023 Scheme)", engine: "2.7L", fuelType: "Petrol", tankSizeLitre: 87, cost: 2500000 },
    "NAM408B": { model: "Mitsubishi Pajero Sport SUV", engine: "2.4L", fuelType: "Diesel", tankSizeLitre: 68, cost: 2900000 },

    // Guard & Security Fleet (SG & PR)
    "SG3391A": { model: "Ford Ranger Tactical Pickup", engine: "2.2L", fuelType: "Diesel", tankSizeLitre: 80, cost: 2400000 },
    "SG3400A": { model: "Toyota Hilux Security Escort", engine: "2.4L", fuelType: "Diesel", tankSizeLitre: 80, cost: 2600000 },
    "PR5022A": { model: "Mercedes-Benz E-Class Protocol Sedan", engine: "2.0L", fuelType: "Petrol", tankSizeLitre: 66, cost: 4500000 }
  };

  const vehicle = fleetDatabase[cleanPlate] || {
    model: "Toyota Land Cruiser Prado (Fleet Baseline)",
    engine: "2.8L",
    fuelType: "Diesel",
    tankSizeLitre: 87,
    cost: 3800000
  };

  const activeFuelPrice = vehicle.fuelType === "Diesel" ? DIESEL_PRICE : PETROL_PRICE;

  const tanksPerYear = 2 * 52; 
  const singleTankCost = vehicle.tankSizeLitre * activeFuelPrice;
  const fuelCost5Years = singleTankCost * tanksPerYear * 5;
  const grandTotal = vehicle.cost + fuelCost5Years;

  const equivalents = {
    rice: Math.floor(grandTotal / 2500),         
    tractors: Math.floor(grandTotal / 1800000),   
    acUnits: Math.floor(grandTotal / 35000),     
    beds: Math.floor(grandTotal / 45000)         
  };

  return res.status(200).json({
    data: {
      plate: plate, 
      model: `${vehicle.model} (${vehicle.fuelType})`, 
      engine: vehicle.engine,
      tankSizeLitre: vehicle.tankSizeLitre,
      breakdown: {
        vehicleCost: vehicle.cost,
        singleTankCost: Math.round(singleTankCost),
        fuelCost: Math.round(fuelCost5Years),
        grandTotal: Math.round(grandTotal)
      },
      equivalents: equivalents
    }
  });
}
