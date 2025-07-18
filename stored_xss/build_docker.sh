# Build the image
docker rm -f todo-xss-app
docker build -t todo-xss-app .

# Run the container
docker run -p 5000:5000 --name todo-xss-app todo-xss-app
