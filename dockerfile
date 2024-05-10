FROM node:latest as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]