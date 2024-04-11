FROM nginx:latest

ARG HTTP_PORTA=80

COPY ./dist/ /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE ${HTTP_PORTA}
