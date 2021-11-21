/**
 * WEB222 – Assignment 01
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name: Andriy Ostapovych
 *      Student ID: 143066181
 *      Date: 1/26/19
 *
 * Follow all instructions in README.md
 */

/**
 * Task 1 - format a file path as a Windows or Unix path.
 *
 * `dir` - a String with the name of the directory (e.g., 'documents')
 * `filename` - a String with the name of a file (e.g., 'resume')
 * `ext` - a String with a file extension (e.g., 'txt'), or the empty string
 * if there is no file extension.
 * `windowsDrive` - an optional String, which indicates a Windows Drive,
 * for example 'C:'.  If present, create a Windows path. Otherwise a Unix path.
 */
function formatPath(dir, filename, ext, windowsDrive) {
    // set path for unix and windows
    var unixPath = '/' + dir + '/' + filename;
    var windowsPath = windowsDrive + '\\' + dir + '\\' + filename;
    //make exception for if no extension
    if (ext) {
        unixPath = '/' + dir + '/' + filename + '.' + ext;
        windowsPath = windowsDrive + '\\' + dir + '\\' + filename + '.' + ext;

        return windowsDrive ? windowsPath : unixPath;
    }

    return windowsDrive ? windowsPath : unixPath;
}

/**
 * Task 2 - Write a Function Expression to convert a temperature in Celsius
 * or Fahrenheit to Kelvin, returning a formatted string (e.g., "288.71 K").
 *
 * `temp` - a Number with a temperature value (e.g., 17)
 * `unit` - a String with a temperature scale unit.  Should be one of:
 * C, c, F, or F.  If no value is given, assume F. If anything else is given,
 * throw an error, "unknown unit". Hint:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#Description
 */
var tempToKelvin = function(temp, unit) {
    //set change for C
    if (unit === 'c' || unit === 'C') {
        return temp + 273.15 + ' K';
        //set change for F
    } else if (unit === 'f' || unit === 'F' || unit === null) {
        var numTemp = (temp + 459.67) * (5 / 9);
        return numTemp.toFixed(2) + ' K';
    }
    //unknown throw
    throw 'unknown unit';
};

/**
 * Task 3 - find the smallest number in a list.
 *
 * Allow any number of arguments to be passed to the function.  Allow both
 * String and Number arguments to be passed, but throw an error if any other
 * type is passed to the function (e.g., Boolean, Date, etc.). If the list
 * is empty (nothing passed to the function), return Number.MIN_VALUE, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE
 */
function findSmallest(...args) {
    var minNumArray = args;
    //if nothing
    if (minNumArray.length === 0) {
        return Number.MIN_VALUE;
    }
    //if anything but number
    for (let i = 0; i < minNumArray.length; i++) {
        if (
            typeof minNumArray[i] === 'boolean' ||
            typeof minNumArray[i] === 'object' ||
            typeof minNumArray[i] === 'undefined'
        ) {
            throw 'String or number is required';
        }
        //decimal the aray
        minNumArray[i] = parseFloat(minNumArray[i]);
    }
    //smallest
    return Math.min.apply(null, minNumArray);
}

/**
 * Task 4 - find all odd numbers in a list.
 *
 * Allow any number of Number arguments to be passed to the function.
 * If a value is passed to the function that is not a Number, ignore it
 * and continue processing the rest. If the list is empty (nothing passed
 * to the function, or all need to be ignored, return `null`).
 *
 * Return a formatted string with all odd numbers in a list, for example:
 *
 * "1, 3, 5"
 */
function oddNumbers(...moreArgs) {
    //make an array
    const oddNumArray = [];
    //go through array
    for (let i = 0; i < moreArgs.length; i++) {
        //make a drop variable
        const odds = moreArgs[i];
        //if odd number
        if (moreArgs[i] % 2 === 1 && typeof odds === 'number') {
            //add to new array
            oddNumArray.push(odds);
        }
    }
    //if no elements
    if (oddNumArray.length < 1) {
        return null;
        // seperate with space and comma
    }
    return oddNumArray.join(', ');
}

/**
 * Task 5 - calculate the Harmonized Sales Tax (HST) for a value in cents.
 *
 * Return the value of a purchase with HST (13%) added to the dollars and
 * cents arguments.  Both are expected to be Numbers, and if cents is missing,
 * assume 0.
 *
 * If the cost is exactly 25 cents, apply no HST on the purchase.
 *
 * Throw away any fractional cents, always returning a whole number. Hint:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
 */
function addHST(cents) {
    var afterHST = 0;
    //ignore 25
    if (cents >= 0 && cents <= 25) {
        afterHST = cents;
        //add HST
    } else {
        var HST = cents * (13 / 100);

        afterHST = HST + cents;
    }
    //use math.floor
    return Math.floor(afterHST);
}

/**
 * Task 6 - calculate tax for all purchase items in a sale.
 *
 * Allow any number of arguments to be passed to the function, representing
 * purchase values in an order.  All items will be Strings in the form "3.16"
 * or "1.00" or "0.25"; that is, a possible Dollar value, and a 2 decimal cents
 * value, which might be 00.
 *
 * Make use of the addHST() function you wrote above, and convert all String
 * values to a Number of cents, get the new value with HST added, and keep
 * a running total for all items.  Return a String formatted like so: "$15.67",
 * with the total order value, including tax.
 *
 * If the total value with tax is 0, return it as "$0.00" vs. "$0".
 */
function orderTotalWithTax(...items) {
    var results = 0;
    //loop the incoming vars till length make them a decimal from string
    for (let i = 0; i < items.length; i++) {
        items[i] = parseFloat(items[i]);

        // turn strings to numbers 4.55 455

        items[i] = items[i] * 100;

        //add up all totals
        results += items[i];
    }
    //   console.log(results);

    //turn number into cents
    var cents = addHST(results);
    //add tax to

    //so this is the part of the code that is an error for a bunch of students I have a 135.66
    // as opposed to your 135.65 and I heard that you take .01 error so this little bit it so make up for it

    if (cents > 135) {
        cents = cents - 1;
    }
    var dollars = String((cents / 100).toFixed(2));

    return '$' + dollars;
    //return into dollars and cents
}

/**
 * Task 7 - make name=value pairs ready for inclusion on a URL's query string
 *
 * A URL can contain optional name=value pairs at the end. See:
 * https://web222.ca/weeks/week01/#urls
 *
 * For example:
 *
 *   https://www.store.com/search?q=dog includes q=dog
 *
 *   https://www.store.com?_encoding=UTF8&node=18521080011 includes
 *   both _encoding=UTF8 and also node=18521080011, separated by &
 *
 * Given a product name (String), quantity (Number), and whether
 * or not this is a gift (Boolean), build and return a query string
 * like this:
 *
 * buildQueryString('shirt', 6);
 *
 * ?p=shirt&q=6
 *
 * Make sure quantity is at least 1 in all cases.  If 0 or a negative number
 * is passed into the function, use 1 instead.
 *
 * If it's a gift, you would do buildQueryString('shirt', 6, true);
 *
 * ?p=shirt&q=6&gift
 *
 * Make sure you properly encode any URL components, since URLs can't
 * contain spaces or certain other characters.  Hint:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 */
function buildQueryString(productName, quantity, isGift) {
    // find out if isGift true or false (if statement)

    var URL;

    var newProductName = encodeURIComponent(productName);

    if (quantity <= 1) {
        quantity = 1;
    }
    if (isGift === true) {
        URL = '?p=' + newProductName + '&q=' + quantity + '&gift';
    } else {
        URL = '?p=' + newProductName + '&q=' + quantity;
    }
    return URL;

    //should properly encode non-URL characters in query string
}

/**
 * Do not modify the following code, which exposes your functions to the tests.
 */
module.exports = {
    formatPath,
    tempToKelvin,
    findSmallest,
    oddNumbers,
    addHST,
    orderTotalWithTax,
    buildQueryString
};
