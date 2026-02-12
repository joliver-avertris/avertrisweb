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
    h1a: { en: "Your business is", es: "Tu negocio está" },
    h1b: { en: "bleeding cash.", es: "perdiendo dinero." },
    h1c: { en: "We stop it.", es: "Nosotros lo paramos." },
    ctaCases: { en: "See how we fixed it for others", es: "Mira cómo lo resolvimos para otros" },
    ctaTalk: { en: "Find my cash leaks", es: "Encontrar mis fugas de dinero" },
    svc: [
      { t: { en: "Losing clients to slow operations?", es: "¿Perdiendo clientes por operaciones lentas?" }, d: { en: "We build AI agents, chatbots, and custom software that eliminate the manual bottlenecks costing you deals right now", es: "Construimos agentes de IA, chatbots y software a medida que eliminan los cuellos de botella manuales que te están costando clientes ahora mismo" } },
      { t: { en: "Wasting hours on broken tools?", es: "¿Desperdiciando horas en herramientas rotas?" }, d: { en: "Our ready-to-deploy AI CRM, chatbot SaaS, and Dealer Manager replace the patchwork of disconnected tools draining your team's time", es: "Nuestro CRM con IA, chatbot SaaS y Dealer Manager reemplazan el parche de herramientas desconectadas que drenan el tiempo de tu equipo" } },
      { t: { en: "Burning ad spend with no ROI?", es: "¿Quemando presupuesto en ads sin ROI?" }, d: { en: "Our growth team finds exactly where your marketing dollars are being wasted and redirects every cent toward revenue", es: "Nuestro equipo de growth encuentra exactamente dónde se está desperdiciando tu inversión en marketing y redirige cada centavo hacia ingresos" } },
    ],
  },
  clients: { label: { en: "Trusted by growing companies", es: "Empresas que confían en nosotros" } },
  results: {
    label: { en: "Cash recovered", es: "Dinero recuperado" },
    title: { en: "Money our clients<br/>stopped losing", es: "Dinero que nuestros clientes<br/>dejaron de perder" },
    stats: [
      { n: "60", s: "%", l: { en: "Less Wasted Ad Spend", es: "Menos Desperdicio en Ads" }, d: { en: "Clients were burning thousands monthly on ads with zero attribution. We found the leaks in weeks, not months.", es: "Clientes quemaban miles mensuales en ads sin atribución. Encontramos las fugas en semanas, no meses." } },
      { n: "40", s: "hr", l: { en: "Saved Per Week", es: "Ahorradas Por Semana" }, d: { en: "Manual data entry, spreadsheet chaos, copy-pasting between tools — replaced with AI automation that runs 24/7", es: "Ingreso manual de datos, caos de spreadsheets, copy-paste entre herramientas — reemplazado con automatización IA 24/7" } },
      { n: "3.2", s: "x", l: { en: "Revenue Recovery", es: "Recuperación de Ingresos" }, d: { en: "Average revenue increase after we fix broken funnels, automate follow-ups, and stop leads from falling through cracks", es: "Aumento promedio de ingresos tras arreglar embudos rotos, automatizar seguimientos y evitar que los leads se pierdan" } },
      { n: "0", s: "", l: { en: "Clients Lost to Chaos", es: "Clientes Perdidos por Caos" }, d: { en: "After deploying our systems, zero clients lost due to missed follow-ups, slow response times, or operational failures", es: "Después de implementar nuestros sistemas, cero clientes perdidos por seguimientos perdidos, tiempos lentos o fallas operativas" } },
    ],
  },
  capabilities: {
    title: { en: "The bleeding stops<br/>here", es: "Aquí se detiene<br/>la hemorragia" },
    cta: { en: "Show me where I'm losing money", es: "Muéstrame dónde pierdo dinero" },
    items: [
      { title: { en: "Leads dying\nin your inbox", es: "Leads muriendo\nen tu bandeja" }, icon: "◇", sub: { en: "AI agents that respond in seconds, not hours", es: "Agentes IA que responden en segundos, no horas" } },
      { title: { en: "Ad spend going\nto zero ROI", es: "Inversión en ads\ncon cero ROI" }, icon: "↗", sub: { en: "Attribution tracking that shows every dollar's path", es: "Rastreo de atribución que muestra el camino de cada dólar" } },
      { title: { en: "Staff drowning in\nmanual work", es: "Staff ahogándose en\ntrabajo manual" }, icon: "</>", sub: { en: "Custom automations that free 40+ hours/week", es: "Automatizaciones que liberan 40+ horas/semana" } },
      { title: { en: "Clients leaving\nfrom slow service", es: "Clientes yéndose\npor servicio lento" }, icon: "⟳", sub: { en: "AI CRM with instant follow-ups and zero missed leads", es: "CRM con IA, seguimientos instantáneos y cero leads perdidos" } },
      { title: { en: "Invisible online\npresence", es: "Presencia online\ninvisible" }, icon: "▤", sub: { en: "SEO + content that puts you where buyers are searching", es: "SEO + contenido que te pone donde buscan tus compradores" } },
      { title: { en: "No idea what's\nactually working", es: "Sin idea de qué\nfunciona realmente" }, icon: "◎", sub: { en: "Dashboards that show exactly where cash comes from", es: "Dashboards que muestran exactamente de dónde viene el dinero" } },
    ],
  },
  whyUs: {
    label: { en: "Why Avertris", es: "Por qué Avertris" },
    title: { en: "Every day you wait,<br/>you lose more", es: "Cada día que esperas,<br/>pierdes más" },
    desc: { en: "Right now, leads are going cold in your inbox. Your team is burning hours on tasks a bot could do in seconds. Your ad budget is feeding Meta and Google instead of your pipeline. And your competitors are getting faster while you coordinate between 3 agencies that don't talk to each other.", es: "Ahora mismo, leads se enfrían en tu bandeja. Tu equipo quema horas en tareas que un bot haría en segundos. Tu presupuesto de ads alimenta a Meta y Google en vez de tu pipeline. Y tus competidores se vuelven más rápidos mientras tú coordinas entre 3 agencias que no se hablan." },
    cta: { en: "Stop the bleeding — talk to us", es: "Detén la hemorragia — habla con nosotros" },
    items: [
      { icon: "◉", title: { en: "One throat to choke", es: "Un solo responsable" }, desc: { en: "Software + Marketing + AI from one team. When something breaks at 2am, there's no finger-pointing between agencies. We own it.", es: "Software + Marketing + IA de un solo equipo. Cuando algo falla a las 2am, no hay culpas entre agencias. Nosotros respondemos." } },
      { icon: "◈", title: { en: "Your clients speak two languages", es: "Tus clientes hablan dos idiomas" }, desc: { en: "Losing LATAM clients because your tools are English-only? Losing US clients because your team can't communicate? We're native in both.", es: "¿Perdiendo clientes LATAM porque tus herramientas son solo en inglés? ¿Perdiendo clientes US porque tu equipo no se comunica? Somos nativos en ambos." } },
      { icon: "↗", title: { en: "Half the cost, zero excuses", es: "Mitad del costo, cero excusas" }, desc: { en: "Enterprise-grade work at 40-50% less than US agencies. Same timezone, same quality, no offshore communication nightmares.", es: "Trabajo de nivel empresarial a 40-50% menos que agencias US. Misma zona horaria, misma calidad, sin pesadillas de comunicación offshore." } },
      { icon: "◎", title: { en: "We diagnose before we prescribe", es: "Diagnosticamos antes de recetar" }, desc: { en: "We won't sell you a $50K platform when a $2K automation fixes your actual problem. Our consulting finds the real bleeding — not what we want to sell.", es: "No te venderemos una plataforma de $50K cuando una automatización de $2K resuelve tu problema real. Nuestra consultoría encuentra la hemorragia real — no lo que queremos vender." } },
    ],
  },
  testimonials: {
    label: { en: "The bleeding stopped", es: "La hemorragia se detuvo" },
    title: { en: "They were losing money.<br/>Then they called us.", es: "Estaban perdiendo dinero.<br/>Entonces nos llamaron." },
    items: [
      { name: "Carlos Méndez", role: { en: "CEO, Catojisa", es: "CEO, Catojisa" }, quote: { en: "We were losing clients because our team couldn't keep up — everything ran on spreadsheets and WhatsApp. Avertris built us an AI-powered platform that cut response time by 70%. We stopped bleeding clients within the first month.", es: "Perdíamos clientes porque nuestro equipo no daba abasto — todo corría en hojas de cálculo y WhatsApp. Avertris nos construyó una plataforma con IA que redujo el tiempo de respuesta en 70%. Dejamos de perder clientes en el primer mes." } },
      { name: "María Rodriguez", role: { en: "COO, AutoPlus Dealers", es: "COO, AutoPlus Dealers" }, quote: { en: "Our dealership was hemorrhaging time — staff juggling 5 different tools, leads falling through cracks daily. Dealer Manager consolidated everything. We recovered 30+ hours per week and haven't lost a lead since.", es: "Nuestro concesionario sangraba tiempo — staff haciendo malabares con 5 herramientas, leads perdiéndose diariamente. Dealer Manager lo consolidó todo. Recuperamos 30+ horas semanales y no hemos perdido un lead desde entonces." } },
      { name: "David Chen", role: { en: "VP Marketing, TechScale Inc", es: "VP Marketing, TechScale Inc" }, quote: { en: "We were burning $15K/month on ads with zero attribution — literally lighting money on fire. Avertris found where every dollar was going, killed the waste, and our cost per acquisition dropped 60% in 3 months.", es: "Quemábamos $15K/mes en ads sin atribución — literalmente prendiendo fuego al dinero. Avertris encontró a dónde iba cada dólar, eliminó el desperdicio, y nuestro costo por adquisición bajó 60% en 3 meses." } },
    ],
  },
  leadMagnet: {
    label: { en: "Find the leaks", es: "Encuentra las fugas" },
    title: { en: "How much money is<br/>your business losing?", es: "¿Cuánto dinero está<br/>perdiendo tu negocio?" },
    desc: { en: "Take our free Cash Leak Assessment — a 10-minute diagnostic that reveals exactly where your business is hemorrhaging money through broken tools, manual processes, wasted ad spend, and lost leads. Most companies find $5K-50K in monthly waste.", es: "Toma nuestro Assessment de Fugas de Dinero gratuito — un diagnóstico de 10 minutos que revela exactamente dónde tu negocio pierde dinero por herramientas rotas, procesos manuales, inversión en ads desperdiciada y leads perdidos. La mayoría de empresas encuentran $5K-50K en desperdicio mensual." },
    bullets: {
      en: ["Find exactly where cash is leaking from your operations", "Get a dollar estimate of your monthly waste", "See how you compare to 100+ businesses we've diagnosed", "Get a prioritized fix-it plan — even if you never hire us"],
      es: ["Encuentra exactamente dónde se fuga el dinero de tus operaciones", "Obtén una estimación en dólares de tu desperdicio mensual", "Compárate con 100+ negocios que hemos diagnosticado", "Recibe un plan de acción priorizado — aunque nunca nos contrates"],
    },
    emailPh: { en: "Your work email", es: "Tu correo corporativo" },
    btn: { en: "Find my cash leaks", es: "Encontrar mis fugas de dinero" },
    note: { en: "No spam. Unsubscribe anytime.", es: "Sin spam. Cancela cuando quieras." },
  },
  process: {
    label: { en: "How we stop the bleeding", es: "Cómo detenemos la hemorragia" },
    title: { en: "Triage → Fix → Scale", es: "Triaje → Reparar → Escalar" },
    cta: { en: "Get your free triage call", es: "Agenda tu llamada de triaje gratis" },
    steps: [
      { num: "01", title: { en: "Diagnose the Bleeding", es: "Diagnosticar la Hemorragia" }, desc: { en: "We find where you're losing money — not where we want to sell. A paid strategic triage that maps every cash leak, time sink, and lost-client pattern in your business.", es: "Encontramos dónde pierdes dinero — no dónde queremos vender. Un triaje estratégico pagado que mapea cada fuga de dinero, pérdida de tiempo y patrón de clientes perdidos en tu negocio." }, details: { en: ["Cash leak identification & quantification", "Operations bottleneck mapping", "Ad spend waste audit", "Lost-client root cause analysis"], es: ["Identificación y cuantificación de fugas de dinero", "Mapeo de cuellos de botella operativos", "Auditoría de desperdicio en ads", "Análisis de causa raíz de clientes perdidos"] } },
      { num: "02", title: { en: "Stop the Hemorrhage", es: "Detener la Hemorragia" }, desc: { en: "We fix the biggest leaks first. Agile sprints with weekly demos — you see money being saved every week, not a surprise invoice at the end.", es: "Arreglamos las fugas más grandes primero. Sprints ágiles con demos semanales — ves dinero ahorrándose cada semana, no una factura sorpresa al final." }, details: { en: ["Quick-win fixes deployed first", "Weekly progress demos & ROI tracking", "Parallel execution across all pillars", "Real-time dashboards so you see savings"], es: ["Fixes rápidos desplegados primero", "Demos semanales y seguimiento de ROI", "Ejecución paralela en todos los pilares", "Dashboards en tiempo real para ver ahorros"] } },
      { num: "03", title: { en: "Scale What Works", es: "Escalar Lo Que Funciona" }, desc: { en: "Once the bleeding stops, we pour fuel on what's working. Monthly strategy reviews ensure every dollar compounds — not just gets spent.", es: "Una vez que la hemorragia para, le metemos gasolina a lo que funciona. Revisiones estratégicas mensuales aseguran que cada dólar se multiplique — no solo se gaste." }, details: { en: ["Performance optimization & A/B testing", "Revenue attribution tracking", "Monthly strategy reviews", "Scaling playbook for sustained growth"], es: ["Optimización de rendimiento y pruebas A/B", "Seguimiento de atribución de ingresos", "Revisiones estratégicas mensuales", "Playbook de escalamiento para crecimiento sostenido"] } },
    ],
  },
  team: {
    label: { en: "Our team", es: "Nuestro equipo" },
    title: { en: "People behind<br/>the results", es: "Las personas detrás<br/>de los resultados" },
    founderRole: { en: "Founder & CEO", es: "Fundador y CEO" },
    founderBio: { en: "Based in Santo Domingo, Dominican Republic, with deep roots in US and LATAM markets. Founded Avertris because mid-market companies deserve the same technology, marketing, and AI firepower that Fortune 500s have — at a fraction of the cost. Every project starts with a conversation, not a proposal.", es: "Basado en Santo Domingo, República Dominicana, con raíces profundas en los mercados de USA y LATAM. Fundó Avertris porque las empresas medianas merecen la misma tecnología, marketing e IA que tienen las Fortune 500 — a una fracción del costo. Cada proyecto empieza con una conversación, no con una propuesta." },
    members: [
      { ini: "EN", name: { en: "Head of Engineering", es: "Dir. de Ingeniería" }, role: { en: "Software & AI Development", es: "Desarrollo de Software e IA" }, desc: { en: "Full-stack architect, 10+ years. Specializes in AI integrations, React, Node.js, Python.", es: "Arquitecto full-stack, 10+ años. Especialista en integraciones de IA, React, Node.js, Python." } },
      { ini: "MK", name: { en: "Growth Lead", es: "Líder de Crecimiento" }, role: { en: "Marketing & Revenue", es: "Marketing e Ingresos" }, desc: { en: "Bilingual performance marketer. Paid ads, SEO, CRO. Managed $2M+ in ad spend across US/LATAM.", es: "Performance marketer bilingüe. Paid ads, SEO, CRO. Ha gestionado $2M+ en inversión publicitaria en US/LATAM." } },
      { ini: "AI", name: { en: "AI Director", es: "Director de IA" }, role: { en: "AI Strategy & Automation", es: "Estrategia de IA y Automatización" }, desc: { en: "AI agent development, chatbot architecture, voice integration, process automation.", es: "Desarrollo de agentes IA, arquitectura de chatbots, integración de voz, automatización de procesos." } },
    ],
  },
  faq: {
    label: { en: "Frequently asked questions", es: "Preguntas frecuentes" },
    title: { en: "Questions we hear<br/>every week", es: "Preguntas que escuchamos<br/>cada semana" },
    items: [
      { q: { en: "What does Avertris do?", es: "¿Qué hace Avertris?" }, a: { en: "Avertris is an AI consulting, custom software development, and growth marketing agency headquartered in Santo Domingo, Dominican Republic. We help mid-market businesses in the USA, Dominican Republic, and Latin America stop losing money through disconnected tools by building AI-powered software, marketing automation, and data-driven growth systems. Our three pillars are: Technology (AI agents, chatbots, custom apps), Products (AI CRM, Chatbot SaaS, Dealer Manager), and Growth Marketing (paid ads, SEO, email, attribution).", es: "Avertris es una agencia de consultoría de IA, desarrollo de software a medida y marketing de crecimiento con sede en Santo Domingo, República Dominicana. Ayudamos a empresas medianas en USA, República Dominicana y América Latina a dejar de perder dinero con herramientas desconectadas, construyendo software potenciado con IA, automatización de marketing y sistemas de crecimiento basados en datos." } },
      { q: { en: "Where is Avertris located?", es: "¿Dónde está ubicada Avertris?" }, a: { en: "We're headquartered in Santo Domingo, Dominican Republic, with teams across the Americas including the United States, Mexico, Colombia, and Argentina. We serve clients in all 50 US states, the Dominican Republic, and key Latin American markets. Our team is fully bilingual (English and Spanish) and timezone-aligned with US business hours.", es: "Nuestra sede está en Santo Domingo, República Dominicana, con equipos en las Américas incluyendo Estados Unidos, México, Colombia y Argentina. Atendemos clientes en los 50 estados de EE.UU., República Dominicana y mercados clave de América Latina. Nuestro equipo es completamente bilingüe (inglés y español) y alineado con horarios de oficina de USA." } },
      { q: { en: "How much do your services cost?", es: "¿Cuánto cuestan sus servicios?" }, a: { en: "Our pricing varies by service: Strategic consultations range from $500-$1,500, SEO services start at $1,500/month, growth marketing packages start at $2,500/month, AI CRM subscriptions are $300-$600/month, and custom software development ranges from $600-$5,000+. Every engagement starts with a free 30-minute triage call — no obligation.", es: "Nuestros precios varían por servicio: Consultorías estratégicas van de $500-$1,500, servicios de SEO desde $1,500/mes, paquetes de growth marketing desde $2,500/mes, suscripciones de CRM con IA $300-$600/mes, y desarrollo de software a medida desde $600-$5,000+. Todo comienza con una llamada de triaje gratuita de 30 minutos." } },
      { q: { en: "Do you work with businesses in the Dominican Republic?", es: "¿Trabajan con negocios en República Dominicana?" }, a: { en: "Absolutely. We're headquartered in Santo Domingo and have deep roots in the Dominican market. We serve businesses across the DR with AI consulting, custom software, growth marketing, SEO, and our product suite. Our bilingual team understands the local market, regulations, and business culture.", es: "Por supuesto. Nuestra sede está en Santo Domingo y tenemos raíces profundas en el mercado dominicano. Atendemos negocios en toda la RD con consultoría de IA, software a medida, growth marketing, SEO y nuestra suite de productos. Nuestro equipo bilingüe entiende el mercado local, regulaciones y cultura de negocios." } },
      { q: { en: "What is the Cash Leak Assessment?", es: "¿Qué es el Assessment de Fugas de Dinero?" }, a: { en: "The Cash Leak Assessment is a free 10-minute diagnostic that reveals exactly where your business is hemorrhaging money through broken processes, wasted ad spend, dead leads, and manual chaos. You get a Cash Leak Score (0-100), a visual Leak Map, a prioritized Fix-It Plan, and benchmark comparisons against 100+ diagnosed businesses. It's free with no obligation.", es: "El Assessment de Fugas de Dinero es un diagnóstico gratuito de 10 minutos que revela exactamente dónde tu negocio pierde dinero por procesos rotos, inversión en ads desperdiciada, leads muertos y caos manual. Obtienes un Puntaje de Fugas (0-100), un Mapa de Fugas visual, un Plan de Reparación priorizado y comparaciones con 100+ negocios diagnosticados. Es gratis sin compromiso." } },
      { q: { en: "How fast will I see results?", es: "¿Qué tan rápido veré resultados?" }, a: { en: "Our average client sees measurable improvements within 2-4 weeks. Quick wins like AI chatbot deployment and ad spend optimization deliver results in days. Larger implementations (custom software, full marketing stack) typically show ROI within 60-90 days. We start every engagement by fixing the biggest, most costly leak first.", es: "Nuestro cliente promedio ve mejoras medibles en 2-4 semanas. Victorias rápidas como implementación de chatbot IA y optimización de ads entregan resultados en días. Implementaciones más grandes (software a medida, stack de marketing completo) típicamente muestran ROI en 60-90 días. Comenzamos cada proyecto arreglando la fuga más grande y costosa primero." } },
    ],
  },
  cta: {
    title: { en: "Every hour you wait,<br/>you lose more<br/>money.", es: "Cada hora que esperas,<br/>pierdes más<br/>dinero." },
    desc: { en: "Book a free 30-minute triage call. We'll show you exactly where your business is bleeding cash — and the fastest way to stop it. No pitch, no obligation. Just a diagnosis.", es: "Agenda una llamada de triaje gratuita de 30 minutos. Te mostraremos exactamente dónde tu negocio pierde dinero — y la forma más rápida de detenerlo. Sin pitch, sin compromiso. Solo un diagnóstico." },
    btn: { en: "Stop the bleeding now", es: "Detener la hemorragia ahora" },
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
    storyP1: { en: "Avertris was founded in the Dominican Republic with a clear vision: mid-market businesses across the US, the Caribbean, and Latin America deserve the same caliber of technology, marketing, and AI expertise that Fortune 500 companies enjoy — without the enterprise price tag.", es: "Avertris fue fundada en República Dominicana con una visión clara: las empresas medianas en EE.UU., el Caribe y América Latina merecen la misma calidad de tecnología, marketing e IA que disfrutan las Fortune 500 — sin el precio empresarial." },
    storyP2: { en: "We are a bilingual, bicultural team headquartered in Santo Domingo that understands both US and LATAM markets intimately. Our nearshore model means timezone-aligned collaboration, cultural fluency, and cost-efficient delivery.", es: "Somos un equipo bilingüe y bicultural con sede en Santo Domingo que entiende los mercados de EE.UU. y LATAM. Nuestro modelo nearshore significa colaboración alineada en zona horaria, fluidez cultural y entrega eficiente." },
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
    presenceDesc: { en: "Headquartered in the Dominican Republic with teams across the Americas, serving clients in all 50 US states and key LATAM markets.", es: "Con sede en República Dominicana y equipos en las Américas, atendiendo clientes en los 50 estados de EE.UU. y mercados clave de LATAM." },
    locations: [
      { region: { en: "Dominican Republic", es: "República Dominicana" }, desc: { en: "Headquarters & operations hub", es: "Sede principal y centro de operaciones" }, flag: "DO" },
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
    subtitle: { en: "Actionable insights on AI, growth marketing, and software for mid-market businesses in the Dominican Republic, USA, and Latin America.", es: "Perspectivas accionables sobre IA, marketing de crecimiento y software para empresas medianas en República Dominicana, USA y América Latina." },
    filters: { en: ["All", "AI", "Marketing", "Software", "Dominican Republic"], es: ["Todos", "IA", "Marketing", "Software", "República Dominicana"] },
    posts: [
      /* — DR / Local SEO — */
      { cat: "Dominican Republic", title: { en: "AI for Dominican Republic Businesses: How Local Companies Are Automating in 2026", es: "IA para Negocios en República Dominicana: Cómo las Empresas Locales Automatizan en 2026" }, desc: { en: "From Santo Domingo to Santiago, Dominican businesses are deploying AI chatbots, CRM automation, and marketing analytics to compete globally. Here's what's working — and what's wasting money.", es: "Desde Santo Domingo hasta Santiago, empresas dominicanas están implementando chatbots de IA, automatización de CRM y analítica de marketing para competir globalmente. Esto es lo que funciona — y lo que desperdicia dinero." }, date: { en: "Feb 10, 2026", es: "10 Feb, 2026" }, read: { en: "10 min read", es: "10 min de lectura" }, keywords: "AI Dominican Republic, chatbot Santo Domingo, CRM automation Dominican Republic, AI consulting DR" },
      { cat: "Dominican Republic", title: { en: "Digital Marketing in the Dominican Republic: What's Actually Working in 2026", es: "Marketing Digital en República Dominicana: Qué Funciona Realmente en 2026" }, desc: { en: "The Dominican digital market is booming. We break down which channels deliver ROI for DR businesses — paid social, Google Ads, SEO en español, WhatsApp marketing, and more.", es: "El mercado digital dominicano está en auge. Desglosamos qué canales generan ROI para negocios en RD — redes sociales pagadas, Google Ads, SEO en español, marketing por WhatsApp y más." }, date: { en: "Feb 7, 2026", es: "7 Feb, 2026" }, read: { en: "8 min read", es: "8 min de lectura" }, keywords: "digital marketing Dominican Republic, SEO Santo Domingo, Google Ads DR, social media marketing RD" },
      /* — AI — */
      { cat: "AI", title: { en: "How to Choose the Right AI Strategy for Your Mid-Market Business", es: "Cómo Elegir la Estrategia de IA Correcta para tu Empresa Mediana" }, desc: { en: "Most mid-market companies waste $10K-$50K on AI that never ships. A practical framework for evaluating AI opportunities, avoiding vendor traps, and prioritizing integrations that drive measurable ROI within 90 days.", es: "La mayoría de empresas medianas desperdician $10K-$50K en IA que nunca se implementa. Un marco práctico para evaluar oportunidades de IA, evitar trampas de proveedores y priorizar integraciones que generen ROI medible en 90 días." }, date: { en: "Feb 5, 2026", es: "5 Feb, 2026" }, read: { en: "8 min read", es: "8 min de lectura" }, keywords: "AI strategy mid-market, AI ROI, AI consulting, business AI implementation" },
      { cat: "AI", title: { en: "AI Chatbots for Business: Cut Response Time by 70% Without Losing the Human Touch", es: "Chatbots de IA para Negocios: Reduce el Tiempo de Respuesta 70% Sin Perder el Toque Humano" }, desc: { en: "78% of leads go cold because businesses respond too slowly. Learn how AI chatbots qualify leads, book meetings, and handle support in English and Spanish — 24/7, with real ROI data from deployments in DR and USA.", es: "78% de los leads se enfrían porque los negocios responden muy lento. Aprende cómo los chatbots de IA califican leads, agendan reuniones y manejan soporte en inglés y español — 24/7, con datos reales de ROI de implementaciones en RD y USA." }, date: { en: "Feb 2, 2026", es: "2 Feb, 2026" }, read: { en: "7 min read", es: "7 min de lectura" }, keywords: "AI chatbot business, chatbot lead qualification, bilingual chatbot, chatbot ROI" },
      { cat: "AI", title: { en: "LLM Integration: From Proof of Concept to Production in 90 Days", es: "Integración de LLMs: De Prueba de Concepto a Producción en 90 Días" }, desc: { en: "Lessons from deploying large language models in real business workflows at mid-market companies. We cover costs, timelines, common failure points, and the architecture decisions that matter.", es: "Lecciones de implementar modelos de lenguaje en flujos de negocio reales en empresas medianas. Cubrimos costos, plazos, puntos comunes de fallo y las decisiones de arquitectura que importan." }, date: { en: "Jan 8, 2026", es: "8 Ene, 2026" }, read: { en: "10 min read", es: "10 min de lectura" }, keywords: "LLM integration, AI deployment, large language model business, AI production deployment" },
      /* — Marketing — */
      { cat: "Marketing", title: { en: "SEO for Bilingual Businesses: How to Rank in English and Spanish Simultaneously", es: "SEO para Negocios Bilingües: Cómo Posicionarse en Inglés y Español Simultáneamente" }, desc: { en: "Serving customers in both English and Spanish? Most bilingual businesses lose 50% of their organic traffic to poor internationalization. Technical and content strategies for dominating search in two languages.", es: "¿Sirves clientes en inglés y español? La mayoría de negocios bilingües pierden 50% de su tráfico orgánico por mala internacionalización. Estrategias técnicas y de contenido para dominar las búsquedas en dos idiomas." }, date: { en: "Jan 28, 2026", es: "28 Ene, 2026" }, read: { en: "6 min read", es: "6 min de lectura" }, keywords: "bilingual SEO, Spanish SEO, English Spanish website, multilingual SEO strategy" },
      { cat: "Marketing", title: { en: "Stop Wasting Ad Spend: Revenue Attribution for Mid-Market Companies", es: "Deja de Desperdiciar en Ads: Atribución de Ingresos para Empresas Medianas" }, desc: { en: "The average mid-market company wastes 40-60% of ad spend on channels that produce zero revenue. How to set up revenue attribution that tracks every dollar from click to closed deal.", es: "La empresa mediana promedio desperdicia 40-60% de su inversión en ads en canales que producen cero ingresos. Cómo configurar atribución de ingresos que rastrea cada dólar desde el clic hasta el cierre." }, date: { en: "Jan 20, 2026", es: "20 Ene, 2026" }, read: { en: "9 min read", es: "9 min de lectura" }, keywords: "revenue attribution, ad spend optimization, marketing ROI, marketing analytics" },
      { cat: "Marketing", title: { en: "The Growth Marketing Playbook for LATAM Expansion", es: "El Playbook de Marketing de Crecimiento para Expansión en LATAM" }, desc: { en: "Expanding from the US to Latin America — or from LATAM to the US? Channel strategies, localization pitfalls, and realistic budgets for cross-border growth. Real data from campaigns in Dominican Republic, Mexico, and Colombia.", es: "¿Expandiendo de USA a América Latina — o de LATAM a USA? Estrategias de canales, errores de localización y presupuestos realistas para crecimiento transfronterizo. Datos reales de campañas en República Dominicana, México y Colombia." }, date: { en: "Dec 20, 2025", es: "20 Dic, 2025" }, read: { en: "9 min read", es: "9 min de lectura" }, keywords: "LATAM marketing, growth marketing Latin America, US LATAM expansion, cross-border marketing" },
      /* — Software — */
      { cat: "Software", title: { en: "When to Build Custom Software vs. Buy Off-the-Shelf: A Decision Framework", es: "Cuándo Construir Software a Medida vs. Comprar: Un Marco de Decisión" }, desc: { en: "Every mid-market company faces this choice. We break down the real costs, hidden risks, and decision criteria — with examples from businesses in the Dominican Republic and USA that chose each path.", es: "Toda empresa mediana enfrenta esta decisión. Desglosamos los costos reales, riesgos ocultos y criterios de decisión — con ejemplos de negocios en República Dominicana y USA que eligieron cada camino." }, date: { en: "Jan 15, 2026", es: "15 Ene, 2026" }, read: { en: "7 min read", es: "7 min de lectura" }, keywords: "custom software vs off the shelf, build vs buy software, software development cost, custom software mid-market" },
      { cat: "Software", title: { en: "CRM for Small and Mid-Market Businesses: Why Most Implementations Fail (And How to Fix It)", es: "CRM para PyMEs y Empresas Medianas: Por Qué la Mayoría de Implementaciones Fallan (Y Cómo Arreglarlo)" }, desc: { en: "63% of CRM implementations fail to deliver expected ROI. The problem isn't the software — it's the process. How to implement a CRM that your team actually uses and that generates revenue.", es: "63% de las implementaciones de CRM fallan en entregar el ROI esperado. El problema no es el software — es el proceso. Cómo implementar un CRM que tu equipo realmente use y que genere ingresos." }, date: { en: "Jan 5, 2026", es: "5 Ene, 2026" }, read: { en: "8 min read", es: "8 min de lectura" }, keywords: "CRM implementation, CRM mid-market, AI CRM, CRM failure rate, CRM best practices" },
      { cat: "Software", title: { en: "API-First Architecture: Why It Matters for Growing Businesses", es: "Arquitectura API-First: Por Qué Importa para Negocios en Crecimiento" }, desc: { en: "How API-first design creates flexibility and future-proofs your stack. Real examples from mid-market companies that saved 6+ months of development time.", es: "Cómo el diseño API-first crea flexibilidad y protege tu stack a futuro. Ejemplos reales de empresas medianas que ahorraron 6+ meses de desarrollo." }, date: { en: "Dec 12, 2025", es: "12 Dic, 2025" }, read: { en: "5 min read", es: "5 min de lectura" }, keywords: "API-first architecture, API design, software architecture, scalable software" },
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
  /* ── Products Hub ── */
  productsPage: {
    label: { en: "Products", es: "Productos" },
    title: { en: "Tools that stop<br/>the bleeding", es: "Herramientas que detienen<br/>la hemorragia" },
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
    title: { en: "Your business is leaking<br/>$5K–$50K every month.", es: "Tu negocio está perdiendo<br/>$5K–$50K cada mes." },
    subtitle: { en: "You just don't know where yet.", es: "Solo que aún no sabes dónde." },
    heroDesc: { en: "The Cash Leak Assessment is a free 10-minute diagnostic that shows you exactly where your business hemorrhages money through broken processes, wasted ad spend, dead leads, and manual chaos.", es: "El Assessment de Fugas de Dinero es un diagnóstico gratuito de 10 minutos que te muestra exactamente dónde tu negocio pierde dinero por procesos rotos, inversión en ads desperdiciada, leads muertos y caos manual." },
    heroCta: { en: "Take the free assessment", es: "Tomar el assessment gratis" },
    /* Pain section */
    painLabel: { en: "Sound familiar?", es: "¿Te suena familiar?" },
    painTitle: { en: "These are the silent killers<br/>eating your revenue", es: "Estos son los asesinos silenciosos<br/>que devoran tus ingresos" },
    pains: [
      { icon: "💸", title: { en: "Ad spend with zero attribution", es: "Inversión en ads sin atribución" }, desc: { en: "You're spending $5K-$50K/month on ads but can't tell which campaigns actually bring in revenue. You're funding Meta and Google — not your pipeline.", es: "Gastas $5K-$50K/mes en ads pero no puedes decir qué campañas generan ingresos realmente. Estás financiando a Meta y Google — no tu pipeline." } },
      { icon: "⏰", title: { en: "40+ hours/week in manual tasks", es: "40+ horas/semana en tareas manuales" }, desc: { en: "Your team copy-pastes between tools, manually enters data, and chases leads through WhatsApp. That's $2K-$8K/month in wasted labor — every month.", es: "Tu equipo copia-pega entre herramientas, ingresa datos manualmente y persigue leads por WhatsApp. Son $2K-$8K/mes en mano de obra desperdiciada — cada mes." } },
      { icon: "🚪", title: { en: "Leads dying in your inbox", es: "Leads muriendo en tu bandeja" }, desc: { en: "The average business loses 78% of leads because they respond too slowly. Each lost lead is $500-$5,000 in lifetime value — gone forever.", es: "El negocio promedio pierde 78% de sus leads porque responde muy lento. Cada lead perdido son $500-$5,000 en valor de vida — perdidos para siempre." } },
      { icon: "🔧", title: { en: "5+ disconnected tools", es: "5+ herramientas desconectadas" }, desc: { en: "CRM doesn't talk to your email tool, which doesn't talk to your ad platform. Every disconnection is a leak. Every leak is cash in the drain.", es: "El CRM no habla con tu herramienta de email, que no habla con tu plataforma de ads. Cada desconexión es una fuga. Cada fuga es dinero en el desagüe." } },
    ],
    /* What you get */
    getLabel: { en: "What you get", es: "Qué obtienes" },
    getTitle: { en: "In 10 minutes, you'll know<br/>exactly where the money goes", es: "En 10 minutos, sabrás<br/>exactamente a dónde va el dinero" },
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
    ctaTitle: { en: "Stop guessing.<br/>Start diagnosing.", es: "Deja de adivinar.<br/>Empieza a diagnosticar." },
    ctaDesc: { en: "The assessment is free, takes 10 minutes, and gives you a dollar-amount estimate of how much your business is losing. Even if you never hire us — you keep the diagnosis.", es: "El assessment es gratis, toma 10 minutos y te da una estimación en dólares de cuánto pierde tu negocio. Aunque nunca nos contrates — te quedas con el diagnóstico." },
    ctaBtn: { en: "Take the Cash Leak Assessment — Free", es: "Tomar el Assessment de Fugas — Gratis" },
    ctaNote: { en: "No credit card. No spam. Just a diagnosis.", es: "Sin tarjeta de crédito. Sin spam. Solo un diagnóstico." },
    emailPh: { en: "Your work email", es: "Tu correo corporativo" },
    namePh: { en: "Your name", es: "Tu nombre" },
    companyPh: { en: "Company name", es: "Nombre de empresa" },
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
          { heading: t(T.nav.megaTech, lang), items: [{ t: lang === "en" ? "AI Consulting & Agents" : "Consultoría e Agentes de IA", go: "services" }, { t: lang === "en" ? "AI Chatbot Development" : "Desarrollo de Chatbots IA", go: "services" }, { t: lang === "en" ? "AI Voice Integration" : "Integración de Voz con IA", go: "services" }, { t: lang === "en" ? "Custom Web & Mobile Apps" : "Apps Web y Móviles a Medida", go: "services" }] },
          { heading: t(T.nav.megaProducts, lang), items: [{ t: lang === "en" ? "Avertris AI CRM" : "Avertris AI CRM", go: "product-ai-crm" }, { t: lang === "en" ? "AI Chatbot SaaS" : "Chatbot SaaS con IA", go: "product-ai-chatbot" }, { t: lang === "en" ? "Dealer Manager (Automotive)" : "Dealer Manager (Automotriz)", go: "product-dealer-manager" }, { t: lang === "en" ? "Cash Leak Assessment" : "Assessment de Fugas", go: "product-cash-leak-assessment" }] },
          { heading: t(T.nav.megaGrowth, lang), items: [{ t: lang === "en" ? "Paid Ads & Performance" : "Paid Ads y Performance", go: "services" }, { t: lang === "en" ? "SEO & Content Strategy" : "SEO y Estrategia de Contenido", go: "services" }, { t: lang === "en" ? "Analytics & Attribution" : "Analítica y Atribución", go: "services" }, { t: lang === "en" ? "Email Marketing & CRO" : "Email Marketing y CRO", go: "services" }] },
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
              {[{ flag: "DO", region: { en: "Dominican Republic", es: "República Dominicana" }, desc: { en: "Headquarters", es: "Sede principal" } }, { flag: "US", region: { en: "United States", es: "Estados Unidos" }, desc: { en: "Serving all 50 states", es: "Atendiendo los 50 estados" } }, { flag: "LA", region: { en: "Latin America", es: "América Latina" }, desc: { en: "Mexico, Colombia, Argentina", es: "México, Colombia, Argentina" } }].map((loc, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: i < 2 ? 20 : 0 }}>
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
    products: <ProductsPage go={go} lang={lang} />,
    "product-ai-crm": <ProductsPage go={go} lang={lang} />,
    "product-ai-chatbot": <ProductsPage go={go} lang={lang} />,
    "product-dealer-manager": <ProductsPage go={go} lang={lang} />,
    "product-cash-leak-assessment": <CashLeakPage go={go} lang={lang} />,
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
