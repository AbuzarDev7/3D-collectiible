import { useState, useEffect, useCallback } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  Heart,
  ChevronDown,
  Layers,
  Award,
  Truck,
  Send,
  Globe,
  Mail,
  Disc,
  Check,
  ShoppingBag,
  Info,
} from 'lucide-react';

// Shared data
const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

const FIGURINE_DETAILS = [
  { name: 'Giga Kid', series: 'Retro Wave', height: '18.5 cm', weight: '340g', material: 'Matte Vinyl Resin', rating: '9.8', price: '$89.00', desc: 'Inspired by retro-arcade design languages, Giga Kid features premium box-shaded contours and an energetic orange palette. A perfect centerpiece for gaming setups.' },
  { name: 'Green Goblin', series: 'Eco Forest', height: '20.0 cm', weight: '410g', material: 'Bio-based SLA Resin', rating: '9.6', price: '$95.00', desc: 'Embodying organic shapes and matte-finished details, Green Goblin features specialized earth-green accents and leaf-blade detailing.' },
  { name: 'Pinky Boo', series: 'Cyber Pastel', height: '17.2 cm', weight: '290g', material: 'Glossy Pastel Acrylic', rating: '9.9', price: '$85.00', desc: 'A fusion of futuristic tech and pastel soft aesthetics. Features reflective glossy highlights and delicate rounded geometries.' },
  { name: 'Blue Sonic', series: 'Neon Future', height: '19.0 cm', weight: '360g', material: 'Translucent ABS-Resin', rating: '9.7', price: '$90.00', desc: 'Constructed using premium translucent resin formulas that capture and channel ambient light. Features futuristic wing-blades.' },
];

const FAQS = [
  { q: "Are these figurines pre-assembled and painted?", a: "Yes, every MINTCAST figurine is shipped fully assembled, cured, and hand-finished with premium acrylic matte/gloss coating, ready to showcase." },
  { q: "What is stereolithography (SLA) crafting?", a: "SLA is an industrial 3D printing method that uses high-precision light to solidify liquid resin. This allows us to craft incredibly clean curves and sharp geometries that standard plastic moldings cannot achieve." },
  { q: "Do these collectibles come with authenticity cards?", a: "Absolutely. Each figurine is individually numbered and includes a certified physical NFC-equipped metal card showing its unit number, batch details, and developer signature." },
  { q: "How long does shipping take?", a: "Since all figurines are handcrafted in limited batches, preparation takes 5-7 business days. DHL Express worldwide shipping takes approximately 3-5 business days depending on location." }
];

// Custom hook for handling cross-page section scrolling
function useScrollNavigation() {
  const navigate = useNavigate();

  const navigateAndScroll = useCallback((sectionId: string) => {
    // Check if we are currently on a sub-page (e.g. figurine detail or success page)
    const isSubPage = window.location.hash !== '#/' && window.location.hash !== '#';

    if (isSubPage) {
      // Navigate back to Home page first
      navigate('/');
      // Wait for HomeView to mount, then scroll to the section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      // Already on home page, scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [navigate]);

  return navigateAndScroll;
}

// Header Component
function AppHeader() {
  const navigateAndScroll = useScrollNavigation();

  return (
    <header className="w-full flex items-center justify-between py-6 px-4 sm:px-12 bg-black/10 backdrop-blur-md border-b border-white/5 relative z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-xs font-semibold uppercase text-white tracking-[0.18em] opacity-95">
          MINTCAST
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold text-white/70 tracking-widest uppercase">
          <Link to="/" className="hover:text-white transition-colors duration-150 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
          </Link>
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              navigateAndScroll('catalog');
            }}
            className="hover:text-white transition-colors duration-150 relative group cursor-pointer"
          >
            Catalog
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#craft"
            onClick={(e) => {
              e.preventDefault();
              navigateAndScroll('craft');
            }}
            className="hover:text-white transition-colors duration-150 relative group cursor-pointer"
          >
            Craftsmanship
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              navigateAndScroll('faq');
            }}
            className="hover:text-white transition-colors duration-150 relative group cursor-pointer"
          >
            Support
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
          </a>
        </nav>
      </div>
      <div>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:scale-105 inline-block cursor-pointer outline-none"
        >
          View Carousel
        </Link>
      </div>
    </header>
  );
}

// Footer Component
function AppFooter() {
  return (
    <footer className="w-full py-16 px-4 sm:px-12 md:px-24 bg-[#0a0a0d] text-white/50 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-2">MINTCAST</h4>
          <p className="text-xs">Premium high-fidelity SLA 3D figurine collectibles.</p>
        </div>

        <div className="flex gap-6 text-white/60">
          <a href="#" className="hover:text-white transition-colors duration-150" aria-label="Discord">
            <Disc size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-150" aria-label="Website">
            <Globe size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-150" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>

        <div className="text-xs text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} MINTCAST. All rights reserved.</p>
          <p className="text-[10px] text-white/30 mt-1">Handcrafted with care for toy collectors.</p>
        </div>
      </div>
    </footer>
  );
}

// ================= VIEW: HOME =================
function HomeView() {
  const navigateAndScroll = useScrollNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [liked, setLiked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLiked(false);
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % 4;
      } else {
        return (prev + 3) % 4;
      }
    });
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  }, [isAnimating]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const getRoleStyles = (role: 'center' | 'left' | 'right' | 'back') => {
    if (role === 'center') {
      return {
        transform: `translate3d(-50%, 0, 0) scale(${isMobile ? 1.22 : 1.3})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
      };
    }
    if (role === 'left') {
      return {
        transform: `translate3d(calc(-50% - ${isMobile ? '36vw' : '26vw'}), ${isMobile ? '-4vh' : '-6vh'}, 0) scale(${isMobile ? 0.72 : 0.88})`,
        filter: 'blur(2px)',
        opacity: 0.55,
        zIndex: 10,
      };
    }
    if (role === 'right') {
      return {
        transform: `translate3d(calc(-50% + ${isMobile ? '36vw' : '26vw'}), ${isMobile ? '-4vh' : '-6vh'}, 0) scale(${isMobile ? 0.72 : 0.88})`,
        filter: 'blur(2px)',
        opacity: 0.55,
        zIndex: 10,
      };
    }
    return {
      transform: 'translate3d(-50%, 15vh, 0) scale(0.4)',
      filter: 'blur(4px)',
      opacity: 0,
      zIndex: 5,
    };
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Container */}
      <section
        style={{
          backgroundColor: IMAGES[activeIndex].bg,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Grain overlay */}
        <div style={{ zIndex: 50, opacity: 0.4 }} className="absolute inset-0 pointer-events-none grain-overlay" />

        {/* Floating background decorations */}
        <div style={{ zIndex: 1 }} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/12 text-white/20 animate-float-slow hidden md:block">
            <Sparkles size={32} />
          </div>
          <div className="absolute bottom-1/3 right-1/4 text-white/25 animate-float-medium hidden md:block">
            <Star size={24} />
          </div>
          <div className="absolute top-1/3 right-1/12 w-16 h-16 rounded-full border-2 border-white/10 animate-float-slow hidden md:block" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] tracking-widest text-white/40 uppercase hidden sm:block">
            MADE BY ABUZAR MSHAHI
          </div>
        </div>

        {/* Giant dynamic background text */}
        <div
          style={{
            zIndex: 2,
            top: isMobile ? '22%' : '18%',
            fontSize: isMobile ? 'clamp(36px, 12vw, 64px)' : 'clamp(100px, 18vw, 260px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            fontFamily: "'Anton', sans-serif",
            color: '#ffffff',
            opacity: 0.12,
            transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateY(${isAnimating ? '20px' : '0px'})`,
          }}
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase"
        >
          {FIGURINE_DETAILS[activeIndex].name}
        </div>

        {/* Top Header inside Hero */}
        <header
          style={{ zIndex: 60 }}
          className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-12">
            <Link to="/" className="text-xs font-semibold uppercase text-white tracking-[0.18em] opacity-95">
              MINTCAST
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold text-white/70 tracking-widest uppercase">
              <a
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndScroll('catalog');
                }}
                className="hover:text-white transition-colors duration-150 relative group cursor-pointer"
              >
                Catalog
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
              </a>
              <a
                href="#craft"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndScroll('craft');
                }}
                className="hover:text-white transition-colors duration-150 relative group cursor-pointer"
              >
                Craftsmanship
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndScroll('faq');
                }}
                className="hover:text-white transition-colors duration-150 relative group cursor-pointer"
              >
                Support
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
              </a>
            </nav>
          </div>
          <div className="hidden sm:block">
            <a
              href="#catalog"
              onClick={(e) => {
                e.preventDefault();
                navigateAndScroll('catalog');
              }}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:scale-105 inline-block cursor-pointer outline-none"
            >
              Order Collection
            </a>
          </div>
        </header>

        {/* Carousel items */}
        <div style={{ zIndex: 4 }} className="absolute inset-0">
          {IMAGES.map((image, index) => {
            const role = getRole(index);
            const roleStyles = getRoleStyles(role);

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  left: '50%',
                  bottom: isMobile ? '14%' : '2%',
                  height: isMobile ? '74%' : '85%',
                  transition: 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1), filter 650ms cubic-bezier(0.25, 1, 0.5, 1), opacity 650ms cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform, filter, opacity',
                  ...roleStyles,
                }}
              >
                <Link to={`/figurine/${index}`}>
                  <img
                    src={image.src}
                    alt={`Mintcast figurine ${index + 1}`}
                    className="w-full h-full object-contain object-bottom select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all duration-200 cursor-pointer"
                    draggable={false}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Specs Glassmorphic Side Card */}
        <div
          style={{
            zIndex: 60,
            transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateY(${isAnimating ? '20px' : '0px'})`,
            opacity: isAnimating ? 0 : 1,
          }}
          className="hidden md:flex absolute top-[30%] right-10 flex-col gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white w-52 shadow-2xl animate-float-slow"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] text-white/50 uppercase tracking-widest block mb-0.5">Active Figurine</span>
              <h3 className="font-bold text-base uppercase tracking-wide">
                {FIGURINE_DETAILS[activeIndex].name}
              </h3>
            </div>
            <button
              onClick={() => setLiked(!liked)}
              className="text-white hover:text-red-400 p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors duration-150 cursor-pointer outline-none"
              aria-label="Like figurine"
            >
              <Heart size={14} fill={liked ? '#f87171' : 'none'} className={liked ? 'scale-110' : ''} />
            </button>
          </div>
          <div className="h-[1px] bg-white/10 w-full" />
          <div className="grid grid-cols-2 gap-y-3 text-xs">
            <div>
              <span className="text-white/50 block text-[9px] uppercase tracking-wider">Height</span>
              <span className="font-semibold text-white/90">{FIGURINE_DETAILS[activeIndex].height}</span>
            </div>
            <div>
              <span className="text-white/50 block text-[9px] uppercase tracking-wider">Rarity</span>
              <span className="font-semibold text-amber-300">★ Rare</span>
            </div>
            <div className="col-span-2">
              <span className="text-white/50 block text-[9px] uppercase tracking-wider">Material</span>
              <span className="font-semibold text-white/90">{FIGURINE_DETAILS[activeIndex].material}</span>
            </div>
          </div>
          <div className="h-[1px] bg-white/10 w-full" />
          <Link
            to={`/figurine/${activeIndex}`}
            className="w-full py-2 bg-white text-black hover:bg-neutral-200 transition-colors rounded-xl text-[10px] font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5"
          >
            <Info size={11} />
            View Specifications
          </Link>
        </div>

        {/* Bottom-left text + nav buttons */}
        <div
          style={{ zIndex: 60, maxWidth: '320px' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-center sm:left-24 sm:translate-x-0 sm:text-left sm:bottom-20"
        >
          <p
            style={{ letterSpacing: '0.02em' }}
            className="font-bold uppercase mb-2 sm:mb-3 text-base sm:text-[22px] text-white opacity-95"
          >
            MINTCAST FIGURINES
          </p>
          <p className="hidden sm:block text-xs sm:text-sm text-white opacity-85 leading-relaxed mb-4 sm:mb-5">
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white bg-transparent transition-all duration-150 hover:scale-108 hover:bg-white/12 cursor-pointer outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous figurine"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white bg-transparent transition-all duration-150 hover:scale-108 hover:bg-white/12 cursor-pointer outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next figurine"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right link */}
        <div style={{ zIndex: 60 }} className="hidden sm:block absolute sm:bottom-20 sm:right-10">
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              navigateAndScroll('catalog');
            }}
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
            className="flex items-center gap-2 text-white opacity-95 hover:opacity-100 uppercase transition-opacity duration-200 no-underline"
          >
            DISCOVER IT
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>
      </section>
      {/* Catalog Grid */}
      <section id="catalog" className="w-full py-24 px-4 sm:px-12 md:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-3"
              style={{ color: '#F4845F' }}>
              Series 01 Collection
            </span>
            <h2 className="font-anton uppercase tracking-tight text-white leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Choose Your Figurine
            </h2>
          </div>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed font-light">
            Four exclusive custom model series, designed by leading 3D character artists, printed using advanced SLA resin printers, and hand-coated.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIGURINE_DETAILS.map((fig, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-[28px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              style={{
                background: `linear-gradient(145deg, ${IMAGES[idx].bg}18 0%, #16171d 60%)`,
                border: `1.5px solid ${IMAGES[idx].bg}30`,
              }}
            >
              {/* Image area */}
              <div
                className="relative flex items-end justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${IMAGES[idx].panel}55 0%, ${IMAGES[idx].bg}22 60%, transparent 100%)`,
                  minHeight: '260px',
                }}
              >
                {/* Rating badge */}
                <span
                  className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm border"
                  style={{ color: IMAGES[idx].bg, borderColor: IMAGES[idx].bg + '50', backgroundColor: IMAGES[idx].bg + '15' }}
                >
                  ★ {fig.rating}
                </span>
                {/* Ultra Rare badge */}
                <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/25 backdrop-blur-sm">
                  Ultra Rare
                </span>
                <Link to={`/figurine/${idx}`} className="w-full flex items-end justify-center pt-6 pb-2">
                  <img
                    src={IMAGES[idx].src}
                    alt={fig.name}
                    className="object-contain object-bottom select-none cursor-pointer transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                    style={{ height: '200px', maxWidth: '100%' }}
                    draggable={false}
                  />
                </Link>
              </div>

              {/* Content area */}
              <div className="flex flex-col flex-grow p-5 gap-4">
                {/* Series label */}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: IMAGES[idx].bg }}>
                  {fig.series}
                </span>

                {/* Name */}
                <h3 className="font-anton text-2xl uppercase text-white leading-none tracking-wide">
                  {fig.name}
                </h3>

                {/* Specs row */}
                <div className="flex gap-4 text-xs text-white/50">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider mb-0.5 text-white/30">Height</span>
                    <span className="font-semibold text-white/80">{fig.height}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider mb-0.5 text-white/30">Material</span>
                    <span className="font-semibold text-white/80">{fig.material.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full" style={{ backgroundColor: IMAGES[idx].bg + '25' }} />

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-white/30 block mb-0.5">Price</span>
                    <span className="font-anton text-2xl text-white">{fig.price}</span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-400/25 px-2.5 py-1 rounded-full bg-emerald-400/5">
                    In Stock
                  </span>
                </div>

                <Link
                  to={`/figurine/${idx}`}
                  className="w-full py-3 rounded-xl font-bold text-[11px] tracking-[0.18em] uppercase text-center block transition-all duration-300 mt-auto"
                  style={{
                    backgroundColor: IMAGES[idx].bg,
                    color: '#111',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)';
                  }}
                >
                  Configure & Buy
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section id="craft" className="w-full bg-gradient-to-b from-[#121318] to-[#16171d] py-28 px-4 sm:px-12 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#6BBF7A] uppercase block mb-3">Premium Build Standard</span>
            <h2 className="text-3xl sm:text-5xl font-anton uppercase tracking-tight text-white mb-4 leading-none">
              Designed For Collectors
            </h2>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              We merge cutting-edge stereolithography additive manufacturing with hand-layered custom painting to deliver flawless desk showpieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 rounded-[28px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col gap-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1.5px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6BBF7A50';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(107, 191, 122, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#6BBF7A] transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(107, 191, 122, 0.1)',
                  border: '1.5px solid rgba(107, 191, 122, 0.2)',
                }}>
                <Layers size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-wide font-anton">High-Res SLA Resin</h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Printed in ultra-thin 0.05mm resin layers to capture precise facial expressions and micro-geometries that standard injection molding merges away.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-[28px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col gap-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1.5px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F4845F50';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(244, 132, 95, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#F4845F] transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(244, 132, 95, 0.1)',
                  border: '1.5px solid rgba(244, 132, 95, 0.2)',
                }}>
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-wide font-anton">Artisan Hand-Coated</h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Individually airbrushed and detailed by professional toy designers using premium matte colors and gloss varnishes that resist yellowing over time.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-[28px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col gap-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1.5px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6EB5FF50';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(110, 181, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#6EB5FF] transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(110, 181, 255, 0.1)',
                  border: '1.5px solid rgba(110, 181, 255, 0.2)',
                }}>
                <Truck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-wide font-anton">Safe Vault Packing</h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Shipped inside custom-molded high-density foam shells and wrapped in a premium display box to guarantee your collector model arrives flawless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="w-full py-28 px-4 sm:px-12 md:px-24 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#E882B4] uppercase block mb-3">Any Questions?</span>
          <h2 className="text-3xl sm:text-5xl font-anton uppercase tracking-tight text-white mb-4 leading-none">
            Frequently Asked FAQs
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            const colors = ['#6BBF7A', '#F4845F', '#6EB5FF', '#E882B4'];
            const color = colors[index % colors.length];
            return (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 rounded-[20px]"
                style={{
                  background: isOpen 
                    ? `linear-gradient(145deg, ${color}10 0%, rgba(255,255,255,0.02) 100%)`
                    : 'rgba(255,255,255,0.02)',
                  border: isOpen
                    ? `1.5px solid ${color}40`
                    : '1.5px solid rgba(255,255,255,0.06)',
                  boxShadow: isOpen ? `0 10px 25px -10px ${color}20` : 'none',
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 flex justify-between items-center text-left transition-colors duration-150 cursor-pointer outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-white tracking-wide uppercase font-anton">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="text-white/60 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? color : 'white' }}
                    size={20}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    transition: 'max-height 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="overflow-hidden"
                >
                  <p className="p-6 pt-0 text-xs sm:text-sm text-white/50 leading-relaxed font-light border-t border-white/5">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Whitelist drop list */}
      <section className="w-full py-28 px-4 bg-gradient-to-b from-[#16171d] to-[#0d0e12] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#6EB5FF]/10 filter blur-3xl opacity-20 pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 p-8 sm:p-12 rounded-[32px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1.5px solid rgba(255,255,255,0.06)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-xs font-semibold tracking-[0.25em] text-[#6EB5FF] uppercase block mb-3">Series 02 Is Coming</span>
          <h2 className="text-3xl sm:text-5xl font-anton uppercase tracking-tight text-white mb-4 leading-none">
            Get On The Drop List
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed font-light max-w-lg mx-auto">
            Our limited batches sell out in minutes. Subscribe to receive drop notifications, secret artist editions, and early whitelist pre-order windows.
          </p>

          {subscribed ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
              <ShieldCheck size={20} />
              <span>You're Whitelisted! We will notify you for Series 02.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: '#6EB5FF',
                  color: '#111',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.15)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(110, 181, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Whitelist</span>
                <Send size={12} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

// ================= VIEW: DETAIL =================
function DetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const parsedId = parseInt(id || '0', 10);
  const figurineId = isNaN(parsedId) || parsedId < 0 || parsedId > 3 ? 0 : parsedId;

  const item = FIGURINE_DETAILS[figurineId];
  const image = IMAGES[figurineId];

  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutCountry, setCheckoutCountry] = useState('United States');
  const [checkoutQty, setCheckoutQty] = useState(1);

  // Auto-scroll to top when detail mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [figurineId]);

  const handlePreorderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutName.trim() && checkoutEmail.trim()) {
      navigate('/preordered', {
        state: {
          name: item.name,
          price: item.price,
          qty: checkoutQty,
          customer: checkoutName,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#121318] text-white flex flex-col justify-between relative">
      {/* Grain overlay */}
      <div style={{ zIndex: 50, opacity: 0.4 }} className="absolute inset-0 pointer-events-none grain-overlay" />

      <AppHeader />

      <main className="flex-grow py-12 px-4 sm:px-12 md:px-24 max-w-7xl mx-auto w-full relative z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Column 1: Close-up Figurine Image */}
          <div className="flex flex-col items-center">
            <div
              style={{ borderColor: image.bg + '40' }}
              className="w-full aspect-square rounded-[40px] border bg-gradient-to-br from-white/5 to-white/0 relative flex items-center justify-center p-8 overflow-hidden shadow-2xl"
            >
              {/* Figurine Spotlight Backdrop Pedestal */}
              <div
                style={{ backgroundColor: image.panel }}
                className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full filter blur-xl opacity-40 bottom-4 left-1/2 -translate-x-1/2"
              />
              <img
                src={image.src}
                alt={item.name}
                className="w-[85%] h-[85%] object-contain object-bottom select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)] animate-float-medium"
                draggable={false}
              />
            </div>
            <div className="flex items-center gap-3 mt-6 text-white/55 text-xs">
              <ShieldCheck size={16} className="text-[#6BBF7A]" />
              <span>Certified original batch SLA resin art piece.</span>
            </div>
          </div>

          {/* Column 2: Spec Sheets & Form */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span
                  style={{ color: image.bg, borderColor: image.bg + '30', backgroundColor: image.bg + '10' }}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                >
                  {item.series} Series
                </span>
                <span className="text-amber-300 text-xs font-semibold flex items-center gap-1">
                  <Star size={12} fill="#fcd34d" />
                  ★ {item.rating} Score
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-anton uppercase leading-none tracking-tight text-white mb-4">
                {item.name}
              </h1>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
              <div className="text-3xl font-anton text-white">{item.price}</div>
            </div>

            {/* Spec Sheet Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4 flex items-center gap-2">
                <Layers size={14} />
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs sm:text-sm">
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px] uppercase">Rarity Scale</span>
                  <span className="font-semibold text-white/90">Batch of 250 Units Only</span>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px] uppercase">Height</span>
                  <span className="font-semibold text-white/90">{item.height}</span>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px] uppercase">Weight</span>
                  <span className="font-semibold text-white/90">{item.weight}</span>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <span className="text-white/40 block text-[9px] uppercase">Base Material</span>
                  <span className="font-semibold text-white/90">{item.material}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/85 mb-4 flex items-center gap-2">
                <ShoppingBag size={14} />
                Register Pre-Order Delivery
              </h3>
              <form onSubmit={handlePreorderSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-semibold">Delivery Region</label>
                    <select
                      value={checkoutCountry}
                      onChange={(e) => setCheckoutCountry(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#1d1e24] border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-white/30 transition-colors"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Japan</option>
                      <option>Pakistan</option>
                      <option>Canada</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-semibold">Quantity</label>
                    <select
                      value={checkoutQty}
                      onChange={(e) => setCheckoutQty(parseInt(e.target.value, 10))}
                      className="px-4 py-2.5 rounded-xl bg-[#1d1e24] border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-white/30 transition-colors"
                    >
                      <option value={1}>1 Unit</option>
                      <option value={2}>2 Units (Max Limit)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: image.bg,
                  }}
                  className="w-full py-3.5 mt-2 rounded-xl text-black font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                >
                  Secure Pre-order ({item.price})
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Similar Collectibles Tray */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <h3 className="text-2xl font-anton uppercase text-white mb-10 tracking-wide">
            Explore Other Series Models
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FIGURINE_DETAILS.map((other, otherIdx) => {
              if (otherIdx === figurineId) return null;
              return (
                <Link
                  key={otherIdx}
                  to={`/figurine/${otherIdx}`}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center hover:border-white/20 hover:bg-white/8 transition-all duration-200 group"
                >
                  <div className="w-full aspect-square rounded-xl bg-white/5 flex items-center justify-center overflow-hidden mb-4 relative">
                    <img
                      src={IMAGES[otherIdx].src}
                      alt={other.name}
                      className="w-[80%] h-[80%] object-contain object-bottom group-hover:scale-108 transition-transform select-none"
                    />
                  </div>
                  <span className="text-[9px] uppercase font-bold text-white/40 block tracking-widest mb-1">
                    {other.series}
                  </span>
                  <h4 className="font-bold text-sm text-white uppercase text-center">{other.name}</h4>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

// ================= VIEW: SUCCESS =================
function SuccessView() {
  const navigate = useNavigate();
  const invoiceNum = 'TH-' + Math.floor(10000 + Math.random() * 90000) + '-26';

  return (
    <div className="min-h-screen bg-[#121318] text-white flex flex-col justify-between relative">
      <div style={{ zIndex: 50, opacity: 0.4 }} className="absolute inset-0 pointer-events-none grain-overlay" />

      <AppHeader />

      <main className="flex-grow py-20 px-4 flex flex-col items-center justify-center max-w-xl mx-auto text-center relative z-10">
        <div className="w-20 h-20 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(52,211,153,0.15)] animate-float-medium">
          <Check size={40} strokeWidth={3} />
        </div>

        <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase block mb-2">Order Confirmed</span>
        <h1 className="text-3xl sm:text-5xl font-anton uppercase tracking-tight text-white mb-4">
          Pre-order Registered!
        </h1>
        <p className="text-white/60 text-sm mb-6 leading-relaxed">
          Thank you for securing your MINTCAST collectible figurine. Batch validation was successful and your unit reservation is completed.
        </p>

        {/* Invoice specifications */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-left text-xs mb-8">
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-white/40 uppercase">Invoice Reference</span>
            <span className="font-mono text-white font-bold">{invoiceNum}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-white/40 uppercase">Batch Type</span>
            <span className="font-semibold text-white">SLA Stereolithography Vol 1</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-white/40 uppercase">Delivery Window</span>
            <span className="font-semibold text-emerald-400">Est. 12-14 Business Days</span>
          </div>
        </div>

        {/* SLA timeline showcase */}
        <div className="w-full text-left mb-10">
          <h4 className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-5 text-center">Your Figurine Creation Stages</h4>
          <div className="grid grid-cols-4 text-[9px] sm:text-xs font-semibold text-center text-white/40 gap-2">
            <div className="flex flex-col items-center gap-2 text-emerald-400">
              <div className="w-6 h-6 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center">1</div>
              <span>SLA Print</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">2</div>
              <span>Hand Paint</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">3</div>
              <span>QC Validation</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">4</div>
              <span>Safe Box</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all duration-200 cursor-pointer inline-block"
        >
          Return to Dashboard
        </button>
      </main>

      <AppFooter />
    </div>
  );
}

// ================= AP PROUTING SWITCH =================
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/figurine/:id" element={<DetailView />} />
        <Route path="/preordered" element={<SuccessView />} />
      </Routes>
    </Router>
  );
}

export default App;
