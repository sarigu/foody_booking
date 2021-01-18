module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb"
    ],

    "parser": "babel-eslint",

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
        "no-undef": "off",
        "object-shorthand": "off",
        "class-methods-use-this": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-props-no-spreading": "off",
        "react/state-in-constructor": "off",
        "react/destructuring-assignment": "off",
        "react/prop-types": "off",
        "react/forbid-prop-types": "off",
        "react/require-default-props": "off",
        "no-param-reassign:": "off",
        "react/prefer-stateless-function": "off",
        "react/button-has-type": "off",
        "no-return-assign": "warn",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "max-len": "warn",
        "no-restricted-globals": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/label-has-associated-control": "warn",
        "react/no-array-index-key": "warn",
        "prefer-template": "warn",
        "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")],
        "react/jsx-one-expression": "off",
        "react/jsx-one-expression-per-line": "off",
        "no-shadow": "off",
        "no-nested-ternary": "off",
        "jsx-a11y/control-has-associated-label": "off",
    }
};
