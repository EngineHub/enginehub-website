module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['next/babel'],
        plugins: [['styled-components', { ssr: true }]]
    };
};
