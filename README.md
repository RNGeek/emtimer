# emtimer
The timer for Pokemon.

## For Development
```bash
$ docker-compose -f docker-compose.yml up
```

## For Production
```bash
$ docker-compose -f docker-compose.prod.yml up
```

## Build Setup

``` bash
# exec shell in emtimer container
$ docker-compose -f docker-compose.yml run emtimer bash

# install dependencies
app@XXXX:~/emtimer$ npm install

# serve with hot reload at localhost:8080
app@XXXX:~/emtimer$ npm run dev

# build for production with minification
app@XXXX:~/emtimer$ npm run build

# build for production and view the bundle analyzer report
app@XXXX:~/emtimer$ npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
