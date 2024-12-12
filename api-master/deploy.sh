npm install
npm run build
pm2 delete api
pm2 start dist/main.js --name api
pm2 save
pm2 startup