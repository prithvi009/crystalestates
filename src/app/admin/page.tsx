"use client";

import { useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Property {
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

const PROPERTY_TYPES = ["Plot", "Row House", "Flat", "Commercial", "Land"];
const LOCATION_AREAS = [
  "Solapur City",
  "Pune-Solapur Highway",
  "PMRDA Belt",
  "Solapur Outskirts",
  "Mumbai - Thane",
  "Mumbai - Navi Mumbai",
];
const BADGES = ["", "High Demand", "New Listing", "Price Rising"];

const emptyProperty: Omit<Property, "id"> = {
  slug: "",
  name: "",
  location: "",
  locationArea: "Solapur City",
  type: "Plot",
  price: "",
  priceNumeric: 0,
  area: "",
  areaRange: "",
  possession: "",
  rera: "",
  highlights: [],
  description: "",
  amenities: [],
  badge: "",
  images: ["/placeholder-property.jpg"],
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [editing, setEditing] = useState<Property | null>(null);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Property, "id">>(emptyProperty);

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load properties
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/properties", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProperties(data.properties);
    } catch {
      setMessage("Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (authed) fetchProperties();
  }, [authed, fetchProperties]);

  // Login
  const handleLogin = async () => {
    setAuthError("");
    try {
      const res = await fetch("/api/admin/properties", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        setAuthed(true);
      } else {
        setAuthError("Invalid password");
      }
    } catch {
      setAuthError("Connection failed");
    }
  };

  // Save (create or update)
  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const method = editing ? "PUT" : "POST";
      const body = editing ? { id: editing.id, ...formData } : formData;

      const res = await fetch("/api/admin/properties", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save");

      setMessage(editing ? "Property updated!" : "Property created!");
      setEditing(null);
      setAdding(false);
      setFormData(emptyProperty);
      await fetchProperties();
    } catch {
      setMessage("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/properties?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setMessage("Property deleted");
      setDeleteConfirm(null);
      await fetchProperties();
    } catch {
      setMessage("Failed to delete");
    } finally {
      setSaving(false);
    }
  };

  // Start editing
  const startEdit = (p: Property) => {
    setEditing(p);
    setAdding(false);
    setFormData({
      slug: p.slug,
      name: p.name,
      location: p.location,
      locationArea: p.locationArea,
      type: p.type,
      price: p.price,
      priceNumeric: p.priceNumeric,
      area: p.area,
      areaRange: p.areaRange,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      floor: p.floor,
      facing: p.facing,
      possession: p.possession,
      rera: p.rera,
      highlights: p.highlights,
      description: p.description,
      amenities: p.amenities,
      badge: p.badge,
      images: p.images,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setFormData(emptyProperty);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelForm = () => {
    setEditing(null);
    setAdding(false);
    setFormData(emptyProperty);
  };

  // Helper to update form
  const updateField = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ========== LOGIN SCREEN ========== */
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Panel</h1>
          <p className="text-sm text-gray-500 mb-6">Crystal Estates Property Manager</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            autoFocus
          />

          {authError && (
            <p className="mt-2 text-sm text-red-600">{authError}</p>
          )}

          <button
            onClick={handleLogin}
            className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  /* ========== MAIN ADMIN PANEL ========== */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Property Manager</h1>
            <p className="text-xs text-gray-500">{properties.length} properties listed</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={startAdd}
              className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              + Add Property
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword(""); }}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Status message */}
        {message && (
          <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            {message}
            <button onClick={() => setMessage("")} className="ml-2 font-bold">&times;</button>
          </div>
        )}

        {/* ========== EDIT/ADD FORM ========== */}
        {(editing || adding) && (
          <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editing ? `Editing: ${editing.name}` : "Add New Property"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Name */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Property Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Crystal Heights — Panvel"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Location (display) *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Thane West, Mumbai Metropolitan Region"
                />
              </div>

              {/* Location Area (filter) */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Location Area (filter)</label>
                <select
                  value={formData.locationArea}
                  onChange={(e) => updateField("locationArea", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {LOCATION_AREAS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Price (display) *</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="₹85,00,000"
                />
              </div>

              {/* Price Numeric */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Price Numeric (for filters)</label>
                <input
                  type="number"
                  value={formData.priceNumeric}
                  onChange={(e) => updateField("priceNumeric", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="8500000"
                />
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Area</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="950 sqft"
                />
              </div>

              {/* Area Range */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Area Range</label>
                <input
                  type="text"
                  value={formData.areaRange}
                  onChange={(e) => updateField("areaRange", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="950 - 1450 sqft"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={formData.bedrooms ?? ""}
                  onChange={(e) => updateField("bedrooms", e.target.value ? Number(e.target.value) : 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bathrooms</label>
                <input
                  type="number"
                  value={formData.bathrooms ?? ""}
                  onChange={(e) => updateField("bathrooms", e.target.value ? Number(e.target.value) : 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Possession */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Possession</label>
                <input
                  type="text"
                  value={formData.possession}
                  onChange={(e) => updateField("possession", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ready to Move / Dec 2026"
                />
              </div>

              {/* RERA */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">RERA Number</label>
                <input
                  type="text"
                  value={formData.rera ?? ""}
                  onChange={(e) => updateField("rera", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="P52100054321"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Badge</label>
                <select
                  value={formData.badge ?? ""}
                  onChange={(e) => updateField("badge", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {BADGES.map((b) => <option key={b} value={b}>{b || "None"}</option>)}
                </select>
              </div>

              {/* Floor */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Floor</label>
                <input
                  type="text"
                  value={formData.floor ?? ""}
                  onChange={(e) => updateField("floor", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ground + 7"
                />
              </div>

              {/* Facing */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Facing</label>
                <input
                  type="text"
                  value={formData.facing ?? ""}
                  onChange={(e) => updateField("facing", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="East / West / North"
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder="Detailed description of the property..."
                />
              </div>

              {/* Highlights */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Highlights (one per line)</label>
                <textarea
                  value={formData.highlights.join("\n")}
                  onChange={(e) => updateField("highlights", e.target.value.split("\n").filter(Boolean))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder={"30ft & 40ft internal roads\nGated entry with 24/7 security\nWater + electricity connection"}
                />
              </div>

              {/* Amenities */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={formData.amenities.join(", ")}
                  onChange={(e) => updateField("amenities", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Swimming Pool, Gym, Security, Parking"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving || !formData.name || !formData.price}
                className="px-6 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : editing ? "Update Property" : "Add Property"}
              </button>
              <button
                onClick={cancelForm}
                className="px-6 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ========== PROPERTY TABLE ========== */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading properties...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Location</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Price</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Possession</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Badge</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">#{p.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">{p.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {p.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">{p.locationArea}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{p.price}</td>
                      <td className="px-4 py-3 text-gray-600">{p.possession}</td>
                      <td className="px-4 py-3">
                        {p.badge && (
                          <span className={`inline-flex px-2 py-0.5 text-xs rounded-full font-medium ${
                            p.badge === "High Demand"
                              ? "bg-red-50 text-red-700"
                              : p.badge === "New Listing"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-green-50 text-green-700"
                          }`}>
                            {p.badge}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(p)}
                            className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 rounded-md hover:bg-amber-100 transition-colors"
                          >
                            Edit
                          </button>
                          {deleteConfirm === p.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {properties.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                No properties yet. Click &quot;Add Property&quot; to get started.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
