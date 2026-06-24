require('dotenv').config({ path: __dirname + '/.env.deploy' });

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
      path: process.env.DEPLOY_PATH,
      'pre-setup': 'mkdir -p /home/rshifter/mesto/shared',   
      'pre-deploy': 'scp -o StrictHostKeyChecking=no ./backend/.env rshifter@103.76.53.240:/home/rshifter/mesto/shared/.env',
      'post-deploy': 'cd backend && npm install && cd ../frontend && npm install && NODE_OPTIONS=--openssl-legacy-provider npm run build && cd .. && ln -sf /home/rshifter/mesto/shared/.env backend/.env && pm2 start ecosystem.config.js || pm2 reload all'
    },
  },
};