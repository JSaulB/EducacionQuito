module.exports = {
  // ... otras opciones ...
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  parserOptions: {
    ecmaVersion: 2020, // or 2015, or 2016, etc.
  },
};