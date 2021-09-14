FROM node:14

WORKDIR /usr/app/facility-monitor

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 14141

CMD ["npm", "start"]