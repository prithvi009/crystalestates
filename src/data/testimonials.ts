export interface Testimonial {
  id: number;
  name: string;
  location: string;
  propertyType: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh P.",
    location: "Solapur",
    propertyType: "Highway Corridor Plot",
    quote:
      "Crystal Estates found us a plot near the highway corridor that has already appreciated 20% in just 8 months. Their market knowledge is unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sneha M.",
    location: "Dubai / Solapur",
    propertyType: "Residential Plot",
    quote:
      "As an NRI, buying property in India was my biggest fear. Crystal Estates handled everything — from title check to registration — while I was in Dubai.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit K.",
    location: "Pune",
    propertyType: "Row House",
    quote:
      "I compared 3 brokers. Crystal Estates was the only one who showed me a proper title report and RERA verification before asking for money.",
    rating: 5,
  },
  {
    id: 4,
    name: "Priya & Vikram S.",
    location: "Solapur",
    propertyType: "2 BHK Row House",
    quote:
      "We were first-time home buyers and completely clueless. Crystal Estates walked us through every step. Our dream home is now a reality!",
    rating: 5,
  },
  {
    id: 5,
    name: "Dr. Sandeep R.",
    location: "Pune",
    propertyType: "Commercial Shop",
    quote:
      "Bought a commercial property for my clinic through Crystal Estates. The documentation was transparent and the process was incredibly smooth.",
    rating: 4,
  },
  {
    id: 6,
    name: "Meena T.",
    location: "Mumbai / Solapur",
    propertyType: "Agricultural Land",
    quote:
      "Invested in farmland near Saswad on Crystal Estates' recommendation. Their investment report was spot-on. Already seeing great returns.",
    rating: 5,
  },
  {
    id: 7,
    name: "Ankit & Neha D.",
    location: "Thane",
    propertyType: "2 BHK Flat",
    quote:
      "We were searching for flats in Thane for months. Crystal Estates showed us options we hadn't found on any portal. Got a great deal on a 2 BHK with hill views!",
    rating: 5,
  },
  {
    id: 8,
    name: "Sanjay M.",
    location: "Navi Mumbai",
    propertyType: "Commercial Space",
    quote:
      "Bought a commercial shop in Kharghar through Crystal Estates. Their knowledge of the Navi Mumbai market and upcoming airport impact was incredibly helpful.",
    rating: 5,
  },
];

export const socialProofMessages = [
  { name: "Rajesh", city: "Pune", action: "booked a site visit for Highway Corridor Plot" },
  { name: "Priya", city: "Mumbai", action: "inquired about Crystal Greens PMRDA plots" },
  { name: "Vikram", city: "Solapur", action: "downloaded the investment report" },
  { name: "Sneha", city: "Dubai", action: "scheduled a virtual consultation" },
  { name: "Amit", city: "Pune", action: "booked a site visit for Crystal Heights Wagholi" },
  { name: "Dr. Sandeep", city: "Solapur", action: "inquired about Crystal Commerce shops" },
  { name: "Ankit", city: "Thane", action: "inquired about Crystal Towers 2 BHK flat" },
  { name: "Neha", city: "Navi Mumbai", action: "booked a site visit for Crystal Plaza Kharghar" },
  { name: "Sanjay", city: "Mumbai", action: "downloaded Navi Mumbai airport investment report" },
];
