# The MEVN Starter Pack

[![Build Status](https://travis-ci.org/MEVN/MEVN.svg?branch=master)](https://travis-ci.org/MEVN/MEVN)

![MEVN](https://res.cloudinary.com/teepublic/image/private/s--mZ9W1-Vz--/t_Preview/b_rgb:262c3a,c_limit,f_jpg,h_630,q_90,w_630/v1500192566/production/designs/1741574_1.jpg)

MEVN is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [Vue.JS](https://vuejs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

I was inspired by the MEAN stack but wanted to do a handful of things differently:

* Replace Angular with Vue.JS.
* Create a Micro Service based arictecture.
* Dockerise our application and services for easy of deployment.

## Before You Begin

Before you begin I recommend you read about the basic building blocks that assemble a MEVN application:

* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* Vue.JS - Vus's [Official Website](https://vuejs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.

## Project Structure

```bash
├── services
│   ├── stores-catalog-service
│   │   ├── intergration-test
│   │   ├── src
│   │   ├── .eslintrc.json
│   │   ├── .create-image.sh
│   │   ├── Dockerfile
│   │   ├── env
│   │   ├── package.json
│   │   ├── README.md
│   │   └── start-service.sh
│   └── albums-service
│   │   ├── intergration-test
│   │   ├── src
│   │   ├── .eslintrc.json
│   │   ├── .create-image.sh
│   │   ├── Dockerfile
│   │   ├── env
│   │   ├── package.json
│   │   ├── README.md
│   │   └── start-service.sh
│   └── raml-spec
│   │   ├── albums-service
│   │   └── stores-catalog-service.sh
│   └── api-gateway
│   │   ├── intergration-test
│   │   ├── src
│   │   ├── .eslintrc.json
│   │   ├── .create-image.sh
│   │   ├── Dockerfile
│   │   ├── env
│   │   ├── package.json
│   │   ├── README.md
│   │   └── start-service.sh
│   └── mongo-replica-with-docker
│   │   ├── admin.js
│   │   ├── albums.js
│   │   ├── create-replica-set.sh
│   │   ├── env
│   │   ├── grantRole.js
│   │   ├── mongo-keyfile
│   │   ├── replica.js
│   │   └── reset-docker-machines.sh
│   └── _docker_setup
│   │   ├── create-images.sh
│   │   ├── reset.sh
│   │   ├── setup-swarm.sh
│   │   └── start-services.sh
├── tests
│   └── k6
├── web
│   └── webapp
├── .gitlab-ci.yml
├── .jshintrc
├── app.yml
├── LICENCE.md
├── package.json
├── README.md
├── kraken.sh
└── .gitignore
```

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Docker - [Download & Install Docker](https://www.docker.com/), dont worry about ports, we will handle that with out install.

## Downloading MEVN

There are several ways you can get the MEVN boilerplate:

### Cloning The GitHub Repository

The recommended way to get MEVN is to use git to directly clone the MEVN repository:

```bash
$ git clone https://github.com/oregand/MEVN.git MEVN
```

This will clone the latest version of the MEVN repository to a **MEVN** folder.

## Quick Install

Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEVN application.

The boilerplate comes pre-bundled with a `package.json` file that contain the list of modules you need to start your application.

To install the dependencies, run this in the application folder from the command-line you need to run one step:

1. Client && Server

```bash
$ cd /web/webapp && yarn
```

This command does a few things:

* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* When the yarn packages install process is over, yarn will initiate a install command to install all the front-end modules needed for the application
* To update these packages later on, just run `yarn update`

## Running Your Application

Run your application using yarn:

1. Client

```bash
$  yarn run dev
```

2. Server 

```bash
$  node server.js
```

Your application should run on port 8080 with the *development* environment configuration, so in your browser just go to [http://localhost:8080](http://localhost:8080)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

Explore `config/dev.env.js` for development environment configuration options.

### Running in Production mode

To run your application with *production* environment configuration:

```bash
$ npm start
```

Explore `config/prod.env.js` for production environment configuration options.

## Testing Your Application

You can run the full test suite included with MEVN with the test task:

```bash
$ npm test
```

This will run both the server-side tests and the client-side tests.

To execute only the unit tests, run the unit task:

```bash
npm run unit
```

To execute only the e2e tests, run the e2e task:

```bash
npm run e2e
```

## Deploying to PAAS

### Deploying MEVN To GAP

* Coming Soon!

### Deploying MEVN To Heroku

* Coming Soon!

## Getting Started With MEVN

You have your application running, but there is a lot of stuff to understand. I recommend you go over the [Official Documentation](http://MEVN.org/docs.html).
In the docs we'll try to explain both general concepts of MEVN components and give you some guidelines to help you improve your development process. I tried covering as many aspects as possible, and will keep it updated by your request. You can also help us develop and improve the documentation by checking out the *gh-pages* branch of this repository.

## Community

* Coming Soon!

## Contributing

I welcome pull requests from the community!

## Credits

Inspired by the great works of:

* [Vue.JS](https://vuejs.org/)
* [MEAN Stack](http://mean.io/)
* [Cristiano Rosetti](https://github.com/Crizstian)

## License

[The MIT License](LICENSE.md)