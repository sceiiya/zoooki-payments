<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Payment Succeeded</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    </head>
    <body class="antialiased">
        <div style="display: flex; justify-content: center; flex-direction: row; text-align: center; align-items: center">
            <h1>Status for {{$customer->name}}'s Payment:</h1>
            <h1>Payment Succeeded!</h1>
        </div>
    </body>
    <script>
        setTimeout(function () {
            window.location.href = "{{ route('redirectToHome') }}";
        }, 3000);
    </script>
</html>