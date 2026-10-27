const GAMBIAN_OFFICIAL_FLEET_DB = {
  'PR': {
    modelName: 'Nissan Patrol V8 (Y62 Lineage)',
    estimatedCostDalasis: 7200000, 
    engineSizeCC: '5600cc V8 Premium',
    tankSizeLitre: 140,
    fuelType: 'petrol',
    avgKmLitre: 6.5
  },
  'SG': {
    modelName: 'Toyota Land Cruiser 300 VXR Flagship',
    estimatedCostDalasis: 8640000, 
    engineSizeCC: '3500cc Twin-Turbo V6',
    tankSizeLitre: 110,
    fuelType: 'petrol',
    avgKmLitre: 8.0
  },
  'SH': {
    modelName: 'Toyota Land Cruiser 300 VXR (Executive Fleet)',
    estimatedCostDalasis: 8640000, 
    engineSizeCC: '3500cc Twin-Turbo V6',
    tankSizeLitre: 110,
    fuelType: 'petrol',
    avgKmLitre: 8.0
  },
  'NAM': {
    modelName: 'Toyota Land Cruiser Prado TX/VX',
    estimatedCostDalasis: 4320000, 
    engineSizeCC: '3000cc Turbo Diesel D-4D',
    tankSizeLitre: 87,
    fuelType: 'diesel',
    avgKmLitre: 10.2
  },
  'GG': {
    modelName: 'Toyota Land Cruiser Prado VX Fleet',
    estimatedCostDalasis: 5040000, 
    engineSizeCC: '3000cc Turbo Diesel',
    tankSizeLitre: 87,
    fuelType: 'diesel',
    avgKmLitre: 9.5
  }
};

export default async function handler(req, res) {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: "Missing license plate parameter." });
  }

  const cleanPlate = plate.replace(/[\s-]/g, '').toUpperCase();
  const officialPrefixes = ['NAM', 'GG', 'SG', 'SH', 'PR'];
  const matchedPrefix = officialPrefixes.find(prefix => cleanPlate.startsWith(prefix));

  if (!matchedPrefix) {
    return res.status(400).json({
      isValidOfficial: false,
      error: "⚠️ Private vehicle detected. This tracker monitors official government allocations only (GG, NAM, SH, SG, PR)."
    });
  }

  const vehicle = GAMBIAN_OFFICIAL_FLEET_DB[matchedPrefix] || GAMBIAN_OFFICIAL_FLEET_DB['GG'];
  const currentFuelPrice = (vehicle.fuelType === 'petrol') ? 109.80 : 120.00;
  const singleTankCost = Math.round(vehicle.tankSizeLitre * currentFuelPrice);
  
  const totalKmOver5Years = 100000;
  const totalLitresNeeded = totalKmOver5Years / vehicle.avgKmLitre;
  const fiveYearFuelCost = Math.round(totalLitresNeeded * currentFuelPrice);
  const totalFinancialImpact = vehicle.estimatedCostDalasis + fiveYearFuelCost;

  const BENCHMARKS = { rice: 2500, tractors: 1800000, acUnits: 35000, beds: 45000 };

  const reportData = {
    plate: plate,
    model: vehicle.modelName,
    engine: vehicle.engineSizeCC,
    tankSizeLitre: vehicle.tankSizeLitre,
    fuel: vehicle.fuelType,
    breakdown: {
      vehicleCost: vehicle.estimatedCostDalasis,
      singleTankCost: singleTankCost,
      fuelCost: fiveYearFuelCost,
      grandTotal: totalFinancialImpact
    },
    equivalents: {
      rice: Math.floor(totalFinancialImpact / BENCHMARKS.rice),
      tractors: Math.floor(totalFinancialImpact / BENCHMARKS.tractors),
      acUnits: Math.floor(totalFinancialImpact / BENCHMARKS.acUnits),
      beds: Math.floor(totalFinancialImpact / BENCHMARKS.beds)
    }
  };

  return res.status(200).json({ isValidOfficial: true, data: reportData });
}
