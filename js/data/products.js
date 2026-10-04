/* ============================================================
   products.js — structured product catalogue.
   Copy grounded in the company website + company intro PDF.
   `specs` stays empty until the client supplies full datasheets.
   ============================================================ */

window.BMI = window.BMI || {};

window.BMI.products = [
  {
    slug: "spring-steel-screen-cloths",
    index: "01",
    name: "Spring Steel Screen Cloths",
    tag: "Screening",
    image: "assets/Wiremesh/p-1.1.jpg",
    alt: "Spring steel vibrating screen mesh panels",
    short:
      "Grade-1 spring steel screens (Usha Martin / Tata wire) for high-wear vibrating applications.",
    featuredImage: "assets/Wiremesh/p-1.2.jpg",
    featuredAlt: "Close view of spring steel screen mesh weave",
    points: [
      "Grade-1 spring steel wire from Usha Martin / Tata",
      "Also available in SS 304 and SS 310",
      "All sizes, with clamps or without, to suit installation"
    ],
    applications: ["Mining", "Cement", "Sponge Iron", "Power"],
    specs: [] // TODO(client): aperture range, wire dia, panel sizes
  },
  {
    slug: "stainless-steel-wire-mesh",
    index: "02",
    name: "Stainless Steel Wire Mesh",
    tag: "Screening",
    image: "assets/SS Wiremsh/p-2.5.jpg",
    alt: "Stainless steel wire mesh rolls",
    short:
      "High-quality SS 304 / 310 mesh known for strength, corrosion resistance and long-lasting performance.",
    featuredImage: "assets/SS Wiremsh/p-2.3.jpg",
    featuredAlt: "Stainless steel wire mesh roll detail",
    points: [
      "SS 304 / 310 grades for demanding zones",
      "Strength, corrosion resistance, long service life",
      "Various sizes and specifications to order"
    ],
    applications: ["Screening", "Filtration", "Kiln Zones", "Process Units"],
    specs: [] // TODO(client): mesh counts, grades, roll widths
  },
  {
    slug: "conveyor-idlers",
    index: "03",
    name: "Conveyor Idlers, Frames & Pulleys",
    tag: "Conveying",
    image: "assets/Roller/p-3.3.jpg",
    alt: "Conveyor idler rollers and frames",
    short:
      "Idler rollers from high-grade ISI-certified pipes with premium bearings and dust-proof sealing.",
    featuredImage: "assets/Roller/p-3.2.jpeg",
    featuredAlt: "Conveyor idler roller assembly",
    points: [
      "High-grade ISI-certified pipes, built for thrust loads",
      "Premium quality bearings for smooth, long-life operation",
      "Dust-proof sealing for tough working conditions"
    ],
    applications: ["Cement", "Mining", "Power", "Ports & Bulk"],
    specs: [] // TODO(client): belt widths, idler types, bearing specs
  },
  {
    slug: "kiln-refractory-anchors",
    index: "04",
    name: "Kiln Refractory Anchors",
    tag: "Refractory",
    image: "assets/Anchor/p-4.1.jpg",
    alt: "Stainless steel kiln refractory anchors",
    short:
      "SS anchors and cleats — V, Y and UV types in SS 304 / 310 — for high-temperature linings.",
    featuredImage: "assets/Anchor/p-4.4.jpg",
    featuredAlt: "Range of stainless refractory anchor types",
    points: [
      "V, Y and UV types, plus cleats, in all sizes",
      "SS 304 and SS 310 grades",
      "For high-temperature, corrosive environments"
    ],
    applications: ["Sponge Iron Kilns", "Cement", "Furnaces", "Heaters"],
    specs: [] // TODO(client): anchor types, grades, dimensions
  },
  {
    slug: "casting-mechanical-components",
    index: "05",
    name: "Casting & Mechanical Components",
    tag: "Custom",
    image: "assets/casting/p-5.1.jpg",
    alt: "Precision cast industrial components",
    short:
      "SS 310 components — thermowells, protection tubes, burner pipes and more — plus custom castings.",
    featuredImage: "assets/casting/p-5.2.jpg",
    featuredAlt: "Custom cast mechanical component",
    points: [
      "SS 310 thermowells, protection and feed tubes",
      "HK 40 coal throw pipes and burner pipes",
      "Custom castings to drawing, machined and finished"
    ],
    applications: ["Sponge Iron", "Cement", "Power", "Custom Spares"],
    specs: [] // TODO(client): materials, processes, size envelope
  }
];
