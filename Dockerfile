# Image selected from https://hub.docker.com/_/node/
FROM node:alpine

# Sets working directory for other commands
# https://docs.docker.com/engine/reference/builder/#workdir
WORKDIR /usr/src/app

# Copy Package and package-lock into image
COPY package*.json ./

# Install based on package.json
RUN npm install


# port to expose at run time
EXPOSE 8080

# Copy files from project to image
COPY . .


CMD ["node", "index"]
