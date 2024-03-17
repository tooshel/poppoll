#include "PluggableUSBHID.h"
#include "USBKeyboard.h"

USBKeyboard Keyboard;
#include <EduIntro.h>

// change this to the key you want to press
//char* keyboardPress = "2";

//Button Pin (digiital pins for the button library)
Button button(D4);

//this is for the LED in the button
int ledPin = 2;

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
}

void loop() {
  if (button.pressed()) {
    Keyboard.printf("6");
  }
}
