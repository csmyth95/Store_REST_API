# Use node v4 as the base image
# Uses a plain ubuntu image with node installed
FROM node:4

# Add everything in the cd to our image, in the 'app' folder.
ADD . /app

# Install dependencies
RUN cd /app; \
	npm install --production

# Expose server port
EXPOSE 8101

# Run node
CMD ["node", "/app/index.js"]
