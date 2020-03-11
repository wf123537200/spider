module.exports = {
  "extends": ["airbnb", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "semi": 2,
    "no-confusing-arrow": 0,
    "no-undef": 0,
    "indent": [1, 2, { "SwitchCase": 1 }],
    "no-console": 0,
    "comma-dangle": 0,
    "eqeqeq": 0,
    "no-empty": 2,
    "no-unused-vars": [0, { "ignoreRestSiblings": true }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": true
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-function-return-type": [
      0,
      {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true,
        "allowHigherOrderFunctions": true
      }
    ],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "vars-on-top": 0,
    "no-var": 0,
    "no-unused-expressions": 0,
    "no-plusplus": 0,
    "object-curly-spacing": 0,
    "max-len": [0, { "code": 80, "tabWidth": 4, "ignoreUrls": true }],
    "func-names": 0,
    "no-underscore-dangle": 0,
    "global-require": 0,
    "guard-for-in": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "no-restricted-syntax": 0,
    "no-param-reassign": 0,
    "no-eval": 0,
    "no-continue": 0,
    "no-unreachable": 2,
    "no-return-assign": 0,
    "no-shadow": 0,
    "prefer-destructuring": 2,
    "prefer-arrow-callback": 0,
    "function-paren-newline": 0,
    "prefer-template": 2,
    "no-debugger": 1,
    "arrow-body-style": [0, "never"],
    "arrow-parens": 0,
    "prefer-const": 0,
    "quote-props": 2,
    "object-shorthand": 0,
    "no-useless-computed-key": 0,
    "padded-blocks": 0,
    "react/no-array-index-key": 0,
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react/no-string-refs": 0,
    "react/no-find-dom-node": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-closing-tag-location": 0,
    "react/sort-comp": 0,
    "react/jsx-no-bind": 0,
    "react/no-danger": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-one-expression-per-line": 0
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "settings": {
    "import/resolver": "node"
  },
  "env": {
    "browser": true
  }
}