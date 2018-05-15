# PAGARME-BAD-CODE
[![Build Status](https://travis-ci.org/dougtq/pokemon_api.svg?branch=master)](https://travis-ci.org/dougtq/pokemon_api)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for production purposes.

### Installing

A step by step that gets you a production environment running:

Clone the project:

```sh
git clone https://github.com/dougtq/pokemon_api.git
```

Rename .env.example:

```sh
mv .env.example .env
```

## Running

Starting the project running in docker
```sh
docker-compose up -d
```

To validate if the service has gone up, just make an HTTP request by the GET method at `http://0.0.0.0:3000/healthcheck`

## Running the tests

Use the test script to run the test:
```sh
yarn test:live
```

### Coding style

* [Standard](https://standardjs.com/)

## Built With

* [Express](http://www.expressjs.com/) - The framework used

* [Sequelize](http://docs.sequelizejs.com/) - The ORM used

* [SQLite](https://www.sqlite.org/) - The database used

## Author

* **[Douglas E. Alves](https://github.com/dougtq)**

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details
