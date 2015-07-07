/**
 * Created by eladrofman on 7/7/15.
 */
/* example code */
var Verifier = require('google-play-purchase-validator');
var options = {
    email: 'gmailservice@accountemail',
    key: '-----BEGIN PRIVATE KEY-----your private key-----END PRIVATE KEY-----',
    keyFile: 'alternatively path to key file'
};
var verifier = new Verifier(options);
var receipt = {
    packageName: "de.example.com",
    productId: "subscription",
    purchaseToken: "PURCHASE_TOKEN_RECEIVED_BY_THE_USERS_DEVICE_AFTER_PURCHASE"
};
verifier.verify(receipt, function cb(err, response) {
    if (err) {
        console.log("there was an error validating the receipt");
        console.log(err);
    }
    console.log("sucessfully validated the receipt");
    /* response looks like this
     {
     "kind": "androidpublisher#subscriptionPurchase",
     "startTimeMillis": "long",
     "expiryTimeMillis": "long",
     "autoRenewing": boolean
     }*/
    console.log(response);
});
/* end example code */