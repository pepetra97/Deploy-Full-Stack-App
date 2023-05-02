#  Dockerfile for Node Express Backend

FROM node:18-alpine

# Create App Directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install 

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]