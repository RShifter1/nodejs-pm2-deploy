require('dotenv').config({ path: '.env.deploy' });

module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm',
      args: 'run start',
      cwd: './backend',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'frontend',
      script: 'npx',
      args: 'serve -s build -l 3001',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: process.env.USER,
      host: process.env.HOST,
      ref: 'origin/master',
      repo: process.env.REPO,
      path: process.env.PATH,
      'pre-deploy': 'scp ./backend/.env rshifter@103.76.53.240:/home/rshifter/mesto/current/backend/.env',
      'post-deploy': 'cd backend && npm install && cd ../frontend && npm install && NODE_OPTIONS=--openssl-legacy-provider npm run build && cd .. && pm2 start ecosystem.config.js || pm2 reload all',
      'pre-setup': 'echo "Начинаем деплой..."',
    },
  },
};