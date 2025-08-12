'use client'

import { useEffect, useState } from 'react'

interface SkyBackgroundProps {
  className?: string
  enableAnimation?: boolean
}

export function SkyBackground({ className = '', enableAnimation = true }: SkyBackgroundProps) {
  const [timeOfDay, setTimeOfDay] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      setTimeOfDay(hours + minutes / 60)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getSkyColors = (time: number) => {
    // Time of day from 0-24 hours
    const normalizedTime = time / 24

    // Define sky color phases (more accurate to real sky colors)
    const phases = [
      // Midnight - deep night
      { time: 0, colors: ['#0A0A23', '#1A1A3A', '#2A2A5A'] },
      // Pre-dawn
      { time: 0.21, colors: ['#2A2A5A', '#3A3A6A', '#4A4A7A'] },
      // Dawn
      { time: 0.25, colors: ['#FF6B47', '#FF8C69', '#FFB07A'] },
      // Early morning
      { time: 0.33, colors: ['#87CEEB', '#B0E0E6', '#E0F6FF'] },
      // Late morning
      { time: 0.42, colors: ['#4A90E2', '#70A9F1', '#96C2FF'] },
      // Midday
      { time: 0.5, colors: ['#709DCC', '#87CEEB', '#A4D8F0'] },
      // Afternoon
      { time: 0.67, colors: ['#6BB6FF', '#87CEEB', '#A4D8F0'] },
      // Golden hour
      { time: 0.75, colors: ['#FFA500', '#FF7F50', '#FF6347'] },
      // Sunset
      { time: 0.79, colors: ['#FF4500', '#FF6347', '#FFB347'] },
      // Dusk
      { time: 0.83, colors: ['#4B0082', '#6A0DAD', '#8A2BE2'] },
      // Early night
      { time: 0.88, colors: ['#191970', '#2F2F6F', '#4F4F8F'] },
      // Night
      { time: 1, colors: ['#0A0A23', '#1A1A3A', '#2A2A5A'] }
    ]

    // Find the current phase
    let currentPhase = phases[0]
    let nextPhase = phases[1]

    for (let i = 0; i < phases.length - 1; i++) {
      if (normalizedTime >= phases[i].time && normalizedTime <= phases[i + 1].time) {
        currentPhase = phases[i]
        nextPhase = phases[i + 1]
        break
      }
    }

    // Interpolate between phases
    const phaseProgress = (normalizedTime - currentPhase.time) / (nextPhase.time - currentPhase.time)
    
    const interpolateColor = (color1: string, color2: string, factor: number) => {
      const hex1 = color1.replace('#', '')
      const hex2 = color2.replace('#', '')
      
      const r1 = parseInt(hex1.substr(0, 2), 16)
      const g1 = parseInt(hex1.substr(2, 2), 16)
      const b1 = parseInt(hex1.substr(4, 2), 16)
      
      const r2 = parseInt(hex2.substr(0, 2), 16)
      const g2 = parseInt(hex2.substr(2, 2), 16)
      const b2 = parseInt(hex2.substr(4, 2), 16)
      
      const r = Math.round(r1 + (r2 - r1) * factor)
      const g = Math.round(g1 + (g2 - g1) * factor)
      const b = Math.round(b1 + (b2 - b1) * factor)
      
      return `rgb(${r}, ${g}, ${b})`
    }

    return currentPhase.colors.map((color, index) => 
      interpolateColor(color, nextPhase.colors[index], phaseProgress)
    )
  }

  const [topColor, midColor, bottomColor] = getSkyColors(timeOfDay)

  const gradientStyle = {
    background: `linear-gradient(to bottom, ${topColor} 0%, ${topColor} 20%, ${midColor} 50%, ${bottomColor} 80%, ${bottomColor} 100%)`,
    animation: enableAnimation ? 'skyShift 60s ease-in-out infinite alternate' : 'none'
  }

  return (
    <>
      <div 
        className={`fixed inset-0 -z-50 transition-all duration-1000 ${className}`}
        style={gradientStyle}
      />
      
      {/* Stars for nighttime */}
      {timeOfDay < 6 || timeOfDay > 20 ? (
        <div className="fixed inset-0 -z-40 opacity-80">
          {Array.from({ length: 150 }, (_, i) => (
            <div
              key={i}
              className={`absolute bg-white rounded-full ${enableAnimation ? 'animate-pulse' : ''}`}
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                animationDelay: enableAnimation ? `${Math.random() * 5}s` : '0s',
                animationDuration: enableAnimation ? `${1.5 + Math.random() * 3}s` : '0s',
                opacity: 0.6 + Math.random() * 0.4
              }}
            />
          ))}
        </div>
      ) : null}
      
      {/* Clouds - only during day */}
      {timeOfDay >= 6 && timeOfDay <= 20 ? (
        <div className="fixed inset-0 -z-30 overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`absolute bg-white rounded-full ${enableAnimation ? 'animate-float' : ''}`}
              style={{
                width: `${80 + Math.random() * 120}px`,
                height: `${30 + Math.random() * 50}px`,
                left: `${Math.random() * 120 - 10}%`,
                top: `${Math.random() * 50}%`,
                opacity: 0.3 + Math.random() * 0.4,
                animationDelay: enableAnimation ? `${Math.random() * 20}s` : '0s',
                animationDuration: enableAnimation ? `${40 + Math.random() * 40}s` : '0s',
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      ) : null}
      
      {/* Sun/Moon */}
      <div className="fixed -z-20" style={{
        left: `${20 + (timeOfDay / 24) * 60}%`,
        top: `${30 + Math.sin((timeOfDay / 24) * Math.PI) * 20}%`,
        transition: 'all 2s ease-in-out'
      }}>
        {timeOfDay >= 6 && timeOfDay <= 18 ? (
          // Sun
          <div className={`w-16 h-16 bg-yellow-300 rounded-full shadow-lg shadow-yellow-200/50 ${enableAnimation ? 'animate-pulse' : ''}`} 
               style={{ 
                 filter: 'brightness(1.2)', 
                 boxShadow: '0 0 30px rgba(255, 255, 0, 0.5)' 
               }} />
        ) : (
          // Moon
          <div className="w-12 h-12 bg-gray-100 rounded-full shadow-lg" 
               style={{ 
                 filter: 'brightness(0.9)',
                 boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                 background: 'radial-gradient(circle at 30% 30%, #f0f0f0, #d0d0d0)'
               }} />
        )}
      </div>
      
      <style jsx>{`
        @keyframes skyShift {
          0% { filter: brightness(1) contrast(1); }
          50% { filter: brightness(1.1) contrast(1.05); }
          100% { filter: brightness(0.95) contrast(0.98); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateX(-20px) translateY(0px); }
          25% { transform: translateX(20px) translateY(-10px); }
          50% { transform: translateX(40px) translateY(5px); }
          75% { transform: translateX(10px) translateY(-5px); }
        }
      `}</style>
    </>
  )
}