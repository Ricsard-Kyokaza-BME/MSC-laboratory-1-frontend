# This image will be based on the official nodejs docker image
FROM node:boron

# Set in what directory commands will run
WORKDIR /home/elenor/app

# Put all our code inside that directory that lives in the container
ADD https://www.npmjs.com/install.sh ./install.sh
RUN sh install.sh

ADD . /home/elenor/app

# Install dependencies
RUN \
    cd $(npm root -g)/npm \
     && npm install fs-extra \
     && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js && \
    npm install -g gulp-cli && \
    npm install -g gulp -D && \
    npm install -g typescript@2.3.2 && \
    npm install -g angular-cli@1.0.1 && \
    cd /home/elenor/app && \
    npm install

# The command to run our app when the container is run
VOLUME ["/home/elenor/app"]
#CMD gulp default
CMD ["npm", "run-script", "start"]
