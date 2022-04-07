# Bug Tracker Backend


## dependencies

- dotenv
- express
- pg
- pg-hstore
- sequelize
- sequelize-cli
- typescript

### Scripts
```
npm run lint
npm run lint-and-fix
npm run build
npm run dev
npm run start
npm run migrations:run
npm run migrations:seed
npm run migrations:down
```

### Sequelize-cli useful scripts
```
npx sequelize-cli model:generate --name Client --attributes name:string // creates model & migration

npx sequelize-cli migration:generate --name User // creates a migration file

npx sequelize-cli db:seed:undo // drops all tables
```

<!-- https://khalilstemmler.com/blogs/typescript/node-starter-project/
https://khalilstemmler.com/articles/categories/software-design/

Build a bullet proof REST API with Typescript, Express.js and Sequelize with Sqlite3 |CRUD REST API
https://www.youtube.com/watch?v=yFgrSJGNj0E
https://github.com/Chensokheng/rest-api

!important
https://www.youtube.com/watch?v=VyEKwp6Q4fY
https://github.com/willjw3/sequelize-typescript-tutorial -->
