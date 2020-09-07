# Dockerfile for React Client
# Build React from linux alpine with node image
FROM node:14-alpine

# Working Directory will be app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

# Set port
EXPOSE 3001

# Command line spaced entries
CMD ["node", "index.js"]