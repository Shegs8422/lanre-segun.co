// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    ignores: [
      'saveweb2zip-com-www-andregs-com/**',
      'dist/**',
      '.output/**',
      '.nuxt/**',
      'public/**'
    ]
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/no-v-html': 'off',
      'vue/first-attribute-linebreak': 'off'
    }
  }
)
