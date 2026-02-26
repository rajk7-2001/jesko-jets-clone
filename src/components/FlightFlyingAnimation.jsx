import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FlightFlyingAnimation.css";

gsap.registerPlugin(ScrollTrigger);

const FlightFlyingAnimation = () => {
  const triggerRef = useRef(null);
  const jetRef = useRef(null);
  const titleRef = useRef(null);
  const specsRef = useRef(null);
  const blueprintRef = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1000px)",
      isMobile: "(max-width: 752px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: isMobile ? "+=6000" : "+=9000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 50,
        },
      });

      // ---------------- INITIAL STATES ----------------
      gsap.set(jetRef.current, {
        top: "150%",
        scale: 2.5, // Already large (NO scale up)
      });

      gsap.set(specsRef.current, {
        opacity: 0,
        autoAlpha: 0,
      });

      gsap.set(blueprintRef.current, {
        opacity: 0,
        autoAlpha: 0,
      });

      // ---------------- PHASE 1 ----------------
      // Jet moves to Layout2 center (no scale change)

      tl.to(jetRef.current, {
        top: "50%",
        duration: 3,
        ease: "power2.inOut",
      }, 0)
        .to(".bg-overlay", {
          opacity: 1, // Fade in the solid background
          duration: 3,
          ease: "power2.inOut",
        }, 0);

      // ---------------- PHASE 2 & 3 & 4 ----------------
      if (isDesktop) {
        // Jet enters Layout3 → scales DOWN
        // Layout2 exits downward

        tl.to(jetRef.current, {
          scale: 1.2, // Fit inside Layout3
          duration: 3,
          ease: "power2.inOut",
        })
          .to(titleRef.current, {
            y: "100%",
            duration: 3,
            ease: "power2.inOut",
          }, "<");

        // Specs reveal

        tl.to(specsRef.current, {
          opacity: 1,
          autoAlpha: 1,
        }, "-=1");

        // Jet → Blueprint transition

        tl.to(jetRef.current, {
          opacity: 0,
          duration: 1.5,
        }, "+=0.5")
          .to(blueprintRef.current, {
            opacity: 1,
            autoAlpha: 1,
            duration: 1.5,
          }, "<");
      } else {
        // Mobile Animation
        // Jet moves away upwards
        // Layout2 moves up out of view
        // Layout3 enters from below seamlessly

        tl.to(jetRef.current, {
          top: "-50%",
          duration: 3,
          ease: "power2.inOut",
        });

        tl.to(titleRef.current, {
          y: "-100vh",
          duration: 3,
          ease: "power2.inOut",
        })
          .fromTo(specsRef.current, {
            y: "100vh",
            opacity: 1,
            autoAlpha: 1,
          }, {
            y: "0",
            duration: 3,
            ease: "power2.inOut",
          }, "<")
          .to(specsRef.current, {
            y: () => {
              if (!specsRef.current) return 0;
              const overflow = specsRef.current.scrollHeight - window.innerHeight;
              return overflow > 0 ? -overflow : 0;
            },
            duration: 6,
            ease: "none",
          });
      }
    }, triggerRef);

    return () => mm.revert();
  }, []);

  return (
    <section className="flight-section" ref={triggerRef}>
      <div className="bg-overlay" style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(241, 234, 224)",
        zIndex: 0,
        opacity: 0, // Starts transparent, fades to 1 during Phase 1
        pointerEvents: "none"
      }}></div>
      <div className="jet-switcher">

        {/* -------- Layout 2 -------- */}
        <div className="layout2" ref={titleRef} id="fleet">
          <div className="layout2-width">

            <div className="l2c1">
              <div className="l2ts">Fly in</div>
              <div className="fly-desc">
                Luxury <br /> that moves <br /> with you
              </div>
            </div>

            <div className="l2c2">
              <div className="l2ts luxury-text">Luxury</div>

              <div className="design-grid">
                <div className="l2c2-line"></div>
                <div>GULFSTREAM</div>
                <div className="ER650-text">650ER</div>
              </div>

              <div className="Luxury-desc">
                Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.               </div>
            </div>

          </div>
        </div>

        {/* -------- Layout 3 -------- */}
        <div className="layout3" ref={specsRef}>
          <div className="layout3-width">
            <div className="l3c1">
              <div className="l3-gulf">Gulfstream</div>
              <div className="l3-650ER l3ts">650ER</div>
              <div className="mobile-blueprint">
                <img
                  src="https://cdn.prod.website-files.com/68b57ef5ef86011d9b251e8e/68d9baf6224ae03a0c240aad_img_jet-blue-print.png"
                  alt="Blueprint Mobile"
                />
              </div>
              <div className="c1c1">
                <div>
                  <div className="light-black">MAXIMUM OPERATING RANGE</div>
                  <div className="dark-black">11,263 KM</div>
                </div>
                <div>
                  <div className="light-black">SPEED</div>
                  <div className="dark-black">480 KNOTS</div>
                </div>
                <div>
                  <div className="light-black">PASSENGER CAPACITY</div>
                  <div className="dark-black">
                    UP TO 12 SEATS(+1 CABIN SERVER)
                  </div>
                </div>
                <div>
                  <div className="light-black">ENDURANCE</div>
                  <div className="dark-black">
                    14 HRS (MAXIMUM FOR EUROPEAN BASED AIRCRAFT)
                  </div>
                </div>
                <div>
                  <div className="light-black">BAGGAGE CAPACITY</div>
                  <div className="dark-black">
                    5.52 M<sup>3</sup>
                  </div>
                </div>
                <div>
                  <div className="light-black">CRUISING ALTITUDE</div>
                  <div className="dark-black">15,544 M</div>
                </div>
              </div>
              <div className="c1c2">
                <div className="light-black specs">SPECIFICATION</div>
                <div className="dark-black">CABIN LENGTH</div>
                <div className="dark-black">
                  14.05 M<sup>2</sup>
                </div>
                <div className="dark-black">CABIN WIDTH</div>
                <div className="dark-black">
                  2.49 M<sup>2</sup>
                </div>
                <div className="dark-black">CABIN HEIGHT</div>
                <div className="dark-black">
                  1.92 M<sup>2</sup>
                </div>
              </div>
            </div>

            <div className="l3c2">
              <div className="l3-gulf">
                Ultra-long-range <br /> Aircraft
              </div>
              <div
                className="dark-black"
                style={{ borderTop: "1px solid black" }}
              >
                DIRECT ACCESS TO <br /> PRIVATE TRAVEL
              </div>
              <div className="dark-black">
                A true time-saving machine it brings Tokyo <br /> and New York
                an hour closer, and at 92% of <br /> the speed of sound, it
                can circle the globe <br /> with just a single stop.
              </div>
            </div>
          </div>
        </div>

        {/* -------- Jet -------- */}
        <div className="jet" ref={jetRef}>
          <img
            src="https://cdn.prod.website-files.com/68b57ef5ef86011d9b251e8e/69834ca922d650666343a7a4_img_jet.webp"
            alt="Jet"
            className="img-jet"
            style={{ display: "block", position: "relative", zIndex: 1 }}
          />
        </div>

        {/* -------- Blueprint -------- */}
        <div className="spec-s_center" ref={blueprintRef}>
          <img
            src="https://cdn.prod.website-files.com/68b57ef5ef86011d9b251e8e/68d9baf6224ae03a0c240aad_img_jet-blue-print.png"
            alt="Blueprint"
            className="blueprint"
          />
        </div>

      </div>
    </section>
  );
};

export default FlightFlyingAnimation;
