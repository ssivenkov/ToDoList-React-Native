module.exports = {
  '**/*.{js,ts,jsx,tsx}': 'eslint . --color',
  '**/*.{js,ts,jsx,tsx}?(x)': () => 'tsc --noEmit',
};
