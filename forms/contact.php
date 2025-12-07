<?php
// Minimal working PHP webhook forwarder for Make.com
// Assumes form uses POST method and action="/forms/contact.php"

// Make.com custom webhook URL
$webhook_url = "https://hook.eu2.make.com/07gwtdhthvw3uxkkrwok8jfygrbd5awn";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "405: POST required";
    exit;
}

// Collect and sanitize form inputs
$data = [
    'name'    => $_POST['name'] ?? '',
    'email'   => $_POST['email'] ?? '',
    'subject' => $_POST['subject'] ?? '',
    'message' => $_POST['message'] ?? ''
];

// Send JSON to Make.com
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($http_code >= 200 && $http_code < 300) {
    echo "OK";
} else {
    http_response_code($http_code);
    echo "Error forwarding to Make (HTTP $http_code): $error | Response: $response";
}
