FROM node:bullseye
RUN npm install -g npm && \
  yarn && \
  yarn global add nodemon
