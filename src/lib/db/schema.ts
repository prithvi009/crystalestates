import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ */
/*  Enums                                                              */
/* ------------------------------------------------------------------ */

export const propertyTypeEnum = pgEnum("property_type", [
  "Plot",
  "Row House",
  "Flat",
  "Commercial",
  "Land",
]);

export const badgeEnum = pgEnum("badge_type", [
  "High Demand",
  "New Listing",
  "Price Rising",
]);

/* ------------------------------------------------------------------ */
/*  Properties Table                                                    */
/* ------------------------------------------------------------------ */

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 500 }).notNull(),
  location: text("location").notNull(),
  locationArea: varchar("location_area", { length: 255 }).notNull(),
  type: propertyTypeEnum("type").notNull(),
  price: varchar("price", { length: 50 }).notNull(),
  priceNumeric: integer("price_numeric").notNull(),
  area: varchar("area", { length: 100 }).notNull(),
  areaRange: varchar("area_range", { length: 100 }).notNull().default(""),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  floor: varchar("floor", { length: 50 }),
  facing: varchar("facing", { length: 50 }),
  possession: varchar("possession", { length: 100 }).notNull(),
  rera: varchar("rera", { length: 100 }),
  highlights: jsonb("highlights").notNull().default([]),
  description: text("description").notNull().default(""),
  amenities: jsonb("amenities").notNull().default([]),
  nearbyPlaces: jsonb("nearby_places").notNull().default([]),
  priceBreakdown: jsonb("price_breakdown").notNull().default({}),
  documents: jsonb("documents").notNull().default([]),
  badge: badgeEnum("badge"),
  images: jsonb("images").notNull().default([]),
  // Extended fields for world-class detail page
  floorPlanUrl: text("floor_plan_url"),
  brochureUrl: text("brochure_url"),
  videoUrl: text("video_url"),
  latitude: varchar("latitude", { length: 20 }),
  longitude: varchar("longitude", { length: 20 }),
  builderName: varchar("builder_name", { length: 255 }),
  reraValidTill: varchar("rera_valid_till", { length: 50 }),
  carpetArea: varchar("carpet_area", { length: 100 }),
  superBuiltUpArea: varchar("super_built_up_area", { length: 100 }),
  maintenanceCharge: varchar("maintenance_charge", { length: 100 }),
  bookingAmount: varchar("booking_amount", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ------------------------------------------------------------------ */
/*  TypeScript types                                                    */
/* ------------------------------------------------------------------ */

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
