<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Task #2 - Checkout</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-2xl-4">
                <div class="card shadow-lg p-2 mb-5">
                    <div class="card-body">
                        <?php if (session()->getFlashdata('success')) : ?>
                            <div class="alert alert-success">
                                <?php echo session()->getFlashdata('success'); ?>
                            </div>
                        <?php endif ?>
                        <?php if (session()->getFlashdata('error')) : ?>
                            <div class="alert alert-danger">
                                <?php echo session()->getFlashdata('error'); ?>
                            </div>
                        <?php endif ?>
                        <form id="checkout-form" method="post" action="<?php echo base_url('/stripe/create-charge'); ?>">
                            <input type="hidden" name="stripeToken" id="stripe-token-id">
                            <p class="mb-4 h4 text-success">Checkout</p>
                            <div class="d-flex align-items-center justify-content-center mb-2">
                                <img src="<?php echo base_url('images/products/sku-'.$product["sku"].'.png'); ?>" class="img-responsive" alt="<?php echo $product["name"]; ?>" title="<?php echo $product["name"]; ?>" height="100" />
                            </div>
                            <table class="table table-striped mb-4 fs-6">
                                <tr>
                                    <th scope="row" class="fs-6">SKU</th>
                                    <td class="fs-6"><?php echo $product["sku"]; ?></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="fs-6">Product</th>
                                    <td class="fs-6"><?php echo $product["name"]; ?></td>
                                </tr>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td><?php echo $product["description"]; ?></td>
                                </tr>
                                <tr>
                                    <th scope="row">Price</th>
                                    <td>$<?php echo $product["price"]; ?></td>
                                </tr>
                            </table>
                            <div id="card-element" class="form-control p-3">
                            </div>
                            <button id="pay-btn" class="btn btn-success mt-4 w-100 p-2" type="button" onclick="createToken()">PAY $<?php echo $product["price"]; ?>
                            </button>
                            <div class="visually-hidden alert alert-info mt-4" id="processing">Processing payment, please wait...</div>
                        </form>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                    <a class="link-success" href="/">Return to Home Page</a>
                </div>
            </div>
        </div>
    </div>

    <script src="https://js.stripe.com/v3/"></script>
    <script>
        const stripe = Stripe("<?php echo getenv('stripe_key') ?>", {
            locale: 'en_US',
        });
        const elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');

        function createToken() {
            document.getElementById('pay-btn').disabled = true;
            stripe.createToken(cardElement).then(function(result) {
                if (typeof result.error != 'undefined') {
                    document.getElementById('pay-btn').disabled = false;
                    alert(result.error.message);
                }

                if (typeof result.token != 'undefined') {
                    document.getElementById('pay-btn').disabled = false;
                    document.getElementById('pay-btn').classList.add('visually-hidden');
                    document.getElementById('processing').classList.remove('visually-hidden');
                    document.getElementById('stripe-token-id').value = result.token.id;
                    document.getElementById('checkout-form').submit();
                }
            });
        }
    </script>
</body>

</html>