# Assignment 2 Instructions

## Introduction

This assignment will help you learn and practice JavaScript Strings, Arrays,
and Objects.

Please do this assignment on your own, and submit only your own work.
Gaining experience with JavaScript and the web takes a lot of personal practice,
and working on these problems yourself will help build your skill.

## Submission

This assignment is due Friday February 11 at midnight.

Please read and follow all instructions below carefully.  If you have problems
or questions, talk to your classmates or professor.

To hand in your work, see the "Submitting your Assignment" section below.

## Setup

This assignment relies on a number of dependencies, which must be installed on
your computer.

First, install Node.js on your computer. See installation instructions at:

https://nodejs.org/en/

You can install the LTS (Long Term Support) version of node.js, which is
currently 10.15.0, although any 10.x.x version should work.

## Install Dependencies

Open a command line terminal and navigate (i.e., "cd") to the directory where
you have unzipped the assignment files. When you type "dir" (Windows) or
"ls" (Linux/macOS) you should see this README.md file, package.json,
assignment2.js, etc.

In this directory, install the assignment dependencies using the
Node.js Package Manager (npm), which is installed along with node.js.  In your
terminal, type the following:

```
npm install
```

This will download and save all the necessary files to a folder named
`node_modules/` in the current directory.

If you have trouble getting "npm install" to work:

* Did you install node.js?
* If you type "node --version" in your terminal, does it print the version?
* Are you in the right directory (you must cd into the correct directory)

If you need help, ask your classmates and/or talk to your professor.

## Install a Proper Editor

You will need a proper editor to write code for the web.  The most popular choice
is Microsoft Visual Studio Code.  VSCode runs on Windows, Linux, and macOS.
You can download and install it for free from:

https://code.visualstudio.com/

A number of extensions are available that will work automatically with
the scripts and configuration in this project, and are recommended:

* eslint https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* prettier https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
* stylelint https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint

Once these are installed VSCode will automatically show you errors as you type.

If you want to use a different editor, that's fine.  Confirm with your professor
that it will work for our needs.  You may not use Notepad, for example.

## Learn how to Run the Assignment Tests

You are asked to complete the code in the file `assignment2.js`.  A basic
file layout has already been created with various functions and variables.

In addition, unit tests have been written for each function in `assignment2.test.js`. 
These tests will help you determine if your code is working correctly: running the
tests should produce the output that the tests expect, and that tests will either
pass or fail.

To run the tests, use the npm command:

```
npm test
```

Your goal is to get all of the tests to pass correctly.  If a test fails, pay
attention to the error messages that get produced, and make corrections to your
code in `assignment2.js`.

NOTE: if you are going to run your tests over and over as you make changes to your
`assignment2.js` code, you can also run the tests so they automatically watch for
changes:

```
npm run test-live
```

This will do the same thing as `npm test`, but will continue to watch for changes
to `assignment2.js`, and re-run the tests whenever you save the file.  This is
useful when you are making lots of changes and want to see how they affect
the tests.

You can stop the tests from running using `CTRL + c`.

## Learn how to Lint your Code

In addition to running unit tests, you can also run a linter called `eslint`.
Linting helps to find and remove common errors in code, for example, missing
a semi-colon, or forgetting to declare a variable.

To run eslint, use the npm command:

```
npm run eslint
```

If there are no problems, there will be no output.  If there is any output,
pay attention to what it says, so you can make corrections.  For example:

```
assignment2/assignment2.js
  18:9  error  'x' is defined but never used  no-unused-vars
```

Here, we see a lint error, which has various information:

1. The filename is listed first, `assignment2/assignment2.js`
1. The line number is listed next: 18
1. The column number on line 18 is listed next: 9
1. The actual error or warning comes next: `error  'x' is defined but never used`
1. The rule name comes last: `no-unused-vars`.  You can lookup how to fix these errors using the rule name, for example: https://eslint.org/docs/rules/no-unused-vars

Your code should have no lint errors when you submit it.

## Learn how to Properly Format your Code

Source code needs to be properly structured, use consistent indenting, semi-colons,
etc.  Doing so makes it easier to understand, read, and debug your code.

Consider the following two functions:

```
// Improperly formatted and indented
function BaD(x){
if(          x> 10 ){
    return x;}
        return 0
        }

// Properly formatted and indented
function good(x) {
    if (x > 10) {
        return x;
    }
    return 0;
}
```

Your code must be properly and consistently formatted.  You can do it by hand,
or, you can use Prettier (https://prettier.io/) to do it automatically.

To use Prettier, use the npm command:

```
npm run prettier
```

This will rewrite your `assignment2.js` file to use proper formatting.  NOTE:
running this command will overwrite your file, so make sure you have saved
your work before you run it.

## Submitting your Assignment

When you have completed your assignment, you need to prepare your submission.
To do so, use the npm command:

```
npm run prepare-submission
```

This will do a number of things automatically for you:

1. Run prettier on your assignment code, formatting it
1. Create a directory, `assignment2/`
1. Copy your code, tests, and the package.json file into `assignment2/`
1. Run eslint on your code and save the result to `assignment2/eslint.log`
1. Run the unit tests and save the result to `assignment2/test.log`
1. Create `assignment2.zip` from the contents of `assignment2/*`

You can upload and submit the `assignment2.zip` to Blackboard.

## Discussion of Other Assignment Files

You may be wondering about some of the other files in this project.  While you
don't need to modify them, or use them directly, here is what each one does:

node_modules/ - the installed dependencies necessary to run prettier, eslint, etc., installed when your run `npm install`.

.eslintrc.js - configuration for eslint, see https://eslint.org/docs/user-guide/configuring

.npmrc - configuration settings for npm, see https://docs.npmjs.com/files/npmrc

.prettierrc.js - configuration settings for prettier, see https://prettier.io/docs/en/configuration.html

package.json - node.js package info, dependencies, build scripts, see https://docs.npmjs.com/files/package.json

package-lock.json - a generated file with dependency version information, see https://docs.npmjs.com/files/package-lock.json
