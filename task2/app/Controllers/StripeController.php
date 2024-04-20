<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\RedirectResponse;
use Exception;

class StripeController extends BaseController
{
    public function index(): string
    {
        return view('checkout', ['product' => $this->getDefaultProduct()]);
    }

    public function createCharge(): RedirectResponse
    {
        $product = $this->getDefaultProduct();

        try {
            \Stripe\Stripe::setApiKey(getenv('stripe_secret'));
            \Stripe\Charge::create([
                "amount" => $this->getPaymentAmount($product['price']),
                "currency" => "usd",
                "source" => $this->request->getVar('stripeToken'),
                "description" => "Purchase test: {$product['name']} - SKU: {$product['sku']}",
                "metadata" => $product,
            ]);

            return redirect()->back()->with('success', 'Payment successful!');
        } catch (
            \Stripe\Exception\CardException |
            \Stripe\Exception\RateLimitException |
            \Stripe\Exception\InvalidRequestException |
            \Stripe\Exception\AuthenticationException |
            \Stripe\Exception\ApiConnectionException |
            \Stripe\Exception\ApiErrorException |
            Exception $e
        ) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    private function getPaymentAmount($price): int
    {
        return $price * 100;
    }

    private function getDefaultProduct(): array
    {
        return [
            'sku' => '123',
            'name' => 'ABC',
            'description' => 'Sample product',
            'price' => 1
        ];
    }
}
