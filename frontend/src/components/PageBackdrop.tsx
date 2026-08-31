import RippleDistortion from './RippleDistortion/RippleDistortion'
import './PageBackdrop.css'

export default function PageBackdrop() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      <RippleDistortion
        src="/stats-bg.png"
        brushSize={160}
        strength={0.12}
        swirl={0.8}
        rings={3}
        spread={5}
        fade={4}
        spacing={18}
        dispersion={0}
        glint={0.06}
        tint="#ffffff"
        tintAmount={0}
        grayscale={false}
        highlightColor="#ffffff"
        trigger="hover"
        clickStrength={2.0}
        quality="high"
        enabled
      />
    </div>
  )
}
