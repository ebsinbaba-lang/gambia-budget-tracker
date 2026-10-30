export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { plate } = req.query;
        if (!plate) {
            return res.status(400).json({ error: 'Plate parameter missing.' });
        }

        // Standardize input string for calculation parsing
        const normalizedLookup = plate.toUpperCase().replace(/[^A-Z0-9]/g, '').trim();

        // 2026 Gambian Regulated Fuel Price Index (GMD per Litre)
        const PETROL_PRICE = 109.80;
        const DIESEL_PRICE = 120.00;

        // Alternative Public Utility Cost Baselines (GMD)
        const COST_HOSPITAL_BED = 45000;
        const COST_AC_SET = 35000;
        const COST_RICE_BAG = 2500;
        const COST_TRACTOR = 1800000;

        // Supported prefixes matching your input formatting logic
        const validPrefixes = ['GG', 'NAM', 'SH', 'SG', 'PR'];
        const detectedPrefix = validPrefixes.find(p => normalizedLookup.startsWith(p));

        if (!detectedPrefix) {
            return res.status(404).json({ error: "Registration prefix unrecognized as an official government tracking target." });
        }

        // Classify the fleet tier dynamically on the fly based on the prefix layout
        const isLuxuryTier = ['GG', 'SG', 'PR'].includes(detectedPrefix);
        
        const vehicle = {
            model: isLuxuryTier ? "Toyota Land Cruiser 300 VXR / Nissan Patrol VIP" : "Toyota Land Cruiser Prado (VX/TX Series)",
            engine: isLuxuryTier ? "3.5L Twin-Turbo V6 Premium" : "2.8L 4-Cylinder Turbo-Diesel",
            tankSizeLitre: isLuxuryTier ? 110 : 87,
            fuelPrice: isLuxuryTier ? PETROL_PRICE : DIESEL_PRICE,
            marketValue: isLuxuryTier ? 8500000 : 3200000, // D8.5M GMD vs D3.2M GMD average
            avgLitersPer100km: isLuxuryTier ? 12.1 : 9.2
        };

        // Project operational tracking costs across 5 years (20,000 km annually)
        const annualKm = 20000;
        const totalKm5Years = annualKm * 5;
        const totalFuelLiters5Years = (totalKm5Years / 100) * vehicle.avgLitersPer100km;
        
        const singleTankCost = Math.round(vehicle.tankSizeLitre * vehicle.fuelPrice);
        const totalFuelCost5Years = Math.round(totalFuelLiters5Years * vehicle.fuelPrice);
        const maintenanceCost5Years = Math.round(vehicle.marketValue * 0.15); // 15% maintenance allocation
        const grandTotal = vehicle.marketValue + totalFuelCost5Years + maintenanceCost5Years;

        // Convert the aggregate financial liability into the target alternative public utilities
        const riceBags = Math.floor(grandTotal / COST_RICE_BAG);
        const tractorsCount = Math.floor(grandTotal / COST_TRACTOR);
        const acUnitsCount = Math.floor(grandTotal / COST_AC_SET);
        const bedsCount = Math.floor(grandTotal / COST_HOSPITAL_BED);

        // Package output telemetry mapping exactly to front-end keys
        return res.status(200).json({
            data: {
                plate: plate,
                model: vehicle.model,
                engine: vehicle.engine,
                tankSizeLitre: vehicle.tankSizeLitre,
                breakdown: {
                    vehicleCost: vehicle.marketValue,
                    singleTankCost: singleTankCost,
                    fuelCost: totalFuelCost5Years,
                    grandTotal: grandTotal
                },
                equivalents: {
                    rice: riceBags,
                    tractors: tractorsCount,
                    acUnits: acUnitsCount,
                    beds: bedsCount
                }
            }
        });

    } catch (error) {
        console.error("API backend exception:", error);
        return res.status(500).json({ error: "Internal server tracking engine failure." });
    }
}
