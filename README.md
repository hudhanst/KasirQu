# KasirQu

## About
Simple Cashier App
Use for storing data, in and out. Also give a report about what happen in apps,

## How To Use
make sure you have [`git`](https://git-scm.com/downloads), [`node js`](https://nodejs.org/en/download/) and [`mongodb`](https://www.mongodb.com/try/download/community) (if run on client didnt need database)

### How To Install (windows)
- git clone https://github.com/hudhanst/KasirQu.git
- cd kasirqu
- cd frontend
- npm i
- npm run build
- cd ..
- cd backend
- npm i 
- copy all file in kasirqu/frontend/build to kasirqu/backend/src/frontend/build
- npm run package (or make if you want)
- done outpun in folder kasirqu/backend/out

### First Time Use
- must first run in computer as your server then open apps
- on login page clik the image logo 10 time or more then the apps will show form registration for superuser account
- the cupon can found on your code. in backend/src/server/config/keys.js under coupon variable


## Lisf of Package
- backend:
    - bcryptjs [`link`](https://www.npmjs.com/package/bcryptjs)
    - expressjs [`link`](https://www.npmjs.com/package/express)
    - electronjs [`link`](https://www.npmjs.com/package/electron) using "npx create-electron-app"
    - jsonwebtoken [`link`](https://www.npmjs.com/package/jsonwebtoken)
    - mongoose [`link`](https://www.npmjs.com/package/mongoose)
    - multer [`link`](https://www.npmjs.com/package/multer)
    - xlsx [`link`](https://www.npmjs.com/package/xlsx)
- frontend
    - @material-ui/core [`link`](https://www.npmjs.com/package/@material-ui/core)
    - @material-ui/icons [`link`](https://www.npmjs.com/package/@material-ui/icons)
    - @material-ui/lab [`link`](https://www.npmjs.com/package/@material-ui/lab)
    - axios [`link`](https://www.npmjs.com/package/axios)
    - chart.js [`link`](https://www.npmjs.com/package/chart.js/v/2.9.3)
    - material-ui-dropzone [`link`](https://www.npmjs.com/package/material-ui-dropzone)
    - react [`link`](https://www.npmjs.com/package/react) "npx create-react-app"
    - react-redux [`link`](https://www.npmjs.com/package/react-redux)
    - redux [`link`](https://www.npmjs.com/package/redux)
    - redux-thunk [`link`](https://www.npmjs.com/package/redux-thunk)
    - xlsx [`link`](https://www.npmjs.com/package/xlsx)

## Features
- User Related
    - add, edit and delete User
    - split User by 3 catagory: SUPERUSER, ADMIN and KASIR
    - limit amount of accses base on user catagory (hardcoded)
- Item Related
    - add, edit and delete Item
    - ech Item has their own catagory, selling price, buying price and has their own custom selling price base on quantity (if setting)
    - import and export function
- Transaction Related
    - add Transaction
    - add a mount of stock and change item selling price in transaction so money in and out keep on note
    - import and export function
- Overal, NonRelated
    - can run in server/client (lan base on ipv4)
    - dark/light mode
    - store info when create
    - update store info
    - history system
    - alaret system if some input wrong
    - all table has sorting, searching and query (serverside)
    - report system for ech month money in or out
    - report in graph about what happen in apps, like how much supply remaining, how much transaction in a day or even in a hour and many more
    - and alot more

## Devlopment plant
- adding (name, barcode, username, catagoryname, etc) check when input a form and alert if is alredy use
- adding refund system that integrated with report and graph
- adding discounts system for ech item in transaction list not in transaction review 
- adding color picker for theme
- and many more