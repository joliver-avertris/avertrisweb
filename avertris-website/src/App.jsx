import { useState, useEffect, useRef } from "react";
import { Component as EtheralShadow } from "./components/ui/etheral-shadow";
import { FallingPattern } from "./components/ui/falling-pattern";
import { AuroraBackground } from "./components/ui/aurora-background";
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
    h1a: { en: "Stop losing money", es: "Deja de perder dinero" },
    h1b: { en: "on disconnected", es: "con herramientas" },
    h1c: { en: "tools & teams", es: "y equipos desconectados" },
    ctaCases: { en: "See how we do it", es: "Mira cómo lo hacemos" },
    ctaTalk: { en: "Get your free consultation", es: "Obtén tu consulta gratis" },
    svc: [
      { t: { en: "Avertris Technology", es: "Avertris Technology" }, d: { en: "AI agents, chatbots, voice integrations, custom web & mobile apps — built to automate and scale your operations", es: "Agentes de IA, chatbots, integraciones de voz, apps web y móviles a medida — para automatizar y escalar tus operaciones" } },
      { t: { en: "Avertris Products", es: "Avertris Products" }, d: { en: "Ready-to-use solutions: AI CRM, AI chatbot SaaS, and Dealer Manager for automotive dealerships in USA & LATAM", es: "Soluciones listas para usar: AI CRM, chatbot SaaS con IA, y Dealer Manager para concesionarios automotrices en USA y LATAM" } },
      { t: { en: "Avertris Growth", es: "Avertris Growth" }, d: { en: "Paid ads, SEO, automations, CRO, email marketing & attribution analytics that turn traffic into revenue", es: "Paid ads, SEO, automatizaciones, CRO, email marketing y analítica de atribución que convierten tráfico en ingresos" } },
    ],
  },
  clients: { label: { en: "Trusted by growing companies", es: "Empresas que confían en nosotros" } },
  results: {
    label: { en: "Real numbers", es: "Números reales" },
    title: { en: "Results that justify<br/>the investment", es: "Resultados que justifican<br/>la inversión" },
    stats: [
      { n: "3.2", s: "x", l: { en: "Avg. Revenue Lift", es: "Aumento Promedio de Ingresos" }, d: { en: "Median ROI within 12 months of growth marketing engagement", es: "ROI promedio en 12 meses de marketing de crecimiento" } },
      { n: "40", s: "%", l: { en: "Cost Reduction", es: "Reducción de Costos" }, d: { en: "Average savings through AI workflow automation and process optimization", es: "Ahorro promedio con automatización de flujos e IA" } },
      { n: "2", s: "wk", l: { en: "To First Results", es: "Para Primeros Resultados" }, d: { en: "Our consulting-first approach delivers actionable insights from week one", es: "Nuestro enfoque de consultoría primero entrega resultados accionables desde la semana uno" } },
      { n: "98", s: "%", l: { en: "Client Retention", es: "Retención de Clientes" }, d: { en: "Clients stay because we deliver outcomes, not just deliverables", es: "Los clientes se quedan porque entregamos resultados, no solo entregables" } },
    ],
  },
  capabilities: {
    title: { en: "Everything your<br/>business needs", es: "Todo lo que tu<br/>negocio necesita" },
    cta: { en: "Talk to a specialist", es: "Habla con un especialista" },
    items: [
      { title: { en: "AI Agents &\nChatbots", es: "Agentes IA y\nChatbots" }, icon: "◇" },
      { title: { en: "Growth Marketing\n& Paid Ads", es: "Marketing de\nCrecimiento y Ads" }, icon: "↗" },
      { title: { en: "Custom Web &\nMobile Apps", es: "Aplicaciones Web\ny Móviles" }, icon: "</>" },
      { title: { en: "AI CRM &\nAutomations", es: "CRM con IA y\nAutomatizaciones" }, icon: "⟳" },
      { title: { en: "SEO &\nContent Strategy", es: "SEO y Estrategia\nde Contenido" }, icon: "▤" },
      { title: { en: "Analytics &\nAttribution", es: "Analítica y\nAtribución" }, icon: "◎" },
    ],
  },
  whyUs: {
    label: { en: "Why Avertris", es: "Por qué Avertris" },
    title: { en: "One team that does<br/>what 3 agencies can't", es: "Un equipo que hace lo<br/>que 3 agencias no pueden" },
    desc: { en: "You're tired of coordinating between your dev team, your marketing agency, and your AI consultant — with none of them talking to each other. We integrate technology, marketing, and AI into one strategy, with one team, from day one.", es: "Estás cansado de coordinar entre tu equipo de desarrollo, tu agencia de marketing y tu consultor de IA — sin que ninguno se comunique. Nosotros integramos tecnología, marketing e IA en una sola estrategia, con un solo equipo, desde el día uno." },
    cta: { en: "Book a free strategy call", es: "Agenda una llamada estratégica gratis" },
    items: [
      { icon: "◉", title: { en: "Three pillars, one team", es: "Tres pilares, un equipo" }, desc: { en: "Software + Marketing + AI delivered by a single team. No handoffs between agencies, no miscommunication, no wasted budget.", es: "Software + Marketing + IA entregados por un solo equipo. Sin transferencias entre agencias, sin miscomunicación, sin presupuesto desperdiciado." } },
      { icon: "◈", title: { en: "Bilingual & bicultural", es: "Bilingüe y bicultural" }, desc: { en: "We operate natively in English and Spanish. Strategy, messaging, and execution localized for US and LATAM markets.", es: "Operamos nativamente en inglés y español. Estrategia, mensajes y ejecución localizados para mercados de USA y LATAM." } },
      { icon: "↗", title: { en: "US quality, competitive pricing", es: "Calidad US, precio competitivo" }, desc: { en: "Our offshore team delivers enterprise-grade work at 40-50% less than US agencies, timezone-aligned.", es: "Nuestro equipo offshore entrega trabajo de nivel empresarial a 40-50% menos que agencias US, alineados en zona horaria." } },
      { icon: "◎", title: { en: "Consulting-first approach", es: "Enfoque de consultoría primero" }, desc: { en: "We don't start building until we understand your business. Every engagement begins with a strategic consultation.", es: "No empezamos a construir hasta entender tu negocio. Cada proyecto inicia con una consultoría estratégica." } },
    ],
  },
  testimonials: {
    label: { en: "What our clients say", es: "Lo que dicen nuestros clientes" },
    title: { en: "Trusted by mid-market<br/>leaders", es: "Confianza de líderes<br/>del mercado medio" },
    items: [
      { name: "Carlos Méndez", role: { en: "CEO, Catojisa", es: "CEO, Catojisa" }, quote: { en: "Avertris didn't just build us a website — they restructured our entire digital operation. We went from managing everything manually to having automated workflows, better leads, and real visibility into what's working. The ROI paid for itself in the first quarter.", es: "Avertris no solo nos construyó un sitio web — reestructuraron toda nuestra operación digital. Pasamos de manejar todo manualmente a tener flujos automatizados, mejores leads y visibilidad real de lo que funciona. El ROI se pagó solo en el primer trimestre." } },
      { name: "María Rodriguez", role: { en: "COO, AutoPlus Dealers", es: "COO, AutoPlus Dealers" }, quote: { en: "Dealer Manager transformed how we run our dealership. Inventory, CRM, and operations all in one platform. Their bilingual support means our teams in both countries can use it without friction.", es: "Dealer Manager transformó cómo operamos nuestro concesionario. Inventario, CRM y operaciones en una sola plataforma. Su soporte bilingüe significa que nuestros equipos en ambos países lo usan sin fricción." } },
      { name: "David Chen", role: { en: "VP Marketing, TechScale Inc", es: "VP Marketing, TechScale Inc" }, quote: { en: "We were spending $15K/month on ads with no clear attribution. Avertris set up our analytics, restructured campaigns, and within 3 months our cost per acquisition dropped 60%. They think like business owners, not just marketers.", es: "Gastábamos $15K/mes en ads sin atribución clara. Avertris configuró nuestra analítica, reestructuró campañas, y en 3 meses nuestro costo por adquisición bajó 60%. Piensan como dueños de negocio, no solo como marketers." } },
    ],
  },
  leadMagnet: {
    label: { en: "Free resource", es: "Recurso gratuito" },
    title: { en: "Is your business ready<br/>to scale?", es: "¿Tu negocio está listo<br/>para escalar?" },
    desc: { en: "Download our free Digital Maturity Assessment — a self-guided scorecard that evaluates your technology, marketing, and AI readiness across 25 key areas. Discover exactly where you're leaving money on the table.", es: "Descarga nuestro Assessment de Madurez Digital gratuito — una evaluación guiada que analiza tu tecnología, marketing y preparación para IA en 25 áreas clave. Descubre exactamente dónde estás dejando dinero sobre la mesa." },
    bullets: {
      en: ["Score your tech stack, marketing ops, and AI readiness", "Get a prioritized action plan based on your results", "See benchmarks from 100+ mid-market businesses", "Takes only 10 minutes to complete"],
      es: ["Evalúa tu stack tecnológico, operaciones de marketing y preparación para IA", "Obtén un plan de acción priorizado basado en tus resultados", "Compara con benchmarks de 100+ empresas medianas", "Solo toma 10 minutos completarlo"],
    },
    emailPh: { en: "Your work email", es: "Tu correo corporativo" },
    btn: { en: "Download free assessment", es: "Descargar assessment gratis" },
    note: { en: "No spam. Unsubscribe anytime.", es: "Sin spam. Cancela cuando quieras." },
  },
  process: {
    label: { en: "How we work", es: "Cómo trabajamos" },
    title: { en: "Our process", es: "Nuestro proceso" },
    cta: { en: "Start with a consultation", es: "Empieza con una consulta" },
    steps: [
      { num: "01", title: { en: "Strategic Consultation", es: "Consultoría Estratégica" }, desc: { en: "We start every engagement with a paid consulting session to deeply understand your business, challenges, and goals. No cookie-cutter solutions.", es: "Cada proyecto inicia con una consultoría pagada para entender profundamente tu negocio, desafíos y objetivos. Sin soluciones genéricas." }, details: { en: ["Business & operations deep-dive", "Technology audit & gap analysis", "Growth opportunity mapping", "Custom roadmap & investment plan"], es: ["Análisis profundo de negocio y operaciones", "Auditoría tecnológica y análisis de brechas", "Mapeo de oportunidades de crecimiento", "Hoja de ruta e inversión personalizada"] } },
      { num: "02", title: { en: "Build & Execute", es: "Construir y Ejecutar" }, desc: { en: "Agile sprints with weekly demos. You see progress every week, not just at the end. We build software, launch campaigns, and integrate AI in parallel.", es: "Sprints ágiles con demos semanales. Ves progreso cada semana, no solo al final. Construimos software, lanzamos campañas e integramos IA en paralelo." }, details: { en: ["Weekly progress demos", "Parallel execution across pillars", "QA & performance testing", "Campaign setup & launch"], es: ["Demos semanales de progreso", "Ejecución paralela entre pilares", "QA y pruebas de rendimiento", "Configuración y lanzamiento de campañas"] } },
      { num: "03", title: { en: "Optimize & Scale", es: "Optimizar y Escalar" }, desc: { en: "Data drives every decision as we optimize and scale. Monthly strategy reviews ensure we're always moving the needle on what matters.", es: "Los datos guían cada decisión mientras optimizamos y escalamos. Revisiones estratégicas mensuales aseguran que siempre movemos la aguja en lo que importa." }, details: { en: ["Performance monitoring & dashboards", "A/B testing & CRO", "Monthly strategy reviews", "Scaling playbook development"], es: ["Monitoreo y dashboards de rendimiento", "Pruebas A/B y CRO", "Revisiones estratégicas mensuales", "Desarrollo de playbook de escalamiento"] } },
    ],
  },
  team: {
    label: { en: "Our team", es: "Nuestro equipo" },
    title: { en: "People behind<br/>the results", es: "Las personas detrás<br/>de los resultados" },
    founderRole: { en: "Founder & CEO", es: "Fundador y CEO" },
    founderBio: { en: "Deep roots in US and LATAM markets. Founded Avertris because mid-market companies deserve the same technology, marketing, and AI firepower that Fortune 500s have — at a fraction of the cost. Every project starts with a conversation, not a proposal.", es: "Raíces profundas en los mercados de USA y LATAM. Fundó Avertris porque las empresas medianas merecen la misma tecnología, marketing e IA que tienen las Fortune 500 — a una fracción del costo. Cada proyecto empieza con una conversación, no con una propuesta." },
    members: [
      { ini: "EN", name: { en: "Head of Engineering", es: "Dir. de Ingeniería" }, role: { en: "Software & AI Development", es: "Desarrollo de Software e IA" }, desc: { en: "Full-stack architect, 10+ years. Specializes in AI integrations, React, Node.js, Python.", es: "Arquitecto full-stack, 10+ años. Especialista en integraciones de IA, React, Node.js, Python." } },
      { ini: "MK", name: { en: "Growth Lead", es: "Líder de Crecimiento" }, role: { en: "Marketing & Revenue", es: "Marketing e Ingresos" }, desc: { en: "Bilingual performance marketer. Paid ads, SEO, CRO. Managed $2M+ in ad spend across US/LATAM.", es: "Performance marketer bilingüe. Paid ads, SEO, CRO. Ha gestionado $2M+ en inversión publicitaria en US/LATAM." } },
      { ini: "AI", name: { en: "AI Director", es: "Director de IA" }, role: { en: "AI Strategy & Automation", es: "Estrategia de IA y Automatización" }, desc: { en: "AI agent development, chatbot architecture, voice integration, process automation.", es: "Desarrollo de agentes IA, arquitectura de chatbots, integración de voz, automatización de procesos." } },
    ],
  },
  cta: {
    title: { en: "Ready to stop<br/>leaving money<br/>on the table?", es: "¿Listo para dejar<br/>de perder dinero<br/>sobre la mesa?" },
    desc: { en: "Book a free 30-minute strategy call. We'll analyze your current setup and show you exactly where the biggest opportunities are — whether you hire us or not.", es: "Agenda una llamada estratégica gratuita de 30 minutos. Analizaremos tu setup actual y te mostraremos exactamente dónde están las mayores oportunidades — nos contrates o no." },
    btn: { en: "Book your free call", es: "Agenda tu llamada gratis" },
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
      en: ["About", "Blog", "Case studies", "Careers"],
      es: ["Nosotros", "Blog", "Casos de éxito", "Carreras"],
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
    storyP1: { en: "Avertris was founded with a clear vision: mid-market businesses across the US and Latin America deserve the same caliber of technology, marketing, and AI expertise that Fortune 500 companies enjoy — without the enterprise price tag.", es: "Avertris fue fundada con una visión clara: las empresas medianas en EE.UU. y América Latina merecen la misma calidad de tecnología, marketing e IA que disfrutan las Fortune 500 — sin el precio empresarial." },
    storyP2: { en: "We are a bilingual, bicultural team that understands both markets intimately. Our nearshore model means timezone-aligned collaboration, cultural fluency, and cost-efficient delivery.", es: "Somos un equipo bilingüe y bicultural que entiende ambos mercados. Nuestro modelo nearshore significa colaboración alineada en zona horaria, fluidez cultural y entrega eficiente." },
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
    presenceDesc: { en: "Headquartered with teams across the Americas, serving clients in all 50 US states and key LATAM markets.", es: "Con sede y equipos en las Américas, atendiendo clientes en los 50 estados de EE.UU. y mercados clave de LATAM." },
    locations: [
      { region: { en: "United States", es: "Estados Unidos" }, desc: { en: "Serving clients coast to coast", es: "Atendiendo clientes de costa a costa" }, flag: "US" },
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
    subtitle: { en: "Insights on software, growth marketing, and AI for mid-market businesses.", es: "Perspectivas sobre software, marketing de crecimiento e IA para empresas medianas." },
    filters: { en: ["All", "AI", "Marketing", "Software"], es: ["Todos", "IA", "Marketing", "Software"] },
    posts: [
      { cat: "AI", title: { en: "How to Choose the Right AI Strategy for Your Mid-Market Business", es: "Cómo Elegir la Estrategia de IA Correcta para tu Empresa Mediana" }, desc: { en: "A practical framework for evaluating AI opportunities and prioritizing integrations that drive ROI.", es: "Un marco práctico para evaluar oportunidades de IA y priorizar integraciones que generen ROI." }, date: { en: "Feb 5, 2026", es: "5 Feb, 2026" }, read: { en: "8 min read", es: "8 min de lectura" } },
      { cat: "Marketing", title: { en: "SEO for Bilingual Businesses: Ranking in English and Spanish", es: "SEO para Negocios Bilingües: Posicionamiento en Inglés y Español" }, desc: { en: "Technical and content strategies for dominating search in two languages.", es: "Estrategias técnicas y de contenido para dominar las búsquedas en dos idiomas." }, date: { en: "Jan 28, 2026", es: "28 Ene, 2026" }, read: { en: "6 min read", es: "6 min de lectura" } },
      { cat: "Software", title: { en: "When to Build Custom Software vs. Buy Off-the-Shelf", es: "Cuándo Construir Software a Medida vs. Comprar Soluciones Existentes" }, desc: { en: "A decision framework for mid-market leaders evaluating build vs. buy.", es: "Un marco de decisión para líderes evaluando construir vs. comprar." }, date: { en: "Jan 15, 2026", es: "15 Ene, 2026" }, read: { en: "7 min read", es: "7 min de lectura" } },
      { cat: "AI", title: { en: "LLM Integration: From Proof of Concept to Production", es: "Integración de LLMs: De Prueba de Concepto a Producción" }, desc: { en: "Lessons from deploying large language models in real business workflows.", es: "Lecciones de implementar modelos de lenguaje en flujos de negocio reales." }, date: { en: "Jan 8, 2026", es: "8 Ene, 2026" }, read: { en: "10 min read", es: "10 min de lectura" } },
      { cat: "Marketing", title: { en: "The Growth Marketing Playbook for LATAM Expansion", es: "El Playbook de Marketing de Crecimiento para Expansión en LATAM" }, desc: { en: "Channel strategies, localization, and budgets for entering Latin America.", es: "Estrategias de canales, localización y presupuestos para entrar en América Latina." }, date: { en: "Dec 20, 2025", es: "20 Dic, 2025" }, read: { en: "9 min read", es: "9 min de lectura" } },
      { cat: "Software", title: { en: "API-First Architecture: Why It Matters for Growing Businesses", es: "Arquitectura API-First: Por Qué Importa para Negocios en Crecimiento" }, desc: { en: "How API-first design creates flexibility and future-proofs your stack.", es: "Cómo el diseño API-first crea flexibilidad y protege tu stack a futuro." }, date: { en: "Dec 12, 2025", es: "12 Dic, 2025" }, read: { en: "5 min read", es: "5 min de lectura" } },
    ],
  },
  contactPage: {
    label: { en: "Get started", es: "Empecemos" },
    title: { en: "Let's talk about<br/>your growth", es: "Hablemos de<br/>tu crecimiento" },
    subtitle: { en: "Fill out the form or book a call directly. Every conversation starts with understanding — we'll never pitch you something you don't need.", es: "Llena el formulario o agenda una llamada directamente. Cada conversación comienza con entendimiento — nunca te venderemos algo que no necesitas." },
    formTitle: { en: "Tell us about your business", es: "Cuéntanos sobre tu negocio" },
    formDesc: { en: "We'll respond within one business day with a personalized assessment.", es: "Te responderemos en un día hábil con una evaluación personalizada." },
    name: { en: "Full Name", es: "Nombre Completo" },
    email: { en: "Email", es: "Correo Electrónico" },
    company: { en: "Company", es: "Empresa" },
    service: { en: "Service interest", es: "Servicio de interés" },
    budget: { en: "Budget range", es: "Rango de presupuesto" },
    message: { en: "Tell us about your project", es: "Cuéntanos sobre tu proyecto" },
    messagePh: { en: "What are you looking to build or improve?", es: "¿Qué buscas construir o mejorar?" },
    submit: { en: "Send message", es: "Enviar mensaje" },
    bookTitle: { en: "Prefer to book directly?", es: "¿Prefieres agendar directamente?" },
    bookDesc: { en: "Pick a time that works — 30 min intro call.", es: "Elige un horario — llamada introductoria de 30 min." },
    bookBtn: { en: "Schedule on Calendly", es: "Agendar en Calendly" },
    otherTitle: { en: "Other ways to reach us", es: "Otras formas de contactarnos" },
    emailLabel: { en: "Email", es: "Correo" },
    responseLabel: { en: "Response time", es: "Tiempo de respuesta" },
    responseValue: { en: "Within 1 business day", es: "En 1 día hábil" },
    presenceTitle: { en: "Our presence", es: "Nuestra presencia" },
    svcOptions: { en: ["AI & Technology Solutions", "Avertris Products (CRM/Dealer Manager)", "Growth Marketing & SEO", "Paid Ads & Attribution", "Strategic Consultation", "Not sure yet — help me decide"], es: ["Soluciones de IA y Tecnología", "Productos Avertris (CRM/Dealer Manager)", "Growth Marketing y SEO", "Paid Ads y Atribución", "Consultoría Estratégica", "Aún no sé — ayúdenme a decidir"] },
    budgetOptions: ["$500 – $2,500", "$2,500 – $5,000", "$5,000 – $15,000", "$15,000+"],
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
    primary: { ...base, background: V.primary, color: V.white, border: `1.5px solid ${V.primary}` },
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
          { heading: t(T.nav.megaTech, lang), items: [{ t: lang === "en" ? "AI Consulting & Agents" : "Consultoría e Agentes de IA" }, { t: lang === "en" ? "AI Chatbot Development" : "Desarrollo de Chatbots IA" }, { t: lang === "en" ? "AI Voice Integration" : "Integración de Voz con IA" }, { t: lang === "en" ? "Custom Web & Mobile Apps" : "Apps Web y Móviles a Medida" }] },
          { heading: t(T.nav.megaProducts, lang), items: [{ t: lang === "en" ? "Avertris AI CRM" : "Avertris AI CRM" }, { t: lang === "en" ? "AI Chatbot SaaS" : "Chatbot SaaS con IA" }, { t: lang === "en" ? "Dealer Manager (Automotive)" : "Dealer Manager (Automotriz)" }] },
          { heading: t(T.nav.megaGrowth, lang), items: [{ t: lang === "en" ? "Paid Ads & Performance" : "Paid Ads y Performance" }, { t: lang === "en" ? "SEO & Content Strategy" : "SEO y Estrategia de Contenido" }, { t: lang === "en" ? "Analytics & Attribution" : "Analítica y Atribución" }, { t: lang === "en" ? "Email Marketing & CRO" : "Email Marketing y CRO" }] },
        ],
      },
    },
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
                                <button key={ii} onClick={() => { go("services"); setMobileMenuOpen(false); }} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 400, color: V.g800, padding: "6px 0", textAlign: "left", width: "100%", transition: "color 0.15s" }}>{item.t}</button>
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
                          <button key={ii} onClick={() => { go("services"); setOpenMenu(null); }} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 400, color: V.g800, padding: "8px 0", textAlign: "left", width: "100%", transition: "color 0.15s" }}
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
      <section className="dark" style={{ minHeight: mob ? "80vh" : "92vh", display: "flex", alignItems: "flex-end", padding: "0 0 " + (mob ? "60px" : "80px"), position: "relative", overflow: "hidden" }}>
        {/* Wavy Background base layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <WavyBackground
            colors={["#FF6B00", "#FF8533", "#CC5500", "#FFB366", "#FF6B00"]}
            backgroundFill="#1a1a1a"
            blur={12}
            speed="slow"
            waveOpacity={0.4}
            waveWidth={60}
            containerClassName="h-full"
          />
        </div>
        {/* Aurora Background layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.4 }}>
          <AuroraBackground className="dark h-full w-full bg-transparent" showRadialGradient={true}>
            <span />
          </AuroraBackground>
        </div>
        {/* Ethereal Shadow layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.35 }}>
          <EtheralShadow
            color="rgba(255, 107, 0, 1)"
            animation={{ scale: 80, speed: 70 }}
            noise={{ opacity: 1, scale: 1.2 }}
            sizing="fill"
          />
        </div>
        {/* Dark gradient for text readability */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />
        <Box mob={mob} style={{ position: "relative", zIndex: 4 }}>
          <p style={{ fontSize: mob ? 13 : 15, fontWeight: 400, color: "rgba(255,255,255,0.7)", margin: "0 0 24px", fontFamily: F }}>
            <span style={{ color: V.primary, fontWeight: 600 }}>{t(T.hero.label, L)}</span> {t(T.hero.labelSuffix, L)}
          </p>
          <h1 style={{ fontSize: mob ? 38 : 82, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: V.white, margin: "0 0 40px", maxWidth: 800, fontFamily: F }}>
            {t(T.hero.h1a, L)}<br />{t(T.hero.h1b, L)}<br />{t(T.hero.h1c, L)}
          </h1>
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
              <span key={n} style={{ fontSize: mob ? 14 : 18, fontWeight: 700, color: V.g800, opacity: 0.4, letterSpacing: -0.5, fontFamily: F }}>{n}</span>
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
            {t(p.features, lang).map((f, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: j < t(p.features, lang).length - 1 ? `1px solid ${V.g200}` : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: V.p200, color: V.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, fontWeight: 600 }}>✓</div>
                <span style={{ fontSize: mob ? 13 : 15, color: V.g900, fontFamily: F }}>{f}</span>
              </div>
            ))}
          </div>
        </div></Box>
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

function BlogPage({ lang }) {
  const B = T.blogPage;
  const [filter, setFilter] = useState(0);
  const filters = t(B.filters, lang);
  const catKeys = ["All", "AI", "Marketing", "Software"];
  const fk = catKeys[filter];
  const posts = B.posts.filter(p => fk === "All" || p.cat === fk);
  const catColors = { AI: V.primary, Marketing: V.g900, Software: "#2a2a40" };
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
              <article key={i} style={{ background: V.white, borderRadius: 12, border: `1px solid ${V.g200}`, overflow: "hidden", transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => !mob && (e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)")}
                onMouseLeave={e => !mob && (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ height: mob ? 120 : 160, background: `linear-gradient(135deg, ${catColors[post.cat] || V.g900}, ${catColors[post.cat] || V.g900}88)`, padding: 24, display: "flex", alignItems: "flex-end" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: V.white, background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: 4, fontFamily: F }}>{post.cat}</span>
                </div>
                <div style={{ padding: mob ? 16 : 28 }}>
                  <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: V.g900, margin: "0 0 12px", lineHeight: 1.4, fontFamily: F }}>{t(post.title, lang)}</h3>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, lineHeight: 1.7, margin: "0 0 20px", fontFamily: F }}>{t(post.desc, lang)}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: mob ? 11 : 12, color: V.g400, fontFamily: F }}>{t(post.date, lang)}</span>
                    <span style={{ fontSize: mob ? 11 : 12, color: V.g400, fontFamily: F }}>{t(post.read, lang)}</span>
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

  return (
    <>
      <PageHero label={t(C.label, lang)} title={t(C.title, lang)} subtitle={t(C.subtitle, lang)} mob={mob} />
      <section style={{ padding: mob ? "48px 0 64px" : "80px 0 100px" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 80, alignItems: mob ? "stretch" : "start" }}>
          <div>
            <h2 style={{ fontSize: mob ? 24 : 32, fontWeight: 700, color: V.g900, margin: "0 0 8px", fontFamily: F }}>{t(C.formTitle, lang)}</h2>
            <p style={{ fontSize: mob ? 14 : 15, fontWeight: 300, color: V.g600, margin: "0 0 32px", fontFamily: F }}>{t(C.formDesc, lang)}</p>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.name, lang)}</label><input style={inputStyle} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => e.target.style.borderColor = V.g200} /></div>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.email, lang)}</label><input style={inputStyle} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => e.target.style.borderColor = V.g200} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.company, lang)}</label><input style={inputStyle} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => e.target.style.borderColor = V.g200} /></div>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.service, lang)}</label>
                <select style={{ ...inputStyle, background: V.white, color: V.g600 }}>{t(C.svcOptions, lang).map(o => <option key={o}>{o}</option>)}</select>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}><label style={{ fontSize: 13, fontWeight: 500, color: V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.budget, lang)}</label><select style={{ ...inputStyle, background: V.white, color: V.g600 }}>{C.budgetOptions.map(o => <option key={o}>{o}</option>)}</select></div>
            <div style={{ marginBottom: 24 }}><label style={{ fontSize: 13, fontWeight: 500, color: V.g900, display: "block", marginBottom: 6, fontFamily: F }}>{t(C.message, lang)}</label><textarea placeholder={t(C.messagePh, lang)} style={{ ...inputStyle, height: 120, resize: "vertical" }} onFocus={e => e.target.style.borderColor = V.primary} onBlur={e => e.target.style.borderColor = V.g200} /></div>
            <button style={{ width: "100%", padding: 16, background: V.primary, color: V.white, border: "none", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: F }}>{t(C.submit, lang)}</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: V.g100, borderRadius: 16, padding: mob ? 24 : 40, textAlign: "center" }}>
              <h3 style={{ fontSize: mob ? 18 : 20, fontWeight: 700, color: V.g900, margin: "0 0 8px", fontFamily: F }}>{t(C.bookTitle, lang)}</h3>
              <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, color: V.g600, margin: "0 0 24px", fontFamily: F }}>{t(C.bookDesc, lang)}</p>
              <Btn variant="dark" mob={mob}>{t(C.bookBtn, lang)}</Btn>
            </div>
            <div style={{ background: V.g100, borderRadius: 16, padding: mob ? 24 : 40 }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 24px", fontFamily: F }}>{t(C.otherTitle, lang)}</h3>
              <p style={{ fontSize: mob ? 11 : 12, fontWeight: 600, color: V.g400, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px", fontFamily: F }}>{t(C.emailLabel, lang)}</p>
              <p style={{ fontSize: mob ? 14 : 15, fontWeight: 500, color: V.g900, margin: "0 0 20px", fontFamily: F }}>hello@avertris.com</p>
              <p style={{ fontSize: mob ? 11 : 12, fontWeight: 600, color: V.g400, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px", fontFamily: F }}>{t(C.responseLabel, lang)}</p>
              <p style={{ fontSize: mob ? 14 : 15, fontWeight: 500, color: V.g900, margin: 0, fontFamily: F }}>{t(C.responseValue, lang)}</p>
            </div>
            <div style={{ background: V.g100, borderRadius: 16, padding: mob ? 24 : 40 }}>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 24px", fontFamily: F }}>{t(C.presenceTitle, lang)}</h3>
              {[{ flag: "US", region: { en: "United States", es: "Estados Unidos" }, desc: { en: "Serving all 50 states", es: "Atendiendo los 50 estados" } }, { flag: "LA", region: { en: "Latin America", es: "América Latina" }, desc: { en: "Mexico, Colombia, Argentina", es: "México, Colombia, Argentina" } }].map((loc, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: i === 0 ? 20 : 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: V.g900, color: V.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: F }}>{loc.flag}</div>
                  <div><h4 style={{ fontSize: mob ? 14 : 15, fontWeight: 600, color: V.g900, margin: 0, fontFamily: F }}>{t(loc.region, lang)}</h4><p style={{ fontSize: mob ? 12 : 13, fontWeight: 300, color: V.g600, margin: 0, fontFamily: F }}>{t(loc.desc, lang)}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div></Box>
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
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "200px 1fr 1fr 1fr 280px", gap: mob ? 32 : 40, paddingBottom: mob ? 40 : 64 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("home")}>
              <div style={{ width: 32, height: 32, background: V.g900, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: V.primary, fontSize: 14, fontWeight: 800 }}>.a</div>
              <span style={{ fontSize: 18, fontWeight: 700, color: V.g900, letterSpacing: -0.5 }}>Avertris</span>
            </div>
            {t(FT.links, lang).map((l, i) => (
              <button key={i} onClick={() => go(["about", "blog", "cases", "about"][i])} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 400, color: V.g600, textAlign: "left", padding: "2px 0", fontFamily: F }}>{l}</button>
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
                <h4 style={{ fontSize: 13, fontWeight: 600, color: V.g900, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 20px" }}>{t(FT.industriesTitle, lang)}</h4>
                {t(FT.industries, lang).map(l => <p key={l} style={{ fontSize: 14, fontWeight: 400, color: V.g600, marginBottom: 12, cursor: "pointer" }}>{l}</p>)}
              </div>
            </>
          )}

          <div style={{ borderLeft: !mob ? `1px solid ${V.g200}` : "none", paddingLeft: !mob ? 40 : 0 }}>
            <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: V.g900, margin: "0 0 8px" }}>{t(FT.newsletter, lang)}</h3>
            <p style={{ fontSize: mob ? 12 : 13, fontWeight: 400, color: V.primary, margin: "0 0 20px" }}>{t(FT.newsletterSub, lang)}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="email" placeholder="Email *" style={{ fontFamily: F, fontSize: 14, padding: "12px 16px", border: `1px solid ${V.g200}`, borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" }} />
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <input type="checkbox" style={{ marginTop: 3, accentColor: V.primary }} />
                <span style={{ fontSize: 12, color: V.g400, lineHeight: 1.5 }}>{t(FT.consent, lang)}</span>
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

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState(() => {
    try { const bl = navigator.language || navigator.userLanguage || "en"; return bl.startsWith("es") ? "es" : "en"; } catch { return "en"; }
  });

  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pages = {
    home: <HomePage go={go} lang={lang} />,
    services: <ServicesPage go={go} lang={lang} />,
    cases: <CasesPage go={go} lang={lang} />,
    about: <AboutPage go={go} lang={lang} />,
    blog: <BlogPage lang={lang} />,
    contact: <ContactPage lang={lang} />,
  };

  return (
    <div style={{ fontFamily: F, fontSize: 14, fontWeight: 300, margin: 0, color: V.g900, overflowX: "hidden" }}>
      <Nav page={page} go={go} lang={lang} setLang={setLang} />
      <main>{pages[page]}</main>
      <FooterSection go={go} lang={lang} />
    </div>
  );
}
