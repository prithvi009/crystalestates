import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { properties as seedProperties } from "@/data/properties";

const DATA_FILE = join(process.cwd(), "data", "properties.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "crystal2026";

interface PropertyData {
  id: string;
  slug: string;
  name: string;
  location: string;
  locationArea: string;
  type: string;
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
  badge?: string;
  images: string[];
}

function authorize(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token === ADMIN_PASSWORD;
}

function ensureDataFile() {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, JSON.stringify(seedProperties, null, 2));
  }
}

function readProperties(): PropertyData[] {
  ensureDataFile();
  const raw = readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeProperties(data: PropertyData[]) {
  ensureDataFile();
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all properties
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const properties = readProperties();
    return NextResponse.json({ properties });
  } catch (error) {
    console.error("[Admin API]", error);
    return NextResponse.json({ error: "Failed to load properties" }, { status: 500 });
  }
}

// POST - create new property
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const properties = readProperties();

    const maxId = properties.reduce((max, p) => Math.max(max, Number(p.id)), 0);
    const newProperty: PropertyData = {
      ...body,
      id: String(maxId + 1),
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      highlights: body.highlights || [],
      amenities: body.amenities || [],
      images: body.images || ["/placeholder-property.jpg"],
    };

    properties.push(newProperty);
    writeProperties(properties);

    return NextResponse.json({ success: true, property: newProperty });
  } catch (error) {
    console.error("[Admin API]", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}

// PUT - update property
export async function PUT(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    const properties = readProperties();
    const index = properties.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    properties[index] = { ...properties[index], ...updates };
    writeProperties(properties);

    return NextResponse.json({ success: true, property: properties[index] });
  } catch (error) {
    console.error("[Admin API]", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

// DELETE - delete property
export async function DELETE(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    const properties = readProperties();
    const filtered = properties.filter((p) => p.id !== id);

    if (filtered.length === properties.length) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    writeProperties(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Admin API]", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
