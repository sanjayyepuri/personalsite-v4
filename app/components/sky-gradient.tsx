'use client'

import { useEffect, useState } from 'react'
import renderGradient from '../lib/gradient'
import  { getPosition }  from "suncalc"

interface SkyGradientProps {
  className?: string
  updateInterval?: number // Update interval in milliseconds
  latitude?: number
  longitude?: number
}

const locations = {
  nyc: { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
  india: { name: 'India', latitude: 20.5937, longitude: 78.9629 }
}

export default function SkyGradient({
  className = '',
  updateInterval = 60000, // Update every minute by default
}: SkyGradientProps) {
  const [gradient, setGradient] = useState<string>('')
  const [currentLocation, setCurrentLocation] = useState<'nyc' | 'india'>('nyc')

  useEffect(() => {
    const updateGradient = () => {
      const now = new Date()
      const location = locations[currentLocation]
      const solarElevation = getPosition(now, location.latitude, location.longitude)
      const [gradientString] = renderGradient(solarElevation.altitude)
      setGradient(gradientString)

      // Update theme based on solar elevation
      const isDark = solarElevation.altitude < 0 // Night time if sun is below horizon
      console.log(`${location.name} - Solar elevation:`, solarElevation.altitude, 'isDark:', isDark)
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    // Update immediately
    updateGradient()

    // Set up interval for updates
    const interval = setInterval(updateGradient, updateInterval)

    return () => clearInterval(interval)
  }, [currentLocation, updateInterval])

  return (
    <div
      className={`sky-gradient ${className}`}
      style={{
        background: gradient,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}
