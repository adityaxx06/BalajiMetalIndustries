"""Build assets/company-profile.pdf from verified company content."""
from fpdf import FPDF

NAVY = (10, 17, 32)
ORANGE = (242, 102, 26)
GRAY = (85, 103, 127)


class Profile(FPDF):
    def multi_cell(self, *a, **k):
        self.set_x(self.l_margin)
        k.setdefault("new_x", "LMARGIN")
        k.setdefault("new_y", "NEXT")
        return super().multi_cell(*a, **k)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-15)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*GRAY)
        self.cell(0, 8, "Balaji Metal Industries  |  Bilaspur, Chhattisgarh  |  balajimetal09@gmail.com",
                  align="C")

    def eyebrow(self, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*ORANGE)
        self.cell(0, 8, text.upper(), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*ORANGE)
        self.set_line_width(0.8)
        self.line(self.l_margin, self.get_y(), self.l_margin + 14, self.get_y())
        self.ln(4)

    def h2(self, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 20)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 9, text)
        self.ln(2)

    def body(self, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 11)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 6.5, text)
        self.ln(2)

    def bullet(self, text):
        self.set_font("Helvetica", "", 11)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 6.5, "-  " + text)


pdf = Profile(format="A4")
pdf.set_auto_page_break(True, 20)
pdf.set_margins(20, 18, 20)

# ---------------- Cover ----------------
pdf.add_page()
pdf.set_fill_color(*NAVY)
pdf.rect(0, 0, 210, 297, "F")
pdf.image("assets/bmi-logo-square.png", x=85, y=38, w=40)
pdf.set_y(88)
pdf.set_font("Helvetica", "B", 30)
pdf.set_text_color(255, 255, 255)
pdf.multi_cell(0, 12, "BALAJI METAL\nINDUSTRIES", align="C")
pdf.ln(2)
pdf.set_draw_color(*ORANGE)
pdf.set_line_width(1.2)
pdf.line(90, pdf.get_y(), 120, pdf.get_y())
pdf.ln(4)
pdf.set_font("Helvetica", "", 13)
pdf.set_text_color(200, 208, 220)
pdf.cell(0, 8, "Engineered for Industry", align="C", new_x="LMARGIN", new_y="NEXT")
pdf.ln(6)
pdf.set_font("Helvetica", "", 11)
pdf.multi_cell(0, 7,
    "Manufacturer & supplier of industrial components\nfor sponge iron, cement and power plants across India.",
    align="C")
pdf.ln(10)
pdf.set_font("Helvetica", "", 10)
pdf.set_text_color(*ORANGE)
pdf.multi_cell(0, 7,
    "26-A Industrial Area, Tifra, Bilaspur (C.G.) 495223\n"
    "+91 98279 30382  |  +91 70009 68309\n"
    "balajimetal09@gmail.com  |  GSTIN: 22DVLPS6463J1Z",
    align="C")

# ---------------- About ----------------
pdf.add_page()
pdf.eyebrow("About the company")
pdf.h2("A leading manufacturer of industrial components")
pdf.body(
    "We are proud to introduce ourselves as one of the leading manufacturers "
    "and suppliers of industrial components, serving major sectors such as "
    "sponge iron, cement and power plants across India.")
pdf.body(
    "Located in Bilaspur, our manufacturing facility is equipped with advanced "
    "machinery and managed by skilled professionals. Our infrastructure allows "
    "us to maintain high-quality standards, timely delivery and competitive pricing.")
pdf.body(
    "We take pride in our flexibility and innovation, enabling us to design and "
    "develop custom solutions tailored to our clients' needs. This customer-focused "
    "approach has earned us the trust of industries across the nation.")
pdf.body(
    "With a commitment to quality, service and continuous improvement, we aim to "
    "be your reliable partner in industrial solutions.")
pdf.ln(2)
pdf.eyebrow("What we make")
for item in [
    "Vibrating Screen Mesh in SS 304 / 310",
    "Spring Steel Wire Mesh (Grade-1, Usha Martin / Tata)",
    "Conveyor Idlers and Spares (ISI-certified pipes)",
    "Stainless Steel Anchors - all types (V / Y / UV)",
    "Precision Casting Items (SS 310 range)",
]:
    pdf.bullet(item)

# ---------------- Products ----------------
pdf.add_page()
pdf.eyebrow("Product range")
pdf.h2("Engineered products for industrial performance")
products = [
    ("Spring Steel Screen Cloths",
     "Grade-1 wire mesh (Usha Martin / Tata), also in SS 304 / 310. All sizes, "
     "with or without clamps. For mining, cement, sponge iron and power plants."),
    ("Stainless Steel Wire Mesh",
     "SS 304 / 310 mesh known for strength, corrosion resistance and long-lasting "
     "performance. Various sizes and specifications."),
    ("Conveyor Idlers, Frames & Pulleys",
     "Idler rollers from high-grade ISI-certified pipes, built for thrust loads. "
     "Premium bearings and dust-proof sealing for tough conditions."),
    ("Kiln Refractory Anchors",
     "SS anchors and cleats - V, Y and UV types in SS 304 / 310, all sizes. For "
     "high-temperature, corrosive environments."),
    ("Casting & Mechanical Components",
     "SS 310 range: thermowells, protection tubes, HK 40 coal throw pipes, feed "
     "tubes, air tubes, central burner pipes, radiation heat protection tubes. "
     "Plus custom castings to drawing."),
]
for name, desc in products:
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*NAVY)
    pdf.cell(0, 8, name, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(40, 40, 40)
    pdf.multi_cell(0, 6.5, desc)
    pdf.ln(3)

# ---------------- Customers + contact ----------------
pdf.add_page()
pdf.eyebrow("Our customers")
pdf.h2("Trusted by major plants across India")
pdf.body(
    "Some of our major customers from across India. In addition to these, we are "
    "proud to serve many other valued clients on a regular basis.")
customers = [
    "Nova Iron & Steel", "Jayaswal Neco Industries", "SKS Ispat & Power",
    "Rashi Steel & Power", "Pacific Iron Works", "Amalgam Steel",
    "4Mann Group", "Nilkanth Steel", "Mangal Sponge & Steel",
    "Rocktech Engineering", "German TMX", "Starex Minerals",
    "Hero Cycles", "KSK", "SAPL", "Sajjan", "Mahavir Coal Washeries",
]
pdf.set_font("Helvetica", "", 11)
pdf.set_text_color(40, 40, 40)
for i in range(0, len(customers), 2):
    pdf.set_x(20)
    pdf.cell(85, 7, "-  " + customers[i])
    if i + 1 < len(customers):
        pdf.cell(85, 7, "-  " + customers[i + 1])
    pdf.ln()
pdf.ln(6)
pdf.eyebrow("Get in touch")
pdf.set_font("Helvetica", "B", 12)
pdf.set_text_color(*NAVY)
pdf.multi_cell(0, 7,
    "Balaji Metal Industries\n"
    "26-A Industrial Area, Tifra, Bilaspur (C.G.) 495223")
pdf.set_font("Helvetica", "", 11)
pdf.set_text_color(40, 40, 40)
pdf.multi_cell(0, 7,
    "Rekha Soni\n"
    "+91 98279 30382  |  +91 70009 68309\n"
    "balajimetal09@gmail.com\n"
    "GSTIN: 22DVLPS6463J1Z")

pdf.output("assets/company-profile.pdf")
import os
print("profile PDF KB:", os.path.getsize("assets/company-profile.pdf") // 1024)
