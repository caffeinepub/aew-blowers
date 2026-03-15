# AEW Blowers

## Current State
Single-page React app with sections: Hero, Products, Applications, Why Choose Us, Contact, Footer. Red and white industrial design.

## Requested Changes (Diff)

### Add
- **About Us page/section** with content from https://aewblowers.com/about-us/: company profile, CEO name (Sh. Balwan Singh Ahlawat), 4 decades experience, manufacturing facility, product range description, commitment to sustainability
- **Catalogue download button** linking to: https://drive.google.com/file/d/15Sk_usb4lG1Gk1N-neBaSgaatbtYBFhV/view?usp=drivesdk — add as a prominent CTA (Download Catalogue) in navbar and hero
- **Social media links** in footer and a floating WhatsApp button: YouTube, WhatsApp (+91-9466675482), Instagram, Facebook (use # as placeholder for YT/IG/FB URLs since not provided)
- Navigation link to About Us section

### Modify
- Navbar: add "About Us" and "Catalogue" links
- Footer: add social media icons row (YouTube, WhatsApp, Instagram, Facebook)
- Hero: add "Download Catalogue" button alongside existing CTAs

### Remove
- Nothing

## Implementation Plan
1. Add About Us section between Hero diagonal and Products with company profile content
2. Add Catalogue link in navbar and Download Catalogue button in hero section
3. Add social media icons to footer
4. Add floating WhatsApp chat button (fixed bottom-right)
5. Update navLinks array to include About Us and Catalogue
