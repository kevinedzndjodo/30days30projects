const passwordOutput = document.getElementById('passwordOutput');
const lengthRange = document.getElementById('lengthRange');
const lengthValue = document.getElementById('lengthValue');
const copyBtn = document.getElementById('copyBtn');
const generateBtn = document.getElementById('generateBtn');
const strengthText = document.getElementById('strengthText');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const optionMap = {
  includeUppercase: uppercase,
  includeLowercase: lowercase,
  includeNumbers: numbers,
  includeSymbols: symbols,
};

function getSelectedChars() {
  return Object.entries(optionMap)
    .filter(([id]) => document.getElementById(id).checked)
    .map(([, chars]) => chars)
    .join('');
}

function updateLengthLabel() {
  lengthValue.textContent = lengthRange.value;
}

function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score >= 4) return { label: 'Strong', color: '#22c55e' };
  if (score >= 3) return { label: 'Medium', color: '#fbbf24' };
  return { label: 'Weak', color: '#f43f5e' };
}

function generatePassword() {
  const length = Number(lengthRange.value);
  const selectedChars = getSelectedChars();

  if (!selectedChars) {
    passwordOutput.value = 'Select at least one option';
    strengthText.textContent = 'Weak';
    strengthText.style.color = '#f43f5e';
    return;
  }

  const requiredChars = [];
  if (document.getElementById('includeUppercase').checked) {
    requiredChars.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
  }
  if (document.getElementById('includeLowercase').checked) {
    requiredChars.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
  }
  if (document.getElementById('includeNumbers').checked) {
    requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }
  if (document.getElementById('includeSymbols').checked) {
    requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  const passwordArray = [...requiredChars];
  while (passwordArray.length < length) {
    const randomChar = selectedChars[Math.floor(Math.random() * selectedChars.length)];
    passwordArray.push(randomChar);
  }

  for (let i = passwordArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  const generated = passwordArray.join('');
  passwordOutput.value = generated;

  const strength = getPasswordStrength(generated);
  strengthText.textContent = strength.label;
  strengthText.style.color = strength.color;
}

async function copyPassword() {
  const text = passwordOutput.value;

  if (!text || text === 'Select at least one option') {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1200);
  } catch (error) {
    copyBtn.textContent = 'Failed';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1200);
  }
}

lengthRange.addEventListener('input', () => {
  updateLengthLabel();
  generatePassword();
});

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', generatePassword);
});

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

updateLengthLabel();
generatePassword();
