
# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend
COPY server/ ./server/

# Copy frontend
COPY public/ ./public/

# Set working directory to server
WORKDIR /app/server

# Install dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
