/* ---------------------------- MÓDULOS ---------------------------- */
/* ----------------------------------------------------------------- */
const express    = require('express'); 
const path       = require('path');                                       
const bodyparser = require('body-parser');
const favicon    = require('serve-favicon');

/* ------------------- INICIALIZACIÓN DE EXPRESS ------------------- */
const app = express(); 


/* ------------------------ CONFIGURACIONES ------------------------ */
app.set('port', process.env.PORT || 8080);                          
app.set('views', path.join(__dirname, 'views'));   
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');                                      


/* -------------------------- MIDDLEWARES -------------------------- */
app.use(bodyparser.json());                                         
app.use(bodyparser.urlencoded({extended: false}));   
app.use((req, res, next) => {                                       
   console.log(`${req.connection.remoteAddress}\t ${Date()}:\t${req.method}\t${req.url}`);                        
   next();                                                          
});

app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));



/* ----------------------------- RUTAS ----------------------------- */ 
app.use(require('./routes/routes'));


/* ------------------------- MANEJO DE ERRS. ----------------------- */

/* ----------------------- ARCHIVOS ESTÁTICOS ---------------------- */
app.use(express.static(path.join(__dirname, 'public')));


/* ---------------------- ARRANCAR EL SERVIDOR --------------------- */
app.listen(app.get('port'), () => {
   console.log('Example app listening on port ', app.get('port'))
});