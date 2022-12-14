FROM node:16.14.2

WORKDIR /src

COPY . .

EXPOSE 19002
EXPOSE 19000

RUN npm install -g expo-cli
RUN npm install

CMD npm start