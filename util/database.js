import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://admin:woals005^^@cluster0.ilcv27p.mongodb.net/?retryWrites=true&w=majority' //몽고사이트커넥트에있는유알엘
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }

//몽고디비셋팅 