FROM node:6.11.2

# Setup environment
## 1. Create user
## 2. Setup npm (Note: https://github.com/npm/npm/issues/16807)
## 3. Setup yarn (Note: https://github.com/yarnpkg/yarn/issues/1139)
RUN useradd --user-group --create-home --shell /bin/false app &&\
  rm -rf /usr/local/lib/node_modules/npm &&\
  mkdir /usr/local/lib/node_modules/npm &&\
  curl -sL https://github.com/npm/npm/archive/v5.1.0.tar.gz |\
  tar xz -C /usr/local/lib/node_modules/npm --strip-components=1 &&\
  curl -sL https://github.com/yarnpkg/yarn/releases/download/v0.27.5/yarn-v0.27.5.tar.gz |\
  tar xz -C /usr/local --strip-components=1

ENV HOME=/home/app

# Copy dependencies configs
COPY package.json yarn.lock $HOME/emtimer/
RUN chown -R app:app $HOME/*

# Setup dependencies
USER app
WORKDIR $HOME/emtimer/
RUN yarn install

# Copy all files
USER root
COPY . $HOME/emtimer
RUN chown -R app:app $HOME/*
USER app

CMD ["yarn", "run", "prod:start"]
