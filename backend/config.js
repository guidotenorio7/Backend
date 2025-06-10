import configLocal from './config.local.js';

var config = {
    port: 3000,
    ...configLocal,
};

export default config;