# emtimer
The timer for Pokemon.

## For Developers
```bash
$ git clone https://github.com/mizdra/emtimer.git
$ cd emtimer
$ docker-compose build
$ docker-compose up
$ open http://localhost:8080
```

## Build Setup

``` bash
# exec shell in emtimer container
$ docker-compose -f docker-compose.yml run emtimer bash

# install dependencies
app@XXXX:~/emtimer$ yarn install

# serve with hot reload at localhost:8080
app@XXXX:~/emtimer$ yarn run dev

# build for production with minification
app@XXXX:~/emtimer$ yarn run build

# build for production and view the bundle analyzer report
app@XXXX:~/emtimer$ yarn run build --report
```
