module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        APP_NAME: 'my app name',
        API_DEVELOPMENT: 'localhost',
        API_PRODUCTION: 'domain name',
        PRODUCTION: false,
        DOMAIN_DEVELOPMENT: 'localhost',
        DOMAIN_PRODUCTION: 'my domain',
        FB_APP_ID: 'some id',
        DISQUS_SHORTNAME: 'some string',
        GOOGLE_CLIENT_ID: 'some string'

    },
    webpack: function(config, options) {
        console.log(options.webpack.version); 
        config.experiments = {};
        return config;
    },
}

// const withCSS = require('@zeit/next-css')
// module.exports = withCSS()