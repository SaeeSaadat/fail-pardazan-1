Hi!
So ... this is awkward! 
what are we supposed to say here?
just ... cp this file to your /etc/nginx/ and overwrite it on your previous non-good config file!
or just add the location parts to your previous file if there are more important stuff in your already existing conf file (doubtful!)
anyways ... it's pretty self explanitory! 
it redirects all the requests for nodejs to localhost:3000 (because the nodejs app will be running on port 3000, you can change that in JS/index.js)
also redirects all the requests for go to localhost:8080 (because the go app will be running on port 8080!)

ow and the html page for the front end will be served statically so it's location is set in /
