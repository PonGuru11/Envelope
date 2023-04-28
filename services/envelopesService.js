const axios = require('axios');
const EnvelopeDAO = require('../dao/envelopeDAO');
const fs = require('fs');

exports.createEnvelope = async (documentUrl, email, name) => {
  const documentBase64 = fs.readFileSync(documentUrl, 'base64');

  const payload = {
    documents: [
      {
        documentBase64,
        documentId: "1",
        fileExtension: 'docx',
        name
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
