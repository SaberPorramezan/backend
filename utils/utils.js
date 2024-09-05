function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
function generateRandomNumber(length) {
  if (length === 5) {
    return Math.floor(10000 + Math.random() * 90000);
  }
  if (length === 6) {
    return Math.floor(100000 + Math.random() * 900000);
  }
  if (length === 10) {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }
}
function roundNumber(value, decimals = 2) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

module.exports = {
  generateRandomString,
  generateRandomNumber,
  roundNumber,
  copyObject,
};
