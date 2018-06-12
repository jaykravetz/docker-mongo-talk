FROM node:8

RUN apt-get update -yqq && apt-get upgrade -yqq

RUN apt-get install -yqq git

RUN npm i -Sg bower

# RUN mkdir -p /var/apps/current

# RUN cd /tmp && git clone https://github.com/jaykravetz/docker-mongo-talk.git

# RUN cp -R /tmp/docker-mongo-talk/* /var/apps/current
COPY . /var/apps/current

WORKDIR /var/apps/current

RUN chown -R node:node .

USER node

RUN npm install && cd app && bower install

CMD ["node", "index.js"]

