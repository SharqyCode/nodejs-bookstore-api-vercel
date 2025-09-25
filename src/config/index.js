module.exports = {
    port: process.env.PORT || 3000,

    ATLAS_URI: process.env.ATLAS_URI || 'mongodb://localhost:27017/bookstore',

    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },

    env: process.env.NODE_ENV || 'development',
};
