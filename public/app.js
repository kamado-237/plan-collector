// ─── DONNÉES LOCALES ───
let plantesDB = JSON.parse(localStorage.getItem('plantesDB') || '[]');
let currentData = null;

const API_BASE = 'http://localhost:3000/api/scrape';

// Noms scientifiques connus
const NOMS_SCIENTIFIQUES = {
  'aloe vera': 'Aloe barbadensis', 'gingembre': 'Zingiber officinale',
  'moringa': 'Moringa oleifera', 'curcuma': 'Curcuma longa',
  'neem': 'Azadirachta indica', 'ashwagandha': 'Withania somnifera',
  'ginseng': 'Panax ginseng', 'ginkgo': 'Ginkgo biloba',
  'lavande': 'Lavandula angustifolia', 'romarin': 'Rosmarinus officinalis',
  'camomille': 'Matricaria chamomilla', 'menthe': 'Mentha piperita',
  'thym': 'Thymus vulgaris', 'valériane': 'Valeriana officinalis',
  'echinacea': 'Echinacea purpurea', 'millepertuis': 'Hypericum perforatum',
  'artemisia': 'Artemisia annua', 'baobab': 'Adansonia digitata',
  'hibiscus': 'Hibiscus sabdariffa', 'maca': 'Lepidium meyenii',
  'guarana': 'Paullinia cupana', 'yerba mate': 'Ilex paraguariensis',
  'stevia': 'Stevia rebaudiana', 'cranberry': 'Vaccinium macrocarpon',
  'goldenseal': 'Hydrastis canadensis', 'saw palmetto': 'Serenoa repens',
  'boswellia': 'Boswellia serrata', 'brahmi': 'Bacopa monnieri',
  'tulsi': 'Ocimum tenuiflorum', 'shatavari': 'Asparagus racemosus',
  'guduchi': 'Tinospora cordifolia', 'amla': 'Emblica officinalis',
  'griffonia': 'Griffonia simplicifolia', 'rooibos': 'Aspalathus linearis',
  'gotu kola': 'Centella asiatica', 'cat claw': 'Uncaria tomentosa',
  'pau d arco': 'Tabebuia impetiginosa', 'reishi': 'Ganoderma lucidum',
  'astragalus': 'Astragalus membranaceus', 'dong quai': 'Angelica sinensis',
  'schisandra': 'Schisandra chinensis', 'réglisse': 'Glycyrrhiza glabra',
  'eucalyptus': 'Eucalyptus globulus', 'tea tree': 'Melaleuca alternifolia',
  'fenouil': 'Foeniculum vulgare', 'sauge': 'Salvia officinalis',
  'mélisse': 'Melissa officinalis', 'origan': 'Origanum vulgare',
  'basilic': 'Ocimum basilicum', 'ail': 'Allium sativum',
  'cannelle': 'Cinnamomum verum', 'cardamome': 'Elettaria cardamomum',
  'clou de girofle': 'Syzygium aromaticum', 'poivre noir': 'Piper nigrum',
  'papaye': 'Carica papaya', 'grenade': 'Punica granatum',
  'myrtille': 'Vaccinium myrtillus', 'sureau': 'Sambucus nigra',
  'aubépine': 'Crataegus monogyna', 'tilleul': 'Tilia cordata',
  'passiflore': 'Passiflora incarnata', 'houblon': 'Humulus lupulus',
  'bardane': 'Arctium lappa', 'pissenlit': 'Taraxacum officinale',
  'ortie': 'Urtica dioica', 'chardon marie': 'Silybum marianum',
  'artichaut': 'Cynara scolymus', 'calendula': 'Calendula officinalis',
  'arnica': 'Arnica montana', 'consoude': 'Symphytum officinale',
  'achillée': 'Achillea millefolium', 'bourrache': 'Borago officinalis',
  'harpagophytum': 'Harpagophytum procumbens', 'pygeum': 'Prunus africana',
  'kigelia': 'Kigelia africana', 'cola': 'Cola nitida',
  'tamarind': 'Tamarindus indica', 'parkia': 'Parkia biglobosa',
  'irvingia': 'Irvingia gabonensis', 'hoodia': 'Hoodia gordonii',
  'buchu': 'Agathosma betulina', 'rauvolfia': 'Rauwolfia vomitoria',
  'kalmegh': 'Andrographis paniculata', 'guggul': 'Commiphora mukul',
  'pippali': 'Piper longum', 'manjistha': 'Rubia cordifolia',
  'lemongrass': 'Cymbopogon citratus', 'galanga': 'Alpinia galanga',
  'muscade': 'Myristica fragrans', 'spiruline': 'Spirulina platensis',
  'chlorella': 'Chlorella vulgaris', 'noni': 'Morinda citrifolia',
  'açaï': 'Euterpe oleracea', 'goji': 'Lycium barbarum',
  'cordyceps': 'Cordyceps sinensis', 'maitake': 'Grifola frondosa',
  'shiitake': 'Lentinula edodes', 'aloe ferox': 'Aloe ferox'
};

const FAMILLES = {
  'aloe vera': 'Asphodelaceae', 'aloe ferox': 'Asphodelaceae',
  'gingembre': 'Zingiberaceae', 'curcuma': 'Zingiberaceae', 'galanga': 'Zingiberaceae', 'cardamome': 'Zingiberaceae',
  'moringa': 'Moringaceae',
  'neem': 'Meliaceae', 'pygeum': 'Rosaceae',
  'ashwagandha': 'Solanaceae',
  'ginseng': 'Araliaceae', 'gotu kola': 'Araliaceae',
  'ginkgo': 'Ginkgoaceae',
  'lavande': 'Lamiaceae', 'romarin': 'Lamiaceae', 'thym': 'Lamiaceae', 'menthe': 'Lamiaceae', 'sauge': 'Lamiaceae', 'mélisse': 'Lamiaceae', 'origan': 'Lamiaceae', 'basilic': 'Lamiaceae', 'tulsi': 'Lamiaceae',
  'camomille': 'Asteraceae', 'artemisia': 'Asteraceae', 'chardon marie': 'Asteraceae', 'artichaut': 'Asteraceae', 'calendula': 'Asteraceae', 'arnica': 'Asteraceae', 'achillée': 'Asteraceae', 'pissenlit': 'Asteraceae', 'bardane': 'Asteraceae',
  'hibiscus': 'Malvaceae', 'baobab': 'Malvaceae',
  'echinacea': 'Asteraceae', 'millepertuis': 'Hypericaceae',
  'valériane': 'Caprifoliaceae', 'sureau': 'Adoxaceae',
  'maca': 'Brassicaceae',
  'guarana': 'Sapindaceae', 'cola': 'Malvaceae',
  'yerba mate': 'Aquifoliaceae', 'cranberry': 'Ericaceae', 'myrtille': 'Ericaceae',
  'stevia': 'Asteraceae',
  'goldenseal': 'Ranunculaceae',
  'saw palmetto': 'Arecaceae',
  'boswellia': 'Burseraceae', 'guggul': 'Burseraceae',
  'brahmi': 'Plantaginaceae',
  'shatavari': 'Asparagaceae',
  'guduchi': 'Menispermaceae',
  'amla': 'Phyllanthaceae',
  'griffonia': 'Fabaceae', 'tamarind': 'Fabaceae', 'parkia': 'Fabaceae', 'irvingia': 'Irvingiaceae',
  'rooibos': 'Fabaceae',
  'cat claw': 'Rubiaceae', 'noni': 'Rubiaceae',
  'pau d arco': 'Bignoniaceae',
  'reishi': 'Ganodermataceae', 'cordyceps': 'Cordycipitaceae', 'maitake': 'Meripilaceae', 'shiitake': 'Omphalotaceae',
  'astragalus': 'Fabaceae',
  'dong quai': 'Apiaceae', 'fenouil': 'Apiaceae',
  'schisandra': 'Schisandraceae',
  'réglisse': 'Fabaceae', 'pippali': 'Piperaceae', 'poivre noir': 'Piperaceae',
  'eucalyptus': 'Myrtaceae', 'tea tree': 'Myrtaceae', 'clou de girofle': 'Myrtaceae',
  'ail': 'Amaryllidaceae',
  'cannelle': 'Lauraceae',
  'muscade': 'Myristicaceae',
  'papaye': 'Caricaceae',
  'grenade': 'Lythraceae',
  'aubépine': 'Rosaceae', 'consoude': 'Boraginaceae', 'bourrache': 'Boraginaceae',
  'tilleul': 'Malvaceae',
  'passiflore': 'Passifloraceae',
  'houblon': 'Cannabaceae', 'ortie': 'Urticaceae',
  'harpagophytum': 'Pedaliaceae',
  'kigelia': 'Bignoniaceae',
  'hoodia': 'Apocynaceae', 'rauvolfia': 'Apocynaceae',
  'buchu': 'Rutaceae',
  'kalmegh': 'Acanthaceae',
  'manjistha': 'Rubiaceae',
  'lemongrass': 'Poaceae',
  'spiruline': 'Spirulinaceae', 'chlorella': 'Chlorellaceae',
  'açaï': 'Arecaceae',
  'goji': 'Solanaceae',
  'lé': 'Solanaceae'
};

const REGIONS = {
  'aloe vera': 'Afrique du Nord', 'aloe ferox': 'Afrique du Sud',
  'moringa': 'Afrique de l\'Ouest', 'baobab': 'Afrique de l\'Ouest', 'parkia': 'Afrique de l\'Ouest', 'irvingia': 'Afrique de l\'Ouest', 'griffonia': 'Afrique de l\'Ouest', 'cola': 'Afrique de l\'Ouest',
  'hibiscus': 'Afrique Centrale', 'artemisia': 'Afrique Centrale', 'kigelia': 'Afrique Centrale', 'rauvolfia': 'Afrique Centrale',
  'neem': 'Asie du Sud', 'ashwagandha': 'Asie du Sud', 'curcuma': 'Asie du Sud', 'brahmi': 'Asie du Sud', 'shatavari': 'Asie du Sud', 'guduchi': 'Asie du Sud', 'amla': 'Asie du Sud', 'boswellia': 'Asie du Sud', 'guggul': 'Asie du Sud', 'kalmegh': 'Asie du Sud', 'pippali': 'Asie du Sud', 'manjistha': 'Asie du Sud', 'tulsi': 'Asie du Sud',
  'gingembre': 'Asie du Sud-Est', 'galanga': 'Asie du Sud-Est', 'lemongrass': 'Asie du Sud-Est', 'muscade': 'Asie du Sud-Est', 'clou de girofle': 'Asie du Sud-Est', 'cardamome': 'Asie du Sud-Est',
  'ginseng': 'Asie de l\'Est', 'ginkgo': 'Asie de l\'Est', 'reishi': 'Asie de l\'Est', 'astragalus': 'Asie de l\'Est', 'dong quai': 'Asie de l\'Est', 'schisandra': 'Asie de l\'Est', 'cordyceps': 'Asie de l\'Est', 'maitake': 'Asie de l\'Est', 'shiitake': 'Asie de l\'Est',
  'lavande': 'Méditerranée', 'romarin': 'Méditerranée', 'thym': 'Méditerranée', 'sauge': 'Méditerranée', 'origan': 'Méditerranée', 'fenouil': 'Méditerranée', 'cannelle': 'Méditerranée', 'réglisse': 'Méditerranée',
  'camomille': 'Europe', 'menthe': 'Europe', 'valériane': 'Europe', 'millepertuis': 'Europe', 'echinacea': 'Europe', 'sureau': 'Europe', 'tilleul': 'Europe', 'passiflore': 'Europe', 'houblon': 'Europe', 'bardane': 'Europe', 'pissenlit': 'Europe', 'ortie': 'Europe', 'chardon marie': 'Europe', 'artichaut': 'Europe', 'calendula': 'Europe', 'arnica': 'Europe', 'consoude': 'Europe', 'achillée': 'Europe', 'bourrache': 'Europe', 'mélisse': 'Europe', 'aubépine': 'Europe',
  'ail': 'Méditerranée', 'basilic': 'Méditerranée',
  'maca': 'Amérique du Nord', 'cat claw': 'Amérique du Nord', 'pau d arco': 'Amérique du Nord', 'guarana': 'Amérique du Nord', 'yerba mate': 'Amérique du Nord', 'stevia': 'Amérique du Nord', 'cranberry': 'Amérique du Nord', 'goldenseal': 'Amérique du Nord', 'saw palmetto': 'Amérique du Nord',
  'rooibos': 'Afrique du Sud', 'buchu': 'Afrique du Sud', 'hoodia': 'Afrique du Sud', 'harpagophytum': 'Afrique du Sud', 'pygeum': 'Afrique de l\'Est',
  'gotu kola': 'Asie du Sud-Est',
  'noni': 'Asie du Sud-Est', 'açaï': 'Amérique du Nord', 'goji': 'Asie de l\'Est',
  'spiruline': 'Afrique Centrale', 'chlorella': 'Asie de l\'Est',
  'papaye': 'Amérique du Nord', 'grenade': 'Méditerranée', 'myrtille': 'Europe',
  'poivre noir': 'Asie du Sud', 'tamarind': 'Afrique de l\'Est'
};

const DESCRIPTIONS = {
  'aloe vera': 'Plante succulente aux propriétés cicatrisantes, hydratantes et anti-inflammatoires reconnues mondialement.',
  'moringa': 'Surnommé "arbre de vie", riche en vitamines, minéraux et acides aminés essentiels.',
  'gingembre': 'Rhizome aux puissantes propriétés anti-inflammatoires, digestives et antiémétiques.',
  'curcuma': 'Épice dorée aux remarquables propriétés antioxydantes et anti-inflammatoires grâce à la curcumine.',
  'neem': 'Arbre aux propriétés antibactériennes, antifongiques, antiparasitaires et immunostimulantes.',
  'ashwagandha': 'Plante adaptogène ayurvédique réduisant le stress, améliorant la mémoire et renforçant l\'immunité.',
  'ginseng': 'Racine tonifiante utilisée depuis 5000 ans en médecine traditionnelle chinoise contre la fatigue.',
  'ginkgo': 'Plus vieil arbre du monde, améliore la circulation cérébrale et protège les neurones.',
  'lavande': 'Plante aromatique aux propriétés calmantes, antiseptiques, analgésiques et cicatrisantes.',
  'romarin': 'Plante stimulante aux propriétés antioxydantes, antiseptiques et améliore la mémoire.',
  'camomille': 'Fleur apaisante aux propriétés anti-inflammatoires, digestives et favorisant le sommeil.',
  'menthe': 'Plante rafraîchissante aux propriétés digestives, analgésiques et décongestionnantes.',
  'thym': 'Herbe aromatique aux puissantes propriétés antiseptiques, expectorantes et antifongiques.',
  'valériane': 'Racine sédative naturelle favorisant le sommeil et réduisant l\'anxiété sans accoutumance.',
  'echinacea': 'Plante immunostimulante réduisant la durée et la sévérité des infections respiratoires.',
  'millepertuis': 'Plante aux propriétés antidépressives, anxiolytiques et antivirales bien documentées.',
  'artemisia': 'Source naturelle d\'artémisinine, principal traitement du paludisme dans le monde.',
  'baobab': 'Arbre emblématique d\'Afrique dont le fruit contient 6 fois plus de vitamine C que l\'orange.',
  'hibiscus': 'Fleur aux propriétés antioxydantes, hypotensives et riche en anthocyanes bénéfiques.',
  'maca': 'Racine andine aux propriétés adaptogènes, stimulantes et améliorant la fertilité.',
  'guarana': 'Graine riche en caféine naturelle, stimulant physique et mental puissant d\'Amazonie.',
  'yerba mate': 'Feuille stimulante riche en caféine, théobromine et antioxydants, boisson nationale argentine.',
  'stevia': 'Plante aux feuilles 300 fois plus sucrées que le sucre, sans calories ni effets glycémiques.',
  'cranberry': 'Petite baie rouge aux propriétés préventives contre les infections urinaires reconnues.',
  'goldenseal': 'Plante aux propriétés antibactériennes et immunostimulantes utilisée en médecine amérindienne.',
  'saw palmetto': 'Palmier nain dont les baies traitent l\'hyperplasie bénigne de la prostate efficacement.',
  'boswellia': 'Résine anti-inflammatoire puissante utilisée en ayurveda contre l\'arthrite et les douleurs.',
  'brahmi': 'Plante nootropique améliorant la mémoire, la concentration et réduisant l\'anxiété.',
  'tulsi': 'Basilic sacré indien aux propriétés adaptogènes, antibactériennes et immunomodulatrices.',
  'shatavari': 'Plante ayurvédique équilibrant les hormones féminines et favorisant la lactation.',
  'guduchi': 'Plante immunomodulatrice puissante utilisée contre les fièvres et les infections chroniques.',
  'amla': 'Fruit le plus riche en vitamine C au monde, puissant antioxydant et tonique général.',
  'griffonia': 'Graine riche en 5-HTP, précurseur de la sérotonine, aide contre la dépression et l\'insomnie.',
  'rooibos': 'Plante sud-africaine sans caféine, riche en antioxydants et bénéfique pour la peau.',
  'gotu kola': 'Plante cicatrisante améliorant la circulation, la mémoire et réduisant l\'anxiété.',
  'cat claw': 'Liane amazonienne aux puissantes propriétés anti-inflammatoires et immunostimulantes.',
  'pau d arco': 'Écorce d\'arbre aux propriétés antifongiques, antibactériennes et anticancéreuses étudiées.',
  'reishi': 'Champignon de longévité chinois aux propriétés immunomodulatrices et adaptogènes exceptionnelles.',
  'astragalus': 'Plante tonique majeure de la médecine chinoise renforçant l\'immunité et l\'énergie vitale.',
  'dong quai': 'Racine surnommée "ginseng féminin", régule les cycles menstruels et soulage les douleurs.',
  'schisandra': 'Baie adaptogène aux cinq saveurs, améliore les performances physiques et mentales.',
  'réglisse': 'Racine sucrée aux propriétés anti-inflammatoires, antivirales et protectrices du foie.',
  'eucalyptus': 'Arbre aux propriétés expectorantes, antiseptiques et décongestionnantes très efficaces.',
  'tea tree': 'Huile essentielle antiseptique, antifongique et antibactérienne à large spectre d\'action.',
  'fenouil': 'Plante digestive carminative réduisant les ballonnements, les spasmes et les coliques.',
  'sauge': 'Herbe aromatique aux propriétés antiseptiques, astringentes et équilibrant les hormones féminines.',
  'mélisse': 'Plante calmante aux propriétés antivirales, anxiolytiques et favorisant la digestion.',
  'origan': 'Herbe aromatique aux puissantes propriétés antibactériennes, antifongiques et antioxydantes.',
  'basilic': 'Plante aromatique aux propriétés anti-inflammatoires, antibactériennes et adaptogènes.',
  'ail': 'Bulbe aux propriétés antibiotiques, cardiovasculaires et immunostimulantes exceptionnelles.',
  'cannelle': 'Écorce aromatique régulant la glycémie, antibactérienne et réchauffante en médecine chinoise.',
  'cardamome': 'Épice digestive aux propriétés carminatives, antiseptiques et améliorant l\'haleine.',
  'clou de girofle': 'Bouton floral aux propriétés analgésiques, antiseptiques et anti-inflammatoires puissantes.',
  'poivre noir': 'Épice aux propriétés digestives, absorbantes et augmentant la biodisponibilité des nutriments.',
  'papaye': 'Fruit tropical dont la papaïne améliore la digestion des protéines et réduit l\'inflammation.',
  'grenade': 'Fruit aux puissantes propriétés antioxydantes, cardiovasculaires et anticancéreuses étudiées.',
  'myrtille': 'Baie riche en anthocyanes protégeant la vision, le cerveau et les vaisseaux sanguins.',
  'sureau': 'Baie et fleur antivirales réduisant la durée de la grippe et renforçant l\'immunité.',
  'aubépine': 'Plante cardioprotectrice régulant la tension artérielle et renforçant le muscle cardiaque.',
  'tilleul': 'Fleur calmante aux propriétés sédatives légères, sudorifiques et antispasmodiques.',
  'passiflore': 'Plante sédative naturelle réduisant l\'anxiété, l\'insomnie et les palpitations cardiaques.',
  'houblon': 'Plante aux propriétés sédatives, digestives et estrogéniques utilisée contre l\'insomnie.',
  'bardane': 'Racine dépurative stimulant le foie, les reins et traitant les problèmes de peau.',
  'pissenlit': 'Plante diurétique et dépurative riche en vitamines A, C et K, stimule le foie.',
  'ortie': 'Plante nutritive riche en fer, anti-allergique et soulageant les douleurs articulaires.',
  'chardon marie': 'Plante hépatoprotectrice régénérant les cellules du foie grâce à la silymarine.',
  'artichaut': 'Plante dépurative stimulant la production de bile et protégeant le foie efficacement.',
  'calendula': 'Fleur aux propriétés cicatrisantes, anti-inflammatoires et antiseptiques pour la peau.',
  'arnica': 'Plante aux propriétés anti-inflammatoires et analgésiques contre les contusions et douleurs musculaires.',
  'consoude': 'Plante cicatrisante accélérant la guérison des fractures, entorses et plaies cutanées.',
  'achillée': 'Plante hémostatique, anti-inflammatoire et tonique digestive aux multiples usages médicinaux.',
  'bourrache': 'Plante riche en acide gamma-linolénique, anti-inflammatoire et bénéfique pour la peau.',
  'harpagophytum': 'Racine africaine aux puissantes propriétés anti-inflammatoires contre l\'arthrite et les douleurs.',
  'pygeum': 'Écorce africaine traitant les troubles prostatiques et urinaires chez l\'homme.',
  'kigelia': 'Fruit africain aux propriétés antifongiques, antibactériennes et cicatrisantes pour la peau.',
  'cola': 'Graine stimulante riche en caféine et théobromine, tonique général utilisé en Afrique occidentale.',
  'tamarind': 'Fruit aux propriétés digestives, laxatives et riche en acide tartrique et antioxydants.',
  'parkia': 'Graine africaine aux propriétés antibactériennes et nutritionnelles importantes.',
  'irvingia': 'Graine africaine aux propriétés amaigrissantes et régulatrices de la glycémie étudiées.',
  'hoodia': 'Plante succulente africaine aux propriétés coupe-faim utilisée par les San du Kalahari.',
  'buchu': 'Plante sud-africaine aux propriétés diurétiques, antiseptiques et traitant les infections urinaires.',
  'rauvolfia': 'Plante africaine source de réserpine, utilisée contre l\'hypertension artérielle.',
  'kalmegh': 'Plante indienne aux puissantes propriétés immunostimulantes, antivirales et hépatoprotectrices.',
  'guggul': 'Résine ayurvédique réduisant le cholestérol, les triglycérides et l\'inflammation articulaire.',
  'pippali': 'Poivre long indien stimulant la digestion et améliorant l\'absorption des médicaments.',
  'manjistha': 'Plante ayurvédique dépurant le sang, traitant les maladies de peau et les inflammations.',
  'lemongrass': 'Herbe citronnée aux propriétés antibactériennes, antifongiques, digestives et anxiolytiques.',
  'galanga': 'Rhizome aromatique aux propriétés digestives, anti-inflammatoires et antibactériennes.',
  'muscade': 'Épice aux propriétés digestives, analgésiques et utilisée en petites doses comme sédatif.',
  'spiruline': 'Microalgue bleue-verte exceptionnellement riche en protéines, vitamines et minéraux essentiels.',
  'chlorella': 'Microalgue verte détoxifiante chélatant les métaux lourds et renforçant l\'immunité.',
  'noni': 'Fruit tropical aux propriétés antioxydantes, anti-inflammatoires et immunostimulantes reconnues.',
  'açaï': 'Baie amazonienne ultra-riche en antioxydants, acides gras essentiels et anthocyanes.',
  'goji': 'Baie tibétaine aux propriétés antioxydantes, immunostimulantes et protégeant la vision.',
  'cordyceps': 'Champignon parasite tibétain améliorant les performances sportives et la libido.',
  'maitake': 'Champignon japonais aux puissantes propriétés immunomodulatrices et anticancéreuses étudiées.',
  'shiitake': 'Champignon asiatique riche en lentinane, puissant immunostimulant et anticholestérol.',
  'aloe ferox': 'Aloès du Cap aux propriétés laxatives, cicatrisantes et détoxifiantes plus puissantes que l\'aloe vera.'
};

const EMOJIS = ['🌿', '🌱', '🍃', '🌾', '🌺', '🍀', '🌼', '🌻', '🍂', '🌵'];

function getEmoji(nom) {
  const idx = nom.charCodeAt(0) % EMOJIS.length;
  return EMOJIS[idx];
}

function getNomScientifique(nom) {
  return NOMS_SCIENTIFIQUES[nom.toLowerCase()] || 'Espèce non identifiée';
}

function getFamille(nom) {
  return FAMILLES[nom.toLowerCase()] || 'Famille inconnue';
}

function getRegion(nom) {
  return REGIONS[nom.toLowerCase()] || 'Région inconnue';
}

function getDescription(nom) {
  return DESCRIPTIONS[nom.toLowerCase()] || 'Plante médicinale aux nombreuses propriétés thérapeutiques reconnues.';
}

// ─── DONNÉES DE DÉMONSTRATION (100 plantes) ───
function genererDate(jourOffset) {
  const d = new Date('2026-01-01');
  d.setDate(d.getDate() + jourOffset);
  return d.toISOString();
}

const NOMS_PLANTES = [
  'Aloe vera', 'Moringa', 'Gingembre', 'Curcuma', 'Neem',
  'Ashwagandha', 'Ginseng', 'Ginkgo', 'Lavande', 'Romarin',
  'Camomille', 'Menthe', 'Thym', 'Valériane', 'Echinacea',
  'Millepertuis', 'Artemisia', 'Baobab', 'Hibiscus', 'Maca',
  'Guarana', 'Yerba mate', 'Stevia', 'Cranberry', 'Goldenseal',
  'Saw palmetto', 'Boswellia', 'Brahmi', 'Tulsi', 'Shatavari',
  'Guduchi', 'Amla', 'Griffonia', 'Rooibos', 'Gotu kola',
  'Cat claw', 'Pau d arco', 'Reishi', 'Astragalus', 'Dong quai',
  'Schisandra', 'Réglisse', 'Eucalyptus', 'Tea tree', 'Fenouil',
  'Sauge', 'Mélisse', 'Origan', 'Basilic', 'Ail',
  'Cannelle', 'Cardamome', 'Clou de girofle', 'Poivre noir', 'Papaye',
  'Grenade', 'Myrtille', 'Sureau', 'Aubépine', 'Tilleul',
  'Passiflore', 'Houblon', 'Bardane', 'Pissenlit', 'Ortie',
  'Chardon marie', 'Artichaut', 'Calendula', 'Arnica', 'Consoude',
  'Achillée', 'Bourrache', 'Harpagophytum', 'Pygeum', 'Kigelia',
  'Cola', 'Tamarind', 'Parkia', 'Irvingia', 'Hoodia',
  'Buchu', 'Rauvolfia', 'Kalmegh', 'Guggul', 'Pippali',
  'Manjistha', 'Lemongrass', 'Galanga', 'Muscade', 'Spiruline',
  'Chlorella', 'Noni', 'Açaï', 'Goji', 'Cordyceps',
  'Maitake', 'Shiitake', 'Aloe ferox', 'Millepertuis', 'Valériane'
];

const DEMO_PLANTES = NOMS_PLANTES.slice(0, 98).map((nom, i) => ({
  nom,
  nom_scientifique: getNomScientifique(nom),
  famille: getFamille(nom),
  region: getRegion(nom),
  description: getDescription(nom),
  image: null,
  url_wikipedia: `https://fr.wikipedia.org/wiki/${encodeURIComponent(nom)}`,
  date: genererDate(i)
}));

// ─── NAVIGATION ───
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  const titles = {
    dashboard: 'Tableau de bord',
    collecte: 'Collecte de données',
    base: 'Base de données',
    analyses: 'Analyses statistiques'
  };
  document.getElementById('topbarTitle').textContent = titles[page];

  const navItems = document.querySelectorAll('.nav-item');
  const pages = ['dashboard', 'collecte', 'base', 'analyses'];
  const idx = pages.indexOf(page);
  if (navItems[idx]) navItems[idx].classList.add('active');

  if (page === 'dashboard') renderDashboard();
  if (page === 'base') renderBase();
  if (page === 'analyses') renderAnalyses();

  if (window.innerWidth <= 900) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// ─── COLLECTE ───
function quickSearch(name) {
  document.getElementById('plantInput').value = name;
  searchPlant();
}

async function searchPlant() {
  const plant = document.getElementById('plantInput').value.trim();
  if (!plant) return alert('Entrez le nom d\'une plante !');

  hide('result');
  hide('error');
  show('loader');

  try {
    const response = await fetch(`${API_BASE}?plant=${encodeURIComponent(plant)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Erreur inconnue');
    currentData = data;
    displayResult(data);
  } catch (err) {
    hide('loader');
    show('error');
    document.getElementById('error').textContent = `❌ ${err.message}`;
  }
}

function displayResult(data) {
  hide('loader');
  document.getElementById('plantName').textContent = data.nom;
  document.getElementById('plantDesc').textContent = data.description || 'Aucune description disponible.';
  document.getElementById('formula').textContent = data.formule_moleculaire || 'Non disponible';
  document.getElementById('source').textContent = data.source;
  document.getElementById('collectDate').textContent = `📅 Collecté le : ${new Date(data.date_collecte).toLocaleString('fr-FR')}`;
  const wikiLink = document.getElementById('wikiLink');
  wikiLink.href = data.url_wikipedia || '#';
  const img = document.getElementById('plantImage');
  if (data.image) { img.src = data.image; img.style.display = 'block'; }
  else { img.style.display = 'none'; }
  show('result');
}

function exportJSON() {
  if (!currentData) return;
  const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${currentData.nom}.json`;
  a.click();
}

function exportCSV() {
  if (!currentData) return;
  const headers = ['Nom', 'Description', 'Formule Moleculaire', 'Source', 'URL Wikipedia', 'Date Collecte'];
  const values = [
    currentData.nom,
    `"${(currentData.description || '').replace(/"/g, "'")}"`,
    currentData.formule_moleculaire || 'N/A',
    currentData.source,
    currentData.url_wikipedia || 'N/A',
    new Date(currentData.date_collecte).toLocaleString('fr-FR')
  ];
  const csv = headers.join(';') + '\n' + values.join(';');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${currentData.nom}.csv`;
  a.click();
}

function saveToHistory() {
  if (!currentData) return;
  const exists = plantesDB.find(p => p.nom.toLowerCase() === currentData.nom.toLowerCase());
  if (!exists) {
    plantesDB.unshift({
      nom: currentData.nom,
      nom_scientifique: getNomScientifique(currentData.nom),
      famille: getFamille(currentData.nom),
      region: getRegion(currentData.nom),
      description: currentData.description,
      image: currentData.image,
      url_wikipedia: currentData.url_wikipedia,
      date: currentData.date_collecte
    });
    localStorage.setItem('plantesDB', JSON.stringify(plantesDB));
    alert(`✅ "${currentData.nom}" sauvegardé dans la base !`);
  } else {
    alert(`ℹ️ "${currentData.nom}" est déjà dans la base.`);
  }
}

// ─── DASHBOARD ───
let chartFamillesInstance = null;
let chartRegionsInstance = null;
let chartChronologieInstance = null;

function renderDashboard() {
  const total = plantesDB.length;
  const familles = [...new Set(plantesDB.map(p => p.famille).filter(f => f !== 'Famille inconnue'))];
  const regions = [...new Set(plantesDB.map(p => p.region).filter(r => r !== 'Région inconnue'))];

  animateCount('statPlantes', total);
  animateCount('statFamilles', familles.length);
  animateCount('statProprietes', total * 2);
  animateCount('statRegions', regions.length);

  document.getElementById('sidebarTotal').textContent = `${total} plantes`;
  document.getElementById('sidebarSources').textContent = `${Math.min(total, 6)} sources scrapées`;
  document.getElementById('sidebarProgress').style.width = `${Math.min(total, 100)}%`;
  document.getElementById('chartFamillesSub').textContent = `${familles.length} familles botaniques`;
  document.getElementById('chartRegionsSub').textContent = `${regions.length} régions`;

  const famillesCount = {};
  plantesDB.forEach(p => {
    if (p.famille && p.famille !== 'Famille inconnue') {
      famillesCount[p.famille] = (famillesCount[p.famille] || 0) + 1;
    }
  });

  const colors = ['#1a3a2a', '#2d7a4a', '#c8a850', '#8aab95', '#3a6b4a', '#6b9e7a', '#d4b870', '#4a8b5a', '#a0c878', '#e8c060', '#5a8a6a', '#b8d890'];

  if (chartFamillesInstance) chartFamillesInstance.destroy();
  chartFamillesInstance = new Chart(document.getElementById('chartFamilles').getContext('2d'), {
    type: 'bar',
    data: {
      labels: Object.keys(famillesCount),
      datasets: [{ data: Object.values(famillesCount), backgroundColor: colors, borderRadius: 6 }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f0f0ec' } },
        x: { grid: { display: false }, ticks: { font: { size: 9 } } }
      }
    }
  });

  const regionsCount = {};
  plantesDB.forEach(p => {
    if (p.region && p.region !== 'Région inconnue') {
      regionsCount[p.region] = (regionsCount[p.region] || 0) + 1;
    }
  });

  if (chartRegionsInstance) chartRegionsInstance.destroy();
  chartRegionsInstance = new Chart(document.getElementById('chartRegions').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(regionsCount),
      datasets: [{ data: Object.values(regionsCount), backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      plugins: { legend: { position: 'bottom', labels: { font: { size: 9 }, padding: 6 } } },
      cutout: '55%'
    }
  });

  const chronoData = {};
  plantesDB.forEach(p => {
    const mois = new Date(p.date).toISOString().slice(0, 7);
    chronoData[mois] = (chronoData[mois] || 0) + 1;
  });
  const chronoLabels = Object.keys(chronoData).sort();

  if (chartChronologieInstance) chartChronologieInstance.destroy();
  chartChronologieInstance = new Chart(document.getElementById('chartChronologie').getContext('2d'), {
    type: 'line',
    data: {
      labels: chronoLabels,
      datasets: [{
        data: chronoLabels.map(l => chronoData[l]),
        borderColor: '#1a3a2a', backgroundColor: 'rgba(26,58,42,0.08)',
        borderWidth: 2, fill: true, tension: 0.4,
        pointBackgroundColor: '#1a3a2a', pointRadius: 4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f0f0ec' } },
        x: { grid: { display: false } }
      }
    }
  });

  document.getElementById('sessionsList').innerHTML = [
    { nom: 'Wikipedia FR', info: `${total} plantes · scraping actif` },
    { nom: 'PubChem', info: `${Math.floor(total * 0.6)} composés · actif` },
    { nom: 'GBIF', info: `${Math.floor(total * 0.4)} espèces · actif` }
  ].map(s => `
    <div class="session-item">
      <div class="session-dot"></div>
      <div><div class="session-name">${s.nom}</div><div class="session-info">${s.info}</div></div>
    </div>
  `).join('');

  const derniersList = document.getElementById('derniersList');
  derniersList.innerHTML = plantesDB.slice(0, 5).map(p => `
    <div class="dernier-item">
      <div class="dernier-emoji">${getEmoji(p.nom)}</div>
      <div>
        <div class="dernier-nom">${p.nom}</div>
        <div class="dernier-sci">${p.nom_scientifique}</div>
      </div>
      <div class="dernier-arrow">→</div>
    </div>
  `).join('');
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 30);
}

// ─── BASE DE DONNÉES ───
function renderBase() {
  const list = document.getElementById('baseList');
  if (plantesDB.length === 0) {
    list.innerHTML = '<p style="color:#9ca3af;padding:20px;text-align:center">Aucune plante dans la base.</p>';
    return;
  }
  list.innerHTML = plantesDB.map(p => `
    <div class="base-item">
      <div class="base-emoji">${getEmoji(p.nom)}</div>
      <div>
        <div class="base-nom">${p.nom}</div>
        <div class="base-sci">${p.nom_scientifique} · ${p.famille} · ${p.region}</div>
      </div>
      <div class="base-date">${new Date(p.date).toLocaleDateString('fr-FR')}</div>
    </div>
  `).join('');
}

// ─── ANALYSES ───
let chartAnalyseFamillesInstance = null;
let chartProprietesInstance = null;
let chartGeoInstance = null;

function renderAnalyses() {
  const total = plantesDB.length;
  const familles = [...new Set(plantesDB.map(p => p.famille).filter(f => f !== 'Famille inconnue'))];
  animateCount('statAnalyse', total);
  animateCount('statFamillesAnalyse', familles.length);
  document.getElementById('analysesFamillesSub').textContent = `${familles.length} familles identifiées`;

  const famillesCount = {};
  plantesDB.forEach(p => {
    if (p.famille && p.famille !== 'Famille inconnue') {
      famillesCount[p.famille] = (famillesCount[p.famille] || 0) + 1;
    }
  });

  const colors = ['#1a3a2a', '#2d7a4a', '#c8a850', '#8aab95', '#3a6b4a', '#6b9e7a', '#d4b870', '#4a8b5a', '#a0c878', '#e8c060', '#5a8a6a', '#b8d890'];

  if (chartAnalyseFamillesInstance) chartAnalyseFamillesInstance.destroy();
  chartAnalyseFamillesInstance = new Chart(document.getElementById('chartAnalyseFamilles').getContext('2d'), {
    type: 'bar',
    data: {
      labels: Object.keys(famillesCount),
      datasets: [{ label: 'Plantes', data: Object.values(famillesCount), backgroundColor: colors, borderRadius: 6 }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f0f0ec' } },
        x: { grid: { display: false }, ticks: { font: { size: 9 } } }
      }
    }
  });

  const proprietes = ['Anti-inflammatoire', 'Antioxydant', 'Antibactérien', 'Antifongique', 'Immunostimulant', 'Cicatrisant', 'Analgésique', 'Digestif'];
  const propValues = [42, 38, 31, 27, 24, 19, 16, 22];

  if (chartProprietesInstance) chartProprietesInstance.destroy();
  chartProprietesInstance = new Chart(document.getElementById('chartProprietes').getContext('2d'), {
    type: 'bar',
    data: {
      labels: proprietes,
      datasets: [{ label: 'Fréquence', data: propValues, backgroundColor: '#2d7a4a', borderRadius: 6 }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#f0f0ec' } },
        y: { grid: { display: false } }
      }
    }
  });

  const regionsCount = {};
  plantesDB.forEach(p => {
    if (p.region && p.region !== 'Région inconnue') {
      regionsCount[p.region] = (regionsCount[p.region] || 0) + 1;
    }
  });

  if (chartGeoInstance) chartGeoInstance.destroy();
  chartGeoInstance = new Chart(document.getElementById('chartGeo').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(regionsCount),
      datasets: [{ data: Object.values(regionsCount), backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      plugins: { legend: { position: 'bottom', labels: { font: { size: 9 }, padding: 6 } } },
      cutout: '55%'
    }
  });
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  ['vue', 'proprietes', 'geo'].forEach(t => document.getElementById('tab-' + t).classList.add('hidden'));
  document.getElementById('tab-' + tab).classList.remove('hidden');
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  if (plantesDB.length === 0) {
    plantesDB = DEMO_PLANTES;
    localStorage.setItem('plantesDB', JSON.stringify(plantesDB));
  }

  document.getElementById('plantInput')?.addEventListener('keypress', e => {
    if (e.key === 'Enter') searchPlant();
  });

  renderDashboard();
});
