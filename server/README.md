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

## Upload to heroku

Create a heroku app and connect to this repository in ther root.

```
heroku git:remote -a my-project
git subtree push --prefix server heroku main
git subtree push --prefix server heroku deploy:main
```
Later run migrations script from heroku
```
heroku run npm run migrations:run
```


<!-- https://khalilstemmler.com/blogs/typescript/node-starter-project/
https://khalilstemmler.com/articles/categories/software-design/

Build a bullet proof REST API with Typescript, Express.js and Sequelize with Sqlite3 |CRUD REST API
https://www.youtube.com/watch?v=yFgrSJGNj0E
https://github.com/Chensokheng/rest-api

!important
https://www.youtube.com/watch?v=VyEKwp6Q4fY
https://github.com/willjw3/sequelize-typescript-tutorial -->

<!-- 
important
https://dev.to/stlnick/how-to-deploy-a-full-stack-mern-app-with-heroku-netlify-ncb


git subtree push --prefix server heroku master


https://daveceddia.com/deploy-react-express-app-heroku/


https://medium.com/developer-rants/deploying-typescript-node-js-applications-to-heroku-81dd75424ce0

https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2


https://www.youtube.com/watch?v=ABY--B7XasU -->
