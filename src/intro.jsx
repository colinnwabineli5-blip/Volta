import { useState, useEffect, useRef } from 'react'

function ShirtIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3 L5 6 L3 5 L2 9 L4 10 L4 21 L20 21 L20 10 L22 9 L21 5 L19 6 L16 3" />
      <path d="M8 3 C8 5 9.5 6.5 12 6.5 C14.5 6.5 16 5 16 3" />
    </svg>
  )
}

function Intro({ onFinish }) {
  /* stage: 'splash' → 'animate' → 'done' */
  const [stage, setStage] = useState('splash')
  const audioRef = useRef(null)

  /* Preload audio */
  useEffect(() => {
    audioRef.current = new Audio('/volta-voiceover.mp3')
    audioRef.current.volume = 0.9
  }, [])

  /* When animation starts, play audio, then finish */
  useEffect(() => {
    if (stage !== 'animate') return

    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        /* silent fail — file may not exist yet */
      })
    }

    const timer = setTimeout(() => {
      setStage('done')

      /* small pause for fade-out, then hand over */
      setTimeout(() => onFinish(), 500)
    }, 3800)

    return () => clearTimeout(timer)
  }, [stage, onFinish])

  const handleTap = () => {
    if (stage !== 'splash') return
    setStage('animate')
  }

  /* ---------- SPLASH ---------- */
  if (stage === 'splash') {
    return (
      <div className="intro-screen intro-splash">
        <div className="intro-inner">

          <img
            src="/volta-logo.png"
            alt="VOLTA"
            className="intro-logo"
          />

          <p className="intro-tap-label">
            TAP HERE TO
          </p>

          <h1 className="intro-tap-title">
            OWN THE <span>MOMENT</span>
          </h1>

          <button
            className="intro-shirt-button"
            onClick={handleTap}
            aria-label="Enter site"
          >
            <ShirtIcon />
          </button>

        </div>
      </div>
    )
  }

  /* ---------- ANIMATION ---------- */
  return (
    <div
            className={
        stage === 'done'
          ? 'intro-screen intro-animate intro-fade-out'
          : 'intro-screen intro-animate'
      }
    >

      {/* gold line */}
      <div className="intro-line" />

      {/* logo + tagline */}
      <div className="intro-stage">

        <div className="intro-glow" />

        <img
          src="/volta-logo.png"
          alt="VOLTA"
          className="intro-animate-logo"
        />

        <h2 className="intro-tagline">
          VOLTA
        </h2>

        <p className="intro-motto">
          OWN THE MOMENT
        </p>

      </div>

    </div>
  )
}

export default Intro