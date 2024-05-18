FROM node:20

WORKDIR /app

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install --force

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
