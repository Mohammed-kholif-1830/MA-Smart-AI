<?php
// السماح بالوصول من أي دومين (عشان الجافاسكربت يقدر يكلم الباك اند)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// هنسحب المفتاح من Environment Variable
$apiKey = getenv('OPENROUTER_KEY');

if (!$apiKey) {
    echo json_encode(["error" => "API key not found!"]);
    exit;
}

// استقبل البيانات من الجافا سكريبت
$input = json_decode(file_get_contents("php://input"), true);

$url = "https://openrouter.ai/api/v1/chat/completions";

// الطلب لـ OpenRouter
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>