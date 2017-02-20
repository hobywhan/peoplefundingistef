<template>
  <div class="payment">
    <!-- <script src="https://www.paypalobjects.com/api/button.js?"
         data-merchant="braintree"
         data-id="paypal-button"
         data-button="checkout"
         data-color="gold"
         data-size="medium"
         data-shape="pill"
         data-button_type="submit"
         data-button_disabled="false"
     ></script>-->
  </div>
</template>

<script>
// import braintree from 'braintree'
//
// var gateway = braintree.connect({
//   accessToken: 'access_token$sandbox$xp89jf94jwcspjhn$d840244adb4b34de11e897fdd737cafa'
// });
//
// import client from 'braintree-web/client'
// import paypal from 'braintree-web/paypal'
//
// client.create({
//   authorization: 'CLIENT_TOKEN_FROM_SERVER'
// }, function (err, clientInstance) {
//   paypal.create(/* ... */);
// });
//
// // Fetch the button you are using to initiate the PayPal flow
// var paypalButton = document.getElementById('id-for-your-paypal-button');
//
// // Create a Client component
// braintree.client.create({
//   authorization: 'TOKEN'
// }, function (clientErr, clientInstance) {
//   // Create PayPal component
//   braintree.paypal.create({
//     client: clientInstance
//   }, function (err, paypalInstance) {
//     paypalButton.addEventListener('click', function () {
//       // Tokenize here!
//       paypalInstance.tokenize({
//         flow: 'checkout', // Required
//         amount: 10.00, // Required
//         currency: 'EUR', // Required
//         locale: 'fr_FR',
//         enableShippingAddress: true,
//         shippingAddressEditable: false,
//         shippingAddressOverride: {
//           recipientName: 'Scruff McGruff',
//           line1: '1234 Main St.',
//           line2: 'Unit 1',
//           city: 'Chicago',
//           countryCode: 'US',
//           postalCode: '60652',
//           state: 'IL',
//           phone: '123.456.7890'
//         }
//       }, function (err, tokenizationPayload) {
//         // Tokenization complete
//         // Send tokenizationPayload.nonce to server
//       });
//     });
//   });
// });

export default {
  data () {
    return {
      msg: 'Paiement :'
    }
  },
  mounted: function () {
  }
}
</script>

<style>
</style>
