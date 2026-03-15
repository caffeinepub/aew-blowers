import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

const LOGO = "https://aewblowers.com/wp-content/uploads/2019/02/NEW_LOGO.png";
const HERO_BG = "https://aewblowers.com/wp-content/uploads/2018/09/slide3.jpg";
const PRODUCTS = [
  {
    img: "https://aewblowers.com/wp-content/uploads/2024/05/20240512_075657.jpg",
    title: "Water Cooled Blower",
    subtitle: "Twin/Tri Lobe",
    desc: "Wide range designed for various high pressure applications with superior cooling performance and extended operational life.",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2024/05/20240512_082225-248x300.jpg",
    title: "Air Cooled Blower",
    subtitle: "Twin/Tri Lobe",
    desc: "Known for energy efficiency, durability and low maintenance requirements. Industry-leading performance in demanding conditions.",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2024/05/20240512_083643-300x225.jpg",
    title: "Process Gas Blowers",
    subtitle: "Twin/Tri Lobe",
    desc: "Designed to minimize energy consumption, contributing to a cleaner and greener future for industrial operations.",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2024/05/AEW-spares-and-accessories.jpg",
    title: "Accessories & Spares",
    subtitle: "Custom Solutions",
    desc: "In-house fabrication and machinery unit allows any possible customization that meets exact customer requirements.",
  },
];

const APPLICATIONS = [
  {
    img: "https://aewblowers.com/wp-content/uploads/2023/07/steel-plants-e1695637066337-300x181.jpg",
    title: "Steel Plants",
    desc: "Blending, Aeration, Fluidization and Conveying",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2023/07/paper-plant-300x203.jpg",
    title: "Paper Plants",
    desc: "Knife edge coating, drying, conveying and vacuum pickup",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2023/07/chemical-plants.jpg",
    title: "Chemical Plants",
    desc: "Supply of Process Air for critical manufacturing processes",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2023/07/bag-filters.jpg",
    title: "Bag Filters",
    desc: "Reverse cleaning of filter bags for efficient operations",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2023/07/power-plant-300x199.jpg",
    title: "Power Plants",
    desc: "Pneumatic conveying, Flue-Gas Desulfurization, Oxidation",
  },
  {
    img: "https://aewblowers.com/wp-content/uploads/2023/07/food-and-bev-300x215.jpg",
    title: "Food & Beverages",
    desc: "Conveying, supply of process air pressure and vacuum",
  },
];

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / (1500 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const submitMutation = useSubmitInquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", ocid: "nav.home.link" },
    { label: "Products", href: "#products", ocid: "nav.products.link" },
    {
      label: "Applications",
      href: "#applications",
      ocid: "nav.applications.link",
    },
    { label: "Why Us", href: "#whyus", ocid: "nav.whyus.link" },
    { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync(form);
      toast.success("Inquiry submitted! We'll contact you shortly.");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-body">
      <Toaster position="top-right" />

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-2xl" : ""}`}
        style={{ backgroundColor: "#CC0000" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              type="button"
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-3 group"
            >
              <img
                src={LOGO}
                alt="AEW Blowers Logo"
                className="h-12 w-auto object-contain bg-white px-2 py-1 group-hover:scale-105 transition-transform"
              />
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={link.ocid}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="px-4 py-2 text-white/90 hover:text-white font-semibold text-sm tracking-wider uppercase transition-all hover:bg-white/10 border-b-2 border-transparent hover:border-white"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="ml-4 px-6 py-2 bg-white text-sm font-bold tracking-wider uppercase transition-all hover:bg-gray-100"
                style={{ color: "#CC0000" }}
              >
                Get Quote
              </button>
            </nav>

            <button
              type="button"
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
              style={{ backgroundColor: "#990000" }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ocid={link.ocid}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="block px-4 py-3 text-white font-semibold tracking-wider uppercase text-sm hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${HERO_BG}')`,
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 industrial-grid opacity-40" />
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ backgroundColor: "#CC0000" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="inline-block px-4 py-1 text-white text-xs font-bold tracking-[0.3em] uppercase mb-6"
                style={{ backgroundColor: "#CC0000" }}
              >
                Est. Since 1998 · Made in India
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display font-extrabold text-white leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              WE PRODUCE
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px #CC0000",
                  color: "transparent",
                  display: "block",
                }}
                className="font-display font-extrabold"
              >
                THE SHAPE
              </span>
              <span style={{ color: "#CC0000" }}>OF PROGRESS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/70 text-lg lg:text-xl max-w-2xl mb-10 font-light leading-relaxed"
            >
              Aakash Engineering Works – Precision-Engineered Rotary Lobe
              Blowers trusted by 500+ clients across India's most demanding
              industries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <button
                type="button"
                data-ocid="hero.primary_button"
                onClick={() => scrollTo("#products")}
                className="group flex items-center gap-2 px-8 py-4 font-bold text-white tracking-widest uppercase text-sm transition-all hover:scale-105"
                style={{ backgroundColor: "#CC0000" }}
              >
                Explore Products
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={() => scrollTo("#contact")}
                className="px-8 py-4 font-bold tracking-widest uppercase text-sm border-2 border-white transition-all hover:scale-105"
                style={{ color: "white", backgroundColor: "transparent" }}
              >
                Contact Us
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="grid grid-cols-3 gap-0 max-w-2xl"
            >
              {[
                { value: 25, suffix: "+", label: "Years Experience" },
                { value: 500, suffix: "+", label: "Clients Served" },
                { value: 6, suffix: "", label: "Offices Across India" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border-r border-white/20 last:border-r-0 pr-8"
                >
                  <div
                    className="font-display font-extrabold leading-none mb-1"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      color: "#CC0000",
                    }}
                  >
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/60 text-xs font-semibold tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/40" />
          <span className="text-white/40 text-xs tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* DIAGONAL: dark -> red */}
      <div
        className="h-16 relative overflow-hidden"
        style={{ backgroundColor: "#CC0000" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0D0D0D 50%, #CC0000 50%)",
          }}
        />
      </div>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div
              className="inline-block text-xs font-bold tracking-[0.4em] uppercase px-4 py-1 mb-6"
              style={{ backgroundColor: "#CC0000", color: "white" }}
            >
              Engineered Excellence
            </div>
            <h2
              className="font-display font-extrabold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1A1A1A" }}
            >
              OUR <span style={{ color: "#CC0000" }}>PRODUCTS</span>
            </h2>
            <div
              className="mt-4 w-24 h-1 mx-auto"
              style={{ backgroundColor: "#CC0000" }}
            />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.title} delay={i * 0.1}>
                <div className="group h-full border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 200 }}
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: "#CC0000" }}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div
                      className="text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: "#CC0000" }}
                    >
                      {product.subtitle}
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 text-gray-900 leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      {product.desc}
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollTo("#contact")}
                      className="mt-5 flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-all group-hover:gap-3"
                      style={{ color: "#CC0000" }}
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGONAL: white -> light gray */}
      <div className="h-16 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, white 49.5%, #F5F5F5 50%)",
          }}
        />
      </div>

      {/* APPLICATIONS */}
      <section
        id="applications"
        className="py-24"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div
              className="inline-block text-xs font-bold tracking-[0.4em] uppercase px-4 py-1 mb-6"
              style={{ backgroundColor: "#1A1A1A", color: "white" }}
            >
              Industries We Serve
            </div>
            <h2
              className="font-display font-extrabold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1A1A1A" }}
            >
              OUR <span style={{ color: "#CC0000" }}>APPLICATIONS</span>
            </h2>
            <div
              className="mt-4 w-24 h-1 mx-auto"
              style={{ backgroundColor: "#CC0000" }}
            />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPLICATIONS.map((app, i) => (
              <FadeIn key={app.title} delay={i * 0.08}>
                <div className="group bg-white border border-gray-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default">
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 180 }}
                  >
                    <img
                      src={app.img}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(204,0,0,0.6) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display font-bold text-lg text-white">
                        {app.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGONAL: gray -> red */}
      <div
        className="h-16 relative overflow-hidden"
        style={{ backgroundColor: "#CC0000" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #F5F5F5 50%, #CC0000 50%)",
          }}
        />
      </div>

      {/* WHY CHOOSE US */}
      <section
        id="whyus"
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: "#CC0000" }}
      >
        <div className="absolute inset-0 industrial-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div
              className="inline-block text-xs font-bold tracking-[0.4em] uppercase px-4 py-1 mb-6 bg-white"
              style={{ color: "#CC0000" }}
            >
              Our Competitive Edge
            </div>
            <h2
              className="font-display font-extrabold leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              WHY CHOOSE{" "}
              <span
                className="font-display font-extrabold"
                style={{ WebkitTextStroke: "2px white", color: "transparent" }}
              >
                AEW
              </span>
            </h2>
            <div className="mt-4 w-24 h-1 mx-auto bg-white" />
            <p className="mt-6 text-white/80 text-lg max-w-2xl mx-auto">
              We are not only selling products — we are offering the best
              possible solutions.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Advanced Rotor Profile",
                desc: "Involute curve design delivers more air while consuming less power — setting the industry benchmark for efficiency.",
              },
              {
                num: "02",
                title: "Superior Durability",
                desc: "Heavy duty static structure with lightweight dynamic components ensures less power consumption, reduced vibration and maximum durability.",
              },
              {
                num: "03",
                title: "Alloy Steel Shafts",
                desc: "Increased diameter shafts with heavy bearing support eliminates any possibility of premature failure caused by bending or twisting.",
              },
            ].map((item, i) => (
              <FadeIn key={item.num} delay={i * 0.15}>
                <div className="group p-8 border-2 border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 h-full">
                  <div
                    className="font-display font-extrabold text-7xl leading-none mb-6"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  >
                    {item.num}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/75 leading-relaxed">{item.desc}</p>
                  <div className="mt-6 w-12 h-0.5 bg-white/40 group-hover:w-24 transition-all duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGONAL: red -> white */}
      <div className="h-16 relative overflow-hidden bg-white">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #CC0000 50%, white 50%)",
          }}
        />
      </div>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div
              className="inline-block text-xs font-bold tracking-[0.4em] uppercase px-4 py-1 mb-6"
              style={{ backgroundColor: "#CC0000", color: "white" }}
            >
              Reach Out
            </div>
            <h2
              className="font-display font-extrabold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1A1A1A" }}
            >
              GET IN <span style={{ color: "#CC0000" }}>TOUCH</span>
            </h2>
            <div
              className="mt-4 w-24 h-1 mx-auto"
              style={{ backgroundColor: "#CC0000" }}
            />
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-bold tracking-wider uppercase text-gray-700"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      data-ocid="contact.input"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      placeholder="John Smith"
                      className="border-2 border-gray-200 focus:border-red-600 rounded-none h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-bold tracking-wider uppercase text-gray-700"
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      data-ocid="contact.email.input"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      placeholder="john@company.com"
                      className="border-2 border-gray-200 focus:border-red-600 rounded-none h-12"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-bold tracking-wider uppercase text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      data-ocid="contact.phone.input"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+91 98765 43210"
                      className="border-2 border-gray-200 focus:border-red-600 rounded-none h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-sm font-bold tracking-wider uppercase text-gray-700"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      data-ocid="contact.company.input"
                      value={form.company}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, company: e.target.value }))
                      }
                      placeholder="Your Company Ltd."
                      className="border-2 border-gray-200 focus:border-red-600 rounded-none h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-bold tracking-wider uppercase text-gray-700"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="contact.textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    placeholder="Tell us about your blower requirements, specifications, and application..."
                    rows={5}
                    className="border-2 border-gray-200 focus:border-red-600 rounded-none resize-none"
                  />
                </div>

                <AnimatePresence>
                  {submitMutation.isSuccess && (
                    <motion.div
                      data-ocid="contact.success_state"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-50 border-l-4 border-green-500"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-medium">
                        Inquiry submitted! We'll contact you shortly.
                      </span>
                    </motion.div>
                  )}
                  {submitMutation.isError && (
                    <motion.div
                      data-ocid="contact.error_state"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-50 border-l-4"
                      style={{ borderColor: "#CC0000" }}
                    >
                      <AlertCircle
                        className="w-5 h-5"
                        style={{ color: "#CC0000" }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: "#990000" }}
                      >
                        Failed to submit. Please try again or call us directly.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={submitMutation.isPending}
                  className="w-full h-14 text-white font-bold tracking-widest uppercase text-sm rounded-none border-0 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#CC0000" }}
                >
                  {submitMutation.isPending ? (
                    <span
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Inquiry...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Inquiry <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div
                  className="p-8 text-white"
                  style={{ backgroundColor: "#CC0000" }}
                >
                  <h3 className="font-display font-bold text-2xl mb-2">
                    Reach Us Directly
                  </h3>
                  <p className="text-white/80">
                    Our team is ready to help you find the right blower solution
                    for your industry.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: "#CC0000", color: "white" }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold tracking-wider uppercase text-xs text-gray-500 mb-1">
                      Phone
                    </div>
                    <div className="font-semibold text-gray-900 leading-relaxed">
                      +91-9466675482
                      <br />
                      +91-7988313526
                      <br />
                      +91-9350528478
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: "#CC0000", color: "white" }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold tracking-wider uppercase text-xs text-gray-500 mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:aewblowers@gmail.com"
                      className="font-semibold hover:underline"
                      style={{ color: "#CC0000" }}
                    >
                      aewblowers@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: "#CC0000", color: "white" }}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold tracking-wider uppercase text-xs text-gray-500 mb-1">
                      Manufacturing Works
                    </div>
                    <div className="font-semibold text-gray-900 leading-relaxed">
                      Kh. No. 32/7 Universal Complex,
                      <br />
                      Near Metro Pillar No. 779, MIE Part A,
                      <br />
                      Bahadurgarh, Haryana - 124507
                    </div>
                  </div>
                </div>

                <div className="p-6 border-2 border-gray-100">
                  <div className="font-bold tracking-wider uppercase text-xs text-gray-500 mb-4">
                    Regional Offices
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Maharashtra (Kolhapur)",
                      "Hyderabad",
                      "Chennai",
                      "Goa (Verna)",
                      "Gujarat (Ahmedabad)",
                      "Haryana (HQ)",
                    ].map((office) => (
                      <div
                        key={office}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div
                          className="w-2 h-2 flex-shrink-0"
                          style={{ backgroundColor: "#CC0000" }}
                        />
                        {office}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#1A1A1A" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img
                src={LOGO}
                alt="AEW Blowers"
                className="h-10 w-auto object-contain bg-white px-2 py-1"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="text-center lg:text-right">
              <div className="text-white/40 text-xs">
                AEW Blowers © {new Date().getFullYear()} - All Rights Reserved.
              </div>
              <div className="text-white/30 text-xs mt-1">
                Built with ❤️ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/60 underline transition-colors"
                >
                  caffeine.ai
                </a>
              </div>
            </div>
          </div>
          <div
            className="mt-8 h-1 w-full"
            style={{ backgroundColor: "#CC0000" }}
          />
        </div>
      </footer>
    </div>
  );
}
