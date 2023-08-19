<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function checkout(Request $request)
    {
        // return response()->json(['req' => $request]);
        return response($request);
        // Stripe::setApiKey(env('STRIPE_SECRET'));

        // $bag = $request->bag;
        // $domain = $request->domain;

        // // $products[] = [];
        // // $products = Product::where('id', $request->id)->first();
        // $products = Product::whereIn('id', $bag)->get();

        // $lineItems = [];
        // $totalPrice = 0;

        // foreach ($products as $product) {
        //     $totalPrice += $product->price;
        //     $lineItems[] = [
        //         'price_data' => [
        //             'currency' => 'jpy',
        //             'product_data' => [
        //               'name' => $product->title,
        //               'images' => [$domain.'/images/products/'.$product->image]
        //             ],
        //             'unit_amount' => $product->price,
        //         ],
        //         'quantity' => 1,
        //     ];
        // }

        // // this should be on the webhook and will exe3cute when already paid
        // foreach ($products as $product) {
        //     $product->decrement('quantity');
        //     $product->increment('sold');
        //     $product->save();
        // } 

        // $checkout_session = Session::create([
        //     'line_items' => $lineItems,
        //     'mode' => 'payment',
        //     'success_url' => route('checkout.success', [], true)."?session_id={CHECKOUT_SESSION_ID}",
        //     'cancel_url' => route('checkout.cancel', [], true)."?session_id={CHECKOUT_SESSION_ID}",
        //   ]);

        //   $order = new Order();
        //   $order->status = 'unpaid';
        //   $order->total_price = $totalPrice;
        //   $order->session_id = $checkout_session->id;
        //   $order->save();

        // // return redirect($checkout_session->url);
        // return response()->json(['checkout_url' => $checkout_session->url]);
    }

    public function success(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $sessionId = $request->get('session_id');
        
        try {
            $session = Session::retrieve($sessionId);   
            if(!$session) {
                throw new NotFoundHttpException();
            }
    
            // $customer = Customer::retrieve($session->customer);
            $customer = $session->customer_details;

            // $order = Order::where('session_id', $session->id)->get();
            $order = Order::where('session_id', $session->id)->where('status', 'unpaid')->first();
            if (!$order) {
                throw new NotFoundHttpException();
            }

            if ($order && $order->status === 'unpaid') {
                $order->status = 'paid';
                $order->save();
            }            
            // $customer = Customer::retrieve($session->customer);
            $customer = $session->customer_details;
            $data = ['name' => $customer->name];

            return view('product.checkout.success', compact('customer'));
    
        } catch (\Throwable $th) {
            throw new NotFoundHttpException();
        }
    }

    public function cancel(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $sessionId = $request->get('session_id');
        
        $session = Session::retrieve($sessionId);   
            if(!$session) {
                throw new NotFoundHttpException();
            }
    
            $customer = $session->customer_details;
            $data = ['name' => $customer->name];


        Mail::send('emails.welcome', $data, function ($message) {
            $message->from('us@example.com', 'Laravel');
         
            $message->to('foo@example.com')->cc('bar@example.com');
        });

        Mail::send('payment.cancel', $data, function($message) use ($customer)
        {
            $message->to($customer->email, $customer->name)->subject(env('APP_NAME').' | Payment Cancelled');
            $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
        });
        return view('product.checkout.cancel');
    }

    public function orders()
    {
        $orders = Order::all();
        return view('order.index', compact('orders'));
    }

    public function webhook()
    {
        // The library needs to be configured with your account's secret key.
        // Ensure the key is kept out of any version control system you might be using.

        // This is your Stripe CLI webhook secret for testing your endpoint locally.
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
          $event = \Stripe\Webhook::constructEvent(
            $payload, $sig_header, $endpoint_secret
          );
        } catch(\UnexpectedValueException $e) {
          // Invalid payload
            return response('', 400);
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
          // Invalid signature
          return response('', 400);
        }

        // Handle the event
        switch ($event->type) {
        //   case 'payment_intent.succeeded':
            case 'checkout.session.completed':
            $session = $event->data->object;
            $sessionId = $session->id;

             // $order = Order::where('session_id', $session->id)->get();
             $order = Order::where('session_id', $session->id)->first();
             if ($order && $order->status === 'unpaid') {
                $order->status = 'paid';
                $order->save();   

                //send successful charged email notice to customer
                $sessionRet = Session::retrieve($sessionId);   
                $customer = $sessionRet->customer_details;
                $data = ['name' => $customer->name];
    
                Mail::send('payment.success', $data, function($message) use ($customer)
                {
                    $message->to($customer->email, $customer->name)->subject(env('APP_NAME').' | Payment Succeeded');
                    $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
                });


             }
             case 'payment_intent.canceled' || 'checkout.session.async_payment_failed' || 'charge.failed':
                $session = $event->data->object;
                $sessionId = $session->id;
    
                 // $order = Order::where('session_id', $session->id)->get();
                 $order = Order::where('session_id', $session->id)->first();
                 if ($order && $order->status === 'unpaid') 
                 {
                    //send unpaid notice email to customer
                    $sessionRet = Session::retrieve($sessionId);   
                    $customer = $sessionRet->customer_details;
                    $data = ['name' => $customer->name];
        
                    Mail::send('payment.cancel', $data, function($message) use ($customer)
                    {
                        $message->to($customer->email, $customer->name)->subject(env('APP_NAME').' | Unpaid Order');
                        $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
                    });
                }
          default:
            echo 'Received unknown event type ' . $event->type;
        }

        return response('');
    
    }
}
