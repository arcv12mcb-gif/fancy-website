import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Menu,
  Moon,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import heroImage from "./assets/midnight-meridian-hero.png";

const navItems = [
  ["Route", "#route"],
  ["Cabins", "#cabins"],
  ["Atlas", "#atlas"],
  ["Reserve", "#reserve"],
];

const routeStops = [
  {
    name: "Lamplight Platform",
    altitude: "1,840m",
    detail: "Board beside wet stone, brass lanterns, and the first star charts of the evening.",
    accent: "#d7ae63",
    x: -3.2,
    y: -1.2,
  },
  {
    name: "Vesper Ridge",
    altitude: "2,560m",
    detail: "A slow climb through dark pine, with the lounge glass angled toward the Milky Way.",
    accent: "#74c3c7",
    x: -1.15,
    y: 1.25,
  },
  {
    name: "The Meridian Cut",
    altitude: "2,910m",
    detail: "The train pauses where the sky is cleanest and the telescope salon opens.",
    accent: "#f4e6c8",
    x: 1.0,
    y: 0.2,
  },
  {
    name: "Dawn Terminal",
    altitude: "1,470m",
    detail: "Breakfast arrives as the observatory car rolls into blue hour and lower air.",
    accent: "#c9503f",
    x: 3.1,
    y: -1.0,
  },
];

const cabinTypes = [
  {
    name: "Glass Berth",
    capacity: "Sleeps 2",
    copy: "A compact suite with a tilting sky window, velvet bench, and brass reading rail.",
    details: ["Private washroom", "Ceiling star shade", "Midnight tea service"],
  },
  {
    name: "Atlas Suite",
    capacity: "Sleeps 3",
    copy: "A wider cabin built around a chart desk, foldaway berth, and ridge-facing sofa.",
    details: ["Chart desk", "Panoramic sofa", "Guide call button"],
  },
  {
    name: "The North Room",
    capacity: "Sleeps 4",
    copy: "The end-car residence with curved glass, a small library, and private dining.",
    details: ["End-car glass", "Private dinner", "Telescope priority"],
  },
];

const manifest = [
  ["01", "Board after sunset", "A concierge checks bags while guides mark the night sky over the platform."],
  ["02", "Observe in motion", "The glass lounge tracks the route as constellations pass over each ridge."],
  ["03", "Wake below dawn", "Coffee, notebooks, and mountain light arrive before the final station."],
];

const departures = [
  "New moon weekend",
  "Perseid week",
  "Equinox crossing",
  "Private charter",
];

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
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

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#home" aria-label="Midnight Meridian home">
        <span className="brand-seal">
          <Moon size={19} aria-hidden="true" />
        </span>
        <span>
          <span className="brand-name">Midnight Meridian</span>
          <span className="brand-line">Night train observatory</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <a className="header-action" href="#reserve">
        <CalendarDays size={17} aria-hidden="true" />
        Reserve
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#reserve" onClick={() => setOpen(false)}>
            Reserve
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section" aria-label="Midnight Meridian">
      <img className="hero-image" src={heroImage} alt="" />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="kicker">Luxury rail journeys beneath dark-sky routes</p>
          <h1>Midnight Meridian</h1>
          <p className="hero-lede">
            A moving observatory where polished railcars, mountain air, and guided astronomy meet
            for one unhurried night above the tree line.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#reserve">
              Choose a departure
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="ghost-button" href="#cabins">
              View cabins
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="hero-ledger" aria-label="Journey highlights">
          <div>
            <span>Guests</span>
            <strong>24</strong>
          </div>
          <div>
            <span>Route</span>
            <strong>Alpine dark sky</strong>
          </div>
          <div>
            <span>Salon</span>
            <strong>Brass telescope</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Manifest() {
  return (
    <section className="manifest-strip" aria-label="Journey sequence">
      <div className="content-frame manifest-grid">
        {manifest.map(([step, title, copy]) => (
          <article className="manifest-item" key={title}>
            <span>{step}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RouteSection({ activeStop, setActiveStop }) {
  return (
    <section id="route" className="route-section">
      <div className="content-frame route-layout">
        <Reveal>
          <div className="section-copy">
            <p className="kicker">The route</p>
            <h2>A night plotted by altitude, not hurry.</h2>
            <p>
              Midnight Meridian climbs slowly so the sky changes with the landscape. Each stop is
              chosen for clear air, quiet platforms, and enough time to look properly.
            </p>
          </div>
        </Reveal>

        <div className="route-board" aria-label="Route stops">
          {routeStops.map((stop, index) => (
            <Reveal key={stop.name} delay={index * 90}>
              <button
                type="button"
                className={activeStop.name === stop.name ? "route-stop is-active" : "route-stop"}
                style={{ "--accent": stop.accent }}
                onClick={() => setActiveStop(stop)}
              >
                <span className="stop-number">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{stop.name}</strong>
                  <small>{stop.altitude}</small>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CabinsSection() {
  return (
    <section id="cabins" className="cabins-section">
      <div className="content-frame">
        <Reveal>
          <div className="section-copy centered-copy">
            <p className="kicker">Cabins</p>
            <h2>Rooms designed around the window.</h2>
            <p>
              Every berth is quiet, compact, and deliberately low-lit, with tactile details that
              belong to rail travel instead of a hotel lobby.
            </p>
          </div>
        </Reveal>

        <div className="cabin-grid">
          {cabinTypes.map((cabin, index) => (
            <Reveal key={cabin.name} delay={index * 90}>
              <article className="cabin-card">
                <div className="cabin-topline">
                  <Sparkles size={18} aria-hidden="true" />
                  <span>{cabin.capacity}</span>
                </div>
                <h3>{cabin.name}</h3>
                <p>{cabin.copy}</p>
                <ul>
                  {cabin.details.map((detail) => (
                    <li key={detail}>
                      <Star size={14} aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarAtlas({ activeStop }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const atlasGroup = new THREE.Group();
    scene.add(atlasGroup);

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    const starColors = [];

    for (let index = 0; index < 900; index += 1) {
      const radius = 3.5 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 5.2;
      starPositions.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius - 1.2);

      const warmth = Math.random();
      starColors.push(0.8 + warmth * 0.2, 0.82 + warmth * 0.13, 0.92 + warmth * 0.08);
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.026,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    atlasGroup.add(stars);

    const routePoints = routeStops.map((stop) => new THREE.Vector3(stop.x, stop.y, 0.25));
    const curve = new THREE.CatmullRomCurve3(routePoints);
    const routeGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(96));
    const routeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(activeStop.accent),
      transparent: true,
      opacity: 0.94,
    });
    const routeLine = new THREE.Line(routeGeometry, routeMaterial);
    atlasGroup.add(routeLine);

    const markerGeometry = new THREE.SphereGeometry(0.085, 24, 24);
    const markerMaterials = routeStops.map((stop) => (
      new THREE.MeshBasicMaterial({ color: new THREE.Color(stop.accent) })
    ));
    const markers = routeStops.map((stop, index) => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterials[index]);
      marker.position.set(stop.x, stop.y, 0.25);
      atlasGroup.add(marker);
      return marker;
    });

    const trainLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 32, 32),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(activeStop.accent) }),
    );
    atlasGroup.add(trainLight);

    const horizonGeometry = new THREE.RingGeometry(2.4, 2.44, 160);
    const horizonMaterial = new THREE.MeshBasicMaterial({
      color: 0xd7ae63,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
    horizon.rotation.x = Math.PI / 2.3;
    horizon.position.y = -1.95;
    atlasGroup.add(horizon);

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event) => {
      const bounds = mount.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.45;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.28;
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const routePosition = curve.getPoint((elapsed * 0.055) % 1);

      trainLight.position.copy(routePosition);
      stars.rotation.y += prefersReducedMotion ? 0 : 0.0009;
      atlasGroup.rotation.y += (pointerX - atlasGroup.rotation.y) * 0.035;
      atlasGroup.rotation.x += (-pointerY - atlasGroup.rotation.x) * 0.035;

      markers.forEach((marker, index) => {
        const pulse = prefersReducedMotion ? 1 : 1 + Math.sin(elapsed * 2 + index) * 0.18;
        marker.scale.setScalar(routeStops[index].name === activeStop.name ? 1.7 * pulse : 1 * pulse);
      });

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    resize();
    render();
    mount.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      mount.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      starGeometry.dispose();
      starMaterial.dispose();
      routeGeometry.dispose();
      routeMaterial.dispose();
      markerGeometry.dispose();
      markerMaterials.forEach((material) => material.dispose());
      trainLight.geometry.dispose();
      trainLight.material.dispose();
      horizonGeometry.dispose();
      horizonMaterial.dispose();
      renderer.dispose();
    };
  }, [activeStop]);

  return <div ref={mountRef} className="star-atlas-canvas" aria-hidden="true" />;
}

function AtlasSection({ activeStop, setActiveStop }) {
  return (
    <section id="atlas" className="atlas-section">
      <StarAtlas activeStop={activeStop} />
      <div className="atlas-shade" aria-hidden="true" />
      <div className="content-frame atlas-content">
        <Reveal>
          <div className="atlas-copy">
            <p className="kicker">Live atlas</p>
            <h2>{activeStop.name}</h2>
            <p>{activeStop.detail}</p>
            <div className="atlas-meta">
              <span>{activeStop.altitude}</span>
              <span>Dark-sky window</span>
            </div>
          </div>
        </Reveal>

        <div className="atlas-controls" aria-label="Choose route stop">
          {routeStops.map((stop) => (
            <button
              key={stop.name}
              type="button"
              className={activeStop.name === stop.name ? "is-active" : ""}
              style={{ "--accent": stop.accent }}
              onClick={() => setActiveStop(stop)}
            >
              {stop.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReserveSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="reserve" className="reserve-section">
      <div className="content-frame reserve-layout">
        <Reveal>
          <div className="section-copy">
            <p className="kicker">Reserve</p>
            <h2>Send a signal for the next dark window.</h2>
            <p>
              Select a departure mood and party size. The concierge prepares a route note, cabin
              recommendation, and sky conditions brief before any booking is confirmed.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="reservation-form" onSubmit={handleSubmit}>
            <label>
              Departure
              <select defaultValue={departures[0]}>
                {departures.map((departure) => (
                  <option key={departure}>{departure}</option>
                ))}
              </select>
            </label>

            <label>
              Party size
              <input type="number" min="1" max="24" defaultValue="2" />
            </label>

            <label>
              Cabin preference
              <select defaultValue={cabinTypes[0].name}>
                {cabinTypes.map((cabin) => (
                  <option key={cabin.name}>{cabin.name}</option>
                ))}
              </select>
            </label>

            <label>
              Contact
              <input type="email" placeholder="you@example.com" required />
            </label>

            <button className="primary-button signal-button" type="submit">
              Send request
              <Send size={18} aria-hidden="true" />
            </button>

            {sent && (
              <p className="form-status" role="status">
                Signal received. A boarding brief is ready for the next conversation.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-frame footer-inner">
        <a className="brand-lockup" href="#home" aria-label="Midnight Meridian home">
          <span className="brand-seal">
            <Moon size={19} aria-hidden="true" />
          </span>
          <span>
            <span className="brand-name">Midnight Meridian</span>
            <span className="brand-line">Night train observatory</span>
          </span>
        </a>
        <div className="footer-links">
          <a href="#route">Route</a>
          <a href="#cabins">Cabins</a>
          <a href="#atlas">Atlas</a>
          <a href="#reserve">Reserve</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeStop, setActiveStop] = useState(routeStops[1]);

  useEffect(() => {
    if (!window.location.hash) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Manifest />
        <RouteSection activeStop={activeStop} setActiveStop={setActiveStop} />
        <CabinsSection />
        <AtlasSection activeStop={activeStop} setActiveStop={setActiveStop} />
        <ReserveSection />
      </main>
      <Footer />
    </div>
  );
}
