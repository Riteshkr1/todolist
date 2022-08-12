FROM node:10.15.3-alpine as builder


FROM renaultdigital/httpd-openidc:1.4.14
LABEL SIA="ufo"
LABEL IRN="72110"
LABEL PROJECT_NAME="ufo"
LABEL MAINTAINER="aitslab@renault-digital.com"

ENV TERM=xterm
ENV SIA="ufo"
ENV IRN="72110"
ENV APP_NAME="ufo-app"


RUN apt-get update && apt-get install -y \
     curl \
&& rm -rf /var/lib/apt/lists/*
RUN rm -rf /var/www/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
LABEL path_dockerfile "/home/Dockerfile"
COPY ./dist/ufo-web /www
COPY Dockerfile .
COPY apache/*.conf /usr/local/apache2/conf.d/

#COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/health-check || exit 1
