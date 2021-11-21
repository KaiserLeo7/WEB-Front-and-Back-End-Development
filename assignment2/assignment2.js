/**
 * WEB222 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name: <YOUR_NAME>
 *      Student ID: <YOUR_STUDENT_ID>
 *      Date: <SUBMISSION_DATE>
 *
 * Follow all instructions in README.md
 */

/**
 * The utils Object has methods for working with individual user data, in
 * order to format or generate new user information.
 */
const utils = {
    /**
     * Takes a phone number in the form "##########" and returns it in the
     * form "(###) ###-####".
     *
     * @param {String} phoneNumber
     */
    formatPhoneNumber: function(phoneNumber) {},

    /**
     * Uses the given firstName and lastName strings to create a username, which
     * takes the form: first letter of first name followed by at most 5 letters
     * of the last name.  For example:
     *
     * "John Smithson" -> "jsmith"
     * "Dan Min" -> "dmin"
     *
     * The generated username should be in lowercase.
     *
     * @param {String} firstName
     * @param {String} lastName
     */
    generateUsername: function(firstName, lastName) {},

    /**
     * Generates a Google Maps URL for the given address, city, and country
     * values.  See the docs for how to format these URLs at:
     *
     * https://developers.google.com/maps/documentation/urls/guide#modes
     * and https://developers.google.com/maps/documentation/urls/url-encoding
     *
     * For example.  Given "City Hall", "New York", and "USA", combine
     * the address, city, and country values with a spaces between each, (i.e.,
     * 'City Hall New York USA'), encode for inclusion on a URL, and return:
     *
     * https://www.google.com/maps/search/?api=1&query=City%20Hall%2C%20New%20York%2C%20USA
     *
     * @param {String} address
     * @param {String} city
     * @param {String} country
     */
    generateGoogleMapsURL: function(address, city, country) {}
};

/**
 * The users Object has various methods for processing a list of users (userList).
 * The userList takes the following form:
 *
 * [ user, user, ... ]
 *
 *  Where each user is an Object with the following form:
 *
 * {
 *   id: 1,                              // Number, the user's id
 *   firstName: "Paige",                 // String, the user's first name
 *   lastName: "Bools",                  // String, the user's last name
 *   birthDate: "1995-02-04T07:34:45Z",  // String, a UTC formatted Date string
 *   phone: "8989068955",                // String, phone number with spaces/dashes
 *   email: "pbools0@webmd.com",         // String, user's email
 *   creditScore: 776,                   // Number, a credit score between 200 and 800
 *   address: "476 Veith Parkway",       // String, user's street address
 *   city: "Cuamba",                     // String, user's city
 *   country: "Mozambique",              // String, user's country
 *   isStudent: false                    // Boolean, whether use is a student
 * }
 *
 * See user-data.json for sample data used in some of the tests.  This data was
 * generated with https://mockaroo.com/.
 */
const users = {
    /**
     * Return the number of users in userList (array), or 0 if userList is null/
     * undefined.
     *
     * @param {Array[Object]} userList
     */
    getUserCount: function(userList) {},

    /**
     * Return the list (array) of all users in userList who are students
     * (i.e., isStudent === true).
     *
     * @param {Array[Object]} userList
     */
    getStudents: function(userList) {},

    /**
     * Return a list (array) of all users with a credit score equal to or
     * greater than minScore.
     *
     * @param {Array[Object]} userList
     * @param {Number} minScore
     */
    getUsersWithGoodCredit: function(userList, minScore) {},

    /**
     * Creates a username from the firstName and lastName properties for each
     * user in userList.  Use the util.generateUsername() function you wrote above.
     * Return the updated list of users.
     *
     * @param {Array[Object]} userList
     */
    setUsernames: function(userList) {},

    /**
     * Every user Object has an id, a unique number. This function determines
     * the next id (Number) to use, based on the user.id values in userList.
     * Returns the next id (Number) that should be used, based on the highest
     * value for the ids in the current userList.
     *
     * @param {Array[Object]} userList
     */
    getNextId: function(userList) {},

    /**
     * Generates a list of Google Map URLs for all users, returning an Array
     * of Objects, with id and url.  The url should be generated using your
     * util.generateGoogleMapsURL() written above.  The returned array will
     * take the following form:
     *
     * [{ id: 1, url: 'https://www.google.com/maps/search/?api=1&query=City%20Hall%2C%20New%20York%2C%20USA'}, ...]
     *
     * @param {Array[Object]} userList
     */
    getMapURLs: function(userList) {},

    /**
     * Returns an Array of Names and formatted phone numbers, using the
     * util.formatPhoneNumber() function you wrote above.  The array
     * you return should take the following form:
     *
     * [ {name: 'First Last', phone: '(555) 555-5555'}, ...]
     *
     * @param {Array[Object]} userList
     */
    getPhoneList: function(userList) {},

    /**
     * For every user in userList, add a new `voting` property, which is an
     * Object with the following values:
     *
     * 1) `canVote`: a `Boolean` that is `true` when a user Objects which has an
     * age greater than or equal to 18.
     * 2) `age`: a `Number` that is the number of years old this user is.
     *
     * Modify the userList in place to add the `voting` property Object, and
     * return the number of users who can vote in the given userList.
     *
     * @param {Array[Object]} userList
     */
    validateVotingAge: function(userList) {},

    /**
     * Adds all users from users Array to userList.
     *
     * newUsers is an Array of Object(s) with the following properties:
     * @param {String} firstName
     * @param {String} lastName
     * @param {Date} birthDate
     * @param {String} phone
     * @param {String} email
     * @param {Number} creditScore
     * @param {String} address
     * @param {String} city
     * @param {String} country
     * @param {Boolean} isStudent
     *
     * Use your users.getNextId() function to determine which id to give the
     * users you add to userList.
     *
     * Return the number of new users added.
     */
    addUsers: function(userList, ...newUsers) {},

    /**
     * Remove all users with the given ids from userList.  Return a list of
     * all removed user Objects.
     *
     * @param {Array[String]} userList - list of users
     * @param {Array[Number]} ids - one or more user ids to be removed
     */
    extractUsersById: function(userList, ...ids) {},

    /**
     * Sorts the Array of users (userList) according to their birthdates,
     * oldest to youngest.
     *
     * @param {Array[Object]} userList
     */
    sortByDateOfBirth: function(userList) {}
};

/**
 * Do not modify the following code, which exposes your functions to the tests.
 */
module.exports = {
    utils,
    users
};
