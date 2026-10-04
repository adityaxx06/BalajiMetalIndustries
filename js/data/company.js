/* ============================================================
   company.js — single source of truth for company content.
   CONTENT RULE: values flagged verified:false MUST be confirmed
   with the client before treating them as fact.
   Replace placeholder values; the site renders from this file.
   ============================================================ */

window.BMI = window.BMI || {};

window.BMI.company = {
  name: "Balaji Metal Industries",
  shortName: "BMI",
  tagline: "Engineered for Industry",
  description:
    "Manufacturer and supplier of industrial screening, conveying, refractory anchoring and casting components for sponge iron, cement, power, mining and bulk material-handling plants across India.",

  contact: {
    owner: "Mrs. Rekha Soni", // verified: true (from live site)
    email: "balajimetal09@gmail.com", // verified: true (from live site)
    phones: ["+91 70009683009", "+91 9827930382"], // verified: true
    whatsapp: "https://wa.me/917000683009", // verified: company intro PDF lists 70009683009
    address:
      "26-A Industrial Area, Tifra, Bilaspur, Chhattisgarh — 495223", // verified: true
    mapsUrl:
      "https://www.google.com/maps/place/Balaji+Metal+Industries/@22.0730031,82.1247872,18.67z",
    gstin: "22DVLPS6463J1Z", // verified: true (live site). PAN withheld — do not publish.
    indiamart:
      "https://www.indiamart.com/balajimetalindustriesbilaspur/profile.html"
  },

  /* Statistics strip. Counter animates from data/* attributes.
     verified:false items are placeholders from the old site —
     confirm real figures with the client. */
  stats: [
    { value: 10, suffix: "+", label: "Years of Experience", verified: false },
    { value: 7, suffix: "", label: "Product Categories", verified: true },
    { value: 6, suffix: "+", label: "Industries Served", verified: false },
    { value: 500, suffix: "+", label: "Installations Supplied", verified: false }
  ],

  industries: [
    "Sponge Iron",
    "Cement",
    "Power",
    "Mining",
    "Steel",
    "Material Handling"
  ],

  /* Major customers, verified from the company intro PDF.
     The company also serves many more unlisted clients. */
  customers: [
    "Nova Iron & Steel",
    "Jayaswal Neco Industries",
    "SKS Ispat & Power",
    "Rashi Steel & Power",
    "Pacific Iron Works",
    "Amalgam Steel",
    "4Mann Group",
    "Nilkanth Steel",
    "Mangal Sponge & Steel",
    "Rocktech Engineering",
    "German TMX",
    "Starex Minerals",
    "Hero Cycles",
    "KSK",
    "SAPL",
    "Sajjan",
    "Mahavir Coal Washeries"
  ]
};
