api_key=""
base64_image=$(cat encoded_image.txt)

output='{
    "model": "gpt-4-0613",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "You should return a JSON containing all information on this receipt."
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/jpeg;base64,\"$base64_image\""
            }
          }
        ]
      }
    ],
    "max_tokens": 300
  }'
echo $output > query.json

curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $api_key" \
  --data-binary "@./query.json"
