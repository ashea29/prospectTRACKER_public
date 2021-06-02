import React, { useRef, useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader"

import './Map.css'


interface MapProps {
  lat: number
  lng: number
  className?: string
  style?: {}
}

const Map: React.FC<MapProps> = (props) => {
  const mapRef = useRef()

  const loader = new Loader({
    apiKey: process.env.MAPS_KEY,
    version: "weekly"
  })
  const coordinates = { lat: props.lat, lng: props.lng }

  useEffect(() => {
    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        center: coordinates,
        zoom: 14,
      });
  
      const marker = new google.maps.Marker({position: coordinates, map: map})
    })
  }, [coordinates])

  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
  )
}

export default Map
