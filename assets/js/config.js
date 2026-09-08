/**
 * ============================================================================
 * CONFIGURATION CENTRALE — CABINET ORTHÉNA
 * ============================================================================
 * Toutes les informations susceptibles d'être modifiées ou complétées
 * (coordonnées, horaires, lien de prise de rendez-vous, nom de l'assistante,
 * réseaux sociaux...) sont centralisées ici.
 *
 * Pour mettre à jour le site, il suffit de modifier les valeurs ci-dessous :
 * elles sont automatiquement injectées dans toutes les pages par
 * assets/js/main.js (voir la fonction `applyConfig`).
 *
 * Les champs marqués "à compléter" sont des emplacements volontairement
 * laissés vides ou provisoires : aucune information (téléphone, horaires,
 * tarifs...) n'a été inventée pour la construction de ce site.
 * ============================================================================
 */

window.ORTHENA_CONFIG = {

  // ---------------------------------------------------------------------
  // Identité
  // ---------------------------------------------------------------------
  cabinetName: "Cabinet Orthéna",
  baseline: "Orthodontie exclusive",
  practitioner: "Dr Yamina IBN MEJD",

  // ---------------------------------------------------------------------
  // Prise de rendez-vous
  // ---------------------------------------------------------------------
  // ⭐ URL Doctolib officielle du Dr Yamina IBN MEJD. Tous les boutons
  // "Prendre rendez-vous" du site (header, hero, sections RDV, footer...)
  // utilisent cette seule valeur. Pour la changer un jour, il suffit de
  // modifier cette ligne : tous les boutons du site se mettent à jour
  // automatiquement, sans aucune autre modification à faire.
  doctolibUrl: "https://www.doctolib.fr/dentiste/la-talaudiere/yamina-ibn-mejd",

  // ---------------------------------------------------------------------
  // Coordonnées — téléphone et email non communiqués à ce jour
  // ---------------------------------------------------------------------
  phone: "",              // ex : "04 77 XX XX XX"
  phoneDisplay: "Téléphone à venir",
  email: "",              // ex : "contact@cabinet-orthena.fr"
  emailDisplay: "Email à venir",

  // ---------------------------------------------------------------------
  // Adresse — officielle et confirmée
  // ---------------------------------------------------------------------
  addressLine1: "Pôle Santé Victor Hugo",
  addressStreet: "3 Place Jean Moulin",
  addressPostal: "42350 La Talaudière",
  addressNote: "Bâtiment situé à côté de la Mairie.",
  // Utilisée par la carte et les liens "itinéraire"
  addressFullOneLine: "3 Place Jean Moulin, 42350 La Talaudière",

  // ---------------------------------------------------------------------
  // Horaires — lundi, mardi et samedi restent à compléter
  // ---------------------------------------------------------------------
  openingHours: [
    { day: "Mercredi", hours: "09:00 – 12:00 / 13:00 – 19:00" },
    { day: "Jeudi", hours: "09:00 – 12:00 / 13:00 – 19:00" },
    { day: "Vendredi", hours: "09:00 – 12:00 / 13:00 – 19:00" },
  ],
  // Laissé vide intentionnellement : les jours ci-dessus sont désormais
  // renseignés, donc plus de mention "communiqué prochainement" affichée.
  // Remettre un texte ici (et la ligne correspondante dans le footer/la
  // page Contact) si de nouveaux jours restent à confirmer plus tard.
  openingHoursNote: "",

  // ---------------------------------------------------------------------
  // Accès — informations pratiques à compléter
  // ---------------------------------------------------------------------
  parkingInfo: "",       // ex : "Parking gratuit sur place"
  transportInfo: "",     // ex : "Ligne de bus X, arrêt ..."
  accessibilityInfo: "", // ex : "Cabinet accessible aux personnes à mobilité réduite"

  // ---------------------------------------------------------------------
  // Équipe — noms des assistantes non communiqués à ce jour
  // ---------------------------------------------------------------------
  assistantName: "", // à compléter dès que le(s) nom(s) seront communiqués
  assistantRole: "Assistantes dentaires en formation",

  // ---------------------------------------------------------------------
  // Réseaux sociaux — aucun lien officiel fourni à ce jour
  // ---------------------------------------------------------------------
  socials: {
    instagram: "",
    facebook: "",
  },

  // ---------------------------------------------------------------------
  // Urgences
  // ---------------------------------------------------------------------
  emergencyNumber: "15",
};
