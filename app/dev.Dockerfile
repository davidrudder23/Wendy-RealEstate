# Dcokerfile for React Client
# Build React from linux alpine with node image
FROM node:14-alpine

# Working Directory will be app
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.3 -g --silent

# Add app
COPY . ./

# Set port
EXPOSE 3000

# Start app
CMD ["npm", "start"]