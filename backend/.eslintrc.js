module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "no-unused-vars": "warn",
        "no-console": "off",
        "no-undef": "warn",
        "max-len": "warn",
        "prefer-arrow-callback": "warn",
        "consistent-return": "warn",
        "no-shadow": "warn",
        "prefer-destructuring": "warn",
        "no-restricted-syntax": "warn",
        "no-mixed-operators": "warn",
        "eqeqeq": "warn",
        "no-loop-func": "warn",
        "no-unused-expressions": "warn",
    }
};



