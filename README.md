amazon_iap
===============

> [NodeJs](http://nodejs.org) helper service to validate in-app purchase using the amazon receipt verification service (RVS). 

Install
===============

    $ npm install amazon_iap
    
![alt tag](https://developer.amazon.com/public/binaries/content/gallery/developerportalpublic/main/apis/earn/in-app-purchasing/receipt-verification.png)
Usage
===============
You can look at Amazon documention about the process [here](https://developer.amazon.com/appsandservices/apis/earn/in-app-purchasing/docs/rvs).

After you configure and run the service, you can browse it:

    var that = this;
    var options = {
        email: 'your developer email',
        key: 'your developer key'
    };
    var verifier = new AmzIAPVerifier(options);
    var receipt = {
        packageName: 'package name',
        productId: 'the name of your product',
        purchaseToken: 'The response token from the in-app purchase process',
        userId: 'The reponse user id from the in-app purchase process'
    };
    verifier.validateConsumable(receipt, function(err, response) {
        if (err) {
            console.log('error occur');
        } else if(response.itemType == "CONSUMABLE") {
            console.log('everything is ok');
        } else {
            console.log('other error occur');
        }
    });

Version
----

1.1.0

License
----

MIT

Author
----

Meir Shamay [@meir_shamay](https://twitter.com/meir_shamay)

**Free Software, Hell Yeah!**

[@meir_shamay]:https://www.twitter.com/meir_shamay
