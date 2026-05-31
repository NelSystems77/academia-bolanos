import type { Lang } from "./ui";

export interface Service {
  id: string;
  slug: string;
  icon: string;
  color: string;
  level: string;
  duration: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export interface ServiceTranslation {
  title: string;
  shortDesc: string;
  longDesc: string;
  waMessage: string;
}

export const services: Service[] = [
  {
    id: "guitar",
    slug: "guitarra",
    icon: "guitar",
    color: "#0047AB",
    level: "all",
    duration: "45min",
    price: "¢15,000",
    features: ["individual", "technique", "repertoire", "theory"],
    highlight: true,
  },
  {
    id: "ukulele",
    slug: "ukelele",
    icon: "music",
    color: "#1A6FD4",
    level: "all",
    duration: "45min",
    price: "¢12,000",
    features: ["individual", "chords", "strumming", "songs"],
  },
  {
    id: "singing",
    slug: "canto",
    icon: "mic",
    color: "#00BFFF",
    level: "all",
    duration: "45min",
    price: "¢15,000",
    features: ["technique", "breathing", "repertoire", "performance"],
  },
  {
    id: "languages",
    slug: "idiomas",
    icon: "globe",
    color: "#0056C8",
    level: "all",
    duration: "60min",
    price: "¢12,000",
    features: ["english", "spanish", "conversation", "grammar"],
  },
];

const serviceTranslations: Record<string, Record<Lang, ServiceTranslation>> = {
  guitar: {
    es: {
      title: "Guitarra",
      shortDesc: "Aprende guitarra desde cero o perfecciona tu técnica con clases individuales.",
      longDesc:
        "Desde acordes básicos hasta técnicas avanzadas de fingerpicking y teoría musical. Clases adaptadas a tu nivel y estilo musical favorito.",
      waMessage:
        "Hola! Estoy interesado/a en las clases de guitarra de Academia Bolaños. ¿Pueden darme más información?",
    },
    en: {
      title: "Guitar",
      shortDesc: "Learn guitar from scratch or perfect your technique with individual classes.",
      longDesc:
        "From basic chords to advanced fingerpicking techniques and music theory. Classes tailored to your level and favorite music style.",
      waMessage:
        "Hello! I'm interested in guitar classes at Academia Bolaños. Can you give me more information?",
    },
  },
  ukulele: {
    es: {
      title: "Ukelele",
      shortDesc: "Descubre el encanto del ukelele, un instrumento para todas las edades.",
      longDesc:
        "Clases dinámicas que cubren acordes, ritmos y canciones populares. El instrumento perfecto para empezar en el mundo de la música.",
      waMessage:
        "Hola! Estoy interesado/a en las clases de ukelele de Academia Bolaños. ¿Pueden darme más información?",
    },
    en: {
      title: "Ukulele",
      shortDesc: "Discover the charm of the ukulele, an instrument for all ages.",
      longDesc:
        "Dynamic classes covering chords, rhythms, and popular songs. The perfect instrument to start your music journey.",
      waMessage:
        "Hello! I'm interested in ukulele classes at Academia Bolaños. Can you give me more information?",
    },
  },
  singing: {
    es: {
      title: "Canto",
      shortDesc: "Desarrolla tu voz y técnica vocal con clases profesionales de canto.",
      longDesc:
        "Técnica vocal, respiración, proyección, afinación y repertorio. Desde canto popular hasta clásico, desarrollamos tu voz única.",
      waMessage:
        "Hola! Estoy interesado/a en las clases de canto de Academia Bolaños. ¿Pueden darme más información?",
    },
    en: {
      title: "Singing",
      shortDesc: "Develop your voice and vocal technique with professional singing classes.",
      longDesc:
        "Vocal technique, breathing, projection, tuning, and repertoire. From pop to classical singing, we develop your unique voice.",
      waMessage:
        "Hello! I'm interested in singing classes at Academia Bolaños. Can you give me more information?",
    },
  },
  languages: {
    es: {
      title: "Inglés / Español",
      shortDesc: "Clases de idiomas para comunicarte con fluidez y confianza.",
      longDesc:
        "Inglés para hispanohablantes y español para extranjeros. Conversación, gramática, escritura y pronunciación en clases prácticas y dinámicas.",
      waMessage:
        "Hola! Estoy interesado/a en las clases de idiomas de Academia Bolaños. ¿Pueden darme más información?",
    },
    en: {
      title: "English / Spanish",
      shortDesc: "Language classes to communicate fluently and confidently.",
      longDesc:
        "English for Spanish speakers and Spanish for foreigners. Conversation, grammar, writing, and pronunciation in practical, dynamic classes.",
      waMessage:
        "Hello! I'm interested in language classes at Academia Bolaños. Can you give me more information?",
    },
  },
};

export function getServiceTranslation(
  serviceId: string,
  lang: Lang
): ServiceTranslation {
  const translations = serviceTranslations[serviceId];
  if (!translations) {
    throw new Error(`Service not found: ${serviceId}`);
  }
  return translations[lang] ?? translations["es"]!;
}

export function getLocalizedServices(lang: Lang) {
  return services.map((service) => ({
    ...service,
    ...getServiceTranslation(service.id, lang),
  }));
}

export const featureLabels: Record<string, Record<Lang, string>> = {
  individual:   { es: "Clases individuales", en: "Individual classes" },
  technique:    { es: "Técnica profesional", en: "Professional technique" },
  repertoire:   { es: "Repertorio variado",  en: "Varied repertoire" },
  theory:       { es: "Teoría musical",       en: "Music theory" },
  chords:       { es: "Acordes y progresiones", en: "Chords & progressions" },
  strumming:    { es: "Ritmo y strumming",    en: "Rhythm & strumming" },
  songs:        { es: "Canciones populares",  en: "Popular songs" },
  breathing:    { es: "Técnica respiratoria", en: "Breathing technique" },
  performance:  { es: "Performance escénico", en: "Stage performance" },
  english:      { es: "Inglés", en: "English" },
  spanish:      { es: "Español", en: "Spanish" },
  conversation: { es: "Conversación fluida",  en: "Fluent conversation" },
  grammar:      { es: "Gramática práctica",   en: "Practical grammar" },
};
