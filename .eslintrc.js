{
  "root": true,
  "extends": ["@react-native"],
  "plugins": [
    "date",
    "import",
    "promise",
    "@typescript-eslint",
    "react-native",
    "prettier"
  ],
  "rules": {
    "semi": "off",
    "curly": "off",
    "no-extra-semi": "off",
    "no-console": "error",
    "prefer-const": "error",
    "no-return-await": "warn",
    "react-native/no-inline-styles": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react-native/no-unused-styles": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        "groups": [
          "type",
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "never",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "import/first": "error",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "error",
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "react",
            "importNames": ["FC"],
            "message": "Please use explicit props instead."
          },
          {
            "name": "react",
            "importNames": ["default"],
            "message": "Do not use React qualifier, use import deconstruction instead"
          },
        ]
      }
    ],
    "promise/prefer-await-to-then": "warn",
    "promise/prefer-await-to-callbacks": "warn",
    "date/no-new-date-with-args": "error",
    "date/no-new-date-without-args": "error",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "no-empty-function": [
      "error",
      { "allow": ["constructors", "arrowFunctions"] }
    ]
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/no-var-requires": "error"
      }
    }
  ],
  "env": {
    "jest": true
  }
}
