# project-pointblank-evolution-type

A site for the Point Blank game, with a system for exchanging items, roulettes, bets and other things.

## Coming Soon :construction:
<table>
 <td>Make Chat 90% ready</td>
 <td>Migrations will be added :white_check_mark:</td>
</table>

## <h3>Dependencies :pushpin:</h3>
<ul>
 <li> <a href="https://www.npmjs.com/package/express">Express</a></li>
 <li> <a href="https://www.npmjs.com/package/socket.io">Socket.IO</a></li>
 <li> <a href="https://www.npmjs.com/package/express-session">Express-Session</a></li>
 <li> <a href="https://www.npmjs.com/package/express-socket.io-session">Express-Socket.io-Sesison</a></li>
 <li> <a href="https://www.npmjs.com/package/winston">Winston</a></li>
 <li> <a href="https://www.npmjs.com/package/typeorm">Typeorm - PG</a></li>
 <li> <a href="https://www.npmjs.com/package/node-json-db">Node-Json-DB</a></li>
 <li> <a href="https://www.npmjs.com/package/pgsqltriggers-alternative">pgsqltriggers-alternative</a></li>
</ul>

## 💻 Prerequisites

The project's database was designed for PostgreSQL 9.4++, for the 3.24++ server
You must have:
* PostgreSQL v9.5+
* Node.js v14+
* Configured .env file for connection to PGSQL database

## Installation 🚀
First of all, this project was done in typescript, you must prepare the environment before cloning this project.
### Commands

Install modules
```
npm i OR yarn install
```

Create tables and triggers
```
npm run preparedb2 OR yarn run preparedb
```

## ☕ Using
```
yarn run dev or npm run dev
```


alternative .js version (discontinued): https://github.com/skillerm/pointblank-future-nodejs
