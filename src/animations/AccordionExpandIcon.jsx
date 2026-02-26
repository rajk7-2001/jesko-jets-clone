import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function layout4() {
  const [expanded, setExpanded] = useState(false);

  const image_array = [
    "https://cdn.prod.website-files.com/68b5ebb0b83342b0b2bbd5ee/68d9a3daa04c725a21d89d3f_img_benefits-2.webp",
    "https://cdn.prod.website-files.com/68b5ebb0b83342b0b2bbd5ee/68d9a43945c6f790cee01dd3_img_benefits-3.webp",
    "https://cdn.prod.website-files.com/68b5ebb0b83342b0b2bbd5ee/68e923fd81c2d3933a1661f7_img_benefit-3.webp",
    "https://cdn.prod.website-files.com/68b5ebb0b83342b0b2bbd5ee/68e9240bc0c8bd03a98e8c97_img_benefit-4.webp",
  ];

  const [currentImage, setCurrentImage] = useState(image_array[0]);
  const [nextImage, setNextImage] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleChange = (panel, new_image) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

    if (isExpanded && new_image !== currentImage) {
      setNextImage(new_image);
      setAnimating(true);

      setTimeout(() => {
        setCurrentImage(new_image);
        setNextImage(null);
        setAnimating(false);
      }, 600);
    }
  };

  return (
    <div className="layout4" id="advantages">
      <div className="layout4-width">
        <div className="l4c1" style={{ borderTop: "1px solid black" }}>
          <div style={{ paddingTop: "10px" }} className="dark-black">
            A BETTER WAY TO FLY
          </div>
          <div className="accordion-wrapper">
            <div>
              <Accordion
                className="accordion"
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1", image_array[0])}
              >
                <AccordionSummary
                  className="accordion-summary"
                  expandIcon={
                    expanded === "panel1" ? <RemoveIcon /> : <AddIcon />
                  }
                >
                  <Typography>Pets</Typography>
                </AccordionSummary>

                <AccordionDetails className="accordion-details">
                  <Typography>
                    Traveling with pets on a private jet means comfort and peace
                    of mind for both owners and their companions. Our dedicated
                    team ensures seamless arrangements, from documentation and
                    safety to onboard care, so that your pet enjoys the same
                    level of attention and luxury as you do. Every detail is
                    managed to create a stress-free and enjoyable journey for
                    everyone on board.
                  </Typography>
                  <img
                    src={image_array[0]}
                    alt="Pets"
                    className="mobile-accordion-image"
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                className="accordion"
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2", image_array[1])}
              >
                <AccordionSummary
                  className="accordion-summary"
                  expandIcon={
                    expanded === "panel2" ? <RemoveIcon /> : <AddIcon />
                  }
                >
                  <Typography>24/7 availability</Typography>
                </AccordionSummary>

                <AccordionDetails className="accordion-details">
                  <Typography>
                    Our team is available around the clock to handle any
                    request, no matter the time zone or urgency. From
                    last-minute flight arrangements to personalized services, we
                    provide seamless support whenever you need it. With us,
                    assistance is never more than a call away.{" "}
                  </Typography>
                  <img
                    src={image_array[1]}
                    alt="24/7 availability"
                    className="mobile-accordion-image"
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                className="accordion"
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3", image_array[2])}
              >
                <AccordionSummary
                  className="accordion-summary"
                  expandIcon={
                    expanded === "panel3" ? <RemoveIcon /> : <AddIcon />
                  }
                >
                  <Typography>Onboard services</Typography>
                </AccordionSummary>

                <AccordionDetails className="accordion-details">
                  <Typography>
                    Every flight is tailored with a range of personalized
                    onboard services designed to elevate your journey. From fine
                    dining and curated entertainment to attentive crew and
                    seamless connectivity, every detail is arranged to ensure
                    maximum comfort and enjoyment in the air.{" "}
                  </Typography>
                  <img
                    src={image_array[2]}
                    alt="Onboard services"
                    className="mobile-accordion-image"
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                className="accordion"
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4", image_array[3])}
              >
                <AccordionSummary
                  className="accordion-summary"
                  expandIcon={
                    expanded === "panel4" ? <RemoveIcon /> : <AddIcon />
                  }
                >
                  <Typography>Efficient</Typography>
                </AccordionSummary>

                <AccordionDetails className="accordion-details">
                  <Typography>
                    Efficiency is at the core of every flight we operate. From
                    optimized routes and streamlined procedures to quick
                    boarding and smooth ground handling, we make sure your time
                    is always used wisely. The result is a seamless journey that
                    gets you where you need to be, faster and without
                    compromise.
                  </Typography>
                  <img
                    src={image_array[3]}
                    alt="Efficient"
                    className="mobile-accordion-image"
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="l4c2">
          {/* Old Image */}
          <img
            src={currentImage}
            alt=""
            className={`image-base ${animating ? "fade-out" : ""}`}
          />

          {/* New Image */}
          {nextImage && (
            <img src={nextImage} alt="" className="image-base slide-up" />
          )}
        </div>
      </div>
    </div>
  );
}
