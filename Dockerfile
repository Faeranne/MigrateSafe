FROM dockerfile/nodejs

WORKDIR /code

RUN npm install -g gulp

ADD ./package.json /code/package.json

RUN npm install

ADD . /code

RUN gulp build
