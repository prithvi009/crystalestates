export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  locationArea: string;
  type: "Plot" | "Row House" | "Flat" | "Commercial" | "Land";
  price: string;
  priceNumeric: number;
  area: string;
  areaRange: string;
  bedrooms?: number;
  bathrooms?: number;
  floor?: string;
  facing?: string;
  possession: string;
  rera?: string;
  highlights: string[];
  description: string;
  amenities: string[];
  nearbyPlaces: { name: string; distance: string }[];
  priceBreakdown: {
    basePrice: string;
    stampDuty: string;
    registration: string;
    total: string;
  };
  documents: { title: string; status: "verified" | "pending" | "na" }[];
  badge?: "High Demand" | "New Listing" | "Price Rising";
  images: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "crystal-highway-plots-phase-1",
    name: "Crystal Highway Plots — Phase 1",
    location: "Pune-Solapur Highway, near Indapur",
    locationArea: "Pune-Solapur Highway",
    type: "Plot",
    price: "₹8,50,000",
    priceNumeric: 850000,
    area: "1000 sqft",
    areaRange: "1000 - 2000 sqft",
    possession: "Immediate",
    rera: "P52100054321",
    highlights: [
      "30ft & 40ft internal roads",
      "Gated entry with 24/7 security",
      "Water + electricity connection",
      "5 min from NH65",
      "Temple and landscaped garden",
      "Clear title with NA sanction",
    ],
    description:
      "Crystal Highway Plots Phase 1 offers premium plotted development on the rapidly appreciating Pune-Solapur Highway corridor. Located just 5 minutes from NH65, these plots offer excellent connectivity to both Pune and Solapur. With 30ft and 40ft internal roads, gated security, and all essential amenities, this is the perfect investment for families looking to build their dream home or investors seeking high-appreciation plots.",
    amenities: [
      "Water Supply",
      "Electricity",
      "Internal Roads",
      "Gated Entry",
      "Garden",
      "Temple",
      "Street Lights",
      "Drainage System",
    ],
    nearbyPlaces: [
      { name: "NH65 Highway", distance: "5 min" },
      { name: "Indapur Town", distance: "10 min" },
      { name: "Nearest Hospital", distance: "8 km" },
      { name: "Nearest School", distance: "5 km" },
      { name: "Pune City", distance: "85 km" },
      { name: "Solapur City", distance: "120 km" },
    ],
    priceBreakdown: {
      basePrice: "₹8,50,000",
      stampDuty: "₹51,000 (est.)",
      registration: "₹30,000 (est.)",
      total: "₹9,31,000 (est.)",
    },
    documents: [
      { title: "Title Clearance", status: "verified" },
      { title: "NA Conversion", status: "verified" },
      { title: "RERA Registration", status: "verified" },
      { title: "Layout Approval", status: "verified" },
    ],
    badge: "High Demand",
    images: ["/placeholder-property.jpg"],
  },
  {
    id: "2",
    slug: "crystal-residences-solapur",
    name: "Crystal Residences — Solapur",
    location: "Solapur, near Akkalkot Road",
    locationArea: "Solapur City",
    type: "Row House",
    price: "₹32,00,000",
    priceNumeric: 3200000,
    area: "1200 sqft",
    areaRange: "1200 sqft built-up",
    bedrooms: 2,
    bathrooms: 2,
    floor: "G+1",
    facing: "East",
    possession: "Ready to Move",
    rera: "P52100067890",
    highlights: [
      "Independent row house",
      "Dedicated car parking",
      "Modular kitchen ready",
      "24/7 water supply",
      "Near schools and hospital",
      "Vastu compliant design",
    ],
    description:
      "Crystal Residences offers beautifully designed 2 BHK independent row houses in the heart of Solapur. Located near Akkalkot Road, these homes combine modern amenities with the charm of independent living. Each unit comes with a modular kitchen, dedicated car parking, and 24/7 water supply. Perfect for families looking for a ready-to-move home in Solapur.",
    amenities: [
      "Car Parking",
      "Modular Kitchen",
      "Water Supply",
      "Electricity",
      "Road Access",
      "Garden",
      "Security",
      "Rain Water Harvesting",
    ],
    nearbyPlaces: [
      { name: "Akkalkot Road", distance: "2 min" },
      { name: "Railway Station", distance: "5 km" },
      { name: "Civil Hospital", distance: "3 km" },
      { name: "DAV Public School", distance: "1.5 km" },
      { name: "Siddheshwar Temple", distance: "4 km" },
      { name: "Bus Stand", distance: "4 km" },
    ],
    priceBreakdown: {
      basePrice: "₹32,00,000",
      stampDuty: "₹1,92,000 (est.)",
      registration: "₹30,000 (est.)",
      total: "₹34,22,000 (est.)",
    },
    documents: [
      { title: "Title Clearance", status: "verified" },
      { title: "Building Approval", status: "verified" },
      { title: "RERA Registration", status: "verified" },
      { title: "Occupancy Certificate", status: "verified" },
    ],
    badge: "New Listing",
    images: ["/placeholder-property.jpg"],
  },
  {
    id: "3",
    slug: "crystal-farmlands-saswad",
    name: "Crystal Farmlands — Saswad",
    location: "Near Saswad, Pune district",
    locationArea: "Pune-Solapur Highway",
    type: "Land",
    price: "₹35,00,000",
    priceNumeric: 3500000,
    area: "1 acre",
    areaRange: "1 acre onwards",
    possession: "Immediate",
    highlights: [
      "10 min from Pune-Solapur highway",
      "Flat terrain, ready for development",
      "Bore well available",
      "Investment-grade with 15%+ annual appreciation",
      "NA conversion possible",
      "Scenic surroundings",
    ],
    description:
      "Crystal Farmlands presents a rare investment opportunity near Saswad in Pune district. These agricultural land parcels offer flat terrain with bore well availability and are just 10 minutes from the Pune-Solapur highway. With NA conversion possibility and consistent 15%+ annual appreciation, this is an ideal investment for those looking at long-term wealth creation through land banking.",
    amenities: [
      "Bore Well",
      "Road Access",
      "Electricity",
      "Fencing",
      "Flat Terrain",
      "Water Source",
    ],
    nearbyPlaces: [
      { name: "Pune-Solapur Highway", distance: "10 min" },
      { name: "Saswad Town", distance: "8 km" },
      { name: "Pune City", distance: "35 km" },
      { name: "Nearest Village", distance: "2 km" },
    ],
    priceBreakdown: {
      basePrice: "₹35,00,000 per acre",
      stampDuty: "₹2,10,000 (est.)",
      registration: "₹30,000 (est.)",
      total: "₹37,40,000 (est.)",
    },
    documents: [
      { title: "7/12 Extract", status: "verified" },
      { title: "Title Clearance", status: "verified" },
      { title: "NA Conversion", status: "pending" },
      { title: "Mutation Entry", status: "verified" },
    ],
    badge: "Price Rising",
    images: ["/placeholder-property.jpg"],
  },
  {
    id: "4",
    slug: "crystal-commerce-solapur",
    name: "Crystal Commerce — Solapur",
    location: "Solapur, Hotgi Road",
    locationArea: "Solapur City",
    type: "Commercial",
    price: "₹18,00,000",
    priceNumeric: 1800000,
    area: "250 sqft",
    areaRange: "250 - 500 sqft",
    possession: "Ready Possession",
    rera: "P52100078901",
    highlights: [
      "Main road facing shop",
      "Ground floor unit",
      "Ideal for retail or office",
      "High footfall area",
      "Ready possession available",
      "Ample parking space",
    ],
    description:
      "Crystal Commerce offers premium commercial spaces on Hotgi Road, one of Solapur's busiest commercial corridors. These ground-floor shops are main road facing with excellent visibility and high footfall. Ideal for retail businesses, offices, or clinics. Ready possession available with clear documentation.",
    amenities: [
      "Parking",
      "Electricity",
      "Water Supply",
      "Security",
      "Fire Safety",
      "Lift Access",
    ],
    nearbyPlaces: [
      { name: "Hotgi Road Main", distance: "On Road" },
      { name: "Railway Station", distance: "6 km" },
      { name: "MIDC", distance: "4 km" },
      { name: "Bus Stand", distance: "5 km" },
    ],
    priceBreakdown: {
      basePrice: "₹18,00,000",
      stampDuty: "₹1,08,000 (est.)",
      registration: "₹30,000 (est.)",
      total: "₹19,38,000 (est.)",
    },
    documents: [
      { title: "Title Clearance", status: "verified" },
      { title: "Building Approval", status: "verified" },
      { title: "RERA Registration", status: "verified" },
      { title: "Completion Certificate", status: "verified" },
    ],
    badge: "High Demand",
    images: ["/placeholder-property.jpg"],
  },
  {
    id: "5",
    slug: "crystal-greens-pmrda-belt",
    name: "Crystal Greens — PMRDA Belt",
    location: "Loni Kalbhor, Pune",
    locationArea: "PMRDA Belt",
    type: "Plot",
    price: "₹12,50,000",
    priceNumeric: 1250000,
    area: "1200 sqft",
    areaRange: "1200 - 2500 sqft",
    possession: "Immediate",
    rera: "P52100089012",
    highlights: [
      "PMRDA approved layout",
      "20 min from Pune city",
      "Close to IT hubs",
      "Club house & swimming pool",
      "Landscaped garden",
      "24/7 security with CCTV",
    ],
    description:
      "Crystal Greens is a premium plotted layout in the fast-growing PMRDA belt of Loni Kalbhor, Pune. Approved by PMRDA, this project offers plots ranging from 1200 to 2500 sqft with world-class amenities including a club house, swimming pool, and landscaped gardens. Just 20 minutes from Pune city and close to major IT hubs, this is the perfect blend of urban connectivity and peaceful living.",
    amenities: [
      "Club House",
      "Swimming Pool",
      "Garden",
      "Security",
      "CCTV",
      "Internal Roads",
      "Street Lights",
      "Children's Play Area",
      "Jogging Track",
      "Water Supply",
      "Electricity",
      "Drainage",
    ],
    nearbyPlaces: [
      { name: "Pune City", distance: "20 min" },
      { name: "Magarpatta IT Park", distance: "15 min" },
      { name: "Pune Airport", distance: "25 min" },
      { name: "Loni Kalbhor Station", distance: "5 min" },
      { name: "Nearest Hospital", distance: "10 min" },
      { name: "International School", distance: "8 min" },
    ],
    priceBreakdown: {
      basePrice: "₹12,50,000",
      stampDuty: "₹75,000 (est.)",
      registration: "₹30,000 (est.)",
      total: "₹13,55,000 (est.)",
    },
    documents: [
      { title: "Title Clearance", status: "verified" },
      { title: "PMRDA Approval", status: "verified" },
      { title: "RERA Registration", status: "verified" },
      { title: "Layout Approval", status: "verified" },
    ],
    badge: "New Listing",
    images: ["/placeholder-property.jpg"],
  },
  {
    id: "6",
    slug: "crystal-heights-wagholi",
    name: "Crystal Heights — Wagholi",
    location: "Wagholi, Pune",
    locationArea: "PMRDA Belt",
    type: "Flat",
    price: "₹45,00,000",
    priceNumeric: 4500000,
    area: "850 sqft",
    areaRange: "850 - 1350 sqft",
    bedrooms: 2,
    bathrooms: 2,
    floor: "Ground + 7",
    facing: "West",
    possession: "Dec 2026",
    rera: "P52100090123",
    highlights: [
      "Gated community",
      "Gymnasium & fitness center",
      "Children's play area",
      "24/7 security with intercom",
      "Close to EON IT Park",
      "Clubhouse with multipurpose hall",
    ],
    description:
      "Crystal Heights is a premium residential project in Wagholi, Pune offering spacious 2 & 3 BHK flats in a gated community. Located close to EON IT Park and major employment hubs, this project offers modern amenities including a gymnasium, children's play area, and 24/7 security. Ideal for IT professionals and young families looking for a well-connected home in Pune's eastern corridor.",
    amenities: [
      "Gated Community",
      "Gymnasium",
      "Children's Play Area",
      "24/7 Security",
      "Intercom",
      "Club House",
      "Swimming Pool",
      "Parking",
      "Power Backup",
      "Rain Water Harvesting",
      "Fire Safety",
      "Lift",
    ],
    nearbyPlaces: [
      { name: "EON IT Park", distance: "10 min" },
      { name: "Kharadi IT Hub", distance: "15 min" },
      { name: "Pune Airport", distance: "20 min" },
      { name: "Aga Khan Hospital", distance: "12 min" },
      { name: "Wagholi Market", distance: "5 min" },
      { name: "International School", distance: "8 min" },
    ],
    priceBreakdown: {
      basePrice: "₹45,00,000",
      stampDuty: "₹2,70,000 (est.)",
      registration: "₹30,000 (est.)",
      total: "₹48,00,000 (est.)",
    },
    documents: [
      { title: "Title Clearance", status: "verified" },
      { title: "Building Approval", status: "verified" },
      { title: "RERA Registration", status: "verified" },
      { title: "Environmental Clearance", status: "verified" },
    ],
    badge: "Price Rising",
    images: ["/placeholder-property.jpg"],
  },
];

export const propertyTypes = ["All", "Plot", "Row House", "Flat", "Commercial", "Land"] as const;
export const locations = [
  "All",
  "Solapur City",
  "Pune-Solapur Highway",
  "PMRDA Belt",
  "Solapur Outskirts",
] as const;
export const budgetRanges = [
  "All",
  "Under ₹10L",
  "₹10L - ₹25L",
  "₹25L - ₹50L",
  "₹50L - ₹1Cr",
  "₹1Cr+",
] as const;
