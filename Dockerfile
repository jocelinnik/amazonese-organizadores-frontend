FROM nginx:latest

WORKDIR /app

ARG HTTP_PORTA=80

COPY ./dist/ /usr/share/nginx/html

EXPOSE ${HTTP_PORTA}
