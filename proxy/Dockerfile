FROM alpine:latest as cert

RUN apk add --no-cache openssl


RUN openssl genrsa -des3 -passout pass:NotSecure -out cert.pass.key 2048
RUN openssl rsa -passin pass:NotSecure -in cert.pass.key -out cert.key
RUN rm cert.pass.key
RUN openssl req -new -passout pass:NotSecure \
    -key cert.key -out cert.csr \
    -subj '/C=SS/ST=SS/L=Charleville-Mézières/O=1z1CN=localhost'
RUN openssl x509 -req -sha256 -days 365 -in cert.csr -signkey cert.key -out cert.crt



FROM nginx:1.15-alpine

RUN mkdir -p /etc/nginx/ssl/

COPY --from=cert cert.key cert.crt /etc/nginx/ssl/
COPY default.nginx.conf /etc/nginx/conf.d/
