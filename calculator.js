// Add your implementation for booking calculator in this file...
// Currently it just outputs the same input
import isValidDate from './isValidDate';
import calculateTotalRates from './calculateTotalRates';
import createJsonFile from './createJsonFile';

const calculator = (input) => {
    var output = [];
    input.forEach(function(v){
        //default value
        v.isValid = false;
        v.total = 0;

        if (isValidDate(v.from, v.to)){
            v.isValid = true;
        }

        if (v.isValid) {
            v.total = calculateTotalRates(v.from, v.to);
        }

        output.push(v);
    });

    //Your application should create a file called output.json containing the array of booking objects with total and isValid properties added.
    createJsonFile(output);

    return output;
}

export default calculator;
