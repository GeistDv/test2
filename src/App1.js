const Stripe = require('stripe');



function App() {

  function c () {
    var stripe = Stripe('pk_test_51KH7SdLyE3w569dvyH2Va8GSPG42YBY5CCRsurEzhm5YmgA3Y6mYxgd4L1EVKtjEHOH4RcRRxsbS9AyHxU8aAJni00tiI35K4Q');
  
    var checkoutButton = document.getElementById('checkout-button-price_1KJhbWLyE3w569dvBpNZORxP');
    checkoutButton.addEventListener('click', function () {
      stripe.redirectToCheckout({
        lineItems: [{price: 'price_1KJhbWLyE3w569dvBpNZORxP', quantity: 1}],
        mode: 'payment',
          sUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/canceled',
      })
      .then(function (result) {
        if (result.error) {
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
    });
  };

    return ( 
        <button
        style="background-color:#6772E5;color:#FFF;padding:8px 12px;border:0;border-radius:4px;font-size:1em;cursor:pointer"
        id="checkout-button-price_1KJhbWLyE3w569dvBpNZORxP"
        role="link"
        type="button"
        >
        Checkout
        </button>

    );
  }
  
  export default App;
  