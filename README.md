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
- install jshint:

  npm install -g jshint

- npm init  (this assumes you have install Node.js v6 or later on your machine)

- mocha chai karma setup:

  npm install mocha --save-dev
 
  npm install --save-dev karma chai karma-mocha karma-chai karma-chrome-launcher


- install grunt:

  npm install --save-dev grunt
  
  npm install grunt-contrib-copy --save-dev

  npm install --save-dev load-grunt-tasks
  
  npm install -g grunt-cli
  
  npm install --save-dev grunt-contrib-clean
  
  npm install --save-dev grunt-contrib-sass
  
  npm install --save-dev grunt-contrib-jshint
  
  npm install --save-dev grunt-karma


- install angular:

  npm install --save angular


- install angular-mocks:
  
  npm install --save-dev angular-mocks


- Note:  you may need sass installed for grunt-sass to function properly.  on my machine, this was done via:
 
  gem install sass


- install grunt-concat:

  npm install --save-dev grunt-contrib-concat


- install Babel:

  npm install --save-dev grunt-babel babel-preset-es2015
  

- install code-coverage:

  npm install --save-dev karma-coverage
  

Run the full grunt build

The grunt task runner, would then output something similar to:

```/shopular (master)$ grunt build
Running "jshint:appjs" (jshint) task
>> 5 files lint free.

Running "clean:0" (clean) task
>> 1 path cleaned.

Running "concat:alljs" (concat) task

Running "babel:all" (babel) task

Running "karma:all" (karma) task
03 04 2017 02:19:58.838:INFO [karma]: Karma v1.5.0 server started at http://0.0.0.0:9876/
03 04 2017 02:19:58.841:INFO [launcher]: Launching browser Chrome with unlimited concurrency
03 04 2017 02:19:58.848:INFO [launcher]: Starting browser Chrome
03 04 2017 02:19:59.898:INFO [Chrome 56.0.2924 (Mac OS X 10.12.3)]: Connected on socket 3IAIKDis_eyCxRwjAAAA with id 64474160
....................
Chrome 56.0.2924 (Mac OS X 10.12.3): Executed 20 of 20 SUCCESS (0.137 secs / 0.011 secs)

=============================== Coverage summary ===============================
Statements   : 100% ( 0/0 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 0/0 )
Lines        : 100% ( 0/0 )
================================================================================

Running "sass:runSass" (sass) task
/usr/local/lib/ruby/gems/2.4.0/gems/sass-3.4.23/lib/sass/util.rb:1109: warning: constant ::Fixnum is deprecated

Running "copy:copyHtml" (copy) task
Copied 1 file

Done.
