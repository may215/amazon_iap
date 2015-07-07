var expect = require('chai').expect;
var Verifier = require('../index');
var sharedKey = 'Your shared key';
var testData = {
    "userId": "l3HL7XppEMhrOGDnur9-ulvqomrSg6qyODKmah76lJU=",
    "sku": "product.test.amz",
    "purchaseDate": "Sun May 1 11:38:15 MESZ 2015",
    "itemType": "SUBSCRIPTION",
    "receiptId": "q1YqVrJSSknVK0ktLtErLk0qTi7KLCjJzM9T0lFKAUoZmhiZmxtYGFmaWppbAMVKgWI5xh4-5hEFBa6-GUX-7i55pUWWuqU5ZYX5uUXB6WaFlf4u3rmJGeZmOV6htkAtJUpWRrUA"
};
describe('validateConsumable', function() {
    it('successfully verifies a correct subscription receipt', function(done) {
        var verifier = new Verifier({key: sharedKey});
        verifier.validateConsumable(testData, function(err, result) {
            expect(err).to.not.be.ok();
            expect(result).to.be.ok();
        });
    });
});