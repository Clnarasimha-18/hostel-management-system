# Use nginx server
FROM nginx:alpine

# Copy project files
COPY . /usr/share/nginx/html

# Expose port
EXPOSE 80
