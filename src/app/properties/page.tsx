import { getAllProperties } from "@/lib/db/queries";
import PropertiesClient from "./PropertiesClient";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return <PropertiesClient properties={properties} />;
}
