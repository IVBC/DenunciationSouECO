FROM node:latest as angular

#ENV NODE_ENV production

WORKDIR /app

COPY package.json /app

RUN npm install --silent

COPY . .

RUN npm run build


FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/csmSouEco /usr/share/nginx/html
COPY ./config/nginx.conf /etc/ngix/conf.d/default.conf

# Copy the EntryPoint
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh

ENTRYPOINT ["/entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

# docker build -t cms-SouEco .
# docker run -p 8081:80 cms-SouEco
