#include "rgb-controls/rgb-controls.h"
using namespace RGBControls;

Led led(D7, D5, D4);
Color purple(150, 0, 150);
Color red(255, 0, 0);
Color blue(0, 0, 255);

void setup() {
  pinMode(LED_R_PIN, OUTPUT);
  pinMode(LED_G_PIN, OUTPUT);
  pinMode(LED_B_PIN, OUTPUT);

  Particle.function("status", handleStatus);
}

int handleStatus(String command) {
//   if (command == "RESVERVED") {
    led.flash(purple);
//   }
  return 1;
}

void handleEvent(const char *event, const char *data) {
  Particle.publish(event, data);
}

void loop() {
  led.fade(red, blue, 1000);
}
