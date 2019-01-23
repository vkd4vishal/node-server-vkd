const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const portvkd = process.env.PORT || 1000;

var appvkd = express();

hbs.registerPartials(__dirname + '/views/partials')

appvkd.set('view engine','hbs'); 
appvkd.use((req,res,next)=>{
   var now =  new Date().toString();
   var log = `${now}: ${req.method}: ${req.url}`;
   fs.appendFileSync('servervkd.log', log + '\n');
   console.log(`${now}: ${req.method}: ${req.url}`);
   next();
});
// appvkd.use((req,res,next)=>{
//    res.render('maintenance.hbs',{
//       midnstMessage : 'Website under maintanance !',
//       pageTitle : 'Updating Website'
//    });
// });
appvkd.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{

   return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
 return text.toUpperCase();
});


appvkd.get('/',(req,res)=>{
   // response.send('<h1>Hello Express!<h1>');
   res.render('homevkd.hbs',{
      welcomeMessage : 'Welcome to my first website',
      pageTitle : 'Home Page'
   });
});
appvkd.get('/bad',(req,res)=>{
   res.send({
      errormessage: 'Unable to make this request '
   })});
appvkd.get('/about',(req,res)=>{
   res.render('aboutvkd.hbs',{
      pageTitle : 'About Page'
   });
});


appvkd.listen(portvkd,()=>{
console.log(`Server is up for port ${portvkd}`);
});