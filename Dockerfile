# This image will be based on the official nodejs docker image
FROM node:boron

# Set in what directory commands will run
WORKDIR /home/elenor/app

# Put all our code inside that directory that lives in the container
ADD . /home/elenor/app

# Install dependencies
RUN \
    npm install gulp-cli && \
    npm install typescript && \
    npm install typings && \
    npm install babel && \
    npm install mocha && \
    npm install istanbul && \
    npm install && \
    typings install

# The command to run our app when the container is run
CMD ["npm", "run-script", "start"]
