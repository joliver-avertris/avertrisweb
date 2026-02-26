import { useState, useEffect, useRef } from "react";

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
    cases: { en: "Case studies", es: "Casos de éxito" },
    about: { en: "About", es: "Nosotros" },
    blog: { en: "Blog", es: "Blog" },
    cta: { en: "Let's talk", es: "Hablemos" },
    products: { en: "Products", es: "Productos" },
    megaProducts: { en: "OUR PRODUCTS", es: "NUESTROS PRODUCTOS" },
    megaBuild: { en: "BUILD", es: "CONSTRUIR" },
    megaGrow: { en: "GROW", es: "CRECER" },
    megaTransform: { en: "TRANSFORM", es: "TRANSFORMAR" },
  },
  hero: {
    label: { en: "Custom Software", es: "Software a Medida" },
    labelSuffix: { en: "& Growth Marketing & AI Enablement Agency", es: "& Marketing de Crecimiento & Habilitación de IA" },
    h1a: { en: "Driving growth", es: "Impulsando el" },
    h1b: { en: "through Software", es: "crecimiento con" },
    h1c: { en: "& AI solutions", es: "Software e IA" },
    ctaCases: { en: "Read case studies", es: "Ver casos de éxito" },
    ctaTalk: { en: "Let's talk", es: "Hablemos" },
    svc: [
      { t: { en: "Custom Software", es: "Software a Medida" }, d: { en: "Design and build scalable web & mobile applications with modern tech stacks tailored to your business", es: "Diseñamos y construimos aplicaciones web y móviles escalables con tecnologías modernas adaptadas a tu negocio" } },
      { t: { en: "Growth Marketing", es: "Marketing de Crecimiento" }, d: { en: "Data-driven strategies that generate qualified leads and accelerate your revenue pipeline", es: "Estrategias basadas en datos que generan leads calificados y aceleran tu pipeline de ingresos" } },
      { t: { en: "AI Enablement", es: "Habilitación de IA" }, d: { en: "Practical AI integration that automates workflows and unlocks competitive advantages", es: "Integración práctica de IA que automatiza flujos y desbloquea ventajas competitivas" } },
    ],
  },
  clients: { label: { en: "Our clients", es: "Nuestros clientes" } },
  results: {
    label: { en: "Our track record", es: "Nuestro historial" },
    title: { en: "Results that speak<br/>for themselves", es: "Resultados que<br/>hablan por sí solos" },
    stats: [
      { n: "150", s: "+", l: { en: "Projects Delivered", es: "Proyectos Entregados" }, d: { en: "Across software, marketing, and AI for mid-market businesses", es: "En software, marketing e IA para empresas medianas" } },
      { n: "3.2", s: "x", l: { en: "Avg. Revenue Lift", es: "Aumento Promedio de Ingresos" }, d: { en: "Median ROI within 12 months of growth marketing engagement", es: "ROI promedio en 12 meses de marketing de crecimiento" } },
      { n: "40", s: "%", l: { en: "Cost Reduction", es: "Reducción de Costos" }, d: { en: "Average savings through AI workflow automation", es: "Ahorro promedio con automatización de flujos con IA" } },
      { n: "98", s: "%", l: { en: "Client Retention", es: "Retención de Clientes" }, d: { en: "Partnerships built on delivery, transparency, and outcomes", es: "Alianzas basadas en entrega, transparencia y resultados" } },
    ],
  },
  capabilities: {
    title: { en: "Our core<br/>capabilities", es: "Nuestras<br/>capacidades" },
    cta: { en: "Let's work together", es: "Trabajemos juntos" },
    items: [
      { title: { en: "Custom Web &\nMobile Apps", es: "Aplicaciones Web\ny Móviles" }, icon: "</>" },
      { title: { en: "Growth Marketing\n& SEO", es: "Marketing de\nCrecimiento y SEO" }, icon: "↗" },
      { title: { en: "AI Strategy &\nIntegration", es: "Estrategia e\nIntegración de IA" }, icon: "◇" },
      { title: { en: "Marketing\nAutomation", es: "Automatización\nde Marketing" }, icon: "⟳" },
      { title: { en: "Data Analytics\n& BI", es: "Analítica de\nDatos y BI" }, icon: "▤" },
      { title: { en: "API Design &\nCloud Infra", es: "Diseño de APIs\ne Infraestructura" }, icon: "☁" },
    ],
  },
  whyUs: {
    label: { en: "Why Avertris", es: "Por qué Avertris" },
    title: { en: "A rare combination<br/>built for mid-market", es: "Una combinación única<br/>para el mercado medio" },
    desc: { en: "Most agencies specialize in one thing. We integrate custom software, growth marketing, and AI into a single strategy — because the biggest growth comes when all three work together.", es: "La mayoría de las agencias se especializan en una sola cosa. Nosotros integramos software, marketing e IA en una sola estrategia — porque el mayor crecimiento ocurre cuando los tres trabajan juntos." },
    cta: { en: "Let's talk", es: "Hablemos" },
    items: [
      { icon: "◉", title: { en: "Three pillars, one team", es: "Tres pilares, un equipo" }, desc: { en: "Software + Marketing + AI delivered by a single integrated team. No handoffs, no gaps, no wasted budget.", es: "Software + Marketing + IA entregados por un solo equipo integrado. Sin transferencias, sin brechas, sin presupuesto desperdiciado." } },
      { icon: "◈", title: { en: "Bilingual & bicultural", es: "Bilingüe y bicultural" }, desc: { en: "Native fluency in English and Spanish. We localize strategy, messaging, and execution for US and LATAM audiences.", es: "Fluidez nativa en inglés y español. Localizamos estrategia, mensajes y ejecución para audiencias de EE.UU. y LATAM." } },
      { icon: "↗", title: { en: "Nearshore advantage", es: "Ventaja nearshore" }, desc: { en: "Timezone-aligned with US East Coast, 40-50% lower costs than domestic agencies, zero quality compromise.", es: "Alineados con la zona horaria de la costa este de EE.UU., 40-50% menos costo, sin comprometer calidad." } },
      { icon: "◎", title: { en: "Boutique attention, enterprise quality", es: "Atención boutique, calidad empresarial" }, desc: { en: "Direct access to senior talent. Our founders stay involved in every engagement.", es: "Acceso directo a talento senior. Nuestros fundadores participan en cada proyecto." } },
    ],
  },
  process: {
    label: { en: "How we work", es: "Cómo trabajamos" },
    title: { en: "Our process", es: "Nuestro proceso" },
    cta: { en: "Start a project", es: "Iniciar un proyecto" },
    steps: [
      { num: "01", title: { en: "Discovery & Strategy", es: "Descubrimiento y Estrategia" }, desc: { en: "Deep-dive into your business to define a clear roadmap aligning software, marketing, and AI.", es: "Análisis profundo de tu negocio para definir una hoja de ruta clara alineando software, marketing e IA." }, details: { en: ["Business & market analysis", "Technical architecture review", "Growth opportunity mapping", "AI readiness assessment"], es: ["Análisis de negocio y mercado", "Revisión de arquitectura técnica", "Mapeo de oportunidades de crecimiento", "Evaluación de preparación para IA"] } },
      { num: "02", title: { en: "Build & Execute", es: "Construir y Ejecutar" }, desc: { en: "Agile sprints — shipping fast while maintaining quality and keeping you involved every step.", es: "Sprints ágiles — entregando rápido, manteniendo calidad y contigo en cada paso." }, details: { en: ["Agile development sprints", "Campaign setup & launch", "AI model training & integration", "QA & performance testing"], es: ["Sprints de desarrollo ágil", "Configuración y lanzamiento de campañas", "Entrenamiento e integración de modelos IA", "QA y pruebas de rendimiento"] } },
      { num: "03", title: { en: "Optimize & Scale", es: "Optimizar y Escalar" }, desc: { en: "Continuously monitor, test, and improve. Data drives every decision as we scale.", es: "Monitoreo continuo, pruebas y mejoras. Los datos guían cada decisión mientras escalamos." }, details: { en: ["Performance monitoring", "A/B testing & CRO", "Iterative feature releases", "Quarterly strategy reviews"], es: ["Monitoreo de rendimiento", "Pruebas A/B y CRO", "Lanzamientos iterativos", "Revisiones estratégicas trimestrales"] } },
    ],
  },
  team: {
    label: { en: "Our team", es: "Nuestro equipo" },
    title: { en: "People behind<br/>the results", es: "Las personas detrás<br/>de los resultados" },
    founderRole: { en: "Founder & CEO", es: "Fundador y CEO" },
    founderBio: { en: "Deep roots in US and LATAM markets. Founded Avertris to bridge enterprise-grade technology with mid-market accessibility — one team delivering software, marketing, and AI that drives real outcomes.", es: "Raíces profundas en los mercados de EE.UU. y LATAM. Fundó Avertris para conectar tecnología empresarial con accesibilidad para el mercado medio — un equipo entregando software, marketing e IA con resultados reales." },
    members: [
      { ini: "EN", name: { en: "Head of Engineering", es: "Dir. de Ingeniería" }, role: { en: "Software Development Lead", es: "Líder de Desarrollo" }, desc: { en: "Full-stack architect, 10+ years. React, Node.js, Python, cloud.", es: "Arquitecto full-stack, 10+ años. React, Node.js, Python, cloud." } },
      { ini: "MK", name: { en: "Growth Lead", es: "Líder de Crecimiento" }, role: { en: "Marketing & Revenue", es: "Marketing e Ingresos" }, desc: { en: "B2B lead gen, SEO, CRO. Bilingual US/LATAM campaigns.", es: "Generación de leads B2B, SEO, CRO. Campañas bilingües EE.UU./LATAM." } },
      { ini: "AI", name: { en: "AI Director", es: "Director de IA" }, role: { en: "AI & Automation", es: "IA y Automatización" }, desc: { en: "LLM integration, process automation, predictive analytics.", es: "Integración de LLMs, automatización de procesos, analítica predictiva." } },
    ],
  },
  cta: {
    title: { en: "Contact us", es: "Contáctanos" },
    desc: { en: "Schedule an intro call to get to know each other better and understand the way we work", es: "Agenda una llamada introductoria para conocernos mejor y entender cómo trabajamos" },
    btn: { en: "Let's talk", es: "Hablemos" },
  },
  footer: {
    servicesTitle: { en: "Services", es: "Servicios" },
    industriesTitle: { en: "Industries", es: "Industrias" },
    newsletter: { en: "Join our newsletter!", es: "¡Suscríbete a nuestro newsletter!" },
    newsletterSub: { en: "AI News, Client Stories & Resources Each Month", es: "Noticias de IA, Historias de Clientes y Recursos Cada Mes" },
    subscribe: { en: "Subscribe", es: "Suscribirse" },
    consent: { en: "I agree to receive Newsletter. *", es: "Acepto recibir el Newsletter. *" },
    copy: { en: "© 2026 Avertris. All rights reserved.", es: "© 2026 Avertris. Todos los derechos reservados." },
    privacy: { en: "Privacy Policy", es: "Política de Privacidad" },
    services: {
      en: ["Custom Software", "Web & Mobile Apps", "Growth Marketing & SEO", "Marketing Automation", "AI Strategy & Integration", "Data Analytics & BI"],
      es: ["Software a Medida", "Apps Web y Móviles", "Marketing de Crecimiento y SEO", "Automatización de Marketing", "Estrategia e Integración de IA", "Analítica de Datos y BI"],
    },
    industries: {
      en: ["Healthcare", "Financial Services", "E-Commerce & Retail", "Logistics & Supply Chain", "SaaS & Technology", "Manufacturing"],
      es: ["Salud", "Servicios Financieros", "E-Commerce y Retail", "Logística y Cadena de Suministro", "SaaS y Tecnología", "Manufactura"],
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
    subtitle: { en: "Three pillars of growth — software, marketing, and AI — working together as one integrated strategy.", es: "Tres pilares de crecimiento — software, marketing e IA — trabajando juntos como una estrategia integrada." },
    included: { en: "What's included", es: "Qué incluye" },
    discuss: { en: "Discuss your project", es: "Hablemos de tu proyecto" },
    techStack: { en: "TECH STACK", es: "TECNOLOGÍAS" },
    indLabel: { en: "Industries we serve", es: "Industrias que servimos" },
    indTitle: { en: "Industry expertise", es: "Experiencia por industria" },
    indCta: { en: "Your industry isn't here?", es: "¿Tu industria no está aquí?" },
    pillars: [
      {
        tab: { en: "Custom Software", es: "Software a Medida" }, icon: "</>",
        title: { en: "Custom Software Development", es: "Desarrollo de Software a Medida" },
        subtitle: { en: "Scalable applications built with modern architectures, tailored to your business processes and growth goals.", es: "Aplicaciones escalables con arquitecturas modernas, adaptadas a tus procesos de negocio y objetivos de crecimiento." },
        desc: { en: "We design, build, and maintain custom web applications, mobile apps, and enterprise platforms. From initial architecture through deployment, we focus on clean code, performance, and maintainability.", es: "Diseñamos, construimos y mantenemos aplicaciones web, apps móviles y plataformas empresariales. Desde la arquitectura inicial hasta el despliegue, nos enfocamos en código limpio, rendimiento y mantenibilidad." },
        features: { en: ["Web & Mobile Applications", "API Design & Integration", "Cloud Infrastructure (AWS / GCP)", "Legacy System Modernization", "DevOps & CI/CD Pipelines", "Database Design & Optimization"], es: ["Aplicaciones Web y Móviles", "Diseño e Integración de APIs", "Infraestructura Cloud (AWS / GCP)", "Modernización de Sistemas Legados", "DevOps y Pipelines CI/CD", "Diseño y Optimización de Bases de Datos"] },
        tech: "React, Next.js, Node.js, Python, Go, AWS, PostgreSQL, Docker, Kubernetes",
      },
      {
        tab: { en: "Growth Marketing", es: "Marketing de Crecimiento" }, icon: "↗",
        title: { en: "Growth Marketing & SEO", es: "Marketing de Crecimiento y SEO" },
        subtitle: { en: "Data-driven marketing strategies designed to generate qualified leads and accelerate revenue growth.", es: "Estrategias de marketing basadas en datos diseñadas para generar leads calificados y acelerar el crecimiento de ingresos." },
        desc: { en: "We combine analytics, SEO, paid media, and conversion optimization to build sustainable growth engines. Every campaign is measured and refined based on real data. Bilingual execution across US and LATAM.", es: "Combinamos analítica, SEO, medios pagados y optimización de conversiones para construir motores de crecimiento sostenibles. Cada campaña se mide y refina con datos reales. Ejecución bilingüe en EE.UU. y LATAM." },
        features: { en: ["SEO & Content Strategy", "Paid Media (Google, Meta, LinkedIn)", "Conversion Rate Optimization", "Marketing Automation (HubSpot)", "Analytics & Attribution Modeling", "Email Marketing & Nurture Sequences"], es: ["Estrategia de SEO y Contenidos", "Medios Pagados (Google, Meta, LinkedIn)", "Optimización de Conversiones", "Automatización de Marketing (HubSpot)", "Analítica y Modelos de Atribución", "Email Marketing y Secuencias de Nurture"] },
        tech: "HubSpot, Google Analytics 4, Semrush, Google Ads, Meta Ads, Zapier, Segment",
      },
      {
        tab: { en: "AI Enablement", es: "Habilitación de IA" }, icon: "◇",
        title: { en: "AI Strategy & Enablement", es: "Estrategia y Habilitación de IA" },
        subtitle: { en: "Practical AI integration that solves real business problems — not hype, not theory.", es: "Integración práctica de IA que resuelve problemas reales de negocio — sin buzzwords, sin teoría." },
        desc: { en: "We help mid-market companies identify high-impact AI opportunities, build custom solutions, and train teams. From LLM workflows to predictive analytics, we make AI accessible and actionable.", es: "Ayudamos a empresas medianas a identificar oportunidades de IA de alto impacto, construir soluciones y capacitar equipos. Desde flujos con LLMs hasta analítica predictiva, hacemos la IA accesible y accionable." },
        features: { en: ["AI Strategy & Roadmapping", "Custom LLM Integration", "Intelligent Process Automation", "Predictive Analytics & Forecasting", "AI-Powered Customer Experiences", "Team Training & AI Adoption"], es: ["Estrategia y Hoja de Ruta de IA", "Integración de LLMs Personalizados", "Automatización Inteligente de Procesos", "Analítica Predictiva y Pronósticos", "Experiencias de Cliente con IA", "Capacitación y Adopción de IA"] },
        tech: "OpenAI, Anthropic Claude, LangChain, Python, TensorFlow, Vector Databases, RAG",
      },
    ],
  },
  casesPage: {
    label: { en: "Our work", es: "Nuestro trabajo" },
    title: { en: "Case studies", es: "Casos de éxito" },
    subtitle: { en: "Real results for real businesses. See how we've helped mid-market companies grow.", es: "Resultados reales para negocios reales. Mira cómo hemos ayudado a crecer a empresas medianas." },
    filters: { en: ["All", "Software", "Marketing", "AI"], es: ["Todos", "Software", "Marketing", "IA"] },
    readMore: { en: "Read full case study →", es: "Leer caso completo →" },
    cases: [
      { tag: { en: "Software + AI", es: "Software + IA" }, title: { en: "FinScale: Automated Lending Platform", es: "FinScale: Plataforma de Préstamos Automatizada" }, metric: "60%", metricLabel: { en: "faster loan processing", es: "procesamiento de préstamos más rápido" }, desc: { en: "Built a custom lending platform with AI-powered credit scoring, reducing manual review time by 60%.", es: "Plataforma de préstamos con calificación crediticia con IA, reduciendo revisión manual un 60%." }, cat: ["Software", "AI"] },
      { tag: { en: "Marketing", es: "Marketing" }, title: { en: "MediGroup: Patient Acquisition Engine", es: "MediGroup: Motor de Adquisición de Pacientes" }, metric: "3.2x", metricLabel: { en: "increase in qualified leads", es: "aumento en leads calificados" }, desc: { en: "Full-funnel growth strategy combining SEO, paid media, and marketing automation for healthcare.", es: "Estrategia full-funnel combinando SEO, medios pagados y automatización de marketing para salud." }, cat: ["Marketing"] },
      { tag: { en: "AI Enablement", es: "Habilitación de IA" }, title: { en: "LogiNet: Supply Chain Intelligence", es: "LogiNet: Inteligencia de Cadena de Suministro" }, metric: "40%", metricLabel: { en: "reduction in logistics costs", es: "reducción en costos logísticos" }, desc: { en: "Predictive analytics and AI-driven route optimization cutting logistics costs across 3 countries.", es: "Analítica predictiva y optimización de rutas con IA reduciendo costos logísticos en 3 países." }, cat: ["AI"] },
      { tag: { en: "Software + Marketing", es: "Software + Marketing" }, title: { en: "DataBridge: SaaS Growth Acceleration", es: "DataBridge: Aceleración de Crecimiento SaaS" }, metric: "220%", metricLabel: { en: "increase in MRR", es: "aumento en MRR" }, desc: { en: "Product redesign and data-driven acquisition strategy, tripling monthly recurring revenue.", es: "Rediseño de producto y estrategia de adquisición, triplicando ingresos recurrentes mensuales." }, cat: ["Software", "Marketing"] },
      { tag: { en: "AI + Marketing", es: "IA + Marketing" }, title: { en: "RetailPro: AI-Powered Personalization", es: "RetailPro: Personalización con IA" }, metric: "85%", metricLabel: { en: "increase in email engagement", es: "aumento en engagement de email" }, desc: { en: "AI-powered product recommendations and personalized marketing campaigns.", es: "Recomendaciones de productos con IA y campañas de marketing personalizadas." }, cat: ["AI", "Marketing"] },
      { tag: { en: "Software", es: "Software" }, title: { en: "CloudHealth: Telemedicine Platform", es: "CloudHealth: Plataforma de Telemedicina" }, metric: "50K+", metricLabel: { en: "monthly active patients", es: "pacientes activos mensuales" }, desc: { en: "HIPAA-compliant telemedicine platform serving patients across US and Latin America.", es: "Plataforma de telemedicina HIPAA sirviendo pacientes en EE.UU. y América Latina." }, cat: ["Software"] },
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
    label: { en: "Get in touch", es: "Contáctanos" },
    title: { en: "Contact us", es: "Contáctanos" },
    subtitle: { en: "Schedule an intro call to get to know each other better.", es: "Agenda una llamada introductoria para conocernos mejor." },
    formTitle: { en: "Tell us about your project", es: "Cuéntanos sobre tu proyecto" },
    formDesc: { en: "We'll get back to you within one business day.", es: "Te responderemos en un día hábil." },
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
    svcOptions: { en: ["Custom Software", "Growth Marketing", "AI Enablement", "All Services"], es: ["Software a Medida", "Marketing de Crecimiento", "Habilitación de IA", "Todos los Servicios"] },
    budgetOptions: ["$10K – $25K", "$25K – $50K", "$50K – $100K", "$100K+"],
  },
  omnichannelPage: {
    label: { en: "Product", es: "Producto" },
    title: { en: "Omnichannel Communication", es: "Comunicación Omnicanal" },
    subtitle: { en: "One platform to unify every conversation. WhatsApp, email, calls, social DMs, SMS — all in one place, fully auditable and connected to your contacts.", es: "Una plataforma para unificar cada conversación. WhatsApp, email, llamadas, DMs sociales, SMS — todo en un solo lugar, completamente auditable y conectado a tus contactos." },
    heroCtaDemo: { en: "Request a demo", es: "Solicitar demo" },
    heroCtaPricing: { en: "See pricing", es: "Ver precios" },
    problemLabel: { en: "Sound familiar?", es: "¿Te suena familiar?" },
    problemTitle: { en: "Your team's communication<br/>is scattered everywhere", es: "La comunicación de tu equipo<br/>está dispersa por todos lados" },
    problems: [
      { icon: "📱", title: { en: "Personal WhatsApp for sales", es: "WhatsApp personal para ventas" }, desc: { en: "Sales reps use their own phones. When they leave, so do the conversations and client history.", es: "Los vendedores usan sus teléfonos personales. Cuando se van, se llevan las conversaciones y el historial del cliente." } },
      { icon: "🔍", title: { en: "Zero audit trail", es: "Cero rastreo de auditoría" }, desc: { en: "No visibility into what's being said to clients. Compliance risks and no quality control.", es: "Sin visibilidad de lo que se dice a los clientes. Riesgos de cumplimiento y sin control de calidad." } },
      { icon: "💬", title: { en: "Fragmented conversations", es: "Conversaciones fragmentadas" }, desc: { en: "A client starts on WhatsApp, follows up by email, then calls. Nobody has the full picture.", es: "Un cliente empieza por WhatsApp, sigue por email, luego llama. Nadie tiene la imagen completa." } },
      { icon: "📄", title: { en: "Documents lost in chats", es: "Documentos perdidos en chats" }, desc: { en: "Contracts, proposals, and files scattered across personal chats with no way to find them.", es: "Contratos, propuestas y archivos dispersos en chats personales sin forma de encontrarlos." } },
      { icon: "🤯", title: { en: "Internal headaches", es: "Dolores de cabeza internos" }, desc: { en: "Missed follow-ups, duplicated efforts, and zero coordination between teams.", es: "Seguimientos perdidos, esfuerzos duplicados y cero coordinación entre equipos." } },
      { icon: "📉", title: { en: "Revenue leaking", es: "Ingresos que se escapan" }, desc: { en: "Leads fall through the cracks. Slow responses lose deals. No data to optimize the process.", es: "Los leads se pierden. Las respuestas lentas pierden negocios. Sin datos para optimizar el proceso." } },
    ],
    channelsLabel: { en: "All your channels", es: "Todos tus canales" },
    channelsTitle: { en: "Every channel, one inbox", es: "Cada canal, una bandeja" },
    channelsDesc: { en: "Connect all the ways your team communicates — with clients, prospects, and each other — into a single unified platform.", es: "Conecta todas las formas en que tu equipo se comunica — con clientes, prospectos y entre sí — en una sola plataforma unificada." },
    channels: [
      { icon: "💬", name: "WhatsApp", desc: { en: "Business API integration with shared inboxes, templates, and full message history", es: "Integración con API Business con bandejas compartidas, plantillas e historial completo" } },
      { icon: "📘", name: "Facebook", desc: { en: "Manage Messenger conversations and page messages from your unified dashboard", es: "Gestiona conversaciones de Messenger y mensajes de página desde tu dashboard unificado" } },
      { icon: "📸", name: "Instagram", desc: { en: "Reply to DMs, story mentions, and comments without switching apps", es: "Responde DMs, menciones en historias y comentarios sin cambiar de app" } },
      { icon: "✉️", name: "Email", desc: { en: "Full email integration — send, receive, and thread conversations linked to contacts", es: "Integración completa de email — envía, recibe y organiza conversaciones vinculadas a contactos" } },
      { icon: "📲", name: "SMS", desc: { en: "Two-way SMS messaging with automation capabilities and delivery tracking", es: "Mensajería SMS bidireccional con automatización y seguimiento de entrega" } },
      { icon: "📞", name: { en: "Calls", es: "Llamadas" }, desc: { en: "VoIP calling with recording, transcription, and automatic logging to contacts", es: "Llamadas VoIP con grabación, transcripción y registro automático en contactos" } },
      { icon: "🔗", name: "Slack", desc: { en: "Internal team coordination with notifications, escalations, and cross-channel context", es: "Coordinación interna del equipo con notificaciones, escalamientos y contexto multi-canal" } },
    ],
    featuresLabel: { en: "Platform capabilities", es: "Capacidades de la plataforma" },
    featuresTitle: { en: "Built for teams<br/>that mean business", es: "Hecho para equipos<br/>que van en serio" },
    features: [
      { icon: "👤", title: { en: "Unified contact profiles", es: "Perfiles de contacto unificados" }, desc: { en: "Every interaction, document, and note in one timeline — across all channels.", es: "Cada interacción, documento y nota en una línea de tiempo — a través de todos los canales." } },
      { icon: "🔒", title: { en: "Full audit trail", es: "Auditoría completa" }, desc: { en: "Every message is logged, searchable, and exportable. Full compliance and quality control.", es: "Cada mensaje registrado, buscable y exportable. Cumplimiento total y control de calidad." } },
      { icon: "📎", title: { en: "Document management", es: "Gestión de documentos" }, desc: { en: "Files automatically linked to contacts and conversations. Never lose a document again.", es: "Archivos automáticamente vinculados a contactos y conversaciones. Nunca pierdas un documento." } },
      { icon: "🤖", title: { en: "AI assistant", es: "Asistente de IA" }, desc: { en: "Train an AI on your business to auto-respond, qualify leads, and book appointments 24/7.", es: "Entrena una IA con tu negocio para auto-responder, calificar leads y agendar citas 24/7." } },
      { icon: "⚡", title: { en: "Automations", es: "Automatizaciones" }, desc: { en: "Auto-assign conversations, trigger follow-ups, and route messages based on custom rules.", es: "Asigna conversaciones automáticamente, dispara seguimientos y enruta mensajes con reglas personalizadas." } },
      { icon: "📊", title: { en: "Analytics & reports", es: "Analítica y reportes" }, desc: { en: "Response times, conversation volumes, team performance, and conversion tracking.", es: "Tiempos de respuesta, volúmenes de conversación, rendimiento del equipo y seguimiento de conversiones." } },
    ],
    pricingLabel: { en: "Pricing", es: "Precios" },
    pricingTitle: { en: "Simple, transparent pricing", es: "Precios simples y transparentes" },
    pricingSubtitle: { en: "Start small, scale as you grow. No hidden fees, no long-term contracts.", es: "Empieza pequeño, escala a medida que creces. Sin costos ocultos, sin contratos a largo plazo." },
    pricingMonth: { en: "/month", es: "/mes" },
    pricingStarting: { en: "Starting at", es: "Desde" },
    pricingCta: { en: "Get started", es: "Comenzar" },
    pricingCtaEnterprise: { en: "Contact sales", es: "Contactar ventas" },
    pricingPopular: { en: "Most popular", es: "Más popular" },
    plans: [
      {
        name: { en: "Starter", es: "Starter" },
        price: "99",
        users: { en: "Up to 5 users", es: "Hasta 5 usuarios" },
        desc: { en: "Perfect for solo operators and startups that need to professionalize their client communication.", es: "Perfecto para operadores independientes y startups que necesitan profesionalizar su comunicación con clientes." },
        features: {
          en: ["Unified inbox (all channels)", "WhatsApp Business API", "Facebook & Instagram DMs", "Email integration", "SMS messaging", "VoIP calls with recording", "Contact management", "Document linking", "Basic analytics", "Mobile app"],
          es: ["Bandeja unificada (todos los canales)", "API de WhatsApp Business", "DMs de Facebook e Instagram", "Integración de email", "Mensajería SMS", "Llamadas VoIP con grabación", "Gestión de contactos", "Vinculación de documentos", "Analítica básica", "App móvil"],
        },
      },
      {
        name: { en: "Growth", es: "Growth" },
        price: "299",
        users: { en: "Up to 30 users", es: "Hasta 30 usuarios" },
        popular: true,
        desc: { en: "For growing teams that need CRM, automations, and AI to scale without scaling headcount.", es: "Para equipos en crecimiento que necesitan CRM, automatizaciones e IA para escalar sin aumentar personal." },
        features: {
          en: ["Everything in Starter", "Built-in CRM", "Workflow automations", "Shared calendar & scheduling", "AI text assistant (trainable)", "Auto-lead qualification", "Automatic appointment booking", "Slack integration", "Team performance dashboards", "Priority support"],
          es: ["Todo lo del plan Starter", "CRM integrado", "Automatizaciones de flujos", "Calendario compartido y agenda", "Asistente IA de texto (entrenable)", "Calificación automática de leads", "Agendamiento automático de citas", "Integración con Slack", "Dashboards de rendimiento", "Soporte prioritario"],
        },
      },
      {
        name: { en: "Enterprise", es: "Enterprise" },
        price: "999",
        users: { en: "Unlimited users", es: "Usuarios ilimitados" },
        desc: { en: "For large organizations that need full API access, advanced reporting, and white-glove support.", es: "Para organizaciones grandes que necesitan acceso completo a API, reportes avanzados y soporte premium." },
        features: {
          en: ["Everything in Growth", "Unlimited users", "Full API access", "Advanced custom reports", "Voice AI assistant", "Premium onboarding", "Team training sessions", "Dedicated account manager", "Custom integrations", "99.9% SLA guarantee"],
          es: ["Todo lo del plan Growth", "Usuarios ilimitados", "Acceso completo a API", "Reportes personalizados avanzados", "Asistente de voz con IA", "Onboarding premium", "Sesiones de capacitación", "Account manager dedicado", "Integraciones personalizadas", "Garantía SLA 99.9%"],
        },
      },
    ],
    ctaTitle: { en: "Ready to unify your communications?", es: "¿Listo para unificar tus comunicaciones?" },
    ctaDesc: { en: "Join hundreds of companies that stopped losing clients to scattered conversations. Get started in minutes.", es: "Únete a cientos de empresas que dejaron de perder clientes por conversaciones dispersas. Empieza en minutos." },
    ctaBtn: { en: "Request a demo", es: "Solicitar demo" },
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
      label: t(T.nav.products, lang), key: "omnichannel",
      mega: {
        cols: [
          { heading: t(T.nav.megaProducts, lang), items: [{ t: lang === "en" ? "Omnichannel Communication" : "Comunicación Omnicanal", key: "omnichannel" }] },
        ],
      },
    },
    {
      label: t(T.nav.services, lang), key: "services",
      mega: {
        cols: [
          { heading: t(T.nav.megaBuild, lang), items: [{ t: lang === "en" ? "Custom Software Development" : "Desarrollo de Software a Medida" }, { t: lang === "en" ? "Web & Mobile Applications" : "Aplicaciones Web y Móviles" }, { t: lang === "en" ? "API Design & Integration" : "Diseño e Integración de APIs" }] },
          { heading: t(T.nav.megaGrow, lang), items: [{ t: lang === "en" ? "Growth Marketing & SEO" : "Marketing de Crecimiento y SEO" }, { t: lang === "en" ? "Marketing Automation" : "Automatización de Marketing" }, { t: lang === "en" ? "Conversion Rate Optimization" : "Optimización de Conversiones" }] },
          { heading: t(T.nav.megaTransform, lang), items: [{ t: lang === "en" ? "AI Strategy & Integration" : "Estrategia e Integración de IA" }, { t: lang === "en" ? "Custom LLM Solutions" : "Soluciones LLM Personalizadas" }, { t: lang === "en" ? "Data Analytics & BI" : "Analítica de Datos y BI" }] },
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
                                <button key={ii} onClick={() => { go(item.key || link.key); setMobileMenuOpen(false); }} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 400, color: V.g800, padding: "6px 0", textAlign: "left", width: "100%", transition: "color 0.15s" }}>{item.t}</button>
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
                <div style={{ position: "absolute", top: "100%", left: link.mega.cols.length === 1 ? -20 : -120, paddingTop: 12, zIndex: 200 }}>
                  <div style={{ background: V.white, borderRadius: 12, padding: "40px 48px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", display: "grid", gridTemplateColumns: `repeat(${link.mega.cols.length}, 220px)`, gap: 40, border: `1px solid ${V.g200}` }}>
                    {link.mega.cols.map((col, ci) => (
                      <div key={ci}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: V.g400, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 16px" }}>{col.heading}</p>
                        {col.items.map((item, ii) => (
                          <button key={ii} onClick={() => { go(item.key || link.key); setOpenMenu(null); }} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 400, color: V.g800, padding: "8px 0", textAlign: "left", width: "100%", transition: "color 0.15s" }}
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
      <section style={{ minHeight: mob ? "80vh" : "92vh", display: "flex", alignItems: "flex-end", padding: "0 0 " + (mob ? "60px" : "80px"), backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%), url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Box mob={mob}>
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

      {/* CTA */}
      <section style={{ padding: mob ? "80px 0" : "120px 0", backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Box mob={mob}><div style={{ display: mob ? "flex" : "grid", flexDirection: mob ? "column" : "row", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: mob ? 32 : 60, alignItems: "center" }}>
          <h2 style={{ fontSize: mob ? 32 : 56, fontWeight: 800, color: V.white, lineHeight: 1.1, letterSpacing: -1.5, margin: 0, fontFamily: F }}>{t(T.cta.title, L)}</h2>
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
   OMNICHANNEL COMMUNICATION PAGE
   ═══════════════════════════════════════════════════════════ */

function OmnichannelPage({ go, lang }) {
  const O = T.omnichannelPage;
  const { mob, tab } = useMedia();
  const [hPrb, sHPrb] = useState(null);
  const [hCh, sHCh] = useState(null);
  const [hFt, sHFt] = useState(null);
  const L = lang;

  return (
    <>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${V.g900} 0%, #1a1a2e 50%, #16213e 100%)`, padding: mob ? "120px 0 60px" : "160px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "50%", background: "radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.08) 0%, transparent 70%)" }} />
        <Box mob={mob}>
          <div style={{ display: mob ? "block" : "grid", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <Lbl mob={mob}>{t(O.label, L)}</Lbl>
              <h1 style={{ fontSize: mob ? 32 : 56, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color: V.white, margin: "0 0 24px", fontFamily: F }}>{t(O.title, L)}</h1>
              <p style={{ fontSize: mob ? 15 : 18, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 40px", maxWidth: 520, lineHeight: 1.7, fontFamily: F }}>{t(O.subtitle, L)}</p>
              <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: 16 }}>
                <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(O.heroCtaDemo, L)}</Btn>
                <Btn variant="outline" onClick={() => {}} style={{ color: V.white, borderColor: "rgba(255,255,255,0.3)" }} mob={mob}>{t(O.heroCtaPricing, L)}</Btn>
              </div>
            </div>
            {!mob && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, position: "relative", zIndex: 1 }}>
                {O.channels.slice(0, 6).map((ch, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "20px 16px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,107,0,0.12)"; e.currentTarget.style.borderColor = "rgba(255,107,0,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >
                    <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{ch.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: V.white, fontFamily: F }}>{typeof ch.name === "string" ? ch.name : t(ch.name, L)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Box>
      </section>

      {/* Problem / Pain Points */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: `0 auto ${mob ? 40 : 64}px` }}>
            <Lbl mob={mob}>{t(O.problemLabel, L)}</Lbl>
            <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(O.problemTitle, L) }} />
            <Hr style={{ margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: mob ? 16 : 24 }}>
            {O.problems.map((p, i) => (
              <div key={i}
                onMouseEnter={() => !mob && sHPrb(i)} onMouseLeave={() => !mob && sHPrb(null)}
                style={{ background: hPrb === i ? V.g900 : V.g100, borderRadius: 12, padding: mob ? "24px 20px" : "32px 28px", transition: "all 0.2s", cursor: "default" }}
              >
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{p.icon}</span>
                <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: hPrb === i ? V.white : V.g900, margin: "0 0 10px", fontFamily: F, transition: "color 0.2s" }}>{t(p.title, L)}</h3>
                <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.7, color: hPrb === i ? "rgba(255,255,255,0.6)" : V.g600, margin: 0, fontFamily: F, transition: "color 0.2s" }}>{t(p.desc, L)}</p>
              </div>
            ))}
          </div>
        </Box>
      </section>

      {/* Channels */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g100 }}>
        <Box mob={mob}>
          <div style={{ display: mob ? "block" : "grid", gridTemplateColumns: mob ? undefined : "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div style={{ marginBottom: mob ? 40 : 0 }}>
              <Lbl mob={mob}>{t(O.channelsLabel, L)}</Lbl>
              <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }}>{t(O.channelsTitle, L)}</h2>
              <Hr />
              <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.8, color: V.g600, margin: "24px 0 0", fontFamily: F }}>{t(O.channelsDesc, L)}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {O.channels.map((ch, i) => (
                <div key={i}
                  onMouseEnter={() => !mob && sHCh(i)} onMouseLeave={() => !mob && sHCh(null)}
                  style={{ background: V.white, borderRadius: 12, padding: mob ? "16px 16px" : "20px 24px", display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, alignItems: "center", transition: "all 0.2s", boxShadow: hCh === i ? "0 8px 24px rgba(255,107,0,0.1)" : "none", border: `1px solid ${hCh === i ? V.primary : V.g200}` }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: hCh === i ? V.primary : V.p200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, transition: "background 0.2s" }}>{ch.icon}</div>
                  <div>
                    <h4 style={{ fontSize: mob ? 15 : 16, fontWeight: 600, color: V.g900, margin: "0 0 4px", fontFamily: F }}>{typeof ch.name === "string" ? ch.name : t(ch.name, L)}</h4>
                    <p style={{ fontSize: mob ? 12 : 13, fontWeight: 300, lineHeight: 1.6, color: V.g600, margin: 0, fontFamily: F }}>{t(ch.desc, L)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </section>

      {/* Features */}
      <section style={{ padding: mob ? "64px 0" : "100px 0" }}>
        <Box mob={mob}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: `0 auto ${mob ? 40 : 64}px` }}>
            <Lbl mob={mob}>{t(O.featuresLabel, L)}</Lbl>
            <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 20px", fontFamily: F }} dangerouslySetInnerHTML={{ __html: t(O.featuresTitle, L) }} />
            <Hr style={{ margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: mob ? 16 : 24 }}>
            {O.features.map((f, i) => {
              const isAlt = [1, 3, 5].includes(i);
              return (
                <div key={i}
                  onMouseEnter={() => !mob && sHFt(i)} onMouseLeave={() => !mob && sHFt(null)}
                  style={{ padding: mob ? "28px 20px" : "40px 32px", background: hFt === i ? V.primary : isAlt ? V.g200 : V.g100, borderRadius: 12, transition: "all 0.2s", cursor: "default" }}
                >
                  <span style={{ fontSize: 32, display: "block", marginBottom: 20 }}>{f.icon}</span>
                  <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 600, color: hFt === i ? V.white : V.g900, margin: "0 0 10px", fontFamily: F, transition: "color 0.2s" }}>{t(f.title, L)}</h3>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.7, color: hFt === i ? "rgba(255,255,255,0.7)" : V.g600, margin: 0, fontFamily: F, transition: "color 0.2s" }}>{t(f.desc, L)}</p>
                </div>
              );
            })}
          </div>
        </Box>
      </section>

      {/* Pricing */}
      <section style={{ padding: mob ? "64px 0" : "100px 0", background: V.g100 }}>
        <Box mob={mob}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: `0 auto ${mob ? 40 : 64}px` }}>
            <Lbl mob={mob}>{t(O.pricingLabel, L)}</Lbl>
            <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1, color: V.g900, margin: "0 0 16px", fontFamily: F }}>{t(O.pricingTitle, L)}</h2>
            <p style={{ fontSize: mob ? 14 : 16, fontWeight: 300, lineHeight: 1.7, color: V.g600, margin: 0, fontFamily: F }}>{t(O.pricingSubtitle, L)}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 24 : 0, alignItems: "start" }}>
            {O.plans.map((plan, i) => {
              const isPopular = plan.popular;
              return (
                <div key={i} style={{
                  background: V.white,
                  borderRadius: mob ? 16 : i === 0 ? "16px 0 0 16px" : i === 2 ? "0 16px 16px 0" : 0,
                  padding: mob ? "32px 24px" : isPopular ? "48px 36px" : "40px 32px",
                  border: `${isPopular ? 2 : 1}px solid ${isPopular ? V.primary : V.g200}`,
                  position: "relative",
                  transform: !mob && isPopular ? "scale(1.04)" : "none",
                  zIndex: isPopular ? 2 : 1,
                  boxShadow: isPopular ? "0 20px 50px rgba(255,107,0,0.12)" : "none",
                }}>
                  {isPopular && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: V.primary, color: V.white, fontSize: 12, fontWeight: 700, padding: "5px 20px", borderRadius: 20, fontFamily: F, whiteSpace: "nowrap" }}>{t(O.pricingPopular, L)}</div>
                  )}
                  <h3 style={{ fontSize: mob ? 20 : 24, fontWeight: 700, color: V.g900, margin: "0 0 8px", fontFamily: F }}>{t(plan.name, L)}</h3>
                  <p style={{ fontSize: mob ? 12 : 13, fontWeight: 500, color: V.primary, margin: "0 0 20px", fontFamily: F }}>{t(plan.users, L)}</p>
                  <div style={{ marginBottom: 20 }}>
                    {i === 2 && <span style={{ fontSize: mob ? 12 : 13, fontWeight: 400, color: V.g400, fontFamily: F }}>{t(O.pricingStarting, L)} </span>}
                    <span style={{ fontSize: mob ? 40 : 48, fontWeight: 800, color: V.g900, letterSpacing: -2, fontFamily: F }}>${plan.price}</span>
                    <span style={{ fontSize: mob ? 14 : 16, fontWeight: 300, color: V.g400, fontFamily: F }}>{t(O.pricingMonth, L)}</span>
                  </div>
                  <p style={{ fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.7, color: V.g600, margin: "0 0 28px", fontFamily: F }}>{t(plan.desc, L)}</p>
                  <Btn
                    variant={isPopular ? "primary" : "outline"}
                    onClick={() => go("contact")}
                    style={{ width: "100%", justifyContent: "center", marginBottom: 28 }}
                    mob={mob}
                  >
                    {i === 2 ? t(O.pricingCtaEnterprise, L) : t(O.pricingCta, L)}
                  </Btn>
                  <div style={{ borderTop: `1px solid ${V.g200}`, paddingTop: 24 }}>
                    {t(plan.features, L).map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: V.p200, color: V.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>✓</div>
                        <span style={{ fontSize: mob ? 13 : 14, color: V.g800, fontFamily: F, fontWeight: j === 0 && i > 0 ? 600 : 400 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
      </section>

      {/* CTA */}
      <section style={{ padding: mob ? "80px 0" : "120px 0", background: V.g900, textAlign: "center" }}>
        <Box mob={mob}>
          <h2 style={{ fontSize: mob ? 28 : 48, fontWeight: 800, color: V.white, lineHeight: 1.15, letterSpacing: -1, margin: "0 0 16px", fontFamily: F }}>{t(O.ctaTitle, L)}</h2>
          <p style={{ fontSize: mob ? 14 : 18, fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 auto 40px", maxWidth: 560, fontFamily: F }}>{t(O.ctaDesc, L)}</p>
          <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
            <Btn variant="primary" onClick={() => go("contact")} mob={mob}>{t(O.ctaBtn, L)}</Btn>
            <Btn variant="outline" onClick={() => go("contact")} style={{ color: V.white, borderColor: "rgba(255,255,255,0.3)" }} mob={mob}>{t(T.nav.cta, L)}</Btn>
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
  const [lang, setLang] = useState("en");

  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pages = {
    home: <HomePage go={go} lang={lang} />,
    omnichannel: <OmnichannelPage go={go} lang={lang} />,
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
