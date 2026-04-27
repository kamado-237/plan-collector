const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Liste complète de plantes médicinales (noms communs + scientifiques)
const PLANTES_MEDICINALES = [
  // Afrique
  "moringa", "moringa oleifera", "baobab", "adansonia digitata", "neem", "azadirachta indica",
  "artemisia", "artemisia afra", "hibiscus", "hibiscus sabdariffa", "kigelia", "kigelia africana",
  "griffonia", "griffonia simplicifolia", "pygeum", "prunus africana", "devil's claw", "harpagophytum",
  "harpagophytum procumbens", "rooibos", "aspalathus linearis", "buchu", "agathosma betulina",
  "hoodia", "hoodia gordonii", "african potato", "hypoxis hemerocallidea", "sutherlandia",
  "sutherlandia frutescens", "shea", "vitellaria paradoxa", "bush willow", "combretum",
  "bitter melon", "momordica charantia", "aloe", "aloe vera", "aloe ferox", "aloe barbadensis",
  "cola", "cola nitida", "irvingia", "irvingia gabonensis", "rauwolfia", "rauwolfia vomitoria",
  "calliandra", "acacia", "acacia senegal", "boscia", "tamarind", "tamarindus indica",
  "cassia", "cassia senna", "parkia", "parkia biglobosa", "vitex", "vitex doniana",

  // Inde / Ayurveda
  "ashwagandha", "withania somnifera", "turmeric", "curcuma", "curcuma longa",
  "tulsi", "ocimum tenuiflorum", "brahmi", "bacopa monnieri", "neem", "triphala",
  "amalaki", "emblica officinalis", "bibhitaki", "terminalia bellirica",
  "haritaki", "terminalia chebula", "shatavari", "asparagus racemosus",
  "guduchi", "tinospora cordifolia", "boswellia", "boswellia serrata",
  "guggul", "commiphora mukul", "gotu kola", "centella asiatica",
  "noni", "morinda citrifolia", "bitter gourd", "karela",
  "amla", "arjuna", "terminalia arjuna", "kalmegh", "andrographis paniculata",
  "punarnava", "boerhavia diffusa", "shankhpushpi", "convolvulus pluricaulis",
  "manjistha", "rubia cordifolia", "vacha", "acorus calamus",
  "vidanga", "embelia ribes", "pippali", "piper longum",
  "trikatu", "giloy", "mulethi", "glycyrrhiza glabra",

  // Chine / Médecine traditionnelle chinoise
  "ginseng", "panax ginseng", "ginkgo", "ginkgo biloba",
  "astragalus", "astragalus membranaceus", "reishi", "ganoderma lucidum",
  "dong quai", "angelica sinensis", "schisandra", "schisandra chinensis",
  "licorice", "réglisse", "glycyrrhiza", "coptis", "coptis chinensis",
  "peony", "paeonia lactiflora", "magnolia", "magnolia officinalis",
  "dang shen", "codonopsis pilosula", "bai zhu", "atractylodes macrocephala",
  "fu ling", "poria cocos", "chen pi", "citrus reticulata",
  "ban xia", "pinellia ternata", "zhi mu", "anemarrhena asphodeloides",
  "huang qi", "huang bai", "phellodendron amurense",
  "san qi", "notoginseng", "wu wei zi", "cordyceps", "cordyceps sinensis",

  // Europe / Méditerranée
  "lavande", "lavandula", "lavandula angustifolia", "romarin", "rosmarinus officinalis",
  "thym", "thymus vulgaris", "menthe", "mentha piperita", "mentha spicata",
  "camomille", "matricaria chamomilla", "echinacea", "echinacée",
  "millepertuis", "hypericum perforatum", "valériane", "valeriana officinalis",
  "ortie", "urtica dioica", "chardon marie", "silybum marianum",
  "ginkgo", "artichaut", "cynara scolymus", "fenouil", "foeniculum vulgare",
  "sauge", "salvia officinalis", "mélisse", "melissa officinalis",
  "marjolaine", "origanum majorana", "origan", "origanum vulgare",
  "basilic", "ocimum basilicum", "persil", "petroselinum crispum",
  "ail", "allium sativum", "oignon", "allium cepa",
  "gingembre", "zingiber officinale", "cannelle", "cinnamomum verum",
  "cumin", "cuminum cyminum", "coriandre", "coriandrum sativum",
  "carvi", "carum carvi", "anis", "pimpinella anisum",
  "bardane", "arctium lappa", "pissenlit", "taraxacum officinale",
  "plantain", "plantago major", "sureau", "sambucus nigra",
  "aubépine", "crataegus", "tilleul", "tilia cordata",
  "passiflore", "passiflora incarnata", "houblon", "humulus lupulus",
  "verveine", "verbena officinalis", "bourrache", "borago officinalis",
  "achillée", "achillea millefolium", "calendula", "calendula officinalis",
  "consoude", "symphytum officinale", "grande camomille", "tanacetum parthenium",

  // Amériques
  "cat's claw", "uncaria tomentosa", "cat claw", "griffe du chat",
  "maca", "lepidium meyenii", "pau d'arco", "tabebuia impetiginosa",
  "guarana", "paullinia cupana", "yerba mate", "ilex paraguariensis",
  "stevia", "stevia rebaudiana", "cranberry", "vaccinium macrocarpon",
  "goldenseal", "hydrastis canadensis", "black cohosh", "actaea racemosa",
  "saw palmetto", "serenoa repens", "american ginseng", "panax quinquefolius",
  "passionflower", "wild yam", "dioscorea villosa",
  "cascara", "rhamnus purshiana", "chaparral", "larrea tridentata",
  "evening primrose", "oenothera biennis", "arnica", "arnica montana",

  // Asie du Sud-Est
  "andrographis", "pandan", "pandanus", "galanga", "alpinia galanga",
  "kaffir lime", "citrus hystrix", "lemongrass", "cymbopogon citratus",
  "lemon grass", "citronnelle", "clou de girofle", "syzygium aromaticum",
  "muscade", "myristica fragrans", "cardamome", "elettaria cardamomum",
  "poivre long", "piper nigrum", "poivre noir",

  // Général / Universel
  "eucalyptus", "eucalyptus globulus", "tea tree", "melaleuca alternifolia",
  "propolis", "spiruline", "spirulina", "chlorella",
  "papaye", "carica papaya", "ananas", "ananas comosus",
  "grenade", "punica granatum", "açaï", "euterpe oleracea",
  "goji", "lycium barbarum", "baie de goji",
  "myrtille", "vaccinium myrtillus", "framboise", "rubus idaeus",
  "rose", "rosa canina", "cynorrhodon",
  "olivier", "olea europaea", "feuille d'olivier"
];

function normaliser(texte) {
  return texte.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function estUnePlanteMedicinale(nom) {
  const nomNormalise = normaliser(nom);
  return PLANTES_MEDICINALES.some(plante => {
    const planteNormalisee = normaliser(plante);
    return nomNormalise === planteNormalisee ||
           nomNormalise.includes(planteNormalisee) ||
           planteNormalisee.includes(nomNormalise);
  });
}

app.get('/api/plantes', (req, res) => {
  const { q } = req.query;
  if (q) {
    const qNorm = normaliser(q);
    const resultats = PLANTES_MEDICINALES.filter(p =>
      normaliser(p).includes(qNorm)
    ).slice(0, 10);
    return res.json(resultats);
  }
  res.json(PLANTES_MEDICINALES);
});

app.get('/api/scrape', async (req, res) => {
  let { plant } = req.query;

  console.log('🌿 Plante reçue:', plant);

  if (!plant) return res.status(400).json({ error: 'Nom de plante requis' });

  plant = plant.trim();

  // Vérification dans la liste
  if (!estUnePlanteMedicinale(plant)) {
    console.log('⛔ Non reconnu comme plante médicinale:', plant);
    return res.status(400).json({
      error: `"${plant}" n'est pas dans notre base de plantes médicinales.`,
      suggestion: 'Essayez : Aloe vera, Gingembre, Moringa, Curcuma, Neem, Ashwagandha...'
    });
  }

  const plantFormatted = plant.replace(/\s+/g, '_');

  try {
    const wikiUrl = `https://fr.wikipedia.org/api/rest_v1/page/summary/${plantFormatted}`;
    const wikiRes = await axios.get(wikiUrl, {
      headers: {
        'User-Agent': 'PlantCollector/1.0 (INF232 TP)',
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    const wiki = wikiRes.data;
    console.log('✅ Wikipedia OK:', wiki.title);

    // PubChem
    let pubchemData = null;
    try {
      const pubRes = await axios.get(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(plant)}/JSON`,
        { timeout: 8000 }
      );
      pubchemData = pubRes.data.PC_Compounds?.[0]?.props?.find(
        p => p.urn?.label === 'Molecular Formula'
      )?.value?.sval || null;
    } catch (e) {
      console.log('⚠️ PubChem non disponible');
    }

    return res.status(200).json({
      nom: wiki.title,
      description: wiki.extract || 'Aucune description disponible.',
      image: wiki.thumbnail?.source || null,
      url_wikipedia: wiki.content_urls?.desktop?.page || null,
      formule_moleculaire: pubchemData,
      source: 'Wikipedia FR + PubChem',
      date_collecte: new Date().toISOString()
    });

  } catch (error) {
    console.log('❌ Erreur:', error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({
        error: `"${plant}" non trouvée sur Wikipedia FR.`,
        suggestion: 'Essayez le nom scientifique : ex. Zingiber officinale pour Gingembre'
      });
    }

    return res.status(500).json({
      error: 'Erreur serveur',
      detail: error.message
    });
  }
});

app.get('/api/test', (req, res) => {
  res.json({
    status: 'OK',
    message: '🌿 Plant Collector opérationnel ✅',
    total_plantes: PLANTES_MEDICINALES.length
  });
});

app.listen(3000, () => {
  console.log('');
  console.log('================================');
  console.log(` Serveur lancé sur http://localhost:3000`);
  console.log(` ${PLANTES_MEDICINALES.length} plantes médicinales en base`);
  console.log(' ================================');
  console.log('');
});