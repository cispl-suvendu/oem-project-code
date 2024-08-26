/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: 'localhost',
            port: 3306,
            user: 'OEM_CODELOUDS',
            password: '7HI5mn4pr9oxNnk',
            database: 'OEM_CODECLOUDS'
        },
        secret: 'CODECLOUDSOEMLABPROJECT',
        jwtSecret: 'CODECLOUDSOEMLABPROJECT',
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    },
    typescript: {
        ignoreBuildErrors: true,
     }
}

export default nextConfig; 

// sign in (done)
// user create
// category / subcategory