FROM node:14

WORKDIR /usr/app/facilities

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 13773

CMD ["npm", "start"]