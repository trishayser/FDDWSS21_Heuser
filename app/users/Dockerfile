FROM node:14

WORKDIR /usr/app/users

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 16773

CMD ["npm", "start"]