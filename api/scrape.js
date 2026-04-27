const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { plant } = req.query;

  if (!plant) {
    return res.status(400).json({ error: 'Nom de plante requis' });
  }

  try {
    // Recherche sur Wikipedia FR
    const searchUrl = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(plant)}`;
    const wikiRes = await axios.get(searchUrl);
    const wiki = wikiRes.data;

    // Recherche sur PubChem
    const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(plant)}/JSON`;
    let pubchemData = null;
    try {
      const pubRes = await axios.get(pubchemUrl);
      pubchemData = pubRes.data.PC_Compounds?.[0]?.props?.find(
        p => p.urn?.label === 'Molecular Formula'
      )?.value?.sval || null;
    } catch {
      pubchemData = null;
    }

    return res.status(200).json({
      nom: wiki.title,
      description: wiki.extract,
      image: wiki.thumbnail?.source || null,
      url_wikipedia: wiki.content_urls?.desktop?.page || null,
      formule_moleculaire: pubchemData,
      source: 'Wikipedia FR + PubChem',
      date_collecte: new Date().toISOString()
    });

  } catch (error) {
    return res.status(404).json({
      error: `Plante "${plant}" non trouvée`,
      detail: error.message
    });
  }
};