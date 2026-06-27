"use client"

export default function AmbientBackground() {
  return (
    <>
      <style>{`
        .ambient-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: float linear infinite;
        }
        .ambient-orb-1 {
          width: 700px;
          height: 700px;
          background: var(--ambient-1, #b45309);
          opacity: 0.55;
          top: -300px;
          left: -150px;
          animation-duration: 20s;
        }
        .ambient-orb-2 {
          width: 500px;
          height: 500px;
          background: var(--ambient-2, #d97706);
          opacity: 0.40;
          top: 10%;
          right: -100px;
          animation-duration: 25s;
          animation-direction: reverse;
        }
        .ambient-orb-3 {
          width: 400px;
          height: 400px;
          background: var(--ambient-3, #92400e);
          opacity: 0.35;
          bottom: -100px;
          left: 20%;
          animation-duration: 18s;
        }
        .ambient-orb-4 {
          width: 350px;
          height: 350px;
          background: var(--ambient-4, #fbbf24);
          opacity: 0.20;
          top: 50%;
          left: 55%;
          animation-duration: 30s;
          animation-direction: reverse;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.08); }
          66% { transform: translate(-25px, 25px) scale(0.94); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-orb { animation: none; }
        }
      `}</style>
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
        <div className="ambient-orb ambient-orb-4" />
        <div className="absolute inset-0 bg-background/45" />
      </div>
    </>
  )
}
