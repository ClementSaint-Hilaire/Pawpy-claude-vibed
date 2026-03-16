# Dockerfile.production - Only serves pre-built dist files
FROM nginx:stable-alpine

# Copy pre-built files
COPY dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]