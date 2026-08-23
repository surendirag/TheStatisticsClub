import RippleDistortion from './RippleDistortion/RippleDistortion'
import './PageBackdrop.css'

export default function PageBackdrop() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      <RippleDistortion
        src="/stats-bg.png"
        brushSize={180}
        strength={0.25}
        swirl={1.5}
        rings={4}
        spread={6}
        fade={3}
        spacing={15}
        dispersion={0.02}
        glint={0.1}
        tint="#ffffff"
        tintAmount={0}
        grayscale={false}
        highlightColor="#ffffff"
        trigger="hover"
        clickStrength={3.0}
        quality="medium"
        enabled
      />
    </div>
  )
}
