const path = require('path');

const root = path.resolve(__dirname);

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [root],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@root': `${root}/src`,
          '@colors': `${root}/src/colors`,
          '@commonTypes': `${root}/src/commonTypes`,
          '@components': `${root}/src/components`,
          '@constants': `${root}/src/constants`,
          '@enums': `${root}/src/enums`,
          '@navigation': `${root}/src/navigation`,
          '@store': `${root}/src/store`,
        },
      },
    ],
  ],
};
