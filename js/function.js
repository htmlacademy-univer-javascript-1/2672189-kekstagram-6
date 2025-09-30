function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const cleanString = string.toLowerCase().replace(/\s/g, '');
  return cleanString === cleanString.split('').reverse().join('');
}

function extractNumber(input) {
  const str = String(input);
  const digits = str.replace(/\D/g, '');
  return digits === '' ? NaN : parseInt(digits, 10);
}
