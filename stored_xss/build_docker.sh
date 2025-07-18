# Build the image
docker build -t todo-xss-app .

# Run the container
docker run -p 5000:5000 todo-xss-app
