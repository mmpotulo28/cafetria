#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Wokwi-GUEST"; // Your Wi-Fi SSID
const char* password = ""; // Your Wi-Fi Password

void setup() {
  Serial.begin(115200);
  WiFi.setMinSecurity(WIFI_AUTH_WPA_PSK); // Set minimum security
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected to Wi-Fi");
  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Replace with your actual API endpoint URL
    http.begin("http://localhost:3000/api/items"); // Change this to your server's URL if not running locally

    int httpResponseCode = http.GET(); // Send the request

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode); // Print return code
      Serial.println(response); // Print response payload

      // Optionally, you can parse the JSON response here if needed
      // For example, using ArduinoJson library
    } else {
      Serial.print("Error on sending GET: ");
      Serial.println(httpResponseCode);
    }

    http.end(); // Free resources

    delay(10000); // Wait 10 seconds before making another request
  }
}