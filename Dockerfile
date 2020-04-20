FROM node:10
WORKDIR /sequelize
COPY package.json .
RUN npm install
COPY . .
CMD node server.js
EXPOSE 4000