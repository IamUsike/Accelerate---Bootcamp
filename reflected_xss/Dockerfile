
FROM node:18

# Set working directory
WORKDIR /app

# Copy only the server code
COPY server/ ./server/

# Set working directory to server
WORKDIR /app/server

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]

