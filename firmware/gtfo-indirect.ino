#include "rgb-controls/rgb-controls.h"
using namespace RGBControls;

Led led(A7, A5, A4, false);

Color standby1(10, 10, 10);
Color standby2(50, 50, 50);

Color purple(150, 0, 150);
Color green(0, 255, 0);
Color greenSoft(25, 255, 25);

Color orange(255, 148, 0);
Color orangeRed(255, 63, 0);
Color red(255, 0, 0);

Color blue(0, 0, 255);
Color blueSoft(50, 50, 255);

Color colors[2] = { standby1, standby2 };

int fadeRate = 2000;

void setup() {
  led.setColor(standby1);
  Particle.function("status", handleStatus);
}

int handleStatus(String status) {
  if (status == "BOOKED") {
    fadeRate = 2000;
    led.fadeOnce(colors[1], blue, 2000);
    colors[0] = blue;
    colors[1] = blueSoft;
    return 1;
  } else if (status == "VACANT") {
    fadeRate = 2000;
    led.fadeOnce(colors[1], green, 2000);
    colors[0] = green;
    colors[1] = greenSoft;
    return 1;
  } else if (status == "FIVE_MINUTE_WARNING") {
    fadeRate = 1500;
    led.fadeOnce(colors[1], orange, 2000);
    colors[0] = orange;
    colors[1] = orangeRed;
    return 1;
  } else if (status == "ONE_MINUTE_WARNING") {
    fadeRate = 500;
    colors[0] = red;
    colors[1] = orange;
    return 1;
  }

  return 0;
}

void loop() {
  led.fade(colors, 2, fadeRate);
}
