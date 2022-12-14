FROM node:16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@5.0.0 -g

CMD ["npm", "start"]