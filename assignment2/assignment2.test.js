const { expect } = require('chai');
const userData = require('./user-data.json');
const { users, utils } = require('./assignment2');

describe('Task 1 - util functions', () => {
    describe('formatPhoneNumber', () => {
        it('should correctly format a phone number', () => {
            const formatted = utils.formatPhoneNumber('800123456');
            expect(formatted).to.equal('(800) 123-456');
        });
    });

    describe('generateUsername', () => {
        it('should create a username from first name and last name', () => {
            const username = utils.generateUsername('John', 'Smit');
            expect(username).to.equal('jsmit');
        });

        it('should only use first 5 characters of last name when creating a username', () => {
            const username = utils.generateUsername('John', 'Smithervillson');
            expect(username).to.equal('jsmith');
        });

        it('should use all characters in a short last name when creating a username', () => {
            const username = utils.generateUsername('Vivian', 'Li');
            expect(username).to.equal('vli');
        });
    });

    describe('generateGoogleMapsURL', () => {
        it("should generate a valid Google Maps URL for the example location from Google's docs", () => {
            const url = utils.generateGoogleMapsURL(
                'City Hall',
                'New York',
                'USA'
            );
            expect(url).to.equal(
                'https://www.google.com/maps/search/?api=1&query=City%20Hall%20New%20York%20USA'
            );
        });

        it('should generate a valid Google Maps URL for our sample data', () => {
            const url = utils.generateGoogleMapsURL(
                '476 Veith Parkway',
                'Cuamba',
                'Mozambique'
            );
            expect(url).to.equal(
                'https://www.google.com/maps/search/?api=1&query=476%20Veith%20Parkway%20Cuamba%20Mozambique'
            );
        });
    });
});

describe('Task 2 - user functions', () => {
    // A few sample users from user-data.json
    const paigeBools = {
        id: 1,
        firstName: 'Paige',
        lastName: 'Bools',
        birthDate: '1995-02-04T07:34:45Z',
        phone: '8989068955',
        email: 'pbools0@webmd.com',
        creditScore: 776,
        address: '476 Veith Parkway',
        city: 'Cuamba',
        country: 'Mozambique',
        isStudent: false
    };
    const elleBellord = {
        id: 2,
        firstName: 'Elle',
        lastName: 'Bellord',
        birthDate: '2011-10-20T22:55:21Z',
        phone: '3147118248',
        email: 'ebellord1@blinklist.com',
        creditScore: 491,
        address: '31 Bay Plaza',
        city: 'Krasne',
        country: 'Ukraine',
        isStudent: true
    };
    const drakeArundale = {
        firstName: 'Drake',
        lastName: 'Arundale',
        birthDate: '1987-10-12T18:17:16Z',
        phone: '9115805799',
        email: 'darundale2@google.co.uk',
        creditScore: 222,
        address: '3605 Bluejay Alley',
        city: 'Datong',
        country: 'China',
        isStudent: false
    };

    describe('getUserCount', () => {
        it('should return correct number of users in an array of user Objects', () => {
            const count = users.getUserCount(userData);
            expect(count).to.equal(150);
        });

        it('should return 0 if no user list is passed', () => {
            expect(users.getUserCount()).to.equal(0);
            expect(users.getUserCount(null)).to.equal(0);
        });
    });

    describe('getStudents', () => {
        it('should return an empty array if no users in the list are students', () => {
            const students = users.getStudents([paigeBools]);
            expect(students).to.be.an('array');
            expect(students.length).to.equal(0);
        });

        it('should return an array with all students', () => {
            const students = users.getStudents([paigeBools, elleBellord]);
            expect(students).to.be.an('array');
            expect(students.length).to.equal(1);
            expect(students).to.include(elleBellord);
        });

        it('should find the correct number of students in sample data', () => {
            const students = users.getStudents(userData);
            expect(students).to.be.an('array');
            expect(students.length).to.equal(69);
            expect(students.every(user => user.isStudent)).to.be.true;
        });
    });

    describe('getUsersWithGoodCredit', () => {
        it('should return an empty array if no users in the list have min credit', () => {
            const students = users.getUsersWithGoodCredit([paigeBools], 777);
            expect(students).to.be.an('array');
            expect(students.length).to.equal(0);
        });

        it('should return all items that are equal to the min credit', () => {
            const students = users.getUsersWithGoodCredit([paigeBools], 776);
            expect(students).to.be.an('array');
            expect(students.length).to.equal(1);
            expect(students).to.include(paigeBools);
        });

        it('should return all items that are greater than the min credit', () => {
            const students = users.getUsersWithGoodCredit([paigeBools], 774);
            expect(students).to.be.an('array');
            expect(students.length).to.equal(1);
            expect(students).to.include(paigeBools);
        });

        it('should return an array with all users in the list with min credit', () => {
            const students = users.getUsersWithGoodCredit(
                [paigeBools, elleBellord],
                492
            );
            expect(students).to.be.an('array');
            expect(students.length).to.equal(1);
            expect(students).to.include(paigeBools);
        });

        it('should find the correct number of users with good credit in sample data', () => {
            const minScore = 400;
            const students = users.getUsersWithGoodCredit(userData, minScore);
            expect(students).to.be.an('array');
            expect(students.length).to.equal(108);
            expect(students.every(user => user.creditScore >= minScore)).to.be
                .true;
        });
    });

    describe('setUsernames', () => {
        it('should add a username property with correct values for a user in a list', () => {
            const usersWithUsernames = users.setUsernames([elleBellord]);
            expect(usersWithUsernames).to.be.an('array');
            expect(usersWithUsernames.length).to.equal(1);
            expect(usersWithUsernames[0].username).to.equal('ebello');
        });

        it('should attach the username to the correct user in the list', () => {
            const usersWithUsernames = users.setUsernames([
                paigeBools,
                elleBellord
            ]);
            expect(usersWithUsernames).to.be.an('array');
            expect(usersWithUsernames.length).to.equal(2);
            expect(usersWithUsernames[0].username).to.equal('pbools');
            expect(usersWithUsernames[1].username).to.equal('ebello');
        });
    });

    describe('getNextId', () => {
        it('should return next id for a simple list', () => {
            const nextId = users.getNextId([paigeBools, elleBellord]);
            expect(nextId).to.equal(3);
        });

        it('should return next id for the sample data', () => {
            const nextId = users.getNextId(userData);
            expect(nextId).to.equal(151);
        });
    });

    describe('getPhoneList', () => {
        it('should properly format name and phone number for a user', () => {
            const formattedList = users.getPhoneList([paigeBools]);
            let formattedList0;
            expect(formattedList).to.be.an('array');
            expect(formattedList.length).to.equal(1);
            formattedList0 = formattedList[0];
            expect(formattedList0.name).to.equal('Paige Bools');
            expect(formattedList0.phone).to.equal('(898) 906-8955');
        });

        it('should properly format all sample data', () => {
            const formattedList = users.getPhoneList(userData);
            expect(formattedList).to.be.an('array');
            expect(formattedList.length).to.equal(150);
            expect(
                formattedList.every(
                    entry =>
                        /^\w+ \w+$/.test(entry.name) &&
                        /^\(\d{3}\) \d{3}-\d{4}$/.test(entry.phone)
                )
            ).to.be.true;
        });
    });

    describe('validateVotingAge', () => {
        it('should return 0 if the list is empty', () => {
            const voterTotal = users.validateVotingAge([]);
            expect(voterTotal).to.equal(0);
        });

        it('should update a user when they cannot vote', () => {
            const paigeBoolsCopy = Object.create(paigeBools);
            const voterTotal = users.validateVotingAge([paigeBoolsCopy]);
            expect(voterTotal).to.equal(1);
            expect(paigeBoolsCopy.voting).to.deep.equal({
                canVote: true,
                age: 24
            });
        });

        it('should update a user when they cannot vote', () => {
            const elleBellordCopy = Object.create(elleBellord);
            const voterTotal = users.validateVotingAge([elleBellordCopy]);
            expect(voterTotal).to.equal(0);
            expect(elleBellordCopy.voting).to.deep.equal({
                canVote: false,
                age: 8
            });
        });

        it('should properly deal with multiple users', () => {
            const paigeBoolsCopy = Object.create(paigeBools);
            const elleBellordCopy = Object.create(elleBellord);
            const voterTotal = users.validateVotingAge([
                elleBellordCopy,
                paigeBoolsCopy
            ]);
            expect(voterTotal).to.equal(1);
            expect(paigeBoolsCopy.voting).to.deep.equal({
                canVote: true,
                age: 24
            });
            expect(elleBellordCopy.voting).to.deep.equal({
                canVote: false,
                age: 8
            });
        });
    });

    describe('addUsers', () => {
        it('should add a single user, updating/including id as expected', () => {
            const list = [paigeBools];
            const added = users.addUsers(list, drakeArundale);
            expect(added).to.equal(1);
            expect(list.length).to.equal(2);
            expect(list[1].id).to.equal(2);
            delete list[1].id;
            expect(list[1]).to.deep.equal(drakeArundale);
        });
    });

    describe('extractUsersById', () => {
        it('should remove a user by id', () => {
            const list = [paigeBools];
            const extracted = users.extractUsersById(list, 1);
            expect(list.length).to.equal(0);
            expect(extracted.length).to.equal(1);
            expect(extracted[0]).to.deep.equal(paigeBools);
        });

        it('should remove multiple ids at once', () => {
            const drakeArundaleCopy = Object.create(drakeArundale);
            drakeArundaleCopy.id = 3;
            const list = [paigeBools, elleBellord, drakeArundaleCopy];
            const extracted = users.extractUsersById(list, 1, 3);
            expect(list.length).to.equal(1);
            expect(list[0]).to.deep.equal(elleBellord);
            expect(extracted.length).to.equal(2);
            expect(extracted[0]).to.deep.equal(paigeBools);
            expect(extracted[1]).to.deep.equal(drakeArundaleCopy);
        });
    });

    describe('sortByDateOfBirth', () => {
        it('should sort users into the order of their birthdates', () => {
            const list = [paigeBools, elleBellord, drakeArundale];
            users.sortByDateOfBirth(list);
            expect(list[0]).to.deep.equal(drakeArundale);
            expect(list[1]).to.deep.equal(paigeBools);
            expect(list[2]).to.deep.equal(elleBellord);
        });
    });
});
