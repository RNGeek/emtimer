# emtimer
The timer for Pokemon.

## For Developers

### Requirements
- Node.js
- npm
- yarn

### How to Build
```bash
# Setup
$ git clone https://github.com/mizdra/emtimer.git
$ cd emtimer
$ yarn install

# Start webpack-dev-server
$ yarn run dev
```

### Production Build
```bash
# Setup netlify container
$ docker-compose -f docker-compose.prod.yml up --build
$ open http://localhost:8080
```
