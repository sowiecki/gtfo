#include "neopixel.h"

SYSTEM_MODE(AUTOMATIC);

#define PIXEL_PIN D2
#define PIXEL_COUNT 12
#define PIXEL_TYPE WS2812B
#define MOTION_SENSOR_PIN A0

Adafruit_NeoPixel strip(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

String id;
int MIN_TIME_BETWEEN_TRIGGERS = 500;

// RGB
uint32_t COLOR_WHITE = strip.Color(255, 255, 255);
uint32_t COLOR_GREEN = strip.Color(0, 255, 0);
uint32_t COLOR_RED = strip.Color(255, 0, 0);
uint32_t COLOR_ORANGE = strip.Color(255,165, 0);
uint32_t COLOR_BLUE = strip.Color(0, 0, 255);
uint32_t COLOR_MAGENTA = strip.Color(255, 0, 255);
uint32_t COLOR_TEAL = strip.Color(75, 75, 255);

void getDeviceInfo(const char *topic, const char *data) {
  strip.begin();
  strip.show();

  Serial.println("received " + String(topic) + ": " + String(data));
  id = String(data);

  Particle.publish("spark/device/name");
}

void setup() {
  Serial.begin(115200);

  pinMode(MOTION_SENSOR_PIN, INPUT);

  setStatusColor(COLOR_WHITE);

  Particle.function("status", handleStatus);

  for (int i = 0; i < 5; i++) {
    Serial.println("waiting... " + String(5 - i));
    delay(1000);
  }

  Particle.subscribe("spark/", getDeviceInfo);
  Particle.publish("spark/device/name");
}

int setStatusColor(int color) {
  for (int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, color);
    strip.show();
  }
}

int handleStatus(String status) {
  if (status == "BOOKED") {
    setStatusColor(COLOR_BLUE);
    return 1;
  } else if (status == "VACANT") {
    setStatusColor(COLOR_GREEN);
    return 1;
  } else if (status == "FIVE_MINUTE_WARNING") {
    setStatusColor(COLOR_ORANGE);
    return 1;
  } else if (status == "ONE_MINUTE_WARNING") {
    setStatusColor(COLOR_RED);
    return 1;
  } else if (status == "SQUATTED") {
    setStatusColor(COLOR_MAGENTA);
    return 1;
  } else if (status == "ABANDONED") {
    setStatusColor(COLOR_TEAL);
    return 1;
  }

  return 0;
}

void loop() {
  if (digitalRead(MOTION_SENSOR_PIN)) {
    Particle.publish("MOTION_DETECTED", id);

    unsigned long motionTime = millis();

    while (millis() - motionTime < MIN_TIME_BETWEEN_TRIGGERS) {
      if (digitalRead(MOTION_SENSOR_PIN))
        motionTime = millis();
    }
  }

  Particle.function("status", handleStatus);
}
