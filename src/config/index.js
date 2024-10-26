let config;

switch (process.env.NODE_ENV) {
    case 'development':
        config = require('./dev').default;
        break;
    default:
        config = require('./dev').default;
}

export default config;