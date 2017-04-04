# shopular

Author:  
David Steed

Project Purpose:  
This project demonstrates the Angular framework as well as introducing code coverage and transpiling.  We create an Angular module, attach services and controllers, and bootstrap index.html with the AngularJS framework.  SCSS/Sass is utilized to apply CSS3 styling.  The grunt task runner then runs a series of tasks to furher validate the project.  See package.json for full list of dev-dependencies.

Project Functionality:
1.  A form with basic AngularJS validation to allow a new item to be added to an inventory (an array of objects)
2.  an html table of existing items that can dynamically:
 a) switch between US and UK currency
 b) sort columns based on the properties in that column
 c) change quanities or delete an item from the table
 d) display the new item added via the form above
3.  configure and run grunt task runner to run tasks for:jshint, karma, clean, sass, and copy.
4.  configure grunt/karma to also run and report Code Coverage to determine how much of our code has been covered by the karma tests.  Tweak to get as close to 100% as possible
5.  configure grunt to also run concat and babel to a) compress the js files into one and b) transpile the JavaScript ES6 into ES5 compliant code. 
     
How to build this project:

- clone this repository
- npm install   # this will install all development dependencies
- on the terminal, run:
 
  grunt build   # to run all grunt tasks
  
- This will create a build/ directory, containing the deployed application.  A local web server can then be run and homed from this directory to see the project's web site, such as with:

  http-server build/

