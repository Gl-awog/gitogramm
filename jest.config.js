module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue'
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/(*.)+(spec|test).[jt]s?(x)']
}
