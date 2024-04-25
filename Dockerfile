FROM node:latest as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx as the production server
FROM nginx:latest
# you have to give path in nginx.conf where dist files are copied.
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Note: Only last stage will include in image. Here anything from builder stage will not exist in image as Nginx stage is last stage. 
