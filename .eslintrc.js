module.exports = {
  root: true,
  
    // "extends": "standard", @babel/eslint-parser
    // "parser": "vue-eslint-parser",
    // "plugins": [
    //   "html"
    // ],
  
  env: {
    node: true
  },
  'extends': [
    // "standard",
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //在rules中添加自定义规则
    // 关闭组件命名规
     "vue/multi-word-component-names":"off",
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
