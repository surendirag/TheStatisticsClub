import { useMemo } from 'react'
import RippleDistortion from './RippleDistortion/RippleDistortion'
import './PageBackdrop.css'

/**
 * Generates a dark navy → indigo → deep-blue gradient as a JPEG data URL.
 * This gives RippleDistortion a texture to distort without using a photo.
 */
function makeGradientTexture(): string {
  try {
    const canvas = document.createElement('canvas')
    canvas.width  = 960
    canvas.height = 540
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    const grad = ctx.createLinearGradient(0, 0, 0, 540)
    grad.addColorStop(0,    '#0f172a')   // slate-900   — top
    grad.addColorStop(0.45, '#1e1b4b')   // indigo-950  — mid
    grad.addColorStop(1,    '#1e3a8a')   // blue-900    — bottom

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 960, 540)
    return canvas.toDataURL('image/jpeg', 0.92)
  } catch {
    return ''
  }
}

export default function PageBackdrop() {
  // Memoised so the canvas is only drawn once
  const gradientSrc = useMemo(() => makeGradientTexture(), [])

  return (
    <div className="page-backdrop" aria-hidden="true">
      <RippleDistortion
        src={gradientSrc}
        brushSize={160}
        strength={0.18}
        swirl={1.2}
        rings={4}
        spread={5}
        fade={3}
        spacing={15}
        dispersion={0}
        glint={0.08}
        tint="#3b82f6"
        tintAmount={0.10}
        highlightColor="#93c5fd"
        trigger="hover"
        clickStrength={2.5}
        quality="low"
        enabled
      />
    </div>
  )
}
