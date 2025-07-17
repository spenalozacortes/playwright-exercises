function randomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function randomEmail() {
  return `${randomString(8)}@${randomString(5)}.com`;
}

function randomPhoneNumber() {
  // Generates a random 10-digit US-style phone number as a string
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return digits;
}

export default { randomString, randomEmail, randomPhoneNumber }; 