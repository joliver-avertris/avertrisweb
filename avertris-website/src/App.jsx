import { useState, useEffect, useRef } from "react";
import { WavyBackground } from "./components/ui/wavy-background";

/* ════════════════════════════════════════════════════════════
   AVERTRIS — Full Bilingual Website (EN / ES) — Mobile Responsive
   Addepto-style, Poppins, 1200px grid, #FF6B00 orange
   ════════════════════════════════════════════════════════════ */

const V = {
  black: "#000000",
  g100: "#F6F6F6", g200: "#E1E1E1", g300: "#C4C4C4",
  g400: "#808080", g600: "#5E5E5E", g800: "#3D3D3D", g900: "#242424",
  primary: "#FF6B00", p200: "#FFF0E0", p300: "#FFB366",
  p400: "#FF8533", p800: "#CC5500", white: "#ffffff",
};
const F = "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif";

/* ── useMedia Hook ────────────────────────────────────────── */
function useMedia() {
  const [size, setSize] = useState({ mob: false, tab: false });
  useEffect(() => {
    const h = () => setSize({ mob: window.innerWidth <= 768, tab: window.innerWidth <= 1024 });
    h();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return size;
}

/* ── i18n Dictionary ───────────────────────────────────── */
const T = {
  nav: {
    services: { en: "Services", es: "Servicios" },
    products: { en: "Products", es: "Productos" },
    cases: { en: "Case studies", es: "Casos de éxito" },
    about: { en: "About", es: "Nosotros" },
    blog: { en: "Blog", es: "Blog" },
    cta: { en: "Free consultation", es: "Consulta gratuita" },
    megaTech: { en: "TECHNOLOGY", es: "TECNOLOGÍA" },
    megaProducts: { en: "PRODUCTS", es: "PRODUCTOS" },
    megaGrowth: { en: "GROWTH", es: "CRECIMIENTO" },
  },
  hero: {
    label: { en: "Technology", es: "Tecnología" },
    labelSuffix: { en: "× Growth Marketing × AI Solutions", es: "× Marketing de Crecimiento × Soluciones de IA" },
    h1a: { en: "You've outgrown", es: "Tu empresa superó" },
    h1b: { en: "your systems.", es: "sus sistemas." },
    h1c: { en: "We build what's next.", es: "Nosotros construimos lo que sigue." },
    sub: { en: "Avertris partners with mid-market companies that have outgrown duct-taped tools and scattered workflows. We deploy the AI, software, and growth infrastructure that matches where you're going — not where you've been.", es: "Avertris se asocia con empresas medianas que ya superaron las herramientas improvisadas y los flujos dispersos. Desplegamos la infraestructura de IA, software y crecimiento que se alinea con hacia dónde vas — no de dónde vienes." },
    ctaCases: { en: "See who we've scaled", es: "Mira a quién hemos escalado" },
    ctaTalk: { en: "Book a strategy call", es: "Agendar una llamada estratégica" },
    svc: [
      { t: { en: "Your team deserves better tools", es: "Tu equipo merece mejores herramientas" }, d: { en: "Custom AI agents, chatbots, and software built around how your company actually operates — not another off-the-shelf platform you'll outgrow in 6 months", es: "Agentes IA, chatbots y software diseñados alrededor de cómo opera tu empresa realmente — no otra plataforma genérica que superarás en 6 meses" } },
      { t: { en: "Your operations should run like a machine", es: "Tus operaciones deberían funcionar como máquina" }, d: { en: "Our AI CRM, chatbot SaaS, and Dealer Manager replace the 5 disconnected tools your team wastes hours navigating every day", es: "Nuestro CRM con IA, chatbot SaaS y Dealer Manager reemplazan las 5 herramientas desconectadas que tu equipo desperdicia horas navegando cada día" } },
      { t: { en: "Your ad spend should be an investment, not a gamble", es: "Tu inversión en ads debería ser eso — una inversión, no un gasto" }, d: { en: "Full-funnel growth marketing with attribution on every dollar — so you know exactly what's driving revenue and what isn't", es: "Growth marketing de embudo completo con atribución en cada dólar — para que sepas exactamente qué genera ingresos y qué no" } },
    ],
  },
  clients: { label: { en: "Trusted by companies that demand more", es: "Empresas que exigen más confían en nosotros" } },
  results: {
    label: { en: "Client outcomes", es: "Resultados de clientes" },
    title: { en: "The outcomes our clients expect — and get", es: "Los resultados que nuestros clientes esperan — y obtienen" },
    stats: [
      { n: "60", s: "%", l: { en: "Ad Spend Optimization", es: "Optimización de Inversión en Ads" }, d: { en: "Precise attribution replaced guesswork. Clients now know exactly which dollar drives revenue — and redeploy the rest.", es: "La atribución precisa reemplazó la adivinanza. Los clientes ahora saben exactamente qué dólar genera ingresos — y redistribuyen el resto." } },
      { n: "40", s: "hr", l: { en: "Reclaimed Per Week", es: "Recuperadas Por Semana" }, d: { en: "AI automation replaces the manual processes your team shouldn't be doing anymore — so they focus on work that actually moves the needle", es: "La automatización con IA reemplaza los procesos manuales que tu equipo ya no debería hacer — para que se enfoquen en trabajo que realmente mueve la aguja" } },
      { n: "3.2", s: "x", l: { en: "Revenue Growth", es: "Crecimiento de Ingresos" }, d: { en: "Average revenue increase once the right infrastructure is in place — automated follow-ups, optimized funnels, and zero missed opportunities", es: "Aumento promedio de ingresos con la infraestructura correcta — seguimientos automatizados, embudos optimizados y cero oportunidades perdidas" } },
      { n: "100", s: "%", l: { en: "Client Retention", es: "Retención de Clientes" }, d: { en: "With systems that respond instantly, track everything, and never drop the ball — your clients stay because the experience matches the standard they expect", es: "Con sistemas que responden al instante, rastrean todo y nunca fallan — tus clientes se quedan porque la experiencia está a la altura de lo que esperan" } },
    ],
  },
  capabilities: {
    title: { en: "Where growing companies get stuck", es: "Donde se atoran las empresas en crecimiento" },
    cta: { en: "See if this applies to you", es: "Mira si esto aplica a tu caso" },
    items: [
      { title: { en: "Lead response\ntoo slow for today", es: "Respuesta a leads\nmuy lenta para hoy" }, icon: "◇", sub: { en: "AI agents that engage in seconds — the standard your buyers already expect", es: "Agentes IA que responden en segundos — el estándar que tus compradores ya esperan" } },
      { title: { en: "No visibility on\nwhat's driving revenue", es: "Sin visibilidad de\nqué genera ingresos" }, icon: "↗", sub: { en: "Full attribution so every marketing dollar is an informed decision", es: "Atribución completa para que cada dólar de marketing sea una decisión informada" } },
      { title: { en: "Team tied up in\nlow-value tasks", es: "Equipo atado a\ntareas de bajo valor" }, icon: "</>", sub: { en: "Automation that frees your people to focus on what actually grows the business", es: "Automatización que libera a tu gente para enfocarse en lo que realmente crece el negocio" } },
      { title: { en: "Client experience\ndoesn't match the brand", es: "Experiencia del cliente\nno está a la altura" }, icon: "⟳", sub: { en: "AI-powered CRM with instant follow-ups and nothing falling through cracks", es: "CRM con IA, seguimientos instantáneos y nada se pierde en el camino" } },
      { title: { en: "Competitors showing\nup where you don't", es: "Competidores aparecen\ndonde tú no estás" }, icon: "▤", sub: { en: "SEO + content strategy that positions you where high-value buyers search", es: "SEO + estrategia de contenido que te posiciona donde buscan compradores de alto valor" } },
      { title: { en: "Decisions based on\ngut, not data", es: "Decisiones basadas\nen instinto, no datos" }, icon: "◎", sub: { en: "Dashboards that give you the clarity to lead with confidence", es: "Dashboards que te dan la claridad para liderar con confianza" } },
    ],
  },
  whyUs: {
    label: { en: "Why Avertris", es: "Por qué Avertris" },
    title: { en: "Built for companies that expect more", es: "Para empresas que exigen más" },
    desc: { en: "You've worked with agencies before. You know what 'good enough' looks like — and you're done settling for it. Avertris exists for companies that demand one partner who owns the entire stack: software, AI, and growth — with zero finger-pointing and full accountability.", es: "Ya has trabajado con agencias. Sabes cómo se ve el 'suficientemente bueno' — y ya no lo aceptas. Avertris existe para empresas que exigen un solo socio que controle todo el stack: software, IA y crecimiento — sin señalar culpas y con total responsabilidad." },
    cta: { en: "Let's talk", es: "Hablemos" },
    items: [
      { icon: "◉", title: { en: "One partner, full ownership", es: "Un socio, responsabilidad total" }, desc: { en: "Software + Marketing + AI from one team. No coordinating between agencies, no gaps, no excuses. One team that owns the outcome.", es: "Software + Marketing + IA de un solo equipo. Sin coordinar entre agencias, sin huecos, sin excusas. Un equipo dueño del resultado." } },
      { icon: "◈", title: { en: "Native in both markets", es: "Nativos en ambos mercados" }, desc: { en: "Serving US and LATAM clients means your tools, your messaging, and your team all operate fluently in both languages — because your clients do.", es: "Atender clientes en US y LATAM significa que tus herramientas, tu mensaje y tu equipo operan con fluidez en ambos idiomas — porque tus clientes lo hacen." } },
      { icon: "↗", title: { en: "Enterprise caliber, mid-market pricing", es: "Calibre empresarial, precio de mercado medio" }, desc: { en: "The same quality of work that Fortune 500s get from their agencies — at 40-50% less. Same timezone, same rigor, no compromises.", es: "La misma calidad de trabajo que las Fortune 500 reciben de sus agencias — a 40-50% menos. Misma zona horaria, mismo rigor, sin compromisos." } },
      { icon: "◎", title: { en: "We recommend what you need, not what we sell", es: "Recomendamos lo que necesitas, no lo que vendemos" }, desc: { en: "If a $2K automation solves the problem, we won't pitch a $50K platform. Our consulting is built on trust — we find the real gap and close it.", es: "Si una automatización de $2K resuelve el problema, no te propondremos una plataforma de $50K. Nuestra consultoría se basa en confianza — encontramos la brecha real y la cerramos." } },
    ],
  },
  testimonials: {
    label: { en: "Client results", es: "Resultados de clientes" },
    title: { en: "Companies that decided they were ready for more.", es: "Empresas que decidieron que estaban listas para más." },
    items: [
      { name: "Carlos Méndez", role: { en: "CEO, Catojisa", es: "CEO, Catojisa" }, quote: { en: "We'd outgrown our tools — everything ran on spreadsheets and WhatsApp, and our team couldn't keep up with the volume. Avertris built us an AI-powered platform that cut response time by 70%. Within the first month, our client experience was where it should have been all along.", es: "Habíamos superado nuestras herramientas — todo corría en hojas de cálculo y WhatsApp, y nuestro equipo no daba abasto con el volumen. Avertris nos construyó una plataforma con IA que redujo el tiempo de respuesta en 70%. En el primer mes, la experiencia del cliente estaba donde siempre debió estar." } },
      { name: "María Rodriguez", role: { en: "COO, AutoPlus Dealers", es: "COO, AutoPlus Dealers" }, quote: { en: "We were running a multi-location operation on 5 disconnected tools — it wasn't sustainable. Dealer Manager gave us one platform for everything. We recovered 30+ hours per week and our team finally operates at the level our brand promises.", es: "Operábamos múltiples ubicaciones con 5 herramientas desconectadas — no era sostenible. Dealer Manager nos dio una sola plataforma para todo. Recuperamos 30+ horas semanales y nuestro equipo finalmente opera al nivel que nuestra marca promete." } },
      { name: "David Chen", role: { en: "VP Marketing, TechScale Inc", es: "VP Marketing, TechScale Inc" }, quote: { en: "We were spending $15K/month on ads with no clear picture of what was working. Avertris gave us full attribution, we reallocated with precision, and our cost per acquisition dropped 60% in 3 months. Now we scale with confidence, not guesswork.", es: "Gastábamos $15K/mes en ads sin una imagen clara de qué funcionaba. Avertris nos dio atribución completa, reasignamos con precisión y nuestro costo por adquisición bajó 60% en 3 meses. Ahora escalamos con confianza, no con adivinanzas." } },
    ],
  },
  leadMagnet: {
    label: { en: "Free diagnostic", es: "Diagnóstico gratuito" },
    title: { en: "Is your infrastructure keeping up with your growth?", es: "¿Tu infraestructura está a la altura de tu crecimiento?" },
    desc: { en: "Take our free Cash Leak Assessment — a 10-minute diagnostic that benchmarks your operations, tools, marketing, and processes against companies at your level. Most businesses discover $5K-50K in monthly inefficiencies they didn't know existed.", es: "Toma nuestro Assessment de Fugas gratuito — un diagnóstico de 10 minutos que compara tus operaciones, herramientas, marketing y procesos con empresas de tu nivel. La mayoría descubre $5K-50K en ineficiencias mensuales que no sabían que existían." },
    bullets: {
      en: ["Benchmark your operations against companies at your stage", "Get a dollar estimate of recoverable inefficiencies", "See how you compare to 100+ businesses we've assessed", "Get a prioritized roadmap — even if you never hire us"],
      es: ["Compara tus operaciones con empresas de tu etapa", "Obtén una estimación en dólares de ineficiencias recuperables", "Compárate con 100+ negocios que hemos evaluado", "Recibe un roadmap priorizado — aunque nunca nos contrates"],
    },
    emailPh: { en: "Your work email", es: "Tu correo corporativo" },
    btn: { en: "Get my assessment", es: "Obtener mi assessment" },
    note: { en: "No spam. Unsubscribe anytime.", es: "Sin spam. Cancela cuando quieras." },
  },
  process: {
    label: { en: "How we work", es: "Cómo trabajamos" },
    title: { en: "Understand → Deploy → Scale", es: "Entender → Desplegar → Escalar" },
    cta: { en: "Book a strategy call", es: "Agendar una llamada estratégica" },
    steps: [
      { num: "01", title: { en: "Understand Your Business", es: "Entender Tu Negocio" }, desc: { en: "Before we build anything, we map your operations, your team, and your growth goals. A strategic assessment that identifies the highest-impact opportunities — not just what's broken, but what's ready to scale.", es: "Antes de construir algo, mapeamos tus operaciones, tu equipo y tus metas de crecimiento. Una evaluación estratégica que identifica las oportunidades de mayor impacto — no solo lo que está roto, sino lo que está listo para escalar." }, details: { en: ["Operational infrastructure assessment", "Growth opportunity mapping", "Technology stack evaluation", "Team capability & capacity analysis"], es: ["Evaluación de infraestructura operativa", "Mapeo de oportunidades de crecimiento", "Evaluación del stack tecnológico", "Análisis de capacidad del equipo"] } },
      { num: "02", title: { en: "Deploy The Right Solution", es: "Desplegar La Solución Correcta" }, desc: { en: "We execute on the highest-impact priorities first. Agile sprints with weekly demos — you see measurable progress every week, not a surprise deliverable at the end.", es: "Ejecutamos las prioridades de mayor impacto primero. Sprints ágiles con demos semanales — ves progreso medible cada semana, no un entregable sorpresa al final." }, details: { en: ["Highest-impact priorities deployed first", "Weekly progress demos & ROI tracking", "Parallel execution across all pillars", "Real-time dashboards for full visibility"], es: ["Prioridades de mayor impacto desplegadas primero", "Demos semanales y seguimiento de ROI", "Ejecución paralela en todos los pilares", "Dashboards en tiempo real para visibilidad total"] } },
      { num: "03", title: { en: "Scale What Works", es: "Escalar Lo Que Funciona" }, desc: { en: "Once the foundation is solid, we scale what's driving results. Monthly strategy reviews ensure every dollar compounds — and your infrastructure grows with you.", es: "Una vez que la base es sólida, escalamos lo que genera resultados. Revisiones estratégicas mensuales aseguran que cada dólar se multiplique — y tu infraestructura crezca contigo." }, details: { en: ["Performance optimization & A/B testing", "Revenue attribution tracking", "Monthly strategy reviews", "Scaling playbook for sustained growth"], es: ["Optimización de rendimiento y pruebas A/B", "Seguimiento de atribución de ingresos", "Revisiones estratégicas mensuales", "Playbook de escalamiento para crecimiento sostenido"] } },
    ],
  },
  team: {
    label: { en: "Our team", es: "Nuestro equipo" },
    title: { en: "People behind the results", es: "Las personas detrás de los resultados" },
    founderRole: { en: "Founder & CEO", es: "Fundador y CEO" },
    founderBio: { en: "Based in Tampa, Florida, with deep roots in the US, the Dominican Republic, and LATAM markets. Founded Avertris because mid-market companies deserve the same caliber of technology, marketing, and AI that the Fortune 500 deploys — without the Fortune 500 price tag. Every engagement starts with understanding your business, not pitching ours.", es: "Basado en Tampa, Florida, con raíces profundas en los mercados de USA, República Dominicana y LATAM. Fundó Avertris porque las empresas medianas merecen el mismo calibre de tecnología, marketing e IA que despliegan las Fortune 500 — sin el precio de Fortune 500. Cada relación empieza entendiendo tu negocio, no vendiendo el nuestro." },
    members: [
      { ini: "EN", name: { en: "Head of Engineering", es: "Dir. de Ingeniería" }, role: { en: "Software & AI Development", es: "Desarrollo de Software e IA" }, desc: { en: "Full-stack architect, 10+ years. Specializes in AI integrations, React, Node.js, Python.", es: "Arquitecto full-stack, 10+ años. Especialista en integraciones de IA, React, Node.js, Python." } },
      { ini: "MK", name: { en: "Growth Lead", es: "Líder de Crecimiento" }, role: { en: "Marketing & Revenue", es: "Marketing e Ingresos" }, desc: { en: "Bilingual performance marketer. Paid ads, SEO, CRO. Managed $2M+ in ad spend across US/LATAM.", es: "Performance marketer bilingüe. Paid ads, SEO, CRO. Ha gestionado $2M+ en inversión publicitaria en US/LATAM." } },
      { ini: "AI", name: { en: "AI Director", es: "Director de IA" }, role: { en: "AI Strategy & Automation", es: "Estrategia de IA y Automatización" }, desc: { en: "AI agent development, chatbot architecture, voice integration, process automation.", es: "Desarrollo de agentes IA, arquitectura de chatbots, integración de voz, automatización de procesos." } },
    ],
  },
  faq: {
    label: { en: "Frequently asked questions", es: "Preguntas frecuentes" },
    title: { en: "Questions we hear every week", es: "Preguntas que escuchamos cada semana" },
    items: [
      { q: { en: "What does Avertris do?", es: "¿Qué hace Avertris?" }, a: { en: "Avertris is an AI consulting, custom software development, and growth marketing agency headquartered in Tampa, Florida. We're a remote-first team with members across the USA and Dominican Republic. We help mid-market businesses in the USA, Dominican Republic, and Latin America stop losing money through disconnected tools by building AI-powered software, marketing automation, and data-driven growth systems. Our three pillars are: Technology (AI agents, chatbots, custom apps), Products (AI CRM, Chatbot SaaS, Dealer Manager), and Growth Marketing (paid ads, SEO, email, attribution).", es: "Avertris es una agencia de consultoría de IA, desarrollo de software a medida y marketing de crecimiento con sede en Tampa, Florida. Somos un equipo remoto con miembros en USA y República Dominicana. Ayudamos a empresas medianas en USA, República Dominicana y América Latina a dejar de perder dinero con herramientas desconectadas, construyendo software potenciado con IA, automatización de marketing y sistemas de crecimiento basados en datos." } },
      { q: { en: "Where is Avertris located?", es: "¿Dónde está ubicada Avertris?" }, a: { en: "We're headquartered in Tampa, Florida with a remote-first team across the USA and Dominican Republic. We also have team members in Mexico, Colombia, and Argentina. We serve clients in all 50 US states, the Dominican Republic, and key Latin American markets. Our team is fully bilingual (English and Spanish) and timezone-aligned with US business hours.", es: "Nuestra sede está en Tampa, Florida con un equipo remoto en USA y República Dominicana. También tenemos miembros en México, Colombia y Argentina. Atendemos clientes en los 50 estados de EE.UU., República Dominicana y mercados clave de América Latina. Nuestro equipo es completamente bilingüe (inglés y español) y alineado con horarios de oficina de USA." } },
      { q: { en: "How much do your services cost?", es: "¿Cuánto cuestan sus servicios?" }, a: { en: "Our pricing varies by service: Strategic consultations range from $500-$1,500, SEO services start at $1,500/month, growth marketing packages start at $2,500/month, AI CRM subscriptions are $300-$600/month, and custom software development ranges from $600-$5,000+. Every engagement starts with a free 30-minute triage call — no obligation.", es: "Nuestros precios varían por servicio: Consultorías estratégicas van de $500-$1,500, servicios de SEO desde $1,500/mes, paquetes de growth marketing desde $2,500/mes, suscripciones de CRM con IA $300-$600/mes, y desarrollo de software a medida desde $600-$5,000+. Todo comienza con una llamada de triaje gratuita de 30 minutos." } },
      { q: { en: "Do you work with businesses in the Dominican Republic?", es: "¿Trabajan con negocios en República Dominicana?" }, a: { en: "Absolutely. We have team members based in the Dominican Republic and deep roots in the Dominican market. We serve businesses across the DR with AI consulting, custom software, growth marketing, SEO, and our product suite. Our bilingual team understands the local market, regulations, and business culture.", es: "Por supuesto. Tenemos miembros del equipo en República Dominicana y raíces profundas en el mercado dominicano. Atendemos negocios en toda la RD con consultoría de IA, software a medida, growth marketing, SEO y nuestra suite de productos. Nuestro equipo bilingüe entiende el mercado local, regulaciones y cultura de negocios." } },
      { q: { en: "What is the Cash Leak Assessment?", es: "¿Qué es el Assessment de Fugas de Dinero?" }, a: { en: "The Cash Leak Assessment is a free 10-minute diagnostic that reveals exactly where your business is hemorrhaging money through broken processes, wasted ad spend, dead leads, and manual chaos. You get a Cash Leak Score (0-100), a visual Leak Map, a prioritized Fix-It Plan, and benchmark comparisons against 100+ diagnosed businesses. It's free with no obligation.", es: "El Assessment de Fugas de Dinero es un diagnóstico gratuito de 10 minutos que revela exactamente dónde tu negocio pierde dinero por procesos rotos, inversión en ads desperdiciada, leads muertos y caos manual. Obtienes un Puntaje de Fugas (0-100), un Mapa de Fugas visual, un Plan de Reparación priorizado y comparaciones con 100+ negocios diagnosticados. Es gratis sin compromiso." } },
      { q: { en: "How fast will I see results?", es: "¿Qué tan rápido veré resultados?" }, a: { en: "Our average client sees measurable improvements within 2-4 weeks. Quick wins like AI chatbot deployment and ad spend optimization deliver results in days. Larger implementations (custom software, full marketing stack) typically show ROI within 60-90 days. We start every engagement by fixing the biggest, most costly leak first.", es: "Nuestro cliente promedio ve mejoras medibles en 2-4 semanas. Victorias rápidas como implementación de chatbot IA y optimización de ads entregan resultados en días. Implementaciones más grandes (software a medida, stack de marketing completo) típicamente muestran ROI en 60-90 días. Comenzamos cada proyecto arreglando la fuga más grande y costosa primero." } },
    ],
  },
  cta: {
    title: { en: "Ready to operate at the level your company deserves?", es: "¿Listo para operar al nivel que tu empresa merece?" },
    desc: { en: "Book a free 30-minute strategy call. We'll map your current infrastructure against where you're headed — and show you the fastest path to get there. No pitch, no obligation. Just clarity.", es: "Agenda una llamada estratégica gratuita de 30 minutos. Mapearemos tu infraestructura actual contra hacia dónde vas — y te mostraremos el camino más rápido para llegar. Sin pitch, sin compromiso. Solo claridad." },
    btn: { en: "Book a strategy call", es: "Agendar una llamada estratégica" },
  },
  footer: {
    servicesTitle: { en: "Services", es: "Servicios" },
    productsTitle: { en: "Products", es: "Productos" },
    industriesTitle: { en: "Industries", es: "Industrias" },
    newsletter: { en: "Get the Digital Edge newsletter", es: "Recibe el newsletter Digital Edge" },
    newsletterSub: { en: "Weekly AI insights, growth tactics & case studies for mid-market leaders", es: "Insights semanales de IA, tácticas de crecimiento y casos de estudio para líderes del mercado medio" },
    subscribe: { en: "Subscribe", es: "Suscribirse" },
    consent: { en: "I agree to receive Newsletter. *", es: "Acepto recibir el Newsletter. *" },
    copy: { en: "© 2026 Avertris. All rights reserved.", es: "© 2026 Avertris. Todos los derechos reservados." },
    privacy: { en: "Privacy Policy", es: "Política de Privacidad" },
    services: {
      en: ["AI Consulting & Agents", "AI Chatbot Development", "AI Voice Integration", "Custom Web & Mobile Apps", "Growth Marketing & SEO", "Paid Ads & Attribution"],
      es: ["Consultoría e Agentes de IA", "Desarrollo de Chatbots IA", "Integración de Voz con IA", "Apps Web y Móviles a Medida", "Marketing de Crecimiento y SEO", "Paid Ads y Atribución"],
    },
    products: {
      en: ["Avertris AI CRM", "AI Chatbot SaaS", "Dealer Manager"],
      es: ["Avertris AI CRM", "Chatbot SaaS con IA", "Dealer Manager"],
    },
    industries: {
      en: ["Automotive Dealerships", "Professional Services", "E-Commerce & Retail", "Healthcare", "SaaS & Technology", "Financial Services"],
      es: ["Concesionarios Automotrices", "Servicios Profesionales", "E-Commerce y Retail", "Salud", "SaaS y Tecnología", "Servicios Financieros"],
    },
    links: {
      en: ["About", "Blog", "Case studies", "Products"],
      es: ["Nosotros", "Blog", "Casos de éxito", "Productos"],
    },
  },
  /* ── Inner Pages ── */
  servicesPage: {
    label: { en: "What we do", es: "Lo que hacemos" },
    title: { en: "Services", es: "Servicios" },
    subtitle: { en: "Three business units — Technology, Products, and Growth Marketing — working together so you don't have to manage three agencies.", es: "Tres unidades de negocio — Tecnología, Productos y Growth Marketing — trabajando juntas para que no tengas que manejar tres agencias." },
    included: { en: "What's included", es: "Qué incluye" },
    discuss: { en: "Book a consultation", es: "Agenda una consulta" },
    techStack: { en: "TECH STACK", es: "TECNOLOGÍAS" },
    indLabel: { en: "Industries we serve", es: "Industrias que servimos" },
    indTitle: { en: "Industry expertise", es: "Experiencia por industria" },
    indCta: { en: "Your industry isn't here?", es: "¿Tu industria no está aquí?" },
    pillars: [
      {
        tab: { en: "Technology", es: "Tecnología" }, icon: "◇",
        title: { en: "Avertris Technology", es: "Avertris Technology" },
        subtitle: { en: "AI consulting, development, and custom software — built to automate operations and unlock competitive advantages.", es: "Consultoría de IA, desarrollo y software a medida — para automatizar operaciones y desbloquear ventajas competitivas." },
        desc: { en: "From AI agents and chatbots to complete web and mobile applications, we build the technology that powers your business growth. Every solution starts with understanding your operations and finding the highest-impact opportunities for automation and efficiency.", es: "Desde agentes de IA y chatbots hasta aplicaciones web y móviles completas, construimos la tecnología que impulsa el crecimiento de tu negocio. Cada solución comienza entendiendo tus operaciones y encontrando las oportunidades de mayor impacto para automatización y eficiencia." },
        features: { en: ["AI Consulting & Strategy", "AI Agent Development", "AI Chatbot Development", "AI Voice Integration", "Custom Web Applications", "Mobile App Development", "General AI Integration Services", "AI Advisory Services"], es: ["Consultoría y Estrategia de IA", "Desarrollo de Agentes de IA", "Desarrollo de Chatbots con IA", "Integración de Voz con IA", "Aplicaciones Web a Medida", "Desarrollo de Apps Móviles", "Servicios de Integración General de IA", "Servicios de Asesoría en IA"] },
        tech: "OpenAI, Anthropic Claude, LangChain, Python, React, Next.js, Node.js, AWS",
      },
      {
        tab: { en: "Products", es: "Productos" }, icon: "⬡",
        title: { en: "Avertris Products", es: "Avertris Products" },
        subtitle: { en: "Ready-to-deploy solutions for businesses that need results today, not six months from now.", es: "Soluciones listas para implementar para negocios que necesitan resultados hoy, no en seis meses." },
        desc: { en: "Not every business needs a custom build. Our product suite gives you enterprise-grade tools at a fraction of the cost — AI-powered CRM, intelligent chatbots, and Dealer Manager, the complete automotive dealership solution for USA and LATAM markets.", es: "No todo negocio necesita un desarrollo a medida. Nuestra suite de productos te da herramientas de nivel empresarial a una fracción del costo — CRM con IA, chatbots inteligentes, y Dealer Manager, la solución completa para concesionarios automotrices en USA y LATAM." },
        features: { en: ["Avertris AI CRM — Full CRM with AI automation (from $300/mo)", "AI Chatbot SaaS — Out-of-the-box conversational AI", "Dealer Manager — Complete automotive dealership CRM & operations", "White-label solutions available", "5 users included, $10/extra user", "Bilingual platform (EN/ES)"], es: ["Avertris AI CRM — CRM completo con automatización IA (desde $300/mes)", "Chatbot SaaS con IA — IA conversacional lista para usar", "Dealer Manager — CRM y operaciones completas para concesionarios", "Soluciones white-label disponibles", "5 usuarios incluidos, $10/usuario extra", "Plataforma bilingüe (EN/ES)"] },
        tech: "Go High Level, Custom AI Models, React, Node.js, PostgreSQL",
      },
      {
        tab: { en: "Growth Marketing", es: "Growth Marketing" }, icon: "↗",
        title: { en: "Avertris Growth Marketing", es: "Avertris Growth Marketing" },
        subtitle: { en: "Data-driven marketing that turns ad spend into predictable revenue. Every dollar tracked, every result measured.", es: "Marketing basado en datos que convierte inversión publicitaria en ingresos predecibles. Cada dólar rastreado, cada resultado medido." },
        desc: { en: "We don't just run ads — we build growth engines. From paid acquisition and SEO to email marketing and full-funnel attribution, every campaign is designed to generate qualified leads that convert into customers. Bilingual execution across US and LATAM markets.", es: "No solo corremos ads — construimos motores de crecimiento. Desde adquisición pagada y SEO hasta email marketing y atribución full-funnel, cada campaña está diseñada para generar leads calificados que se conviertan en clientes. Ejecución bilingüe en mercados de USA y LATAM." },
        features: { en: ["Paid Ads (Google, Meta, LinkedIn)", "SEO & Content Strategy", "Marketing Automations", "Conversion Rate Optimization (CRO)", "Email Marketing & Sequences", "Analytics & Attribution (Hyros)"], es: ["Paid Ads (Google, Meta, LinkedIn)", "SEO y Estrategia de Contenido", "Automatizaciones de Marketing", "Optimización de Tasa de Conversión (CRO)", "Email Marketing y Secuencias", "Analítica y Atribución (Hyros)"] },
        tech: "Google Ads, Meta Ads, Hyros, Semrush, Google Analytics 4, Zapier, ActiveCampaign",
      },
    ],
  },
  casesPage: {
    label: { en: "Our work", es: "Nuestro trabajo" },
    title: { en: "Case studies", es: "Casos de éxito" },
    subtitle: { en: "Real results for real businesses. Here's how we've helped companies like yours grow.", es: "Resultados reales para negocios reales. Así hemos ayudado a empresas como la tuya a crecer." },
    filters: { en: ["All", "Technology", "Marketing", "Products"], es: ["Todos", "Tecnología", "Marketing", "Productos"] },
    readMore: { en: "Read full case study →", es: "Leer caso completo →" },
    cases: [
      { tag: { en: "Growth Marketing", es: "Growth Marketing" }, title: { en: "Catojisa: From Zero Digital Presence to Lead Machine", es: "Catojisa: De Cero Presencia Digital a Máquina de Leads" }, metric: "340%", metricLabel: { en: "increase in qualified leads", es: "aumento en leads calificados" }, desc: { en: "Complete digital transformation for this accounting firm — website, SEO, paid ads, and automated lead nurturing. Went from zero online presence to their #1 client acquisition channel.", es: "Transformación digital completa para esta firma contable — sitio web, SEO, paid ads y nurturing automatizado. Pasaron de cero presencia online a ser su canal #1 de adquisición de clientes." }, cat: ["Marketing"] },
      { tag: { en: "Products", es: "Productos" }, title: { en: "AutoPlus: Dealership Operations Unified", es: "AutoPlus: Operaciones de Concesionario Unificadas" }, metric: "50%", metricLabel: { en: "reduction in admin time", es: "reducción en tiempo administrativo" }, desc: { en: "Deployed Dealer Manager across 3 locations, unifying inventory, CRM, and operations. Bilingual platform serving teams in US and Dominican Republic.", es: "Implementamos Dealer Manager en 3 ubicaciones, unificando inventario, CRM y operaciones. Plataforma bilingüe para equipos en US y República Dominicana." }, cat: ["Products"] },
      { tag: { en: "Technology + AI", es: "Tecnología + IA" }, title: { en: "FinScale: AI-Powered Lending Platform", es: "FinScale: Plataforma de Préstamos con IA" }, metric: "60%", metricLabel: { en: "faster loan processing", es: "procesamiento de préstamos más rápido" }, desc: { en: "Built a custom lending platform with AI credit scoring, reducing manual review time by 60% and improving approval accuracy.", es: "Plataforma de préstamos con calificación crediticia IA, reduciendo revisión manual un 60% y mejorando precisión de aprobaciones." }, cat: ["Technology"] },
      { tag: { en: "Technology + Marketing", es: "Tecnología + Marketing" }, title: { en: "DataBridge: SaaS Growth Acceleration", es: "DataBridge: Aceleración de Crecimiento SaaS" }, metric: "220%", metricLabel: { en: "increase in MRR", es: "aumento en MRR" }, desc: { en: "Product redesign plus data-driven acquisition strategy, tripling monthly recurring revenue in 8 months.", es: "Rediseño de producto más estrategia de adquisición, triplicando ingresos recurrentes mensuales en 8 meses." }, cat: ["Technology", "Marketing"] },
      { tag: { en: "AI + Marketing", es: "IA + Marketing" }, title: { en: "RetailPro: AI-Powered Personalization", es: "RetailPro: Personalización con IA" }, metric: "85%", metricLabel: { en: "increase in email engagement", es: "aumento en engagement de email" }, desc: { en: "AI-driven product recommendations and personalized marketing campaigns that transformed email from cost center to revenue driver.", es: "Recomendaciones de productos con IA y campañas personalizadas que transformaron email de centro de costo a generador de ingresos." }, cat: ["Technology", "Marketing"] },
      { tag: { en: "Products", es: "Productos" }, title: { en: "MediGroup: CRM That Actually Gets Used", es: "MediGroup: Un CRM Que Realmente Se Usa" }, metric: "3.2x", metricLabel: { en: "patient follow-up rate", es: "tasa de seguimiento de pacientes" }, desc: { en: "Deployed Avertris AI CRM for a healthcare group, with AI-powered follow-ups that 3x'd their patient reactivation rate.", es: "Implementamos Avertris AI CRM para un grupo de salud, con seguimientos impulsados por IA que triplicaron su tasa de reactivación de pacientes." }, cat: ["Products"] },
    ],
  },
  aboutPage: {
    label: { en: "Our story", es: "Nuestra historia" },
    title: { en: "About Avertris", es: "Sobre Avertris" },
    subtitle: { en: "Bridging the Americas through technology, marketing, and AI.", es: "Conectando las Américas a través de tecnología, marketing e IA." },
    storyTitle: { en: "We exist because mid-market deserves better", es: "Existimos porque el mercado medio merece más" },
    storyP1: { en: "Avertris was founded in Tampa, Florida with a clear vision: mid-market businesses across the US, the Dominican Republic, the Caribbean, and Latin America deserve the same caliber of technology, marketing, and AI expertise that Fortune 500 companies enjoy — without the enterprise price tag.", es: "Avertris fue fundada en Tampa, Florida con una visión clara: las empresas medianas en EE.UU., República Dominicana, el Caribe y América Latina merecen la misma calidad de tecnología, marketing e IA que disfrutan las Fortune 500 — sin el precio empresarial." },
    storyP2: { en: "We are a remote-first, bilingual, bicultural team headquartered in Tampa with team members across the USA and Dominican Republic. We understand both US and LATAM markets intimately. Our distributed model means timezone-aligned collaboration, cultural fluency, and cost-efficient delivery.", es: "Somos un equipo remoto, bilingüe y bicultural con sede en Tampa y miembros en USA y República Dominicana. Entendemos los mercados de EE.UU. y LATAM a profundidad. Nuestro modelo distribuido significa colaboración alineada en zona horaria, fluidez cultural y entrega eficiente." },
    valuesLabel: { en: "What drives us", es: "Lo que nos impulsa" },
    valuesTitle: { en: "Our values", es: "Nuestros valores" },
    values: [
      { icon: "◎", title: { en: "Results Over Output", es: "Resultados Sobre Entregables" }, desc: { en: "We measure success by business outcomes — revenue, cost savings, market share — not hours.", es: "Medimos el éxito por resultados de negocio — ingresos, ahorro, participación de mercado — no por horas." } },
      { icon: "◉", title: { en: "Bilingual by Design", es: "Bilingüe por Diseño" }, desc: { en: "Native fluency across English and Spanish markets is built into our DNA.", es: "La fluidez nativa en mercados en inglés y español está en nuestro ADN." } },
      { icon: "◇", title: { en: "Practical Innovation", es: "Innovación Práctica" }, desc: { en: "We deploy AI and technology that solves real problems. No hype.", es: "Implementamos IA y tecnología que resuelve problemas reales. Sin buzzwords." } },
      { icon: "◈", title: { en: "Partnership Model", es: "Modelo de Alianza" }, desc: { en: "Long-term relationships, not transactions. We grow when you grow.", es: "Relaciones a largo plazo, no transacciones. Crecemos cuando tú creces." } },
    ],
    presenceLabel: { en: "Where we are", es: "Dónde estamos" },
    presenceTitle: { en: "Our presence", es: "Nuestra presencia" },
    presenceDesc: { en: "Headquartered in Tampa, Florida. Remote-first team across the USA and Dominican Republic, serving clients in all 50 US states and key LATAM markets.", es: "Con sede en Tampa, Florida. Equipo remoto en USA y República Dominicana, atendiendo clientes en los 50 estados de EE.UU. y mercados clave de LATAM." },
    locations: [
      { region: { en: "United States", es: "Estados Unidos" }, desc: { en: "Headquarters — Tampa, FL + remote team", es: "Sede — Tampa, FL + equipo remoto" }, flag: "US" },
      { region: { en: "Dominican Republic", es: "República Dominicana" }, desc: { en: "Team members & LATAM operations", es: "Miembros del equipo y operaciones LATAM" }, flag: "DO" },
      { region: { en: "Mexico", es: "México" }, desc: { en: "Engineering & marketing teams", es: "Equipos de ingeniería y marketing" }, flag: "MX" },
      { region: { en: "Colombia", es: "Colombia" }, desc: { en: "Development center", es: "Centro de desarrollo" }, flag: "CO" },
      { region: { en: "Argentina", es: "Argentina" }, desc: { en: "AI & data science team", es: "Equipo de IA y ciencia de datos" }, flag: "AR" },
    ],
    readyCta: { en: "Ready to work together?", es: "¿Listos para trabajar juntos?" },
    readyDesc: { en: "Let's discuss how we can help your business grow.", es: "Hablemos de cómo podemos ayudar a crecer tu negocio." },
    readyBtn: { en: "Get in touch", es: "Contáctanos" },
  },
  blogPage: {
    label: { en: "Resources", es: "Recursos" },
    title: { en: "Blog", es: "Blog" },
    subtitle: { en: "Actionable insights on AI, growth marketing, and software for mid-market businesses in the Dominican Republic, USA, and Latin America.", es: "Perspectivas accionables sobre IA, marketing de crecimiento y software para empresas medianas en República Dominicana, USA y América Latina." },
    filters: { en: ["All", "AI", "Marketing", "Software", "Dominican Republic"], es: ["Todos", "IA", "Marketing", "Software", "República Dominicana"] },
    posts: [
      /* — DR / Local SEO — */
      { slug: "ai-dominican-republic-businesses-2026", isoDate: "2026-02-10", cat: "Dominican Republic", title: { en: "AI for Dominican Republic Businesses: How Local Companies Are Automating in 2026", es: "IA para Negocios en República Dominicana: Cómo las Empresas Locales Automatizan en 2026" }, desc: { en: "From Santo Domingo to Santiago, Dominican businesses are deploying AI chatbots, CRM automation, and marketing analytics to compete globally. Here's what's working — and what's wasting money.", es: "Desde Santo Domingo hasta Santiago, empresas dominicanas están implementando chatbots de IA, automatización de CRM y analítica de marketing para competir globalmente. Esto es lo que funciona — y lo que desperdicia dinero." }, date: { en: "Feb 10, 2026", es: "10 Feb, 2026" }, read: { en: "10 min read", es: "10 min de lectura" }, keywords: "AI Dominican Republic, chatbot Santo Domingo, CRM automation Dominican Republic, AI consulting DR", content: { en: `**TL;DR:** Dominican Republic businesses are bleeding $5K-$30K/month through manual processes that AI can automate in weeks. From Santo Domingo retail to Santiago manufacturing, here's what's actually working — and what's burning cash.

## The Dominican Republic AI Opportunity Is Real — But Most Companies Are Wasting It

The Dominican Republic's business landscape is undergoing a massive shift. Companies in Santo Domingo, Santiago, Punta Cana, and across the country are deploying AI — but 70% of them are doing it wrong. They're buying tools they don't need, hiring consultants who deliver PowerPoints instead of results, and losing the competitive window that early AI adoption creates.

The businesses winning right now? They started with their biggest cash leak and automated it first. Not a moonshot AI project. Not a chatbot nobody asked for. The process that was costing them the most money, every single month.

## Where AI Is Delivering Real ROI for DR Businesses

**Customer response automation:** Dominican businesses lose an estimated 60-78% of inbound leads because they respond too slowly. AI chatbots deployed in both Spanish and English are cutting response times from hours to seconds. One retail chain in Santo Domingo went from losing 40+ leads per week to capturing 90% of them — adding RD$2.5M in monthly revenue.

**CRM and pipeline automation:** Sales teams across the DR spend 15-20 hours per week on manual data entry, follow-up scheduling, and pipeline updates. AI-powered CRM automation eliminates this entirely. Your sales team sells instead of typing.

**Marketing attribution:** Dominican companies are spending $5K-$50K/month on digital ads with zero attribution. AI analytics tools now track every peso from click to closed deal, revealing that 40-60% of typical ad spend produces zero revenue.

## The Three AI Plays That Work Right Now in the DR

**Play 1: AI Chatbot for Lead Capture.** Deploy a bilingual chatbot on your website and WhatsApp. It qualifies leads, books meetings, and responds in seconds — 24/7. Cost: $150-$500/month. Expected ROI: 3-5x within 60 days.

**Play 2: CRM Automation.** Replace your spreadsheet chaos with an AI-powered CRM that auto-assigns leads, sends follow-ups, and alerts your team when deals go cold. Cost: $300-$800/month. Expected ROI: 20+ hours/week recovered per team.

**Play 3: Revenue Attribution.** Stop guessing which marketing channels work. Deploy tracking that follows every lead from first touch to payment. Cost: $500-$2,000/month. Expected ROI: 30-50% reduction in wasted ad spend.

## What's Not Working (Stop Wasting Money on This)

**Custom AI builds before you have process:** If your team still manages clients on WhatsApp groups and spreadsheets, you don't need a custom AI model. You need a CRM first. We've seen DR companies spend $20K-$50K on custom AI projects that fail because the underlying business process was broken.

**AI tools without bilingual support:** The Dominican market requires fluent Spanish and English. Tools built only for the US market create friction with your local team and customers. Always verify bilingual capability before purchasing.

**Hiring AI consultants who don't know LATAM:** AI consulting firms from the US often don't understand Dominican business culture, pricing sensitivity, or the regulatory environment. Work with teams that have real presence in the DR.

## How to Start Without Burning Cash

The fastest path to AI ROI in the Dominican Republic is simple: identify your biggest cash leak, deploy a proven solution, measure results in 30 days, then expand. Don't build custom. Don't hire a full AI team. Start with tools that work out of the box — like an AI CRM or chatbot SaaS — and customize from there.

Avertris works with businesses across the Dominican Republic and the US, deploying bilingual AI solutions that generate ROI in weeks, not months. Our team in Tampa and Santo Domingo understands both markets intimately.`, es: `**TL;DR:** Las empresas dominicanas están perdiendo RD$250K-1.5M al mes en procesos manuales que la IA puede automatizar en semanas. Desde el retail en Santo Domingo hasta la manufactura en Santiago, esto es lo que funciona — y lo que quema efectivo.

## La Oportunidad de IA en República Dominicana Es Real — Pero la Mayoría la Está Desperdiciando

El panorama empresarial de República Dominicana está cambiando masivamente. Empresas en Santo Domingo, Santiago, Punta Cana y todo el país están implementando IA — pero el 70% lo está haciendo mal. Compran herramientas que no necesitan, contratan consultores que entregan PowerPoints en vez de resultados, y pierden la ventana competitiva que crea la adopción temprana de IA.

Los negocios que están ganando ahora empezaron con su mayor fuga de dinero y la automatizaron primero. No un proyecto lunar de IA. No un chatbot que nadie pidió. El proceso que les costaba más dinero, cada mes.

## Dónde la IA Genera ROI Real para Negocios en RD

**Automatización de respuesta al cliente:** Los negocios dominicanos pierden entre 60-78% de sus leads porque responden muy lento. Chatbots de IA en español e inglés reducen tiempos de respuesta de horas a segundos. Una cadena de retail en Santo Domingo pasó de perder 40+ leads por semana a capturar el 90% — agregando RD$2.5M en ingresos mensuales.

**Automatización de CRM y pipeline:** Equipos de ventas en RD gastan 15-20 horas semanales en entrada manual de datos, programación de seguimientos y actualización de pipelines. La automatización con IA elimina esto completamente. Tu equipo vende en vez de teclear.

**Atribución de marketing:** Las empresas dominicanas gastan $5K-$50K/mes en ads digitales sin atribución. Las herramientas de analítica con IA rastrean cada peso desde el clic hasta el cierre, revelando que 40-60% del gasto típico en ads produce cero ingresos.

## Las Tres Jugadas de IA Que Funcionan Ahora en RD

**Jugada 1: Chatbot IA para Captura de Leads.** Despliega un chatbot bilingüe en tu web y WhatsApp. Califica leads, agenda reuniones y responde en segundos — 24/7. Costo: $150-$500/mes. ROI esperado: 3-5x en 60 días.

**Jugada 2: Automatización de CRM.** Reemplaza el caos de hojas de cálculo con un CRM con IA que auto-asigna leads, envía seguimientos y alerta cuando los deals se enfrían. Costo: $300-$800/mes. ROI esperado: 20+ horas/semana recuperadas por equipo.

**Jugada 3: Atribución de Ingresos.** Deja de adivinar qué canales de marketing funcionan. Implementa tracking que sigue cada lead desde el primer contacto hasta el pago. Costo: $500-$2,000/mes. ROI esperado: 30-50% de reducción en gasto desperdiciado.

## Lo Que NO Funciona (Deja de Gastar en Esto)

**Desarrollos custom de IA antes de tener proceso:** Si tu equipo todavía maneja clientes en grupos de WhatsApp y hojas de cálculo, no necesitas un modelo de IA custom. Necesitas un CRM primero.

**Herramientas de IA sin soporte bilingüe:** El mercado dominicano requiere español e inglés fluido. Herramientas hechas solo para el mercado de EE.UU. crean fricción con tu equipo y clientes locales.

**Contratar consultores de IA que no conocen LATAM:** Firmas de consultoría de IA de EE.UU. frecuentemente no entienden la cultura empresarial dominicana, la sensibilidad de precios o el entorno regulatorio.

## Cómo Empezar Sin Quemar Efectivo

El camino más rápido al ROI con IA en República Dominicana es simple: identifica tu mayor fuga de dinero, implementa una solución probada, mide resultados en 30 días, luego expande. No construyas custom. No contrates un equipo completo de IA. Empieza con herramientas que funcionan de caja — como un CRM con IA o chatbot SaaS — y personaliza desde ahí.

Avertris trabaja con empresas en República Dominicana y EE.UU., implementando soluciones de IA bilingües que generan ROI en semanas, no meses.` } },
      { slug: "digital-marketing-dominican-republic-2026", isoDate: "2026-02-07", cat: "Dominican Republic", title: { en: "Digital Marketing in the Dominican Republic: What's Actually Working in 2026", es: "Marketing Digital en República Dominicana: Qué Funciona Realmente en 2026" }, desc: { en: "The Dominican digital market is booming. We break down which channels deliver ROI for DR businesses — paid social, Google Ads, SEO en español, WhatsApp marketing, and more.", es: "El mercado digital dominicano está en auge. Desglosamos qué canales generan ROI para negocios en RD — redes sociales pagadas, Google Ads, SEO en español, marketing por WhatsApp y más." }, date: { en: "Feb 7, 2026", es: "7 Feb, 2026" }, read: { en: "8 min read", es: "8 min de lectura" }, keywords: "digital marketing Dominican Republic, SEO Santo Domingo, Google Ads DR, social media marketing RD", content: { en: `**TL;DR:** The Dominican Republic digital market is exploding, but most DR businesses waste 50%+ of their marketing budget on the wrong channels. Here's what's actually driving revenue in 2026 — backed by real campaign data.

## The Dominican Digital Market in 2026: Massive Growth, Massive Waste

Internet penetration in the Dominican Republic has surpassed 80%. Mobile-first consumption dominates. Dominican consumers are researching, comparing, and buying online at rates that would have seemed impossible five years ago. The opportunity is enormous.

But here's the bleeding truth: most Dominican businesses are hemorrhaging money on digital marketing that doesn't work. They're running Facebook ads with no attribution, paying for SEO that targets the wrong keywords, and ignoring the channels that actually convert Dominican consumers.

## What's Actually Working: Channel by Channel

### Google Ads in the DR
Google Ads remains the highest-intent channel for Dominican businesses. When someone in Santo Domingo searches "mejor CRM para empresas" or "contabilidad Santo Domingo," they're ready to buy. The key insight: Spanish-language campaigns in the DR cost 40-60% less per click than equivalent English campaigns in the US — but most agencies run them with the same generic strategy.

What works: hyper-local keywords (city + service), Spanish-language ad copy written by native speakers (not translated), and landing pages optimized for Dominican mobile devices.

### Meta Ads (Facebook & Instagram)
Still the dominant social platform in the DR. But the game has changed. Broad targeting is dead. What's working in 2026: lookalike audiences built from your actual customer list, video-first creative (Dominican audiences engage 3x more with video), and WhatsApp click-to-chat ads that let prospects message you instantly.

Cost benchmarks: $0.50-$2.00 per lead for local services, $3-$8 per lead for B2B services.

### WhatsApp Marketing
This is the channel most US-focused agencies completely miss. WhatsApp is the primary communication tool for Dominican businesses and consumers. Businesses using WhatsApp Business API with AI-powered auto-responses are seeing 80%+ open rates and 30%+ response rates — numbers email marketers dream about.

### SEO en Espanol
Local SEO in the Dominican Republic is still wide open. Competition is low compared to the US market, meaning a well-executed Spanish SEO strategy can dominate local search results within 3-6 months. Key: target Dominican-specific search terms, build local citations, and create content that addresses Dominican business challenges specifically.

## The Channels Burning Your Money

**Organic social without strategy:** Posting on Instagram and Facebook without paid amplification reaches less than 2% of your audience. If you're paying a social media manager $500-$1,500/month to post content nobody sees, that's cash in the drain.

**Display advertising:** Banner ads deliver 0.1% click rates in the DR market. Unless you're running highly targeted retargeting campaigns, display ads are a money pit.

**TikTok for B2B:** TikTok is growing fast in the DR, but for B2B services, conversion rates are near zero. Save it for consumer brands.

## The Winning Formula for DR Businesses

The Dominican businesses generating the best marketing ROI in 2026 follow this stack: Google Ads for high-intent capture, Meta for awareness and retargeting, WhatsApp for nurturing and closing, and SEO as the long-term organic engine. Total recommended budget for a mid-market DR business: $2,000-$8,000/month across all channels, with rigorous attribution tracking on every dollar.

## How to Stop Guessing and Start Measuring

The single biggest mistake Dominican businesses make is running marketing without attribution. You should know exactly which campaign, which ad, which keyword generated each client. Without this data, you're gambling — not marketing.

Avertris runs bilingual growth marketing campaigns across the US and Dominican Republic with full revenue attribution. We track every dollar from click to closed deal, so you know exactly what's working and what's waste.`, es: `**TL;DR:** El mercado digital dominicano está explotando, pero la mayoría de negocios en RD desperdician 50%+ de su presupuesto de marketing en los canales equivocados. Esto es lo que realmente genera ingresos en 2026 — con datos reales de campañas.

## El Mercado Digital Dominicano en 2026: Crecimiento Masivo, Desperdicio Masivo

La penetración de internet en República Dominicana ha superado el 80%. El consumo mobile-first domina. Los consumidores dominicanos investigan, comparan y compran online a tasas impensables hace cinco años. La oportunidad es enorme.

Pero la verdad sangrante: la mayoría de negocios dominicanos están perdiendo dinero en marketing digital que no funciona. Corren Facebook ads sin atribución, pagan por SEO que apunta a las keywords equivocadas, e ignoran los canales que realmente convierten consumidores dominicanos.

## Qué Funciona Realmente: Canal por Canal

### Google Ads en RD
Google Ads sigue siendo el canal de mayor intención para negocios dominicanos. Cuando alguien en Santo Domingo busca "mejor CRM para empresas" o "contabilidad Santo Domingo," está listo para comprar. El insight clave: las campañas en español en RD cuestan 40-60% menos por clic que las equivalentes en inglés en EE.UU.

Lo que funciona: keywords hiperlocales (ciudad + servicio), copy en español escrito por nativos (no traducido), y landing pages optimizadas para móviles dominicanos.

### Meta Ads (Facebook e Instagram)
Sigue siendo la plataforma social dominante en RD. Pero el juego cambió. El targeting amplio murió. Lo que funciona en 2026: audiencias lookalike de tu lista real de clientes, creativos video-first (las audiencias dominicanas interactúan 3x más con video), y ads click-to-WhatsApp.

Benchmarks de costo: $0.50-$2.00 por lead para servicios locales, $3-$8 por lead para servicios B2B.

### Marketing por WhatsApp
Este es el canal que la mayoría de agencias enfocadas en EE.UU. ignoran completamente. WhatsApp es la herramienta de comunicación principal para negocios y consumidores dominicanos. Negocios usando WhatsApp Business API con respuestas automáticas de IA ven 80%+ de tasa de apertura y 30%+ de tasa de respuesta.

### SEO en Español
El SEO local en República Dominicana todavía está abierto. La competencia es baja comparada con EE.UU., lo que significa que una estrategia de SEO en español bien ejecutada puede dominar resultados de búsqueda locales en 3-6 meses.

## Los Canales Que Queman Tu Dinero

**Social orgánico sin estrategia:** Publicar en Instagram y Facebook sin amplificación pagada alcanza menos del 2% de tu audiencia. Si pagas un community manager $500-$1,500/mes para publicar contenido que nadie ve, es dinero al desagüe.

**Publicidad display:** Los banners entregan 0.1% de click rate en el mercado de RD. A menos que corras retargeting, los display ads son un pozo de dinero.

## La Fórmula Ganadora para Negocios en RD

Los negocios dominicanos con mejor ROI de marketing en 2026 siguen este stack: Google Ads para captura de alta intención, Meta para awareness y retargeting, WhatsApp para nurturing y cierre, y SEO como motor orgánico a largo plazo. Presupuesto recomendado para empresa mediana en RD: $2,000-$8,000/mes.

## Cómo Dejar de Adivinar y Empezar a Medir

El error más grande de los negocios dominicanos es correr marketing sin atribución. Deberías saber exactamente qué campaña, qué ad, qué keyword generó cada cliente. Sin estos datos, estás apostando — no haciendo marketing.

Avertris ejecuta campañas de growth marketing bilingües en EE.UU. y República Dominicana con atribución completa de ingresos.` } },
      /* — AI — */
      { slug: "ai-strategy-mid-market-business", isoDate: "2026-02-05", cat: "AI", title: { en: "How to Choose the Right AI Strategy for Your Mid-Market Business", es: "Cómo Elegir la Estrategia de IA Correcta para tu Empresa Mediana" }, desc: { en: "Most mid-market companies waste $10K-$50K on AI that never ships. A practical framework for evaluating AI opportunities, avoiding vendor traps, and prioritizing integrations that drive measurable ROI within 90 days.", es: "La mayoría de empresas medianas desperdician $10K-$50K en IA que nunca se implementa. Un marco práctico para evaluar oportunidades de IA, evitar trampas de proveedores y priorizar integraciones que generen ROI medible en 90 días." }, date: { en: "Feb 5, 2026", es: "5 Feb, 2026" }, read: { en: "8 min read", es: "8 min de lectura" }, keywords: "AI strategy mid-market, AI ROI, AI consulting, business AI implementation", content: { en: `**TL;DR:** Most mid-market companies waste $10K-$50K on AI projects that never ship. The ones that win start with their most expensive problem, deploy a proven solution in 30 days, and expand from there. Here's the framework.

## The $10K-$50K AI Graveyard

Here's a pattern we see constantly: a mid-market company gets excited about AI, hires a consultant or buys a platform, spends $10K-$50K over 3-6 months, and ends up with... a proof of concept that never made it to production. A fancy demo nobody uses. A chatbot that answers three questions.

The problem isn't AI. The problem is strategy. Most mid-market companies approach AI backwards — they start with the technology and look for problems to solve. The businesses generating real ROI from AI do the opposite: they start with their most expensive problem and find the simplest AI solution that fixes it.

## The AI Strategy Framework That Actually Works

### Step 1: Identify Your Most Expensive Problem
Not your most interesting problem. Not the one your CTO is excited about. The one that costs you the most money every single month. Common winners: slow lead response (losing $5K-$50K/month in dead leads), manual data entry (wasting 20-40 hours/week of skilled labor), no marketing attribution (burning 40-60% of ad spend on channels that don't convert).

### Step 2: Quantify the Bleeding
Put a dollar figure on the problem. How much does it cost you per month? Per quarter? This isn't a nice-to-have exercise — it's how you'll evaluate whether an AI solution is worth the investment and how you'll measure success.

### Step 3: Match Solution to Problem (Not the Reverse)
The AI strategy mid-market companies need isn't a custom machine learning model. It's usually one of three things: a pre-built AI tool configured for your workflow ($100-$500/month), a low-code AI integration connecting your existing tools ($500-$2,000 setup), or a focused custom build solving one specific problem ($5K-$25K).

### Step 4: Deploy in 30 Days or Less
If your AI project takes more than 30 days to show initial results, something is wrong. Either the scope is too big, the solution is too complex, or your vendor is billing by the hour. The best AI implementations for mid-market companies go live in 2-4 weeks and show measurable ROI within 60 days.

## The Three AI Traps Mid-Market Companies Fall Into

**Trap 1: The Custom Build Trap.** A vendor convinces you that your business is "unique" and needs a fully custom AI solution. Six months and $50K later, you have a prototype that doesn't integrate with your existing tools. Reality: 80% of mid-market AI needs can be solved with existing tools and smart configuration.

**Trap 2: The Platform Trap.** You buy an enterprise AI platform with 200 features when you need 3. Your team never adopts it because it's too complex. You're paying $2K/month for software that collects dust.

**Trap 3: The Pilot Trap.** You run a "pilot project" that's too small to matter. It works in the demo but nobody champions it into production. Six months later, the subscription lapses and nothing changed.

## How to Evaluate AI Consulting Partners

Ask these questions before hiring any AI consulting firm: What's your average time to first measurable result? (Good answer: 30-60 days.) Can you show me three case studies with revenue impact numbers? What happens if we don't see ROI in 90 days? Do you have experience with businesses our size and industry?

## The Bottom Line

AI strategy for mid-market businesses isn't about being cutting-edge. It's about being smart with limited resources. Start with the problem that costs you the most, deploy the simplest solution that fixes it, measure obsessively, and expand based on proven results.

Avertris specializes in AI consulting for mid-market companies. We identify your highest-ROI AI opportunity, deploy proven solutions, and guarantee measurable results within 90 days.`, es: `**TL;DR:** La mayoría de empresas medianas desperdician $10K-$50K en proyectos de IA que nunca se implementan. Las que ganan empiezan con su problema más costoso, implementan una solución probada en 30 días y expanden desde ahí.

## El Cementerio de $10K-$50K en IA

Un patrón que vemos constantemente: una empresa mediana se emociona con la IA, contrata un consultor o compra una plataforma, gasta $10K-$50K en 3-6 meses, y termina con... una prueba de concepto que nunca llegó a producción. Un demo bonito que nadie usa. Un chatbot que responde tres preguntas.

El problema no es la IA. Es la estrategia. La mayoría de empresas medianas abordan la IA al revés — empiezan con la tecnología y buscan problemas. Los negocios que generan ROI real hacen lo opuesto: empiezan con su problema más costoso y encuentran la solución de IA más simple que lo resuelve.

## El Framework de Estrategia de IA Que Realmente Funciona

### Paso 1: Identifica Tu Problema Más Costoso
No el más interesante. No el que emociona a tu CTO. El que te cuesta más dinero cada mes. Ganadores comunes: respuesta lenta a leads (perdiendo $5K-$50K/mes en leads muertos), entrada manual de datos (desperdiciando 20-40 horas/semana), sin atribución de marketing (quemando 40-60% del gasto en ads).

### Paso 2: Cuantifica la Hemorragia
Ponle una cifra en dólares al problema. ¿Cuánto te cuesta por mes? ¿Por trimestre? Esto no es opcional — es cómo evaluarás si una solución de IA vale la inversión y cómo medirás el éxito.

### Paso 3: Empareja Solución con Problema
La estrategia de IA que las empresas medianas necesitan no es un modelo de machine learning custom. Usualmente es: una herramienta de IA preconfigurada ($100-$500/mes), una integración low-code conectando tus herramientas existentes ($500-$2,000 setup), o un desarrollo enfocado resolviendo un problema específico ($5K-$25K).

### Paso 4: Implementa en 30 Días o Menos
Si tu proyecto de IA tarda más de 30 días en mostrar resultados iniciales, algo está mal. Las mejores implementaciones de IA para empresas medianas van a producción en 2-4 semanas y muestran ROI medible en 60 días.

## Las Tres Trampas de IA para Empresas Medianas

**Trampa 1: La Trampa del Desarrollo Custom.** Un vendor te convence de que tu negocio es "único" y necesita una solución de IA completamente personalizada. Seis meses y $50K después, tienes un prototipo que no se integra con nada. Realidad: 80% de las necesidades de IA se resuelven con herramientas existentes.

**Trampa 2: La Trampa de la Plataforma.** Compras una plataforma enterprise de IA con 200 funciones cuando necesitas 3. Tu equipo nunca la adopta. Pagas $2K/mes por software que acumula polvo.

**Trampa 3: La Trampa del Piloto.** Corres un "piloto" demasiado pequeño para importar. Funciona en el demo pero nadie lo lleva a producción.

## Cómo Evaluar Socios de Consultoría de IA

Pregunta antes de contratar: ¿Cuál es su tiempo promedio al primer resultado medible? ¿Pueden mostrarme tres casos de éxito con cifras de impacto? ¿Qué pasa si no vemos ROI en 90 días?

## La Conclusión

Estrategia de IA para empresas medianas no es ser vanguardista. Es ser inteligente con recursos limitados. Empieza con el problema que más te cuesta, implementa la solución más simple que lo resuelva, mide obsesivamente y expande basándote en resultados probados.

Avertris se especializa en consultoría de IA para empresas medianas. Identificamos tu oportunidad de mayor ROI, implementamos soluciones probadas y garantizamos resultados medibles en 90 días.` } },
      { slug: "ai-chatbots-business-response-time", isoDate: "2026-02-02", cat: "AI", title: { en: "AI Chatbots for Business: Cut Response Time by 70% Without Losing the Human Touch", es: "Chatbots de IA para Negocios: Reduce el Tiempo de Respuesta 70% Sin Perder el Toque Humano" }, desc: { en: "78% of leads go cold because businesses respond too slowly. Learn how AI chatbots qualify leads, book meetings, and handle support in English and Spanish — 24/7, with real ROI data from deployments in DR and USA.", es: "78% de los leads se enfrían porque los negocios responden muy lento. Aprende cómo los chatbots de IA califican leads, agendan reuniones y manejan soporte en inglés y español — 24/7, con datos reales de ROI de implementaciones en RD y USA." }, date: { en: "Feb 2, 2026", es: "2 Feb, 2026" }, read: { en: "7 min read", es: "7 min de lectura" }, keywords: "AI chatbot business, chatbot lead qualification, bilingual chatbot, chatbot ROI", content: { en: `**TL;DR:** 78% of leads go cold because businesses respond too slowly. AI chatbots cut response time from hours to seconds, qualify leads automatically, and work 24/7 in English and Spanish — without sounding like a robot. Here's how to deploy one that actually converts.

## Your Slow Response Time Is Killing Your Revenue

Here's a stat that should keep you up at night: the average business takes 47 hours to respond to a lead. Forty-seven hours. By then, your prospect has contacted three competitors, chosen one, and forgotten your name.

The data is brutal. Leads contacted within 5 minutes are 21x more likely to convert. After 30 minutes, your odds drop by 80%. After an hour, that lead is essentially dead. If you're a business generating 50-200 leads per month and responding in hours instead of seconds, you're leaving $10K-$100K on the table annually. That's not a marketing problem. That's a cash hemorrhage.

## How AI Chatbots Actually Work (Without the Hype)

Modern AI chatbots for business aren't the clunky, menu-driven bots from 2020. They're powered by large language models that understand context, respond naturally, and handle complex conversations. Here's what a well-deployed AI chatbot does:

**Instant response:** The moment someone lands on your website or sends a WhatsApp message, the chatbot engages. No wait time. No "we'll get back to you." Immediate, relevant conversation.

**Lead qualification:** The chatbot asks the right questions — budget, timeline, specific needs — and scores the lead before your sales team ever touches it. Your team only talks to qualified prospects.

**Meeting booking:** Qualified leads get pushed directly to your calendar. The chatbot handles timezone differences, availability checks, and confirmation emails.

**Bilingual operation:** For businesses serving both English and Spanish markets, AI chatbots switch languages seamlessly based on the visitor's preference. No need for separate bots or bilingual staff on night shifts.

## The ROI Math (Real Numbers)

Let's run the numbers for a mid-market business generating 100 leads per month with an average deal value of $2,000:

- Without chatbot: 47-hour average response time, 15% qualification rate, 10% close rate = 1.5 deals = $3,000/month
- With AI chatbot: 5-second response time, 40% qualification rate, 25% close rate = 10 deals = $20,000/month

That's a $17,000/month revenue increase from a tool that costs $150-$500/month. The ROI isn't theoretical — it's mathematical.

## What Makes a Chatbot Work vs. Annoy Your Visitors

**Works:** Chatbot greets visitors after 10 seconds with a relevant question based on the page they're viewing. "Looking for a CRM for your team? I can help you find the right fit — what size is your company?"

**Annoys:** Chatbot pops up immediately with a generic "How can I help you?" that blocks the content. Visitor closes it immediately and never engages again.

**Works:** Chatbot handles objections naturally. "I understand budget is a concern. Most of our clients start with our $300/month plan and scale up once they see ROI. Want me to book a 15-minute call to discuss options?"

**Annoys:** Chatbot hits a question it can't answer and loops back to "I didn't understand that. Can you rephrase?" three times before offering to connect to a human who isn't available.

The difference is in the setup. AI chatbots need proper training on your business, your products, your pricing, and your common objections. A generic chatbot deployment is worse than no chatbot at all.

## How to Deploy Without Losing the Human Touch

The secret to AI chatbots that convert: they should feel like a conversation with your best salesperson, not a software interaction. This means custom responses trained on your actual sales conversations, smooth handoff to human agents when the conversation gets complex, and personality that matches your brand voice.

Avertris deploys bilingual AI chatbots for businesses across the US and Latin America. Our chatbots qualify leads, book meetings, and handle support in English and Spanish — ready to deploy in days, not months.`, es: `**TL;DR:** 78% de los leads se enfrían porque los negocios responden muy lento. Los chatbots de IA reducen tiempos de respuesta de horas a segundos, califican leads automáticamente y trabajan 24/7 en inglés y español — sin sonar como un robot.

## Tu Tiempo de Respuesta Lento Está Matando Tus Ingresos

Un dato que debería quitarte el sueño: el negocio promedio tarda 47 horas en responder a un lead. Cuarenta y siete horas. Para entonces, tu prospecto contactó tres competidores, eligió uno y olvidó tu nombre.

Los datos son brutales. Los leads contactados en 5 minutos tienen 21x más probabilidad de convertir. Después de 30 minutos, tus odds caen 80%. Después de una hora, ese lead está esencialmente muerto. Si generas 50-200 leads al mes y respondes en horas en vez de segundos, estás dejando $10K-$100K anuales sobre la mesa.

## Cómo Funcionan Realmente los Chatbots de IA

Los chatbots de IA modernos para negocios no son los bots torpes de menú de 2020. Están potenciados por modelos de lenguaje que entienden contexto, responden naturalmente y manejan conversaciones complejas:

**Respuesta instantánea:** El momento que alguien entra a tu web o envía un mensaje de WhatsApp, el chatbot interactúa. Sin espera. Sin "te contactaremos." Conversación inmediata y relevante.

**Calificación de leads:** El chatbot hace las preguntas correctas — presupuesto, timeline, necesidades — y califica el lead antes de que tu equipo lo toque. Tu equipo solo habla con prospectos calificados.

**Agendamiento de reuniones:** Los leads calificados van directo a tu calendario. El chatbot maneja zonas horarias, disponibilidad y correos de confirmación.

**Operación bilingüe:** Para negocios en mercados en inglés y español, los chatbots de IA cambian de idioma fluidamente según la preferencia del visitante.

## La Matemática del ROI (Números Reales)

Para un negocio mediano generando 100 leads/mes con un valor promedio de deal de $2,000:

- Sin chatbot: 47 horas de respuesta promedio, 15% tasa de calificación, 10% tasa de cierre = 1.5 deals = $3,000/mes
- Con chatbot IA: 5 segundos de respuesta, 40% tasa de calificación, 25% tasa de cierre = 10 deals = $20,000/mes

Eso es un aumento de $17,000/mes con una herramienta que cuesta $150-$500/mes.

## Qué Hace Que un Chatbot Funcione vs. Moleste a Tus Visitantes

**Funciona:** El chatbot saluda después de 10 segundos con una pregunta relevante basada en la página que están viendo.

**Molesta:** El chatbot aparece inmediatamente con un genérico "¿Cómo puedo ayudarte?" que bloquea el contenido.

**Funciona:** El chatbot maneja objeciones naturalmente con datos y opciones concretas.

**Molesta:** El chatbot no entiende la pregunta y repite "No entendí eso" tres veces.

La diferencia está en la configuración. Los chatbots de IA necesitan entrenamiento adecuado sobre tu negocio, productos, precios y objeciones comunes.

## Cómo Implementar Sin Perder el Toque Humano

El secreto: deben sentirse como una conversación con tu mejor vendedor, no una interacción de software. Respuestas personalizadas entrenadas con tus conversaciones reales de ventas, transición suave a agentes humanos cuando la conversación se complica, y personalidad que coincida con la voz de tu marca.

Avertris implementa chatbots de IA bilingües para negocios en EE.UU. y América Latina. Nuestros chatbots califican leads, agendan reuniones y manejan soporte en inglés y español — listos en días, no meses.` } },
      { slug: "llm-integration-proof-concept-production", isoDate: "2026-01-08", cat: "AI", title: { en: "LLM Integration: From Proof of Concept to Production in 90 Days", es: "Integración de LLMs: De Prueba de Concepto a Producción en 90 Días" }, desc: { en: "Lessons from deploying large language models in real business workflows at mid-market companies. We cover costs, timelines, common failure points, and the architecture decisions that matter.", es: "Lecciones de implementar modelos de lenguaje en flujos de negocio reales en empresas medianas. Cubrimos costos, plazos, puntos comunes de fallo y las decisiones de arquitectura que importan." }, date: { en: "Jan 8, 2026", es: "8 Ene, 2026" }, read: { en: "10 min read", es: "10 min de lectura" }, keywords: "LLM integration, AI deployment, large language model business, AI production deployment", content: { en: `**TL;DR:** 90% of LLM proof-of-concepts never reach production. The gap between a cool demo and a revenue-generating AI deployment is architecture, cost control, and relentless focus on one business outcome. Here's how to cross it in 90 days.

## The Demo-to-Production Death Valley

Every week, another mid-market company shows us a ChatGPT wrapper their developer built over a weekend. "Look, it summarizes our customer emails!" Great demo. But can it handle 500 emails per hour? Does it work when the API is down? Does it comply with your data policies? Can your non-technical team use it?

This is the LLM integration death valley: the massive gap between a working proof of concept and a production system your business depends on. 90% of LLM projects die in this gap. They work in demos but fail in reality — not because the AI is bad, but because the engineering around it is missing.

## The Architecture Decisions That Matter

### Choose Your LLM Strategy
Three approaches, each with trade-offs:

**API-based (OpenAI, Anthropic Claude):** Fastest to deploy, lowest upfront cost, highest per-query cost. Best for: businesses processing fewer than 10,000 AI queries per day. Expect $0.01-$0.10 per query depending on complexity.

**Fine-tuned models:** Better accuracy for your specific use case, moderate cost, requires ML expertise. Best for: businesses with domain-specific language (legal, medical, technical) and consistent query patterns.

**Self-hosted open source (Llama, Mistral):** Lowest per-query cost at scale, highest upfront investment, requires infrastructure team. Best for: businesses with data privacy requirements or processing 50,000+ queries daily.

For most mid-market companies, API-based is the right starting point. You can always migrate to fine-tuned or self-hosted later.

### Build the Error Handling Layer
LLMs hallucinate. They produce confidently wrong answers. Your production system needs: output validation against known data, confidence scoring that flags uncertain responses for human review, graceful fallback when the API is slow or down, and logging that captures every query-response pair for quality monitoring.

### Design for Real Users
Your team doesn't speak prompt engineering. The interface between humans and your LLM integration needs: pre-built templates for common tasks, guardrails that prevent misuse, clear indicators of AI-generated vs. human content, and one-click escalation to human review.

## The 90-Day Deployment Timeline

**Days 1-15: Scope and architecture.** Define the single business outcome you're targeting. Map the data flow. Choose your LLM provider. Build the technical architecture. Deliverable: working technical design and API integration.

**Days 16-45: Core build and testing.** Build the integration, error handling, and user interface. Run it against real data. Test edge cases. Deliverable: staging environment with real data flowing through.

**Days 46-75: Pilot with real users.** Deploy to a small team (5-10 users). Collect feedback daily. Fix issues in real-time. Measure against your target business outcome. Deliverable: pilot results with measurable impact data.

**Days 76-90: Production rollout.** Scale to full team. Implement monitoring and alerting. Document processes. Train users. Deliverable: production system with measurable ROI.

## Cost Reality Check

Realistic costs for a mid-market LLM integration: API costs ($200-$2,000/month depending on volume), development ($5K-$25K for initial build), infrastructure ($100-$500/month for hosting, monitoring, logging), ongoing maintenance ($500-$2,000/month for updates, monitoring, optimization).

Total first-year cost: $15K-$55K. If your target problem costs you $5K+/month, the ROI math works within the first year.

## Common Failure Points (and How to Avoid Them)

**Scope creep:** You start with email summarization and somehow end up trying to build an autonomous AI agent. Resist. Solve one problem completely before expanding.

**Ignoring latency:** Your LLM takes 8 seconds to respond. Your users need answers in 2 seconds. Solution: implement caching, streaming responses, and async processing.

**No monitoring:** You launched and stopped watching. Three months later, response quality has degraded and nobody noticed. Always monitor output quality continuously.

Avertris builds production LLM integrations for mid-market companies. From architecture to deployment, we get your AI from demo to revenue-generating production in 90 days or less.`, es: `**TL;DR:** 90% de las pruebas de concepto de LLMs nunca llegan a producción. La brecha entre un demo y un deployment que genera ingresos es arquitectura, control de costos y enfoque en un resultado de negocio. Así se cruza en 90 días.

## El Valle de la Muerte: Del Demo a Producción

Cada semana, otra empresa mediana nos muestra un wrapper de ChatGPT que su desarrollador construyó en un fin de semana. "Mira, resume nuestros correos de clientes!" Gran demo. Pero, ¿puede manejar 500 correos por hora? ¿Funciona cuando la API está caída? ¿Cumple tus políticas de datos?

Este es el valle de la muerte de integración de LLMs: la brecha masiva entre una prueba de concepto y un sistema de producción. El 90% de los proyectos de LLM mueren aquí — no porque la IA sea mala, sino porque la ingeniería alrededor falta.

## Las Decisiones de Arquitectura Que Importan

### Elige Tu Estrategia de LLM

**Basado en API (OpenAI, Anthropic Claude):** Más rápido de implementar, menor costo inicial, mayor costo por consulta. Mejor para: negocios con menos de 10,000 consultas de IA por día.

**Modelos fine-tuned:** Mejor precisión para tu caso de uso, costo moderado, requiere expertise en ML. Mejor para: negocios con lenguaje específico del dominio.

**Open source auto-hospedado (Llama, Mistral):** Menor costo por consulta a escala, mayor inversión inicial. Mejor para: negocios con requisitos de privacidad de datos o 50,000+ consultas diarias.

Para la mayoría de empresas medianas, API-based es el punto de inicio correcto.

### Construye la Capa de Manejo de Errores
Los LLMs alucinan. Tu sistema de producción necesita: validación contra datos conocidos, puntuación de confianza, fallback cuando la API está lenta, y logging de cada interacción.

### Diseña para Usuarios Reales
Tu equipo no habla "prompt engineering." La interfaz necesita: plantillas predefinidas, guardarraíles contra mal uso, indicadores claros de contenido generado por IA, y escalamiento con un clic a revisión humana.

## El Timeline de Implementación en 90 Días

**Días 1-15:** Alcance y arquitectura. Define el resultado de negocio. Elige proveedor de LLM. Construye la arquitectura.

**Días 16-45:** Construcción y testing. Integración, manejo de errores, interfaz. Pruebas con datos reales.

**Días 46-75:** Piloto con usuarios reales. 5-10 usuarios. Feedback diario. Mide contra el objetivo.

**Días 76-90:** Rollout a producción. Escala, monitoreo, documentación, entrenamiento.

## Realidad de Costos

Costos realistas: API ($200-$2,000/mes), desarrollo ($5K-$25K build inicial), infraestructura ($100-$500/mes), mantenimiento ($500-$2,000/mes). Costo total primer año: $15K-$55K. Si tu problema cuesta $5K+/mes, el ROI funciona en el primer año.

## Puntos Comunes de Fallo

**Scope creep:** Empiezas con resumen de correos y terminas intentando construir un agente autónomo. Resiste. Resuelve un problema completamente antes de expandir.

**Ignorar latencia:** Tu LLM tarda 8 segundos. Tus usuarios necesitan respuestas en 2. Solución: caching, streaming, procesamiento asíncrono.

**Sin monitoreo:** Lanzaste y dejaste de vigilar. Tres meses después la calidad se degradó y nadie lo notó.

Avertris construye integraciones de LLM en producción para empresas medianas. De arquitectura a deployment, llevamos tu IA de demo a producción en 90 días o menos.` } },
      /* — Marketing — */
      { slug: "seo-bilingual-businesses-english-spanish", isoDate: "2026-01-28", cat: "Marketing", title: { en: "SEO for Bilingual Businesses: How to Rank in English and Spanish Simultaneously", es: "SEO para Negocios Bilingües: Cómo Posicionarse en Inglés y Español Simultáneamente" }, desc: { en: "Serving customers in both English and Spanish? Most bilingual businesses lose 50% of their organic traffic to poor internationalization. Technical and content strategies for dominating search in two languages.", es: "¿Sirves clientes en inglés y español? La mayoría de negocios bilingües pierden 50% de su tráfico orgánico por mala internacionalización. Estrategias técnicas y de contenido para dominar las búsquedas en dos idiomas." }, date: { en: "Jan 28, 2026", es: "28 Ene, 2026" }, read: { en: "6 min read", es: "6 min de lectura" }, keywords: "bilingual SEO, Spanish SEO, English Spanish website, multilingual SEO strategy", content: { en: `**TL;DR:** Most bilingual businesses lose 50% of their organic traffic because they treat Spanish content as an afterthought. Ranking in English and Spanish simultaneously requires separate strategies, not just translation. Here's the technical and content playbook.

## The Bilingual SEO Problem Nobody Talks About

You serve customers in both English and Spanish. Your website has both languages. But your Spanish pages get a fraction of the traffic, your English pages cannibalize each other, and Google can't figure out which version to show to whom.

This is the bilingual SEO trap. And it's costing businesses serving US Hispanic, Dominican Republic, and LATAM markets an estimated 50% of their potential organic traffic. The issue isn't content quality — it's technical SEO architecture that most agencies don't understand because they've only ever worked in one language.

## The Technical Foundation: Hreflang, URLs, and Site Structure

### URL Strategy
Three options, ranked by effectiveness: subdirectories (avertris.com/es/ and avertris.com/en/) — recommended for most businesses; subdomains (es.avertris.com) — acceptable but splits domain authority; separate domains (avertris.es) — only for targeting specific countries with country-code TLDs.

### Hreflang Implementation
Hreflang tags tell Google which language version to show to which audience. Most bilingual sites either don't implement them or implement them incorrectly. Every page needs hreflang tags pointing to all its language variants, including a self-referencing tag and an x-default for the fallback language.

### Canonical Tags
Each language version should have its own canonical tag pointing to itself — not to the English version. A common mistake: setting English as the canonical for all pages, which tells Google to ignore your Spanish content entirely.

## Content Strategy: Translation Is Not Enough

The biggest mistake in bilingual SEO: translating your English content into Spanish and calling it done. Google's algorithm evaluates Spanish content against other Spanish content. Translated text reads differently than natively-written content — and your audience feels the difference too.

**Keyword research must be separate.** The Spanish keywords your audience uses are not direct translations of English keywords. "AI consulting" in English might be "consultoría de inteligencia artificial" or "consultoría de IA" or "servicios de IA para empresas" in Spanish — each with different search volumes and competition levels.

**Content length and format may differ.** Spanish-language searchers in LATAM markets often prefer longer, more detailed content than US English searchers. Blog posts that perform well at 800 words in English may need 1,000-1,200 words in Spanish.

**Local references matter.** Mentioning Santo Domingo, Tampa, Mexico City — whatever markets you serve — signals relevance to local search algorithms and builds trust with local audiences.

## Technical SEO Checklist for Bilingual Sites

- Implement hreflang tags on every page (HTML head, HTTP header, or sitemap)
- Use x-default hreflang for your primary language
- Ensure each language has unique meta titles and descriptions (not translated copies)
- Submit separate sitemaps per language to Google Search Console
- Build language-specific internal linking (Spanish pages link to Spanish pages)
- Avoid auto-redirect based on IP — let Google crawl both versions
- Use language-specific structured data (JSON-LD) on each version

## Link Building: The Bilingual Advantage

Here's where bilingual businesses actually have an advantage: you can build links in two ecosystems. English-language backlinks from US publications boost your English pages. Spanish-language backlinks from LATAM media, Dominican Republic directories, and Spanish-language industry sites boost your Spanish pages. Most monolingual competitors can only build links in one language.

## Measuring Success Across Languages

Track organic traffic, rankings, and conversions separately for each language. Don't combine them in a single report — you'll miss problems. Tools: Google Search Console (filter by language/country), Google Analytics with language segments, and Semrush or Ahrefs with country-specific tracking.

Avertris builds bilingual SEO strategies for businesses operating across the US and Latin America. We don't translate — we build separate, optimized strategies for each language that work together to maximize your total organic reach.`, es: `**TL;DR:** La mayoría de negocios bilingües pierden 50% de su tráfico orgánico porque tratan el contenido en español como algo secundario. Posicionarse en inglés y español simultáneamente requiere estrategias separadas, no solo traducción.

## El Problema del SEO Bilingüe Que Nadie Menciona

Sirves clientes en inglés y español. Tu sitio web tiene ambos idiomas. Pero tus páginas en español reciben una fracción del tráfico, tus páginas en inglés se canibalizan entre sí, y Google no puede determinar qué versión mostrar a quién.

Esta es la trampa del SEO bilingüe. Y le cuesta a negocios que sirven mercados hispanos en EE.UU., República Dominicana y LATAM un estimado del 50% de su tráfico orgánico potencial.

## La Base Técnica: Hreflang, URLs y Estructura del Sitio

### Estrategia de URL
Tres opciones: subdirectorios (avertris.com/es/ y avertris.com/en/) — recomendado; subdominios (es.avertris.com) — aceptable pero divide autoridad de dominio; dominios separados — solo para targeting de países específicos.

### Implementación de Hreflang
Los tags hreflang le dicen a Google qué versión mostrar a qué audiencia. La mayoría de sitios bilingües no los implementan o los implementan mal. Cada página necesita hreflang tags apuntando a todas sus variantes de idioma, incluyendo auto-referencia y x-default.

### Canonical Tags
Cada versión de idioma debe tener su propio canonical apuntando a sí misma — no a la versión en inglés. Error común: poner inglés como canonical para todas las páginas, lo que le dice a Google que ignore tu contenido en español.

## Estrategia de Contenido: Traducir No Es Suficiente

El error más grande: traducir tu contenido en inglés al español y listo. El algoritmo de Google evalúa contenido en español contra otro contenido en español. El texto traducido se lee diferente al escrito nativamente.

**La investigación de keywords debe ser separada.** Las keywords en español no son traducciones directas del inglés. "AI consulting" podría ser "consultoría de inteligencia artificial" o "consultoría de IA" o "servicios de IA para empresas" — cada una con diferentes volúmenes de búsqueda.

**La longitud y formato puede diferir.** Los buscadores en español en LATAM frecuentemente prefieren contenido más largo y detallado.

**Las referencias locales importan.** Mencionar Santo Domingo, Tampa, Ciudad de México señala relevancia a algoritmos de búsqueda local.

## Checklist Técnico de SEO para Sitios Bilingües

- Implementar hreflang tags en cada página
- Usar x-default hreflang para tu idioma principal
- Meta titles y descriptions únicos por idioma (no copias traducidas)
- Sitemaps separados por idioma en Google Search Console
- Enlaces internos específicos por idioma
- No redirigir automáticamente por IP
- Datos estructurados (JSON-LD) específicos por idioma

## Link Building: La Ventaja Bilingüe

Los negocios bilingües tienen una ventaja: pueden construir enlaces en dos ecosistemas. Backlinks en inglés de publicaciones de EE.UU. impulsan tus páginas en inglés. Backlinks en español de medios LATAM, directorios de República Dominicana y sitios de industria en español impulsan tus páginas en español.

## Midiendo Éxito Entre Idiomas

Rastrea tráfico orgánico, rankings y conversiones por separado para cada idioma. No los combines en un solo reporte. Herramientas: Google Search Console (filtrar por idioma/país), Google Analytics con segmentos de idioma, y Semrush o Ahrefs con tracking por país.

Avertris construye estrategias de SEO bilingüe para negocios en EE.UU. y América Latina. No traducimos — construimos estrategias optimizadas separadas para cada idioma que maximizan tu alcance orgánico total.` } },
      { slug: "stop-wasting-ad-spend-revenue-attribution", isoDate: "2026-01-20", cat: "Marketing", title: { en: "Stop Wasting Ad Spend: Revenue Attribution for Mid-Market Companies", es: "Deja de Desperdiciar en Ads: Atribución de Ingresos para Empresas Medianas" }, desc: { en: "The average mid-market company wastes 40-60% of ad spend on channels that produce zero revenue. How to set up revenue attribution that tracks every dollar from click to closed deal.", es: "La empresa mediana promedio desperdicia 40-60% de su inversión en ads en canales que producen cero ingresos. Cómo configurar atribución de ingresos que rastrea cada dólar desde el clic hasta el cierre." }, date: { en: "Jan 20, 2026", es: "20 Ene, 2026" }, read: { en: "9 min read", es: "9 min de lectura" }, keywords: "revenue attribution, ad spend optimization, marketing ROI, marketing analytics", content: { en: `**TL;DR:** The average mid-market company wastes 40-60% of ad spend on channels that produce zero revenue. Revenue attribution shows you exactly where every dollar goes — from click to closed deal. Stop funding platforms. Start funding your pipeline.

## You're Probably Burning Half Your Ad Budget Right Now

Here's the uncomfortable truth: if you can't trace every dollar of ad spend to actual revenue, you're gambling. And the house always wins. The average mid-market company spends $5K-$50K per month on digital advertising. Of that, our audits consistently show 40-60% goes to channels, campaigns, and keywords that produce zero closed deals.

That's not a rounding error. That's $2K-$30K per month — lit on fire. Every single month.

## What Revenue Attribution Actually Means

Revenue attribution isn't just tracking clicks and conversions. It's connecting every customer journey — from first ad impression to final payment — into one clear picture. It answers the questions that actually matter: Which campaign generated this $10K deal? Which keyword drove this customer's first visit 3 months ago? What was the total revenue from Google Ads last quarter — not leads, not MQLs, actual revenue?

Most businesses track vanity metrics: impressions, clicks, cost per lead. These metrics make your marketing agency look good but tell you nothing about revenue. A campaign generating $2 leads that never close is worse than a campaign generating $50 leads that close at 30%.

## The Attribution Stack for Mid-Market Companies

### Level 1: UTM Tracking + CRM Integration
Minimum viable attribution. Tag every ad, email, and link with UTM parameters. Push these into your CRM so you can see which source originated each deal. Cost: free (just discipline). Reveals: first-touch source for every deal.

### Level 2: Multi-Touch Attribution
Track every touchpoint in the customer journey, not just the first or last click. Use tools like Hyros, Triple Whale, or Ruler Analytics to connect ad platforms, website behavior, and CRM data. Cost: $200-$1,000/month. Reveals: the complete customer journey and true value of each channel.

### Level 3: Revenue Attribution with Closed-Loop Reporting
The gold standard. Every ad dollar is connected to actual revenue, tracked through your CRM to closed deal. You know the exact ROAS (Return on Ad Spend) for every campaign, ad group, and keyword. Cost: $500-$2,000/month. Reveals: exact dollar-for-dollar return on every marketing activity.

## The Five Most Common Attribution Mistakes

**Mistake 1: Trusting platform reporting.** Google says your ads generated 50 conversions. Meta says their ads generated 45 conversions. You only had 60 total leads. Both platforms over-claim because they each take credit for shared touchpoints. Independent attribution is the only source of truth.

**Mistake 2: Only tracking last click.** The customer saw a Meta ad, clicked a Google ad two weeks later, then came directly to your site to purchase. Last-click attribution gives all credit to the direct visit. The Meta ad that started the journey? Zero credit. This leads to cutting the channels that actually fill your top of funnel.

**Mistake 3: Not tracking offline conversions.** Your $5K enterprise deal started with a Google ad but closed via a phone call. If you're not pushing offline conversions back to your ad platforms, your data shows that lead as a $0 result. Your highest-value customers become invisible.

**Mistake 4: Measuring leads instead of revenue.** A campaign generating 100 leads at $5 each looks better than one generating 10 leads at $50 each. Until you realize the $5 leads close at 1% ($500 revenue) while the $50 leads close at 30% ($150,000 revenue). Revenue attribution eliminates this blind spot.

**Mistake 5: Setting and forgetting.** Attribution requires ongoing calibration. New campaigns, changed UTMs, CRM field updates — any of these can break your tracking. Audit your attribution setup monthly.

## How to Start This Week

Step 1: Audit your current tracking — are UTMs consistent? Is your CRM capturing source data? Step 2: Pick one attribution tool and implement it across all channels. Step 3: Run for 30 days, then compare platform-reported conversions vs. attribution-reported revenue. The gap will shock you.

Avertris sets up full revenue attribution for mid-market businesses, connecting every ad dollar to actual closed deals using tools like Hyros and custom CRM integrations. We don't optimize for leads — we optimize for revenue.`, es: `**TL;DR:** La empresa mediana promedio desperdicia 40-60% de su gasto en ads en canales que producen cero ingresos. La atribución de ingresos muestra exactamente a dónde va cada dólar. Deja de financiar plataformas. Financia tu pipeline.

## Probablemente Estás Quemando la Mitad de Tu Presupuesto en Ads

La verdad incómoda: si no puedes rastrear cada dólar de gasto en ads hasta ingresos reales, estás apostando. La empresa mediana promedio gasta $5K-$50K por mes en publicidad digital. De eso, nuestras auditorías muestran consistentemente que 40-60% va a canales y campañas que producen cero deals cerrados.

Eso son $2K-$30K por mes — quemados. Cada mes.

## Qué Significa Realmente Atribución de Ingresos

Atribución de ingresos no es solo rastrear clics y conversiones. Es conectar cada viaje del cliente — desde la primera impresión de ad hasta el pago final. Responde las preguntas que importan: ¿Qué campaña generó este deal de $10K? ¿Qué keyword trajo la primera visita de este cliente hace 3 meses? ¿Cuál fue el ingreso total de Google Ads el trimestre pasado — no leads, no MQLs, ingresos reales?

La mayoría rastrean métricas de vanidad: impresiones, clics, costo por lead. Una campaña que genera leads de $2 que nunca cierran es peor que una que genera leads de $50 que cierran al 30%.

## El Stack de Atribución para Empresas Medianas

### Nivel 1: UTM Tracking + Integración CRM
Atribución mínima viable. Etiqueta cada ad, email y enlace con parámetros UTM. Pasa esto a tu CRM. Costo: gratis (solo disciplina).

### Nivel 2: Atribución Multi-Touch
Rastrea cada punto de contacto en el viaje del cliente. Usa herramientas como Hyros, Triple Whale o Ruler Analytics. Costo: $200-$1,000/mes.

### Nivel 3: Atribución de Ingresos con Closed-Loop Reporting
El estándar de oro. Cada dólar de ad conectado a ingresos reales a través de tu CRM. Costo: $500-$2,000/mes.

## Los Cinco Errores Más Comunes de Atribución

**Error 1: Confiar en los reportes de plataformas.** Google y Meta ambos se atribuyen los mismos leads. La atribución independiente es la única fuente de verdad.

**Error 2: Solo rastrear último clic.** El customer journey es multi-touch. La atribución de último clic ignora los canales que llenan tu funnel.

**Error 3: No rastrear conversiones offline.** Tu deal de $5K empezó con un Google ad pero cerró por teléfono. Sin push de conversiones offline, ese lead aparece como $0.

**Error 4: Medir leads en vez de ingresos.** 100 leads a $5 parece mejor que 10 leads a $50. Hasta que ves que los de $5 cierran al 1% y los de $50 al 30%.

**Error 5: Configurar y olvidar.** La atribución requiere calibración continua. Audita mensualmente.

## Cómo Empezar Esta Semana

Paso 1: Audita tu tracking actual. Paso 2: Elige una herramienta de atribución e impleméntala en todos los canales. Paso 3: Corre 30 días, luego compara conversiones reportadas por plataformas vs. ingresos reales. La diferencia te sorprenderá.

Avertris configura atribución completa de ingresos para empresas medianas, conectando cada dólar de ad con deals cerrados usando Hyros e integraciones custom de CRM.` } },
      { slug: "growth-marketing-playbook-latam-expansion", isoDate: "2025-12-20", cat: "Marketing", title: { en: "The Growth Marketing Playbook for LATAM Expansion", es: "El Playbook de Marketing de Crecimiento para Expansión en LATAM" }, desc: { en: "Expanding from the US to Latin America — or from LATAM to the US? Channel strategies, localization pitfalls, and realistic budgets for cross-border growth. Real data from campaigns in Dominican Republic, Mexico, and Colombia.", es: "¿Expandiendo de USA a América Latina — o de LATAM a USA? Estrategias de canales, errores de localización y presupuestos realistas para crecimiento transfronterizo. Datos reales de campañas en República Dominicana, México y Colombia." }, date: { en: "Dec 20, 2025", es: "20 Dic, 2025" }, read: { en: "9 min read", es: "9 min de lectura" }, keywords: "LATAM marketing, growth marketing Latin America, US LATAM expansion, cross-border marketing", content: { en: `**TL;DR:** Expanding between the US and LATAM markets? Most companies burn their first $20K-$50K because they assume what works in one market works in the other. Here's the channel-by-channel playbook with real budgets from campaigns in DR, Mexico, and Colombia.

## The Cross-Border Marketing Trap

American companies expanding to LATAM and LATAM companies expanding to the US make the same fatal mistake: they copy-paste their domestic marketing strategy into the new market. US companies run the same Google Ads in Spanish. LATAM companies try to compete on US keywords with US-level budgets they can't sustain.

Both approaches burn cash. Fast. The markets are fundamentally different in consumer behavior, channel preference, price sensitivity, and buying cycles.

## Market-by-Market Reality Check

### United States
The US digital market is the most competitive in the world. Cost per click on Google Ads averages $2-$8 for service-based businesses. SEO takes 6-12 months to show results against established competitors. The advantage: higher deal values and lifetime customer value justify the spend.

### Dominican Republic
A rapidly growing digital market with significantly lower competition. Google Ads CPCs run 40-60% below US rates. SEO competition is dramatically lower — you can rank for valuable commercial terms in 3-6 months. WhatsApp is essential — it's the primary business communication tool. Social commerce through Instagram and WhatsApp is mainstream.

### Mexico
The largest Spanish-speaking digital market. Google Ads is competitive in major cities (Mexico City, Guadalajara, Monterrey) but affordable in secondary markets. Facebook and Instagram dominate for B2C. LinkedIn is growing fast for B2B.

### Colombia
A digital market in rapid maturation. Digital ad costs are among the lowest in LATAM. Content marketing and SEO are particularly effective because most local competitors haven't invested in quality content yet.

## The Channel Playbook for Cross-Border Growth

### Phase 1: Market Entry ($2K-$5K/month)
Start with Google Ads targeting high-intent commercial keywords in the target market's language. Run Meta ads for brand awareness with lookalike audiences based on your existing customers. Set up basic SEO with localized content — not translated, localized. Timeline: 60 days to first qualified leads.

### Phase 2: Scaling ($5K-$15K/month)
Expand Google Ads to broader keyword sets. Launch retargeting across Meta and Google Display. Begin content marketing with blog posts targeting long-tail keywords in the local market. Build local backlinks through partnerships and PR. Timeline: 90-180 days to consistent pipeline.

### Phase 3: Dominance ($15K-$30K/month)
Full-funnel marketing across all channels. Video content for social. Webinars and events for authority building. Email sequences for nurturing. Full revenue attribution across markets. Timeline: 180-365 days to market leadership.

## Localization Pitfalls That Kill Cross-Border Campaigns

**Translation vs. localization:** "Schedule a demo" translates to Spanish, but Dominican prospects respond better to "Hablemos sobre tu negocio" (let's talk about your business). Localization captures cultural nuance that translation misses.

**Payment and pricing:** US pricing doesn't work in LATAM markets. A $500/month SaaS product may need a $200/month LATAM tier to compete. Payment methods also differ — not everyone has credit cards, and local payment processors may be required.

**Trust signals:** US businesses rely on G2 reviews and case studies. LATAM businesses rely more on personal referrals, WhatsApp conversations, and in-person meetings. Your marketing needs to build trust differently in each market.

## Budget Allocation: Where to Put Your Money

For a US company entering LATAM: allocate 60% to paid acquisition (Google + Meta), 25% to content/SEO, 15% to localization and creative. For a LATAM company entering the US: allocate 40% to paid acquisition, 30% to content/SEO (higher competition requires more content investment), 30% to brand building and trust signals.

Avertris runs growth marketing campaigns across the US and Latin America with native teams in both markets. We don't translate strategies — we build market-specific growth engines with full attribution on every dollar.`, es: `**TL;DR:** ¿Expandiendo entre EE.UU. y LATAM? La mayoría de empresas queman sus primeros $20K-$50K porque asumen que lo que funciona en un mercado funciona en el otro. Aquí está el playbook canal por canal con presupuestos reales.

## La Trampa del Marketing Cross-Border

Empresas americanas expandiendo a LATAM y empresas LATAM expandiendo a EE.UU. cometen el mismo error fatal: copian su estrategia de marketing doméstica al nuevo mercado. Empresas de EE.UU. corren los mismos Google Ads en español. Empresas LATAM intentan competir en keywords de EE.UU. con presupuestos que no pueden sostener.

Ambos enfoques queman efectivo. Rápido. Los mercados son fundamentalmente diferentes en comportamiento del consumidor, preferencia de canal, sensibilidad de precio y ciclos de compra.

## Realidad Mercado por Mercado

### Estados Unidos
El mercado digital más competitivo del mundo. CPC promedio en Google Ads de $2-$8. SEO tarda 6-12 meses. La ventaja: valores de deal y lifetime value más altos justifican el gasto.

### República Dominicana
Mercado digital en crecimiento rápido con competencia significativamente menor. CPCs de Google Ads 40-60% por debajo de EE.UU. SEO dramáticamente menos competitivo. WhatsApp es esencial. Social commerce por Instagram y WhatsApp es mainstream.

### México
El mercado digital hispanohablante más grande. Google Ads competitivo en ciudades principales pero accesible en mercados secundarios. Facebook e Instagram dominan B2C. LinkedIn crece rápido para B2B.

### Colombia
Mercado digital en maduración rápida. Costos de ads digitales entre los más bajos de LATAM. Content marketing y SEO particularmente efectivos.

## El Playbook de Canales para Crecimiento Cross-Border

### Fase 1: Entrada al Mercado ($2K-$5K/mes)
Google Ads con keywords comerciales de alta intención. Meta ads para awareness. SEO básico con contenido localizado. Timeline: 60 días a primeros leads calificados.

### Fase 2: Escalamiento ($5K-$15K/mes)
Expandir Google Ads. Retargeting en Meta y Google Display. Content marketing con blog posts locales. Backlinks locales. Timeline: 90-180 días a pipeline consistente.

### Fase 3: Dominación ($15K-$30K/mes)
Marketing full-funnel en todos los canales. Video, webinars, email, atribución completa. Timeline: 180-365 días a liderazgo de mercado.

## Errores de Localización Que Matan Campañas

**Traducción vs. localización:** Las diferencias culturales importan más que la traducción literal. Adapta el mensaje al mercado local.

**Precios y pagos:** Pricing de EE.UU. no funciona en LATAM. Puede necesitar tiers de precio regionales. Los métodos de pago también difieren.

**Señales de confianza:** EE.UU. confía en reviews de G2 y casos de estudio. LATAM confía más en referidos personales y conversaciones por WhatsApp.

## Distribución de Presupuesto

Para empresa de EE.UU. entrando a LATAM: 60% adquisición pagada, 25% contenido/SEO, 15% localización. Para empresa LATAM entrando a EE.UU.: 40% adquisición pagada, 30% contenido/SEO, 30% brand building.

Avertris ejecuta campañas de growth marketing en EE.UU. y América Latina con equipos nativos en ambos mercados.` } },
      /* — Software — */
      { slug: "build-vs-buy-custom-software-decision", isoDate: "2026-01-15", cat: "Software", title: { en: "When to Build Custom Software vs. Buy Off-the-Shelf: A Decision Framework", es: "Cuándo Construir Software a Medida vs. Comprar: Un Marco de Decisión" }, desc: { en: "Every mid-market company faces this choice. We break down the real costs, hidden risks, and decision criteria — with examples from businesses in the Dominican Republic and USA that chose each path.", es: "Toda empresa mediana enfrenta esta decisión. Desglosamos los costos reales, riesgos ocultos y criterios de decisión — con ejemplos de negocios en República Dominicana y USA que eligieron cada camino." }, date: { en: "Jan 15, 2026", es: "15 Ene, 2026" }, read: { en: "7 min read", es: "7 min de lectura" }, keywords: "custom software vs off the shelf, build vs buy software, software development cost, custom software mid-market", content: { en: `**TL;DR:** Building custom software costs 5-10x more than you think. Buying off-the-shelf leaves gaps that cost you in workarounds. Here's the decision framework that saves mid-market companies $50K-$200K in wrong bets.

## The Most Expensive Decision Your Business Will Make

Build or buy. Custom software or off-the-shelf. Every mid-market company faces this choice at some point — and most get it wrong. They either overspend on custom builds that should have been a SaaS purchase, or they force-fit an off-the-shelf tool that requires so many workarounds it would have been cheaper to build custom.

The wrong choice doesn't just waste money. It wastes 6-18 months of your team's time, creates technical debt that compounds for years, and often requires starting over anyway.

## When to Buy Off-the-Shelf

**Buy when the problem is common.** CRM, email marketing, project management, accounting — these are solved problems. Hundreds of tools exist, refined by millions of users. Unless your process is genuinely unique, buying beats building every time.

**Buy when speed matters most.** Off-the-shelf tools deploy in days or weeks. Custom software takes months. If your business is bleeding money from a solvable problem right now, buy the solution and stop the bleeding.

**Buy when the total cost of ownership is under $50K/year.** Most SaaS tools for mid-market companies cost $200-$2,000/month. Even at the high end, that's $24K/year — far less than the $50K-$200K it costs to build, maintain, and update custom software.

### Real Example: CRM
A distribution company in the Dominican Republic considered building a custom CRM because "our process is different." After analysis, their process was 85% standard CRM workflow and 15% custom. They deployed an AI-powered CRM at $300/month with custom automations for their specific workflow. Total cost: $3,600/year plus $2,000 setup. The custom build quote? $75,000 plus $1,500/month maintenance.

## When to Build Custom

**Build when your competitive advantage depends on it.** If the software IS your business or creates a moat competitors can't replicate, build it. A unique algorithm, a proprietary workflow, a platform that serves your specific market — these justify custom development.

**Build when off-the-shelf tools require more than 30% workarounds.** If you're spending significant time building workarounds, integrations, and manual processes to make an off-the-shelf tool work, the hidden cost of buying exceeds the visible cost of building.

**Build when data control and security are non-negotiable.** Certain industries (healthcare, finance, government) have data requirements that off-the-shelf tools can't meet. Custom software gives you complete control over data handling, storage, and compliance.

### Real Example: Dealer Manager
Automotive dealerships in the US and LATAM had no single platform covering inventory, CRM, operations, and bilingual support. The off-the-shelf options were either US-only (no Spanish, no LATAM payment methods) or LATAM-only (no US compliance). Building custom was the only path to a comprehensive, bilingual solution.

## The Decision Framework

Score your situation on these five criteria:

**1. Uniqueness (1-5):** How different is your process from industry standard? 1 = standard, 5 = completely unique.
**2. Speed (1-5):** How urgently do you need the solution? 1 = can wait 12+ months, 5 = need it this month.
**3. Budget (1-5):** Available budget for software? 1 = under $10K, 5 = $100K+.
**4. Scale (1-5):** Expected growth in the next 3 years? 1 = staying same size, 5 = 10x growth.
**5. Integration (1-5):** How many existing systems must this connect to? 1 = standalone, 5 = mission-critical integrations.

Score 5-12: Buy off-the-shelf. Score 13-18: Buy with customization. Score 19-25: Build custom.

## The Hidden Costs Nobody Tells You About

**Custom build hidden costs:** Ongoing maintenance (15-20% of build cost annually), team knowledge dependency (what happens when the developer leaves?), feature requests that never end, security patches and updates forever.

**Off-the-shelf hidden costs:** Annual price increases (average 10-15% per year), integration costs with existing tools, training and adoption costs, workaround time when the tool doesn't fit, vendor lock-in making future switching painful.

Avertris helps mid-market companies make this decision with clear data, then executes whichever path is right — deploying off-the-shelf solutions with custom integrations or building custom software from scratch.`, es: `**TL;DR:** Construir software custom cuesta 5-10x más de lo que piensas. Comprar off-the-shelf deja brechas que cuestan en workarounds. Aquí está el framework que ahorra $50K-$200K en malas decisiones.

## La Decisión Más Cara Que Tu Negocio Tomará

Construir o comprar. Software a medida u off-the-shelf. Toda empresa mediana enfrenta esta decisión — y la mayoría se equivoca. Gastan de más en builds custom que debieron ser una compra de SaaS, o fuerzan un tool off-the-shelf que requiere tantos workarounds que hubiera sido más barato construir.

## Cuándo Comprar Off-the-Shelf

**Compra cuando el problema es común.** CRM, email marketing, project management, contabilidad — son problemas resueltos.

**Compra cuando la velocidad importa más.** Los tools off-the-shelf se implementan en días. Software custom tarda meses. Si tu negocio sangra dinero por un problema solucionable ahora, compra.

**Compra cuando el costo total es menor a $50K/año.** La mayoría de SaaS para empresas medianas cuestan $200-$2,000/mes.

### Ejemplo Real: CRM
Una empresa de distribución en República Dominicana consideró un CRM custom porque "nuestro proceso es diferente." Después del análisis, su proceso era 85% estándar. Implementaron un CRM con IA a $300/mes. Costo total: $3,600/año + $2,000 setup. La cotización custom: $75,000 + $1,500/mes de mantenimiento.

## Cuándo Construir Custom

**Construye cuando tu ventaja competitiva depende de ello.** Si el software ES tu negocio o crea un moat que los competidores no pueden replicar.

**Construye cuando los tools off-the-shelf requieren más de 30% en workarounds.** Si el costo oculto de comprar supera el costo visible de construir.

**Construye cuando el control de datos es innegociable.** Ciertas industrias (salud, finanzas, gobierno) tienen requisitos que las herramientas off-the-shelf no cumplen.

## El Framework de Decisión

Califica tu situación en cinco criterios (1-5): Unicidad del proceso, Urgencia, Presupuesto, Escala esperada, Complejidad de integración.

Puntaje 5-12: Compra off-the-shelf. 13-18: Compra con personalización. 19-25: Construye custom.

## Los Costos Ocultos Que Nadie Menciona

**Costos ocultos de build custom:** Mantenimiento continuo (15-20% del costo anual), dependencia de conocimiento del equipo, solicitudes de features infinitas, parches de seguridad.

**Costos ocultos de off-the-shelf:** Aumentos anuales de precio (promedio 10-15%), costos de integración, capacitación, tiempo de workarounds, vendor lock-in.

Avertris ayuda a empresas medianas a tomar esta decisión con datos claros, luego ejecuta el camino correcto — implementando soluciones off-the-shelf con integraciones custom o construyendo software a medida.` } },
      { slug: "crm-implementation-failure-fix", isoDate: "2026-01-05", cat: "Software", title: { en: "CRM for Small and Mid-Market Businesses: Why Most Implementations Fail (And How to Fix It)", es: "CRM para PyMEs y Empresas Medianas: Por Qué la Mayoría de Implementaciones Fallan (Y Cómo Arreglarlo)" }, desc: { en: "63% of CRM implementations fail to deliver expected ROI. The problem isn't the software — it's the process. How to implement a CRM that your team actually uses and that generates revenue.", es: "63% de las implementaciones de CRM fallan en entregar el ROI esperado. El problema no es el software — es el proceso. Cómo implementar un CRM que tu equipo realmente use y que genere ingresos." }, date: { en: "Jan 5, 2026", es: "5 Ene, 2026" }, read: { en: "8 min read", es: "8 min de lectura" }, keywords: "CRM implementation, CRM mid-market, AI CRM, CRM failure rate, CRM best practices", content: { en: `**TL;DR:** 63% of CRM implementations fail to deliver expected ROI. The problem is never the software — it's the process, adoption strategy, and lack of AI automation. Here's how to implement a CRM your team actually uses and that generates revenue.

## The CRM Graveyard Is Full of Good Intentions

Your business bought a CRM. Maybe Salesforce. Maybe HubSpot. Maybe a custom solution. You paid for implementation. You trained the team. Six months later, half your sales reps are back to spreadsheets and the CRM has become an expensive contact database that nobody trusts.

You're not alone. 63% of CRM implementations fail to meet their ROI goals. The implementation failure rate for enterprise CRM is even higher — around 70%. And the cost isn't just the software license. It's the lost productivity, the deals that fell through the cracks, and the months of organizational disruption for nothing.

## Why CRM Implementations Fail

### Reason 1: Too Complex From Day One
Companies try to implement every CRM feature simultaneously. Custom fields, automated workflows, integrations with 12 tools, complex pipeline stages, custom dashboards — all before the team has logged their first lead. Overwhelmed users default to what they know: spreadsheets, sticky notes, and memory.

### Reason 2: No Process Before Platform
You can't automate a process that doesn't exist. If your team doesn't have a clear, documented sales process before the CRM implementation, the CRM will amplify chaos, not eliminate it. Define your stages, qualification criteria, and handoff points first. Then configure the CRM to match.

### Reason 3: Manual Data Entry Kills Adoption
If using the CRM means 30 extra minutes of data entry per day for each sales rep, they won't use it. Period. The #1 adoption killer is manual work that the rep sees as bureaucratic overhead rather than a tool that helps them sell. This is where AI CRM changes everything.

### Reason 4: No Executive Enforcement
If leadership doesn't use the CRM, doesn't require it, and doesn't make decisions based on CRM data, the team won't use it either. CRM adoption is a top-down mandate, not a bottom-up initiative.

## The AI CRM Difference

Traditional CRMs require humans to do the work: log calls, update deal stages, write follow-up emails, set reminders. AI-powered CRMs flip this model: the AI logs activity automatically from email and calendar, the AI suggests next actions based on deal patterns, the AI writes and sends follow-up emails, the AI alerts reps when a deal is at risk of going cold.

The result: your team spends time selling instead of typing. CRM adoption goes from 40% to 90%+ because the CRM is actively helping reps close deals rather than creating administrative burden.

## The 30-Day CRM Implementation Framework

**Week 1: Process mapping.** Document your current sales process. Define pipeline stages, qualification criteria, and handoff points. Identify the 3-5 fields that actually matter for each deal. Ignore everything else.

**Week 2: Core setup.** Configure pipeline stages, essential fields, and basic automations (lead assignment, follow-up reminders). Import your existing contacts. Set up email integration. Do not customize anything else yet.

**Week 3: AI activation.** Enable AI features: auto-logging, smart follow-ups, deal scoring, activity tracking. Train the AI on your communication patterns and sales playbook.

**Week 4: Team launch.** Train the team on the essential workflows (not every feature — just what they need daily). Set the rule: if it's not in the CRM, it didn't happen. Have leadership use CRM data in every sales meeting from day one.

## The Numbers That Matter

Track these metrics to ensure your CRM is working: adoption rate (daily active users / total users — target 85%+), lead response time (should decrease by 50%+ in the first month), pipeline accuracy (forecast vs. actual close rate — target within 15%), deal velocity (days to close — should decrease as follow-ups become automated), revenue per rep (should increase within 90 days).

## Choosing the Right CRM for Mid-Market

Enterprise CRMs (Salesforce, Microsoft Dynamics) are overkill for most mid-market companies. They're expensive, complex, and require dedicated admins. Mid-market-focused CRMs with built-in AI offer better adoption rates, faster implementation, and lower total cost of ownership. Look for: AI-powered automation, simple interface, mobile access, bilingual support if you serve LATAM markets, and pricing that scales with your team.

Avertris offers an AI-powered CRM built specifically for mid-market businesses. It automates follow-ups, logs activity, and scores deals — so your team sells instead of doing data entry. Starting at $300/month with implementation support included.`, es: `**TL;DR:** 63% de las implementaciones de CRM fallan en entregar el ROI esperado. El problema nunca es el software — es el proceso, la estrategia de adopción y la falta de automatización con IA.

## El Cementerio de CRM Está Lleno de Buenas Intenciones

Tu negocio compró un CRM. Pagaste la implementación. Entrenaste al equipo. Seis meses después, la mitad de tus vendedores volvieron a hojas de cálculo y el CRM se convirtió en una base de datos de contactos cara que nadie confía.

No estás solo. 63% de las implementaciones de CRM fallan. Y el costo no es solo la licencia — es la productividad perdida, los deals que se cayeron y los meses de disrupción organizacional para nada.

## Por Qué Fallan las Implementaciones de CRM

### Razón 1: Demasiado Complejo Desde el Día Uno
Las empresas intentan implementar cada función del CRM simultáneamente. Usuarios abrumados regresan a lo que conocen: hojas de cálculo y memoria.

### Razón 2: Sin Proceso Antes de Plataforma
No puedes automatizar un proceso que no existe. Define tus etapas, criterios de calificación y puntos de handoff primero. Luego configura el CRM.

### Razón 3: La Entrada Manual de Datos Mata la Adopción
Si usar el CRM significa 30 minutos extra de entrada de datos por vendedor al día, no lo usarán. El asesino #1 de adopción es el trabajo manual que el rep ve como burocracia. Aquí es donde el CRM con IA cambia todo.

### Razón 4: Sin Enforcement Ejecutivo
Si el liderazgo no usa el CRM ni lo exige, el equipo tampoco lo usará.

## La Diferencia del CRM con IA

Los CRMs tradicionales requieren que humanos hagan el trabajo. Los CRMs con IA invierten este modelo: la IA registra actividad automáticamente, sugiere siguientes acciones, escribe y envía follow-ups, y alerta cuando un deal se enfría.

El resultado: tu equipo vende en vez de teclear. La adopción sube del 40% a 90%+ porque el CRM activamente ayuda a cerrar deals.

## Framework de Implementación en 30 Días

**Semana 1:** Mapeo de proceso. Documenta tu proceso de ventas actual. Define etapas de pipeline y criterios de calificación.

**Semana 2:** Setup básico. Configura etapas, campos esenciales y automatizaciones básicas. Importa contactos. Integra email.

**Semana 3:** Activación de IA. Auto-logging, follow-ups inteligentes, scoring de deals, tracking de actividad.

**Semana 4:** Lanzamiento. Entrena al equipo en lo esencial. Regla: si no está en el CRM, no pasó. Liderazgo usa datos del CRM desde el día uno.

## Las Métricas Que Importan

Tasa de adopción (target 85%+), tiempo de respuesta a leads (debe bajar 50%+), precisión de pipeline (forecast vs. real), velocidad de deal (días para cerrar), ingreso por vendedor (debe subir en 90 días).

## Eligiendo el CRM Correcto para Empresas Medianas

Los CRM enterprise (Salesforce, Dynamics) son overkill para la mayoría de empresas medianas. Son caros, complejos y requieren admins dedicados. CRMs para mid-market con IA ofrecen mejor adopción, implementación más rápida y menor costo total.

Avertris ofrece un CRM con IA construido para empresas medianas. Automatiza follow-ups, registra actividad y califica deals. Desde $300/mes con soporte de implementación incluido.` } },
      { slug: "api-first-architecture-growing-businesses", isoDate: "2025-12-12", cat: "Software", title: { en: "API-First Architecture: Why It Matters for Growing Businesses", es: "Arquitectura API-First: Por Qué Importa para Negocios en Crecimiento" }, desc: { en: "How API-first design creates flexibility and future-proofs your stack. Real examples from mid-market companies that saved 6+ months of development time.", es: "Cómo el diseño API-first crea flexibilidad y protege tu stack a futuro. Ejemplos reales de empresas medianas que ahorraron 6+ meses de desarrollo." }, date: { en: "Dec 12, 2025", es: "12 Dic, 2025" }, read: { en: "5 min read", es: "5 min de lectura" }, keywords: "API-first architecture, API design, software architecture, scalable software", content: { en: `**TL;DR:** Companies with monolithic software architectures spend 3-5x more on every new feature, integration, and platform change. API-first design gives your business the flexibility to move fast without rebuilding everything. Here's why it matters and how to get there.

## Your Monolith Is a Ticking Time Bomb

You built your software as one big application. It worked great when you were small. Now you need to add a mobile app, integrate with a new payment processor, connect to your CRM, and launch in a new market. Each change takes months, costs tens of thousands of dollars, and risks breaking everything else.

This is the monolith trap. And every mid-market company with 3+ years of custom software hits it eventually. The cost compounds: the first integration takes 2 months. The second takes 3. The fifth takes 6 — because every new connection makes the codebase more fragile and harder to change.

## What API-First Architecture Actually Means

API-first means designing your software as a collection of services that communicate through well-defined interfaces (APIs) rather than as one interconnected block. Think of it like building with LEGO: each piece connects to others through standard connectors, so you can rearrange, replace, and add pieces without rebuilding the whole structure.

In practical terms: your CRM data is available through an API. Your payment system has its own API. Your user authentication is a separate service. Your mobile app, web app, and internal tools all consume these same APIs. Need to switch payment processors? Change one service. Need a mobile app? Build a front-end that talks to existing APIs. Need to integrate with a partner? Give them API access to specific endpoints.

## The Real Cost Savings

A mid-market software company we worked with tracked their development costs before and after migrating to API-first architecture:

**Before (monolith):** New feature average: 6-8 weeks, $15K-$25K. New integration: 4-6 weeks, $10K-$20K. Mobile app development: 16 weeks, $80K+. Every change required full regression testing.

**After (API-first):** New feature average: 2-3 weeks, $5K-$10K. New integration: 1-2 weeks, $3K-$8K. Mobile app development: 8 weeks, $35K. Changes are isolated to specific services — no full regression needed.

Over 18 months, they saved an estimated $180K in development costs and shipped features 3x faster.

## When API-First Makes Sense (and When It Doesn't)

### It makes sense when:
- You plan to build a mobile app alongside your web application
- You need to integrate with 3+ external services
- Multiple teams need to work on different parts of the system simultaneously
- You serve multiple markets or customer segments that need different front-end experiences
- You expect to scale 3x+ in the next 2-3 years

### It doesn't make sense when:
- You're building an MVP and need to ship in 30 days
- You have one front-end, one database, and no integration needs
- Your total user base is under 100 and unlikely to grow significantly
- Budget constraints require the fastest possible initial build

## How to Migrate Without Rebuilding Everything

You don't need to rewrite your entire application. The strangler fig pattern works: identify the most painful integration point in your current system, extract it into a standalone service with a clean API, route traffic to the new service, repeat for the next pain point.

Most mid-market companies can extract 3-5 critical services over 6-12 months without disrupting their existing application. Each extraction immediately makes that piece of the system faster to change and easier to integrate.

## The API Design Decisions That Matter

**RESTful vs. GraphQL:** REST for simple, resource-based operations (most mid-market use cases). GraphQL for complex, nested data queries (dashboards, reporting, multi-entity views).

**Authentication:** OAuth 2.0 for third-party access, JWT tokens for internal service-to-service communication. Never pass API keys in URLs.

**Versioning:** Always version your APIs from day one (v1, v2). Breaking changes go in new versions. Old versions get a deprecation timeline. This protects your integrations from unexpected breakage.

**Documentation:** Auto-generated API docs (Swagger/OpenAPI) are a minimum. Good API documentation is the difference between partners integrating in days vs. months.

Avertris builds API-first software architectures for mid-market companies. Whether you're starting fresh or migrating from a monolith, we design systems that scale with your business and slash development costs for every future feature.`, es: `**TL;DR:** Empresas con arquitecturas monolíticas gastan 3-5x más en cada nueva función, integración y cambio de plataforma. El diseño API-first da a tu negocio la flexibilidad para moverse rápido sin reconstruir todo.

## Tu Monolito Es una Bomba de Tiempo

Construiste tu software como una aplicación grande. Funcionó genial cuando eras pequeño. Ahora necesitas agregar una app móvil, integrar un procesador de pagos, conectar tu CRM y lanzar en un nuevo mercado. Cada cambio toma meses, cuesta decenas de miles y arriesga romper todo lo demás.

Esta es la trampa del monolito. Y toda empresa mediana con 3+ años de software custom la encuentra. El costo se acumula: la primera integración toma 2 meses, la segunda 3, la quinta 6.

## Qué Significa Realmente Arquitectura API-First

API-first significa diseñar tu software como una colección de servicios que se comunican a través de interfaces bien definidas (APIs) en vez de un bloque interconectado. Como construir con LEGO: cada pieza conecta con otras a través de conectores estándar.

En términos prácticos: tus datos de CRM están disponibles via API. Tu sistema de pagos tiene su propia API. La autenticación es un servicio separado. Tu app móvil, web e herramientas internas consumen las mismas APIs.

## Los Ahorros Reales

Una empresa de software mediana que migramos a API-first:

**Antes (monolito):** Feature nueva: 6-8 semanas, $15K-$25K. Integración: 4-6 semanas, $10K-$20K. App móvil: 16 semanas, $80K+.

**Después (API-first):** Feature nueva: 2-3 semanas, $5K-$10K. Integración: 1-2 semanas, $3K-$8K. App móvil: 8 semanas, $35K.

Ahorro estimado en 18 meses: $180K, y features 3x más rápidos.

## Cuándo Tiene Sentido API-First

### Tiene sentido cuando:
- Planeas app móvil junto a tu web
- Necesitas integrar con 3+ servicios externos
- Múltiples equipos trabajan en partes distintas del sistema
- Esperas crecer 3x+ en 2-3 años

### No tiene sentido cuando:
- Estás construyendo un MVP para lanzar en 30 días
- Tienes un front-end, una base de datos, sin integraciones
- Tu base de usuarios es menor a 100

## Cómo Migrar Sin Reconstruir Todo

No necesitas reescribir toda tu aplicación. El patrón strangler fig funciona: identifica el punto de integración más doloroso, extráelo en un servicio con API limpia, redirige tráfico al nuevo servicio, repite. La mayoría de empresas medianas pueden extraer 3-5 servicios críticos en 6-12 meses.

## Decisiones de Diseño de API Que Importan

**REST vs. GraphQL:** REST para operaciones simples (la mayoría de casos mid-market). GraphQL para consultas complejas de datos anidados.

**Autenticación:** OAuth 2.0 para acceso de terceros, JWT para comunicación interna servicio a servicio.

**Versionamiento:** Siempre versiona tus APIs desde el día uno. Cambios que rompen van en nuevas versiones.

**Documentación:** Docs auto-generados (Swagger/OpenAPI) son el mínimo. Buena documentación de API es la diferencia entre socios integrando en días vs. meses.

Avertris construye arquitecturas API-first para empresas medianas. Ya sea empezando de cero o migrando de un monolito, diseñamos sistemas que escalan con tu negocio.` } },
    ],
  },
  contactPage: {
    label: { en: "Get started", es: "Empecemos" },
    title: { en: "Let's talk about your growth", es: "Hablemos de tu crecimiento" },
    subtitle: { en: "Fill out the form or book a call directly. Every conversation starts with understanding — we'll never pitch you something you don't need.", es: "Llena el formulario o agenda una llamada directamente. Cada conversación comienza con entendimiento — nunca te venderemos algo que no necesitas." },
    formTitle: { en: "Tell us about your business", es: "Cuéntanos sobre tu negocio" },
    formDesc: { en: "We'll respond within one business day with a personalized assessment.", es: "Te responderemos en un día hábil con una evaluación personalizada." },
    name: { en: "Full Name", es: "Nombre Completo" },
    email: { en: "Email", es: "Correo Electrónico" },
    phone: { en: "Phone", es: "Teléfono" },
    company: { en: "Company", es: "Empresa" },
    service: { en: "Service interest", es: "Servicio de interés" },
    budget: { en: "Budget range", es: "Rango de presupuesto" },
    message: { en: "Tell us about your project", es: "Cuéntanos sobre tu proyecto" },
    messagePh: { en: "What are you looking to build or improve?", es: "¿Qué buscas construir o mejorar?" },
    submit: { en: "Book a call", es: "Agendar una llamada" },
    bookTitle: { en: "Prefer to book directly?", es: "¿Prefieres agendar directamente?" },
    bookDesc: { en: "Pick a time that works — 30 min intro call.", es: "Elige un horario — llamada introductoria de 30 min." },
    bookBtn: { en: "Schedule on Calendly", es: "Agendar en Calendly" },
    otherTitle: { en: "Other ways to reach us", es: "Otras formas de contactarnos" },
    emailLabel: { en: "Email", es: "Correo" },
    responseLabel: { en: "Response time", es: "Tiempo de respuesta" },
    responseValue: { en: "Within 1 business day", es: "En 1 día hábil" },
    presenceTitle: { en: "Our presence", es: "Nuestra presencia" },
    svcOptions: { en: ["AI & Technology Solutions", "Avertris Products (CRM/Dealer Manager)", "Growth Marketing & SEO", "Paid Ads & Attribution", "Strategic Consultation", "Not sure yet — help me decide"], es: ["Soluciones de IA y Tecnología", "Productos Avertris (CRM/Dealer Manager)", "Growth Marketing y SEO", "Paid Ads y Atribución", "Consultoría Estratégica", "Aún no sé — ayúdenme a decidir"] },
    budgetOptions: ["Under $750", "$750 to $1,500", "$1,500 to $5,000", "$5,000 to $10,000", "$10,000 to $25,000", "$25,000 to $50,000", "$50,000 to $100,000", "Above $100,000"],
  },
  /* ── Products Hub ── */
  productsPage: {
    label: { en: "Products", es: "Productos" },
    title: { en: "Tools that stop the bleeding", es: "Herramientas que detienen la hemorragia" },
    subtitle: { en: "Ready-to-deploy solutions for the problems costing you the most money right now.", es: "Soluciones listas para implementar que atacan los problemas que más dinero te cuestan ahora mismo." },
    products: [
      {
        slug: "ai-crm",
        icon: "⟳",
        name: { en: "Avertris AI CRM", es: "Avertris AI CRM" },
        tagline: { en: "Stop losing clients to slow follow-ups", es: "Deja de perder clientes por seguimientos lentos" },
        desc: { en: "AI-powered CRM that responds to leads in seconds, automates your entire pipeline, and ensures zero clients fall through the cracks. Built for teams drowning in manual follow-ups.", es: "CRM potenciado con IA que responde leads en segundos, automatiza todo tu pipeline y asegura que ningún cliente se pierda. Hecho para equipos ahogados en seguimientos manuales." },
        stat: { en: "70% faster lead response", es: "70% más rápido en respuesta a leads" },
        price: { en: "From $300/mo", es: "Desde $300/mes" },
      },
      {
        slug: "ai-chatbot",
        icon: "◇",
        name: { en: "AI Chatbot SaaS", es: "Chatbot SaaS con IA" },
        tagline: { en: "Never lose another lead to a slow inbox", es: "Nunca pierdas otro lead por una bandeja lenta" },
        desc: { en: "Deploy an AI agent on your website in minutes. It qualifies leads, answers questions, and books meetings 24/7 — so your team stops hemorrhaging opportunities while they sleep.", es: "Despliega un agente IA en tu web en minutos. Califica leads, responde preguntas y agenda reuniones 24/7 — para que tu equipo deje de perder oportunidades mientras duermen." },
        stat: { en: "24/7 lead capture", es: "Captura de leads 24/7" },
        price: { en: "From $150/mo", es: "Desde $150/mes" },
      },
      {
        slug: "dealer-manager",
        icon: "▤",
        name: { en: "Dealer Manager", es: "Dealer Manager" },
        tagline: { en: "Stop running your dealership on 5 broken tools", es: "Deja de operar tu concesionario con 5 herramientas rotas" },
        desc: { en: "All-in-one platform for automotive dealerships: inventory, CRM, operations, and bilingual support. Replace the patchwork of tools draining 30+ hours/week from your staff.", es: "Plataforma todo-en-uno para concesionarios automotrices: inventario, CRM, operaciones y soporte bilingüe. Reemplaza el parche de herramientas que drenan 30+ horas/semana de tu staff." },
        stat: { en: "30+ hr/week recovered", es: "30+ hr/semana recuperadas" },
        price: { en: "Custom pricing", es: "Precio personalizado" },
      },
      {
        slug: "omnichannel",
        icon: "⬡",
        name: { en: "Nexus", es: "Nexus" },
        tagline: { en: "One inbox. Every channel. Total control.", es: "Una bandeja. Todos los canales. Control total." },
        desc: { en: "Merge WhatsApp, Instagram, Facebook, TikTok, LinkedIn, email, SMS, and live chat into one platform. Audit every conversation, measure team performance, and deploy an AI employee that qualifies leads 24/7.", es: "Une WhatsApp, Instagram, Facebook, TikTok, LinkedIn, email, SMS y chat en vivo en una plataforma. Audita cada conversación, mide rendimiento del equipo y despliega un empleado IA que califica leads 24/7." },
        stat: { en: "8 channels, 1 inbox", es: "8 canales, 1 bandeja" },
        price: { en: "From $99/mo", es: "Desde $99/mes" },
      },
      {
        slug: "cash-leak-assessment",
        icon: "◎",
        name: { en: "Cash Leak Assessment", es: "Assessment de Fugas de Dinero" },
        tagline: { en: "Find out exactly where you're bleeding money", es: "Descubre exactamente dónde estás perdiendo dinero" },
        desc: { en: "A 10-minute diagnostic that reveals the hidden cash leaks in your operations, marketing, and tools. Most businesses find $5K-50K in monthly waste they didn't know existed.", es: "Un diagnóstico de 10 minutos que revela las fugas ocultas de dinero en tus operaciones, marketing y herramientas. La mayoría de negocios encuentran $5K-50K en desperdicio mensual que no sabían que existía." },
        stat: { en: "Free — 10 min", es: "Gratis — 10 min" },
        price: { en: "Free", es: "Gratis" },
        featured: true,
      },
    ],
    cta: { en: "See all products", es: "Ver todos los productos" },
    learnMore: { en: "Learn more", es: "Más información" },
  },
  /* ── Cash Leak Assessment Landing Page ── */
  cashLeakPage: {
    label: { en: "Free diagnostic", es: "Diagnóstico gratuito" },
    title: { en: "Your business is leaking $5K–$50K every month.", es: "Tu negocio está perdiendo $5K–$50K cada mes." },
    subtitle: { en: "You just don't know where yet.", es: "Solo que aún no sabes dónde." },
    heroDesc: { en: "The Cash Leak Assessment is a free 10-minute diagnostic that shows you exactly where your business hemorrhages money through broken processes, wasted ad spend, dead leads, and manual chaos.", es: "El Assessment de Fugas de Dinero es un diagnóstico gratuito de 10 minutos que te muestra exactamente dónde tu negocio pierde dinero por procesos rotos, inversión en ads desperdiciada, leads muertos y caos manual." },
    heroCta: { en: "Take the free assessment", es: "Tomar el assessment gratis" },
    /* Pain section */
    painLabel: { en: "Sound familiar?", es: "¿Te suena familiar?" },
    painTitle: { en: "These are the silent killers eating your revenue", es: "Estos son los asesinos silenciosos que devoran tus ingresos" },
    pains: [
      { icon: "💸", title: { en: "Ad spend with zero attribution", es: "Inversión en ads sin atribución" }, desc: { en: "You're spending $5K-$50K/month on ads but can't tell which campaigns actually bring in revenue. You're funding Meta and Google — not your pipeline.", es: "Gastas $5K-$50K/mes en ads pero no puedes decir qué campañas generan ingresos realmente. Estás financiando a Meta y Google — no tu pipeline." } },
      { icon: "⏰", title: { en: "40+ hours/week in manual tasks", es: "40+ horas/semana en tareas manuales" }, desc: { en: "Your team copy-pastes between tools, manually enters data, and chases leads through WhatsApp. That's $2K-$8K/month in wasted labor — every month.", es: "Tu equipo copia-pega entre herramientas, ingresa datos manualmente y persigue leads por WhatsApp. Son $2K-$8K/mes en mano de obra desperdiciada — cada mes." } },
      { icon: "🚪", title: { en: "Leads dying in your inbox", es: "Leads muriendo en tu bandeja" }, desc: { en: "The average business loses 78% of leads because they respond too slowly. Each lost lead is $500-$5,000 in lifetime value — gone forever.", es: "El negocio promedio pierde 78% de sus leads porque responde muy lento. Cada lead perdido son $500-$5,000 en valor de vida — perdidos para siempre." } },
      { icon: "🔧", title: { en: "5+ disconnected tools", es: "5+ herramientas desconectadas" }, desc: { en: "CRM doesn't talk to your email tool, which doesn't talk to your ad platform. Every disconnection is a leak. Every leak is cash in the drain.", es: "El CRM no habla con tu herramienta de email, que no habla con tu plataforma de ads. Cada desconexión es una fuga. Cada fuga es dinero en el desagüe." } },
    ],
    /* What you get */
    getLabel: { en: "What you get", es: "Qué obtienes" },
    getTitle: { en: "In 10 minutes, you'll know exactly where the money goes", es: "En 10 minutos, sabrás exactamente a dónde va el dinero" },
    gets: [
      { icon: "📊", title: { en: "Cash Leak Score", es: "Puntaje de Fugas" }, desc: { en: "A 0-100 score showing how much cash your operations, marketing, and tools are leaking — with dollar estimates for each area.", es: "Un puntaje 0-100 que muestra cuánto dinero pierden tus operaciones, marketing y herramientas — con estimaciones en dólares por área." } },
      { icon: "🗺️", title: { en: "Leak Map", es: "Mapa de Fugas" }, desc: { en: "A visual breakdown of every bleeding point in your business: which tools fail, which processes waste time, which channels waste money.", es: "Un desglose visual de cada punto de sangrado en tu negocio: qué herramientas fallan, qué procesos desperdician tiempo, qué canales desperdician dinero." } },
      { icon: "🔧", title: { en: "Fix-It Priority Plan", es: "Plan de Reparación Priorizado" }, desc: { en: "A prioritized action plan showing the fastest, highest-ROI fixes first — so you stop the biggest leaks before anything else.", es: "Un plan de acción priorizado mostrando las reparaciones más rápidas y de mayor ROI primero — para que detengas las fugas más grandes antes que nada." } },
      { icon: "📈", title: { en: "Benchmark Comparison", es: "Comparación con Benchmarks" }, desc: { en: "See how your business compares to 100+ companies we've diagnosed. Know if you're bleeding more or less than your industry peers.", es: "Mira cómo se compara tu negocio con 100+ empresas que hemos diagnosticado. Sabe si estás perdiendo más o menos que tus pares de industria." } },
    ],
    /* Social proof */
    proofTitle: { en: "Companies that took the assessment", es: "Empresas que tomaron el assessment" },
    proofStats: [
      { n: "500+", l: { en: "Assessments completed", es: "Assessments completados" } },
      { n: "$2.3M", l: { en: "Total leaks identified", es: "Total de fugas identificadas" } },
      { n: "89%", l: { en: "Found leaks they didn't know existed", es: "Encontraron fugas que no sabían que existían" } },
    ],
    /* CTA section */
    ctaTitle: { en: "Stop guessing. Start diagnosing.", es: "Deja de adivinar. Empieza a diagnosticar." },
    ctaDesc: { en: "The assessment is free, takes 10 minutes, and gives you a dollar-amount estimate of how much your business is losing. Even if you never hire us — you keep the diagnosis.", es: "El assessment es gratis, toma 10 minutos y te da una estimación en dólares de cuánto pierde tu negocio. Aunque nunca nos contrates — te quedas con el diagnóstico." },
    ctaBtn: { en: "Take the Cash Leak Assessment — Free", es: "Tomar el Assessment de Fugas — Gratis" },
    ctaNote: { en: "No credit card. No spam. Just a diagnosis.", es: "Sin tarjeta de crédito. Sin spam. Solo un diagnóstico." },
    emailPh: { en: "Your work email", es: "Tu correo corporativo" },
    namePh: { en: "Your name", es: "Tu nombre" },
    companyPh: { en: "Company name", es: "Nombre de empresa" },
  },
  /* ── Dedicated Service & Product Pages ── */
  detailPages: {
    "svc-ai-consulting": {
      label: { en: "Technology", es: "Tecnología" },
      title: { en: "AI Consulting & Agent Development", es: "Consultoría de IA y Desarrollo de Agentes" },
      subtitle: { en: "Stop losing deals to slow, manual operations. We build AI agents that work 24/7 — responding to leads, automating workflows, and eliminating the bottlenecks that cost you money.", es: "Deja de perder negocios por operaciones lentas y manuales. Construimos agentes de IA que trabajan 24/7 — respondiendo leads, automatizando flujos y eliminando los cuellos de botella que te cuestan dinero." },
      problem: { en: "Your team spends 40+ hours per week on tasks a machine could do in seconds. Leads go cold. Data gets lost between tools. Competitors using AI are moving 10x faster. Every week you wait, you fall further behind.", es: "Tu equipo gasta 40+ horas semanales en tareas que una máquina haría en segundos. Los leads se enfrían. Los datos se pierden entre herramientas. Competidores usando IA se mueven 10x más rápido." },
      features: { en: ["AI Strategy & Roadmap Development", "Custom AI Agent Development", "LLM Integration (OpenAI, Claude, Custom Models)", "Process Automation & Workflow AI", "AI-Powered Data Analysis & Insights", "Conversational AI & NLP Solutions", "AI Training & Team Enablement", "Ongoing AI Advisory & Optimization"], es: ["Estrategia y Hoja de Ruta de IA", "Desarrollo de Agentes de IA Personalizados", "Integración de LLMs (OpenAI, Claude, Modelos Custom)", "Automatización de Procesos con IA", "Análisis de Datos e Insights con IA", "IA Conversacional y Soluciones NLP", "Capacitación de IA para Equipos", "Asesoría Continua y Optimización de IA"] },
      results: [{ n: "40", s: "hr", l: { en: "Saved weekly per client", es: "Ahorradas semanalmente por cliente" } }, { n: "70", s: "%", l: { en: "Faster lead response", es: "Respuesta a leads más rápida" } }, { n: "3.2", s: "x", l: { en: "Average ROI in 12 months", es: "ROI promedio en 12 meses" } }],
      tech: "OpenAI, Anthropic Claude, LangChain, Python, AWS, Azure AI, Google Vertex AI",
      price: { en: "Consulting from $500 | Custom projects from $2,500", es: "Consultoría desde $500 | Proyectos custom desde $2,500" },
      cta: { en: "Get an AI strategy session", es: "Agenda una sesión de estrategia de IA" },
    },
    "svc-chatbot-dev": {
      label: { en: "Technology", es: "Tecnología" },
      title: { en: "AI Chatbot Development", es: "Desarrollo de Chatbots con IA" },
      subtitle: { en: "78% of leads go cold because businesses respond too slowly. Deploy an AI chatbot that qualifies leads, answers questions, and books meetings — in English and Spanish — 24/7.", es: "78% de los leads se enfrían porque los negocios responden muy lento. Despliega un chatbot de IA que califica leads, responde preguntas y agenda reuniones — en inglés y español — 24/7." },
      problem: { en: "Your inbox is where leads go to die. It takes your team 6+ hours to respond, and by then, the prospect already called your competitor. You're paying for traffic that converts into nothing.", es: "Tu bandeja es donde los leads van a morir. Tu equipo tarda 6+ horas en responder, y para entonces el prospecto ya llamó a tu competencia. Estás pagando por tráfico que no convierte." },
      features: { en: ["Website AI Chat Agents", "WhatsApp & Messenger Bot Integration", "Lead Qualification & Scoring Automation", "Meeting Booking & Calendar Sync", "Multi-Language Support (EN/ES)", "CRM Integration (HubSpot, Salesforce, GHL)", "Custom Knowledge Base Training", "Analytics & Conversation Insights"], es: ["Agentes de Chat IA para Sitios Web", "Integración de Bots para WhatsApp y Messenger", "Calificación de Leads y Scoring Automatizado", "Agendamiento y Sincronización de Calendario", "Soporte Multi-Idioma (EN/ES)", "Integración con CRM (HubSpot, Salesforce, GHL)", "Entrenamiento con Base de Conocimiento Custom", "Analítica e Insights de Conversaciones"] },
      results: [{ n: "78", s: "%", l: { en: "Of leads captured after-hours", es: "De leads capturados fuera de horario" } }, { n: "3", s: "sec", l: { en: "Average response time", es: "Tiempo promedio de respuesta" } }, { n: "45", s: "%", l: { en: "Increase in qualified meetings", es: "Aumento en reuniones calificadas" } }],
      tech: "OpenAI, Claude, Voiceflow, Botpress, Twilio, WhatsApp Business API",
      price: { en: "Starting at $2,500 for custom builds | SaaS from $150/mo", es: "Desde $2,500 para builds custom | SaaS desde $150/mes" },
      cta: { en: "Build my chatbot", es: "Construir mi chatbot" },
    },
    "svc-voice": {
      label: { en: "Technology", es: "Tecnología" },
      title: { en: "AI Voice Integration", es: "Integración de Voz con IA" },
      subtitle: { en: "Your phone system is losing you money. AI voice agents handle inbound calls, qualify leads by voice, and route high-value prospects to your team — in both English and Spanish.", es: "Tu sistema telefónico te está costando dinero. Agentes de voz con IA manejan llamadas entrantes, califican leads por voz y dirigen prospectos de alto valor a tu equipo — en inglés y español." },
      problem: { en: "Missed calls are missed revenue. Your team can't answer every call instantly, and voicemail is where deals go to die. Meanwhile, competitors with AI voice systems never miss a ring.", es: "Llamadas perdidas son ingresos perdidos. Tu equipo no puede contestar cada llamada al instante, y el buzón de voz es donde los negocios van a morir." },
      features: { en: ["AI-Powered Inbound Call Handling", "Voice-Based Lead Qualification", "IVR Replacement with Conversational AI", "Bilingual Voice Agents (EN/ES)", "Call Transcription & Summarization", "CRM Auto-Logging & Follow-Up Triggers", "Appointment Scheduling by Voice", "Call Analytics & Sentiment Analysis"], es: ["Manejo de Llamadas Entrantes con IA", "Calificación de Leads por Voz", "Reemplazo de IVR con IA Conversacional", "Agentes de Voz Bilingües (EN/ES)", "Transcripción y Resumen de Llamadas", "Auto-Registro en CRM y Triggers de Seguimiento", "Agendamiento por Voz", "Analítica de Llamadas y Análisis de Sentimiento"] },
      results: [{ n: "0", s: "", l: { en: "Missed inbound calls", es: "Llamadas entrantes perdidas" } }, { n: "60", s: "%", l: { en: "Reduction in call handling costs", es: "Reducción en costos de manejo de llamadas" } }, { n: "24", s: "/7", l: { en: "Voice coverage without staff", es: "Cobertura de voz sin personal" } }],
      tech: "Twilio, ElevenLabs, OpenAI Whisper, Deepgram, Vapi, Make.com",
      price: { en: "Custom projects from $3,000", es: "Proyectos custom desde $3,000" },
      cta: { en: "Deploy AI voice for my business", es: "Implementar voz IA para mi negocio" },
    },
    "svc-web-mobile": {
      label: { en: "Technology", es: "Tecnología" },
      title: { en: "Custom Web & Mobile Apps", es: "Aplicaciones Web y Móviles a Medida" },
      subtitle: { en: "Off-the-shelf software forcing you into workarounds? We build exactly what your business needs — web apps, mobile apps, and platforms that fit your operations like a glove.", es: "¿Software genérico obligándote a improvisar? Construimos exactamente lo que tu negocio necesita — apps web, apps móviles y plataformas que se ajustan a tus operaciones." },
      problem: { en: "You're duct-taping 5 different tools together, paying for features you don't use, and still have gaps in your workflow. Your team wastes hours on workarounds that custom software would eliminate overnight.", es: "Estás parcheando 5 herramientas diferentes, pagando por funciones que no usas, y aún tienes vacíos en tu flujo. Tu equipo desperdicia horas en parches que un software a medida eliminaría." },
      features: { en: ["Custom Web Application Development", "Progressive Web Apps (PWA)", "Native & Cross-Platform Mobile Apps", "API Development & Integration", "Database Design & Optimization", "Admin Dashboards & Internal Tools", "E-Commerce & Marketplace Platforms", "Ongoing Maintenance & Support"], es: ["Desarrollo de Aplicaciones Web a Medida", "Progressive Web Apps (PWA)", "Apps Móviles Nativas y Cross-Platform", "Desarrollo e Integración de APIs", "Diseño y Optimización de Bases de Datos", "Dashboards Administrativos y Herramientas Internas", "Plataformas de E-Commerce y Marketplace", "Mantenimiento y Soporte Continuo"] },
      results: [{ n: "6", s: "mo", l: { en: "Avg. dev time saved vs agencies", es: "Tiempo de desarrollo ahorrado vs agencias" } }, { n: "50", s: "%", l: { en: "Lower cost than US-only teams", es: "Menor costo que equipos solo US" } }, { n: "100", s: "%", l: { en: "Custom-fit to your operations", es: "Ajustado 100% a tus operaciones" } }],
      tech: "React, Next.js, React Native, Node.js, Python, PostgreSQL, AWS, Vercel",
      price: { en: "Websites from $600 | Custom apps from $5,000", es: "Sitios web desde $600 | Apps custom desde $5,000" },
      cta: { en: "Scope my project", es: "Cotizar mi proyecto" },
    },
    "svc-paid-ads": {
      label: { en: "Growth Marketing", es: "Growth Marketing" },
      title: { en: "Paid Ads & Performance Marketing", es: "Paid Ads y Marketing de Performance" },
      subtitle: { en: "Stop feeding Meta and Google with zero ROI. We build paid ad campaigns where every dollar is tracked from click to closed deal — in English and Spanish markets.", es: "Deja de alimentar a Meta y Google sin ROI. Construimos campañas de ads donde cada dólar se rastrea desde el clic hasta el cierre — en mercados en inglés y español." },
      problem: { en: "You're spending $5K-$50K/month on ads but can't tell which campaigns actually bring in revenue. Your agency sends vanity metrics — impressions, clicks, CPM — while your pipeline stays empty.", es: "Gastas $5K-$50K/mes en ads pero no puedes decir qué campañas generan ingresos. Tu agencia envía métricas de vanidad — impresiones, clics, CPM — mientras tu pipeline sigue vacío." },
      features: { en: ["Google Ads (Search, Display, YouTube)", "Meta Ads (Facebook & Instagram)", "LinkedIn Ads for B2B", "Retargeting & Lookalike Audiences", "Landing Page Design & Optimization", "A/B Testing & Creative Optimization", "Revenue Attribution Setup", "Bilingual Campaign Management (EN/ES)"], es: ["Google Ads (Búsqueda, Display, YouTube)", "Meta Ads (Facebook e Instagram)", "LinkedIn Ads para B2B", "Retargeting y Audiencias Similares", "Diseño y Optimización de Landing Pages", "Pruebas A/B y Optimización Creativa", "Configuración de Atribución de Ingresos", "Gestión Bilingüe de Campañas (EN/ES)"] },
      results: [{ n: "60", s: "%", l: { en: "Less wasted ad spend", es: "Menos desperdicio en ads" } }, { n: "3.2", s: "x", l: { en: "Average ROAS improvement", es: "Mejora promedio en ROAS" } }, { n: "45", s: "%", l: { en: "Lower cost per acquisition", es: "Menor costo por adquisición" } }],
      tech: "Google Ads, Meta Business Suite, LinkedIn Campaign Manager, Hyros, GA4, GTM",
      price: { en: "Management from $2,500/mo + ad spend", es: "Gestión desde $2,500/mes + inversión en ads" },
      cta: { en: "Audit my ad spend — free", es: "Auditar mi inversión en ads — gratis" },
    },
    "svc-seo": {
      label: { en: "Growth Marketing", es: "Growth Marketing" },
      title: { en: "SEO & Content Strategy", es: "SEO y Estrategia de Contenido" },
      subtitle: { en: "Your competitors rank above you because they invested in SEO while you relied on ads. We build bilingual SEO engines that generate organic traffic in English and Spanish — traffic you don't have to pay for every month.", es: "Tu competencia se posiciona arriba porque invirtieron en SEO mientras tú dependías de ads. Construimos motores de SEO bilingüe que generan tráfico orgánico en inglés y español — tráfico que no tienes que pagar cada mes." },
      problem: { en: "You're invisible on Google. Your competitors own page 1 for every keyword that matters. And you're 100% dependent on paid ads — the moment you stop paying, your leads disappear overnight.", es: "Eres invisible en Google. Tu competencia domina la página 1 para cada keyword que importa. Y dependes 100% de ads pagados — el momento que dejas de pagar, tus leads desaparecen." },
      features: { en: ["Technical SEO Audit & Fixes", "Keyword Research & Strategy", "On-Page SEO Optimization", "Content Creation & Blog Strategy", "Bilingual SEO (English & Spanish)", "Local SEO (Google Business, Maps)", "Link Building & Authority", "Monthly Reporting & Rankings"], es: ["Auditoría y Correcciones de SEO Técnico", "Investigación de Keywords y Estrategia", "Optimización de SEO On-Page", "Creación de Contenido y Estrategia de Blog", "SEO Bilingüe (Inglés y Español)", "SEO Local (Google Business, Maps)", "Link Building y Autoridad", "Reportes Mensuales y Rankings"] },
      results: [{ n: "340", s: "%", l: { en: "Avg. organic traffic increase", es: "Aumento promedio de tráfico orgánico" } }, { n: "0", s: "", l: { en: "Dependency on paid ads for leads", es: "Dependencia de ads pagados para leads" } }, { n: "12", s: "mo", l: { en: "To dominate your niche keywords", es: "Para dominar tus keywords de nicho" } }],
      tech: "Semrush, Ahrefs, Screaming Frog, Google Search Console, Surfer SEO, Clearscope",
      price: { en: "SEO packages from $1,500/mo", es: "Paquetes de SEO desde $1,500/mes" },
      cta: { en: "Get my free SEO audit", es: "Obtener mi auditoría SEO gratis" },
    },
    "svc-analytics": {
      label: { en: "Growth Marketing", es: "Growth Marketing" },
      title: { en: "Analytics & Revenue Attribution", es: "Analítica y Atribución de Ingresos" },
      subtitle: { en: "You're making marketing decisions in the dark. We build dashboards that show exactly which channels, campaigns, and touchpoints generate revenue — not just clicks.", es: "Estás tomando decisiones de marketing a ciegas. Construimos dashboards que muestran exactamente qué canales, campañas y touchpoints generan ingresos — no solo clics." },
      problem: { en: "The average mid-market company wastes 40-60% of ad spend on channels that produce zero revenue. You have data in 10 tools but no single source of truth. You literally cannot tell which marketing dollar made money.", es: "La empresa mediana promedio desperdicia 40-60% de su inversión en ads en canales con cero ingresos. Tienes datos en 10 herramientas pero ninguna fuente única de verdad. Literalmente no puedes decir qué dólar de marketing generó dinero." },
      features: { en: ["Revenue Attribution Setup (First/Last/Multi-Touch)", "Custom Analytics Dashboards", "GA4 Setup & Configuration", "Marketing Data Warehouse", "Cross-Channel Performance Tracking", "ROI Reporting by Campaign", "Conversion Path Analysis", "Real-Time Revenue Dashboards"], es: ["Configuración de Atribución (First/Last/Multi-Touch)", "Dashboards de Analítica Personalizados", "Configuración de GA4", "Data Warehouse de Marketing", "Tracking de Rendimiento Cross-Channel", "Reportes de ROI por Campaña", "Análisis de Rutas de Conversión", "Dashboards de Ingresos en Tiempo Real"] },
      results: [{ n: "60", s: "%", l: { en: "Ad waste identified & eliminated", es: "Desperdicio en ads identificado y eliminado" } }, { n: "1", s: "", l: { en: "Single source of truth for revenue", es: "Una sola fuente de verdad para ingresos" } }, { n: "2", s: "wk", l: { en: "To full attribution setup", es: "Para configuración completa de atribución" } }],
      tech: "Hyros, Google Analytics 4, Looker Studio, BigQuery, Segment, GTM",
      price: { en: "Attribution setup from $2,000 | Ongoing from $1,500/mo", es: "Setup de atribución desde $2,000 | Continuo desde $1,500/mes" },
      cta: { en: "Show me where my money goes", es: "Muéstrame a dónde va mi dinero" },
    },
    "svc-email-cro": {
      label: { en: "Growth Marketing", es: "Growth Marketing" },
      title: { en: "Email Marketing & CRO", es: "Email Marketing y CRO" },
      subtitle: { en: "Your email list is a goldmine you're not mining. We build automated email sequences that nurture leads, recover abandoned carts, and reactivate dormant customers — while optimizing every page for conversions.", es: "Tu lista de email es una mina de oro que no estás explotando. Construimos secuencias automatizadas que nutren leads, recuperan carritos abandonados y reactivan clientes dormidos — mientras optimizamos cada página para conversiones." },
      problem: { en: "You have thousands of email subscribers and do nothing with them. Your landing pages convert at 1-2% when they should convert at 5-10%. Every visitor that leaves without converting is money you already paid to acquire.", es: "Tienes miles de suscriptores y no haces nada con ellos. Tus landing pages convierten al 1-2% cuando deberían convertir al 5-10%. Cada visitante que se va sin convertir es dinero que ya pagaste por adquirir." },
      features: { en: ["Email Sequence Automation", "Welcome & Onboarding Flows", "Abandoned Cart Recovery", "Customer Reactivation Campaigns", "A/B Testing & Subject Line Optimization", "Landing Page Design & Optimization", "Conversion Rate Optimization (CRO)", "Bilingual Email Campaigns (EN/ES)"], es: ["Automatización de Secuencias de Email", "Flujos de Bienvenida y Onboarding", "Recuperación de Carritos Abandonados", "Campañas de Reactivación de Clientes", "Pruebas A/B y Optimización de Asuntos", "Diseño y Optimización de Landing Pages", "Optimización de Tasa de Conversión (CRO)", "Campañas de Email Bilingües (EN/ES)"] },
      results: [{ n: "85", s: "%", l: { en: "Increase in email engagement", es: "Aumento en engagement de email" } }, { n: "3", s: "x", l: { en: "Landing page conversion lift", es: "Mejora en conversión de landing pages" } }, { n: "25", s: "%", l: { en: "Revenue from email alone", es: "Ingresos solo por email" } }],
      tech: "ActiveCampaign, Klaviyo, Mailchimp, Unbounce, Hotjar, Google Optimize",
      price: { en: "Email marketing from $1,500/mo | CRO from $2,000/mo", es: "Email marketing desde $1,500/mes | CRO desde $2,000/mes" },
      cta: { en: "Optimize my conversions", es: "Optimizar mis conversiones" },
    },
    "product-ai-crm": {
      label: { en: "Products", es: "Productos" },
      title: { en: "Avertris AI CRM", es: "Avertris AI CRM" },
      subtitle: { en: "Stop losing clients to slow follow-ups. AI-powered CRM that responds to leads in seconds, automates your entire pipeline, and ensures zero clients fall through the cracks.", es: "Deja de perder clientes por seguimientos lentos. CRM potenciado con IA que responde leads en segundos, automatiza todo tu pipeline y asegura que ningún cliente se pierda." },
      problem: { en: "Your CRM is a glorified spreadsheet. Leads sit for hours without follow-up. Your team forgets to update it. And you have zero visibility into which deals are actually moving. Every day, clients slip through the cracks because nobody followed up.", es: "Tu CRM es una hoja de cálculo glorificada. Los leads esperan horas sin seguimiento. Tu equipo olvida actualizarlo. Y no tienes visibilidad sobre qué negocios avanzan realmente." },
      features: { en: ["AI-Powered Lead Response (under 60 seconds)", "Automated Follow-Up Sequences", "Pipeline & Deal Management", "Contact & Company Management", "Email & SMS Marketing Built-In", "Appointment Scheduling", "Reporting & Revenue Dashboards", "Bilingual Platform (EN/ES)"], es: ["Respuesta a Leads con IA (menos de 60 segundos)", "Secuencias de Seguimiento Automatizadas", "Gestión de Pipeline y Negocios", "Gestión de Contactos y Empresas", "Email & SMS Marketing Integrado", "Agendamiento de Citas", "Reportes y Dashboards de Ingresos", "Plataforma Bilingüe (EN/ES)"] },
      results: [{ n: "70", s: "%", l: { en: "Faster lead response", es: "Respuesta a leads más rápida" } }, { n: "0", s: "", l: { en: "Leads lost to missed follow-ups", es: "Leads perdidos por seguimientos perdidos" } }, { n: "3.2", s: "x", l: { en: "Revenue from existing pipeline", es: "Ingresos del pipeline existente" } }],
      tech: "Go High Level, Custom AI Models, Twilio, Stripe, Zapier",
      price: { en: "From $300/mo (5 users included, $10/extra)", es: "Desde $300/mes (5 usuarios incluidos, $10/extra)" },
      cta: { en: "Start my AI CRM trial", es: "Iniciar mi prueba de AI CRM" },
    },
    "product-ai-chatbot": {
      label: { en: "Products", es: "Productos" },
      title: { en: "AI Chatbot SaaS", es: "Chatbot SaaS con IA" },
      subtitle: { en: "Deploy an AI agent on your website in minutes — not months. It qualifies leads, answers questions, and books meetings 24/7 so your team stops losing opportunities while they sleep.", es: "Despliega un agente IA en tu web en minutos — no meses. Califica leads, responde preguntas y agenda reuniones 24/7 para que tu equipo deje de perder oportunidades mientras duermen." },
      problem: { en: "Your website gets hundreds of visitors but most leave without talking to anyone. When they do reach out, your team responds hours later — and by then, they've moved on. You're paying for traffic and converting almost none of it.", es: "Tu web recibe cientos de visitantes pero la mayoría se va sin hablar con nadie. Cuando contactan, tu equipo responde horas después — y para entonces, ya se fueron." },
      features: { en: ["Plug-and-Play Website Chat Widget", "AI-Powered Lead Qualification", "Automatic Meeting Booking", "Custom Knowledge Base Training", "Multi-Language Support (EN/ES)", "CRM Integration", "Analytics & Chat Transcripts", "No Code Required — Deploy in Minutes"], es: ["Widget de Chat Plug-and-Play", "Calificación de Leads con IA", "Agendamiento Automático de Reuniones", "Entrenamiento con Base de Conocimiento Custom", "Soporte Multi-Idioma (EN/ES)", "Integración con CRM", "Analítica y Transcripciones de Chat", "Sin Código — Despliega en Minutos"] },
      results: [{ n: "24", s: "/7", l: { en: "Lead capture — never miss a visitor", es: "Captura de leads — nunca pierdas un visitante" } }, { n: "3", s: "sec", l: { en: "Average response time", es: "Tiempo promedio de respuesta" } }, { n: "35", s: "%", l: { en: "More qualified meetings booked", es: "Más reuniones calificadas agendadas" } }],
      tech: "OpenAI, Custom NLP, React Widget, REST API, Webhooks",
      price: { en: "From $150/mo | 14-day free trial", es: "Desde $150/mes | Prueba gratis de 14 días" },
      cta: { en: "Try it free for 14 days", es: "Pruébalo gratis 14 días" },
    },
    "product-dealer-manager": {
      label: { en: "Products", es: "Productos" },
      title: { en: "Dealer Manager", es: "Dealer Manager" },
      subtitle: { en: "Stop running your dealership on 5 broken tools. One platform for inventory, CRM, operations, and reporting — built specifically for automotive dealerships in the USA and Dominican Republic.", es: "Deja de operar tu concesionario con 5 herramientas rotas. Una plataforma para inventario, CRM, operaciones y reportes — construida específicamente para concesionarios automotrices en USA y República Dominicana." },
      problem: { en: "Your dealership staff juggles inventory spreadsheets, a separate CRM, WhatsApp for leads, and paper for service orders. Nothing talks to anything. You lose 30+ hours per week to this chaos — and leads fall through the cracks daily.", es: "Tu staff hace malabares con hojas de inventario, un CRM separado, WhatsApp para leads y papel para órdenes de servicio. Nada se comunica. Pierdes 30+ horas semanales en este caos — y leads se pierden diariamente." },
      features: { en: ["Vehicle Inventory Management", "Built-In CRM & Lead Tracking", "Service Order Management", "Financial Reporting & Analytics", "Multi-Location Support", "Bilingual Platform (EN/ES)", "Staff Performance Tracking", "Customer Communication Hub (SMS, Email, WhatsApp)"], es: ["Gestión de Inventario de Vehículos", "CRM Integrado y Seguimiento de Leads", "Gestión de Órdenes de Servicio", "Reportes Financieros y Analítica", "Soporte Multi-Ubicación", "Plataforma Bilingüe (EN/ES)", "Seguimiento de Rendimiento de Staff", "Hub de Comunicación con Clientes (SMS, Email, WhatsApp)"] },
      results: [{ n: "30", s: "hr", l: { en: "Saved per week per location", es: "Ahorradas por semana por ubicación" } }, { n: "50", s: "%", l: { en: "Reduction in admin overhead", es: "Reducción en overhead administrativo" } }, { n: "0", s: "", l: { en: "Leads lost to disconnected tools", es: "Leads perdidos por herramientas desconectadas" } }],
      tech: "React, Node.js, PostgreSQL, WhatsApp Business API, Twilio",
      price: { en: "Custom pricing — schedule a demo", es: "Precio personalizado — agenda un demo" },
      cta: { en: "Schedule a Dealer Manager demo", es: "Agendar un demo de Dealer Manager" },
    },
  },
};

/* helper */
const t = (obj, lang) => (typeof obj === "string" ? obj : obj[lang] || obj.en);

/* ── Shared Primitives ─────────────────────────────────── */

function Box({ children, style, mob }) {
  const padding = mob ? "0 20px" : "0 40px";
  return <div style={{ maxWidth: 1200, margin: "0 auto", padding, width: "100%", ...style }}>{children}</div>;
}

function Btn({ children, variant = "primary", onClick, style = {}, mob }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: mob ? 13 : 14, fontWeight: 600, padding: mob ? "12px 24px" : "14px 32px", borderRadius: 6, border: "none", cursor: "pointer", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap" };
  const vars = {
    primary: { ...base, background: V.primary, color: "#1a1a1a", border: `1.5px solid ${V.primary}` },
    dark: { ...base, background: V.g900, color: V.white, border: `1.5px solid ${V.g900}` },
    outline: { ...base, background: "transparent", color: V.g900, border: `1.5px solid ${V.g200}` },
    ghost: { ...base, background: "transparent", color: V.primary, border: "none", padding: "8px 0" },
  };
  return <button onClick={onClick} style={{ ...vars[variant], ...style }}>{children}</button>;
}

function Lbl({ children, mob }) {
  return <span style={{ fontSize: mob ? 12 : 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: V.primary, display: "block", marginBottom: 16, fontFamily: F }}>{children}</span>;
}

function Hr({ style = {} }) {
  return <hr style={{ width: 60, height: 3, background: V.primary, border: "none", margin: 0, ...style }} />;
}

function PageHero({ title, subtitle, label, mob }) {
  const fontSize = mob ? 32 : 56;
  const padding = mob ? "120px 0 60px" : "160px 0 80px";
  return (
    <section style={{ background: V.g900, padding }}>
      <Box mob={mob}>
        {label && <Lbl mob={mob}>{label}</Lbl>}
        <h1 style={{ fontSize, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color: V.white, margin: 0, fontFamily: F }}>{title}</h1>
        {subtitle && <p style={{ fontSize: mob ? 15 : 18, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "20px 0 0", maxWidth: 560, lineHeight: 1.7, fontFamily: F }}>{subtitle}</p>}
      </Box>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */

function Nav({ page, go, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const to = useRef(null);
  const { mob } = useMedia();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const enter = (k) => { clearTimeout(to.current); setOpenMenu(k); };
  const leave = () => { to.current = setTimeout(() => setOpenMenu(null), 180); };

  const links = [
    {
      label: t(T.nav.services, lang), key: "services",
      mega: {
        cols: [
          { heading: t(T.nav.megaTech, lang), items: [{ t: lang === "en" ? "AI Consulting & Agents" : "Consultoría e Agentes de IA", go: "svc-ai-consulting" }, { t: lang === "en" ? "AI Chatbot Development" : "Desarrollo de Chatbots IA", go: "svc-chatbot-dev" }, { t: lang === "en" ? "AI Voice Integration" : "Integración de Voz con IA", go: "svc-voice" }, { t: lang === "en" ? "Custom Web & Mobile Apps" : "Apps Web y Móviles a Medida", go: "svc-web-mobile" }] },
          { heading: t(T.nav.megaProducts, lang), items: [{ t: lang === "en" ? "Avertris AI CRM" : "Avertris AI CRM", go: "product-ai-crm" }, { t: lang === "en" ? "AI Chatbot SaaS" : "Chatbot SaaS con IA", go: "product-ai-chatbot" }, { t: lang === "en" ? "Dealer Manager (Automotive)" : "Dealer Manager (Automotriz)", go: "product-dealer-manager" }, { t: lang === "en" ? "Cash Leak Assessment" : "Assessment de Fugas", go: "product-cash-leak-assessment" }, { t: "Nexus", go: "product-omnichannel" }] },
          { heading: t(T.nav.megaGrowth, lang), items: [{ t: lang === "en" ? "Paid Ads & Performance" : "Paid Ads y Performance", go: "svc-paid-ads" }, { t: lang === "en" ? "SEO & Content Strategy" : "SEO y Estrategia de Contenido", go: "svc-seo" }, { t: lang === "en" ? "Analytics & Attribution" : "Analítica y Atribución", go: "svc-analytics" }, { t: lang === "en" ? "Email Marketing & CRO" : "Email Marketing y CRO", go: "svc-email-cro" }] },
        ],
      },
    },
    { label: t(T.nav.products, lang), key: "products" },
    { label: t(T.nav.cases, lang), key: "cases" },
    { label: t(T.nav.about, lang), key: "about" },
    { label: t(T.nav.blog, lang), key: "blog" },
  ];

  const isHome = page === "home";
  const bg = scrolled || !isHome ? V.white : "transparent";
  const tc = scrolled || !isHome ? V.g900 : V.white;
  const border = scrolled ? `1px solid ${V.g200}` : "1px solid transparent";

  if (mob) {
    return (
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: bg, borderBottom: border, transition: "all 0.3s", fontFamily: F }}>
        <Box mob={mob} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("home")}>
            <div style={{ width: 32, height: 32, background: V.g900, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: V.primary, fontSize: 14, fontWeight: 800 }}>.a</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: tc, letterSpacing: -0.5, transition: "color 0.3s" }}>avertris</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: tc, transition: "color 0.3s" }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </Box>

        {mobileMenuOpen && (
          <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, background: V.white, overflow: "auto", animation: "slideIn 0.3s ease" }}>
            <Box mob={mob} style={{ padding: "32px 0" }}>
              {links.map((link) => (
                <div key={link.key}>
                  {link.mega ? (
                    <>
                      <button onClick={() => setMobileAccordion(mobileAccordion === link.key ? null : link.key)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 15, fontWeight: 600, color: V.g900, padding: "16px 0", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {link.label}
                        <span style={{ transform: mobileAccordion === link.key ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
                      </button>
                      {mobileAccordion === link.key && (
                        <div style={{ background: V.g100, padding: "16px 0", borderRadius: 8, marginBottom: 12 }}>
                          {link.mega.cols.map((col, ci) => (
                            <div key={ci} style={{ marginBottom: 16 }}>
                              <p style={{ fontSize: 12, fontWeight: 600, color: V.g400, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 8px" }}>{col.heading}</p>
                              {col.items.map((item, ii) => (
                                <button key={ii} onClick={() => { go(item.go || "services"); setMobileMenuOpen(false); }} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 400, color: V.g800, padding: "6px 0", textAlign: "left", width: "100%", transition: "color 0.15s" }}>{item.t}</button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button onClick={() => { go(link.key); setMobileMenuOpen(false); }} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 15, fontWeight: 600, color: V.g900, padding: "16px 0", textAlign: "left" }}>
                      {link.label}
                    </button>
                  )}
                  <hr style={{ margin: "12px 0", border: "none", borderTop: `1px solid ${V.g200}` }} />
                </div>
              ))}

              <div style={{ display: "flex", gap: 8, margin: "24px 0" }}>
                {["en", "es"].map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{ flex: 1, background: lang === l ? V.g900 : V.g100, color: lang === l ? V.white : V.g600, border: `1.5px solid ${lang === l ? V.g900 : V.g200}`, borderRadius: 4, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: F, transition: "all 0.2s", textTransform: "uppercase" }}>{l}</button>
                ))}
              </div>

              <Btn variant="primary" onClick={() => { go("contact"); setMobileMenuOpen(false); }} style={{ width: "100%", marginTop: 16 }} mob>{t(T.nav.cta, lang)}</Btn>
            </Box>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: bg, borderBottom: border, transition: "all 0.3s", fontFamily: F }}>
      <Box mob={false} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("home")}>
          <div style={{ width: 32, height: 32, background: V.g900, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: V.primary, fontSize: 14, fontWeight: 800 }}>.a</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: tc, letterSpacing: -0.5, transition: "color 0.3s" }}>avertris</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(link => (
            <div key={link.key} style={{ position: "relative" }} onMouseEnter={() => link.mega && enter(link.key)} onMouseLeave={leave}>
              <button onClick={() => { go(link.key); setOpenMenu(null); }} style={{
                background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14,
                fontWeight: page === link.key ? 600 : 400, color: page === link.key ? V.primary : tc,
                padding: "8px 0", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 4,
              }}>
                {link.label}
                {link.mega && <span style={{ fontSize: 10, opacity: 0.5 }}>▼</span>}
              </button>
              {link.mega && openMenu === link.key && (
                <div style={{ position: "absolute", top: "100%", left: -120, paddingTop: 12, zIndex: 200 }}>
                  <div style={{ background: V.white, borderRadius: 12, padding: "40px 48px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", display: "grid", gridTemplateColumns: "repeat(3, 220px)", gap: 40, border: `1px solid ${V.g200}` }}>
                    {link.mega.cols.map((col, ci) => (
                      <div key={ci}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: V.g400, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 16px" }}>{col.heading}</p>
                        {col.items.map((item, ii) => (
                          <button key={ii} onClick={() => { go(item.go || "services"); setOpenMenu(null); }} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 400, color: V.g800, padding: "8px 0", textAlign: "left", width: "100%", transition: "color 0.15s" }}
                            onMouseEnter={e => e.target.style.color = V.primary} onMouseLeave={e => e.target.style.color = V.g800}
                          >{item.t}</button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Language Switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
            {["en", "es"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? V.g900 : "transparent", color: lang === l ? V.white : tc,
                border: `1.5px solid ${lang === l ? V.g900 : (scrolled || !isHome ? V.g200 : "rgba(255,255,255,0.3)")}`,
                borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600,
                fontFamily: F, transition: "all 0.2s", textTransform: "uppercase",
              }}>{l}</button>
            ))}
          </div>
        </div>

        <Btn variant="primary" onClick={() => go("contact")} style={{ padding: "10px 24px", fontSize: 13 }}>{t(T.nav.cta, lang)}</Btn>
      </Box>
    </nav>
  );
}


/* ═══════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════ */

function HomePage({ go, lang }) {
  const [hS, sHS] = useState(null);
  const [hR, sHR] = useState(null);
  const [hC, sHC] = useState(null);
  const [hP, sHP] = useState(null);
  const [hT, sHT] = useState(null);
  const { mob, tab } = useMedia();
  const L = lang;

  return (
    <>
      {/* Hero */}
      <section className="dark" style={{ minHeight: mob ? "80vh" : "92vh", display: "flex", alignItems: "flex-end", padding: (mob ? "80px" : "100px") + " 0 " + (mob ? "60px" : "80px"), position: "relative", overflow: "hidden" }}>
        {/* Wavy Background — single layer, optimized (30fps, 3 waves, 15px step) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <WavyBackground
            colors={["#FF6B00", "#FF8533", "#CC5500"]}
            backgroundFill="#1a1a1a"
            blur={12}
            speed="slow"
            waveOpacity={0.4}
            waveWidth={60}
            containerClassName="h-full"
          />
        </div>
        {/* Dark gradient for text readability */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />
        <Box mob={mob} style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: mob ? 13 : 15, fontWeight: 400, color: "rgba(255,255,255,0.7)", margin: "0 0 24px", fontFamily: F }}>
            <span style={{ color: V.primary, fontWeight: 600 }}>{t(T.hero.label, L)}</span> {t(T.hero.labelSuffix, L)}
          </p>
          <h1 style={{ fontSize: mob ? 38 : 82, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: V.white, margin: "0 0 20px", maxWidth: 800, fontFamily: F }}>
            {t(T.hero.h1a, L)}<br />{t(T.hero.h1b, L)}<br />{t(T.hero.h1c, L)}
          </h1>
          <p style={{ fontSize: mob ? 15 : 18, fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", margin: "0 0 36px", maxWidth: 600, fontFamily: F }}>
            {t(T.hero.sub, L)}
          </p>
          <div style={{ display: mob ? "flex" : "flex", flexDirection: mob ? "column" : "row", gap: 16 }}>
            <Btn variant="dark" onClick={() => go("cases")} mob={mob}>{t(T.hero.ctaCases, L)}</Btn>
            <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(T.hero.ctaTalk, L)}</Btn>
          </div>
        </Box>
      </section>

      <div style={{ background: V.g900, padding: mob ? "32px 0" : "48px 0" }}>
        <Box mob={mob}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 24 : 0 }}>
            {T.hero.svc.map((s, i) => (
              <div key={i} style={{ padding: mob ? "0" : "0 40px", borderRight: !mob && i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 700, color: V.white, margin: "0 0 10px", fontFamily: F }}>{t(s.t, L)}</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: 0, fontFamily: F }}>{t(s.d, L)}</p>
              </div>
            ))}
          </div>
        </Box>
      </div>

      {/* Clients */}
      <section style={{ padding: mob ? "48px 0" : "64px 0", borderBottom: `1px solid ${V.g200}` }}>
        <Box mob={mob}><div style={{ display: "flex", alignItems: "center", gap: mob ? 24 : 60, flexWrap: "wrap" }}>
          {!mob && <span style={{ fontSize: 14, fontWeight: 500, color: V.g900, whiteSpace: "nowrap", fontFamily: F }}>{t(T.clients.label, L)}</span>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1, gap: mob ? 20 : 40, flexWrap: "wrap" }}>
            {["TechCorp", "MediGroup", "FinScale", "LogiNet", "DataBridge", "Nextera", "CloudVault"].map(n => (
              <span key={n} style={{ fontSize: mob ? 14 : 18, fontWeight: 700, color: V.g800, opacity: 0.55, letterSpacing: -0.5, fontFamily: F }}>{n}</span>
            ))}
          </div>
        </div></Box>
      </section>

      {/* Results */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ marginBottom: mob ? 40 : 64, maxWidth: 520 }}>
            <Lbl mob={mob}>{t(T.results.label, L)}</Lbl>
            <h2 style={{ fontSize: mob ? 32 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.results.title, L) }} />
            <Hr />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: mob ? 16 : 24 }}>
            {T.results.stats.map((s, i) => (
              <div key={i} onMouseEnter={() => !mob && sHR(i)} onMouseLeave={() => !mob && sHR(null)} style={{ background: V.g100, borderRadius: 12, padding: mob ? "28px 20px" : "40px 32px", transition: "all 0.2s", boxShadow: hR === i ? "0 12px 30px rgba(255,107,0,0.08)" : "none", transform: hR === i ? "translateY(-2px)" : "none" }}>
                <p style={{ fontSize: mob ? 32 : 48, fontWeight: 800, color: V.g900, lineHeight: 1, margin: "0 0 8px", letterSpacing: -2, fontFamily: F }}>{s.n}<span style={{ color: V.primary }}>{s.s}</span></p>
                <p style={{ fontSize: mob ? 12 : 14, fontWeight: 600, color: V.g800, margin: "0 0 16px", fontFamily: F }}>{t(s.l, L)}</p>
                <p style={{ fontSize: mob ? 12 : 13, fontWeight: 300, color: V.g400, lineHeight: 1.65, margin: 0, fontFamily: F }}>{t(s.d, L)}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Capabilities */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "flex" : "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "flex-end", justifyContent: "space-between", marginBottom: mob ? 40 : 64, gap: 40 }}>
            <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: 0, fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.capabilities.title, L) }} />
            <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(T.capabilities.cta, L)}</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: mob ? 16 : 24 }}>
            {T.capabilities.items.map((item, i) => {
              const isAlt = [1, 3, 5].includes(i); const h = hC === i;
              return (
                <div key={i} onMouseEnter={() => !mob && sHC(i)} onMouseLeave={() => !mob && sHC(null)} onClick={() => go("services")} style={{ padding: mob ? "28px 20px" : "48px 36px", minHeight: mob ? 200 : 280, cursor: "pointer", background: h ? V.primary : isAlt ? V.g200 : V.g100, display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "all 0.2s" }}>
                  <h3 style={{ fontSize: mob ? 16 : 20, fontWeight: 600, color: h ? V.white : V.g900, margin: 0, lineHeight: 1.35, whiteSpace: "pre-line", fontFamily: F, transition: "color 0.2s" }}>{t(item.title, L)}</h3>
                  {item.sub && <p style={{ fontSize: mob ? 12 : 13, fontWeight: 300, lineHeight: 1.5, color: h ? "rgba(255,255,255,0.8)" : V.g500, margin: "12px 0 0", fontFamily: F, transition: "color 0.2s" }}>{t(item.sub, L)}</p>}
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <span style={{ fontSize: mob ? 24 : 32, color: h ? V.white : V.primary, transition: "color 0.2s" }}>{item.icon}</span>
                    <span style={{ fontSize: 20, color: V.white, opacity: h ? 1 : 0, transition: "opacity 0.2s" }}>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
      </section>

      {/* Why Us */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g100 }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 40 : 80, alignItems: mob ? "stretch" : "start" }}>
          <div>
            <Lbl mob={mob}>{t(T.whyUs.label, L)}</Lbl>
            <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.whyUs.title, L) }} />
            <Hr />
            <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: "24px 0 32px", fontFamily: F }}>{t(T.whyUs.desc, L)}</p>
            <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(T.whyUs.cta, L)}</Btn>
          </div>
          <div>
            {T.whyUs.items.map((item, i) => (
              <div key={i} style={{ padding: mob ? "20px 0" : "32px 0", borderBottom: i < T.whyUs.items.length - 1 ? `1px solid ${V.g200}` : "none", display: "grid", gridTemplateColumns: mob ? "40px 1fr" : "48px 1fr", gap: mob ? 12 : 20, alignItems: "start", ...(i === 0 ? { paddingTop: 0 } : {}) }}>
                <div style={{ width: mob ? 40 : 48, height: mob ? 40 : 48, borderRadius: 10, background: V.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: V.primary, boxShadow: "0 12px 30px rgba(255,107,0,0.08)" }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: V.g900, margin: "0 0 8px", fontFamily: F }}>{t(item.title, L)}</h3>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.7, color: V.g600, margin: 0, fontFamily: F }}>{t(item.desc, L)}</p>
                </div>
              </div>
            ))}
          </div>
        </div></Box>
      </section>

      {/* Process */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "flex" : "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "flex-end", justifyContent: "space-between", marginBottom: mob ? 48 : 72, gap: 40 }}>
            <div style={{ maxWidth: 400 }}>
              <Lbl mob={mob}>{t(T.process.label, L)}</Lbl>
              <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }}>{t(T.process.title, L)}</h2>
              <Hr />
            </div>
            <Btn variant="outline" onClick={() => go("contact")} mob={mob}>{t(T.process.cta, L)}</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 0 }}>
            {T.process.steps.map((step, i) => {
              const h = hP === i;
              return (
                <div key={i} onMouseEnter={() => !mob && sHP(i)} onMouseLeave={() => !mob && sHP(null)} style={{ padding: mob ? "28px 20px" : "48px 40px", border: mob ? `1px solid ${V.g200}` : `1px solid ${h ? V.primary : V.g200}`, borderRight: !mob && i < 2 ? "none" : undefined, transition: "all 0.2s", boxShadow: h ? "0 12px 30px rgba(255,107,0,0.08)" : "none" }}>
                  <p style={{ fontSize: mob ? 40 : 64, fontWeight: 800, lineHeight: 1, margin: "0 0 24px", letterSpacing: -3, color: h ? V.primary : V.g200, transition: "color 0.2s", fontFamily: F }}>{step.num}</p>
                  <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 700, color: V.g900, margin: "0 0 16px", fontFamily: F }}>{t(step.title, L)}</h3>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.75, color: V.g600, margin: "0 0 24px", fontFamily: F }}>{t(step.desc, L)}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {t(step.details, L).map((d, j) => (
                      <li key={j} style={{ fontSize: mob ? 12 : 13, fontWeight: 400, color: V.g600, padding: "6px 0", borderTop: `1px solid ${V.g100}`, display: "flex", alignItems: "center", gap: 8, fontFamily: F }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: V.primary, flexShrink: 0 }} />{d}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                    <span style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${h ? V.primary : V.g200}`, background: h ? V.primary : "transparent", color: h ? V.white : V.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "all 0.2s" }}>+</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
      </section>

      {/* Team */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g100 }}>
        <Box mob={mob}>
          <div style={{ marginBottom: mob ? 40 : 64, maxWidth: 520 }}>
            <Lbl mob={mob}>{t(T.team.label, L)}</Lbl>
            <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.team.title, L) }} />
            <Hr />
          </div>
          <div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 24 : 48, alignItems: mob ? "stretch" : "start" }}>
            <div style={{ background: V.white, borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 30px rgba(255,107,0,0.08)" }}>
              <div style={{ width: "100%", height: mob ? 220 : 320, background: `linear-gradient(135deg, ${V.g900}, #2a2a40)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: mob ? 60 : 80, fontWeight: 800, color: V.primary, opacity: 0.3, fontFamily: F }}>JO</span>
              </div>
              <div style={{ padding: mob ? 20 : 32 }}>
                <h3 style={{ fontSize: mob ? 20 : 24, fontWeight: 700, color: V.g900, margin: "0 0 4px", fontFamily: F }}>Jaime Oliver</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 500, color: V.primary, margin: "0 0 16px", fontFamily: F }}>{t(T.team.founderRole, L)}</p>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.75, color: V.g600, margin: 0, fontFamily: F }}>{t(T.team.founderBio, L)}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {T.team.members.map((m, i) => (
                <div key={i} onMouseEnter={() => !mob && sHT(i)} onMouseLeave={() => !mob && sHT(null)} style={{ background: V.white, borderRadius: 12, padding: mob ? 20 : 32, display: "grid", gridTemplateColumns: mob ? "56px 1fr" : "64px 1fr", gap: mob ? 16 : 20, alignItems: "center", transition: "all 0.2s", boxShadow: hT === i ? "0 12px 30px rgba(255,107,0,0.08)" : "none", transform: hT === i ? "translateY(-2px)" : "none" }}>
                  <div style={{ width: mob ? 56 : 64, height: mob ? 56 : 64, borderRadius: "50%", background: V.g200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: mob ? 18 : 24, fontWeight: 700, color: V.g600, fontFamily: F }}>{m.ini}</div>
                  <div>
                    <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: V.g900, margin: "0 0 2px", fontFamily: F }}>{t(m.name, L)}</h3>
                    <p style={{ fontSize: mob ? 12 : 13, fontWeight: 400, color: V.g400, margin: 0, fontFamily: F }}>{t(m.role, L)}</p>
                  </div>
                  <p style={{ fontSize: mob ? 12 : 13, fontWeight: 300, lineHeight: 1.6, color: V.g600, margin: 0, gridColumn: "1 / -1", fontFamily: F }}>{t(m.desc, L)}</p>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </section>

      {/* Testimonials */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ marginBottom: mob ? 40 : 64, maxWidth: 520 }}>
            <Lbl mob={mob}>{t(T.testimonials.label, L)}</Lbl>
            <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.testimonials.title, L) }} />
            <Hr />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 20 : 32 }}>
            {T.testimonials.items.map((item, i) => (
              <div key={i} style={{ background: V.g100, borderRadius: 12, padding: mob ? 24 : 36, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: mob ? "auto" : 320 }}>
                <div>
                  <div style={{ fontSize: 36, color: V.primary, lineHeight: 1, marginBottom: 16, fontFamily: F }}>"</div>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: 0, fontFamily: F, fontStyle: "italic" }}>{t(item.quote, L)}</p>
                </div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${V.g200}` }}>
                  <p style={{ fontSize: mob ? 14 : 15, fontWeight: 600, color: V.g900, margin: "0 0 2px", fontFamily: F }}>{item.name}</p>
                  <p style={{ fontSize: mob ? 12 : 13, fontWeight: 400, color: V.g400, margin: 0, fontFamily: F }}>{t(item.role, L)}</p>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Lead Magnet */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g900 }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 40 : 80, alignItems: mob ? "stretch" : "center" }}>
            <div>
              <Lbl mob={mob}>{t(T.leadMagnet.label, L)}</Lbl>
              <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.white, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.leadMagnet.title, L) }} />
              <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", fontFamily: F }}>{t(T.leadMagnet.desc, L)}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {t(T.leadMagnet.bullets, L).map((b, j) => (
                  <li key={j} style={{ fontSize: mob ? 13 : 14, fontWeight: 400, color: "rgba(255,255,255,0.8)", padding: "8px 0", display: "flex", alignItems: "center", gap: 10, fontFamily: F }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: V.primary, color: V.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, fontWeight: 600 }}>✓</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: mob ? 28 : 48, border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontSize: mob ? 20 : 24, fontWeight: 700, color: V.white, margin: "0 0 8px", fontFamily: F }}>{t(T.leadMagnet.title, L).replace(/<br\/>/g, " ")}</h3>
              <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: "rgba(255,255,255,0.5)", margin: "0 0 32px", fontFamily: F }}>{t(T.leadMagnet.note, L)}</p>
              <input type="email" placeholder={t(T.leadMagnet.emailPh, L)} style={{ width: "100%", padding: mob ? "14px 16px" : "16px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: V.white, fontSize: 14, fontFamily: F, marginBottom: 16, outline: "none", boxSizing: "border-box" }} />
              <Btn variant="primary" style={{ width: "100%", justifyContent: "center" }} mob={mob}>{t(T.leadMagnet.btn, L)}</Btn>
            </div>
          </div>
        </Box>
      </section>

      {/* FAQ — SEO + LLM Search Optimization */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }} itemScope itemType="https://schema.org/FAQPage">
        <Box mob={mob}>
          <Lbl mob={mob}>{t(T.faq.label, L)}</Lbl>
          <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 48px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.faq.title, L) }} />
          <div style={{ maxWidth: 800 }}>
            {T.faq.items.map((item, i) => (
              <details key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ borderBottom: `1px solid ${V.g200}`, padding: mob ? "20px 0" : "28px 0" }}>
                <summary itemProp="name" style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: V.g900, cursor: "pointer", fontFamily: F, listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {t(item.q, L)}
                  <span style={{ fontSize: 20, color: V.primary, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" style={{ fontSize: mob ? 14 : 15, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: "16px 0 0", fontFamily: F }}>{t(item.a, L)}</p>
                </div>
              </details>
            ))}
          </div>
        </Box>
      </section>

      {/* CTA */}
      <section style={{ padding: mob ? "80px 0" : "120px 0", backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 60, alignItems: "center" }}>
          <h2 style={{ fontSize: mob ? 32 : 56, fontWeight: 800, color: V.white, lineHeight: 1.1, letterSpacing: -1.5, margin: 0, fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(T.cta.title, L) }} />
          <div>
            <p style={{ fontSize: mob ? 15 : 18, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 0 24px", fontFamily: F }}>{t(T.cta.desc, L)}</p>
            <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(T.cta.btn, L)}</Btn>
          </div>
        </div></Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   SERVICES PAGE
   ═══════════════════════════════════════════════════════════ */

function ServicesPage({ go, lang }) {
  const [tab, setTab] = useState(0);
  const S = T.servicesPage;
  const p = S.pillars[tab];
  const inds = lang === "en" ? ["Healthcare", "Financial Services", "E-Commerce", "Logistics", "SaaS", "Manufacturing"] : ["Salud", "Servicios Financieros", "E-Commerce", "Logística", "SaaS", "Manufactura"];
  const { mob, tab: tabSize } = useMedia();

  const featureLinks = [
    { 0: "svc-ai-consulting", 1: "svc-ai-consulting", 2: "svc-chatbot-dev", 3: "svc-voice", 4: "svc-web-mobile", 5: "svc-web-mobile" },
    { 0: "product-ai-crm", 1: "product-ai-chatbot", 2: "product-dealer-manager" },
    { 0: "svc-paid-ads", 1: "svc-seo", 3: "svc-email-cro", 4: "svc-email-cro", 5: "svc-analytics" },
  ];

  const serviceCards = [
    [
      { key: "svc-ai-consulting", icon: "◇", label: { en: "AI Consulting & Agents", es: "Consultoría IA y Agentes" } },
      { key: "svc-chatbot-dev", icon: "💬", label: { en: "AI Chatbot Development", es: "Desarrollo de Chatbots IA" } },
      { key: "svc-voice", icon: "🎙", label: { en: "AI Voice Integration", es: "Integración de Voz IA" } },
      { key: "svc-web-mobile", icon: "📱", label: { en: "Custom Web & Mobile Apps", es: "Apps Web y Móviles" } },
    ],
    [
      { key: "product-ai-crm", icon: "⬡", label: { en: "Avertris AI CRM", es: "Avertris AI CRM" } },
      { key: "product-ai-chatbot", icon: "🤖", label: { en: "AI Chatbot SaaS", es: "Chatbot SaaS con IA" } },
      { key: "product-dealer-manager", icon: "🚗", label: { en: "Dealer Manager", es: "Dealer Manager" } },
      { key: "product-cash-leak-assessment", icon: "💰", label: { en: "Cash Leak Assessment", es: "Evaluación de Fugas de Efectivo" } },
    ],
    [
      { key: "svc-paid-ads", icon: "📊", label: { en: "Paid Ads & Performance", es: "Ads Pagados y Performance" } },
      { key: "svc-seo", icon: "🔍", label: { en: "SEO & Content Strategy", es: "SEO y Estrategia de Contenido" } },
      { key: "svc-analytics", icon: "📈", label: { en: "Analytics & Attribution", es: "Analítica y Atribución" } },
      { key: "svc-email-cro", icon: "✉️", label: { en: "Email Marketing & CRO", es: "Email Marketing y CRO" } },
    ],
  ];

  return (
    <>
      <PageHero label={t(S.label, lang)} title={t(S.title, lang)} subtitle={t(S.subtitle, lang)} mob={mob} />
      <section style={{ background: V.white, borderBottom: `1px solid ${V.g200}`, overflowX: mob ? "auto" : "visible" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "flex", overflowX: mob ? "auto" : "visible", whiteSpace: mob ? "nowrap" : "normal" }}>
          {S.pillars.map((pill, i) => (
            <button key={i} onClick={() => setTab(i)} style={{ flex: mob ? "0 0 auto" : 1, padding: mob ? "16px 20px" : "20px 24px", background: "none", border: "none", borderBottom: tab === i ? `3px solid ${V.primary}` : "3px solid transparent", cursor: "pointer", fontFamily: F, fontSize: mob ? 13 : 15, fontWeight: tab === i ? 600 : 400, color: tab === i ? V.primary : V.g600, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minWidth: mob ? "auto" : "auto" }}>
              <span style={{ fontSize: 18 }}>{pill.icon}</span> {mob ? "" : t(pill.tab, lang)} {mob && t(pill.tab, lang)}
            </button>
          ))}
        </div></Box>
      </section>
      <section style={{ padding: mob ? "48px 0" : "80px 0" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 80, alignItems: mob ? "stretch" : "start" }}>
          <div>
            <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 16px", fontFamily: F }}>{t(p.title, lang)}</h2>
            <p style={{ fontSize: mob ? 15 : 18, fontWeight: 400, color: V.primary, margin: "0 0 24px", lineHeight: 1.5, fontFamily: F }}>{t(p.subtitle, lang)}</p>
            <Hr />
            <p style={{ fontSize: mob ? 14 : 15, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: "24px 0 32px", fontFamily: F }}>{t(p.desc, lang)}</p>
            <p style={{ fontSize: mob ? 11 : 12, fontWeight: 600, color: V.g400, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 8px", fontFamily: F }}>{t(S.techStack, lang)}</p>
            <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, margin: "0 0 32px", lineHeight: 1.6, fontFamily: F }}>{p.tech}</p>
            <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(S.discuss, lang)}</Btn>
          </div>
          <div style={{ background: V.g100, borderRadius: 16, padding: mob ? 24 : 40 }}>
            <h3 style={{ fontSize: mob ? 14 : 16, fontWeight: 700, color: V.g900, margin: "0 0 24px", fontFamily: F }}>{t(S.included, lang)}</h3>
            {t(p.features, lang).map((f, j) => {
              const link = featureLinks[tab][j];
              return (
                <div key={j} onClick={link ? () => go(link) : undefined} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: j < t(p.features, lang).length - 1 ? `1px solid ${V.g200}` : "none", cursor: link ? "pointer" : "default", transition: "all 0.15s" }}
                  onMouseEnter={link ? e => { e.currentTarget.style.background = V.p200; e.currentTarget.style.paddingLeft = "12px"; e.currentTarget.style.borderRadius = "8px"; } : undefined}
                  onMouseLeave={link ? e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "0"; } : undefined}
                >
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: V.p200, color: V.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, fontWeight: 600 }}>✓</div>
                  <span style={{ fontSize: mob ? 13 : 15, color: V.g900, fontFamily: F, flex: 1 }}>{f}</span>
                  {link && <span style={{ fontSize: 14, color: V.primary, flexShrink: 0 }}>→</span>}
                </div>
              );
            })}
          </div>
        </div></Box>
      </section>
      <section style={{ padding: mob ? "48px 0" : "80px 0", background: V.white }}>
        <Box mob={mob}>
          <Lbl mob={mob}>{lang === "en" ? "Explore" : "Explorar"}</Lbl>
          <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 700, lineHeight: 1.15, color: V.g900, margin: "0 0 32px", fontFamily: F }}>{lang === "en" ? "Dedicated service pages" : "Páginas de servicios dedicadas"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {serviceCards[tab].map((card, i) => (
              <div key={i} onClick={() => go(card.key)} style={{ background: V.g100, borderRadius: 12, padding: mob ? "20px" : "28px 24px", cursor: "pointer", border: `1px solid ${V.g200}`, transition: "all 0.2s", display: "flex", flexDirection: "column", gap: 12 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = V.primary; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = V.g200; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ fontSize: 24 }}>{card.icon}</span>
                <span style={{ fontSize: mob ? 14 : 15, fontWeight: 600, color: V.g900, fontFamily: F }}>{t(card.label, lang)}</span>
                <span style={{ fontSize: 13, color: V.primary, fontWeight: 500, fontFamily: F }}>{lang === "en" ? "Learn more →" : "Ver más →"}</span>
              </div>
            ))}
          </div>
        </Box>
      </section>
      <section style={{ padding: mob ? "48px 0" : "80px 0", background: V.g100 }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "flex" : "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "flex-end", justifyContent: "space-between", marginBottom: mob ? 32 : 48, gap: 40 }}>
            <div><Lbl mob={mob}>{t(S.indLabel, lang)}</Lbl><h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 700, lineHeight: 1.15, color: V.g900, margin: 0, fontFamily: F }}>{t(S.indTitle, lang)}</h2></div>
            <span style={{ fontSize: mob ? 12 : 14, fontWeight: 400, color: V.g600, fontFamily: F }}>{t(S.indCta, lang)} <button onClick={() => go("contact")} style={{ background: "none", border: "none", color: V.primary, fontWeight: 600, cursor: "pointer", fontFamily: F, fontSize: mob ? 12 : 14 }}>{t(T.nav.cta, lang)}</button></span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(6, 1fr)", gap: 16 }}>
            {inds.map((ind, i) => (
              <div key={i} style={{ background: V.white, borderRadius: 8, padding: mob ? "20px 16px" : "28px 20px", textAlign: "center", border: `1px solid ${V.g200}`, transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = V.primary; e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,107,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = V.g200; e.currentTarget.style.boxShadow = "none"; }}
              ><p style={{ fontSize: mob ? 13 : 14, fontWeight: 600, color: V.g900, margin: 0, fontFamily: F }}>{ind}</p></div>
            ))}
          </div>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   CASE STUDIES PAGE
   ═══════════════════════════════════════════════════════════ */

function CasesPage({ go, lang }) {
  const [filter, setFilter] = useState(0);
  const C = T.casesPage;
  const filters = t(C.filters, lang);
  const filterKeys = ["All", "Software", "Marketing", "AI"];
  const fk = filterKeys[filter];
  const cases = C.cases.filter(c => fk === "All" || c.cat.includes(fk));
  const colors = { Software: V.g900, Marketing: V.primary, AI: "#2a2a40" };
  const { mob } = useMedia();

  return (
    <>
      <PageHero label={t(C.label, lang)} title={t(C.title, lang)} subtitle={t(C.subtitle, lang)} mob={mob} />
      <section style={{ padding: mob ? "48px 0 64px" : "64px 0 100px" }}>
        <Box mob={mob}>
          <div style={{ display: "flex", gap: 12, marginBottom: mob ? 32 : 48, flexWrap: "wrap" }}>
            {filters.map((f, i) => (
              <button key={i} onClick={() => setFilter(i)} style={{ background: filter === i ? V.g900 : V.g100, color: filter === i ? V.white : V.g600, border: "none", borderRadius: 20, padding: mob ? "8px 16px" : "10px 24px", cursor: "pointer", fontWeight: 600, fontSize: mob ? 13 : 14, fontFamily: F, transition: "all 0.2s" }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: mob ? 20 : 32 }}>
            {cases.map((cs, i) => (
              <div key={i} style={{ background: V.white, borderRadius: 12, overflow: "hidden", border: `1px solid ${V.g200}`, transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => !mob && (e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)")}
                onMouseLeave={e => !mob && (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ height: mob ? 140 : 200, background: `linear-gradient(135deg, ${colors[cs.cat[0]] || V.g900}, ${(colors[cs.cat[0]] || V.g900)}99)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <div style={{ fontSize: mob ? 36 : 56, fontWeight: 800, color: V.white, fontFamily: F }}>{cs.metric}</div>
                  <div style={{ fontSize: mob ? 13 : 16, color: "rgba(255,255,255,0.85)", fontFamily: F }}>{t(cs.metricLabel, lang)}</div>
                </div>
                <div style={{ padding: mob ? 20 : 32 }}>
                  <span style={{ fontSize: mob ? 11 : 12, fontWeight: 600, color: V.primary, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>{t(cs.tag, lang)}</span>
                  <h3 style={{ fontSize: mob ? 18 : 22, fontWeight: 700, color: V.g900, margin: "8px 0 12px", fontFamily: F }}>{t(cs.title, lang)}</h3>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, lineHeight: 1.7, margin: "0 0 20px", fontFamily: F }}>{t(cs.desc, lang)}</p>
                  <span style={{ fontSize: mob ? 13 : 14, fontWeight: 600, color: V.primary, fontFamily: F }}>{t(C.readMore, lang)}</span>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════ */

function AboutPage({ go, lang }) {
  const A = T.aboutPage;
  const { mob } = useMedia();
  return (
    <>
      <PageHero label={t(A.label, lang)} title={t(A.title, lang)} subtitle={t(A.subtitle, lang)} mob={mob} />
      <section style={{ padding: mob ? "48px 0" : "100px 0" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 80, alignItems: mob ? "stretch" : "start" }}>
          <div><h2 style={{ fontSize: mob ? 24 : 40, fontWeight: 700, lineHeight: 1.15, color: V.g900, margin: "0 0 20px", fontFamily: F }}>{t(A.storyTitle, lang)}</h2><Hr /></div>
          <div>
            <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: "0 0 20px", fontFamily: F }}>{t(A.storyP1, lang)}</p>
            <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: 0, fontFamily: F }}>{t(A.storyP2, lang)}</p>
          </div>
        </div></Box>
      </section>
      <section style={{ padding: mob ? "48px 0" : "100px 0", background: V.g100 }}>
        <Box mob={mob}>
          <div style={{ textAlign: "center", marginBottom: mob ? 40 : 64 }}><Lbl mob={mob}>{t(A.valuesLabel, lang)}</Lbl><h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: 0, fontFamily: F }}>{t(A.valuesTitle, lang)}</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4, 1fr)", gap: mob ? 16 : 24 }}>
            {A.values.map((v, i) => (
              <div key={i} style={{ background: V.white, borderRadius: 12, padding: mob ? 20 : 32, transition: "all 0.2s" }}
                onMouseEnter={e => !mob && (e.currentTarget.style.boxShadow = "0 12px 30px rgba(255,107,0,0.08)", e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => !mob && (e.currentTarget.style.boxShadow = "none", e.currentTarget.style.transform = "none")}
              >
                <div style={{ width: 48, height: 48, borderRadius: 10, background: V.p200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: V.primary, marginBottom: 20 }}>{v.icon}</div>
                <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: V.g900, margin: "0 0 12px", fontFamily: F }}>{t(v.title, lang)}</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.7, color: V.g600, margin: 0, fontFamily: F }}>{t(v.desc, lang)}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>
      <section style={{ padding: mob ? "48px 0" : "100px 0" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 80, alignItems: mob ? "stretch" : "start" }}>
          <div><Lbl mob={mob}>{t(A.presenceLabel, lang)}</Lbl><h2 style={{ fontSize: mob ? 24 : 40, fontWeight: 700, lineHeight: 1.15, color: V.g900, margin: "0 0 20px", fontFamily: F }}>{t(A.presenceTitle, lang)}</h2><Hr /><p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: "24px 0 0", fontFamily: F }}>{t(A.presenceDesc, lang)}</p></div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 24 }}>
            {A.locations.map((loc, i) => (
              <div key={i} style={{ background: V.g100, borderRadius: 12, padding: mob ? 20 : 28 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: V.g300, fontFamily: F }}>{loc.flag}</span>
                <h4 style={{ fontSize: mob ? 15 : 16, fontWeight: 600, color: V.g900, margin: "12px 0 4px", fontFamily: F }}>{t(loc.region, lang)}</h4>
                <p style={{ fontSize: mob ? 12 : 13, fontWeight: 300, color: V.g600, margin: 0, fontFamily: F }}>{t(loc.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div></Box>
      </section>
      <section style={{ padding: mob ? "60px 0" : "80px 0", background: V.g900, textAlign: "center" }}>
        <Box mob={mob}>
          <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 700, color: V.white, margin: "0 0 16px", fontFamily: F }}>{t(A.readyCta, lang)}</h2>
          <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 32px", fontFamily: F }}>{t(A.readyDesc, lang)}</p>
          <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(A.readyBtn, lang)}</Btn>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   BLOG PAGE
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   BLOG POST PAGE — individual article with TL;DR + SEO/GEO
   ═══════════════════════════════════════════════════════════ */

function renderMarkdown(text, mob) {
  if (!text) return null;
  return text.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) return <h2 key={i} style={{ fontSize: mob ? 22 : 28, fontWeight: 700, color: V.g900, margin: "40px 0 16px", lineHeight: 1.25, fontFamily: F }}>{block.slice(3)}</h2>;
    if (block.startsWith("### ")) return <h3 key={i} style={{ fontSize: mob ? 18 : 22, fontWeight: 600, color: V.g900, margin: "32px 0 12px", lineHeight: 1.3, fontFamily: F }}>{block.slice(4)}</h3>;
    if (block.startsWith("- ") || block.startsWith("• ")) {
      const items = block.split("\n").filter(l => l.trim());
      return <ul key={i} style={{ margin: "16px 0", paddingLeft: 24 }}>{items.map((item, j) => <li key={j} style={{ fontSize: mob ? 14 : 16, lineHeight: 1.8, color: V.g600, fontFamily: F, marginBottom: 6 }}>{item.replace(/^[-•]\s*/, "").replace(/\*\*(.+?)\*\*/g, (_, m) => m)}</li>)}</ul>;
    }
    const parts = block.split(/(\*\*.*?\*\*)/g);
    return <p key={i} style={{ fontSize: mob ? 14 : 16, lineHeight: 1.9, color: V.g600, margin: "0 0 20px", fontFamily: F }}>{parts.map((part, j) => part.startsWith("**") && part.endsWith("**") ? <strong key={j} style={{ fontWeight: 600, color: V.g900 }}>{part.slice(2, -2)}</strong> : part)}</p>;
  });
}

function BlogPostPage({ postIndex, go, lang }) {
  const post = T.blogPage.posts[postIndex];
  if (!post) return <div>Post not found</div>;
  const { mob } = useMedia();
  const content = post.content ? t(post.content, lang) : null;
  const catColors = { AI: V.primary, Marketing: V.g900, Software: "#2a2a40", "Dominican Republic": "#0047AB" };
  const relatedPosts = T.blogPage.posts.filter((p, i) => i !== postIndex && p.cat === post.cat).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section style={{ background: V.g900, padding: mob ? "120px 0 48px" : "160px 0 64px" }}>
        <Box mob={mob}>
          <div style={{ maxWidth: 800 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: V.white, background: catColors[post.cat] || V.g900, padding: "4px 12px", borderRadius: 4, fontFamily: F, border: "1px solid rgba(255,255,255,0.15)" }}>{post.cat}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: F }}>{t(post.date, lang)}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: F }}>{t(post.read, lang)}</span>
            </div>
            <h1 style={{ fontSize: mob ? 28 : 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, color: V.white, margin: 0, fontFamily: F }}>{t(post.title, lang)}</h1>
            <p style={{ fontSize: mob ? 15 : 18, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "20px 0 0", lineHeight: 1.7, fontFamily: F }}>{t(post.desc, lang)}</p>
          </div>
        </Box>
      </section>

      {/* Article body */}
      <section style={{ padding: mob ? "40px 0 64px" : "64px 0 100px" }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "block" : "grid", gridTemplateColumns: "1fr 320px", gap: 64 }}>
            {/* Main content */}
            <article itemScope itemType="https://schema.org/BlogPosting" style={{ maxWidth: 740 }}>
              <meta itemProp="headline" content={t(post.title, lang)} />
              <meta itemProp="datePublished" content={post.isoDate || "2026-02-01"} />
              <meta itemProp="author" content="Avertris" />
              {post.keywords && <meta itemProp="keywords" content={post.keywords} />}
              <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                <meta itemProp="name" content="Avertris" />
              </div>
              <div itemProp="articleBody">
                {content ? renderMarkdown(content, mob) : <p style={{ fontSize: 16, lineHeight: 1.8, color: V.g600, fontFamily: F }}>{t(post.desc, lang)}</p>}
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ marginTop: mob ? 48 : 0 }}>
              {/* Author box */}
              <div style={{ background: V.g100, borderRadius: 12, padding: mob ? 20 : 28, marginBottom: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: V.g400, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 12px", fontFamily: F }}>{lang === "en" ? "WRITTEN BY" : "ESCRITO POR"}</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: V.g900, margin: "0 0 4px", fontFamily: F }}>Avertris Team</p>
                <p style={{ fontSize: 13, color: V.g600, margin: 0, lineHeight: 1.5, fontFamily: F }}>{lang === "en" ? "AI, software, and growth marketing insights from our team in Tampa, FL." : "IA, software y marketing de crecimiento desde nuestro equipo en Tampa, FL."}</p>
              </div>

              {/* Keywords / topics */}
              {post.keywords && (
                <div style={{ background: V.g100, borderRadius: 12, padding: mob ? 20 : 28, marginBottom: 24 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: V.g400, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 12px", fontFamily: F }}>{lang === "en" ? "TOPICS" : "TEMAS"}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {post.keywords.split(", ").slice(0, 6).map((kw, i) => (
                      <span key={i} style={{ fontSize: 12, background: V.white, border: `1px solid ${V.g200}`, borderRadius: 4, padding: "4px 10px", color: V.g600, fontFamily: F }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA box */}
              <div style={{ background: V.g900, borderRadius: 12, padding: mob ? 20 : 28 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: V.white, margin: "0 0 8px", fontFamily: F }}>{lang === "en" ? "Stop the bleeding." : "Detiene la hemorragia."}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 20px", lineHeight: 1.5, fontFamily: F }}>{lang === "en" ? "Find out how much money your business is losing — free 10-minute assessment." : "Descubre cuánto dinero pierde tu negocio — evaluación gratis de 10 minutos."}</p>
                <Btn variant="primary" onClick={() => go("product-cash-leak-assessment")} mob={mob}>{lang === "en" ? "Take the assessment" : "Tomar la evaluación"}</Btn>
              </div>
            </aside>
          </div>
        </Box>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section style={{ padding: mob ? "48px 0" : "64px 0", background: V.g100 }}>
          <Box mob={mob}>
            <h2 style={{ fontSize: mob ? 22 : 32, fontWeight: 700, color: V.g900, margin: "0 0 32px", fontFamily: F }}>{lang === "en" ? "Related articles" : "Artículos relacionados"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : `repeat(${Math.min(relatedPosts.length, 3)}, 1fr)`, gap: mob ? 16 : 24 }}>
              {relatedPosts.map((rp, i) => {
                const rpIndex = T.blogPage.posts.indexOf(rp);
                return (
                  <article key={i} onClick={() => rp.slug ? go("blog-" + rp.slug) : undefined} style={{ background: V.white, borderRadius: 12, border: `1px solid ${V.g200}`, overflow: "hidden", cursor: rp.slug ? "pointer" : "default", transition: "all 0.2s" }}
                    onMouseEnter={e => !mob && (e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)")}
                    onMouseLeave={e => !mob && (e.currentTarget.style.boxShadow = "none")}
                  >
                    <div style={{ height: mob ? 80 : 100, background: `linear-gradient(135deg, ${catColors[rp.cat] || V.g900}, ${catColors[rp.cat] || V.g900}88)`, padding: 16, display: "flex", alignItems: "flex-end" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: V.white, background: "rgba(255,255,255,0.2)", padding: "3px 10px", borderRadius: 4, fontFamily: F }}>{rp.cat}</span>
                    </div>
                    <div style={{ padding: mob ? 14 : 20 }}>
                      <h3 style={{ fontSize: mob ? 14 : 15, fontWeight: 600, color: V.g900, margin: "0 0 8px", lineHeight: 1.4, fontFamily: F }}>{t(rp.title, lang)}</h3>
                      <span style={{ fontSize: 12, color: V.primary, fontWeight: 500, fontFamily: F }}>{lang === "en" ? "Read article →" : "Leer artículo →"}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </Box>
        </section>
      )}

      {/* Back to blog */}
      <section style={{ padding: mob ? "40px 0" : "48px 0", textAlign: "center" }}>
        <Box mob={mob}>
          <button onClick={() => go("blog")} style={{ background: "none", border: `1.5px solid ${V.g200}`, borderRadius: 6, padding: "12px 28px", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 600, color: V.g900, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = V.primary; e.currentTarget.style.color = V.primary; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = V.g200; e.currentTarget.style.color = V.g900; }}
          >{lang === "en" ? "← Back to all articles" : "← Volver a todos los artículos"}</button>
        </Box>
      </section>
    </>
  );
}


function BlogPage({ lang, go }) {
  const B = T.blogPage;
  const [filter, setFilter] = useState(0);
  const filters = t(B.filters, lang);
  const catKeys = ["All", "AI", "Marketing", "Software", "Dominican Republic"];
  const fk = catKeys[filter];
  const posts = B.posts.filter(p => fk === "All" || p.cat === fk);
  const catColors = { AI: V.primary, Marketing: V.g900, Software: "#2a2a40", "Dominican Republic": "#0047AB" };
  const { mob } = useMedia();

  return (
    <>
      <PageHero label={t(B.label, lang)} title={t(B.title, lang)} subtitle={t(B.subtitle, lang)} mob={mob} />
      <section style={{ padding: mob ? "48px 0 64px" : "64px 0 100px" }}>
        <Box mob={mob}>
          <div style={{ display: "flex", gap: 12, marginBottom: mob ? 32 : 48, flexWrap: "wrap" }}>
            {filters.map((f, i) => (
              <button key={i} onClick={() => setFilter(i)} style={{ background: filter === i ? V.g900 : V.g100, color: filter === i ? V.white : V.g600, border: "none", borderRadius: 20, padding: mob ? "8px 16px" : "10px 24px", cursor: "pointer", fontWeight: 600, fontSize: mob ? 13 : 14, fontFamily: F, transition: "all 0.2s" }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 20 : 32 }}>
            {posts.map((post, i) => (
              <article key={i} onClick={() => post.slug ? go("blog-" + post.slug) : undefined} style={{ background: V.white, borderRadius: 12, border: `1px solid ${V.g200}`, overflow: "hidden", transition: "all 0.2s", cursor: post.slug ? "pointer" : "default" }}
                onMouseEnter={e => !mob && (e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)")}
                onMouseLeave={e => !mob && (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ height: mob ? 120 : 160, background: `linear-gradient(135deg, ${catColors[post.cat] || V.g900}, ${catColors[post.cat] || V.g900}88)`, padding: 24, display: "flex", alignItems: "flex-end" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: V.white, background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: 4, fontFamily: F }}>{post.cat}</span>
                </div>
                <div style={{ padding: mob ? 16 : 28 }}>
                  <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: V.g900, margin: "0 0 12px", lineHeight: 1.4, fontFamily: F }}>{t(post.title, lang)}</h3>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, lineHeight: 1.7, margin: "0 0 20px", fontFamily: F }}>{t(post.desc, lang)}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: mob ? 11 : 12, color: V.g400, fontFamily: F }}>{t(post.date, lang)}</span>
                    {post.slug ? <span style={{ fontSize: mob ? 12 : 13, color: V.primary, fontWeight: 500, fontFamily: F }}>{lang === "en" ? "Read article →" : "Leer artículo →"}</span> : <span style={{ fontSize: mob ? 11 : 12, color: V.g400, fontFamily: F }}>{t(post.read, lang)}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════ */

function ContactPage({ lang }) {
  const C = T.contactPage;
  const { mob } = useMedia();
  const inputStyle = { width: "100%", padding: "14px 16px", border: `1px solid ${V.g200}`, borderRadius: 8, fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };

  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "", company: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [tried, setTried] = useState(false);
  const upd = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const missing = (k) => tried && !form[k].trim();
  const errBorder = (k) => missing(k) ? `1px solid #dc2626` : `1px solid ${V.g200}`;

  const calendarUrl = lang === "es"
    ? "https://api.leadconnectorhq.com/widget/booking/eG5E8UGMopsaePPVEh0z"
    : "https://api.leadconnectorhq.com/widget/booking/fYKM0aPR3zV1rUrrPImG";

  const allFields = ["name", "email", "phone", "website", "company", "service", "budget", "message"];
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setTried(true);
    if (allFields.some(k => !form[k].trim())) return;
    setStatus("sending");
    try {
      await fetch("https://services.leadconnectorhq.com/hooks/6sH0vMFyMEooGtwfucvQ/webhook-trigger/4d3c4b8a-2de0-4d7b-896e-b558f1cee83d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          website: form.website,
          company: form.company,
          service: form.service,
          budget: form.budget,
          message: form.message,
          source: "avertris.com/contact",
          language: lang,
        }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const errorMsg = { en: "Something went wrong. Please try again or email hello@avertris.com", es: "Algo salió mal. Intenta de nuevo o escríbenos a hello@avertris.com" };
  const sendingLabel = { en: "Sending...", es: "Enviando..." };

  return (
    <>
      <PageHero label={t(C.label, lang)} title={t(C.title, lang)} subtitle={t(C.subtitle, lang)} mob={mob} />
      <section style={{ padding: mob ? "48px 0 64px" : "80px 0 100px" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 80, alignItems: mob ? "stretch" : "start" }}>
          <div>
            <h2 style={{ fontSize: mob ? 24 : 32, fontWeight: 700, color: V.g900, margin: "0 0 8px", fontFamily: F }}>{t(C.formTitle, lang)}</h2>
            <p style={{ fontSize: mob ? 14 : 15, fontWeight: 300, color: V.g600, margin: "0 0 32px", fontFamily: F }}>{t(C.formDesc, lang)}</p>
            {status === "sent" ? (
              <div>
                <div style={{ padding: 24, background: "#f0fdf4", borderRadius: 12, textAlign: "center", marginBottom: 24 }}>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#166534", margin: 0, fontFamily: F }}>✓ {t({ en: "Info received! Now pick a time.", es: "¡Info recibida! Ahora elige un horario." }, lang)}</p>
                </div>
                <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${V.g200}` }}>
                  <iframe src={calendarUrl} style={{ width: "100%", height: mob ? 600 : 700, border: "none", display: "block" }} title="Book a call" />
                </div>
              </div>
            ) : (
            <form onSubmit={handleSubmit}>
            {tried && allFields.some(k => !form[k].trim()) && <p style={{ fontSize: 13, color: "#dc2626", margin: "0 0 12px", fontFamily: F }}>{t({ en: "Please fill in all fields before booking.", es: "Por favor completa todos los campos antes de agendar." }, lang)}</p>}
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: missing("name") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.name, lang)} *</label><input name="name" value={form.name} onChange={e => upd("name", e.target.value)} style={{ ...inputStyle, border: errBorder("name") }} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => { if (!form.name.trim() && tried) e.target.style.borderColor = "#dc2626"; else e.target.style.borderColor = V.g200; }} /></div>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: missing("email") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.email, lang)} *</label><input name="email" value={form.email} onChange={e => upd("email", e.target.value)} type="email" style={{ ...inputStyle, border: errBorder("email") }} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => { if (!form.email.trim() && tried) e.target.style.borderColor = "#dc2626"; else e.target.style.borderColor = V.g200; }} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: missing("phone") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.phone, lang)} *</label><input name="phone" value={form.phone} onChange={e => upd("phone", e.target.value)} type="tel" style={{ ...inputStyle, border: errBorder("phone") }} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => { if (!form.phone.trim() && tried) e.target.style.borderColor = "#dc2626"; else e.target.style.borderColor = V.g200; }} /></div>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: missing("company") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.company, lang)} *</label><input name="company" value={form.company} onChange={e => upd("company", e.target.value)} style={{ ...inputStyle, border: errBorder("company") }} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => { if (!form.company.trim() && tried) e.target.style.borderColor = "#dc2626"; else e.target.style.borderColor = V.g200; }} /></div>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: missing("website") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>Website URL *</label><input name="website" value={form.website} onChange={e => upd("website", e.target.value)} placeholder="https://" style={{ ...inputStyle, border: errBorder("website") }} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => { if (!form.website.trim() && tried) e.target.style.borderColor = "#dc2626"; else e.target.style.borderColor = V.g200; }} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: missing("service") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.service, lang)} *</label>
                <select name="service" value={form.service} onChange={e => upd("service", e.target.value)} style={{ ...inputStyle, background: V.white, color: form.service ? V.g600 : V.g400, border: errBorder("service") }}><option value="">{t({ en: "Select a service...", es: "Selecciona un servicio..." }, lang)}</option>{t(C.svcOptions, lang).map(o => <option key={o}>{o}</option>)}</select>
              </div>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: missing("budget") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.budget, lang)} *</label><select name="budget" value={form.budget} onChange={e => upd("budget", e.target.value)} style={{ ...inputStyle, background: V.white, color: form.budget ? V.g600 : V.g400, border: errBorder("budget") }}><option value="">{t({ en: "Select budget...", es: "Selecciona presupuesto..." }, lang)}</option>{C.budgetOptions.map(o => <option key={o}>{o}</option>)}</select></div>
            </div>
            <div style={{ marginBottom: 24 }}><label style={{ fontSize: 13, fontWeight: 500, color: missing("message") ? "#dc2626" : V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.message, lang)} *</label><textarea name="message" value={form.message} onChange={e => upd("message", e.target.value)} placeholder={t(C.messagePh, lang)} style={{ ...inputStyle, height: 120, resize: "vertical", border: errBorder("message") }} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => { if (!form.message.trim() && tried) e.target.style.borderColor = "#dc2626"; else e.target.style.borderColor = V.g200; }} /></div>
            {status === "error" && <p style={{ fontSize: 13, color: "#dc2626", margin: "0 0 12px", fontFamily: F }}>{t(errorMsg, lang)}</p>}
            <button type="submit" disabled={status === "sending"} style={{ width: "100%", padding: 16, background: status === "sending" ? V.g400 : V.primary, color: "#1a1a1a", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: status === "sending" ? "wait" : "pointer", fontFamily: F }}>{status === "sending" ? t(sendingLabel, lang) : t(C.submit, lang)}</button>
            </form>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: V.g100, borderRadius: 16, padding: mob ? 24 : 40 }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 24px", fontFamily: F }}>{t(C.otherTitle, lang)}</h3>
              <p style={{ fontSize: mob ? 11 : 12, fontWeight: 600, color: V.g400, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px", fontFamily: F }}>{t(C.emailLabel, lang)}</p>
              <p style={{ fontSize: mob ? 14 : 15, fontWeight: 500, color: V.g900, margin: "0 0 20px", fontFamily: F }}>hello@avertris.com</p>
              <p style={{ fontSize: mob ? 11 : 12, fontWeight: 600, color: V.g400, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px", fontFamily: F }}>{t(C.responseLabel, lang)}</p>
              <p style={{ fontSize: mob ? 14 : 15, fontWeight: 500, color: V.g900, margin: 0, fontFamily: F }}>{t(C.responseValue, lang)}</p>
            </div>
            <div style={{ background: V.g100, borderRadius: 16, padding: mob ? 24 : 40 }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 24px", fontFamily: F }}>{t(C.presenceTitle, lang)}</h3>
              {[{ flag: "US", region: { en: "United States", es: "Estados Unidos" }, desc: { en: "HQ: Tampa, FL + remote team", es: "Sede: Tampa, FL + equipo remoto" } }, { flag: "DO", region: { en: "Dominican Republic", es: "República Dominicana" }, desc: { en: "Team & LATAM operations", es: "Equipo y operaciones LATAM" } }, { flag: "LA", region: { en: "Latin America", es: "América Latina" }, desc: { en: "Mexico, Colombia, Argentina", es: "México, Colombia, Argentina" } }].map((loc, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: i < 2 ? 20 : 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: V.g900, color: V.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: F }}>{loc.flag}</div>
                  <div><h4 style={{ fontSize: mob ? 14 : 15, fontWeight: 600, color: V.g900, margin: 0, fontFamily: F }}>{t(loc.region, lang)}</h4><p style={{ fontSize: mob ? 12 : 13, fontWeight: 300, color: V.g600, margin: 0, fontFamily: F }}>{t(loc.desc, lang)}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div></Box>
      </section>

      {/* Calendar popup modal */}
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   PRODUCTS HUB PAGE
   ═══════════════════════════════════════════════════════════ */

function ProductsPage({ go, lang }) {
  const P = T.productsPage;
  const { mob } = useMedia();

  return (
    <>
      <PageHero label={t(P.label, lang)} title={t(P.title, lang)} subtitle={t(P.subtitle, lang)} mob={mob} />
      <section style={{ padding: mob ? "48px 0 64px" : "80px 0 100px" }}>
        <Box mob={mob}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: mob ? 20 : 32 }}>
            {P.products.map((prod, i) => (
              <div key={i} onClick={() => go(`product-${prod.slug}`)} style={{
                background: prod.featured ? V.g900 : V.white,
                borderRadius: 12, overflow: "hidden", border: prod.featured ? "none" : `1px solid ${V.g200}`,
                cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column",
                ...(prod.featured ? { gridColumn: mob ? "auto" : "1 / -1" } : {}),
              }}
                onMouseEnter={e => !mob && (e.currentTarget.style.boxShadow = `0 12px 30px ${prod.featured ? "rgba(255,107,0,0.2)" : "rgba(0,0,0,0.08)"}`)}
                onMouseLeave={e => !mob && (e.currentTarget.style.boxShadow = "none")}
              >
                {prod.featured && (
                  <div style={{ background: V.primary, padding: "8px 24px", textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: V.white, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: F }}>
                      {lang === "en" ? "MOST POPULAR — FREE" : "MÁS POPULAR — GRATIS"}
                    </span>
                  </div>
                )}
                <div style={{ padding: mob ? 24 : 40, flex: 1, display: "flex", flexDirection: prod.featured && !mob ? "row" : "column", gap: prod.featured && !mob ? 40 : 0, alignItems: prod.featured && !mob ? "center" : "stretch" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <span style={{ fontSize: 28, color: prod.featured ? V.primary : V.primary }}>{prod.icon}</span>
                      <h3 style={{ fontSize: mob ? 20 : 24, fontWeight: 700, color: prod.featured ? V.white : V.g900, margin: 0, fontFamily: F }}>{t(prod.name, lang)}</h3>
                    </div>
                    <p style={{ fontSize: mob ? 15 : 17, fontWeight: 600, color: V.primary, margin: "0 0 12px", lineHeight: 1.4, fontFamily: F }}>{t(prod.tagline, lang)}</p>
                    <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: prod.featured ? "rgba(255,255,255,0.7)" : V.g600, lineHeight: 1.7, margin: "0 0 20px", fontFamily: F }}>{t(prod.desc, lang)}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: prod.featured ? "rgba(255,255,255,0.5)" : V.g400, fontFamily: F }}>{t(prod.stat, lang)}</span>
                      <p style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: prod.featured ? V.white : V.g900, margin: "4px 0 0", fontFamily: F }}>{t(prod.price, lang)}</p>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 600, color: prod.featured ? V.primary : V.primary, fontFamily: F }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   SERVICE / PRODUCT DETAIL PAGE (Reusable)
   ═══════════════════════════════════════════════════════════ */

function ServiceDetailPage({ pageKey, go, lang }) {
  const D = T.detailPages[pageKey];
  if (!D) return <div style={{ padding: "200px 40px", textAlign: "center", fontFamily: F }}><h2>Page not found</h2></div>;
  const { mob, tab } = useMedia();

  return (
    <>
      {/* Hero */}
      <section style={{ background: V.g900, padding: mob ? "120px 0 60px" : "160px 0 80px" }}>
        <Box mob={mob}>
          <Lbl mob={mob}>{t(D.label, lang)}</Lbl>
          <h1 style={{ fontSize: mob ? 32 : 56, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color: V.white, margin: 0, fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(D.title, lang) }} />
          <p style={{ fontSize: mob ? 15 : 18, fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: "20px 0 32px", maxWidth: 640, lineHeight: 1.7, fontFamily: F }}>{t(D.subtitle, lang)}</p>
          <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(D.cta, lang)}</Btn>
        </Box>
      </section>

      {/* Problem */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 80, alignItems: "start" }}>
            <div>
              <Lbl mob={mob}>{lang === "en" ? "The problem" : "El problema"}</Lbl>
              <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }}>{lang === "en" ? "Why this matters" : "Por qué esto importa"}</h2>
              <Hr />
              <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: "24px 0 32px", fontFamily: F }}>{t(D.problem, lang)}</p>
              <p style={{ fontSize: mob ? 12 : 13, fontWeight: 600, color: V.g400, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 8px", fontFamily: F }}>{lang === "en" ? "TECH STACK" : "TECNOLOGÍAS"}</p>
              <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, margin: "0 0 24px", lineHeight: 1.6, fontFamily: F }}>{D.tech}</p>
              <p style={{ fontSize: mob ? 14 : 16, fontWeight: 600, color: V.primary, margin: 0, fontFamily: F }}>{t(D.price, lang)}</p>
            </div>
            <div style={{ background: V.g100, borderRadius: 16, padding: mob ? 24 : 40 }}>
              <h3 style={{ fontSize: mob ? 14 : 16, fontWeight: 700, color: V.g900, margin: "0 0 24px", fontFamily: F }}>{lang === "en" ? "What's included" : "Qué incluye"}</h3>
              {t(D.features, lang).map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: j < t(D.features, lang).length - 1 ? `1px solid ${V.g200}` : "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: V.p200, color: V.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, fontWeight: 600 }}>✓</div>
                  <span style={{ fontSize: mob ? 13 : 15, color: V.g900, fontFamily: F }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </section>

      {/* Results */}
      <section style={{ padding: mob ? "48px 0" : "80px 0", background: V.g100 }}>
        <Box mob={mob}>
          <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 700, color: V.g900, margin: "0 0 40px", textAlign: "center", fontFamily: F }}>{lang === "en" ? "Results our clients see" : "Resultados que ven nuestros clientes"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : `repeat(${D.results.length}, 1fr)`, gap: mob ? 20 : 32, textAlign: "center" }}>
            {D.results.map((stat, i) => (
              <div key={i} style={{ background: V.white, borderRadius: 12, padding: mob ? 24 : 40, border: `1px solid ${V.g200}` }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: mob ? 40 : 56, fontWeight: 800, color: V.primary, fontFamily: F, lineHeight: 1 }}>{stat.n}</span>
                  <span style={{ fontSize: mob ? 20 : 28, fontWeight: 600, color: V.primary, fontFamily: F }}>{stat.s}</span>
                </div>
                <p style={{ fontSize: mob ? 13 : 15, fontWeight: 400, color: V.g600, margin: "8px 0 0", fontFamily: F }}>{t(stat.l, lang)}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* CTA */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g900 }}>
        <Box mob={mob} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: mob ? 32 : 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, color: V.white, margin: "0 0 20px", fontFamily: F }}>{lang === "en" ? "Ready to stop losing money?" : "¿Listo para dejar de perder dinero?"}</h2>
          <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 32px", maxWidth: 500, lineHeight: 1.7, fontFamily: F }}>{lang === "en" ? "Book a free 30-minute call. We'll diagnose your biggest leaks and show you the fastest path to results." : "Agenda una llamada gratuita de 30 minutos. Diagnosticaremos tus mayores fugas y te mostraremos el camino más rápido a resultados."}</p>
          <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(D.cta, lang)}</Btn>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   NEXUS — AD LANDING PAGE
   ═══════════════════════════════════════════════════════════ */

function OmnichannelPage({ go, lang }) {
  const { mob } = useMedia();
  const en = lang === "en";

  const painPoints = en ? [
    { icon: "📱", title: "Your sales team texts clients from personal phones", desc: "When a rep leaves, every client conversation walks out the door with them. No history. No handoff. No way to recover." },
    { icon: "🔀", title: "Same client, six different threads", desc: "They emailed Monday. DM'd on Instagram Tuesday. WhatsApp'd Wednesday. Your team has zero context — and the client notices." },
    { icon: "👻", title: "You can't see what your team is saying", desc: "Are they following up? What did they promise? Are they quoting the right price? You have no way to know — until a client complains." },
    { icon: "📊", title: "You're managing sales with zero data", desc: "Who's your top closer? What's your average response time? Which channel converts best? Right now, you're guessing." },
  ] : [
    { icon: "📱", title: "Tu equipo de ventas escribe a clientes desde sus teléfonos personales", desc: "Cuando un vendedor se va, cada conversación con clientes se va con él. Sin historial. Sin traspaso. Sin forma de recuperarlo." },
    { icon: "🔀", title: "Mismo cliente, seis conversaciones distintas", desc: "Envió email el lunes. DM en Instagram el martes. WhatsApp el miércoles. Tu equipo no tiene contexto — y el cliente lo nota." },
    { icon: "👻", title: "No puedes ver qué dice tu equipo", desc: "¿Están dando seguimiento? ¿Qué prometieron? ¿Están cotizando bien? No tienes forma de saberlo — hasta que un cliente se queja." },
    { icon: "📊", title: "Gestionas ventas sin datos", desc: "¿Quién es tu mejor cerrador? ¿Cuál es tu tiempo promedio de respuesta? ¿Qué canal convierte mejor? Ahora mismo, estás adivinando." },
  ];

  const channels = ["WhatsApp", "Facebook Messenger", "Instagram DM", "TikTok", "LinkedIn DM", "Email", "SMS", en ? "Live Chat Widget" : "Chat en Vivo"];

  const features = en ? [
    { title: "One inbox for every channel", desc: "WhatsApp, Instagram, Facebook, TikTok, LinkedIn, email, SMS, and live chat — all in one screen. Every message, every channel, one view.", icon: "◇" },
    { title: "Full conversation audit trail", desc: "See every message your team sends and receives. Review sales conversations, ensure quality, and know exactly what was promised to every client.", icon: "◎" },
    { title: "Team performance dashboards", desc: "Response times, conversation volume, close rates, rep leaderboards — the data you need to manage a sales team, not guess at one.", icon: "↗" },
    { title: "AI employee that works 24/7", desc: "Train an AI assistant on your business. It responds to clients, qualifies leads, books appointments, and follows up — automatically, across every channel.", icon: "◉" },
    { title: "CRM you can talk to", desc: "Ask your CRM questions in plain language: \"What's our conversion rate this month?\" \"Show me John's pipeline.\" \"Which rep has the slowest response time?\" It answers instantly.", icon: "◈" },
    { title: "Automations that replace busywork", desc: "Auto-assign conversations, trigger follow-up sequences, route leads by channel or language, send reminders — without your team lifting a finger.", icon: "</>", },
  ] : [
    { title: "Una bandeja para todos los canales", desc: "WhatsApp, Instagram, Facebook, TikTok, LinkedIn, email, SMS y chat en vivo — todo en una pantalla. Cada mensaje, cada canal, una sola vista.", icon: "◇" },
    { title: "Auditoría completa de conversaciones", desc: "Ve cada mensaje que tu equipo envía y recibe. Revisa comunicaciones de venta, asegura calidad y sabe exactamente qué se prometió a cada cliente.", icon: "◎" },
    { title: "Dashboards de rendimiento del equipo", desc: "Tiempos de respuesta, volumen de conversaciones, tasas de cierre, rankings de vendedores — los datos que necesitas para gestionar un equipo de ventas, no adivinarlo.", icon: "↗" },
    { title: "Empleado IA que trabaja 24/7", desc: "Entrena un asistente IA con tu negocio. Responde clientes, califica leads, agenda citas y da seguimiento — automáticamente, en todos los canales.", icon: "◉" },
    { title: "CRM con el que puedes hablar", desc: "Hazle preguntas a tu CRM en lenguaje natural: \"¿Cuál es nuestra tasa de conversión?\" \"Muéstrame el pipeline de Juan.\" \"¿Qué vendedor responde más lento?\" Responde al instante.", icon: "◈" },
    { title: "Automatizaciones que eliminan tareas repetitivas", desc: "Auto-asigna conversaciones, dispara secuencias de seguimiento, rutea leads por canal o idioma, envía recordatorios — sin que tu equipo mueva un dedo.", icon: "</>" },
  ];

  const plans = en ? [
    {
      name: "Starter",
      price: "$99",
      period: "/mo",
      audience: "Solo operators & startups",
      users: "Up to 5 users",
      highlight: false,
      features: ["Unified inbox (all 8 channels)", "WhatsApp Business integration", "Facebook, Instagram & TikTok DM", "LinkedIn DM, Email & SMS", "Live chat widget for your website", "Contact management", "Full conversation history & audit trail", "Documents attached to contacts", "Mobile & desktop apps", "Basic reporting"],
    },
    {
      name: "Growth",
      price: "$299",
      period: "/mo",
      audience: "Small & growing teams",
      users: "Up to 30 users",
      highlight: true,
      features: ["Everything in Starter, plus:", "Built-in CRM & pipeline", "Conversational AI CRM (chat with your data)", "Workflow automations", "Shared calendar & scheduling", "AI text assistant (trainable on your business)", "Auto-respond to clients 24/7", "AI lead qualification & routing", "AI appointment booking", "Team performance leaderboards"],
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "/mo",
      audience: "Large organizations",
      users: "Unlimited users",
      highlight: false,
      features: ["Everything in Growth, plus:", "Full API access", "Advanced custom reports", "Voice AI assistant", "Premium onboarding & team training", "Dedicated account manager", "Priority support (SLA)", "Custom integrations", "Multi-location management", "SSO & advanced security"],
    },
  ] : [
    {
      name: "Starter",
      price: "$99",
      period: "/mes",
      audience: "Operadores independientes y startups",
      users: "Hasta 5 usuarios",
      highlight: false,
      features: ["Bandeja unificada (los 8 canales)", "Integración WhatsApp Business", "Facebook, Instagram & TikTok DM", "LinkedIn DM, Email & SMS", "Widget de chat en vivo para tu web", "Gestión de contactos", "Historial completo y auditoría de conversaciones", "Documentos asociados a contactos", "Apps móvil y escritorio", "Reportes básicos"],
    },
    {
      name: "Growth",
      price: "$299",
      period: "/mes",
      audience: "Equipos pequeños y en crecimiento",
      users: "Hasta 30 usuarios",
      highlight: true,
      features: ["Todo lo de Starter, más:", "CRM y pipeline integrado", "CRM conversacional con IA (chatea con tus datos)", "Automatizaciones de flujos", "Calendario compartido y agendamiento", "Asistente IA de texto (entrenable con tu negocio)", "Auto-respuesta a clientes 24/7", "Calificación y ruteo de leads con IA", "Agendamiento automático con IA", "Leaderboards de rendimiento del equipo"],
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "/mes",
      audience: "Organizaciones grandes",
      users: "Usuarios ilimitados",
      highlight: false,
      features: ["Todo lo de Growth, más:", "Acceso completo a API", "Reportes personalizados avanzados", "Asistente de voz con IA", "Onboarding y capacitación premium para equipos", "Account manager dedicado", "Soporte prioritario (SLA)", "Integraciones a medida", "Gestión multi-ubicación", "SSO y seguridad avanzada"],
    },
  ];

  const results = [
    { n: "8", s: "", l: en ? "Channels in one inbox" : "Canales en una bandeja" },
    { n: "100", s: "%", l: en ? "Conversation visibility & audit" : "Visibilidad y auditoría de conversaciones" },
    { n: "24", s: "/7", l: en ? "AI employee — never misses a lead" : "Empleado IA — nunca pierde un lead" },
    { n: "0", s: "", l: en ? "Messages lost to personal phones" : "Mensajes perdidos en teléfonos personales" },
  ];

  return (
    <>
      {/* Hero — conversion-focused */}
      <section style={{ background: V.g900, padding: mob ? "120px 0 60px" : "160px 0 80px" }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "flex" : "grid", flexDirection: "column", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 40 : 60, alignItems: "center" }}>
            {/* Left — copy */}
            <div>
              <div style={{ display: "inline-block", background: "rgba(255,107,0,0.15)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
                <span style={{ fontSize: mob ? 12 : 13, fontWeight: 600, color: V.primary, fontFamily: F, letterSpacing: 0.5 }}>NEXUS by Avertris</span>
              </div>
              <h1 style={{ fontSize: mob ? 32 : 48, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color: V.white, margin: "0 0 20px", fontFamily: F }}>{en ? "One inbox. Every channel. Total control over your team's conversations." : "Una bandeja. Todos los canales. Control total de las conversaciones de tu equipo."}</h1>
              <p style={{ fontSize: mob ? 15 : 17, fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", lineHeight: 1.7, fontFamily: F }}>{en ? "Nexus merges WhatsApp, Instagram, Facebook, TikTok, LinkedIn, email, SMS, and live chat into one platform — with full audit trails, team performance data, and an AI employee that qualifies leads and books meetings while you sleep." : "Nexus une WhatsApp, Instagram, Facebook, TikTok, LinkedIn, email, SMS y chat en vivo en una sola plataforma — con auditoría completa, datos de rendimiento del equipo y un empleado IA que califica leads y agenda reuniones mientras duermes."}</p>
              <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: 12, alignItems: mob ? "stretch" : "center" }}>
                <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{en ? "Book a free demo" : "Agendar demo gratis"}</Btn>
                <span style={{ fontSize: mob ? 12 : 13, color: "rgba(255,255,255,0.4)", fontFamily: F }}>{en ? "No credit card required. Live in 48 hours." : "Sin tarjeta de crédito. En vivo en 48 horas."}</span>
              </div>
            </div>
            {/* Right — visual */}
            <div style={{ position: "relative", width: "100%", maxWidth: mob ? 360 : 480, aspectRatio: "560/570", margin: mob ? "0 auto" : undefined }}>
              {/* Background */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 32, background: "linear-gradient(145deg, #1a0800 0%, #3d1200 25%, #7a2800 50%, #c44800 75%, #fe6a03 100%)", overflow: "hidden" }}>
                <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(254,106,3,0.45) 0%, transparent 68%)", top: -80, right: -80 }} />
                <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(254,140,60,0.25) 0%, transparent 68%)", bottom: 20, left: -40 }} />
              </div>
              {/* Brand */}
              <div style={{ position: "absolute", top: 18, left: 22, display: "flex", alignItems: "center", gap: 7, zIndex: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fe6a03", boxShadow: "0 0 8px rgba(254,106,3,0.9)" }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}>Nexus by Avertris</span>
              </div>
              {/* Chat card */}
              <div style={{ position: "absolute", top: "9%", left: "4%", width: "57%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.22)", padding: 18, boxShadow: "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.25)" }}>
                {/* Msg 1 — client via Messenger */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 11 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", border: "1.5px solid rgba(255,255,255,0.32)", background: "linear-gradient(135deg,#00b0f4,#0078ff)" }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M12 2C6.48 2 2 6.18 2 11.33c0 2.74 1.22 5.19 3.17 6.93V22l3.57-1.96c.95.26 1.96.4 3 .4 5.52 0 10-4.18 10-9.33S17.52 2 12 2zm1.05 12.55-2.54-2.71-4.96 2.71 5.47-5.8 2.6 2.71 4.9-2.71-5.47 5.8z"/></svg>
                    <div style={{ position: "absolute", bottom: -2, right: -2, width: 10, height: 10, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", background: "#0078ff" }} />
                  </div>
                  <div style={{ maxWidth: 207, padding: "9px 13px", fontSize: 13, lineHeight: 1.52, color: "#fff", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.28)" }}>{en ? "Do you have any plans available for sales teams?" : "¿Tienen algún plan disponible para equipos de ventas?"}</div>
                </div>
                {/* Msg 2 — agent A */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 11, flexDirection: "row-reverse" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,0.32)", background: "linear-gradient(135deg,#fe6a03,#ff8c3a)", fontSize: 11, fontWeight: 700, color: "#fff" }}>A</div>
                  <div style={{ maxWidth: 207, padding: "9px 13px", fontSize: 13, lineHeight: 1.52, color: "#fff", borderRadius: "14px 14px 4px 14px", background: "linear-gradient(135deg, rgba(254,106,3,0.88), rgba(200,72,0,0.88))", backdropFilter: "blur(12px)", border: "1px solid rgba(254,160,80,0.4)" }}>{en ? "Hi! Of course. Our Business plan includes up to 20 users and priority support." : "¡Hola! Claro que sí. Nuestro plan Empresas incluye hasta 20 usuarios y soporte prioritario."}</div>
                </div>
                {/* Msg 3 — client via WhatsApp */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 11 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", border: "1.5px solid rgba(255,255,255,0.32)", background: "#25d366" }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.05 2C6.495 2 1.98 6.515 1.98 12.072c0 1.79.467 3.553 1.354 5.1L2 22l4.923-1.292a10.05 10.05 0 0 0 5.122 1.39c5.555 0 10.07-4.515 10.07-10.072C22.115 6.47 17.6 2 12.05 2z"/></svg>
                    <div style={{ position: "absolute", bottom: -2, right: -2, width: 10, height: 10, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", background: "#25d366" }} />
                  </div>
                  <div style={{ maxWidth: 207, padding: "9px 13px", fontSize: 13, lineHeight: 1.52, color: "#fff", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.28)" }}>{en ? "I'm interested, can we schedule a call for a demo?" : "Me interesa, ¿podemos agendar una llamada para ver la demo?"}</div>
                </div>
                {/* Msg 4 — agent B */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flexDirection: "row-reverse" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(255,255,255,0.32)", background: "linear-gradient(135deg,#ff8c3a,#fe6a03)", fontSize: 11, fontWeight: 700, color: "#fff" }}>B</div>
                  <div style={{ maxWidth: 207, padding: "9px 13px", fontSize: 13, lineHeight: 1.52, color: "#fff", borderRadius: "14px 14px 4px 14px", background: "linear-gradient(135deg, rgba(254,106,3,0.88), rgba(200,72,0,0.88))", backdropFilter: "blur(12px)", border: "1px solid rgba(254,160,80,0.4)" }}>{en ? "Of course! I'll connect you right now with our team. Does now work for you?" : "¡Por supuesto! Te conecto ahora mismo con nuestro equipo. ¿Te viene bien en este momento?"}</div>
                </div>
              </div>
              {/* Call card */}
              <div style={{ position: "absolute", bottom: "5.6%", right: "2.8%", width: "41%", background: "rgba(255,255,255,0.13)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRadius: 22, border: "1px solid rgba(255,255,255,0.26)", padding: "16px 16px 0 16px", boxShadow: "0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.28)", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontVariantNumeric: "tabular-nums" }}>01:24</span>
                  <span style={{ background: "rgba(37,211,102,0.22)", border: "1px solid rgba(37,211,102,0.5)", color: "#7fffa8", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.04em" }}>{en ? "WhatsApp Call" : "Llamada WhatsApp"}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(37,211,102,0.18)", border: "1px solid rgba(37,211,102,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#25d366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.72 19.79 19.79 0 0 1 0 1.07 2 2 0 0 1 1.99 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 7.91a16 16 0 0 0 6.15 6.15l1.28-1.28a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 2, textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>Valentina Herrera</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.52)" }}>+1 (809) 472-3810</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#25d366" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#25d366", opacity: 0.6 }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#25d366", opacity: 0.3 }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", marginLeft: 4 }}>{en ? "In progress..." : "En curso..."}</span>
                </div>
                <div style={{ margin: "0 -16px", padding: 14, background: "linear-gradient(135deg, rgba(220,38,38,0.88), rgba(180,20,20,0.92))", backdropFilter: "blur(8px)", color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center", letterSpacing: "0.06em", borderTop: "1px solid rgba(255,120,120,0.2)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>{en ? "End Call" : "Finalizar"}</div>
              </div>
            </div>
          </div>
        </Box>
      </section>

      {/* Social proof bar */}
      <section style={{ padding: mob ? "20px 0" : "24px 0", background: V.g100, borderBottom: `1px solid ${V.g200}` }}>
        <Box mob={mob} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: mob ? 16 : 40 }}>
          {(en ? ["8 channels, 1 inbox", "Full conversation audit", "AI that sells for you", "Setup in 48 hours"] : ["8 canales, 1 bandeja", "Auditoría de conversaciones", "IA que vende por ti", "En vivo en 48 horas"]).map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: V.primary, fontSize: 16, fontWeight: 700 }}>✓</span>
              <span style={{ fontSize: mob ? 12 : 13, fontWeight: 600, color: V.g600, fontFamily: F }}>{item}</span>
            </div>
          ))}
        </Box>
      </section>

      {/* Pain Points — agitate */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ textAlign: "center", marginBottom: mob ? 32 : 48 }}>
            <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 12px", fontFamily: F }}>{en ? "This is costing you clients right now" : "Esto te está costando clientes ahora mismo"}</h2>
            <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: V.g600, margin: 0, fontFamily: F }}>{en ? "If any of these sound familiar, you're losing deals you don't even know about." : "Si algo de esto te suena, estás perdiendo negocios que ni siquiera sabes."}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 20 : 24 }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ background: V.g100, borderRadius: 12, padding: mob ? 24 : 32, borderLeft: `4px solid ${V.primary}` }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{p.icon}</span>
                <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 8px", fontFamily: F }}>{p.title}</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, margin: 0, lineHeight: 1.7, fontFamily: F }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Solution intro + Channels */}
      <section style={{ padding: mob ? "48px 0" : "80px 0", background: V.g900 }}>
        <Box mob={mob} style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,107,0,0.15)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: mob ? 12 : 13, fontWeight: 600, color: V.primary, fontFamily: F }}>NEXUS</span>
          </div>
          <h2 style={{ fontSize: mob ? 28 : 44, fontWeight: 800, letterSpacing: -1, color: V.white, margin: "0 0 12px", fontFamily: F }}>{en ? "Every channel your clients use. One screen." : "Todos los canales que usan tus clientes. Una pantalla."}</h2>
          <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 40px", maxWidth: 560, marginLeft: "auto", marginRight: "auto", fontFamily: F }}>{en ? "Stop switching between apps. Every message from every platform arrives in one unified inbox — with the full client history attached." : "Deja de saltar entre apps. Cada mensaje de cada plataforma llega a una bandeja unificada — con el historial completo del cliente adjunto."}</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: mob ? 10 : 14 }}>
            {channels.map((ch, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: mob ? "10px 18px" : "14px 24px", fontSize: mob ? 13 : 15, fontWeight: 600, color: V.white, fontFamily: F }}>{ch}</div>
            ))}
          </div>
        </Box>
      </section>

      {/* Features — 6 cards */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ textAlign: "center", marginBottom: mob ? 32 : 48 }}>
            <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 700, letterSpacing: -1, color: V.g900, margin: "0 0 12px", fontFamily: F }}>{en ? "Not just an inbox. A command center." : "No es solo una bandeja. Es un centro de comando."}</h2>
            <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: V.g600, margin: 0, fontFamily: F }}>{en ? "Nexus gives you the visibility, automation, and AI to run your sales communication like a real operation." : "Nexus te da la visibilidad, automatización e IA para manejar tu comunicación de ventas como una operación real."}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: mob ? 20 : 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: V.g100, borderRadius: 12, padding: mob ? 24 : 32, display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 24, color: V.primary, marginBottom: 16, fontFamily: F }}>{f.icon}</span>
                <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 8px", fontFamily: F }}>{f.title}</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, margin: 0, lineHeight: 1.7, fontFamily: F, flex: 1 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Results */}
      <section style={{ padding: mob ? "48px 0" : "80px 0", background: V.g100 }}>
        <Box mob={mob}>
          <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 700, color: V.g900, margin: "0 0 40px", textAlign: "center", fontFamily: F }}>{en ? "What changes on day one" : "Qué cambia desde el día uno"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)", gap: mob ? 16 : 24, textAlign: "center" }}>
            {results.map((stat, i) => (
              <div key={i} style={{ background: V.white, borderRadius: 12, padding: mob ? 20 : 32, border: `1px solid ${V.g200}` }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
                  <span style={{ fontSize: mob ? 36 : 48, fontWeight: 800, color: V.primary, fontFamily: F, lineHeight: 1 }}>{stat.n}</span>
                  <span style={{ fontSize: mob ? 16 : 22, fontWeight: 600, color: V.primary, fontFamily: F }}>{stat.s}</span>
                </div>
                <p style={{ fontSize: mob ? 11 : 13, fontWeight: 400, color: V.g600, margin: "8px 0 0", fontFamily: F }}>{stat.l}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Pricing */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g900 }}>
        <Box mob={mob}>
          <h2 style={{ fontSize: mob ? 28 : 44, fontWeight: 800, letterSpacing: -1, color: V.white, margin: "0 0 12px", textAlign: "center", fontFamily: F }}>{en ? "Pick the plan that fits your team" : "Elige el plan que se adapte a tu equipo"}</h2>
          <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 48px", textAlign: "center", fontFamily: F }}>{en ? "All plans include all 8 communication channels. No hidden fees. Cancel anytime." : "Todos los planes incluyen los 8 canales. Sin cargos ocultos. Cancela cuando quieras."}</p>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 20 : 24, alignItems: "stretch" }}>
            {plans.map((plan, i) => (
              <div key={i} style={{ background: plan.highlight ? V.white : "rgba(255,255,255,0.05)", border: plan.highlight ? `2px solid ${V.primary}` : "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: mob ? 28 : 36, display: "flex", flexDirection: "column", position: "relative" }}>
                {plan.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: V.primary, color: "#1a1a1a", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>{en ? "Most Popular" : "Más Popular"}</div>}
                <h3 style={{ fontSize: mob ? 20 : 24, fontWeight: 700, color: plan.highlight ? V.g900 : V.white, margin: "0 0 4px", fontFamily: F }}>{plan.name}</h3>
                <p style={{ fontSize: mob ? 12 : 13, fontWeight: 400, color: plan.highlight ? V.g600 : "rgba(255,255,255,0.5)", margin: "0 0 16px", fontFamily: F }}>{plan.audience}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
                  <span style={{ fontSize: mob ? 36 : 44, fontWeight: 800, color: V.primary, fontFamily: F, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: mob ? 14 : 16, fontWeight: 400, color: plan.highlight ? V.g600 : "rgba(255,255,255,0.5)", fontFamily: F }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 600, color: plan.highlight ? V.g900 : "rgba(255,255,255,0.8)", margin: "0 0 24px", fontFamily: F }}>{plan.users}</p>
                <div style={{ flex: 1, marginBottom: 24 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0" }}>
                      <span style={{ color: V.primary, fontSize: 14, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: mob ? 12 : 13, color: plan.highlight ? V.g600 : "rgba(255,255,255,0.65)", fontFamily: F, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Btn variant={plan.highlight ? "primary" : "outline"} onClick={() => go("contact")} mob={mob} style={plan.highlight ? {} : { color: V.white, borderColor: "rgba(255,255,255,0.3)" }}>{en ? "Book a demo" : "Agendar demo"}</Btn>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Final CTA — urgency */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: mob ? 28 : 44, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, color: V.g900, margin: "0 0 16px", fontFamily: F }}>{en ? "Every message your team sends without Nexus is one you can't see, measure, or improve." : "Cada mensaje que tu equipo envía sin Nexus es uno que no puedes ver, medir ni mejorar."}</h2>
          <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: V.g600, margin: "0 0 32px", maxWidth: 520, lineHeight: 1.7, fontFamily: F }}>{en ? "Book a free demo. We'll show you your entire communication stack in one screen — live, in 30 minutes." : "Agenda un demo gratis. Te mostraremos toda tu comunicación en una sola pantalla — en vivo, en 30 minutos."}</p>
          <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{en ? "Book my free demo" : "Agendar mi demo gratis"}</Btn>
          <p style={{ fontSize: 12, color: V.g400, marginTop: 12, fontFamily: F }}>{en ? "No credit card required. Live in 48 hours." : "Sin tarjeta de crédito. En vivo en 48 horas."}</p>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   CASH LEAK ASSESSMENT LANDING PAGE
   ═══════════════════════════════════════════════════════════ */

function CashLeakPage({ go, lang }) {
  const C = T.cashLeakPage;
  const { mob, tab } = useMedia();

  const EmailCapture = ({ dark }) => (
    <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: 12, maxWidth: 560 }}>
      <input type="email" placeholder={t(C.emailPh, lang)} style={{ fontFamily: F, fontSize: 14, padding: "14px 18px", border: dark ? "1px solid rgba(255,255,255,0.2)" : `1px solid ${V.g200}`, borderRadius: 6, outline: "none", flex: 1, background: dark ? "rgba(255,255,255,0.08)" : V.white, color: dark ? V.white : V.g900, boxSizing: "border-box" }} />
      <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(C.heroCta, lang)}</Btn>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section style={{ background: V.g900, padding: mob ? "120px 0 60px" : "160px 0 80px" }}>
        <Box mob={mob}>
          <Lbl mob={mob}>{t(C.label, lang)}</Lbl>
          <h1 style={{ fontSize: mob ? 32 : 56, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color: V.white, margin: 0, fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(C.title, lang) }} />
          <p style={{ fontSize: mob ? 18 : 24, fontWeight: 300, color: V.primary, margin: "16px 0 0", fontFamily: F }}>{t(C.subtitle, lang)}</p>
          <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "20px 0 32px", maxWidth: 600, lineHeight: 1.7, fontFamily: F }}>{t(C.heroDesc, lang)}</p>
          <EmailCapture dark />
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "12px 0 0", fontFamily: F }}>{t(C.ctaNote, lang)}</p>
        </Box>
      </section>

      {/* Pain points */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <Lbl mob={mob}>{t(C.painLabel, lang)}</Lbl>
          <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 48px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(C.painTitle, lang) }} />
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "repeat(2, 1fr)" : "repeat(2, 1fr)", gap: mob ? 20 : 32 }}>
            {C.pains.map((pain, i) => (
              <div key={i} style={{ background: V.g100, borderRadius: 12, padding: mob ? 24 : 36 }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{pain.icon}</span>
                <h3 style={{ fontSize: mob ? 18 : 20, fontWeight: 700, color: V.g900, margin: "0 0 12px", fontFamily: F }}>{t(pain.title, lang)}</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, lineHeight: 1.7, margin: 0, fontFamily: F }}>{t(pain.desc, lang)}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* What you get */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g100 }}>
        <Box mob={mob}>
          <Lbl mob={mob}>{t(C.getLabel, lang)}</Lbl>
          <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 48px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(C.getTitle, lang) }} />
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: mob ? 20 : 32 }}>
            {C.gets.map((item, i) => (
              <div key={i} style={{ background: V.white, borderRadius: 12, padding: mob ? 24 : 36, border: `1px solid ${V.g200}` }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{item.icon}</span>
                <h3 style={{ fontSize: mob ? 18 : 20, fontWeight: 700, color: V.g900, margin: "0 0 12px", fontFamily: F }}>{t(item.title, lang)}</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, lineHeight: 1.7, margin: 0, fontFamily: F }}>{t(item.desc, lang)}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Social proof stats */}
      <section style={{ padding: mob ? "48px 0" : "80px 0" }}>
        <Box mob={mob}>
          <h2 style={{ fontSize: mob ? 24 : 36, fontWeight: 700, color: V.g900, margin: "0 0 40px", textAlign: "center", fontFamily: F }}>{t(C.proofTitle, lang)}</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 20 : 32, textAlign: "center" }}>
            {C.proofStats.map((stat, i) => (
              <div key={i} style={{ padding: mob ? 20 : 32 }}>
                <div style={{ fontSize: mob ? 36 : 56, fontWeight: 800, color: V.primary, fontFamily: F, lineHeight: 1 }}>{stat.n}</div>
                <p style={{ fontSize: mob ? 13 : 15, fontWeight: 400, color: V.g600, margin: "8px 0 0", fontFamily: F }}>{t(stat.l, lang)}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Final CTA */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g900 }}>
        <Box mob={mob} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: mob ? 32 : 56, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, color: V.white, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(C.ctaTitle, lang) }} />
          <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 32px", maxWidth: 560, lineHeight: 1.7, fontFamily: F }}>{t(C.ctaDesc, lang)}</p>
          <EmailCapture dark />
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "12px 0 0", fontFamily: F }}>{t(C.ctaNote, lang)}</p>
        </Box>
      </section>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */

function FooterSection({ go, lang }) {
  const FT = T.footer;
  const { mob } = useMedia();

  return (
    <footer style={{ background: V.white, padding: mob ? "48px 0 0" : "80px 0 0", borderTop: `1px solid ${V.g200}`, fontFamily: F }}>
      <Box mob={mob}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "180px 1fr 1fr 1fr 280px", gap: mob ? 32 : 32, paddingBottom: mob ? 40 : 64 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("home")}>
              <div style={{ width: 32, height: 32, background: V.g900, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: V.primary, fontSize: 14, fontWeight: 800 }}>.a</div>
              <span style={{ fontSize: 18, fontWeight: 700, color: V.g900, letterSpacing: -0.5 }}>Avertris</span>
            </div>
            {t(FT.links, lang).map((l, i) => (
              <button key={i} onClick={() => go(["about", "blog", "cases", "products"][i])} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 400, color: V.g600, textAlign: "left", padding: "2px 0", fontFamily: F }}>{l}</button>
            ))}
            <Btn variant="primary" onClick={() => go("contact")} style={{ marginTop: 8, padding: "10px 24px", fontSize: 13 }} mob={mob}>{t(T.nav.cta, lang)}</Btn>
          </div>

          {!mob && (
            <>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: V.g900, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 20px" }}>{t(FT.servicesTitle, lang)}</h4>
                {t(FT.services, lang).map(l => <button key={l} onClick={() => go("services")} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 400, color: V.g600, marginBottom: 12, padding: 0, fontFamily: F, textAlign: "left" }}>{l}</button>)}
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: V.g900, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 20px" }}>{t(FT.productsTitle, lang)}</h4>
                {t(FT.products, lang).map((l, i) => <button key={l} onClick={() => go(["product-ai-crm", "product-ai-chatbot", "product-dealer-manager"][i])} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 400, color: V.g600, marginBottom: 12, padding: 0, fontFamily: F, textAlign: "left" }}>{l}</button>)}
                <button onClick={() => go("product-cash-leak-assessment")} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: V.primary, marginBottom: 12, padding: 0, fontFamily: F, textAlign: "left" }}>{lang === "en" ? "Cash Leak Assessment ★" : "Assessment de Fugas ★"}</button>
              </div>
            </>
          )}

          <div style={{ borderLeft: !mob ? `1px solid ${V.g200}` : "none", paddingLeft: !mob ? 40 : 0 }}>
            <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 8px" }}>{t(FT.newsletter, lang)}</h3>
            <p style={{ fontSize: mob ? 12 : 13, fontWeight: 400, color: V.primary, margin: "0 0 20px" }}>{t(FT.newsletterSub, lang)}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="email" placeholder="Email *" style={{ fontFamily: F, fontSize: 14, padding: "12px 16px", border: `1px solid ${V.g200}`, borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }} />
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <input type="checkbox" id="consent-check" style={{ marginTop: 3, accentColor: V.primary }} />
                <label htmlFor="consent-check" style={{ fontSize: 12, color: V.g400, lineHeight: 1.5 }}>{t(FT.consent, lang)}</label>
              </div>
              <button style={{ fontFamily: F, fontSize: 14, fontWeight: 600, padding: "12px 32px", background: V.g900, color: V.white, border: "none", borderRadius: 6, cursor: "pointer", width: "100%", transition: "background 0.2s" }}
                onMouseEnter={e => e.target.style.background = V.primary} onMouseLeave={e => e.target.style.background = V.g900}
              >{t(FT.subscribe, lang)}</button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${V.g200}`, padding: "24px 0", display: "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "center", justifyContent: "space-between", gap: mob ? 16 : 0 }}>
          <p style={{ fontSize: 12, color: V.g400, margin: 0 }}>{t(FT.copy, lang)} | {t(FT.privacy, lang)}</p>
          <div style={{ display: "flex", gap: 16 }}>{["LinkedIn", "Twitter", "Instagram"].map(s => <a key={s} href="#" style={{ fontSize: 13, fontWeight: 500, color: V.g400, textDecoration: "none" }}>{s}</a>)}</div>
        </div>
      </Box>
    </footer>
  );
}


/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */

/* Convert page key to URL path */
/* Convert page key + lang to URL path: e.g. ("services", "es") → "/es/services" */
function pageToPath(page, lang) {
  const prefix = "/" + (lang || "en");
  if (page === "home") return prefix;
  return prefix + "/" + page;
}

/* Parse URL path into { lang, page }. Examples: "/es/services" → { lang:"es", page:"services" }, "/en" → { lang:"en", page:"home" } */
function parsePath(path) {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const parts = clean.split("/");
  const first = parts[0];
  if (first === "en" || first === "es") {
    const rest = parts.slice(1).join("/");
    return { lang: first, page: rest === "" ? "home" : rest };
  }
  // No lang prefix — will be redirected
  return { lang: null, page: clean === "" ? "home" : clean };
}

export default function App() {
  const parsed = parsePath(window.location.pathname);
  const browserLang = (() => { try { const bl = navigator.language || navigator.userLanguage || "en"; return bl.startsWith("es") ? "es" : "en"; } catch { return "en"; } })();

  // If no lang prefix in URL (e.g. "/" or "/services"), redirect to /{lang}/...
  if (!parsed.lang) {
    const target = pageToPath(parsed.page, browserLang);
    window.history.replaceState(null, "", target);
    parsed.lang = browserLang;
  }

  const [page, setPage] = useState(parsed.page);
  const [lang, setLangState] = useState(parsed.lang);

  const go = (p, newLang) => {
    const l = newLang || lang;
    setPage(p);
    if (newLang) setLangState(l);
    window.history.pushState({ page: p, lang: l }, "", pageToPath(p, l));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When language is switched, update URL to reflect new lang prefix
  const setLang = (l) => {
    setLangState(l);
    window.history.replaceState({ page, lang: l }, "", pageToPath(page, l));
  };

  useEffect(() => {
    const onPop = (e) => {
      if (e.state?.page) {
        setPage(e.state.page);
        if (e.state.lang) setLangState(e.state.lang);
      } else {
        const p = parsePath(window.location.pathname);
        setPage(p.page);
        if (p.lang) setLangState(p.lang);
      }
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /* Build detail pages dynamically from T.detailPages */
  const detailRoutes = {};
  Object.keys(T.detailPages).forEach(k => {
    detailRoutes[k] = <ServiceDetailPage pageKey={k} go={go} lang={lang} />;
  });

  /* Build blog post pages dynamically from T.blogPage.posts */
  const blogRoutes = {};
  T.blogPage.posts.forEach((post, i) => {
    if (post.slug) blogRoutes["blog-" + post.slug] = <BlogPostPage postIndex={i} go={go} lang={lang} />;
  });

  const pages = {
    home: <HomePage go={go} lang={lang} />,
    services: <ServicesPage go={go} lang={lang} />,
    products: <ProductsPage go={go} lang={lang} />,
    "product-omnichannel": <OmnichannelPage go={go} lang={lang} />,
    "product-cash-leak-assessment": <CashLeakPage go={go} lang={lang} />,
    cases: <CasesPage go={go} lang={lang} />,
    about: <AboutPage go={go} lang={lang} />,
    blog: <BlogPage lang={lang} go={go} />,
    contact: <ContactPage lang={lang} />,
    ...detailRoutes,
    ...blogRoutes,
  };

  return (
    <div style={{ fontFamily: F, fontSize: 14, fontWeight: 300, margin: 0, color: V.g900, overflowX: "hidden" }}>
      <Nav page={page} go={go} lang={lang} setLang={setLang} />
      <main>{pages[page]}</main>
      <FooterSection go={go} lang={lang} />
    </div>
  );
}
