export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

export const ui = {
  es: {
    // Meta
    "meta.siteName": "Academia Bolaños",
    "meta.description":
      "Academia Bolaños — Clases de guitarra, ukelele, canto e idiomas en Costa Rica. Aprende con los mejores maestros. ¡Inscríbete hoy!",
    "meta.keywords":
      "clases de guitarra Costa Rica, clases de ukelele, clases de canto, clases de inglés, academia de música, Academia Bolaños",

    // Nav
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.testimonials": "Testimonios",
    "nav.contact": "Contacto",
    "nav.enroll": "Inscríbete",

    // Hero
    "hero.badge": "Academia de Música & Idiomas",
    "hero.headline": "Aprende, Crea, Transforma",
    "hero.subheadline":
      "Descubre tu talento con clases personalizadas de guitarra, ukelele, canto e idiomas. Maestros apasionados, resultados reales.",
    "hero.cta.primary": "Consulta por WhatsApp",
    "hero.cta.secondary": "Ver servicios",
    "hero.stat.students": "Estudiantes activos",
    "hero.stat.years": "Años de experiencia",
    "hero.stat.satisfaction": "Satisfacción",

    // Services
    "services.title": "Nuestros Servicios",
    "services.subtitle":
      "Programas diseñados para todos los niveles, desde principiantes hasta avanzados.",
    "services.cta": "Consultar por WhatsApp",

    // About
    "about.title": "¿Por qué elegirnos?",
    "about.subtitle":
      "Más de 10 años formando músicos y comunicadores en Costa Rica.",
    "about.feature.1.title": "Clases Personalizadas",
    "about.feature.1.desc":
      "Adaptamos el ritmo y contenido a tus objetivos y disponibilidad.",
    "about.feature.2.title": "Maestros Certificados",
    "about.feature.2.desc":
      "Nuestros instructores tienen formación académica y amplia experiencia profesional.",
    "about.feature.3.title": "Ambiente Premium",
    "about.feature.3.desc":
      "Instalaciones modernas y equipos de alta calidad para tu aprendizaje.",
    "about.feature.4.title": "Seguimiento Constante",
    "about.feature.4.desc":
      "Evaluaciones periódicas y feedback continuo para garantizar tu progreso.",

    // Testimonials
    "testimonials.title": "Lo que dicen nuestros estudiantes",
    "testimonials.subtitle":
      "Historias reales de personas que transformaron su vida con la música y los idiomas.",

    // Promotions
    "promo.title": "Promociones Especiales",
    "promo.subtitle": "Inscríbete ahora y aprovecha nuestras ofertas exclusivas.",
    "promo.badge": "Oferta limitada",
    "promo.cta": "Consultar oferta",

    // Contact / WhatsApp
    "wa.button": "Escríbenos por WhatsApp",
    "wa.message": "Hola! Me interesa obtener más información sobre los servicios de Academia Bolaños.",
    "wa.floating.label": "¿Tienes dudas? Escríbenos",

    // Footer
    "footer.tagline": "Formando músicos y comunicadores en Costa Rica desde 2014.",
    "footer.rights": "Todos los derechos reservados.",
    "footer.nav.services": "Servicios",
    "footer.nav.about": "Nosotros",
    "footer.nav.contact": "Contacto",
    "footer.nav.privacy": "Privacidad",
    "footer.contact.title": "Contacto",
    "footer.contact.phone": "+506 8921-5848",
    "footer.contact.country": "Costa Rica",
  },
  en: {
    // Meta
    "meta.siteName": "Academia Bolaños",
    "meta.description":
      "Academia Bolaños — Guitar, ukulele, singing and language classes in Costa Rica. Learn with the best teachers. Enroll today!",
    "meta.keywords":
      "guitar lessons Costa Rica, ukulele lessons, singing classes, English classes, music academy, Academia Bolaños",

    // Nav
    "nav.services": "Services",
    "nav.about": "About",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.enroll": "Enroll",

    // Hero
    "hero.badge": "Music & Language Academy",
    "hero.headline": "Learn, Create, Transform",
    "hero.subheadline":
      "Discover your talent with personalized guitar, ukulele, singing, and language lessons. Passionate teachers, real results.",
    "hero.cta.primary": "Chat on WhatsApp",
    "hero.cta.secondary": "View services",
    "hero.stat.students": "Active students",
    "hero.stat.years": "Years of experience",
    "hero.stat.satisfaction": "Satisfaction",

    // Services
    "services.title": "Our Services",
    "services.subtitle":
      "Programs designed for all levels, from beginners to advanced.",
    "services.cta": "Ask via WhatsApp",

    // About
    "about.title": "Why Choose Us?",
    "about.subtitle":
      "Over 10 years shaping musicians and communicators in Costa Rica.",
    "about.feature.1.title": "Personalized Classes",
    "about.feature.1.desc":
      "We adapt pace and content to your goals and availability.",
    "about.feature.2.title": "Certified Teachers",
    "about.feature.2.desc":
      "Our instructors hold academic degrees and extensive professional experience.",
    "about.feature.3.title": "Premium Environment",
    "about.feature.3.desc":
      "Modern facilities and high-quality equipment for your learning.",
    "about.feature.4.title": "Continuous Monitoring",
    "about.feature.4.desc":
      "Periodic evaluations and ongoing feedback to ensure your progress.",

    // Testimonials
    "testimonials.title": "What Our Students Say",
    "testimonials.subtitle":
      "Real stories from people who transformed their lives through music and languages.",

    // Promotions
    "promo.title": "Special Promotions",
    "promo.subtitle": "Enroll now and take advantage of our exclusive offers.",
    "promo.badge": "Limited offer",
    "promo.cta": "Check offer",

    // Contact / WhatsApp
    "wa.button": "Chat on WhatsApp",
    "wa.message": "Hello! I'm interested in learning more about Academia Bolaños services.",
    "wa.floating.label": "Questions? Write to us",

    // Footer
    "footer.tagline": "Shaping musicians and communicators in Costa Rica since 2014.",
    "footer.rights": "All rights reserved.",
    "footer.nav.services": "Services",
    "footer.nav.about": "About",
    "footer.nav.contact": "Contact",
    "footer.nav.privacy": "Privacy",
    "footer.contact.title": "Contact",
    "footer.contact.phone": "+506 8921-5848",
    "footer.contact.country": "Costa Rica",
  },
} as const;

export type UiKey = keyof (typeof ui)["es"];

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.split("/").filter(Boolean);
  for (const segment of segments) {
    if (segment in languages) return segment as Lang;
  }
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
