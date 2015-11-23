prod-server: NODE_ENV=production npm run server
prod-client: npm run prod-client
dev-server: nodemon --ignore client/ --use_strict ./application.js
dev-client: webpack-dev-server --config webpack.config.dev.js --color --progress --inline --content-base build
