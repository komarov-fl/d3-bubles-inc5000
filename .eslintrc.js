module.exports =  {
  "extends": "airbnb",
  "env": {
    "es6": true,
    "browser": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "jsx-a11y",
    "react"
  ],
  "rules": {
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "class-methods-use-this": 0,
    "react/prop-types": 0,
    "react/no-find-dom-node": 0,
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "jsx-a11y/label-has-for": [ 2, {
      "required": {
        "some": [ "nesting", "id" ]
      }
    }],
    "react/forbid-prop-types": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  },
}