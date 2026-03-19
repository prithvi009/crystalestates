import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/db/queries";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "crystal2026";

function authorize(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token === ADMIN_PASSWORD;
}

// GET all properties
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const props = await getAllProperties();
    return NextResponse.json({ properties: props });
  } catch (error) {
    console.error("[Admin API] GET error:", error);
    return NextResponse.json(
      { error: "Failed to load properties" },
      { status: 500 }
    );
  }
}

// POST - create new property
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newProperty = await createProperty({
      slug,
      name: body.name,
      location: body.location,
      locationArea: body.locationArea,
      type: body.type,
      price: body.price,
      priceNumeric: Number(body.priceNumeric),
      area: body.area || "",
      areaRange: body.areaRange || "",
      bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
      bathrooms: body.bathrooms ? Number(body.bathrooms) : null,
      floor: body.floor || null,
      facing: body.facing || null,
      possession: body.possession || "",
      rera: body.rera || null,
      highlights: body.highlights || [],
      description: body.description || "",
      amenities: body.amenities || [],
      nearbyPlaces: body.nearbyPlaces || [],
      priceBreakdown: body.priceBreakdown || {},
      documents: body.documents || [],
      badge: body.badge || null,
      images: body.images && body.images.length > 0 ? body.images : ["/placeholder-property.jpg"],
      floorPlanUrl: body.floorPlanUrl || null,
      videoUrl: body.videoUrl || null,
      latitude: body.latitude || null,
      longitude: body.longitude || null,
      builderName: body.builderName || null,
      reraValidTill: body.reraValidTill || null,
      carpetArea: body.carpetArea || null,
      superBuiltUpArea: body.superBuiltUpArea || null,
      maintenanceCharge: body.maintenanceCharge || null,
      bookingAmount: body.bookingAmount || null,
    });

    revalidatePath("/properties");
    revalidatePath(`/properties/${slug}`);

    return NextResponse.json({ success: true, property: newProperty });
  } catch (error) {
    console.error("[Admin API] POST error:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const existing = await getPropertyById(Number(id));
    if (!existing) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Build clean update payload
    const data: Record<string, unknown> = {};
    if (updates.name !== undefined) data.name = updates.name;
    if (updates.slug !== undefined) data.slug = updates.slug;
    if (updates.location !== undefined) data.location = updates.location;
    if (updates.locationArea !== undefined) data.locationArea = updates.locationArea;
    if (updates.type !== undefined) data.type = updates.type;
    if (updates.price !== undefined) data.price = updates.price;
    if (updates.priceNumeric !== undefined) data.priceNumeric = Number(updates.priceNumeric);
    if (updates.area !== undefined) data.area = updates.area;
    if (updates.areaRange !== undefined) data.areaRange = updates.areaRange;
    if (updates.bedrooms !== undefined) data.bedrooms = updates.bedrooms ? Number(updates.bedrooms) : null;
    if (updates.bathrooms !== undefined) data.bathrooms = updates.bathrooms ? Number(updates.bathrooms) : null;
    if (updates.floor !== undefined) data.floor = updates.floor || null;
    if (updates.facing !== undefined) data.facing = updates.facing || null;
    if (updates.possession !== undefined) data.possession = updates.possession;
    if (updates.rera !== undefined) data.rera = updates.rera || null;
    if (updates.highlights !== undefined) data.highlights = updates.highlights;
    if (updates.description !== undefined) data.description = updates.description;
    if (updates.amenities !== undefined) data.amenities = updates.amenities;
    if (updates.nearbyPlaces !== undefined) data.nearbyPlaces = updates.nearbyPlaces;
    if (updates.priceBreakdown !== undefined) data.priceBreakdown = updates.priceBreakdown;
    if (updates.documents !== undefined) data.documents = updates.documents;
    if (updates.badge !== undefined) data.badge = updates.badge || null;
    if (updates.images !== undefined) data.images = updates.images;
    if (updates.floorPlanUrl !== undefined) data.floorPlanUrl = updates.floorPlanUrl || null;
    if (updates.videoUrl !== undefined) data.videoUrl = updates.videoUrl || null;
    if (updates.latitude !== undefined) data.latitude = updates.latitude || null;
    if (updates.longitude !== undefined) data.longitude = updates.longitude || null;
    if (updates.builderName !== undefined) data.builderName = updates.builderName || null;
    if (updates.reraValidTill !== undefined) data.reraValidTill = updates.reraValidTill || null;
    if (updates.carpetArea !== undefined) data.carpetArea = updates.carpetArea || null;
    if (updates.superBuiltUpArea !== undefined) data.superBuiltUpArea = updates.superBuiltUpArea || null;
    if (updates.maintenanceCharge !== undefined) data.maintenanceCharge = updates.maintenanceCharge || null;
    if (updates.bookingAmount !== undefined) data.bookingAmount = updates.bookingAmount || null;

    const updated = await updateProperty(Number(id), data);

    revalidatePath("/properties");
    revalidatePath(`/properties/${updated.slug}`);
    // Also revalidate old slug if it changed
    if (existing.slug !== updated.slug) {
      revalidatePath(`/properties/${existing.slug}`);
    }

    return NextResponse.json({ success: true, property: updated });
  } catch (error) {
    console.error("[Admin API] PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const existing = await getPropertyById(Number(id));
    if (!existing) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    await deleteProperty(Number(id));

    revalidatePath("/properties");
    revalidatePath(`/properties/${existing.slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Admin API] DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
