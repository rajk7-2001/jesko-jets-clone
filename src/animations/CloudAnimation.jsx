import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Clouds() {
  const cloudRef = useRef();

  useEffect(() => {
    gsap.to(cloudRef.current, {
      x: "-50%",
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
      <div className="cloud-track" ref={cloudRef}>
        <img src="https://cdn.prod.website-files.com/68b57ef5ef86011d9b251e8e/68ee74b1f45fbfb23fb6405a_clouds.webp" />
      </div>
  );
}
