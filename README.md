
## Installation

  

postgres server bilan backendni ishga tushurish

```bash
$ docker compose up -d --build app
```

postgres server bilan backendni o'chirish

```bash
$ docker compose down -v
```


## Running the app

  

agar sizda docker bo'lmasa [link](https://docs.docker.com/engine/install/ubuntu/)

agar sizda docker compose plugini bo'lmasa [link](https://gist.github.com/thaJeztah/b7950186212a49e91a806689e66b317d)

  

backend server **8080** serverda ishga tushadi

postgres server `.env` fayldagi berilgan portga qarab ishga tushadi



<!-- ```bash

  

# development

  

$ npm run start

  

  

# watch mode

  

$ npm run start:dev

  

  

# production mode

  

$ npm run start:prod

  

```

  

  

## Test

  

  

```bash

  

# unit tests

  

$ npm run test

  

  

# e2e tests

  

$ npm run test:e2e

  

  

# test coverage

  

$ npm run test:cov

  

``` -->
