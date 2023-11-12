# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY app/package*.json ./

# Install application dependencies
RUN npm install

# Set the GPTAPIKEY secret as an environment variable during build
ARG GPTAPIKEY
ENV gptAPIKey=$GPTAPIKEY

RUN echo "GPTAPIKEY=$GPTAPIKEY"

# Copy the rest of your application files
COPY app/ ./

# Expose the port your application is running on (replace with your port)
EXPOSE 3001

# Define the command to start your application
CMD ["npm", "start"]
