FROM node:14-alpine As builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.15.8-alpine As prod

COPY --from=builder /app/build /usr/share/nginx/html