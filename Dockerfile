FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm build
EXPOSE 5000

CMD ["node", "build"]
