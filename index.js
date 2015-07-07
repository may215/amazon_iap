var request = require('request');
var _ = require('lodash');
var util = require('util');

module.exports = Verifier;
function Verifier(options) {
    this.options = options || {};
}

Verifier.prototype.validateConsumable = function(receipt, cb) {
    var urlPattern = "https://appstore-sdk.amazon.com/version/2.0/verify/developer/%s/user/%s/purchaseToken/%s";
    var finalUrl = util.format(urlPattern, encodeURIComponent(this.options.key), encodeURIComponent(receipt.userId), encodeURIComponent(receipt.purchaseToken));
    request({
        url: finalUrl,
        json: true
    }, function(err, res, body) {
        if (err) {
            return cb(err);
        }
        if (res.statusCode === 400) {
            return cb(new Error('Amazon RVS Error: The transaction represented by this Purchase Token is no longer valid.'));
        } else if (res.statusCode === 496) {
            return cb(new Error('Amazon RVS Error: Invalid sharedSecret'));
        } else if (res.statusCode === 497) {
            return cb(new Error('Amazon RVS Error: Invalid User ID'));
        } else if (res.statusCode === 498) {
            return cb(new Error('Amazon RVS Error: Invalid Purchase Token'));
        } else if (res.statusCode === 499) {
            return cb(new Error('Amazon RVS Error: The Purchase Token was created with credentials that have expired, use renew to generate a valid purchase token.'));
        } else if (res.statusCode === 500) {
            return cb(new Error('Amazon RVS Error: There was an Internal Server Error'));
        } else if (res.statusCode !== 200) {
            return cb(new Error('Amazon RVS Error: Unknown other error'));
        }
        if (_.every(['productId', 'productType', 'purchaseDate'], Object.prototype.hasOwnProperty, body)) {
            cb(null, obj);
        } else {
            cb(new Error("body did not contain expected json object"));
        }
    });
};

Verifier.prototype.renewToken = function(receipt, cb) {
    var urlPattern = "https://appstore-sdk.amazon.com/version/2.0/renew/developer/%s/user/%s/purchaseToken/%s";
    var finalUrl = util.format(urlPattern, encodeURIComponent(this.options.key), encodeURIComponent(receipt.userId), encodeURIComponent(receipt.receiptId));
    request({
        url: finalUrl,
        json: true
    }, function(err, res, body) {
        if (err) {
            return cb(err);
        }
        if (res.statusCode === 400) {
            return cb(new Error('Amazon RVS Error: Bad Request'));
        } else if (res.statusCode === 496) {
            return cb(new Error('Amazon RVS Error: Invalid sharedSecret'));
        } else if (res.statusCode === 497) {
            return cb(new Error('Amazon RVS Error: Invalid User ID'));
        } else if (res.statusCode === 498) {
            return cb(new Error('Amazon RVS Error: Invalid User ID'));
        } else if (res.statusCode === 500) {
            return cb(new Error('Amazon RVS Error: There is an Internal Server Error'));
        } else if (res.statusCode !== 200) {
            return cb(new Error('Amazon RVS Error: Unknown other error'));
        }
        if (_.every(['productId', 'productType', 'purchaseDate'], Object.prototype.hasOwnProperty, body)) {
            cb(null, obj);
        } else {
            cb(new Error("body did not contain expected json object"));
        }
    });
};