const config = {
    user: process.env.AZURE_STORAGE_ACCOUNT,
    password: process.env.AZURE_SECRET,
    server: process.env.AZURE_SERVER,
    database: process.env.AZURE_DB,
};

module.exports = config;
 