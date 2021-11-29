FROM node:lts
RUN npm install -g npm && \
  yarn global add nodemon
