# This image will be based on the official nodejs docker image
FROM node:boron

# Set in what directory commands will run
WORKDIR /home/app

# Put all our code inside that directory that lives in the container
ADD . /home/app

# Install dependencies
RUN \
    npm install istanbul mocha babel gulp-cli typescript typings && \
    npm install && \
    typings install

# The command to run our app when the container is run
CMD ["npm", "run-script", "start"]
