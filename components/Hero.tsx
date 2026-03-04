"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

  const heroRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const stat1 = useRef<HTMLDivElement>(null);
  const stat2 = useRef<HTMLDivElement>(null);
  const stat3 = useRef<HTMLDivElement>(null);
  const stat4 = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      const screenWidth = window.innerWidth;
      const finalX = screenWidth + 200;

      gsap.set(stripRef.current, { width: 0 });

      gsap.set(
        [stat1.current, stat2.current, stat3.current, stat4.current],
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.2,
          pin: true,
        },
      });

      // Car animation
      tl.to(
        carRef.current,
        {
          x: finalX,
          ease: "none",
          onUpdate: () => {
            const carX = gsap.getProperty(carRef.current, "x") as number;

            if (carX > 0) {
              gsap.set(stripRef.current, {
                width: carX,
              });
            }
          },
        },
        0
      );

      // Sequential stats animation
      tl.to(stat1.current, { opacity: 1, y: 0, scale: 1 }, 0.35);
      tl.to(stat2.current, { opacity: 1, y: 0, scale: 1 }, 0.50);
      tl.to(stat3.current, { opacity: 1, y: 0, scale: 1 }, 0.65);
      tl.to(stat4.current, { opacity: 1, y: 0, scale: 1 }, 0.80);

    }, heroRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen bg-[#b3b3b3] overflow-hidden flex items-center justify-center"
    >

      {/* Top Stats */}
      <div className="absolute top-24 flex gap-16">

        <div
          ref={stat1}
          className="w-64 p-6 rounded-2xl bg-lime-400 shadow-xl text-center"
        >
          <h2 className="text-4xl font-bold">95%</h2>
          <p className="mt-2">Performance Boost</p>
        </div>

        <div
          ref={stat2}
          className="w-64 p-6 rounded-2xl bg-zinc-800 text-white shadow-xl text-center"
        >
          <h2 className="text-4xl font-bold">58%</h2>
          <p className="mt-2">Increase in pickup use</p>
        </div>

      </div>


      {/* Yellow Strip */}
      <div
        ref={stripRef}
        className="absolute left-0 h-45 flex items-center overflow-hidden
        bg-linear-to-r from-amber-600 via-yellow-400 to-yellow-200"
        style={{ width: 0 }}
      >
        <h1 className="text-black text-9xl tracking-[0.20em] ml-10 whitespace-nowrap font-black font-[Times New Roman,serif]">
  WELCOMEITZFIZZ
</h1>
      </div>


      {/* Car */}
      <img
        ref={carRef}
        src="/car.png"
        alt="Car"
        className="absolute left-0 w-137.5 z-30"
      />


      {/* Bottom Stats */}
      <div className="absolute bottom-24 flex gap-16">

        <div
          ref={stat3}
          className="w-64 p-6 rounded-2xl bg-sky-400 shadow-xl text-center"
        >
          <h2 className="text-4xl font-bold">80%</h2>
          <p className="mt-2">User Engagement</p>
        </div>

        <div
          ref={stat4}
          className="w-64 p-6 rounded-2xl bg-orange-500 text-white shadow-xl text-center"
        >
          <h2 className="text-4xl font-bold">120K+</h2>
          <p className="mt-2">Active Users</p>
        </div>

      </div>

    </section>
  );
}