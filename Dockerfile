FROM node:14.14.0

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN ["npm", "install"]

COPY . .

EXPOSE 4000 

CMD npm run start