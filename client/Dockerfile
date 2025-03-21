# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Tell Next.js to use .env.production
ENV NODE_ENV=production

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to start the Next.js application
CMD ["npm", "start"]
