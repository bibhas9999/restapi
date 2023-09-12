const http=require('http');
const app=require('./app')

const port=process.env.PORT ||4400;

const serevr= http.createServer(app);

serevr.listen(port);