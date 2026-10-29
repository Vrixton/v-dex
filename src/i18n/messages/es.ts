import type { Messages } from "./en";

export const es: Messages = {
  notFound: {
    breadcrumb: "NO_ENCONTRADO",
    body: "La dirección que seguiste no tiene ningún registro en este dispositivo.",
    home: "VOLVER_AL_INICIO",
  },
  device: {
    sync: "[SINC]: LISTO",
    terminal: {
      statusLabel: "ESTADO",
      statusActive: "ACTIVO",
      statusClosed: "CERRADO",
    },
    toggle: "Menú",
    open: "Abrir",
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
      label: "[IDIOMA]:",
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

    pet: {
      waiting: "...",
      menu: "Acciones de {name}",
      menuClose: "Cerrar acciones",
      greet: "__{name}__, saluda",
      rest: "Ve a dormir __{name}__",
      wake: "__{name}__, despierta",
      replayTour: "__{name}__, abre el V-MANUAL",
      label: "__{name}__, la mascota",
      greeting: "¡Hola, soy __{name}__!",
      happy: "__{name}__ está **feliz**.",
      overwhelmed: "__{name}__ está **abrumado**.",
      curious: "__{name}__ tiene mucha **curiosidad**.",
    },

    welcome: {
      eyebrow: "Portafolio inspirado en una Pokédex",
      heading: "Bienvenid@ a V-DEX",
      intro: "Elige un PixelPet que te acompañe mientras exploras mi portafolio",
      hint: "Una vez te hayas decidido por una, presiona continuar.",
      continue: "Continuar",
    },

    tour: {
      speaker: "[{name}_DICE]:",
      skip: "Omitir",
      next: "Continuar",
      back: "Volver",
      finish: "Finalizar",
      intro:
        "Hola, explorador. Mi nombre es __{name}__, tu compañero **PixelPet**. Te enseño tres cosas importantes que debes saber de este portafolio.",
      steps: {
        menu: "En primer lugar debes saber que hay más pantallas de las que ves. Todas se abren desde el **botón central** {{button}} de arriba. ((Ahora está desactivado))",
        cv: "En la pantalla de inicio y en contacto verás la **FICHA_DE_ENTRENADOR** {{cartridge}}. Pulsa **DESCARGAR** y guarda la hoja de vida del entrenador.",
        contact:
          "¿Quieres escribirle? La pantalla de **contacto** tiene un formulario, su correo y sus enlaces.",
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
      exp: "EXP",
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
      testing: "Pruebas unitarias",
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
    onScreen: "EN PANTALLA",
    nav: {
      previous: "Puestos anteriores",
      next: "Puestos siguientes",
    },
    roles: {
      coderslab: {
        role: "Desarrollador Frontend",
        location: "Santiago, Chile \u00b7 Remoto",
        log: [
          "Asumí la **coordinación del equipo**, planifiqué con ellos el roadmap a seis meses, fijé prioridades y repartí el trabajo.",
          "Hablábamos directamente con el **cliente** para levantar los requerimientos.",
          "Antes de comprometer fechas, estimábamos tiempos y tareas en el **sprint planning** y reservábamos margen para pruebas y ajustes.",
          "Coordinaba las reuniones de un equipo repartido entre **Colombia, Chile, Ecuador y Venezuela**, con el cliente en **Estados Unidos**.",
          "Revisaba pull requests, explicaba el código y acompañaba a los desarrolladores que entraban al equipo.",
          "Desarrollábamos los componentes con **IA** y los entregábamos con **pruebas unitarias**.",
          "Trabajaba a diario con backend, QA, diseño y el departamento de producto.",
        ],
        stack: ["React", "TypeScript", "Tailwind CSS", "SCSS"],
      },
      arbelos: {
        role: "Desarrollador Frontend · Contratista recurrente",
        location: "Ontario, Canadá · Remoto",
        log: [
          "Trabajé con ellos **cuatro años**, entrando en cada proyecto nuevo que abrían.",
          "Las tareas llegaban por **Trello**, asignadas por el líder según quién era mejor en cada cosa.",
          "Terminaba mi asignación y tomaba trabajo adicional del equipo.",
          "Desarrollé sobre el **stack y las convenciones que ya existían** en cada proyecto.",
          "Me comunicaba **en inglés escrito** con la diseñadora y con el área administrativa.",
        ],
        stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SCSS", "Firebase"],
      },
      farmatodo: {
        role: "Desarrollador Frontend",
        location: "Bogotá, Colombia",
        log: [
          "Convertía las peticiones del **área de producto** y **el equipo de backend** en **tareas que el equipo podía asignar, planificar y priorizar**.",
          "Definía con el **diseñador** qué era viable construir y mantener.",
          "Llevé la actualización **de Angular 11 a 16**, una versión mayor a la vez, en una tienda que no podía caerse.",
          "Cubría mi código con **pruebas unitarias**.",
          "En mis **semanas de guardia** resolvía incidentes en producción y, si hacía falta, desplegaba el arreglo en las tiendas de **Colombia y Venezuela**.",
          "Dicté capacitaciones internas de **Git y NVM** para unificar el flujo de trabajo del equipo.",
          "Entré a través de una agencia y **la empresa me contrató directamente** un año después.",
        ],
        stack: ["Angular", "TypeScript", "SCSS"],
      },
      earlyYears: {
        role: "Desarrollador Frontend",
        location: "Agencias y estudios · Remoto y presencial",
        log: [
          "Trabajé **cuatro años** en agencias y estudios de desarrollo, entre **Tsserapp, S9 Consulting y Tita Media**.",
          "Empecé en **Tsserapp** con **AngularJS** y pasé a **Angular 2** cuando salió, manteniendo en paralelo las aplicaciones anteriores.",
          "Allí revisaba código y acompañaba a los desarrolladores del equipo.",
          "Desarrollé aplicaciones híbridas con **Ionic**.",
          "Hice paneles de administración en **Angular** en **S9 Consulting**.",
          "Construí tiendas en **VTEX** para marcas colombianas como **Mario Hernández**, **Fiotti**, **Agaval** y **Prochampions**.",
        ],
        stack: ["Angular", "Ionic", "TypeScript", "SCSS", "VTEX", "Firebase", "Docker"],
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
        ],
      },
      "v-dex": {
        company: "Proyecto personal",
        role: "Diseño && Desarrollo",
        summary: "Este portafolio simula un dispositivo portátil para guardar registros.",
        challenge:
          "Saber cuándo parar. Cada idea abría tres más, y un portafolio que no se publica no vale nada. La mayor parte del trabajo fue decidir qué se quedaba fuera: ni galerías de capturas, ni filtros para seis registros.",
        work: [
          "Construí el 'hardware' del dispositivo, **dos biseles gobernados por una máquina de estados** que se cierran sobre la pantalla en cada navegación y se abren cuando la vista está lista.",
          "Sinteticé los sonidos **en el navegador con la Web Audio API**, sin archivos de audio ni librería, y dibujé el pixel art desde cero —medallas, logos, sprites y mapas— empaquetado en **hojas de sprites**.",
          "Conecté el formulario de contacto con Resend a través de un route handler, con validación en los dos lados y **límite de peticiones** contra el abuso.",
          "Todas las animaciones respetan la preferencia de **movimiento reducido**, el dispositivo se maneja completo con teclado y los biseles nunca atrapan el foco.",
          "Hice el sitio **bilingüe con una ruta por idioma** —el inglés en la raíz y el español bajo `/es`, cada versión prerenderizada— con los textos en **catálogos tipados** donde una traducción que falte no compila.",
          "Cubrí con pruebas la **máquina de estados**, el formulario de contacto y los catálogos de idioma.",
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
      connection: "[CONEXIÓN]: LISTA",
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
