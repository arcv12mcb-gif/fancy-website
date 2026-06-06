import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Gem,
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  X,
} from "lucide-react";

const navItems = [
  ["Collections", "#collections"],
  ["Visit", "#visit"],
  ["Preview", "#preview"],
  ["Contact", "#contact"],
];

const collections = [
  {
    title: "Jewelry",
    detail: "Silver rings, gemstone pendants, bracelets, earrings, and everyday pieces with a little mystery.",
    accent: "from-amber-300 to-rose-300",
    tags: ["rings", "pendants", "silver", "bracelets", "earrings"],
  },
  {
    title: "Crystals",
    detail: "Tumbled stones, display specimens, altar pieces, and small gifts chosen for color and texture.",
    accent: "from-teal-300 to-sky-300",
    tags: ["stones", "specimens", "altar", "gems", "display"],
  },
  {
    title: "Beads",
    detail: "Strands, charms, findings, and inspiration for makers building something personal.",
    accent: "from-violet-300 to-fuchsia-300",
    tags: ["strands", "charms", "findings", "makers", "craft"],
  },
  {
    title: "Gifts",
    detail: "Clothing, incense, ritual goods, and curious objects for thoughtful browsing.",
    accent: "from-lime-200 to-emerald-300",
    tags: ["clothing", "incense", "ritual", "prayer", "scarves"],
  },
];

const storeNotes = [
  "Eclectic jewelry, beads, crystals, clothing, gifts, and prayer goods",
  "Independent Lincoln storefront on O Street",
  "Made for browsing, gifting, and finding one uncommon piece",
];

const visitModes = [
  {
    name: "Browse",
    label: "Slow discovery",
    copy: "Start with jewelry trays, crystals, and handmade-feeling gift shelves.",
    color: "#c4862c",
  },
  {
    name: "Gift",
    label: "Quick ideas",
    copy: "Use the shop as a fast stop for incense, stones, charms, and small surprises.",
    color: "#075f63",
  },
  {
    name: "Make",
    label: "Creative supplies",
    copy: "Lean into beads, charms, findings, and pieces for custom projects.",
    color: "#582547",
  },
];

const reviews = [
  "A local shop preview with more personality than a standard jewelry template.",
  "Warm, tactile, and easy to scan before deciding to stop in.",
  "Clear location details with collections that match the actual store identity.",
];

function AmbientBackground() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const handlePointerMove = (event) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${(event.clientX / window.innerWidth) * 100}%`);
        root.style.setProperty("--cursor-y", `${(event.clientY / window.innerHeight) * 100}%`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <span className="cursor-glow" />
      <span className="ambient-stone stone-one" />
      <span className="ambient-stone stone-two" />
      <span className="ambient-stone stone-three" />
      <span className="ambient-thread thread-one" />
      <span className="ambient-thread thread-two" />
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ThreeCrystalShowcase({ activeMode }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.7, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeMode.color),
      metalness: 0.05,
      roughness: 0.18,
      transmission: 0.18,
      thickness: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      ior: 1.45,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf7c46b,
      metalness: 0.75,
      roughness: 0.24,
    });

    const stoneMaterials = [
      new THREE.MeshPhysicalMaterial({ color: 0xf0dbff, roughness: 0.22, clearcoat: 0.65 }),
      new THREE.MeshPhysicalMaterial({ color: 0xb2ece7, roughness: 0.18, clearcoat: 0.7 }),
      new THREE.MeshPhysicalMaterial({ color: 0xffd9a0, roughness: 0.28, clearcoat: 0.55 }),
    ];

    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.18, 0), crystalMaterial);
    crystal.scale.set(1, 1.45, 1);
    crystal.rotation.set(0.32, 0.46, 0.08);
    group.add(crystal);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.055, 18, 96), accentMaterial);
    ring.rotation.x = Math.PI / 2.08;
    ring.rotation.z = 0.2;
    group.add(ring);

    const orbit = new THREE.Group();
    group.add(orbit);

    const stoneGeometry = new THREE.IcosahedronGeometry(0.18, 1);
    const orbitStones = Array.from({ length: 9 }, (_, index) => {
      const material = stoneMaterials[index % stoneMaterials.length];
      const stone = new THREE.Mesh(stoneGeometry, material);
      const angle = (index / 9) * Math.PI * 2;
      stone.position.set(Math.cos(angle) * 1.95, Math.sin(angle) * 0.62, Math.sin(angle) * 1.3);
      stone.scale.setScalar(index % 2 ? 0.78 : 1);
      orbit.add(stone);
      return stone;
    });

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 2.2, 0.16, 80),
      new THREE.MeshStandardMaterial({
        color: 0x2f1d1a,
        metalness: 0.12,
        roughness: 0.45,
      }),
    );
    base.position.y = -1.85;
    base.rotation.y = 0.18;
    group.add(base);

    scene.add(new THREE.AmbientLight(0xfff2dc, 1.25));

    const keyLight = new THREE.PointLight(new THREE.Color(activeMode.color), 4.2, 12);
    keyLight.position.set(2.7, 2.2, 3.4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffffff, 2.8, 10);
    rimLight.position.set(-2.5, 1.7, 2.6);
    scene.add(rimLight);

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const handlePointerMove = (event) => {
      const bounds = mount.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.7;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.5;
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      crystal.rotation.y += 0.006;
      crystal.rotation.x = 0.32 + Math.sin(elapsed * 0.9) * 0.05;
      orbit.rotation.y -= 0.01;
      orbit.rotation.z = Math.sin(elapsed * 0.55) * 0.08;
      group.rotation.y += (pointerX - group.rotation.y) * 0.045;
      group.rotation.x += (-pointerY - group.rotation.x) * 0.045;
      keyLight.position.x = 2.7 + Math.sin(elapsed) * 0.5;

      orbitStones.forEach((stone, index) => {
        stone.rotation.x += 0.012 + index * 0.0008;
        stone.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize();
    animate();
    mount.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      mount.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      crystal.geometry.dispose();
      crystalMaterial.dispose();
      ring.geometry.dispose();
      accentMaterial.dispose();
      stoneGeometry.dispose();
      stoneMaterials.forEach((material) => material.dispose());
      base.geometry.dispose();
      base.material.dispose();
    };
  }, [activeMode.color]);

  useEffect(() => {
    const mount = mountRef.current;
    const canvas = mount?.querySelector("canvas");

    if (canvas) {
      canvas.dataset.mode = activeMode.name;
    }
  }, [activeMode.name]);

  return (
    <div
      ref={mountRef}
      className="three-crystal-showcase"
      style={{ "--mode-color": activeMode.color }}
      aria-label="Interactive 3D crystal and jewelry showcase"
    />
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#home" className="brand-mark" aria-label="Euphoria home">
        <span className="brand-symbol">
          <Gem size={22} />
        </span>
        <span>
          <span className="brand-name">Euphoria</span>
          <span className="brand-subtitle">Lincoln, NE</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#contact">
        <MapPin size={18} />
        4139 O St
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Visit 4139 O St
          </a>
        </nav>
      )}
    </header>
  );
}

function HeroStillLife() {
  return (
    <div className="still-life" aria-label="Jewelry, crystals, beads, and gifts arranged on a boutique table">
      <div className="tray">
        <span className="ring ring-one" />
        <span className="ring ring-two" />
        <span className="crystal crystal-one" />
        <span className="crystal crystal-two" />
        <span className="bead-strand" />
        <span className="pendant" />
      </div>
      <div className="shelf-card top-card">
        <Sparkles size={18} />
        <span>Crystals</span>
      </div>
      <div className="shelf-card bottom-card">
        <Heart size={18} />
        <span>Gifts</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">
          Eclectic jewelry and crystal shop on O Street
        </p>

        <h1>
          <span>Jewelry,</span>
          <span>crystals, and</span>
          <span>curious gifts.</span>
        </h1>

        <p className="hero-lede">
          A storefront-style website concept for Lincoln shoppers looking for jewelry, beads, crystals,
          clothing, gifts, and small ritual goods with a personal, locally rooted feel.
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="#collections">
            Browse collections
            <ArrowRight size={18} />
          </a>
          <a className="secondary-button" href="#visit">
            Plan a visit
            <MapPin size={18} />
          </a>
        </div>

        <div className="store-strip" aria-label="Store highlights">
          {storeNotes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <HeroStillLife />
      </div>
    </section>
  );
}

function Collections({ selectedCollection, setSelectedCollection, favorites, toggleFavorite }) {
  return (
    <section id="collections" className="section-wrap">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">Store preview</p>
          <h2>Make the first click feel like walking in.</h2>
          <p>
            The page now frames Euphoria as a browsing destination, not just a generic jewelry store.
            Each category gives visitors a reason to explore before they arrive.
          </p>
        </div>
      </Reveal>

      <div className="collection-grid">
        {collections.map((item, index) => (
          <Reveal key={item.title} delay={index * 90}>
            <article
              className={`collection-card ${selectedCollection.title === item.title ? "is-selected" : ""}`}
            >
              <div className={`gem-chip bg-gradient-to-br ${item.accent}`}>
                <Sparkles size={22} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <div className="card-actions">
                <button type="button" onClick={() => setSelectedCollection(item)}>
                  Preview style
                  <ChevronRight size={17} />
                </button>
                <button
                  type="button"
                  className="icon-action"
                  aria-label={`${favorites.includes(item.title) ? "Remove" : "Save"} ${item.title}`}
                  aria-pressed={favorites.includes(item.title)}
                  onClick={() => toggleFavorite(item.title)}
                >
                  <Heart size={17} fill={favorites.includes(item.title) ? "currentColor" : "none"} />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Visit() {
  const [activeMode, setActiveMode] = useState(visitModes[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleTilt = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -18;

    setTilt({ x, y });
  };

  return (
    <section id="visit" className="visit-section">
      <div className="visit-panel">
        <Reveal>
          <div>
            <p className="eyebrow">Visit the shop</p>
            <h2>4139 O Street, Lincoln, Nebraska</h2>
            <p>
              The preview gives the storefront practical details and a stronger sense of place.
              Visitors can quickly see where the shop is, what kind of browsing to expect, and why
              it feels different from a standard mall jewelry counter.
            </p>
          </div>
        </Reveal>

        <div className="visit-details">
          {[
            [Store, "Independent local storefront"],
            [Clock, "Hours can be connected from Google Business Profile"],
            [Phone, "Phone and booking links can be added when confirmed"],
          ].map(([Icon, label], index) => (
            <Reveal key={label} delay={index * 100}>
              <div>
                <Icon size={20} />
                <span>{label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="visit-immersive" delay={140}>
          <div className="visit-3d-card">
            <div>
              <p className="eyebrow">Interactive visit planner</p>
              <h3>{activeMode.label}</h3>
              <p>{activeMode.copy}</p>
            </div>

            <div
              className="crystal-stage"
              onPointerMove={handleTilt}
              onPointerLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                "--tilt-x": `${tilt.y}deg`,
                "--tilt-y": `${tilt.x}deg`,
                "--mode-color": activeMode.color,
              }}
            >
              <ThreeCrystalShowcase activeMode={activeMode} />
              <div className="stage-badges" aria-hidden="true">
                <span>WebGL</span>
                <span>Drag light</span>
              </div>
            </div>

            <div className="mode-controls" aria-label="Visit mode selector">
              {visitModes.map((mode) => (
                <button
                  key={mode.name}
                  type="button"
                  className={activeMode.name === mode.name ? "is-active" : ""}
                  onClick={() => setActiveMode(mode)}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Preview({ selectedCollection, setSelectedCollection, favorites, query, setQuery }) {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = collections.filter((item) => {
    const searchTarget = [item.title, item.detail, ...item.tags].join(" ").toLowerCase();
    return !normalizedQuery || searchTarget.includes(normalizedQuery);
  });

  return (
    <section id="preview" className="preview-section">
      <Reveal>
        <div className="preview-copy">
          <p className="eyebrow">Website direction</p>
          <h2>Less template, more treasure hunt.</h2>
          <p>
            The new layout uses tactile color, tighter hierarchy, clearer calls to action, and
            collection previews that feel more like Euphoria: curious, layered, and local.
          </p>
          <label className="search-preview">
            <Search size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search jewelry, crystals, beads, incense..."
              aria-label="Search Euphoria collections"
            />
          </label>
          <div className="feature-panel">
            <div>
              <p className="feature-kicker">Currently previewing</p>
              <h3>{selectedCollection.title}</h3>
              <p>{selectedCollection.detail}</p>
            </div>
            <div className="tag-row">
              {selectedCollection.tags.map((tag) => (
                <button key={tag} type="button" onClick={() => setQuery(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="interactive-stack">
        <Reveal>
          <div className="match-panel">
            <div className="match-header">
              <span>{matches.length} match{matches.length === 1 ? "" : "es"}</span>
              {favorites.length > 0 && <span>{favorites.length} saved</span>}
            </div>
            <div className="match-list">
              {matches.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className={selectedCollection.title === item.title ? "is-active" : ""}
                  onClick={() => setSelectedCollection(item)}
                >
                  <span>{item.title}</span>
                  <small>{item.tags.slice(0, 3).join(" / ")}</small>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="review-grid">
          {reviews.map((review, index) => (
            <Reveal key={review} delay={index * 100}>
              <article className="review-card">
                <div className="stars" aria-label="Five star preview">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={15} fill="currentColor" />
                  ))}
                </div>
                <p>{review}</p>
                <span>Preview note {index + 1}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <Reveal>
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Ready for real photos, hours, and inventory.</h2>
          <p>
            This is a polished preview foundation. It can become a live store page once official
            photos, confirmed contact details, hours, and owner-approved copy are added.
          </p>
        </div>
      </Reveal>

      <div className="contact-actions">
        <a className="primary-button" href="https://www.google.com/maps/place/Euphoria/@40.8131297,-96.6638209,17z/data=!4m15!1m8!3m7!1s0x8796bc299f12830d:0x3b4bb58ee18fcceb!2sEuphoria!8m2!3d40.8131257!4d-96.661246!10e1!16s%2Fg%2F1tdq1mts!3m5!1s0x8796bc299f12830d:0x3b4bb58ee18fcceb!8m2!3d40.8131257!4d-96.661246!16s%2Fg%2F1tdq1mts?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D">
          Open map
          <MapPin size={18} />
        </a>
        <a className="secondary-button" href="#collections">
          View collections
          <ShoppingBag size={18} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Gem size={22} />
        <span>Euphoria preview website</span>
      </div>
      <p>Concept site for the Lincoln, Nebraska storefront. Replace preview content with verified owner details before publishing.</p>
    </footer>
  );
}

export default function App() {
  const [selectedCollection, setSelectedCollection] = useState(collections[0]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!window.location.hash) {
      return undefined;
    }

    const target = document.querySelector(window.location.hash);
    const scrollTimer = window.setTimeout(() => {
      target?.scrollIntoView({ block: "start" });
    }, 120);

    return () => window.clearTimeout(scrollTimer);
  }, []);

  const toggleFavorite = (title) => {
    setFavorites((current) => (
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    ));
  };

  return (
    <div className="site-shell">
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <Collections
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        <Visit />
        <Preview
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          favorites={favorites}
          query={query}
          setQuery={setQuery}
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
