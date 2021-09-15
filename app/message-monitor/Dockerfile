FROM node:14

WORKDIR /usr/app/message-monitor

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 15151

CMD ["npm", "start"]