/**
    Worker that takes in an array of data and outputs an SVG path
**/

'use strict';

const line = require('./d3_line.js');

module.exports = {
    calculateMyCurve: function(initialData) {
        /**
            FISHER-YATES SHUFFLE
            http://bost.ocks.org/mike/shuffle/
        **/
        const shuffle = function(array) {
            var counter = array.length, temp, index;
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);

                // Decrease counter by 1
                counter--;

                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }
        
        // parse data into an array of values
        let rawData = shuffle(initialData);
        let data = [];
        for (let i = 0; i < rawData.length; i++) {
            data.push({x: i, y: rawData[i].value});
        }

        const interpolatedLine = line.interpolate('basis')
            .x(function (d) {
                return d.x
            })
            .y(function (d) {
                return d.y
            });

        return interpolatedLine(data);
    }
}
