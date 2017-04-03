# shopular

Author:  
David Steed

Project Purpose:  
Build a dynamic web page showing 
1.  A form with basic AngularJS validation to allow a new item to be added to an inventory (an array of objects)
2.  an html table of existing items that can dynamically
 a) switch between US and UK currency
 b) sort columns based on the properties in that column
 c) change quanities or delete an item from the table
 d) display the new item added via the form above

This project uses our intro understanding of the Angular framework.  We'll create an Angular module, attach a controller with properties and values, and bootstrap index.html with the Angular framework.

Relevant tech used (see package.json for full list of dependencies)  
github
html5/css3/javascript es6
Angular 1.5.6
Sass/Scss 3.4.23
Mocha 3.2.0
Chai 3.5.0
Karma 1.5.0"
angular-mocks: 1.6.3
babel-preset-es2015 6.24.0
grunt-contrib-concat 1.0.1
karma-coverage 1.1.1

Grunt 1.0.1

How to build validate the basic web page:

- clone this repository
- sanity check:  validate if your local web server (such as http-server) will produce the expected result:  a form and an html table as explained above.  Note:  the local web server must use /src as the root folder at this phase

Continue with setting up the test framework, babel transpiling to es5, code completion
- npm init

- use npm install to install each of the devDependencies/dependencies listed in package.json.  Use option --save-dev for "devDependencies" and -save for "dependencies"

- install angular:

  npm install --save angular


- install grunt:

  npm install --save-dev grunt
  
  npm install grunt-contrib-copy --save-dev

  npm install --save-dev load-grunt-tasks
  
  npm install -g grunt-cli
  
  npm install --save-dev grunt-contrib-clean
  
  npm install --save-dev grunt-contrib-sass
  
  npm install --save-dev grunt-contrib-jshint
  
  npm install --save-dev grunt-karma


- install angular-mocks:
  
  npm install --save-dev angular-mocks


- Note:  you may need sass installed.  on my machine, this was done via:
 
  gem install sass


- mocha chai karma setup:

  npm install mocha --save-dev
 
  npm install --save-dev karma chai karma-mocha karma-chai karma-chrome-launcher

 








