mkdir -p ./config/node_modules
docker-compose -f docker-compose.react.yml up --build -d
echo "Go to localhost:3000 to see live updating website"