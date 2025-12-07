<?php
// contact.php - improved version

// Replace with your actual Make.com webhook URL
$webhook_url = 'https://hook.eu2.make.com/07gwtdhthvw3uxkkrwok8jfygrbd5awn';

// Collect form data (sanitise to taste)
$data = array(
  'name'    => isset($_POST['name']) ? trim($_POST['name']) : '',
  'email'   => isset($_POST['email']) ? trim($_POST['email']) : '',
  'subject' => isset($_POST['subject']) ? trim($_POST['subject']) : '',
  'message' => isset($_POST['message']) ? trim($_POST['message']) : ''
);

// If accessed by GET, optionally show a simple form or bail
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: text/plain; charset=utf-8', true, 405);
    echo "This endpoint accepts POST only.\n";
    exit;
}

// Prepare JSON payload
$json = json_encode($data);

// cURL request to Make.com
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($json),
    // optionally add a custom header if you want to identify server
    'User-Agent: MySiteWebhook/1.0'
));
// Optional: for debugging only — to see full TLS errors
curl_setopt($ch, CURLOPT_VERBOSE, true);

// Execute
$response = curl_exec($ch);
$curl_errno = curl_errno($ch);
$curl_error = curl_error($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log results to a file for debugging (make sure webserver can write to it)
$log_line = date('c') . " | HTTP_CODE: $http_code | CURL_ERRNO: $curl_errno | CURL_ERROR: $curl_error | RESPONSE: " . substr($response ?? '', 0, 1000) . PHP_EOL;
file_put_contents(__DIR__ . '/webhook_debug.log', $log_line, FILE_APPEND);

// Return useful debug to browser (remove or simplify in production)
header('Content-Type: application/json');
echo json_encode([
    'status' => 'forward_attempted',
    'http_code' => $http_code,
    'curl_errno' => $curl_errno,
    'curl_error' => $curl_error,
    'response_snippet' => substr($response ?? '', 0, 1000)
]);
?>
