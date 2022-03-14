module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 8,
    },
    env: {
        es2017: true,
        node: true,
    },
    extends: ["eslint:recommended", "google"],
    rules: {
        quotes: ["error", "double"],
        "linebreak-style": 0,
        indent: ["error", 4],
        "quote-props": ["error", "as-needed"],
        "object-curly-spacing": ["error", "always"],
        "new-cap": 0,
        "comma-dangle": 0,
        "require-jsdoc": 0,
    },
};
