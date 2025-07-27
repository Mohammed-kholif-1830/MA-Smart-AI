<?php
header("Content-Type: application/json");

$apiKey = "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"; // حط مفتاحك هنا

$data = json_decode(file_get_contents("php://input"), true);

$ch = curl_init("https://openrouter.ai/api/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);

echo $response;