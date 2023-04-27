const fs = require('fs');
const path = require('path');
const axios = require('axios');
const EnvelopeDAO = require('../dao/envelopeDAO');

exports.createEnvelope = async (filePath, email, name) => {
  
  const fileData = fs.readFileSync(filePath);
  const documentBase64 = Buffer.from(fileData).toString('base64');

  const payload = {
    documents: [
      {
        documentBase64,
        documentId: "1",
        fileExtension: path.extname(filePath).substr(1),
        name: path.basename(filePath)
      }
    ],
    emailSubject: 'Sign the Document',
    recipients: {
      signers: [
        {
          email,
          name,
          recipientId: "1"
        }
      ]
    },
    status: 'created'
  };

  // Send the request to DocuSign API
  const envelopeResponse = await axios.post(
    EnvelopeDAO.getEnvelopeApiUrl(),
    payload,
    { headers: EnvelopeDAO.getEnvelopeApiHeaders() }
  );

  return envelopeResponse.data;
};
