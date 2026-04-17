import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ================= NEWS TICKER ================= */
const NewsTicker = () => {
  const news = [
    "Admissions Open for 2026–27",
    "Join Our School Community – Admissions Open",
  ];

  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden">
      <div className="whitespace-nowrap animate-scroll text-[11px] sm:text-sm font-semibold">
        {news.map((item, i) => (
          <span key={i} className="mx-6">
            • {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ================= NAVBAR ================= */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => {
    setIsOpen(false);
    setShowMore(false);
  }, [location.pathname]);

  /* Lock body scroll on mobile */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Why Sanskruti Techno", path: "/why-jadhavar" },
    { label: "Curriculum", path: "/curriculum" },
    { label: "Admissions", path: "/admissions" },
    { label: "Facilities", path: "/facilities" },
    { label: "Life At School", path: "/life-at-jadhavar" },
    { label: "Info Center", path: "/info-center" },
    { label: "Contact", path: "/contact" },
  ];

  const moreLinks = [
    { label: "Gallery", path: "/gallery" },
    { label: "Blog", path: "/blog" },
    { label: "Announcements", path: "/announcements" },
    { label: "Careers", path: "/career" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"}`}
    >
      <NewsTicker />

      {/* ================= TOP BAR ================= */}
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">

          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logo1.png"
              alt="Sanskruti Techno School"
              className="w-12 sm:w-16 md:w-20"
            />
          </Link>

          {/* TITLE */}
          <div className="flex-1 text-center px-2">
            <h2 className="font-bold text-primary leading-tight
              text-sm sm:text-lg md:text-2xl lg:text-3xl">
              Sanskruti Techno School
            </h2>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden lg:flex justify-center flex-wrap gap-1 xl:gap-2 mt-4">

          {mainLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition
              ${location.pathname === link.path
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"}`}
            >
              {link.label}
            </Link>
          ))}

          {/* MORE DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
          >
            <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
              More ▾
            </button>

            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border"
                >
                  {moreLinks.map((link, i) => (
                    <Link
                      key={i}
                      to={link.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="lg:hidden fixed top-[110px] right-0 w-full h-[calc(100vh-110px)]
            bg-white overflow-y-auto shadow-lg"
          >
            <div className="px-4 py-4 space-y-1 pb-20">

              {mainLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}

              {/* MOBILE MORE */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="w-full text-left px-4 py-3 font-medium rounded-lg hover:bg-gray-100"
              >
                More ▾
              </button>

              <AnimatePresence>
                {showMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-4"
                  >
                    {moreLinks.map((link, i) => (
                      <Link
                        key={i}
                        to={link.path}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
