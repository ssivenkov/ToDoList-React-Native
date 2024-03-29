const path = require('path');

const root = path.resolve(__dirname);

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        safe: false,
        allowUndefined: true
      },
    ],
    [
      'module-resolver',
      {
        root: [root],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@root': `${root}/src`,
          '@assets': `${root}/src/assets`,
          '@colors': `${root}/src/colors`,
          '@components': `${root}/src/components`,
          '@constants': `${root}/src/constants`,
          '@enums': `${root}/src/enums`,
          '@helpers': `${root}/src/helpers`,
          '@hooks': `${root}/src/hooks`,
          '@navigation': `${root}/src/navigation`,
          '@screens': `${root}/src/screens`,
          '@store': `${root}/src/store`,
          '@themes': `${root}/src/themes`,
        },
      },
    ],
  ],
};
