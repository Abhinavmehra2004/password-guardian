export interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export type StrengthLevel = "empty" | "weak" | "medium" | "strong" | "excellent";

export interface PasswordAnalysis {
  criteria: PasswordCriteria;
  score: number; // 0-100
  level: StrengthLevel;
  crackTime: string;
  suggestions: string[];
}

// A more extensive list of common passwords
const COMMON_PASSWORDS = [
  "password", "123456", "123456789", "qwerty", "111111", "12345",
  "12345678", "dragon", "monkey", "sunshine", "princess", "admin", "welcome",
  "football", "shadow", "master", "login", "batman", "trustno1", "iloveyou",
  "secret", "superman", "starwars", "myspace", "espresso", "anonymous", "test"
];


export function analyzePassword(password: string): PasswordAnalysis {
  if (!password) {
    return {
      criteria: { length: false, uppercase: false, lowercase: false, numbers: false, symbols: false },
      score: 0,
      level: "empty",
      crackTime: "—",
      suggestions: ["Start typing to see your password's strength."],
    };
  }

  const criteria: PasswordCriteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^A-Za-z0-9]/.test(password),
  };

  const metCount = Object.values(criteria).filter(Boolean).length;
  let score = metCount * 16; // max 80 from criteria

  // Bonus for length
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  // Penalty for being a very common password
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    score = Math.min(score, 5);
  }

  // Penalty for repeating characters (e.g., 'aaa', '111')
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 15);
  }
  
  // Penalty for sequential characters (e.g., 'abc', '123')
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
    score = Math.max(0, score - 10);
  }

  score = Math.min(100, Math.max(0, score));

  let level: StrengthLevel;
  if (score <= 30) level = "weak";
  else if (score <= 60) level = "medium";
  else if (score <= 85) level = "strong";
  else level = "excellent";

  const crackTime = estimateCrackTime(password, criteria);
  const suggestions = generateSuggestions(criteria, password, level);

  return { criteria, score, level, crackTime, suggestions };
}

/**
 * Estimates the time to crack a password based on its complexity.
 * This is a simplified model and should be treated as an educational estimate.
 */
function estimateCrackTime(password: string, criteria: PasswordCriteria): string {
  if (password.length === 0) return "—";

  let charPoolSize = 0;
  if (criteria.lowercase) charPoolSize += 26;
  if (criteria.uppercase) charPoolSize += 26;
  if (criteria.numbers) charPoolSize += 10;
  if (criteria.symbols) charPoolSize += 32; // Common special chars
  
  if (charPoolSize === 0) charPoolSize = 26; // Failsafe for single-type passwords not caught by regex

  // Assuming a powerful offline attack (e.g., from a data breach hash)
  // 10 billion guesses per second is a reasonable estimate for a modern GPU setup.
  const guessesPerSecond = 10_000_000_000;

  const combinations = Math.pow(charPoolSize, password.length);
  const secondsToCrack = combinations / guessesPerSecond;

  if (secondsToCrack < 1) return "Instant";
  if (secondsToCrack < 60) return `${Math.ceil(secondsToCrack)} seconds`;
  if (secondsToCrack < 3600) return `${Math.ceil(secondsToCrack / 60)} minutes`;
  if (secondsToCrack < 86400) return `${Math.ceil(secondsToCrack / 3600)} hours`;
  if (secondsToCrack < 2_592_000) return `${Math.ceil(secondsToCrack / 86400)} days`;
  if (secondsToCrack < 31_536_000) return `${Math.ceil(secondsToCrack / 2_592_000)} months`;
  if (secondsToCrack < 31_536_000_000) return `${Math.ceil(secondsToCrack / 31_536_000)} years`;
  
  return "Thousands of years";
}


/**
 * Generates actionable suggestions to improve the password.
 */
function generateSuggestions(criteria: PasswordCriteria, password: string, level: StrengthLevel): string[] {
  const suggestions: string[] = [];

  const isCommon = COMMON_PASSWORDS.includes(password.toLowerCase());
  if (isCommon) {
    suggestions.push("CRITICAL: This is a very common password and can be guessed instantly. Please choose a unique one.");
  }
  
  if (password.length < 8) {
    suggestions.push("CRITICAL: Your password is too short. Aim for at least 8 characters, but 12 or more is much better.");
  }

  if (!criteria.uppercase) {
    suggestions.push("Add uppercase letters (A-Z) to greatly increase complexity.");
  }
  if (!criteria.lowercase) {
    suggestions.push("Add lowercase letters (a-z). Most systems require this.");
  }
  if (!criteria.numbers) {
    suggestions.push("Mix in numbers (0-9) to make the password harder to guess.");
  }
  if (!criteria.symbols) {
    suggestions.push("Use special symbols like !@#$%^&* to make your password significantly stronger.");
  }

  if (password.length >= 8 && password.length < 12) {
    suggestions.push("Consider adding more characters. Every character added makes it exponentially harder to crack.");
  }
  
  if (/(.)\1{2,}/.test(password)) {
    suggestions.push("Avoid using repeating characters (like 'aaa' or '111') as they create predictable patterns.");
  }

  if (/(?:abc|123)/i.test(password)) {
    suggestions.push("Sequential characters (like 'abc' or '123') are easy to guess. Try to avoid them.");
  }

  if (suggestions.length === 0 && level === "excellent") {
    suggestions.push("Excellent work! This is a very strong and secure password.");
  } else if (suggestions.length === 0 && level === "strong") {
    suggestions.push("Good password! You have a solid mix of characters and length.");
  }

  return suggestions.length > 0 ? suggestions : ["This is a decent password, but see if you can meet all criteria."];
}
