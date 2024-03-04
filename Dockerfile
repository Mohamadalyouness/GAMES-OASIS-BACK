FROM node:17-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire contents of the "assets" folder into the container's "/app/assets" directory
COPY assets /app/assets

# Copy the rest of the application files into the container
COPY . .

# Expose port 4005 (assuming your app listens on this port)
EXPOSE 4005

# Command to run your Node.js application
CMD ["node", "app.js"]
