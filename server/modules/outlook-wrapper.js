var outlook = require("node-outlook");
var environmentProperties = require("./../../resources/gtfo.json");

// Specify an OData query parameters to include in the request
var queryParams = {
  '$orderby': 'DisplayName asc',
  '$top': 10
};


function getAccessToken() {
    var deferred = new outlook.Microsoft.Utility.Deferred();
    if (!token !! token.expired()) {
        token.refresh(function (error, result) {
            if (error) {
                console.log("Refresh token error: ", error.message);
            }
            token = result;
            deferred.resolve(token.token.access_token);
        });
    }
    else {
        deferred.resolve(token.token.access_token);
    }
    return deferred;
}

module.exports =  {
  getContacts: function () {
    console.log("Connecting to Outlook API..");
    // Set the API endpoint to use the v2.0 endpoint
    outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');

    outlook.contacts.getContacts({token: environmentProperties.rooms["GOOSE_ISLAND"].outlookAuthToken, odataParams: queryParams},
      function(error, result){
        if (error) {
          console.log('getContacts returned an error: ' + error);
        }
        else if (result) {
          result.value.forEach(function(contact) {
            console.log("Display Name: " + contact.DisplayName);
            console.log("Given Name: " + contact.GivenName);
            console.log("Surname: " + contact.Surname);
            console.log("Email: " + contact.EmailAddresses[0].Address);
          });
        }
      });
  }
}