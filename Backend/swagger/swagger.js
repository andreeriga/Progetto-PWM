module.exports = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentazione delle API'
        },
    },
    apis: ['./routes/*.js',
        './server.js',
        'tags.js'
    ],
};