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
      script: 'serve',
      args: '-s build -l 3001',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'rshifter',
      host: '103.76.53.240',
      ref: 'origin/master',
      repo: 'git@github.com:RShifter1/web-plus-pm2-deploy.git',
      path: '/home/rshifter/mesto',
      'post-deploy': 'cd backend && npm install && cd ../frontend && npm install && npm run build && pm2 reload all',
      'pre-setup': 'echo "Начинаем деплой..."',
    },
  },
};