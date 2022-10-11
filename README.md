# NestJS API Cook Unity Project

- REST API with [NestJS](https://nestjs.com/) and [TypeORM](http://typeorm.io) support 
- Swagger documentation
- Folder structure, code samples and best practices

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- MySQL

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/ezequielsurace/cook-unity
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./cook-unity
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
cp .env.example .env
vi .env
```


### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

# Launch the development server with TSNode
npm run start:dev
```

You can now head to `http://localhost:3000/api/docs` and see your API Swagger docs. 


> The sample JWT above does not have a expiry, remember to use valid JWT and enforce the required claims in production

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── auth/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── local-aut.guard.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   ├── local.strategy.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── constants.ts
├── chefs/
│   ├── dtos/
│   │   ├── create-chef.dto.ts
│   ├── chef.entity.ts
│   ├── chefs.controller.ts
│   ├── chefs.module.ts
│   ├── chefs.service.ts
├── common/
│   ├── decorators/
│   │   ├── public.decorator.ts
│   ├── guards/
│   │   ├── chef.guard.ts
│   │   ├── customer.guard.ts
├── customers/
│   ├── dtos/
│   │   ├── create-customer.dto.ts
│   ├── customer.entity.ts
│   ├── customers.controller.ts
│   ├── customers.module.ts
│   ├── customers.service.ts
├── meals/
│   ├── dtos/
│   │   ├── create-meal.dto.ts
│   ├── meal.entity.ts
│   ├── meals.controller.spec.ts
│   ├── meals.controller.ts
│   ├── meals.module.ts
│   ├── meals.service.spec.ts
│   ├── meals.service.ts
├── reviews/
│   ├── dtos/
│   │   ├── create-review.dto.ts
│   ├── review.entity.ts
│   ├── reviews.controller.ts
│   ├── reviews.module.ts
│   ├── reviews.service.ts
├── reviews/
│   ├── dtos/
│   │   ├── login-user.dto.ts
│   ├── user.entity.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## 3. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application using the transpiled NodeJS
npm run start

# Run the application using "ts-node"
npm run start:dev

# Transpile the TypeScript files
npm run build

# Run the project unit test
npm run test

# Run the project e2e test
npm run test:e2e

# Lint the project files using TSLint
npm run lint
```

## 4. Project goals

The goal of this project is to show my code skills to Cook Unity.
