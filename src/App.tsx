import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, Server, Box, Layers, Network, Zap, Thermometer, ShieldBan, Lightbulb, Cctv } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT ARCHITECTURE ---

const Navbar = ({ onRequestBlueprint }: { onRequestBlueprint: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 w-[95%] max-w-5xl rounded-[3rem] transition-all duration-500 px-6 py-4 flex items-center justify-between ${scrolled ? 'bg-background/80 backdrop-blur-xl border border-primary text-foreground shadow-xl' : 'bg-transparent text-white'}`}>
      <div className="font-sans font-bold text-xl tracking-tight uppercase">Module One</div>
      <div className="hidden md:flex gap-8 font-sans text-sm font-medium">
        <a href="#features" className="hover:-translate-y-[1px] transition-transform">Architecture</a>
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Integration</a>
      </div>
      <button onClick={onRequestBlueprint} className="group relative overflow-hidden rounded-[2rem] bg-accent text-white px-6 py-2 text-sm font-bold transition-all hover:scale-[1.03] active:scale-95 shadow-sm" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
        <span className="relative z-10 flex items-center gap-2">Request a Blueprint <ArrowRight size={16} /></span>
      </button>
    </nav>
  );
};

const Hero = ({ onRequestBlueprint }: { onRequestBlueprint: () => void }) => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-part', {
        y: 50,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative h-[100dvh] w-full flex items-end overflow-hidden pb-16 px-6 md:pb-24 md:px-12 bg-foreground">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558442086-8b059db1400c?auto=format&fit=crop&q=80&w=2600" 
          alt="Modern luxury home interior" 
          className="w-full h-full object-cover opacity-50 grayscale" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-4">
        <div>
          <h1 className="hero-part font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-background mb-1">Your Home.</h1>
          <h2 className="hero-part font-drama italic text-[4.5rem] md:text-[8rem] lg:text-[11rem] leading-[0.85] text-background -ml-2 mb-4">Your System.</h2>
        </div>
        <p className="hero-part max-w-xl font-sans text-background/80 text-lg md:text-xl font-medium mt-4 mb-8">
          Intelligent automation infrastructure for modern developers.
        </p>
        <button onClick={onRequestBlueprint} className="hero-part group relative overflow-hidden rounded-[3rem] bg-accent text-white px-8 py-4 text-lg font-bold transition-all hover:scale-[1.03] active:scale-95 shadow-lg" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          <span className="relative z-10 flex items-center gap-3">Request a Blueprint <ArrowRight size={20} /></span>
        </button>
      </div>
    </section>
  );
};

// --- FEATURE CARDS ---

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Hardware Ownership", val: "100%" },
    { id: 2, label: "Recurring Fees", val: "0.00" },
    { id: 3, label: "Licensing Status", val: "Unrestricted" }
  ]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        if(last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary rounded-[2rem] p-8 border-2 border-foreground shadow-[8px_8px_0_0_#111] flex flex-col h-full transform transition-transform hover:-translate-y-2 relative overflow-hidden group">
      <div className="mb-8">
        <h3 className="font-sans font-bold text-2xl text-foreground mb-2 leading-tight">Zero Subscription<br/>Fees</h3>
        <p className="font-sans text-foreground/70 text-sm font-medium">Own your hardware outright.</p>
      </div>
      <div className="relative h-[200px] w-full mt-auto">
        {cards.map((card, i) => {
          const isTop = i === 0;
          return (
             <div 
               key={card.id} 
               className="absolute left-0 right-0 rounded-none bg-background border-2 border-foreground p-4 flex justify-between items-center transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
               style={{
                 top: `${i * 20}px`,
                 scale: 1 - i * 0.05,
                 opacity: 1 - i * 0.2,
                 zIndex: 10 - i,
                 boxShadow: isTop ? '4px 4px 0 0 #111' : 'none'
               }}
             >
               <div className="flex items-center gap-3 text-foreground font-mono text-sm font-bold uppercase tracking-tight">
                 <Server size={16} className={isTop ? "text-accent" : "text-foreground/40"}/> {card.label}
               </div>
               <div className={`text-xs font-mono font-bold ${isTop ? 'text-accent' : 'text-foreground/40'}`}>{card.val}</div>
             </div>
          );
        })}
      </div>
    </div>
  );
};

const TelemetryTypewriter = () => {
  const fullText = "> RUNNING PRE-DRYWALL HOOK\n> ESTABLISHING NETWORK BACKBONE...\n> ROUTING CAT6A INTERCONNECTS\n> INITIATING SITE SECURITY PROTOCOL\n> STATUS: ROUGH-IN COMPLETE";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    let intervalId: number;
    let timeoutId: number;

    const animateText = () => {
      intervalId = window.setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(intervalId);
          timeoutId = window.setTimeout(() => { i = 0; animateText(); }, 4000);
        }
      }, 50);
    };

    animateText();
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [fullText]);

  return (
    <div className="bg-foreground rounded-[2rem] p-8 shadow-[8px_8px_0_0_#E63B2E] flex flex-col h-full transform transition-transform hover:-translate-y-2 relative overflow-hidden group">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans font-bold text-2xl text-background mb-1">Structural Integration</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-none border border-white/20">
          <div className="w-2 h-2 rounded-none bg-accent animate-pulse"></div>
          <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest font-bold">Terminal</span>
        </div>
      </div>
      <p className="font-sans text-white/50 text-sm mb-6 font-medium">Deploying at rough-in stage.</p>
      
      <div className="bg-[#0a0a0a] rounded-none p-6 h-[180px] w-full mt-auto text-primary/80 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-line border border-white/10 shadow-inner flex flex-col justify-end">
        <div className="text-white/90">
          {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
        </div>
      </div>
    </div>
  );
};

const CursorScheduler = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set('.cursor', { x: 0, y: 0, opacity: 0 })
        .to('.cursor', { opacity: 1, duration: 0.3 })
        .to('.cursor', { x: 40, y: 25, duration: 1, ease: 'power2.inOut' })
        .to('.cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.comp-1', { borderColor: '#E63B2E', backgroundColor: '#E63B2E', color: '#fff', duration: 0.2 }, "-=0.2")
        .to('.cursor', { x: 220, y: 140, duration: 1, ease: 'power2.inOut', delay: 0.2 })
        .to('.cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.2")
        .to('.cursor', { opacity: 0, duration: 0.3, delay: 0.5 })
        .to('.comp-1', { borderColor: 'rgba(17,17,17,0.2)', backgroundColor: 'transparent', color: '#111', duration: 0.2 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-primary rounded-[2rem] p-8 border-2 border-foreground shadow-[8px_8px_0_0_#111] flex flex-col h-full transform transition-transform hover:-translate-y-2 relative overflow-hidden group">
      <div className="mb-8">
        <h3 className="font-sans font-bold text-2xl text-foreground mb-2">Open Architecture</h3>
        <p className="font-sans text-foreground/70 text-sm font-medium">Interchangeable hardware.</p>
      </div>

      <div className="relative mt-auto">
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="comp-1 border-2 border-foreground/20 aspect-video flex items-center justify-center font-mono text-[10px] font-bold uppercase transition-colors">Ubiquiti</div>
          <div className="comp-2 border-2 border-foreground/20 aspect-video flex items-center justify-center font-mono text-[10px] font-bold uppercase transition-colors">PfSense</div>
          <div className="comp-3 border-2 border-foreground/20 aspect-video flex items-center justify-center font-mono text-[10px] font-bold uppercase transition-colors">Docker</div>
          <div className="comp-4 border-2 border-foreground/20 aspect-video flex items-center justify-center font-mono text-[10px] font-bold uppercase transition-colors">HA Core</div>
          <div className="comp-5 border-2 border-foreground/20 aspect-video flex items-center justify-center font-mono text-[10px] font-bold uppercase transition-colors">MQTT</div>
          <div className="comp-6 border-2 border-foreground/20 aspect-video flex items-center justify-center font-mono text-[10px] font-bold uppercase transition-colors">Z-Wave</div>
        </div>
        <div className="flex justify-end mt-6">
           <button className="save-btn font-sans text-xs font-bold bg-foreground text-background px-4 py-2 rounded-none border-b-2 border-r-2 border-black">Deploy Config</button>
        </div>

        {/* Animated Cursor */}
        <div className="cursor absolute top-0 left-0 pointer-events-none z-10 w-6 h-6" style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,1))' }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.78 6.74 21.35L11.44 17.06H17.5C18.05 17.06 18.5 16.61 18.5 16.06V16.03C18.5 15.82 18.44 15.62 18.33 15.45L5.5 3.21Z" fill="white" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 min-h-[420px]">
          <DiagnosticShuffler />
          <TelemetryTypewriter />
          <CursorScheduler />
        </div>
      </div>
    </section>
  );
};

// --- LOXONE-STYLE INFRASTRUCTURE GRID ---

const pillars = [
  { icon: <Network size={32} />, name: "Networking Backbone", details: "Enterprise-grade Ubiquiti deployments. Dedicated VLANs, PoE switching, and multi-gig routing establishing the ultimate foundational layer." },
  { icon: <Zap size={32} />, name: "Power Allocation", details: "Absolute phase monitoring and battery backup bridging. When the grid drops, local servers and physical infrastructure retain 100% capacity." },
  { icon: <Thermometer size={32} />, name: "Environmental Routing", details: "Offline HVAC mitigation. Seamless integration with local-API thermostats pushing raw telemetry data, devoid of third-party cloud routing." },
  { icon: <ShieldBan size={32} />, name: "Access & Hardening", details: "Commercial-tier door relays and biometric intercepts built on entirely localized servers ensuring physical perimeter lockdown." },
  { icon: <Lightbulb size={32} />, name: "Luminance Routing", details: "Enterprise-tier illumination engines. Centralized DMX and DALI topologies ensuring absolute zero-latency execution across all low-voltage control surfaces." },
  { icon: <Cctv size={32} />, name: "Surveillance Array", details: "Internal Network Video Recorders processing 4K streams locally without bounding video data through external corporate telemetry servers." }
];

const SubsystemGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.grid-cell', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="infrastructure" ref={gridRef} className="py-24 px-6 md:px-12 bg-background border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase tracking-tighter mb-4">Core Utilities Array</h2>
          <p className="font-mono font-bold text-foreground/70 uppercase tracking-widest text-sm max-w-2xl">
            We reject the fragmented "smart home gadget" mentality. Module One approaches automation as a localized grid of independent infrastructural pillars tied to a unified processing brain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
             <div key={i} className="grid-cell bg-primary rounded-[2rem] p-8 border-2 border-foreground shadow-[8px_8px_0_0_#111] transform transition-transform hover:-translate-y-2 group">
               <div className="mb-6 inline-flex p-4 border-2 border-foreground bg-background rounded-none text-foreground transition-colors group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                 {pillar.icon}
               </div>
               <h3 className="font-sans font-extrabold text-xl text-foreground uppercase tracking-tight mb-3">
                 {pillar.name}
               </h3>
               <p className="font-mono text-xs text-foreground/90 font-bold leading-relaxed border-l-2 border-accent pl-3">
                 {pillar.details}
               </p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- PHILOSOPHY SECTION ---

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-word-1', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0, y: 20, duration: 0.8, stagger: 0.04, ease: 'power2.out'
      });
      gsap.from('.phil-word-2', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' },
        opacity: 0, y: 30, duration: 1, stagger: 0.08, ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const text1 = "Most integrators focus on: locked-in walled gardens.".split(" ");
  const text2 = "We focus on: open-source control.".split(" ");

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-32 md:py-48 px-6 md:px-12 bg-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1548685934-1147055963e6?auto=format&fit=crop&q=80&w=2000" 
          alt="Raw concrete structure" 
          className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay" 
          style={{ transform: 'scale(1.1)' }}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <div className="font-sans text-xl md:text-3xl text-primary font-bold leading-relaxed max-w-2xl px-6 border-l-4 border-primary/20">
          {text1.map((w, i) => <span key={i} className="phil-word-1 inline-block mr-2">{w}</span>)}
        </div>
        <div className="font-drama italic text-5xl md:text-8xl leading-tight text-white border-l-4 border-accent pl-6">
          {text2.map((w, i) => {
            const isAccent = w.replace(/[.,]/g,'') === "control";
            return <span key={i} className={`phil-word-2 inline-block mr-4 ${isAccent ? 'text-accent' : ''}`}>{w}</span>;
          })}
        </div>
      </div>
    </section>
  );
};

// --- PROTOCOL SECTION ---

const Protocol = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card') as Element[];
      
      cards.forEach((card, i) => {
        if(i === cards.length - 1) return; // Last card stays
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 15%',
            endTrigger: cards[i + 1],
            end: 'top 20%',
            scrub: true,
            invalidateOnRefresh: true,
          },
          scale: 0.9,
          opacity: 0.5,
          filter: 'grayscale(100%)',
          transformOrigin: 'top center'
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Pre-Drywall Integration', desc: 'We deploy at the rough-in stage, establishing a rock-solid physical network before walls are closed.' },
    { num: '02', title: 'Hardware Anchoring', desc: 'Installing commercial-grade, locally-hosted hubs free from cloud dependencies or recurring subscriptions.' },
    { num: '03', title: 'Open Deployment', desc: 'Configuring Ubiquiti and interchangeable components ensuring the system is flexible and scalable.' },
  ];

  return (
    <section id="protocol" ref={container} className="bg-primary py-24 pb-48 border-y-2 border-foreground">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-24 flex items-baseline justify-between border-b-2 border-foreground pb-4">
          <h2 className="font-drama italic text-5xl md:text-6xl text-foreground">Deployment</h2>
          <p className="font-mono text-xs md:text-sm text-foreground font-bold uppercase tracking-widest hidden sm:block">System execution.</p>
        </div>

        <div className="relative">
          {steps.map((step, i) => (
             <div key={i} className="protocol-card sticky top-[15vh] bg-background border-2 border-foreground rounded-none p-10 md:p-16 mb-8 shadow-[8px_8px_0_0_#111] flex flex-col md:flex-row gap-8 md:gap-16 items-center min-h-[45vh]">
               <div className="w-full md:w-3/5 flex flex-col items-start relative z-10">
                 <div className="font-mono text-2xl font-bold bg-foreground text-background px-3 py-1 mb-6">[{step.num}]</div>
                 <h3 className="font-sans font-extrabold text-3xl md:text-5xl text-foreground tracking-tight mb-4 uppercase">{step.title}</h3>
                 <p className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed font-bold">{step.desc}</p>
               </div>
               <div className="w-full md:w-2/5 flex justify-center items-center">
                 <div className="w-48 h-48 border-4 border-foreground flex items-center justify-center relative bg-primary/20">
                   <div className="absolute inset-0 border-[8px] border-dotted border-accent/20 animate-spin" style={{ animationDuration: `${(i+1)*12}s`}}></div>
                   <div className="w-20 h-20 bg-foreground flex items-center justify-center transition-transform hover:scale-110 duration-500">
                     {i === 0 ? <Box className="text-background w-8 h-8" /> : i === 1 ? <Server className="text-background w-8 h-8" /> : <Layers className="text-accent w-8 h-8" />}
                   </div>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- MEMBERSHIP & FOOTER ---

const Membership = ({ onRequestBlueprint }: { onRequestBlueprint: () => void }) => {
  return (
    <section className="bg-background pt-32 pb-24 px-6 md:px-12 relative z-20 border-b-2 border-foreground">
      <div className="max-w-5xl mx-auto">
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-2 bg-accent mb-8"></div>
          <h2 className="font-sans font-extrabold text-5xl md:text-7xl text-foreground mb-6 uppercase tracking-tighter">Ready to Build?</h2>
          <p className="font-mono text-base text-foreground/70 mb-12 max-w-lg mx-auto">Skip the generic smart-home toys. Deploy infrastructure grade automation.</p>
          <button onClick={onRequestBlueprint} className="group relative overflow-hidden bg-accent text-white px-10 py-5 text-xl font-bold border-2 border-foreground shadow-[6px_6px_0_0_#111] transition-transform hover:-translate-y-1 active:translate-y-1 active:shadow-none" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <span className="relative z-10 flex items-center justify-center gap-3 w-full">Request a Blueprint <ArrowRight size={24} /></span>
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-foreground pt-16 pb-8 px-6 md:px-12 text-background font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
        <div>
          <div className="font-sans font-extrabold text-3xl text-background tracking-tighter uppercase mb-2">Module One</div>
          <div className="text-xs uppercase tracking-widest text-primary mb-8 ml-1">Your Home. Your System.</div>
          <div className="flex gap-6 text-sm font-bold">
             <a href="#" className="hover:text-accent transition-colors underline decoration-2 underline-offset-4">Privacy</a>
             <a href="#" className="hover:text-accent transition-colors underline decoration-2 underline-offset-4">Terms</a>
             <a href="#" className="hover:text-accent transition-colors underline decoration-2 underline-offset-4">Engineering</a>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center gap-3 px-4 py-2 border-2 border-primary/30 bg-background/5 mb-4">
            <div className="w-3 h-3 bg-accent animate-pulse border border-foreground"></div>
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest">System Online</span>
          </div>
          <div className="text-xs text-primary/50">© {new Date().getFullYear()} MODULE ONE LLC</div>
        </div>
      </div>
    </footer>
  );
};

const BlueprintForm = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white pt-24 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <button onClick={onBack} className="group flex items-center gap-2 text-foreground/70 hover:text-accent font-bold mb-12 transition-colors uppercase font-mono text-sm tracking-widest">
          <ArrowRight size={16} className="rotate-180" /> Back to Terminal
        </button>
        
        <div className="mb-12 border-l-4 border-accent pl-6">
          <h1 className="font-sans font-extrabold text-5xl md:text-7xl tracking-tighter uppercase mb-4">Request Blueprint</h1>
          <p className="font-mono text-foreground/70 max-w-xl font-bold">Your Home. Your System. Initiate direct comms with our engineering team to deploy infrastructure at your site.</p>
        </div>

        <form 
          action="mailto:vedant.bhoir08@gmail.com" 
          method="POST" 
          encType="text/plain"
          className="bg-primary p-8 md:p-12 border-2 border-foreground shadow-[8px_8px_0_0_#111] flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/80">Designation [Name]</label>
            <input 
              type="text" 
              name="name " 
              required
              className="bg-background border-2 border-foreground p-4 font-sans focus:outline-none focus:border-accent transition-colors shadow-[4px_4px_0_0_rgba(17,17,17,0.1)]"
              placeholder="Your full name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/80">Transmission [Email]</label>
            <input 
              type="email" 
              name="email " 
              required
              className="bg-background border-2 border-foreground p-4 font-sans focus:outline-none focus:border-accent transition-colors shadow-[4px_4px_0_0_rgba(17,17,17,0.1)]"
              placeholder="you@company.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/80">Directive [Message]</label>
            <textarea 
              name="message " 
              required
              rows={5}
              className="bg-background border-2 border-foreground p-4 font-sans focus:outline-none focus:border-accent transition-colors shadow-[4px_4px_0_0_rgba(17,17,17,0.1)] resize-none"
              placeholder="Describe your site requirements..."
            ></textarea>
          </div>

          <button type="submit" className="group relative overflow-hidden bg-accent text-white px-8 py-5 text-lg font-bold border-2 border-foreground shadow-[6px_6px_0_0_#111] transition-transform hover:-translate-y-1 active:translate-y-1 active:shadow-none uppercase mt-4">
            <span className="relative z-10 flex items-center justify-center gap-3 w-full">Transmit Request <ArrowRight size={20} /></span>
          </button>
        </form>
      </div>
    </div>
  );
};

const RootApp = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'blueprint'>('landing');

  const handleRequest = () => {
    setCurrentView('blueprint');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentView === 'landing' ? (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white">
          <Navbar onRequestBlueprint={handleRequest} />
          <Hero onRequestBlueprint={handleRequest} />
          <Features />
          <SubsystemGrid />
          <Philosophy />
          <Protocol />
          <Membership onRequestBlueprint={handleRequest} />
          <Footer />
        </div>
      ) : (
        <BlueprintForm onBack={handleBack} />
      )}
    </>
  );
};

export default RootApp;
