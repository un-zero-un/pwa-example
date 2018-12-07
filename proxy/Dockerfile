FROM nginx:1.15-alpine

RUN mkdir -p /etc/nginx/ssl/

COPY ./cert/cert.key ./cert/cert.crt /etc/nginx/ssl/

COPY default.nginx.conf /root/
COPY prod.nginx.conf /root/
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod a+x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["nginx", "-g", "daemon off;"]
