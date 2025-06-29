'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function BusScroller() {
  const busRef = useRef<SVGImageElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!busRef.current || !pathRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const svg = svgRef.current;
    const bus = busRef.current;

    const pathLength = path.getTotalLength();
    const scrollTriggerEnd = `+=${pathLength * 2}`;

    const viewBox = { x: 0, y: 0, width: 1000, height: 800 };

    const updateCamera = (progress: number) => {
      const point = path.getPointAtLength(progress * pathLength);
      viewBox.x = point.x - viewBox.width / 2;
      viewBox.y = point.y - viewBox.height / 2;

      svg.setAttribute(
        'viewBox',
        `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
      );
    };

    // Create GSAP animation
    const tween = gsap.to(bus, {
      scrollTrigger: {
        trigger: '#bus-section',
        start: 'top top',
        end: scrollTriggerEnd,
        scrub: true,
        onUpdate: (self) => {
          updateCamera(self.progress);
        },
      },
      motionPath: {
        path: path,
        align: path,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      scale: 1.2,
      duration: 1,
      ease: 'none',
      rotate: 90,
    });

    // ✅ Trigger initial camera positioning on load
    requestAnimationFrame(() => {
      const st = ScrollTrigger.getAll()[0];
      if (st) updateCamera(st.progress);
    });

    // ✅ Force ScrollTrigger refresh after layout
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100); // wait a bit for layout to settle

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="bus-section"
      style={{
        height: '5000px',
        background: '#111',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <svg
        ref={svgRef}
        width="100vw"
        height="100vh"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <path
          ref={pathRef}
          d="M 6 9 C -9 812 1061 308 876 647 S 200 1200 557 1290 S 400 2100 1051 1974 S 300 2700 926 2751"
          stroke="white"
          strokeWidth="8"
          fill="none"
        />
        <image ref={busRef} href="/Bus-lg.svg" width="100" height="100" />
      </svg>
    </section>
  );
}
