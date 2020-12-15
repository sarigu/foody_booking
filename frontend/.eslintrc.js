module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": "warn",
        "no-console": "off",
        "func-names": "off",
        "no-undef": "off",
        "object-shorthand": "off",
        "class-methods-use-this": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-props-no-spreading": "off",
        "react/state-in-constructor": "off",
        "react/destructuring-assignment": "off",
        "react/prop-types": "off",
        "no-param-reassign:": "off"
    }
};
