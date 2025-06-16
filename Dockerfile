# Use the official Node.js 20 slim image as the base image
FROM node:slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json ./

# Install the project dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn run build

# Specify the command to run the application
CMD ["node", "dist/index.js"]