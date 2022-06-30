FROM nginx:alpine
COPY /dist/app-racemanagement-trektrak /usr/share/nginx/html
EXPOSE 80