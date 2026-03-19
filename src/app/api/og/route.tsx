import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Crystal Estates";
  const price = searchParams.get("price") || "";
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";
  const area = searchParams.get("area") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const badge = searchParams.get("badge") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold gradient accent at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #8B7335, #C6A962, #8B7335)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 70px",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Top section */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Badge */}
            {badge && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    backgroundColor: badge === "High Demand" ? "#DC2626" : badge === "New Listing" ? "#2563EB" : "#16A34A",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "6px 16px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.15,
                margin: 0,
                maxWidth: "900px",
              }}
            >
              {title}
            </h1>

            {/* Location */}
            {location && (
              <p
                style={{
                  fontSize: "22px",
                  color: "#9CA3AF",
                  marginTop: "12px",
                  margin: "12px 0 0 0",
                }}
              >
                {location}
              </p>
            )}
          </div>

          {/* Bottom section */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            {/* Price + specs */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {price && (
                <span
                  style={{
                    fontSize: "44px",
                    fontWeight: 800,
                    color: "#C6A962",
                    lineHeight: 1,
                  }}
                >
                  {price}
                </span>
              )}

              {/* Spec pills */}
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                {type && (
                  <span style={{ background: "rgba(255,255,255,0.1)", color: "#D1D5DB", fontSize: "16px", padding: "8px 18px", borderRadius: "8px", fontWeight: 600 }}>
                    {type}
                  </span>
                )}
                {area && (
                  <span style={{ background: "rgba(255,255,255,0.1)", color: "#D1D5DB", fontSize: "16px", padding: "8px 18px", borderRadius: "8px", fontWeight: 600 }}>
                    {area}
                  </span>
                )}
                {bedrooms && (
                  <span style={{ background: "rgba(255,255,255,0.1)", color: "#D1D5DB", fontSize: "16px", padding: "8px 18px", borderRadius: "8px", fontWeight: 600 }}>
                    {bedrooms} BHK
                  </span>
                )}
              </div>
            </div>

            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.15em",
                }}
              >
                CRYSTAL ESTATES
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#C6A962",
                  letterSpacing: "0.2em",
                  marginTop: "4px",
                }}
              >
                PREMIUM REAL ESTATE
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
