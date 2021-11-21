const { expect } = require('chai');
const {
    formatPath,
    tempToKelvin,
    findSmallest,
    oddNumbers,
    addHST,
    orderTotalWithTax,
    buildQueryString
} = require('./assignment1');

describe('Task 1 - formatPath', function() {
    it('should format a simple Unix path', function() {
        const unixPath = formatPath('documents', 'file', 'txt');
        expect(unixPath).to.equal('/documents/file.txt');
    });

    it('should format a simple Windows path', function() {
        const windowsPath = formatPath('documents', 'file', 'txt', 'C:');
        expect(windowsPath).to.equal('C:\\documents\\file.txt');
    });

    it('should work with any Windows drive', function() {
        const windowsPath = formatPath('documents', 'file', 'txt', 'z:');
        expect(windowsPath).to.equal('z:\\documents\\file.txt');
    });

    it('should work with Unix sub-directories', function() {
        const unixPath = formatPath('seneca/web222', 'file', 'txt');
        expect(unixPath).to.equal('/seneca/web222/file.txt');
    });

    it('should work with Windows sub-directories', function() {
        const windowsPath = formatPath('seneca\\web222', 'file', 'txt', 'C:');
        expect(windowsPath).to.equal('C:\\seneca\\web222\\file.txt');
    });

    it('should work with longer extensions', function() {
        const unixPath = formatPath('www', 'index', 'html');
        expect(unixPath).to.equal('/www/index.html');
    });

    it('should work with an empty extension for Unix', function() {
        const unixPath = formatPath('files', 'data', '');
        expect(unixPath).to.equal('/files/data');
    });

    it('should work with an empty extension for Windows', function() {
        const unixPath = formatPath('files', 'data', '', 'C:');
        expect(unixPath).to.equal('C:\\files\\data');
    });
});

describe('Task 2 - tempToKelvin', function() {
    it('should convert a temperature in c to Kelvin', function() {
        const kelvin = tempToKelvin(80, 'c');
        expect(kelvin).to.equal('353.15 K');
    });

    it('should convert a temperature in C to Kelvin', function() {
        const kelvin = tempToKelvin(400, 'C');
        expect(kelvin).to.equal('673.15 K');
    });

    it('should convert a temperature in f to Kelvin', function() {
        const kelvin = tempToKelvin(80, 'f');
        expect(kelvin).to.equal('299.82 K');
    });

    it('should convert a temperature in F to Kelvin', function() {
        const kelvin = tempToKelvin(400, 'f');
        expect(kelvin).to.equal('477.59 K');
    });

    it('should assume unit is F if not given', function() {
        const kelvin = tempToKelvin(80);
        expect(kelvin).to.equal('299.82 K');
    });

    it('should throw an exception if unit is invalid', function() {
        const fn = () => tempToKelvin(80, 'invalid unit');
        expect(fn).to.throw();
    });
});

describe('Task 3 - findSmallest', function() {
    it('should find the smallest number in a list', function() {
        const smallest = findSmallest(1, 2, 3);
        expect(smallest).to.equal(1);
    });

    it('should find the smallest number in a list of 1', function() {
        const smallest = findSmallest(1);
        expect(smallest).to.equal(1);
    });

    it('should find the smallest number in a long list', function() {
        // https://github.com/gromgit/jstips-xe/blob/master/tips/33.md
        const list = Array.apply(null, { length: 5000 }).map(
            Function.call,
            Number
        );
        const smallest = findSmallest.apply(null, list);
        expect(smallest).to.equal(0);
    });

    it('should work with negative numbers', function() {
        const smallest = findSmallest(1, 2, 3, -1, -2, -3);
        expect(smallest).to.equal(-3);
    });

    it('should work with strings that are numbers', function() {
        const smallest = findSmallest('1', '2', '3');
        expect(smallest).to.equal(1);
    });

    it('should work with decimals', function() {
        const smallest = findSmallest(0.01, 0.001);
        expect(smallest).to.equal(0.001);
    });

    it('should throw if a Boolean is included in the list', function() {
        const fn = () => findSmallest(1, true, 3);
        expect(fn).to.throw();
    });

    it('should throw if an Object is included in the list', function() {
        const fn = () => findSmallest(1, console, 3);
        expect(fn).to.throw();
    });

    it('should throw if a null is included in the list', function() {
        const fn = () => findSmallest(1, null, 3);
        expect(fn).to.throw();
    });

    it('should throw if a undefined is included in the list', function() {
        const fn = () => findSmallest(1, undefined, 3);
        expect(fn).to.throw();
    });

    it('should return Number.MIN_VALUE if the list is empty', function() {
        const smallest = findSmallest();
        expect(smallest).to.equal(Number.MIN_VALUE);
    });
});

describe('Task 4 - oddNumbers', function() {
    it('should return all odd numbers in a list as a formatted string', function() {
        const odd = oddNumbers(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        expect(odd).to.equal('1, 3, 5, 7, 9');
    });

    it('should return all odd numbers in a list, ignoring non-numbers', function() {
        const odd = oddNumbers('0', 1, '2', '3', 4, '5', 6, 7, 8, 9, 10);
        expect(odd).to.equal('1, 7, 9');
    });

    it('should not add trailing comma in list of one number', function() {
        const odd = oddNumbers(0, 1);
        expect(odd).to.equal('1');
    });

    it('should return null if no arguments are passed in the list', function() {
        const odd = oddNumbers();
        expect(odd).to.equal(null);
    });

    it('should return null if all arguments are ignored or even in the list', function() {
        const odd = oddNumbers('1', '2', '3', 4);
        expect(odd).to.equal(null);
    });
});

describe('Task 5 - addHST', function() {
    it('should add no HST on exactly 25 cents', function() {
        const total = addHST(25);
        expect(total).to.equal(25);
    });

    it('should add no HST on 0 cents', function() {
        const total = addHST(0);
        expect(total).to.equal(0);
    });

    it('should add proper HST on values over 25 cents', function() {
        const total = addHST(26);
        expect(total).to.equal(29);
    });

    it('should add proper HST on values over 1 dollar', function() {
        const total = addHST(1 * 100);
        expect(total).to.equal(113);
    });
});

describe('Task 6 - orderTotalWithTax', function() {
    it('should calculate correct tax for a 0', function() {
        const total = orderTotalWithTax('0.00');
        expect(total).to.equal('$0.00');
    });

    it('should calculate correct tax for a single item', function() {
        const total = orderTotalWithTax('1.00');
        expect(total).to.equal('$1.13');
    });

    it('should calculate correct tax for 25 cents', function() {
        const total = orderTotalWithTax('0.25');
        expect(total).to.equal('$0.25');
    });

    it('should properly calculate tax on multiple items', function() {
        const total = orderTotalWithTax('1.00', '2.30', '16.76', '100.00');
        expect(total).to.equal('$135.65');
    });
});

describe.only('Task 7 - buildQueryString', function() {
    it('should build a query string from product name and quantity', function() {
        const qs = buildQueryString('shirt', 6);
        expect(qs).to.equal('?p=shirt&q=6');
    });

    it('should build a query string from product name, quantity, and gift', function() {
        const qs = buildQueryString('shirt', 6, true);
        expect(qs).to.equal('?p=shirt&q=6&gift');
    });

    it('should properly encode non-URL characters in query string', function() {
        const qs = buildQueryString('Shirt: Cool & Red!', 2);
        expect(qs).to.equal('?p=Shirt%3A%20Cool%20%26%20Red!&q=2');
    });

    it('should assume 1 if quantity is 0', function() {
        const qs = buildQueryString('shirt', 0);
        expect(qs).to.equal('?p=shirt&q=1');
    });

    it('should assume 1 if quantity is negative', function() {
        const qs = buildQueryString('shirt', -5);
        expect(qs).to.equal('?p=shirt&q=1');
    });
});
