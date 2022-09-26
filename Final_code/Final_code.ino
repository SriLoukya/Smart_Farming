#include "Adafruit_CCS811.h"
Adafruit_CCS811 ccs;
#include <DHT.h>
#include <WiFi.h>
#include "ThingSpeak.h"
#include <Wire.h>
#include <BH1750.h>
#include <i2cdetect.h>
#include<WebServer.h>
#include "HTTPClient.h"
#include "time.h"
#include <ArduinoJson.h>
BH1750 lightMeter(0x23);
const char* ssid = "esw-m19@iiith";   // your network SSID (name)
const char* password = "e5W-eMai@3!20hOct";
//const char* ssid = "realme 7";   // your network SSID (name)
//const char* password = "1234567890";
WiFiClient  client;
//172.20.10.1
//192.168.3.140

String cse_ip = "192.168.162.140"; // YOUR IP from ipconfig/ifconfig
String cse_port = "8080";
//String server = "http://" + cse_ip + ":" + cse_port + "/~/in-cse/in-name/";
//String ae = "SMART_FARMING";
float voc_min=0,voc_max=500;
float co2_min=300,co2_max=1200;
float hum_min=30,hum_max=110;
float temp_min=15,temp_max=45;
float moisture_min=0,moisture_max=100;
float light_min=0,light_max=3000;

unsigned long ChannelNumber = 1871357;
const char * WriteAPIKey = "601VQFAUQ5WG3144";


#define DHTPIN 15     // Digital pin connected to the DHT sensor
#define soil_pin 35

#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

DHT dht(DHTPIN, DHTTYPE);

void createCI(String& val,String cnt)
{
    HTTPClient http;

   http.begin("http://esw-onem2m.iiit.ac.in:443/~/in-cse/in-name/]=Team-29/"+cnt);
     // http.begin("https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-29/"+cnt);


    http.addHeader("X-M2M-Origin", "7lDbM0:p#pdvJ");
    http.addHeader("Content-Type", "application/json;ty=4");

    int code = http.POST("{\"m2m:cin\": {\"cnf\":\"application/json\",\"con\": " + String(val) + "}}");

    Serial.print(cnt);
    Serial.print(" ");
    Serial.println(code);

    if (code == -1)
    {
        Serial.println("Unable to connect");
    }

    http.end();
}
int check_range(float mini,float maxi,float val)
{
  if(val>=mini&&val<=maxi)
  return 1;
  else
  return 0;
}
void setup() {
  Serial.begin(115200);
  if (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect");
    while (WiFi.status() != WL_CONNECTED) {
      WiFi.begin(ssid, password);
      delay(5000);
    }
    Serial.println("\nConnected.");
  }
  ThingSpeak.begin(client);
  Wire.begin();
  


  i2cdetect();
  lightMeter.begin();
  delay(500);

  dht.begin();
  delay(1000);

  if(!ccs.begin()){
    Serial.println("Failed to start sensor! Please check your wiring.");

  }

 
  while(!ccs.available());
  
}

void loop() {
  
  float co2;
  float voc;
  delay(15000);
  if(ccs.available()){
    if(!ccs.readData()){
      co2=ccs.geteCO2();
      voc=ccs.getTVOC();
    }
  }
 
  
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);
  int soil_val = analogRead(soil_pin);
  float moisture_percentage=map(soil_val,3300,1300,0,100);

  if(moisture_percentage>100)
  moisture_percentage=100;
  else if(moisture_percentage<0)
  moisture_percentage=0;
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
  }
  int lux = lightMeter.readLightLevel();
 
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.println(F("°C "));
  Serial.print("Moisture value: ");
  Serial.print(soil_val);
  Serial.print(" Soil Percentage: ");
  Serial.println(moisture_percentage);
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");

  if(check_range(co2_min,co2_max,co2))
  {
    String co2_s=String(co2);  
  createCI(co2_s,"CO2");
  ThingSpeak.setField(2, co2);
  Serial.print("CO2: ");
  Serial.print(co2);
  Serial.println("ppm");
  
  }
  else
  {    
    Serial.println("CO2 out of range");
  }
   if(check_range(voc_min,voc_max,voc))
  {
  String voc_s=String(voc); 
  createCI(voc_s,"VOC");
  ThingSpeak.setField(3, voc);
  Serial.print("TVOC:(in ppb) ");
  Serial.println(voc);
  

  }
   else
  {
   Serial.println("VOC out of range");
  
  }
  if(check_range(hum_min,hum_max,h))
  {
  String h_s=String(h); 
  createCI(h_s,"HUMIDITY");
  ThingSpeak.setField(4, h);
  }
   else
  {
    Serial.println("Humidity out of range");
  }
   if(check_range(temp_min,temp_max,t))
  {
  String temp_s=String(t); 
  createCI(temp_s,"TEMPERATURE");
  ThingSpeak.setField(5, t);

  }
   else
  {
    Serial.println("Temperature out of range");
  }
   if(check_range(moisture_min,moisture_max,moisture_percentage))
  {
    
  String soil_val_s=String(soil_val);
  ThingSpeak.setField(7, soil_val);
  createCI(soil_val_s,"SOIL_MOISTURE");

  }
  else
  {
     Serial.println("Moisture out of range"); 
  }
 if(check_range(light_min,light_max,lux))
  {
  String lux_s=String(lux);
  ThingSpeak.setField(8, lux);
  createCI(lux_s,"LIGHT_INTENSITY");
  }
   else
  {
    Serial.println("lux out of range");
  }
  int x=ThingSpeak.writeFields(ChannelNumber,WriteAPIKey);
}
