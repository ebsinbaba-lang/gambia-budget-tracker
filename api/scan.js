export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { plate } = req.body;
        if (!plate) {
            return res.status(400).json({ message: 'Plate data missing.' });
        }

        const normalizedLookup = plate.toUpperCase().replace(/[^A-Z0-9]/g, '').trim();

        // 2026 Gambian Regulated Fuel Price Index (GMD per Litre)
        const PETROL_PRICE = 109.80;
        const DIESEL_PRICE = 120.00;

        // Alternative Public Utility Cost Baselines (GMD)
        const COST_HOSPITAL_BED = 45000;
        const COST_AC_SET = 35000;
        const COST_RICE_BAG = 2500;
        const COST_TRACTOR = 1800000;

        // Core Fleet Specifications & Asset Database
        const vehicleDatabase = {
            "NAM0316L": {
                model: "Toyota Land Cruiser Prado (VX/TX)",
                engineSize: "2.8L 4-Cylinder",
                tankSize: 87,
                fuelType: "Diesel",
                fuelPrice: DIESEL_PRICE,
                marketValue: 3000000, 
                avgLitersPer100km: 9.2
            },
            "SG0088A": {
                model: "Toyota Land Cruiser 300 VXR",
                engineSize: "3.5L Twin-Turbo V6",
                tankSize: 110,
                fuelType: "Petrol",
                fuelPrice: PETROL_PRICE,
                marketValue: 8500000,
                avgLitersPer100km: 12.1
            },
            "GG0119A": {
                model: "Toyota Land Cruiser 300 VXR (Executive Convoy)",
                engineSize: "3.5L Twin-Turbo V6 Premium",
                tankSize: 110,
                fuelType: "Petrol",
                fuelPrice: PETROL_PRICE,
                marketValue: 8500000,
                avgLitersPer100km: 12.1
            },
            "GG6663A": {
                model: "Toyota Land Cruiser 300 (OIC Summit VIP)",
                engineSize: "3.3L Twin-Turbo V6",
                tankSize: 110,
                fuelType: "Diesel",
                fuelPrice: DIESEL_PRICE,
                marketValue: 7500000,
                avgLitersPer100km: 10.2
            },
            "GG0058A": {
                model: "Toyota Land Cruiser 300 (OIC Executive)",
                engineSize: "3.3L Twin-Turbo V6",
                tankSize: 110,
                fuelType: "Diesel",
                fuelPrice: DIESEL_PRICE,
                marketValue: 7500000,
                avgLitersPer100km: 10.2
            },
            "PR": {
                model: "Nissan Patrol VIP Executive SUV",
                engineSize: "5.6L V8 Prestige",
                tankSize: 140,
                fuelType: "Petrol",
                fuelPrice: PETROL_PRICE,
                marketValue: 9000000,
                avgLitersPer100km: 14.5
            },
            "GG1101A": {
                model: "Toyota Land Cruiser Prado VX",
                engineSize: "2.8L 4-Cylinder",
                tankSize: 87,
                fuelType: "Diesel",
                fuelPrice: DIESEL_PRICE,
                marketValue: 3200000,
                avgLitersPer100km: 9.2
            }
        };

        let vehicle = vehicleDatabase[normalizedLookup];

        // Dynamic Generator for unregistered fleet elements matching official prefixes
        if (!vehicle) {
            const validPrefixes = ['GG', 'NAM', 'SH', 'SG', 'PR'];
            const detectedPrefix = validPrefixes.find(p => normalizedLookup.startsWith(p));

            if (detectedPrefix) {
                const isLuxury = ['GG', 'SG', 'PR'].includes(detectedPrefix);
                vehicle = {
                    model: `Official Fleet ${detectedPrefix} Series SUV`,
                    engineSize: isLuxury ? "3.3L V6 Twin-Turbo" : "2.8L Turbo-Diesel",
                    tankSize: isLuxury ? 110 : 87,
                    fuelType: "Diesel",
                    fuelPrice: DIESEL_PRICE,
                    marketValue: isLuxury ? 7500000 : 3100000,
                    avgLitersPer100km: isLuxury ? 10.2 : 9.2
                };
            }
        }

        if (vehicle) {
            // Operational Metrics Logic (Assuming 20,000 km driven annually over 5 years)
            const annualKm = 20000;
            const totalKm5Years = annualKm * 5;
            const totalFuelLiters5Years = (totalKm5Years / 100) * vehicle.avgLitersPer100km;
            const totalFuelCost5Years = Math.round(totalFuelLiters5Years * vehicle.fuelPrice);
            
            // Standard institutional maintenance/insurance baseline over 5 years
            const maintenanceCost5Years = Math.round(vehicle.marketValue * 0.15); 
            
            // Comprehensive Accumulation Metric
            const grossAssetCost5Years = vehicle.marketValue + totalFuelCost5Years + maintenanceCost5Years;

            // Alternative Civic Value Calculations
            const beds = Math.floor(grossAssetCost5Years / COST_HOSPITAL_BED);
            const acs = Math.floor(grossAssetCost5Years / COST_AC_SET);
            const rice = Math.floor(grossAssetCost5Years / COST_RICE_BAG);
            const tractors = Math.floor(grossAssetCost5Years / COST_TRACTOR);

            const formatMoney = (num) => "D" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " GMD";

            const markdownResponse = `**OFFICIAL RECORD FOUND**
**VEHICLE MODEL:** ${vehicle.model}
**ENGINE SIZE:** ${vehicle.engineSize}
**TANK SIZE:** ${vehicle.tankSize}L (${vehicle.fuelType})

**5-YEAR PROJECTED METRICS:**
**INITIAL PROCUREMENT COST:** ${formatMoney(vehicle.marketValue)}
**5-YEAR RUNNING FUEL COST:** ${formatMoney(totalFuelCost5Years)}
**5-YEAR ESTIMATED MAINTENANCE:** ${formatMoney(maintenanceCost5Years)}
**TOTAL TAXPAYER LIABILITY (5 YRS):** ${formatMoney(grossAssetCost5Years)}

**ALTERNATIVE CIVIC VALUES:**
The complete 5-year funding allocation required for this single vehicle asset could alternatively purchase:
• **${beds}** Medical-Grade Hospital Beds
• **${acs}** Split-System Air Conditioning Units
• **${rice.toLocaleString()}** 50kg Bags of Premium Rice
• **${tractors}** 4WD Agricultural Tractors`;

            return res.status(200).json({ output: markdownResponse });
        }

        return res.status(404).json({ message: "Registration layout unrecognized as an official government tracking target." });

    } catch (error) {
        console.error("Database Engine Fault:", error);
        return res.status(500).json({ message: "Internal server processing error." });
    }
}
