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
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the EntryPoint
#COPY ./entryPoint.sh /entryPoint.sh
#RUN chmod +x entryPoint.sh

#ENTRYPOINT ["/entryPoint.sh"]
#ENTRYPOINT ["sh","/entryPoint.sh"]

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]


#CMD ["nginx", "-g", "daemon off;"]

# docker build -t cms-SouEco .
# docker run -p 8081:80 cms-SouEco
