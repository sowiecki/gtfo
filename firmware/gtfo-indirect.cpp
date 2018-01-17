#include "neopixel.h"
#include "DHT.h"

SYSTEM_MODE(AUTOMATIC);

#define PIXEL_PIN D2
#define PIXEL_COUNT 12
#define PIXEL_TYPE WS2812B
#define MOTION_SENSOR_PIN A0
#define DHTPIN A4
#define DHTTYPE DHT11

Adafruit_NeoPixel strip(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);
DHT dht(DHTPIN, DHTTYPE);

String id;
String newRoomStatus;
String currentRoomStatus;
bool statusUpdated = false;
const int MIN_TIME_BETWEEN_TRIGGERS = 500;
const int PIXEL_MAX_B = 100;

// Standard colors
const uint32_t COLOR_WHITE = strip.Color(10, 10, 10);
const uint32_t COLOR_GREEN = strip.Color(0, PIXEL_MAX_B, 0);
const uint32_t COLOR_RED = strip.Color(PIXEL_MAX_B, 0, 0);
const uint32_t COLOR_ORANGE = strip.Color(PIXEL_MAX_B, 45, 0);
const uint32_t COLOR_BLUE = strip.Color(0, 0, PIXEL_MAX_B);
const uint32_t COLOR_TEAL = strip.Color(0, PIXEL_MAX_B, PIXEL_MAX_B);

void getDeviceInfo(const char *topic, const char *data) {
  Serial.println("received " + String(topic) + ": " + String(data));
  id = String(data);

  Particle.publish("spark/device/name");
}

int changeStatus(String status) {
  newRoomStatus = status;
}

void setup() {
  Serial.begin(115200);

  dht.begin();
  pinMode(MOTION_SENSOR_PIN, INPUT);
  strip.begin();
  strip.show();

  Particle.function("status", changeStatus);

  for (int i = 0; i < 5; i++) {
    Serial.println("waiting... " + String(5 - i));
    delay(1000);
  }

  Particle.subscribe("spark/", getDeviceInfo);
  Particle.publish("spark/device/name");
}

uint32_t setColorIntensity(uint8_t r, uint8_t g, uint8_t b, uint8_t i) {
  uint8_t RED = r - 1 >= 0 ? r - i : 0;
  uint8_t GREEN = g - 1 >= 0 ? g - i : 0;
  uint8_t BLUE = b - 1 >= 0 ? b - i : 0;

  return strip.Color(RED, GREEN, BLUE);
}

void setRingColor(uint32_t color, uint32_t altColor = COLOR_WHITE, int8_t set = 1) {
  bool invert = set < 0;

  for (uint8_t i = 0; i < strip.numPixels(); i++) {
    if (i % set == 0) {
      strip.setPixelColor(i, invert ? altColor : color);
    } else {
      strip.setPixelColor(i, invert ? color : altColor);
    }

    strip.show();
  }
}

void pulseColor(
  uint8_t r,
  uint8_t g,
  uint8_t b,
  uint8_t rate,
  uint32_t altColor = COLOR_WHITE,
  // Make sure set is always passed as type int8_t, else Photon will sieze and require safe mode recovery
  int8_t set = 1
) {
  int8_t PULSE_MAX = max(max(r, g), b);
  int8_t minRGB = min(min(r, g), b);
  int8_t PULSE_MIN = minRGB == PULSE_MAX ? 0 : minRGB;
  uint32_t color;

  for (uint8_t i = PULSE_MIN; i <= PULSE_MAX; i += rate) {
    color = setColorIntensity(r, g, b, PULSE_MAX - i);

    setRingColor(color, altColor, set);
    delay(40);
  }

  for (uint8_t i = PULSE_MIN; i <= PULSE_MAX; i += rate) {
    color = setColorIntensity(r, g, b, i);

    setRingColor(color, altColor, set);
    delay(40);
  }
}

void fadePixel(uint8_t pixel, uint8_t i) {
  uint32_t color = strip.getPixelColor(pixel);
  uint8_t r = (color >> 16) & 255;
  uint8_t g = (color >> 8) & 255;
  uint8_t b = color & 255;
  uint8_t RED = r - 1 >= 0 ? r - i : 0;
  uint8_t GREEN = g - 1 >= 0 ? g - i : 0;
  uint8_t BLUE = b - 1 >= 0 ? b - i : 0;

  strip.setPixelColor(pixel, RED, GREEN, BLUE);
}

void fadeTransition(bool invert) {
  for (uint8_t i = PIXEL_MAX_B; i > 0; i--) {
    for (uint8_t pixel = 0; pixel < strip.numPixels(); pixel++) {
      fadePixel(pixel, invert ? i : PIXEL_MAX_B - i);
    }

    strip.show();
  }
}

void handleStatus(String status) {
  if (statusUpdated) {
    setRingColor(COLOR_WHITE);
    fadeTransition(false);

    statusUpdated = false;
  }

  if (status == "BOOKED") {
    pulseColor(0, 0, PIXEL_MAX_B, 1, COLOR_BLUE, -4);
  } else if (status == "VACANT") {
    pulseColor(0, PIXEL_MAX_B, 0, 4, COLOR_GREEN, -4);
  } else if (status == "FIVE_MINUTE_WARNING") {
    pulseColor(PIXEL_MAX_B, PIXEL_MAX_B, 0, 4, COLOR_ORANGE, 4);
  } else if (status == "ONE_MINUTE_WARNING") {
    pulseColor(PIXEL_MAX_B, 0, 0, 40, COLOR_RED, 2);
  } else if (status == "SQUATTED") {
    pulseColor(PIXEL_MAX_B, 0, PIXEL_MAX_B, 4, COLOR_GREEN, -4);
  } else if (status == "ABANDONED") {
    pulseColor(0, PIXEL_MAX_B, PIXEL_MAX_B, 6, COLOR_TEAL, -4);
  } else {
    pulseColor(10, 10, 10, 1, COLOR_WHITE, -3);
  }

  if (currentRoomStatus != newRoomStatus) {
    Serial.println(strip.getPixelColor(0));
    fadeTransition(false);

    currentRoomStatus = newRoomStatus;
    statusUpdated = true;
  }
}

void loop() {
  handleStatus(currentRoomStatus);

  // Motion code must be run before temperatue code
  if (digitalRead(MOTION_SENSOR_PIN)) {
    Particle.publish("MOTION_DETECTED", id);

    unsigned long motionTime = millis();

    while (millis() - motionTime < MIN_TIME_BETWEEN_TRIGGERS) {
      if (digitalRead(MOTION_SENSOR_PIN))
        motionTime = millis();
    }
  }

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

  Particle.publish("TEMPERATURE_READINGS", String::format("{\"Hum(\%)\": %4.2f, \"Temp(°C)\": %4.2f, \"Temp(°F)\": %4.2f, \"HI(°C)\": %4.2f, \"HI(°F)\": %4.2f}", h, t, f, hic, hif));
}
