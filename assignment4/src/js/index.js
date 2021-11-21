(function() {
    /**
     * Helper object for working with countries data and extracting information.
     * See countries-data.js for format of the countries data set.
     */
    var countries = {
        /**
         * Store all countries from countries-data.js on `countries.all` for convenience.
         */

        all: window.countriesData,

        /**
         * Return an array of all countries, with the Name Object replaced by the
         * appropriate translation, or English if not specified (or unknown).  For
         * example, when language="English", you would process the record for Canada into:
         *
         * {
         *     code: "CA",
         *     continent: "Americas",
         *     areaInKm2: 9984670,
         *     population: 36624199,
         *     capital: "Ottawa",
         *     name: "Canada"
         * }
         *
         * Supported languages include:
         *
         * English, Arabic, Chinese, French, Hindi, Korean, Japanese, Russian
         *
         * Uses `countries.all` as the underlying array of countries to be processed.
         */

        getByLanguage: function(language) {
            //create new array
            var langData = [];

            //move over the properties needed
            countries.all
                .map(prop => {
                    return {
                        code: prop.code,
                        continent: prop.continent,
                        areaInKm2: prop.areaInKm2,
                        population: prop.population,
                        capital: prop.capital
                    };
                })
                .forEach(prop => langData.push(prop));

            //loop through the array
            for (let i = 0; i < countries.all.length; i++) {
                //if language is selected language replace name with name at selected property
                //all else are English
                for (var property in countries.all[i].name) {
                    if (language === property) {
                        langData[i].name = countries.all[i].name[property];
                    }
                }
            }

            return langData;
        },

        /**
         * Return an array of countries with a population greater than or equal to
         * `minPopulation`, and possibly less than equal to `maxPopulation` (if defined)
         * otherwise allow any number greater than `minPopulation`.
         *
         * Uses getByLanguage('English') to get English names for countries.
         *
         * @param {Number} minPopulation - (Required) minimum population value
         * @param {Number} maxPopulation - (Optional) maximum population value
         */

        getByPopulation: function(minPopulation, maxPopulation) {
            //create new array
            var minMaxPop = [];
            //get contries in English into array
            minMaxPop = countries.getByLanguage('English');

            var filtered;

            //for loop through the new array
            for (let i = 0; i < minMaxPop.length; i++) {
                //if maxPop is defined
                if (maxPopulation !== null) {
                    //use filter to get array within the conditions desired
                    filtered = minMaxPop.filter(
                        country =>
                            country.population > minPopulation &&
                            country.population < maxPopulation
                    );
                } //if pop < minPop
                else {
                    //use filter to get array within the conditions desired
                    filtered = minMaxPop.filter(
                        country => country.population > minPopulation
                    );
                }
            }

            return filtered;
        },

        /**
         * Return an array of countries for the given `continent` with an area
         * greater than or equal to the given `area` in square KM.
         *
         * Uses getByLanguage('English') to get English names for countries.
         *
         * @param {String} continent - (Required) name of the continent (e.g., Europe)
         * @param {Number} minArea - (Required) minimum number of KM2 area
         */
        getByAreaAndContinent: function(newContinent, minArea) {
            //create new array
            var inContinent = [];

            //port over array data in English
            inContinent = countries.getByLanguage('English');

            var filtered;

            //use filter to get only the elements of array that meet criteria
            for (let i = 0; i < inContinent.length; i++) {
                filtered = inContinent.filter(
                    country =>
                        country.areaInKm2 > minArea &&
                        country.continent === newContinent
                );
            }

            return filtered;
        }
    };

    /**
     * Helper functions for building table elements.
     */
    var tableHelper = {
        /**
         * Clears (any) existing rows from the #table-rows table body
         */
        clear: function() {
            var tableRows = document.getElementById('table-rows');

            while (tableRows.firstChild) {
                tableRows.removeChild(tableRows.firstChild);
            }
        },

        /**
         *
         * Takes a `country.code` (e.g., "CA" for Canada) and returns an <img>
         * element with its `src` property set the appropriate flag image URL
         * for this code, e.g., src="flags/ca.png" for Canada.
         */
        countryCodeToFlagImg: function(countryCode) {
            //lowerCase countryCode
            var lowCountryCode = countryCode.toLowerCase();

            //assign parts of src format to 2 seperate vars
            var flagSrc = 'flags/';
            var flagPng = '.png';

            //combine the pieces for a full src
            var fullSrc = flagSrc + lowCountryCode + flagPng;

            //create img element and make its src the fullSrc var
            var img = document.createElement('IMG');
            img.src = fullSrc;

            return img;
        },

        /**
         * Takes a single `country` object and converts it to a <tr> with <td>
         * child elements for every column in the row.  The row should match the
         * expected format of the table (i.e., flag, code, country, continent, etc).
         * Return the new <tr>...</tr> row.
         *
         * Use the DOM methods document.createElement(), element.appendChild(), etc
         * to create your <tr> row.
         */
        countryToRow: function(country) {
            //create tablerow element
            var tableRow = document.createElement('tr');

            //code variable stores code of matching country
            var code = country.code;

            //use code var to get img element
            var imageElement = tableHelper.countryCodeToFlagImg(code);

            //create cell and add image to cell then append cell into tableRow
            var flagcell = document.createElement('td');
            flagcell.appendChild(imageElement);
            tableRow.appendChild(flagcell);

            //add the rest of the cell data
            tableRow.insertCell(1).innerHTML = country.code;
            tableRow.insertCell(2).innerHTML = country.name;
            tableRow.insertCell(3).innerHTML = country.continent;
            tableRow.insertCell(4).innerHTML = country.areaInKm2;
            tableRow.insertCell(5).innerHTML = country.population;
            tableRow.insertCell(6).innerHTML = country.capital;

            return tableRow;
        },

        /**
         * Takes an array of `country` Objects named `countries`, and passes each
         * `country` in the array  to `tableHelper.countryToRow()`.  The resulting
         * rows are then appended to the #table-rows table body element.  Make sure
         * you use `tableHelper.clear()` to remove any existing rows before you do this.
         */
        countriesToTable: function(countries) {
            //get table-row element
            var tableRows = document.getElementById('table-rows');

            //clear all table-row rows
            tableHelper.clear();

            //for loop through the array
            for (let i = 0; i < countries.length; i++) {
                //create a row var set it to output of countryToRow
                var row = tableHelper.countryToRow(countries[i]);

                //append row to table
                tableRows.appendChild(row);
            }
        }
    };

    /**
     * Register click handlers for every menu item in the page.  Use the `countries`
     * and `tableHelper` Objects, and their associated methods, to update/populate
     * the #table-rows table body with the appropriate set of countries, based on the
     * menu item clicked.
     *
     * Make sure you also update the #subtitle heading to properly reflect what
     * is in the table after you populate it. For example: "List of Countries
     * and Dependencies - Population between 1 and 2 millon" or "List of Countries
     * and Dependencies - All countries in Asia" etc.
     */
    function setupMenuHandlers() {
        //capture the language elements into variables
        var menuEng = document.getElementById('menu_english');
        var menuAra = document.getElementById('menu_arabic');
        var menuChi = document.getElementById('menu_chinese');
        var menuFre = document.getElementById('menu_french');
        var menuHin = document.getElementById('menu_hindi');
        var menuKor = document.getElementById('menu_korean');
        var menuJap = document.getElementById('menu_japanese');
        var menuRus = document.getElementById('menu_russian');

        var language;

        //set up onClick triggers for languages, run functions passing language
        menuEng.onclick = languageFunc('English');
        menuAra.onclick = languageFunc('Arabic');
        menuChi.onclick = languageFunc('Chinese');
        menuFre.onclick = languageFunc('French');
        menuHin.onclick = languageFunc('Hindi');
        menuKor.onclick = languageFunc('Korean');
        menuJap.onclick = languageFunc('Japanese');
        menuRus.onclick = languageFunc('Russian');

        //main function receives language saves it
        //passes language to getByLanguage function which returns english array
        //sends array to generate table
        function languageFunc(newLanguage) {
            return function() {
                language = newLanguage;

                //change title for each language
                var subt = document.getElementById('subtitle');
                var text = document.createTextNode(
                    'List of Countries and Dependencies - Names in ' + language
                );
                subt.textContent = text.textContent;

                //get array of countries in English send to make row and then table
                var newCountries = countries.getByLanguage(language);
                tableHelper.countriesToTable(newCountries);
            };
        }

        //pin elements to variables
        var menuPop1 = document.getElementById('menu_population_100_000_000m');
        var menuPop1to2 = document.getElementById('menu_population_1m_2m');

        //set default variables
        var minPopulation;
        var maxPopulation;

        //1milPop click func
        menuPop1.onclick = function() {
            //changing title
            var subt = document.getElementById('subtitle');
            var text = document.createTextNode(
                'List of Countries and Dependencies - Population greater than 100 million'
            );
            subt.textContent = text.textContent;

            //change variables
            //get array of countries by criteria send to row get table
            minPopulation = 100000000;
            maxPopulation = null;
            var newCountries = countries.getByPopulation(
                minPopulation,
                maxPopulation
            );
            tableHelper.countriesToTable(newCountries);
        };

        //between 1 and 2 mil func
        menuPop1to2.onclick = function() {
            //changing title
            var subt = document.getElementById('subtitle');
            var text = document.createTextNode(
                'List of Countries and Dependencies - Population between 1 and 2 million'
            );
            subt.textContent = text.textContent;

            //change variables
            //get array of countries by criteria send to row get table
            minPopulation = 1000000;
            maxPopulation = 2000000;
            var newCountries = countries.getByPopulation(
                minPopulation,
                maxPopulation
            );
            tableHelper.countriesToTable(newCountries);
        };

        //create varaibles
        //capture elements set to variables
        var newestContinent;
        var minArea;
        var milAmerica = document.getElementById('menu_americas_1mkm');
        var allAsia = document.getElementById('menu_asia_all');

        //1mil in Americas func
        milAmerica.onclick = function() {
            //change title
            var subt = document.getElementById('subtitle');
            var text = document.createTextNode(
                'List of Countries and Dependencies - Americas, Area greater than 1 million Km2'
            );
            subt.textContent = text.textContent;

            //change variable values
            //get array of countries by criteria send to row get table
            minArea = 1000000;
            newestContinent = 'Americas';
            var newestCountries = countries.getByAreaAndContinent(
                newestContinent,
                minArea
            );
            tableHelper.countriesToTable(newestCountries);
        };

        //allPop Asia func
        allAsia.onclick = function() {
            //change title
            var subt = document.getElementById('subtitle');
            var text = document.createTextNode(
                'List of Countries and Dependencies - All Countries in Asia'
            );
            subt.textContent = text.textContent;

            //change variables
            //get array of countries by criteria send to row get table
            minArea = 0;
            newestContinent = 'Asia';
            var newestCountries = countries.getByAreaAndContinent(
                newestContinent,
                minArea
            );
            tableHelper.countriesToTable(newestCountries);
        };
    }

    // When the page loads, setup all event handlers by calling setup function.
    window.onload = setupMenuHandlers;
})();
