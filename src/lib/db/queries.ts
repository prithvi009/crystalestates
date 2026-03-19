import { db } from "./index";
import { properties, type Property, type NewProperty } from "./schema";
import { eq, desc, ne, and, sql } from "drizzle-orm";

/* ------------------------------------------------------------------ */
/*  Read queries                                                       */
/* ------------------------------------------------------------------ */

export async function getAllProperties(): Promise<Property[]> {
  return db.select().from(properties).orderBy(desc(properties.createdAt));
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.id, id))
    .limit(1);
  return rows[0];
}

export async function getRelatedProperties(
  currentId: number,
  locationArea: string,
  limit = 3
): Promise<Property[]> {
  // First try same area, then fall back to any
  const sameArea = await db
    .select()
    .from(properties)
    .where(
      and(
        ne(properties.id, currentId),
        eq(properties.locationArea, locationArea)
      )
    )
    .limit(limit);

  if (sameArea.length >= limit) return sameArea;

  const others = await db
    .select()
    .from(properties)
    .where(ne(properties.id, currentId))
    .limit(limit);

  return others;
}

export async function getAllPropertySlugs(): Promise<string[]> {
  const rows = await db
    .select({ slug: properties.slug })
    .from(properties);
  return rows.map((r) => r.slug);
}

/* ------------------------------------------------------------------ */
/*  Write queries                                                      */
/* ------------------------------------------------------------------ */

export async function createProperty(data: NewProperty): Promise<Property> {
  const rows = await db.insert(properties).values(data).returning();
  return rows[0];
}

export async function updateProperty(
  id: number,
  data: Partial<NewProperty>
): Promise<Property> {
  const rows = await db
    .update(properties)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(properties.id, id))
    .returning();
  return rows[0];
}

export async function deleteProperty(id: number): Promise<void> {
  await db.delete(properties).where(eq(properties.id, id));
}

export async function getPropertyCount(): Promise<number> {
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(properties);
  return Number(rows[0].count);
}
