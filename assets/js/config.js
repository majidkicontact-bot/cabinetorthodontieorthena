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
  // Horaires — à compléter (aucun horaire n'a été fourni)
  // ---------------------------------------------------------------------
  openingHours: [
    // { day: "Lundi", hours: "9h00 – 18h00" },
  ],
  openingHoursNote: "Horaires détaillés communiqués prochainement — merci de nous contacter directement pour connaître nos disponibilités.",

  // ---------------------------------------------------------------------
  // Accès — informations pratiques à compléter
  // ---------------------------------------------------------------------
  parkingInfo: "",       // ex : "Parking gratuit sur place"
  transportInfo: "",     // ex : "Ligne de bus X, arrêt ..."
  accessibilityInfo: "", // ex : "Cabinet accessible aux personnes à mobilité réduite"

  // ---------------------------------------------------------------------
  // Équipe — nom de l'assistante non communiqué à ce jour
  // ---------------------------------------------------------------------
  assistantName: "", // à compléter dès que le nom sera communiqué
  assistantRole: "Assistante dentaire en formation",

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
