"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Apartment } from "../data/listings"

// Fix Leaflet marker icon issue in Next.js
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Custom marker for university
const universityIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "university-marker", // Add custom class for styling
})

interface MapComponentProps {
  listings: Apartment[]
  center: { lat: number; lng: number }
  zoom: number
}

// Component to update map view when center changes
function ChangeView({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

export default function MapComponent({ listings, center, zoom }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)

  // Set up map when component mounts
  useEffect(() => {

  }, [])

  // Add custom styles for university marker
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = `
        .university-marker {
          filter: hue-rotate(120deg);
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])


  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ChangeView center={center} zoom={zoom} />

      {/* University marker */}
      <Marker position={[32.2227, 35.2621]} icon={universityIcon}>
        <Popup>
          <div className="text-sm">
            <strong>Najah National University</strong>
            <p>Main Campus</p>
          </div>
        </Popup>
      </Marker>

      {/* Apartment markers */}
      {listings.map((listing) => (
        <Marker key={listing.id} position={[listing.location.lat, listing.location.lng]} icon={markerIcon}>
          <Popup>
            <div className="text-sm">
              <strong>{listing.title}</strong>
              <p>
                {listing.neighborhood}, {listing.city}
              </p>
              <p className="font-semibold">${listing.price}/month</p>
              <p>
                {listing.bedrooms} bed, {listing.bathrooms} bath
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
