FROM node:lts
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
RUN npm install pm2 -g
COPY . .
EXPOSE 8080
CMD ["pm2-runtime","./app.js"]