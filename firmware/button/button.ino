#include "Keyboard.h"
#include <EduIntro.h>

// change this to the key you want to press
int keyboardPress = '1';

//Button Pin (digiital pins for the button library)
Button button(D4);

//this is for the LED in the button
int ledPin = 2;

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
  Keyboard.begin();
}

void loop() {
  if (button.pressed()) {
    Keyboard.write(keyboardPress);
    //Keyboard.releaseAll();
  }

}
