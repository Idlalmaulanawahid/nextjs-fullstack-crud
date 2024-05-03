/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        'MYSQL_HOST': 'localhost',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'db_test',
        'MYSQL_USER': 'user',
        'MYSQL_PASSWORD': 'user1234',
    }
}

export default nextConfig;
