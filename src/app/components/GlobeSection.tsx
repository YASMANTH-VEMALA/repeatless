"use client"

import { Globe } from "@/Components/ui/cobe-globe"
import { FiGlobe } from "react-icons/fi"

const regions = [
  {
    id: "nyc",
    label: "United States",
    city: "New York",
    detail: "Revenue operations, sales teams, and service businesses.",
    location: [40.7128, -74.006] as [number, number],
  },
  {
    id: "toronto",
    label: "Canada",
    city: "Toronto",
    detail: "Lean teams scaling client delivery and internal workflows.",
    location: [43.6532, -79.3832] as [number, number],
  },
  {
    id: "london",
    label: "United Kingdom",
    city: "London",
    detail: "Agency, consulting, and B2B automation partnerships.",
    location: [51.5074, -0.1278] as [number, number],
  },
  {
    id: "dubai",
    label: "UAE",
    city: "Dubai",
    detail: "Fast-moving founders building modern operating systems.",
    location: [25.2048, 55.2708] as [number, number],
  },
  {
    id: "india",
    label: "India",
    city: "Bengaluru",
    detail: "Technical teams connecting AI agents with daily tools.",
    location: [12.9716, 77.5946] as [number, number],
  },
  {
    id: "sydney",
    label: "Australia",
    city: "Sydney",
    detail: "Remote-first businesses improving response and reporting loops.",
    location: [-33.8688, 151.2093] as [number, number],
  },
]

const markers = regions.map(({ id, location, city }) => ({ id, location, label: city }))

const globeMarkerColor: [number, number, number] = [0.94, 0.94, 0.94]
const globeBaseColor: [number, number, number] = [0.9, 0.9, 0.88]
const globeGlowColor: [number, number, number] = [0.46, 0.46, 0.5]

const arcs = [
  {
    id: "nyc-toronto",
    from: regions[0].location,
    to: regions[1].location,
  },
  {
    id: "toronto-london",
    from: regions[1].location,
    to: regions[2].location,
  },
  {
    id: "london-dubai",
    from: regions[2].location,
    to: regions[3].location,
  },
  {
    id: "dubai-india",
    from: regions[3].location,
    to: regions[4].location,
  },
  {
    id: "india-sydney",
    from: regions[4].location,
    to: regions[5].location,
  },
]

export default function GlobeSection() {
  return (
    <div
      data-globe-section="true"
      data-theme="dark"
      className="relative -mt-1 w-full overflow-hidden bg-black text-white select-none min-[1180px]:min-h-screen"
    >
      {/* Dark section background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_42%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.025)_28%,rgba(0,0,0,0)_55%),linear-gradient(180deg,#030304_0%,#09090b_48%,#030304_100%)]"
      />
      <div className="flex w-full items-center justify-center py-16 sm:py-20 min-[1180px]:min-h-screen min-[1180px]:py-28">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-10 min-[1180px]:grid-cols-12 min-[1180px]:gap-16">
            
              {/* Left Column: Heading and copy */}
            <div className="flex flex-col justify-center gap-6 min-[1180px]:col-span-6">
              <div className="flex items-center gap-2">
                <span className="text-white/70 uppercase tracking-wider text-xs md:text-sm font-semibold flex items-center gap-1.5">
                  <FiGlobe className="w-4 h-4" /> / Global Partnerships
                </span>
              </div>

              <h2 className="text-3xl font-sans font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:text-4xl md:text-[clamp(2.75rem,4.4vw,3.25rem)]">
                Connecting Custom AI & Automation <span className="text-white/72">Worldwide.</span>
              </h2>

              <div className="mt-2 grid max-w-xl grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2">
                {regions.map((region) => (
                  <div
                    key={region.id}
                    data-globe-region={region.id}
                    className="relative grid grid-cols-[auto_1fr] gap-3 rounded-[8px] border border-white/10 bg-white/[0.07] px-3.5 py-3.5 shadow-[0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur-md sm:px-4 sm:py-4"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.36)]" />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-white">
                        {region.label} <span className="font-medium text-white/42">/ {region.city}</span>
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Globe Rendering */}
            <div className="relative flex items-center justify-center min-[1180px]:col-span-6">
              <div className="relative aspect-square w-full max-w-[min(86vw,520px)] select-none">
                <Globe
                  markers={markers}
                  arcs={arcs}
                  className="relative z-10 w-full h-full"
                  markerColor={globeMarkerColor}
                  baseColor={globeBaseColor}
                  arcColor={globeMarkerColor}
                  glowColor={globeGlowColor}
                  dark={0}
                  mapBrightness={8.8}
                  diffuse={1.8}
                  markerSize={0.01}
                  markerElevation={0.014}
                  arcWidth={0.46}
                  arcHeight={0.28}
                  mapSamples={16000}
                  speed={0.004}
                  theta={0.16}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
