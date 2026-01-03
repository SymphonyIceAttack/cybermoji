export const common = {
  "nav.home": "Startseite",
  "nav.guides": "Anleitungen",
  "nav.blog": "Blog",
  "nav.startViewing": "Ansehen starten",
  "footer.features": "Funktionen",
  "footer.resources": "Ressourcen",
  "footer.legal": "Rechtliches",
  "footer.privacy": "Datenschutzrichtlinie",
  "footer.terms": "Nutzungsbedingungen",
  "footer.copyright": "Alle Rechte vorbehalten.",
  "footer.notAffiliated": "Nicht verbunden mit Instagram oder Meta.",
  "trust.anonymous": "100% Anonym",
  "trust.secure": "Sicher & Verschlüsselt",
  "trust.noLogin": "Kein Login erforderlich",
  "trust.users": "Über 1M Nutzer vertrauen uns",
  "cta.ready": "Bereit, anonym zu browsen?",
  "cta.subtitle":
    "Millionen von Nutzern vertrauen duckinsview für privates Instagram-Ansehen.",
  "cta.button": "Jetzt ansehen",
  "features.profileViewing": "Profil-Ansicht",
  "features.profileSubtitle": "Durchsuchen Sie jedes öffentliche Profil anonym",
  "features.storyViewing": "Story-Ansicht",
  "features.storySubtitle": "Stories ansehen, ohne gesehen zu werden",
  "features.reelsDownload": "Reels herunterladen",
  "features.reelsSubtitle": "Reels in hoher Qualität speichern",
  "features.highlightsBrowser": "Highlights-Browser",
  "features.highlightsSubtitle": "Gespeicherte Story-Sammlungen erkunden",
  "features.postsViewer": "Beitrags-Ansicht & Download",
  "features.postsSubtitle": "Fotos & Videos ansehen und speichern",
  "moreReasons.completePrivacy": "Vollständige Privatsphäre",
  "moreReasons.completePrivacyDesc":
    "Ihre Identität wird nie preisgegeben. Kein Login, keine Cookies, die Ihre Aktivität verfolgen.",
  "moreReasons.lightningFast": "Blitzschnell",
  "moreReasons.lightningFastDesc":
    "Optimierte Server liefern Inhalte in Sekunden. Kein Warten, sofortige Ergebnisse.",
  "moreReasons.worksWorldwide": "Weltweit verfügbar",
  "moreReasons.worksWorldwideDesc":
    "Zugang aus jedem Land. Keine Geo-Einschränkungen oder VPN erforderlich.",
  "moreReasons.alwaysAvailable": "Immer verfügbar",
  "moreReasons.alwaysAvailableDesc":
    "24/7 Verfügbarkeit. Unser Service ist immer bereit, wenn Sie ihn brauchen.",
  "moreReasons.secureConnection": "Sichere Verbindung",
  "moreReasons.secureConnectionDesc":
    "Alle Daten werden über verschlüsselte HTTPS-Verbindungen übertragen.",
  "moreReasons.freeForever": "Für immer kostenlos",
  "moreReasons.freeForeverDesc":
    "Kernfunktionen sind völlig kostenlos. Keine versteckten Gebühren oder Premium-Anforderungen.",
  "howItWorks.step1": "1",
  "howItWorks.step1Title": "Nutzernamen eingeben",
  "howItWorks.step1Desc":
    "Geben Sie den Instagram-Nutzernamen, den Sie ansehen möchten, in das Suchfeld ein.",
  "howItWorks.step2": "2",
  "howItWorks.step2Title": "Inhalte durchsuchen",
  "howItWorks.step2Desc":
    "Sehen Sie Profile, Beiträge, Stories, Reels und Highlights anonym an.",
  "howItWorks.step3": "3",
  "howItWorks.step3Title": "Herunterladen (Optional)",
  "howItWorks.step3Desc":
    "Speichern Sie alle Inhalte, die Ihnen gefallen, mit unserer Ein-Klick-Download-Funktion.",
  "faq.features": "Funktionen & Bedienung",
  "faq.privacy": "Datenschutz & Sicherheit",
  "faq.technical": "Technischer Support",
  "search.placeholder": "Instagram-Nutzernamen eingeben",
  "search.viewProfile": "Profil ansehen",
  "search.try": "Versuchen Sie:",
  "search.anonymous": "Anonym",
  "tabs.posts": "Beiträge",
  "tabs.stories": "Stories",
  "tabs.reels": "Reels",
  "tabs.highlights": "Highlights",
  "posts.posts": "Beiträge",
  "posts.followers": "Follower",
  "posts.following": "Folgt",
  "posts.noActiveStories": "Keine aktiven Stories",
  "posts.save": "Speichern",
  "posts.verified": "Verifiziert",
} as const;

export const home = {
  "hero.title": "Instagram anonym ansehen, ohne Konto",
  "hero.subtitle":
    "Durchsuchen Sie Instagram-Profile, Stories, Reels und Highlights privat. Kein Login erforderlich. Keine Spuren hinterlassen. 100% kostenlos.",
  "features.title": "Alles, was Sie brauchen, um Instagram privat zu nutzen",
  "features.subtitle":
    "duckinsview bietet eine vollständige Suite von Tools für anonymes Instagram-Browsing.",
  "moreReasons.title": "Weitere Gründe für duckinsview",
  "moreReasons.subtitle":
    "Neben den Kernfunktionen here's was duckinsview zur besten Wahl für anonymes Instagram-Browsing macht.",
  "howItWorks.title": "So funktioniert es",
  "howItWorks.subtitle":
    "Beginnen Sie in nur 3 einfachen Schritten, Instagram-Inhalte anonym anzusehen.",
  "faq.title": "Häufig gestellte Fragen",
  "faq.subtitle": "Schnelle Antworten zu häufigen Fragen über duckinsview.",
  "profile.bio": "Bio",
  postsCount: "Beiträge",
} as const;

export const privacy = {
  title: "Datenschutzrichtlinie",
  description: "Erfahren Sie, wie duckinsview Ihre Privatsphäre schützt und Daten verarbeitet.",
} as const;

export const terms = {
  title: "Nutzungsbedingungen",
  description: "Bedingungen für die Nutzung von duckinsview.",
} as const;

export const blog = {
  title: "Blog",
  description: "Neueste Nachrichten und Anleitungen von duckinsview.",
} as const;

export const guides = {
  anonymousStories: "Anonyme Story-Ansicht",
  competitorAnalysis: "Konkurrenzanalyse",
  noAccountNeeded: "Kein Konto erforderlich",
} as const;

const de = {
  common,
  home,
  privacy,
  terms,
  blog,
  guides,
} as const;

export type De = typeof de;
export default de;
