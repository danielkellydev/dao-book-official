/**
 *
 * @param {string} originalToken A complete JWT token
 * @param {number} newExpiration
 * @returns JWT with updated timestamp
 */
function updateJwtExpiration(originalToken, newExpiration) {
  const [headerBase64, payloadBase64, signatureBase64] =
    originalToken.split(".");

  const payload = JSON.parse(atob(payloadBase64));
  payload.exp = newExpiration;
  const updatedPayloadBase64 = btoa(JSON.stringify(payload));

  const updatedToken = `${headerBase64}.${updatedPayloadBase64}.${signatureBase64}`;

  return updatedToken;
}

module.exports = {
  updateJwtExpiration,
};
