FROM node:14

WORKDIR /usr/app/messages

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 14773

CMD ["npm", "start"]