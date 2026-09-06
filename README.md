# Cabinet Orthéna — site internet

Site vitrine du Cabinet Orthéna (Dr Yamina IBN MEJD), Pôle Santé Victor Hugo, La Talaudière.

Site statique (HTML / CSS / JavaScript vanilla, sans framework ni étape de build), pensé pour être simple à héberger et à modifier.

## Lancer le site en local

Le dossier `scripts/serve.py` contient un petit serveur local (aucune dépendance à installer, seulement Python 3).

```bash
python3 "scripts/serve.py"
```

Puis ouvrez [http://localhost:8420](http://localhost:8420) dans votre navigateur.

Vous pouvez aussi ouvrir les fichiers `.html` directement dans un navigateur, ou utiliser n'importe quel autre serveur statique (`npx serve`, l'extension Live Server de VS Code, etc.).

## Structure du projet

```
index.html                 Accueil
cabinet-equipe.html         Le cabinet & l'équipe (photo du cabinet, technologie 3D, équipe, plateau technique)
traitements.html            Traitements & appareils (parcours patient + types d'appareils)
faq.html                    Questions fréquentes + service de garde
contact.html                Contact & accès
mentions-legales.html
confidentialite.html
cookies.html

assets/css/style.css        Système de design complet (tokens, composants, responsive, animations)
assets/js/config.js         ⭐ Configuration centrale (voir ci-dessous)
assets/js/main.js           Navigation, animations au scroll, accordéon FAQ, galerie, cookies
assets/img/                 Logo, photo réelle du cabinet, favicon
scripts/serve.py            Serveur local de prévisualisation
```

## Modifier les informations du cabinet — `assets/js/config.js`

Toutes les informations amenées à changer sont centralisées dans **`assets/js/config.js`** :

- lien Doctolib (`doctolibUrl`)
- téléphone, email
- adresse (`addressLine1`, `addressStreet`, `addressPostal`, `addressNote`)
- horaires
- informations d'accès (stationnement, transport, accessibilité)
- nom de l'assistante dentaire
- réseaux sociaux

Il suffit de renseigner les champs concernés : les pages du site se mettent à jour automatiquement (le script injecte ces valeurs dans le HTML au chargement). Tant qu'un champ est vide, le site affiche un texte de substitution clair ("à venir", "à compléter") plutôt qu'une fausse information.

**Lien Doctolib** : `doctolibUrl` pointe vers la page Doctolib officielle du Dr Yamina IBN MEJD. Tous les boutons « Prendre rendez-vous » du site (header, hero, footer, bandeaux d'appel à l'action, page Contact) l'utilisent. Pour le changer un jour, il suffit de modifier cette seule valeur.

**Adresse** : `3 Place Jean Moulin, 42350 La Talaudière` (bâtiment situé à côté de la Mairie). Elle apparaît dans le footer de chaque page et en détail sur la page Contact, qui embarque aussi une carte Google Maps réelle centrée sur cette adresse (aucune clé d'API requise pour cet embed basique). Le lien « Ouvrir l'itinéraire » (`data-cfg="mapHref"`) est généré à partir de `addressFullOneLine`.

## Images

- **Logo** : `assets/img/logo-orthena-full.jpg` (version complète) et `assets/img/logo-orthena-monogram@400.jpg` (version recadrée utilisée dans le header/footer/favicon).
- **Cabinet** (`cabinet-equipe.html#cabinet`) : galerie asymétrique de 4 photos réelles — accueil (`cabinet-accueil-01*.jpg`), salle d'attente (`cabinet-salle-attente.jpg`), salle de soin (`cabinet-salle-de-soin.jpg`), espace clinique (`cabinet-espace-clinique.jpg`).
- **Équipe** : portrait réel du Dr Yamina IBN MEJD (`equipe-yamina-portrait.jpg`). L'assistante, dont le nom n'est pas encore communiqué, n'a pour l'instant qu'une mention de son rôle (pas de portrait).
- **Plateau technique** (`cabinet-equipe.html#plateau-technique`) : chacune des 5 technologies a sa photo réelle (`tech-empreinte-numerique.jpg`, `tech-imagerie-panoramique.jpg`, `tech-espace-numerique.jpg`, `tech-sterilisation.jpg`, `tech-laboratoire-numerique.jpg`).
- **Traitements** (`traitements.html`) : chacun des 5 types d'appareils a sa photo réelle (`traitement-reeducation-fonctionnelle.jpg`, `traitement-interceptif.jpg`, `traitement-multi-attaches.jpg`, `traitement-aligneurs.jpg`, `traitement-chirurgico-orthodontique.jpg`).
- **Technologie 3D** (`cabinet-equipe.html#technologie-3d`) : conserve volontairement une illustration au trait plutôt qu'une photo, pour ne pas répéter les photos déjà utilisées juste en dessous dans le plateau technique.

Toutes les images utilisent des ratios fixes (`aspect-ratio` + `object-fit: cover` en CSS) : un remplacement de fichier ne casse jamais la mise en page, à condition de garder un cadrage similaire. Les photos sources fournies par le cabinet (hors recadrage) sont conservées telles quelles dans `raw-photos/` (non utilisé par le site, simple archive).

**Ajouter de nouvelles photos plus tard** : déposez les fichiers dans `assets/img/` (ou à la racine, comme la première fois) avec un nom explicite. La galerie du « Le cabinet » (classes `.gallery` / `.gallery-item`) accepte d'autres vignettes en suivant le même modèle que les 4 existantes (`g-a` à `g-f`, voir `assets/css/style.css`).

> Note : ce projet n'a pas eu accès à un outil de génération d'images et n'est jamais allé chercher de visuel sur Internet — seules les photos fournies par le cabinet sont utilisées. Une section sans photo disponible reste volontairement sans "placeholder" visuel plutôt que d'afficher un bloc vide ou un texte « photo à venir ».

## Ce qui n'a pas été inventé

Conformément à la consigne, aucune information suivante n'a été inventée : tarifs, horaires précis, téléphone, email, avis patients, réseaux sociaux, nom de l'assistante, certifications. Ces éléments apparaissent comme des emplacements clairement identifiés (« à venir », « à compléter ») dans le contenu et dans `assets/js/config.js`. L'adresse, le lien Doctolib et les photos du cabinet, communiqués par le cabinet, sont en revanche renseignés partout où c'est pertinent.

## SEO & accessibilité

- Meta title/description propres à chaque page, données structurées (`schema.org` : `Dentist`, `FAQPage`).
- `robots.txt` et `sitemap.xml` fournis (le nom de domaine y est un espace réservé à remplacer une fois le site déployé).
- Structure sémantique (landmarks, `h1`-`h3` hiérarchisés), navigation clavier, focus visibles, textes alternatifs sur les images, `prefers-reduced-motion` respecté pour toutes les animations.
