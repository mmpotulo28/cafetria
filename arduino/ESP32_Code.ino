#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h> // Include ArduinoJson library

const char *ssid = "Wokwi-GUEST"; // Your Wi-Fi SSID
const char *password = "";        // Your Wi-Fi Password

const int itemId = 13; // Change this to the ID of the item you want to update

void setup()
{
 Serial.begin(115200);
 // WiFi.setMinSecurity(WIFI_AUTH_WPA_PSK); // Set minimum security
 WiFi.begin(ssid, password);

 Serial.print("Connecting to WiFi");
 while (WiFi.status() != WL_CONNECTED)
 {
  delay(500);
  Serial.print(".");
 }

 Serial.println("\nConnected to Wi-Fi");
 Serial.print("ESP32 IP Address: ");
 Serial.println(WiFi.localIP());
}

void loop()
{
 if (WiFi.status() == WL_CONNECTED)
 {
  HTTPClient http;

  // Step 1: Fetch current item details
  String getUrl = "https://cafetria.vercel.app/api/items"; // Fetch all items
  http.begin(getUrl);

  int httpResponseCode = http.GET(); // Send GET request

  if (httpResponseCode > 0)
  {
   String response = http.getString();
   Serial.println("Current Items:");
   Serial.println(response); // Print current items

   // Step 2: Parse JSON response to find the item with ID 13
   DynamicJsonDocument doc(2048); // Adjust size as needed
   deserializeJson(doc, response);

   JsonArray items = doc.as<JsonArray>();
   JsonObject targetItem; // To hold the found item

   for (JsonObject item : items)
   {
    if (item["id"] == itemId)
    {                   // Check if the item's ID matches
     targetItem = item; // Store the found item
     break;             // Exit loop once found
    }
   }

   if (!targetItem.isNull())
   {                                        // If the item was found
    int currentStock = targetItem["stock"]; // Get current stock quantity

    // Step 3: Increment stock quantity
    int newStockQuantity = currentStock + 1; // Increment by 1

    // Prepare all required fields for PUT request
    String putUrl = "https://cafetria.vercel.app/api/items?id=" + String(itemId);
    http.begin(putUrl);
    http.addHeader("Content-Type", "application/json");

    // Create JSON object with all required fields
    String jsonData = "{\"name\":\"" + String(targetItem["name"]) + "\","
                                                                    "\"price\":" +
                      String(targetItem["price"]) + ","
                                                    "\"status\":\"" +
                      String(targetItem["status"]) + "\","
                                                     "\"img\":\"" +
                      String(targetItem["img"]) + "\","
                                                  "\"recommended\":" +
                      String(targetItem["recommended"]) + ","
                                                          "\"category\":\"" +
                      String(targetItem["category"]) + "\","
                                                       "\"description\":\"" +
                      String(targetItem["description"]) + "\","
                                                          "\"options\":" +
                      String(targetItem["options"]) + ","
                                                      "\"stock\":" +
                      String(newStockQuantity) + "}"; // Include updated stock quantity

    int putResponseCode = http.PUT(jsonData); // Send PUT request

    if (putResponseCode > 0)
    {
     String putResponse = http.getString();
     Serial.println("Stock updated successfully:");
     Serial.println(putResponse);
    }
    else
    {
     Serial.print("Error on sending PUT: ");
     Serial.println(putResponseCode);
    }
   }
   else
   {
    Serial.println("Item not found with ID: " + String(itemId));
   }
  }
  else
  {
   Serial.print("Error on sending GET: ");
   Serial.println(httpResponseCode);
  }

  http.end(); // Free resources

  delay(60000); // Wait for 1 minute before making another request
 }
}