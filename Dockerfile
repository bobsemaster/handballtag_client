FROM nginx:alpine
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY www /usr/share/nginx/html
COPY www /etc/nginx/html
