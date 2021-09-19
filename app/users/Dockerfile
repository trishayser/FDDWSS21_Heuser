FROM node:14-alpine

WORKDIR /usr/app/users

COPY package*.json ./

RUN npm install --quiet

COPY . .



ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm start

EXPOSE 16773