<?php

$curl = curl_init();
echo "test";exit;
curl_setopt($curl, CURLOPT_URL, 'https://smartmessaging.etisalat.ae:5676/campaigns/submissions/sms/nb');
curl_setopt($curl, CURLOPT_POST, true);

$data = array("msgCategory": "4.5",
"contentType": "3.1",
"senderAddr": "XADAutoServ",
"dndCategory": "Campaign",
"priority": 1,
"clientTxnId": "112346587963",
"recipient": "971589095007",
"msg": "here is the message",
"dr": "1");
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
$access_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTIwOCwibG9naW5JZCI6IlhhZGF1dG9zMSIsImZpcnN0TmFtZSI6Ik1hc29vZCBNYWxpayIsImVtYWlsIjoibWFzb29kQHhhZHRlY2guY29tIiwic3RhdHVzIjoiMSIsImNvbnRhY3RObyI6Ijk3MTU4OTA5NTAwNyIsInBhcmVudElkIjo5MTg5LCJjbGFpbXMiOiJ7XCJyb2xlXCI6XCIxN1wiLFwicGVybXNcIjp7XCI4XCI6XCJjclwiLFwiOVwiOlwiclwiLFwiMTBcIjpcInJcIixcIjE0XCI6XCJjcmVkXCIsXCIxNVwiOlwicm5cIixcIjE4XCI6XCJjcmVkXCIsXCIxOVwiOlwiclwiLFwiMjBcIjpcInJcIixcIjIxXCI6XCJyXCIsXCIyNlwiOlwiclwiLFwiMzBcIjpcImNyZWR0XCIsXCIyMy4xXCI6XCJjcmVkXCIsXCIyMy4yXCI6XCJjcmVkXCIsXCI5LjMuOFwiOlwiclwiLFwiOS4zLjExXCI6XCJyXCIsXCI5LjMuMTJcIjpcInJcIixcIjkuMy4xM1wiOlwiclwiLFwiOS4zLjVcIjpcInJcIixcIjkuMy42XCI6XCJyXCIsXCI5LjMuN1wiOlwiclwiLFwiOS4zLjE0XCI6XCJyXCIsXCI5LjMuMTVcIjpcInJcIixcIjkuMy4xN1wiOlwiclwiLFwiOS4zLjE4XCI6XCJyXCIsXCI5LjMuMjBcIjpcInJcIixcIjkuMy4yMVwiOlwiclwiLFwiOS4zLjIyXCI6XCJyXCIsXCI5LjMuMTlcIjpcInJcIixcIjkuMy4yNVwiOlwiclwiLFwiOS4zLjI2XCI6XCJyXCIsXCI5LjMuMjdcIjpcInJcIixcIjIzLjNcIjpcImNyZWR0XCIsXCIyLjlcIjpcImNyZWRcIixcIjE1LjFcIjpcInJuXCIsXCIxNS40XCI6XCJyblwiLFwiMTUuMTFcIjpcInJuXCIsXCIxNS4xMlwiOlwicm5cIixcIjE1LjE0XCI6XCJyblwiLFwiMTUuMTZcIjpcInJuXCIsXCIxNS4yNFwiOlwicm5cIixcIjE1LjI1XCI6XCJyblwiLFwiMTUuMjZcIjpcInJuXCIsXCIxNS4yN1wiOlwicm5cIixcIjE1LjM1XCI6XCJyblwiLFwiMTUuNDBcIjpcInJuXCIsXCIxNS4zMFwiOlwicm5cIixcIjE1LjQzXCI6XCJyblwiLFwiMTUuMjlcIjpcInJuXCIsXCI1LjJcIjpcImNyZWR0XCIsXCI1LjNcIjpcImNyZWR0XCIsXCI1LjRcIjpcImNyZWR0XCIsXCI1LjVcIjpcImNyZWR0XCIsXCI1LjdcIjpcImNyZWR0XCIsXCI4LjEuMVwiOlwiY3JlZHRcIixcIjguM1wiOlwiY3JlZHRcIixcIjguMy4xXCI6XCJjcmVkdFwiLFwiMi4xXCI6XCJjcmVkdFwiLFwiNS4xXCI6XCJjcmVkdFwifX0iLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTIzVDEwOjQzOjI5LjAwMFoiLCJleHBpcnlEdCI6IjIwMzMtMDgtMjBUMjA6MDA6MDAuMDAwWiIsImVudGVycHJpc2VJZCI6IjQ0ODgiLCJpYXQiOjE2OTUzNzkwNTF9.le3VPABQ4NTbHAPqD9c_COUVFo10QwOz3_yCMKq2P6s";
$headers = array(
    'Authorization: Bearer ' . $access_token,
    'Content-Type: application/json',
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($curl);
print_r($response);
curl_close($curl);

?>
