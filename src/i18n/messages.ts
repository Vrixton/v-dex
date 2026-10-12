import type { I18nText } from "./locale";

type Messages = {
  menu: { idle: I18nText };
  contact: {
    intro: I18nText;
    messagePlaceholder: I18nText;
    limitReached: I18nText;
  };
};

export const MESSAGES: Messages = {
  menu: {
    idle: {
      en: "Select an option to proceed",
      es: "Elige una opción para continuar",
    },
  },
  contact: {
    intro: {
      en: "Want to get in touch? Leave me a message below.",
      es: "¡Hablémos! Déjame un mensaje aquí abajo.",
    },
    messagePlaceholder: {
      en: "Hey! I have a challenge for you. Interested in joining?",
      es: "¡Hey! Tengo un reto para ti. ¿Te animas a unirte?",
    },
    limitReached: {
      en: "You've reached today's transmission limit. Use the main channel or try again tomorrow.",
      es: "Has alcanzado el límite de mensajes de hoy. Escríbeme al correo o inténtalo mañana.",
    },
  },
};
