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
