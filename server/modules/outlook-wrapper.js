import outlook from 'node-outlook';
import environmentProperties from '../../devices.json';

// Specify an OData query parameters to include in the request
const QUERY_PARAMS = {
  '$orderby': 'DisplayName asc',
  '$top': 10
};
const OUTLOOK_ENDPOINT = 'https://outlook.office.com/api/v2.0';

export const getContacts = () => {
  // // Set the API endpoint to use the v2.0 endpoint
  // outlook.base.setApiEndpoint(OUTLOOK_ENDPOINT);
  // outlook.contacts.getContacts({
  //   token: environmentProperties.rooms.GOOSE_ISLAND.outlookAuthToken,
  //   odataParams: QUERY_PARAMS
  // }, (error, result) => {
  //   if (error) {
  //     // console.log('getContacts returned an error: ' + error);
  //   } else if (result) {
  //     result.value.forEach((contact) => {
  //       return contact;
  //     });
  //   }
  // });
};
