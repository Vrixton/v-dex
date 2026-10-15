import type { Messages } from "./en";

export const es: Messages = {
  device: {
    sync: "SINC: LISTO",
    terminal: {
      statusLabel: "ESTADO",
      statusActive: "ACTIVO",
      statusClosed: "CERRADO",
    },
    toggle: "Menú",
    sound: {
      name: "Efectos de sonido",
      label: "SONIDO",
      on: "ACTIVO",
      off: "INACTIVO",
    },
    system: {
      label: "SISTEMA",
      reset: "REINICIO",
      languageSet: "IDIOMA_CAMBIADO",
    },
    locale: {
      group: "Idioma",
    },
    menu: {
      title: "MENÚ",
      nav: "Menú del dispositivo",
      idle: "Elige una opción para continuar",
      items: {
        about: {
          label: "Sobre mí",
          terminal: "Datos del entrenador y habilidades",
        },
        experience: {
          label: "Experiencia",
          terminal: "Diario de expedición",
        },
        projects: {
          label: "Proyectos",
          terminal: "Base de datos de retos",
        },
        contact: {
          label: "Contacto",
          terminal: "Abrir un canal de comunicación",
        },
      },
    },
  },

  about: {
    window: {
      title: "INFO_DE_ENTRENADOR",
      breadcrumb: "REPOSITORIO",
      number: "NRO. #???",
    },
    nameLabel: "NOMBRE_DE_ENTRENADOR",
    role: "Desarrollador Frontend Sr. && Entrenador Pokémon",

    bioProgram: "BIO",
    bio: [
      "Desarrollador frontend con más de {years} años de experiencia en el desarrollo de aplicaciones web escalables, optimizadas y accesibles. Me especializo en **Angular**, **React** y **Next.js**, con énfasis en el rendimiento, midiendo con **Lighthouse**, reduciendo el peso del bundle y corrigiendo regresiones de **Core Web Vitals**. También tengo un enfoque sólido en la experiencia del usuario y las buenas prácticas de desarrollo. He liderado equipos, realizando plannings, fijando prioridades, asignando tareas y acompañando desarrolladores junior en su incorporación a los proyectos, además de impulsar mejoras de UX/UI y entregar soluciones limpias, eficientes y alineadas con los objetivos del negocio.",
    ],

    avatar: {
      alt: "Avatar en pixel art de {name}",
      level: "NVL.{level}",
      exp: "EXP.",
      years: "+{years} años",
      progress: "{years} años de experiencia, progreso hacia el siguiente",
    },

    habitat: {
      title: "HÁBITAT",
      subtitle: "UBICACIÓN",
      region: "REGIÓN",
      timezone: "ZONA HORARIA",
      maps: "VER_EN_MAPS",
      mapsHint: "(se abre en una pestaña nueva)",
    },

    cv: {
      title: "FICHA_DE_ENTRENADOR",
      subtitle: "CV",
      file: "ARCHIVO",
      type: "TIPO",
      size: "TAMAÑO",
      download: "DESCARGAR",
    },

    skillsTitle: "HABILIDADES",
    legend: {
      technical: "técnica",
      personal: "personal",
      communication: "comunicación",
    },
    skills: {
      coreWebVitals: "Core Web Vitals",
      performanceProfiling: "Análisis de rendimiento",
      codeSplitting: "Code Splitting",
      componentArchitecture: "Arquitectura de componentes",
      codeReview: "Revisión de código",
      aiAssistedDevelopment: "Desarrollo asistido por IA",
      scrumAgile: "SCRUM y Agile",
      uxAccessibility: "Enfoque en UX y accesibilidad",
      leadership: "Liderazgo",
      mentoring: "Mentoría y onboarding",
      ownership: "Sentido de pertenencia",
      technicalCommunication: "Comunicación técnica",
      crossFunctional: "Colaboración entre equipos",
      stakeholderManagement: "Gestión de stakeholders",
      designHandoff: "Implementación de diseños",
    },
  },

  experience: {
    window: {
      title: "DIARIO_EXPEDICI\u00d3N",
      breadcrumb: "PUESTOS_SELECCIONADOS",
      logsFound: "{count} REGISTROS",
    },
    program: "BITÁCORA",
    companyLabel: "EMPRESA",
    selectLabel: "ELEGIR_REGISTRO",
    scanning: "ESCANEANDO",
    nav: {
      previous: "Puestos anteriores",
      next: "Puestos siguientes",
    },
    roles: {
      coderslab: {
        role: "Desarrollador Frontend",
        location: "Santiago, Chile \u00b7 Remoto",
        log: [
          "Asumí la **coordinación del equipo** y me encargué de los plannings, las prioridades y el reparto del trabajo.",
          "Revisaba pull requests y explicaba el código a los desarrolladores que entraban al equipo.",
          "Seguíamos **Scrum**, con dailies, sprint planning y grooming en ciclos de dos semanas.",
          "Trabajaba a diario con backend, QA, diseño y el departamento de producto.",
        ],
      },
      arbelos: {
        role: "Desarrollador Frontend \u00b7 Contratista recurrente",
        location: "Ontario, Canad\u00e1 \u00b7 Remoto",
        log: [
          "**Colaboraci\u00f3n recurrente durante cuatro a\u00f1os**: me llamaban cada vez que abr\u00edan un proyecto nuevo.",
          "Trabaj\u00e9 **en ingl\u00e9s escrito** todos los d\u00edas: tickets, documentaci\u00f3n y dailies con un equipo distribuido.",
          "Tomaba el trabajo de un tablero compartido y llevaba dailies centrados en bloqueos y especificaciones que faltaban.",
          "**Aprend\u00ed a trabajar dentro del c\u00f3digo de otros**: respetando el sistema de dise\u00f1o y las convenciones que ya exist\u00edan en lugar de las m\u00edas.",
          "Cubr\u00eda mi trabajo con pruebas unitarias antes de entregarlo.",
        ],
      },
      farmatodo: {
        role: "Desarrollador Frontend",
        location: "Bogot\u00e1, Colombia",
        log: [
          "Convertía las peticiones del **área de producto** y **el equipo de backend** en **tareas que el equipo podía asignar, planificar y priorizar**.",
          "Definía con el **diseñador** qué era viable construir y mantener.",
          "Rotaba en **planificación y estimación de sprints** con el equipo de frontend.",
          "Cubría mi código con **pruebas unitarias**.",
          "En mis **semanas de guardia** resolvía incidentes en producción y desplegaba el arreglo si era necesario.",
          "Dicté capacitaciones internas de **Git y NVM** para unificar el flujo de trabajo del equipo.",
          "Entré a través de una agencia y **la empresa me contrató directamente** un año después.",
        ],
      },
      earlyYears: {
        role: "Desarrollador Frontend",
        location: "Agencias y estudios · Remoto y presencial",
        log: [
          "Trabajé **cuatro años** en agencias y estudios de desarrollo, entre **Tsserapp, S9 Consulting y Tita Media**.",
          "Desarrollé con **Angular** desde la versión 2 y con **Ionic** en aplicaciones híbridas.",
          "Construí tiendas en **VTEX** para marcas colombianas como **Mario Hernández**, **Fiotti**, **Agaval** y **Prochampions**.",
          "Revisaba código y acompañaba a los desarrolladores junior del equipo.",
        ],
      },
    },
  },

  stack: {
    title: "MEDALLAS",
    subtitle: "TECNOLOGÍAS",
    conquered: "CONQUISTADAS",
    equipped: "{count} EQUIPADAS",
    techLabel: "TECNOLOGÍA",
    medal: "{tech}: {level}",
    levels: {
      gold: "oro",
      silver: "plata",
      bronze: "bronce",
      locked: "bloqueada",
    },
  },

  projects: {
    window: {
      title: "BASE_DE_RETOS",
      breadcrumb: "REPOSITORIO_PROYECTOS",
      recordsFound: "{count} REGISTROS",
    },
    detail: {
      title: "INSPECTOR_DE_REGISTRO",
      entry: "REGISTRO #{number}",
      nameLabel: "NOMBRE_PROYECTO",
      program: "REGISTRO_MISIÓN",
      challengeLabel: "RETO",
    },
    context: {
      title: "CONTEXTO",
      company: "EMPRESA",
      role: "PUESTO",
      period: "PERIODO",
      team: "EQUIPO",
    },
    access: {
      label: "ACCESO",
      private: "PRIVADO",
    },
    nav: {
      all: "TODOS_LOS_REGISTROS",
    },
    linkLabel: "IR_A_{target}",
    types: {
      ecommerce: "TIENDA ELECTRÓNICA",
      webApp: "APLICACIÓN WEB",
      dashboard: "PANEL DE CONTROL",
      portfolio: "PORTAFOLIO",
    },
    items: {
      farmatodo: {
        company: "Farmatodo",
        role: "Desarrollador Frontend",
        summary:
          "La tienda digital de una cadena de farmacias con cientos de locales en Colombia y Venezuela.",
        challenge:
          "Sacar el sprint adelante mientras producción lo interrumpía. Los incidentes llegan sin avisar en una tienda con mucho tráfico, y cada prioridad nueva amenaza con enterrar un bug que alguien reportó la semana pasada. La mitad del trabajo era técnica; la otra mitad, que no se perdiera nada por el camino.",
        work: [
          "Integré **pagos con PSE**, el método de transferencia bancaria más usado en Colombia, en el flujo de compra.",
          "Construí el **módulo de información de medicamentos**: dosis, advertencias y si un fármaco es seguro durante el embarazo o la lactancia.",
          "Construí una **búsqueda de productos personalizada** sobre BazaarVoice que recomienda artículos según las preferencias de cada cliente.",
          "Publiqué la página de **Farmatodo Prime**: planes de suscripción, beneficios y una etiqueta que muestra cuánto se habría ahorrado el cliente.",
          "Llevé la actualización **de Angular 11 a 16**, una versión mayor a la vez, en una tienda que no podía caerse.",
          "Hacía los despliegues a producción de las tiendas de Colombia y Venezuela, y cubría guardias de fin de semana.",
          "Di sesiones internas de capacitación en **Git y NVM** para el equipo, con diapositivas.",
        ],
      },
      uhomie: {
        company: "CodersLab",
        role: "Desarrollador Frontend",
        summary:
          "Un marketplace inmobiliario para comprar y arrendar viviendas en Chile, Colombia y Venezuela.",
        challenge:
          "El frontend fue por delante del backend casi todo el proyecto, así que buena parte del producto había que construirla, demostrarla y mantenerla viva contra APIs que todavía no existían. Mantener realista un plan a seis meses mientras el equipo cambiaba alrededor fue tanto trabajo como el código.",
        work: [
          "Construí el sitio público: home, **búsqueda de propiedades**, fichas de anuncios, comunas populares y las páginas de contenido.",
          "Puse los anuncios **en un mapa**, con el precio en cada pin para poder comparar sin abrir ni una ficha.",
          "Construí la ficha de la propiedad, un **estimador de costos** de servicios y gastos, y el flujo de **agendamiento de visitas**.",
          "Construí el panel de administración con **cuatro roles** —propietario, agente, gestor y administrador—, cada uno con sus permisos, sus anuncios y sus flujos.",
          "Implementé la autenticación y el acceso por roles en las dos aplicaciones.",
          "Planifiqué el roadmap hasta seis meses adelante, fijé prioridades y repartí el trabajo.",
          "Revisaba pull requests y acompañaba a los desarrolladores nuevos por el código.",
        ],
      },
      "v-dex": {
        company: "Proyecto personal",
        role: "Diseño && Desarrollo",
        summary: "Este portafolio: una consola portátil que tienes ahora mismo en las manos.",
        challenge:
          "Saber cuándo parar. Cada idea abría tres más, y un portafolio que no se publica no vale nada. La mayor parte del trabajo fue decidir qué se quedaba fuera: ni galerías de capturas, ni filtros para seis registros.",
        work: [
          "Construí el chasis del aparato: **dos biseles gobernados por una máquina de estados** que se cierran sobre la pantalla en cada navegación y se abren cuando la vista está lista.",
          "Sinteticé todos los sonidos **en el navegador con la Web Audio API**: sin archivos de audio, sin librería, en menos de un kilobyte de código.",
          "Dibujé todo el pixel art desde cero: medallas, logos, sprites y mapas, en **hojas de sprites** de unos pocos cientos de bytes cada una.",
          "Conecté el formulario de contacto con Resend a través de un route handler, con validación en los dos lados y **límite de peticiones** contra el abuso.",
          "Lo mantuve **accesible**: todas las animaciones respetan la preferencia de movimiento reducido, el aparato se maneja con teclado y los biseles nunca atrapan el foco.",
          "Lo construí **usando IA como herramienta de trabajo**, lo que dejó como trabajo de verdad el que no se puede delegar: decidir qué construir y qué dejar fuera.",
        ],
      },
      texastv: {
        company: "Arbelos Interactive",
        role: "Desarrollador Frontend",
        summary:
          "Una plataforma de streaming de video con cuentas multiperfil, planes y un feed de recomendaciones.",
        challenge:
          "Poner una demo funcional delante del cliente lo antes posible. Eso significó decidir, entrega tras entrega, qué era imprescindible y qué podía esperar, y construir primero las partes que había que mostrar.",
        work: [
          "Construí la autenticación y las **cuentas multiperfil**: una suscripción, varios espectadores, cada uno con su propio historial.",
          "Construí el catálogo: categorías, filtros y un **feed de recomendaciones** en la pantalla principal.",
          "Integré el reproductor de video con sus controles y dejé toda la experiencia funcionando en cualquier pantalla.",
          "Conecté **Firebase** para los datos y el manejo de sesiones.",
          "Construí los planes de suscripción y las pantallas de cuenta.",
        ],
      },
      swe: {
        company: "Arbelos Interactive",
        role: "Desarrollador Frontend",
        summary:
          "Tienda en línea y sitio de una promotora canadiense de lucha libre: merchandising, próximos eventos y noticias.",
        challenge:
          "Aquí no había nada nuevo: a esas alturas ya había construido este tipo de tienda varias veces para el mismo cliente. El trabajo era entregarla limpia y a tiempo sin que la costumbre se convirtiera en descuido.",
        work: [
          "Construí la tienda: listado de productos con **paginación y búsqueda**, fichas de producto y el **carrito de compra**.",
          "Construí la parte de contenido: próximos eventos y la sección de noticias.",
          "Construí el panel de administración que gestiona el catálogo y todo lo que se publica en el sitio.",
          "Conecté **Firebase** para los datos y la autenticación de usuarios.",
        ],
      },
      "novios-a-bordo": {
        company: "Freelance",
        role: "Único desarrollador frontend",
        summary:
          "Una mesa de regalos de bodas peruana donde los invitados aportan a un regalo: cada uno paga una parte hasta cubrirlo.",
        challenge:
          "El cliente tenía un producto funcionando en PHP y quería reconstruirlo en Angular, partiendo de una plantilla comprada. La mitad del trabajo fue quitar lo que la plantilla traía y no correspondía, actualizar dependencias viejas y hacer que el resto se comportara como un producto de verdad y no como una demo.",
        work: [
          "Reconstruí el sitio público de PHP a Angular: páginas de la mesa de regalos, partes de cada regalo y la página de los novios.",
          "Construí el panel donde los novios configuran su boda, los medios de pago, las imágenes y los colores.",
          "Construí el **flujo de regalo compartido**: un invitado aporta parte de un regalo y deja un mensaje a los novios.",
          "Tomé yo las **decisiones de diseño**, adaptando la plantilla a lo que el producto realmente necesitaba.",
        ],
      },
    },
  },

  contact: {
    window: {
      title: "CONTACTO",
      breadcrumb: "ENLACE_COMM",
      connection: "CONEXIÓN: LISTA",
    },
    mainChannel: {
      title: "CANAL_PRINCIPAL",
      noticeLabel: "NOTA",
      notice: "Haz clic para copiar. Hablemos de nuestro próximo reto.",
      toastLabel: "CORREO",
      copied: "COPIADO AL PORTAPAPELES",
      copyFailed: "NO SE PUDO COPIAR",
    },
    signal: {
      title: "ESTADO_SEÑAL",
      program: "ENLACE_COMUNICACIÓN",
      labels: {
        online: "EN LÍNEA",
        error: "ERROR",
        unavailable: "NO DISPONIBLE",
      },
      messages: {
        idle: "Esperando tu mensaje...",
        sending: "Transmitiendo...",
        sent: "Mensaje recibido. Te respondo pronto.",
        failed: "Transmisión fallida. Prueba el canal principal.",
        limited: "Canal saturado. Inténtalo mañana.",
      },
    },
    links: {
      title: "ENLACES_DIRECTOS",
    },
    form: {
      title: "CABLE_LINK",
      subtitle: "ENVIAR_MENSAJE",
      responseLabel: "TIEMPO_RESPUESTA",
      intro: "¡Hablemos! Déjame un mensaje aquí abajo.",
      saturated: {
        label: "CANAL",
        value: "SATURADO",
        body: "Has alcanzado el límite de mensajes de hoy. Escríbeme al correo o inténtalo mañana.",
      },
      fields: {
        name: { label: "NOMBRE", placeholder: "Red" },
        email: { label: "CORREO", placeholder: "ejemplo@ejemplo.com" },
        message: {
          label: "MENSAJE",
          placeholder: "¡Hey! Tengo un reto para ti. ¿Te interesa?",
        },
      },
      submit: "TRANSMITIR",
      submitting: "TRANSMITIENDO...",
      toastLabel: "SEÑAL",
      toasts: {
        invalid: "REVISA LOS CAMPOS",
        limited: "LÍMITE DIARIO ALCANZADO",
        sent: "MENSAJE TRANSMITIDO",
        failed: "TRANSMISIÓN FALLIDA",
      },
      errors: {
        tooShort: "MÍN {min} CARACTERES",
        tooLong: "MÁX {max} CARACTERES",
        invalidEmail: "DIRECCIÓN INVÁLIDA",
      },
    },
  },

  meta: {
    title: "Victor Villavicencio — Desarrollador Frontend Senior | Portafolio",
    description:
      "Desarrollador frontend con más de 10 años en Angular y React. Un portafolio construido como un aparato de bolsillo.",
    ogImageAlt: "V-DEX — Victor Villavicencio, Desarrollador Frontend Senior",
    keywords: [
      "desarrollador frontend",
      "desarrollador frontend senior",
      "rendimiento web",
      "accesibilidad",
      "remoto",
    ],
  },
};
