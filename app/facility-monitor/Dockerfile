FROM node:14

WORKDIR /usr/app/facility-monitor

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 14141

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm start