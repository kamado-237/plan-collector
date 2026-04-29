const axios = require('axios');

const PLANTES_MEDICINALES = [
  "moringa", "moringa oleifera", "baobab", "adansonia digitata", "neem", "azadirachta indica",
  "artemisia", "artemisia afra", "hibiscus", "hibiscus sabdariffa", "kigelia", "kigelia africana",
  "griffonia", "griffonia simplicifolia", "pygeum", "prunus africana", "harpagophytum",
  "harpagophytum procumbens", "rooibos", "aspalathus linearis", "buchu", "agathosma betulina",
  "hoodia", "hoodia gordonii", "sutherlandia", "cola", "cola nitida", "tamarind", "tamarindus indica",
  "cassia", "cassia senna", "parkia", "parkia biglobosa", "irvingia", "irvingia gabonensis",
  "rauwolfia", "rauwolfia vomitoria", "aloe", "aloe vera", "aloe ferox", "aloe barbadensis",
  "ashwagandha", "withania somnifera", "turmeric", "curcuma", "curcuma longa",
  "tulsi", "ocimum tenuiflorum", "brahmi", "bacopa monnieri", "triphala",
  "amalaki", "emblica officinalis", "amla", "shatavari", "asparagus racemosus",
  "guduchi", "tinospora cordifolia", "boswellia", "boswellia serrata",
  "guggul", "commiphora mukul", "gotu kola", "centella asiatica",
  "noni", "morinda citrifolia", "kalmegh", "andrographis paniculata",
  "punarnava", "boerhavia diffusa", "manjistha", "rubia cordifolia",
  "pippali", "piper longum", "mulethi", "glycyrrhiza glabra", "réglisse",
  "ginseng", "panax ginseng", "ginkgo", "ginkgo biloba",
  "astragalus", "astragalus membranaceus", "reishi", "ganoderma lucidum",
  "dong quai", "angelica sinensis", "schisandra", "schisandra chinensis",
  "licorice", "coptis", "peony", "paeonia lactiflora", "magnolia",
  "cordyceps", "cordyceps sinensis", "maitake", "grifola frondosa",
  "shiitake", "lentinula edodes",
  "lavande", "lavandula", "lavandula angustifolia", "romarin", "rosmarinus officinalis",
  "thym", "thymus vulgaris", "menthe", "mentha piperita", "mentha spicata",
  "camomille", "matricaria chamomilla", "echinacea", "echinacée",
  "millepertuis", "hypericum perforatum", "valériane", "valeriana officinalis",
  "ortie", "urtica dioica", "chardon marie", "silybum marianum",
  "artichaut", "cynara scolymus", "fenouil", "foeniculum vulgare",
  "sauge", "salvia officinalis", "mélisse", "melissa officinalis",
  "origan", "origanum vulgare", "basilic", "ocimum basilicum",
  "ail", "allium sativum", "oignon", "allium cepa",
  "gingembre", "zingiber officinale", "cannelle", "cinnamomum verum",
  "cumin", "cuminum cyminum", "coriandre", "coriandrum sativum",
  "cardamome", "elettaria cardamomum", "clou de girofle", "syzygium aromaticum",
  "muscade", "myristica fragrans", "poivre noir", "piper nigrum",
  "bardane", "arctium lappa", "pissenlit", "taraxacum officinale",
  "sureau", "sambucus nigra", "aubépine", "crataegus",
  "tilleul", "tilia cordata", "passiflore", "passiflora incarnata",
  "houblon", "humulus lupulus", "verveine", "verbena officinalis",
  "bourrache", "borago officinalis", "achillée", "achillea millefolium",
  "calendula", "calendula officinalis", "consoude", "symphytum officinale",
  "arnica", "arnica montana",
  "cat claw", "uncaria tomentosa", "maca", "lepidium meyenii",
  "pau d arco", "tabebuia impetiginosa", "guarana", "paullinia cupana",
  "yerba mate", "ilex paraguariensis", "stevia", "stevia rebaudiana",
  "cranberry", "vaccinium macrocarpon", "goldenseal", "hydrastis canadensis",
  "saw palmetto", "serenoa repens", "american ginseng", "panax quinquefolius",
  "evening primrose", "oenothera biennis",
  "eucalyptus", "eucalyptus globulus", "tea tree", "melaleuca alternifolia",
  "spiruline", "spirulina", "chlorella", "papaye", "carica papaya",
  "grenade", "punica granatum", "açaï", "euterpe oleracea",
  "goji", "lycium barbarum", "myrtille", "vaccinium myrtillus",
  "lemongrass", "cymbopogon citratus", "citronnelle", "galanga", "alpinia galanga",
  "griffonia simplicifolia", "hoodia gordonii"
];

function normaliser(texte) {
  return texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function estUnePlante(nom) {
  const nomNorm = normaliser(nom);
  return PLANTES_MEDICINALES.some(p => {
    const pNorm = normaliser(p);
    return nomNorm === pNorm || nomNorm.includes(pNorm) || pNorm.includes(nomNorm);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  let { plant } = req.query;

  if (!plant) {
    return res.status(400).json({ error: 'Nom de plante requis' });
  }

  plant = plant.trim();

  if (!estUnePlante(plant)) {
    return res.status(400).json({
      error: `"${plant}" n'est pas dans notre base de plantes médicinales.`,
      suggestion: 'Essayez : Aloe vera, Gingembre, Moringa, Curcuma, Neem, Ashwagandha...'
    });
  }

  const plantFormatted = plant.replace(/\s+/g, '_');

  try {
    const wikiRes = await axios.get(
      `https://fr.wikipedia.org/api/rest_v1/page/summary/${plantFormatted}`,
      {
        headers: {
          'User-Agent': 'PhytoScrape/1.0 (INF232 TP)',
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );

    const wiki = wikiRes.data;

    let pubchemData = null;
    try {
      const pubRes = await axios.get(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(plant)}/JSON`,
        { timeout: 8000 }
      );
      pubchemData = pubRes.data.PC_Compounds?.[0]?.props?.find(
        p => p.urn?.label === 'Molecular Formula'
      )?.value?.sval || null;
    } catch { pubchemData = null; }

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
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: `"${plant}" non trouvée sur Wikipedia FR.`,
        suggestion: 'Essayez le nom scientifique : ex. Zingiber officinale pour Gingembre'
      });
    }
    return res.status(500).json({ error: 'Erreur serveur', detail: error.message });
  }
};
