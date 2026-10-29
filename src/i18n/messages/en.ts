export const en = {
  notFound: {
    breadcrumb: "NOT_FOUND",
    body: "The address you followed has no record on this device.",
    home: "BACK_TO_HOME",
  },
  device: {
    /** Shown on every screen's title bar. */
    sync: "[SYNC]: READY",
    terminal: {
      statusLabel: "STATUS",
      statusActive: "ACTIVE",
      statusClosed: "CLOSED",
    },
    /** Accessible name of the device's centre button. */
    toggle: "Menu",
    open: "Open",
    sound: {
      /** Accessible name of the switch. */
      name: "Sound effects",
      /** Toast shown when the switch is flipped. */
      label: "SOUND",
      on: "ON",
      off: "OFF",
    },
    system: {
      label: "SYSTEM",
      reset: "RESET",
      /** Reads as `LANG_SET - ENGLISH`; the language name is its own. */
      languageSet: "LANG_SET",
    },
    locale: {
      /** Accessible name of the group of language links. */
      label: "[LANG]:",
      group: "Language",
    },
    menu: {
      title: "MENU",
      /** Accessible name of the navigation. */
      nav: "Device menu",
      idle: "Select an option to proceed",
      items: {
        about: {
          label: "About me",
          terminal: "Trainer data and skill set",
        },
        experience: {
          label: "Work experience",
          terminal: "Expedition log",
        },
        projects: {
          label: "Projects",
          terminal: "Challenge log database",
        },
        contact: {
          label: "Contact me",
          terminal: "Open a comm channel",
        },
      },
    },

    pet: {
      menu: "{name}'s actions",
      menuClose: "Close actions",
      greet: "__{name}__, say hi",
      rest: "__{name}__, go rest",
      wake: "__{name}__, wake up",
      replayTour: "__{name}__, show me the V-MANUAL",
      label: "__{name}__, the pet",
      greeting: "Hi, I'm __{name}__!",
      happy: "__{name}__ is **happy**.",
      overwhelmed: "__{name}__ is **overwhelmed**.",
      curious: "__{name}__ is very **curious**.",
    },

    welcome: {
      eyebrow: "Pokédex-Portfolio inspired",
      heading: "Welcome to V-DEX",
      intro: "Select a PixelPet to join you as you explore my portfolio",
      hint: "Once you have decided on one, press continue.",
      continue: "Continue",
    },

    tour: {
      speaker: "[{name}_SAY]:",
      skip: "Skip",
      next: "Continue",
      back: "Back",
      finish: "Finish",
      intro:
        "Hi, explorer. My name is __{name}__, your **PixelPet** companion. Let me show you three important things you should know about this portfolio.",
      steps: {
        menu: "First, you should know there are more screens than you can see. They all open from the **center button**. ((it's disabled right now))",
        cv: "On the home and contact screens you'll see the **TRAINER_CARD**. Press **DOWNLOAD** and save the trainer's resume.",
        contact:
          "Want to write to him? The **contact** screen has a form, his email, and his links.",
      },
    },
  },

  about: {
    window: {
      title: "TRAINER_INFO",
      breadcrumb: "REPOSITORY",
      number: "NO. #???",
    },
    nameLabel: "TRAINER_NAME",
    role: "Sr. Frontend Developer && Pokémon Trainer",

    bioProgram: "TRAINER_BIO",
    bio: [
      "Front-end Developer with {years}+ years of experience building scalable, optimized, and accessible web applications. I specialize in **Angular**, **React**, and **Next.js**, with an emphasis on performance: measuring with **Lighthouse**, reducing bundle size, and fixing **Core Web Vitals** regressions. I also have a strong focus on user experience and development best practices. I've led teams, running sprint planning, setting priorities, assigning tasks, and onboarding junior developers onto projects, as well as driving UX/UI improvements and delivering clean, efficient solutions aligned with business goals.",
    ],

    avatar: {
      alt: "Pixel art avatar of {name}",
      level: "LVL.{level}",
      exp: "EXP",
      years: "+{years} years",
      progress: "{years} years of experience, progress toward the next one",
    },

    habitat: {
      title: "HABITAT",
      subtitle: "LOCATION",
      region: "REGION",
      timezone: "TIMEZONE",
      maps: "VIEW_ON_MAPS",
      mapsHint: "(opens in a new tab)",
    },

    cv: {
      title: "TRAINER_CARD",
      subtitle: "CV",
      file: "FILE",
      type: "FILE_TYPE",
      size: "FILE_SIZE",
      download: "DOWNLOAD",
    },

    skillsTitle: "SKILLS",
    legend: {
      technical: "technical",
      personal: "personal",
      communication: "communication",
    },
    skills: {
      coreWebVitals: "Core Web Vitals",
      performanceProfiling: "Performance Profiling",
      codeSplitting: "Code Splitting",
      componentArchitecture: "Component Architecture",
      codeReview: "Code Review",
      aiAssistedDevelopment: "AI-Assisted Development",
      scrumAgile: "SCRUM & Agile",
      uxAccessibility: "UX & Accessibility Focus",
      leadership: "Leadership",
      mentoring: "Mentoring & Onboarding",
      ownership: "Ownership",
      technicalCommunication: "Technical Communication",
      crossFunctional: "Cross-Functional Collaboration",
      stakeholderManagement: "Stakeholder Management",
      designHandoff: "Design Handoff",
      testing: "Unit Testing",
    },
  },
  experience: {
    window: {
      title: "EXPEDITION_LOG",
      breadcrumb: "SELECTED_ROLES",
      logsFound: "{count} LOGS FOUND",
    },
    /** Terminal program name, without the extension. */
    program: "EXPERIENCE_LOG",
    companyLabel: "COMPANY",
    selectLabel: "SELECT_LOG",
    /** Badge on the card that is currently open. */
    scanning: "SCANNING",
    nav: {
      previous: "Previous roles",
      next: "Next roles",
    },
    roles: {
      coderslab: {
        role: "Frontend Developer",
        location: "Santiago, Chile \u00b7 Remote",
        log: [
          "Took on **coordinating the team**, planned the six-month roadmap with them, set priorities, and split the work.",
          "We talked directly with the **client** to gather requirements.",
          "Before committing to dates, we estimated time and tasks in **sprint planning** and built in a buffer for testing and adjustments.",
          "Coordinated meetings for a team spread across **Colombia, Chile, Ecuador, and Venezuela**, with the client in the **United States**.",
          "Reviewed pull requests, walked through the code, and supported developers joining the team.",
          "We built components with **AI** and delivered them with **unit tests**.",
          "Worked day to day with backend, QA, design, and the product department.",
        ],
        stack: ["React", "TypeScript", "Tailwind CSS", "SCSS"],
      },
      arbelos: {
        role: "Frontend Developer · Recurring contractor",
        location: "Ontario, Canada · Remote",
        log: [
          "Worked with them for **four years**, joining each new project they opened.",
          "Tasks came in through **Trello**, assigned by the lead based on who was strongest at each one.",
          "Finished my assigned work and took on additional tasks from the team.",
          "Built on the **stack and conventions already in place**.",
          "Communicated in **written English** with the designer and the administrative team.",
        ],
        stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SCSS", "Firebase"],
      },
      farmatodo: {
        role: "Frontend Developer",
        location: "Bogotá, Colombia",
        log: [
          "Turned requests from the **product department** and **the backend team** into **tasks the team could assign, plan, and prioritize**.",
          "Defined with the **designer** what was feasible to build and maintain.",
          "Drove the upgrade **from Angular 11 to 16**, one major version at a time, on a storefront that could not go down.",
          "Covered my code with **unit tests**.",
          "On my **on-call weeks** I fixed production incidents and, when needed, deployed the fix to the storefronts in **Colombia and Venezuela**.",
          "Ran internal **Git and NVM** training to unify the team's workflow.",
          "Joined through an agency, and **the company hired me directly** a year later.",
        ],
        stack: ["Angular", "TypeScript", "SCSS"],
      },
      earlyYears: {
        role: "Frontend Developer",
        location: "Agencies and studios · Remote and on-site",
        log: [
          "Worked **four years** in agencies and studios, across **Tsserapp, S9 Consulting, and Tita Media**.",
          "Started at **Tsserapp** with **AngularJS** and moved to **Angular 2** when it came out, keeping the older apps running alongside.",
          "There I reviewed code and supported the junior developers on the team.",
          "Developed hybrid apps with **Ionic**.",
          "Shipped admin dashboards in **Angular** at **S9 Consulting**.",
          "Built storefronts on **VTEX** for Colombian brands like **Mario Hernández**, **Fiotti**, **Agaval**, and **Prochampions**.",
        ],
        stack: ["Angular", "Ionic", "TypeScript", "SCSS", "VTEX", "Firebase", "Docker"],
      },
    },
  },

  /**
   * The medals panel. Top level because it shows up on two screens: the
   * about page's full stack and each project's own stack.
   */
  stack: {
    title: "GYM_BADGES",
    subtitle: "TECH_STACK",
    /** Counter on the about page: how many are mastered. */
    conquered: "CONQUERED",
    /** Counter on a project: how many it uses. */
    equipped: "{count} EQUIPPED",
    techLabel: "TECH",
    /** Text for screen readers on each medal. */
    medal: "{tech}: {level}",
    levels: {
      gold: "gold",
      silver: "silver",
      bronze: "bronze",
      locked: "locked",
    },
  },

  projects: {
    window: {
      title: "CHALLENGE_LOGS_DB",
      breadcrumb: "PROJECTS_REPOSITORY",
      recordsFound: "{count} RECORDS FOUND",
    },
    detail: {
      title: "TARGET_LOG_INSPECTOR",
      entry: "ENTRY #{number}",
      nameLabel: "PROJECT_NAME",
      program: "MISSION_LOG",
      challengeLabel: "CHALLENGE",
    },
    context: {
      title: "CONTEXT",
      company: "COMPANY",
      role: "ROLE",
      period: "PERIOD",
      team: "TEAM",
    },
    access: {
      label: "ACCESS",
      private: "PRIVATE",
    },
    nav: {
      all: "ALL_RECORDS",
    },
    /** `target` is a proper noun from projects.ts, so it survives translation. */
    linkLabel: "GO_TO_{target}",
    types: {
      ecommerce: "E-COMMERCE",
      webApp: "WEB APP",
      dashboard: "DASHBOARD",
      portfolio: "PORTFOLIO",
    },
    items: {
      farmatodo: {
        company: "Farmatodo",
        role: "Frontend Developer",
        summary:
          "The digital storefront of a pharmacy chain with hundreds of stores across Colombia and Venezuela.",
        challenge:
          "Keeping the sprint moving while production kept interrupting it. Incidents arrive without warning on a high-traffic store, and every new priority threatens to bury a bug someone reported last week. Half the work was technical; the other half was making sure nothing fell through the cracks.",
        work: [
          "Integrated **PSE payments**, the most widely used bank transfer method in Colombia, into the checkout flow.",
          "Built the **medication information module**: dosage, warnings and whether a drug is safe during pregnancy or breastfeeding.",
          "Built a **personalized product search** on top of BazaarVoice that recommends items from each customer’s preferences.",
          "Shipped the **Farmatodo Prime** landing page: subscription plans, benefits and a tag showing how much the customer would have saved.",
          "Ran the upgrade **from Angular 11 to 16**, one major version at a time, on a storefront that could not go down.",
          "Ran production deployments for the Colombian and Venezuelan storefronts, and took weekend on-call shifts.",
        ],
      },
      uhomie: {
        company: "CodersLab",
        role: "Frontend Developer",
        summary:
          "A property marketplace for buying and renting homes across Chile, Colombia and Venezuela.",
        challenge:
          "The frontend ran ahead of the backend for most of the project, so large parts of the product had to be built, demoed and kept moving against APIs that did not exist yet. Keeping a six-month plan realistic while the team changed around it was as much of the job as the code.",
        work: [
          "Built the public site: home, **property search**, listing cards, popular districts and the content pages.",
          "Put the listings **on a map**, with the price shown on each pin so you can compare without opening a single listing.",
          "Built the property detail page, a **cost estimator** for utilities and running expenses, and the **tour booking** flow.",
          "Built the admin panel with **four roles** — owner, agent, manager and admin — each with its own permissions, listings and workflows.",
          "Implemented authentication and role-based access across both apps.",
          "Planned the roadmap up to six months out, set priorities and assigned work.",
        ],
      },
      "v-dex": {
        company: "Personal project",
        role: "Design && Development",
        summary: "This portfolio: a handheld device you are holding right now.",
        challenge:
          "Knowing when to stop. Every idea opened three more, and a portfolio that never ships is worth nothing. Most of the work was deciding what stayed out: no screenshot galleries, no filters for six records.",
        work: [
          "I built the device's 'hardware', **two bezels driven by a state machine** that close over the screen on every navigation and open once the view is ready.",
          "I synthesized every sound **in the browser with the Web Audio API**, with no audio files and no library, and drew the pixel art from scratch —medals, logos, sprites, and maps— packed into **sprite sheets**.",
          "I wired the contact form to Resend through a route handler, with validation on both sides and **rate limiting** against abuse.",
          "Every animation respects the **reduced motion** preference, the entire device can be operated from the keyboard, and the bezels never trap focus.",
          "I made the site **bilingual with one route per language** —English at the root and Spanish under `/es`, each version prerendered— with the copy in **typed catalogs** where a missing translation doesn't compile.",
          "I covered the **state machine**, the contact form, and the language catalogs with tests.",
          "I built it **using AI as a working tool**, which left the real work as the part that can't be delegated: deciding what to build and what to leave out.",
        ],
      },
      texastv: {
        company: "Arbelos Interactive",
        role: "Frontend Developer",
        summary:
          "A video streaming platform with multi-profile accounts, plans and a recommendation feed.",
        challenge:
          "Getting a working demo in front of the client as early as possible. That meant deciding, release after release, what was essential and what could wait, and building the parts that had to be shown first.",
        work: [
          "Built authentication and **multi-profile accounts**: one subscription, several viewers, each with their own history.",
          "Built the catalog: categories, filters and a **recommendation feed** on the home screen.",
          "Integrated the video player with its controls and made the whole experience work on any screen.",
          "Wired up **Firebase** for data and session handling.",
          "Built the subscription plans and the account screens.",
        ],
      },
      swe: {
        company: "Arbelos Interactive",
        role: "Frontend Developer",
        summary:
          "Online store and site for a Canadian wrestling promotion: merchandise, upcoming shows and news.",
        challenge:
          "Nothing here was new: by then I had built this kind of storefront several times for the same client. The job was to deliver it cleanly and on time without letting familiarity turn into carelessness.",
        work: [
          "Built the storefront: product listing with **pagination and search**, product detail pages and the **shopping cart**.",
          "Built the content side: upcoming shows and the news section.",
          "Built the admin panel that manages the catalog and everything published on the site.",
          "Wired up **Firebase** for data and user authentication.",
        ],
      },
      "novios-a-bordo": {
        company: "Freelance",
        role: "Sole Frontend Developer",
        summary:
          "A Peruvian wedding registry where guests chip in for a gift: each one pays a share until it is covered.",
        challenge:
          "The client had a working product in PHP and wanted it rebuilt in Angular, starting from a purchased template. Half the work was removing what the template brought and did not belong, updating outdated dependencies and making the rest behave like a real product instead of a demo.",
        work: [
          "Rebuilt the public site from PHP to Angular: registry pages, gift shares and the couple’s landing page.",
          "Built the admin panel where couples configure their wedding, payment methods, images and colors.",
          "Built the **shared gift flow**: a guest contributes part of a gift and leaves a message for the couple.",
          "Took the **design decisions** myself, adapting the template to what the product actually needed.",
        ],
      },
    },
  },

  contact: {
    window: {
      title: "CONTACT_ME",
      breadcrumb: "COMM_LINK",
      connection: "[CONNECTION]: READY",
    },
    mainChannel: {
      title: "MAIN_CHANNEL",
      noticeLabel: "Trainer Notice",
      notice: "Click to copy. Let's talk about your next campaign.",
      toastLabel: "EMAIL",
      copied: "COPIED TO CLIPBOARD",
      copyFailed: "COPY FAILED",
    },
    signal: {
      title: "SIGNAL_STATUS",
      program: "COMMUNICATION_LINK",
      labels: {
        online: "ONLINE",
        error: "ERROR",
        unavailable: "UNAVAILABLE",
      },
      messages: {
        idle: "Awaiting your message...",
        sending: "Transmitting...",
        sent: "Message received. I'll get back to you soon.",
        failed: "Transmission failed. Try the main channel.",
        limited: "Channel saturated. Try again tomorrow.",
      },
    },
    links: {
      title: "DIRECT_LINKS",
    },
    form: {
      title: "CABLE_LINK",
      subtitle: "SEND_MESSAGE",
      responseLabel: "RESPONSE_TIME",
      intro: "Want to get in touch? Leave me a message below.",
      saturated: {
        label: "CHANNEL",
        value: "SATURATED",
        body: "You've reached today's transmission limit. Use the main channel or try again tomorrow.",
      },
      fields: {
        name: { label: "NAME", placeholder: "Red" },
        email: { label: "EMAIL", placeholder: "example@example.com" },
        message: {
          label: "MESSAGE",
          placeholder: "Hey! I have a challenge for you. Interested in joining?",
        },
      },
      submit: "TRANSMIT",
      submitting: "TRANSMITTING...",
      toastLabel: "SIGNAL",
      toasts: {
        invalid: "CHECK THE FIELDS",
        limited: "DAILY TRANSMISSION LIMIT REACHED",
        sent: "MESSAGE TRANSMITTED",
        failed: "TRANSMISSION FAILED",
      },
      errors: {
        tooShort: "MIN {min} CHARS",
        tooLong: "MAX {max} CHARS",
        invalidEmail: "INVALID ADDRESS",
      },
    },
  },

  meta: {
    title: "Victor Villavicencio — Senior Frontend Developer | Portfolio",
    description:
      "Frontend developer with 10+ years in Angular and React. Portfolio built as a handheld device.",
    ogImageAlt: "V-DEX — Victor Villavicencio, Senior Frontend Developer",
    keywords: [
      "frontend developer",
      "senior frontend developer",
      "web performance",
      "accessibility",
      "remote",
    ],
  },
};

export type Messages = typeof en;
