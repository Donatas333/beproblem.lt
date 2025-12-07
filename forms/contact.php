<?php
// Replace with your actual Make.com webhook URL
$webhook_url = 'https://hook.eu2.make.com/07gwtdhthvw3uxkkrwok8jfygrbd5awn'; // ← paste your webhook here

// Collect form data (same variables as in your original file)
$data = array(
  'name'    => $_POST['name'] ?? '',
  'email'   => $_POST['email'] ?? '',
  'subject' => $_POST['subject'] ?? '',
  'message' => $_POST['message'] ?? ''
);

// Send data to Make.com via POST
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
$response = curl_exec($ch);
curl_close($ch);

// Return a simple success message
echo "Message forwarded to Make.com!";
?>
