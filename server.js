// DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');

// cluster
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var ClusterStore = require('strong-cluster-connect-store')(session);
if(cluster.isMaster){
    // CronJob
    require('./backups/cron');
    ClusterStore.setup();
    for(var i = 0; i < numCPUs; i++){
        cluster.fork()
    }
    cluster.on('online', (worker) => {
        console.log('worker ' + worker.id + ' is online')
    })
    cluster.on('exit', (worker, code, signal) => {
        console.log('worker ' + worker.id + ' died with signal',signal);
    })
}else{
    // Trabajamos compartiendo las conexiones TCP
    const app = express();
    // CONFIG ENVIROMENT
    require('dotenv').config()

    //const PORT = (process.env.NODE_ENV === 'development') ? 3000 : 80;
   // app.set('port', process.env.PORT || 3000);
   const PORT = process.env.PORT || 3000;
    // MIDDLEWARES
    app.set('view engine', 'pug');
    app.use(morgan('dev')); 
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(methodOverride("_method"));
    app.use(express.static(__dirname + '/public'));
    
    // AUTH
    app.use(session({store: new ClusterStore(), secret: '%$itch12$%', resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    
    require('./config/passport/passport')(passport);
    
    // ROUTES
    require('./backend/routes')(app, express, passport);
   
    app.listen(PORT, () => {
        console.log(`servidor levantado en el puerto ${PORT}` );
    })
/*
    app.listen(app.get('port'), () => {
        console.log(`servidor levantado en el puerto ${PORT}` );
    })
*/
}