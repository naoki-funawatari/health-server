FROM node:lts
RUN npm install -g npm && \
  yarn && \
  yarn global add nodemon
