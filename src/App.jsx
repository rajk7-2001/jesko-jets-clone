import "./App.css";
import ContentHomepage from "./components/ContentHomepage";
import Navbar from "./components/Navbar";
import Flightsymbol from "./assets/images/plane.png";
import GlobalImage from "./assets/images/global image.png";
import GlobalText from "./assets/images/global text.png";
import JN from "./assets/images/jn.png";
import Clouds from "./animations/CloudAnimation";
import Layout4 from "./animations/AccordionExpandIcon";
import FlightFlyingAnimation from "./components/FlightFlyingAnimation";
import loopjetimage from "./assets/images/loop jet image.png";
import barimage from "./assets/images/bar.png";
import Globe from "./components/Globe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import RotateDevicePrompt from "./components/RotateDevicePrompt";

gsap.registerPlugin(ScrollTrigger);
function App() {
  const bg1 = useRef(null);
  const img_container = useRef(null);
  const jetsText = useRef(null);
  useLayoutEffect(() => {
    let splits = [];
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: bg1.current,
            start: "top top",
            endTrigger: ".row1",
            end: "top bottom",
            scrub: 3,
            refreshPriority: 100,
          },
        })
        .fromTo(
          img_container.current,
          { scale: 1, autoAlpha: 1 },
          {
            scale: 12,
            autoAlpha: 0,
            ease: "none",
            force3D: true,
          },
        )
        .to(
          jetsText.current,
          {
            top: "42px",
            ease: "none",
          },
          0,
        );

      /* ---------------- ROW 1 H1 SPLIT TEXT ANIMATION ---------------- */
      // Avoid splitting by lines because it breaks text-align: justify and causes layout overlap.
      // Splitting by words and chars keeps the native browser wrapping and justification intact.
      // Animating the chars sequentially from left to right across the whole block will naturally reveal line-by-line.
      const row1H1 = document.querySelector(".row1 h1");
      if (row1H1) {
        document.fonts.ready.then(() => {
          const split = new SplitType(row1H1, { types: "words, chars" });
          splits.push(split);
          gsap.fromTo(
            split.chars,
            { opacity: 0.3 },
            {
              opacity: 1,
              stagger: 0.01,
              scrollTrigger: {
                trigger: row1H1,
                start: "top bottom", // starts when top of text hits center
                end: "bottom center", // ends when bottom of text hits center
                scrub: true,
              },
            },
          );
        });
      }

      /* ---------------- COUNTRIES LOOP + HIGHLIGHT ---------------- */
      const containerNode = document.querySelector(".countries-container");
      const track = ".countries-track";
      const allItems = gsap.utils.toArray(".countries p");
      const items = gsap.utils.toArray(".countries:first-child p");

      if (containerNode && items.length > 0) {
        const isMobile = window.innerWidth <= 752;

        if (isMobile) {
          // Horizontal scrolling for mobile
          const containerCenter =
            containerNode.getBoundingClientRect().left +
            containerNode.getBoundingClientRect().width / 2;

          const targets = allItems.slice(0, items.length + 1).map((item) => {
            const rect = item.getBoundingClientRect();
            return containerCenter - (rect.left + rect.width / 2);
          });

          // Set initial horizontal state
          gsap.set(track, { x: targets[0], y: 0 }); // reset Y just in case
          allItems[0].classList.add("active");
          if (allItems[items.length])
            allItems[items.length].classList.add("active");

          const tl = gsap.timeline({ repeat: -1 });
          tl.to({}, { duration: 1 }); // Initial pause

          targets.forEach((x, i) => {
            if (i === 0) return;
            const isClone = i === items.length;

            tl.to(track, {
              x,
              duration: 0.5,
              ease: "power2.inOut",
              onStart: () => {
                allItems.forEach((p) => p.classList.remove("active"));
                allItems[isClone ? 0 : i].classList.add("active");
                if (allItems[(isClone ? 0 : i) + items.length]) {
                  allItems[(isClone ? 0 : i) + items.length].classList.add(
                    "active",
                  );
                }
              },
            });

            if (!isClone) {
              tl.to({}, { duration: 1 });
            }
          });
        } else {
          // Vertical scrolling for desktop (original behavior)
          const containerCenter =
            containerNode.getBoundingClientRect().top +
            containerNode.getBoundingClientRect().height / 2;

          const targets = allItems.slice(0, items.length + 1).map((item) => {
            const rect = item.getBoundingClientRect();
            return containerCenter - (rect.top + rect.height / 2);
          });

          // Set initial vertical state
          gsap.set(track, { y: targets[0], x: 0 }); // reset X just in case
          allItems[0].classList.add("active");
          if (allItems[items.length])
            allItems[items.length].classList.add("active");

          const tl = gsap.timeline({ repeat: -1 });
          tl.to({}, { duration: 1 }); // Initial pause

          targets.forEach((y, i) => {
            if (i === 0) return;
            const isClone = i === items.length;

            tl.to(track, {
              y,
              duration: 0.5,
              ease: "power2.inOut",
              onStart: () => {
                allItems.forEach((p) => p.classList.remove("active"));
                allItems[isClone ? 0 : i].classList.add("active");
                if (allItems[(isClone ? 0 : i) + items.length]) {
                  allItems[(isClone ? 0 : i) + items.length].classList.add(
                    "active",
                  );
                }
              },
            });

            if (!isClone) {
              tl.to({}, { duration: 1 });
            }
          });
        }
      }

      /* ---------------- PIN GLOBAL GROUP ---------------- */
      ScrollTrigger.create({
        trigger: ".global-group",
        start: "center center",
        endTrigger: ".layout5",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        refreshPriority: 40,
      });

      /* ---------------- GLOBE & LOOP WRAPPER SCROLL ANIMATION ---------------- */
      // Fade out loop-wrapper, and scale down globe
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".global-group",
            start: "center center", // Start when global-group is pinned
            end: "+=100",
            scrub: 2,
            refreshPriority: 30,
          },
        })
        .to(
          ".loop-wrapper",
          {
            autoAlpha: 0, // Fade out the loop wrapper
            ease: "none",
          },
          0,
        )
        .to(
          ".global-text",
          {
            y: "-30vh", // Move the text up
            ease: "none",
            duration: 3,
          },
          0,
        )
        .fromTo(
          ".global",
          {
            scale: 1.5, // Initially scaled up
            y: 0,
            transformOrigin: "center center",
          },
          {
            scale: 1.2, // Scale down the globe
            y: "-20vh", // Move up to center of viewport
            ease: "none",
            duration: 3,
          },
          0,
        );

      /* ---------------- PIN LAYOUT 5 OVERLAY AT END ---------------- */
      ScrollTrigger.create({
        trigger: ".layout5-overlay",
        start: "bottom bottom",
        endTrigger: ".layout5",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        refreshPriority: 20,
      });
      /* ---------------- NAVBAR COLOR BOUNDARIES ---------------- */
      ScrollTrigger.create({
        trigger: ".flight-section",
        start: "top 5%",
        onEnter: () =>
          gsap.to(".navbar-width, .jets", { color: "#000", duration: 0.25 }),
        onLeaveBack: () =>
          gsap.to(".navbar-width, .jets", { color: "#ffffff", duration: 0.25 }),
      });

      ScrollTrigger.create({
        trigger: ".layout5",
        start: "top 5%",
        onEnter: () =>
          gsap.to(".navbar-width, .jets", { color: "#ffffff", duration: 0.25 }),
        onLeaveBack: () =>
          gsap.to(".navbar-width, .jets", { color: "#000", duration: 0.25 }),
      });
    });

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <RotateDevicePrompt />
      <div className="full-content">
        <div className="bg-content">
          <div ref={bg1} className="layout1">
            <div className="content-width">
              <div className="row1" id="about">
                <h1>
                  Jesko Jets<sup>®</sup> is a private aviation operator with
                  over 5,000 missions completed across 150+ countries. From
                  international executives to global industries, our clients
                  trust us to deliver on time, every&nbsp;time.
                </h1>
              </div>
              <div className="row2">
                <div className="col1">
                  <div className="col1c1">
                    <img src={GlobalImage} alt="" />
                  </div>
                  <div className="col1c2">
                    <img src={JN} alt="" />
                  </div>
                  <div className="col1c3">
                    <h4>EST.</h4>
                  </div>
                  <div className="col1c4">
                    <h4>
                      BY EVGENY DEMIDENKO
                      <br />
                      2013
                    </h4>
                  </div>
                </div>
                <div className="col2">
                  <div className="col2c1">
                    <div className="heading1">
                      <h1>Direct Access to Private Travel</h1>
                    </div>
                    <div className="line"></div>
                    <p className="desc">
                      Fly beyond boundaries with Jesko Jets. Our global
                      operations ensure seamless, personalized travel
                      experiences — from the first call to landing. Every
                      journey is tailored to your comfort, privacy, and
                      schedule.
                    </p>
                  </div>
                  <div className="col2c2">
                    <div className="heading1">
                      <h1>Your Freedom to Enjoy Life</h1>
                    </div>
                    <div className="line"></div>
                    <p className="desc">
                      We value your time above all. Jesko Jets gives you the
                      freedom to live, work, and relax wherever life takes you —
                      without compromise.{" "}
                    </p>
                  </div>
                  <div className="col2c3">
                    <div className="heading1">
                      <h1>Precision and Excellence </h1>
                    </div>
                    <div className="line"></div>
                    <p className="desc">
                      Each detail of your flight — from route planning to
                      in-flight service — reflects our dedication to perfection.
                      Our crew and fleet meet the highest global standards,
                      ensuring reliability in every mission.
                    </p>
                  </div>
                  <div className="col2c4">
                    <div className="heading1">
                      <h1>Global Reach, Personal Touch</h1>
                    </div>
                    <div className="line"></div>
                    <p className="desc">
                      With access to destinations in over 150 countries, Jesko
                      Jets brings the world closer to you. Our experts manage
                      every aspect of your flight, guaranteeing a smooth and
                      effortless journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FlightFlyingAnimation />
          <Layout4 />
          <div className="layout5" id="global">
            <div className="layout5-width">
              <div className="loop-wrapper">
                <div className="loop">
                  <div className="left-side">Fly anywhere</div>
                  <div className="loop-line"></div>
                  <div className="loop-jet-image">
                    <img src={loopjetimage} alt="jet" />
                  </div>
                  <div className="loop-line reverse"></div>
                </div>

                <div className="countries-container">
                  <div className="countries-track">
                    <div className="countries">
                      {[
                        "Abu Dhabi",
                        "Dubai",
                        "Zurich",
                        "Tokyo",
                        "Paris",
                        "Los Angeles",
                        "Miami",
                      ].map((country, idx) => (
                        <p key={`list1-${idx}`}>{country}</p>
                      ))}
                    </div>

                    <div className="countries">
                      {[
                        "Abu Dhabi",
                        "Dubai",
                        "Zurich",
                        "Tokyo",
                        "Paris",
                        "Los Angeles",
                        "Miami",
                      ].map((country, idx) => (
                        <p key={`list2-${idx}`}>{country}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="global-group"
              style={{ position: "relative", zIndex: 5 }}
            >
              <div
                className="global-text"
                style={{ position: "relative", zIndex: 1 }}
              >
                <img src={GlobalText} alt="" style={{ display: "block" }} />
              </div>
              <div
                className="global"
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <Globe />
              </div>
            </div>

            <div className="layout5-overlay">
              <div className="card">
                <div className="cardr1">
                  <div className="r1c1">
                    <h3>
                      5K+ <br /> flights
                    </h3>
                  </div>
                  <div className="bar">
                    <img src={barimage} alt="" />
                  </div>
                </div>
                <div className="cardr2">
                  <p>SUCCESSFULLY ARRANGED</p>
                </div>
                <div className="cardr3">
                  <div className="r3c1">
                    <img src={JN} alt="" />
                  </div>
                  <div className="r3c2">
                    Each journey reflects years of expertise, <br /> precision,
                    and trust. From last-minute <br /> charters to
                    intercontinental business routes <br /> — Jesko Jets ensures
                    safety, discretion, and excellence in every flight.
                  </div>
                </div>
              </div>
              <div className="layout5-content">
                <div className="l5c1">
                  Fly anywhere with <br /> total comfort and <br /> control
                </div>
                <div className="l5c2">
                  <div className="c2r1">
                    Info@jeskojets.com <br /> +971 54 432 5050
                  </div>
                  <div className="c2r2">
                    <div className="l5-line"></div>
                    <div className="inquries-text">
                      FOR <br />
                      INQUIRIES
                    </div>
                  </div>
                </div>
              </div>
              <div className="layout5-footer">
                <div className="footerc1">
                  <div className="c1">
                    <div className="t1">
                      ©2026 JESKO JETS. ALL RIGHTS RESERVED
                    </div>
                    <div className="t2">PRIVACY POLICY</div>
                  </div>
                  <div className="c2">
                    <div className="c2t1">MADE BY</div>
                    <div className="c2t2">THE FIRST THE LAST</div>
                    <div className="c2img">
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" style={{ overflow: "hidden" }}>
          <div ref={img_container} className="zoom-content">
            <div className="cloud-bg">
              <Clouds />
            </div>
            <div className="window-bg ">
              <img
                src="https://cdn.prod.website-files.com/68b57ef5ef86011d9b251e8e/68d9ddb4432de688d8f96eb1_img_hero-front-over.webp"
                alt=""
              />

              <img
                src="https://cdn.prod.website-files.com/68b57ef5ef86011d9b251e8e/68d9dfe10f1c8a1d719c1e63_917d8b944f7f57b7fbe3969bf2719a2e_img_hero-front.webp"
                alt=""
              />
              <img
                src="https://cdn.prod.website-files.com/68b57ef5ef86011d9b251e8e/68d27a91bc0bf516a17a3f69_img_hero-back.webp"
                alt=""
              />
            </div>
            <div className="overlay-content">
              <ContentHomepage />
            </div>
          </div>
        </div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="book-btn">
          <div className="btn">
            <button>Book the Flight</button>
          </div>
          <div className="flight-sym">
            <img src={Flightsymbol} alt="" />
          </div>
        </div>
        <div ref={jetsText} className="jets">
          Jesko Jets
        </div>
      </div>
    </>
  );
}

export default App;
