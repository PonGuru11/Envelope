const envelopesService = require('../services/envelopesService.js');
exports.createEnvelope = async (req, res) => {
  try {
    const { documentUrl, email, name } = req.body;
    const envelope = await envelopesService.createEnvelope(documentUrl, email, name);
  
    res.status(201).json(envelope);
  } catch (err) {
    console.log("error",err);
    res.status(500).json({ error: err.message });
  }
};
