"use client";

import { useState, useEffect, useCallback, useRef, DragEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NearbyPlace {
  name: string;
  distance: string;
}

interface DocItem {
  title: string;
  status: string;
}

interface PriceBreakdown {
  basePrice?: string;
  stampDuty?: string;
  registration?: string;
  total?: string;
}

interface Property {
  id: number;
  slug: string;
  name: string;
  location: string;
  locationArea: string;
  type: string;
  price: string;
  priceNumeric: number;
  area: string;
  areaRange: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  floor?: string | null;
  facing?: string | null;
  possession: string;
  rera?: string | null;
  highlights: string[];
  description: string;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  priceBreakdown: PriceBreakdown;
  documents: DocItem[];
  badge?: string | null;
  images: string[];
  floorPlanUrl?: string | null;
  brochureUrl?: string | null;
  videoUrl?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  builderName?: string | null;
  reraValidTill?: string | null;
  carpetArea?: string | null;
  superBuiltUpArea?: string | null;
  maintenanceCharge?: string | null;
  bookingAmount?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PROPERTY_TYPES = ["Plot", "Row House", "Flat", "Commercial", "Land"];
const LOCATION_AREAS = [
  "Pune City",
  "PMRDA Belt",
  "Talegaon-Chakan",
  "Hinjewadi-Wakad",
  "Baner-Balewadi",
  "Kharadi-Viman Nagar",
  "Wagholi",
  "Loni Kalbhor",
  "Mumbai - Andheri",
  "Mumbai - Thane",
  "Mumbai - Navi Mumbai",
  "Mumbai - Panvel",
  "Mumbai - Kharghar",
  "Mumbai - Ulwe",
  "Nashik",
  "Aurangabad",
  "Kolhapur",
  "Nagpur",
];
const BADGES = ["", "High Demand", "New Listing", "Price Rising"];
const DOC_STATUSES = ["Available", "Applied", "Pending", "Not Available"];

interface FormData {
  slug: string;
  name: string;
  location: string;
  locationArea: string;
  type: string;
  price: string;
  priceNumeric: number;
  area: string;
  areaRange: string;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: string;
  facing: string;
  possession: string;
  rera: string;
  highlights: string[];
  description: string;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  priceBreakdown: PriceBreakdown;
  documents: DocItem[];
  badge: string;
  images: string[];
  floorPlanUrl: string;
  brochureUrl: string;
  videoUrl: string;
  latitude: string;
  longitude: string;
  builderName: string;
  reraValidTill: string;
  carpetArea: string;
  superBuiltUpArea: string;
  maintenanceCharge: string;
  bookingAmount: string;
}

const emptyForm: FormData = {
  slug: "",
  name: "",
  location: "",
  locationArea: "",
  type: "Plot",
  price: "",
  priceNumeric: 0,
  area: "",
  areaRange: "",
  bedrooms: null,
  bathrooms: null,
  floor: "",
  facing: "",
  possession: "",
  rera: "",
  highlights: [],
  description: "",
  amenities: [],
  nearbyPlaces: [],
  priceBreakdown: {},
  documents: [],
  badge: "",
  images: [],
  floorPlanUrl: "",
  brochureUrl: "",
  videoUrl: "",
  latitude: "",
  longitude: "",
  builderName: "",
  reraValidTill: "",
  carpetArea: "",
  superBuiltUpArea: "",
  maintenanceCharge: "",
  bookingAmount: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function propertyToForm(p: Property): FormData {
  return {
    slug: p.slug,
    name: p.name,
    location: p.location,
    locationArea: p.locationArea,
    type: p.type,
    price: p.price,
    priceNumeric: p.priceNumeric,
    area: p.area,
    areaRange: p.areaRange,
    bedrooms: p.bedrooms ?? null,
    bathrooms: p.bathrooms ?? null,
    floor: p.floor ?? "",
    facing: p.facing ?? "",
    possession: p.possession,
    rera: p.rera ?? "",
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    description: p.description,
    amenities: Array.isArray(p.amenities) ? p.amenities : [],
    nearbyPlaces: Array.isArray(p.nearbyPlaces) ? p.nearbyPlaces : [],
    priceBreakdown: p.priceBreakdown && typeof p.priceBreakdown === "object" ? p.priceBreakdown : {},
    documents: Array.isArray(p.documents) ? p.documents : [],
    badge: p.badge ?? "",
    images: Array.isArray(p.images) ? p.images : [],
    floorPlanUrl: p.floorPlanUrl ?? "",
    brochureUrl: p.brochureUrl ?? "",
    videoUrl: p.videoUrl ?? "",
    latitude: p.latitude ?? "",
    longitude: p.longitude ?? "",
    builderName: p.builderName ?? "",
    reraValidTill: p.reraValidTill ?? "",
    carpetArea: p.carpetArea ?? "",
    superBuiltUpArea: p.superBuiltUpArea ?? "",
    maintenanceCharge: p.maintenanceCharge ?? "",
    bookingAmount: p.bookingAmount ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  Reusable UI pieces                                                 */
/* ------------------------------------------------------------------ */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  FileUploadZone                                                     */
/* ------------------------------------------------------------------ */

function FileUploadZone({
  onUpload,
  accept,
  label,
  currentUrl,
  multiple,
  authToken,
}: {
  onUpload: (url: string) => void;
  accept: string;
  label: string;
  currentUrl?: string;
  multiple?: boolean;
  authToken: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const fd = new globalThis.FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      onUpload(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    if (multiple) {
      fileArray.forEach((f) => uploadFile(f));
    } else if (fileArray.length > 0) {
      uploadFile(fileArray[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-amber-500 bg-amber-50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">{label}</span>
            <span className="text-xs text-gray-400">Drag & drop or click to browse</span>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
      {currentUrl && !multiple && (
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="truncate max-w-xs">{currentUrl}</span>
        </div>
      )}
    </div>
  );
}

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
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [editing, setEditing] = useState<Property | null>(null);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Media section: toggle between upload and URL input for images
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [imageUrlInput, setImageUrlInput] = useState("");

  /* ---------- Fetch ---------- */

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
      showMessage("Failed to load properties", "error");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (authed) fetchProperties();
  }, [authed, fetchProperties]);

  /* ---------- Messages ---------- */

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  /* ---------- Auth ---------- */

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

  /* ---------- Save ---------- */

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
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

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save");
      }

      showMessage(editing ? "Property updated successfully!" : "Property created successfully!", "success");
      setEditing(null);
      setAdding(false);
      setFormData(emptyForm);
      await fetchProperties();
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to save. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Delete ---------- */

  const handleDelete = async (id: number) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/properties?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      showMessage("Property deleted", "success");
      setDeleteConfirm(null);
      if (editing && editing.id === id) {
        setEditing(null);
        setFormData(emptyForm);
      }
      await fetchProperties();
    } catch {
      showMessage("Failed to delete", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Form helpers ---------- */

  const startEdit = (p: Property) => {
    setEditing(p);
    setAdding(false);
    setFormData(propertyToForm(p));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setFormData(emptyForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelForm = () => {
    setEditing(null);
    setAdding(false);
    setFormData(emptyForm);
  };

  const updateField = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------- Image helpers ---------- */

  const addImageUrl = (url: string) => {
    if (!url.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url.trim()],
    }));
  };

  const removeImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const moveImage = (idx: number, direction: "up" | "down") => {
    setFormData((prev) => {
      const imgs = [...prev.images];
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= imgs.length) return prev;
      [imgs[idx], imgs[targetIdx]] = [imgs[targetIdx], imgs[idx]];
      return { ...prev, images: imgs };
    });
  };

  /* ---------- Dynamic row helpers ---------- */

  const addNearbyPlace = () => {
    setFormData((prev) => ({
      ...prev,
      nearbyPlaces: [...prev.nearbyPlaces, { name: "", distance: "" }],
    }));
  };

  const removeNearbyPlace = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      nearbyPlaces: prev.nearbyPlaces.filter((_, i) => i !== idx),
    }));
  };

  const updateNearbyPlace = (idx: number, field: keyof NearbyPlace, value: string) => {
    setFormData((prev) => ({
      ...prev,
      nearbyPlaces: prev.nearbyPlaces.map((np, i) =>
        i === idx ? { ...np, [field]: value } : np
      ),
    }));
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, { title: "", status: "Available" }],
    }));
  };

  const removeDocument = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== idx),
    }));
  };

  const updateDocument = (idx: number, field: keyof DocItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.map((d, i) =>
        i === idx ? { ...d, [field]: value } : d
      ),
    }));
  };

  const updatePriceBreakdown = (field: keyof PriceBreakdown, value: string) => {
    setFormData((prev) => ({
      ...prev,
      priceBreakdown: { ...prev.priceBreakdown, [field]: value },
    }));
  };

  /* ================================================================ */
  /*  LOGIN SCREEN                                                     */
  /* ================================================================ */

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

  /* ================================================================ */
  /*  MAIN ADMIN PANEL                                                 */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Property Manager</h1>
            <p className="text-xs text-gray-500">
              {properties.length} propert{properties.length === 1 ? "y" : "ies"} in database
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={startAdd}
              className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              + Add Property
            </button>
            <button
              onClick={() => fetchProperties()}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                setAuthed(false);
                setPassword("");
              }}
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
          <div
            className={`mb-4 px-4 py-3 rounded-lg text-sm flex items-center justify-between ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-2 font-bold">
              &times;
            </button>
          </div>
        )}

        {/* ========== EDIT / ADD FORM ========== */}
        {(editing || adding) && (
          <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {editing ? `Editing: ${editing.name}` : "Add New Property"}
            </h2>

            {/* ---- Section: Basic Info ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Basic Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <Label>Property Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(v) => updateField("name", v)}
                    placeholder="Crystal Heights --- Panvel"
                  />
                </div>
                <div>
                  <Label>Slug (auto-generated if empty)</Label>
                  <Input
                    value={formData.slug}
                    onChange={(v) => updateField("slug", v)}
                    placeholder="crystal-heights-panvel"
                  />
                </div>
                <div>
                  <Label>Type *</Label>
                  <select
                    value={formData.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Location (display) *</Label>
                  <Input
                    value={formData.location}
                    onChange={(v) => updateField("location", v)}
                    placeholder="Thane West, Mumbai Metropolitan Region"
                  />
                </div>
                <div>
                  <Label>Location Area (filter) — type or pick</Label>
                  <input
                    type="text"
                    list="location-area-options"
                    value={formData.locationArea}
                    onChange={(e) => updateField("locationArea", e.target.value)}
                    placeholder="Type or select a location area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <datalist id="location-area-options">
                    {LOCATION_AREAS.map((l) => (
                      <option key={l} value={l} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <Label>Price (display) *</Label>
                  <Input
                    value={formData.price}
                    onChange={(v) => updateField("price", v)}
                    placeholder="₹85,00,000"
                  />
                </div>
                <div>
                  <Label>Price Numeric (for filters)</Label>
                  <Input
                    value={formData.priceNumeric}
                    onChange={(v) => updateField("priceNumeric", Number(v))}
                    type="number"
                    placeholder="8500000"
                  />
                </div>
                <div>
                  <Label>Area</Label>
                  <Input
                    value={formData.area}
                    onChange={(v) => updateField("area", v)}
                    placeholder="950 sqft"
                  />
                </div>
                <div>
                  <Label>Area Range</Label>
                  <Input
                    value={formData.areaRange}
                    onChange={(v) => updateField("areaRange", v)}
                    placeholder="950 - 1450 sqft"
                  />
                </div>
              </div>
            </fieldset>

            {/* ---- Section: Details ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Property Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Bedrooms</Label>
                  <Input
                    value={formData.bedrooms ?? ""}
                    onChange={(v) => updateField("bedrooms", v ? Number(v) : null)}
                    type="number"
                  />
                </div>
                <div>
                  <Label>Bathrooms</Label>
                  <Input
                    value={formData.bathrooms ?? ""}
                    onChange={(v) => updateField("bathrooms", v ? Number(v) : null)}
                    type="number"
                  />
                </div>
                <div>
                  <Label>Floor</Label>
                  <Input
                    value={formData.floor}
                    onChange={(v) => updateField("floor", v)}
                    placeholder="Ground + 7"
                  />
                </div>
                <div>
                  <Label>Facing</Label>
                  <Input
                    value={formData.facing}
                    onChange={(v) => updateField("facing", v)}
                    placeholder="East / West / North"
                  />
                </div>
                <div>
                  <Label>Possession *</Label>
                  <Input
                    value={formData.possession}
                    onChange={(v) => updateField("possession", v)}
                    placeholder="Ready to Move / Dec 2026"
                  />
                </div>
                <div>
                  <Label>RERA Number</Label>
                  <Input
                    value={formData.rera}
                    onChange={(v) => updateField("rera", v)}
                    placeholder="P52100054321"
                  />
                </div>
                <div>
                  <Label>Badge</Label>
                  <select
                    value={formData.badge}
                    onChange={(e) => updateField("badge", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {BADGES.map((b) => (
                      <option key={b} value={b}>{b || "None"}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* ---- Section: Extended Details ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Extended Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Carpet Area</Label>
                  <Input
                    value={formData.carpetArea}
                    onChange={(v) => updateField("carpetArea", v)}
                    placeholder="780 sqft"
                  />
                </div>
                <div>
                  <Label>Super Built-Up Area</Label>
                  <Input
                    value={formData.superBuiltUpArea}
                    onChange={(v) => updateField("superBuiltUpArea", v)}
                    placeholder="1050 sqft"
                  />
                </div>
                <div>
                  <Label>Maintenance Charge</Label>
                  <Input
                    value={formData.maintenanceCharge}
                    onChange={(v) => updateField("maintenanceCharge", v)}
                    placeholder="₹3,500/month"
                  />
                </div>
                <div>
                  <Label>Booking Amount</Label>
                  <Input
                    value={formData.bookingAmount}
                    onChange={(v) => updateField("bookingAmount", v)}
                    placeholder="₹2,00,000"
                  />
                </div>
                <div>
                  <Label>Builder Name</Label>
                  <Input
                    value={formData.builderName}
                    onChange={(v) => updateField("builderName", v)}
                    placeholder="Crystal Developers Pvt. Ltd."
                  />
                </div>
                <div>
                  <Label>RERA Valid Till</Label>
                  <Input
                    value={formData.reraValidTill}
                    onChange={(v) => updateField("reraValidTill", v)}
                    placeholder="Dec 2027"
                  />
                </div>
              </div>
            </fieldset>

            {/* ---- Section: Content ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Content
              </legend>
              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Detailed description of the property..."
                  />
                </div>
                <div>
                  <Label>Highlights (one per line)</Label>
                  <textarea
                    value={formData.highlights.join("\n")}
                    onChange={(e) =>
                      updateField(
                        "highlights",
                        e.target.value.split("\n").filter(Boolean)
                      )
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder={"30ft & 40ft internal roads\nGated entry with 24/7 security\nWater + electricity connection"}
                  />
                </div>
                <div>
                  <Label>Amenities (comma-separated)</Label>
                  <input
                    type="text"
                    value={formData.amenities.join(", ")}
                    onChange={(e) =>
                      updateField(
                        "amenities",
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Swimming Pool, Gym, Security, Parking"
                  />
                </div>
              </div>
            </fieldset>

            {/* ---- Section: Media (UPGRADED) ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Media
              </legend>
              <div className="space-y-6">

                {/* 1. Property Images */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Property Images</Label>
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => setImageInputMode("upload")}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          imageInputMode === "upload"
                            ? "bg-white text-gray-900 shadow-sm font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputMode("url")}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          imageInputMode === "url"
                            ? "bg-white text-gray-900 shadow-sm font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        URL
                      </button>
                    </div>
                  </div>

                  {imageInputMode === "upload" ? (
                    <FileUploadZone
                      onUpload={(url) => addImageUrl(url)}
                      accept="image/*"
                      label="Drop images here"
                      multiple
                      authToken={password}
                    />
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addImageUrl(imageUrlInput);
                            setImageUrlInput("");
                          }
                        }}
                        placeholder="Paste image URL and press Enter"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          addImageUrl(imageUrlInput);
                          setImageUrlInput("");
                        }}
                        className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {/* Image preview grid */}
                  {formData.images.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 border border-gray-200"
                        >
                          <div className="w-16 h-12 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img}
                              alt={`Image ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          </div>
                          <span className="flex-1 text-xs text-gray-600 truncate">{img}</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => moveImage(idx, "up")}
                              disabled={idx === 0}
                              className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Move up"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => moveImage(idx, "down")}
                              disabled={idx === formData.images.length - 1}
                              className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Move down"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="p-1 text-red-400 hover:text-red-600"
                              title="Remove"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      <p className="text-xs text-gray-400">{formData.images.length} image{formData.images.length !== 1 ? "s" : ""}</p>
                    </div>
                  )}
                </div>

                {/* 2. Floor Plan */}
                <div>
                  <Label>Floor Plan (image or PDF)</Label>
                  <FileUploadZone
                    onUpload={(url) => updateField("floorPlanUrl", url)}
                    accept="image/*,.pdf"
                    label="Drop floor plan here"
                    currentUrl={formData.floorPlanUrl}
                    authToken={password}
                  />
                  <div className="mt-2">
                    <input
                      type="text"
                      value={formData.floorPlanUrl}
                      onChange={(e) => updateField("floorPlanUrl", e.target.value)}
                      placeholder="Or paste floor plan URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  {formData.floorPlanUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-20 h-14 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.floorPlanUrl}
                          alt="Floor plan preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 truncate">{formData.floorPlanUrl}</span>
                      <button
                        type="button"
                        onClick={() => updateField("floorPlanUrl", "")}
                        className="ml-auto text-xs text-red-500 hover:text-red-700"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Brochure / PDF */}
                <div>
                  <Label>Brochure / PDF</Label>
                  <FileUploadZone
                    onUpload={(url) => updateField("brochureUrl", url)}
                    accept=".pdf"
                    label="Drop brochure PDF here"
                    currentUrl={formData.brochureUrl}
                    authToken={password}
                  />
                  <div className="mt-2">
                    <input
                      type="text"
                      value={formData.brochureUrl}
                      onChange={(e) => updateField("brochureUrl", e.target.value)}
                      placeholder="Or paste brochure URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  {formData.brochureUrl && (
                    <div className="mt-2 flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <a
                        href={formData.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline truncate"
                      >
                        {formData.brochureUrl}
                      </a>
                      <button
                        type="button"
                        onClick={() => updateField("brochureUrl", "")}
                        className="ml-auto text-xs text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Video */}
                <div>
                  <Label>Video URL (YouTube / external link)</Label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(v) => updateField("videoUrl", v)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </fieldset>

            {/* ---- Section: Location Coordinates ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Location Coordinates
              </legend>
              <p className="text-xs text-gray-400 mb-3">
                Get coordinates from Google Maps: right-click a location and copy the lat/lng values.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Latitude</Label>
                  <Input
                    value={formData.latitude}
                    onChange={(v) => updateField("latitude", v)}
                    placeholder="19.0760"
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input
                    value={formData.longitude}
                    onChange={(v) => updateField("longitude", v)}
                    placeholder="72.8777"
                  />
                </div>
              </div>
            </fieldset>

            {/* ---- Section: Nearby Places ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Nearby Places
              </legend>
              <div className="space-y-3">
                {formData.nearbyPlaces.map((np, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={np.name}
                        onChange={(e) => updateNearbyPlace(idx, "name", e.target.value)}
                        placeholder="Place name (e.g., Railway Station)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="w-40">
                      <input
                        type="text"
                        value={np.distance}
                        onChange={(e) => updateNearbyPlace(idx, "distance", e.target.value)}
                        placeholder="Distance (e.g., 2 km)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNearbyPlace(idx)}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNearbyPlace}
                  className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  + Add Nearby Place
                </button>
              </div>
            </fieldset>

            {/* ---- Section: Documents ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Documents
              </legend>
              <div className="space-y-3">
                {formData.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={doc.title}
                        onChange={(e) => updateDocument(idx, "title", e.target.value)}
                        placeholder="Document title (e.g., Title Deed)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="w-44">
                      <select
                        value={doc.status}
                        onChange={(e) => updateDocument(idx, "status", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {DOC_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(idx)}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDocument}
                  className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  + Add Document
                </button>
              </div>
            </fieldset>

            {/* ---- Section: Price Breakdown ---- */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200 w-full">
                Price Breakdown
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>Base Price</Label>
                  <Input
                    value={formData.priceBreakdown.basePrice ?? ""}
                    onChange={(v) => updatePriceBreakdown("basePrice", v)}
                    placeholder="₹80,00,000"
                  />
                </div>
                <div>
                  <Label>Stamp Duty</Label>
                  <Input
                    value={formData.priceBreakdown.stampDuty ?? ""}
                    onChange={(v) => updatePriceBreakdown("stampDuty", v)}
                    placeholder="₹4,00,000"
                  />
                </div>
                <div>
                  <Label>Registration</Label>
                  <Input
                    value={formData.priceBreakdown.registration ?? ""}
                    onChange={(v) => updatePriceBreakdown("registration", v)}
                    placeholder="₹30,000"
                  />
                </div>
                <div>
                  <Label>Total</Label>
                  <Input
                    value={formData.priceBreakdown.total ?? ""}
                    onChange={(v) => updatePriceBreakdown("total", v)}
                    placeholder="₹84,30,000"
                  />
                </div>
              </div>
            </fieldset>

            {/* ---- Actions ---- */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving || !formData.name || !formData.price || !formData.location}
                className="px-6 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : editing ? "Update Property" : "Create Property"}
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
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Area</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Possession</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Badge</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">#{p.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">
                        {p.name}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {p.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">
                        {p.locationArea}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{p.price}</td>
                      <td className="px-4 py-3 text-gray-600">{p.area}</td>
                      <td className="px-4 py-3 text-gray-600">{p.possession}</td>
                      <td className="px-4 py-3">
                        {p.badge && (
                          <span
                            className={`inline-flex px-2 py-0.5 text-xs rounded-full font-medium ${
                              p.badge === "High Demand"
                                ? "bg-red-50 text-red-700"
                                : p.badge === "New Listing"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
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
                                disabled={saving}
                                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                              >
                                {saving ? "..." : "Confirm"}
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
