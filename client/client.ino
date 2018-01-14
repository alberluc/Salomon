
/* Inclure la librairie CapacitiveSensor */
#include <CapacitiveSensor.h>
#include "FastLED.h"
#define NUM_LEDS 60 
CRGB leds[NUM_LEDS];
#define PIN 7


/* Definition entrées */
CapacitiveSensor   cs_4_2 = CapacitiveSensor(4,2);        // Utiliser une résistance de 10M ohm entre l'entré pins 4&2
CapacitiveSensor   cs_11_9 = CapacitiveSensor(11,9);        // Utiliser une résistance de 10M ohm entre l'entré pins 11&9

/* Boolean pour capter le pas */
boolean clicked = true;
boolean clickedTwo = true;
/* Définition des sorties + */
String left = "Left";
String right = "Right";
boolean activeLed = true;

void setup()                    
{
   cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_11_9.set_CS_AutocaL_Millis(0xFFFFFFFF);
   FastLED.addLeds<WS2811, PIN, GRB>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );
   pinMode(5,OUTPUT);
   pinMode(12,OUTPUT);
  
   Serial.begin(9600);
}

void loop() {
  /* Définition de la sensibilité du capteur */
    long total1 =  cs_4_2.capacitiveSensor(10);
    long total2 =  cs_11_9.capacitiveSensor(10);
    
    if(total1 > 50) {
      if(clicked) {
          clicked = false;
          digitalWrite(5, HIGH);
          /* Envoi de la donnée pour le serveur */
          Serial.println("Left");
      }
    } else {
      clicked = true;
      digitalWrite(5, LOW);     
    }
    if(total2 > 50) {
      if(clickedTwo) {
          clickedTwo = false;
          digitalWrite(12, HIGH);
          /* Envoi de la donnée pour le serveur */
          Serial.println("Right");

      }
    } else {
      clickedTwo = true;
      digitalWrite(12, LOW);     
    }

    // RECEPTION DES DONNEES

    if (Serial.available()) {

      char inChar = Serial.read();
      if(inChar == 'C'){ // end character for toggle LED
        // FADE OUT
        for(int k = 255; k >= 0; k--) { 
          setAll(0,0,k);
          showStrip();
        }
     
        // Fade IN
        for(int k = 0; k < 256; k++) { 
          setAll(k,0,0);
          showStrip();
        } 
        activeLed = false;
      }
      if(inChar == 'B'){ // end character for toggle LED
        // FADE OUT
        for(int k = 255; k >= 0; k--) { 
          setAll(k,0,0);
          showStrip();
        }
     
        // Fade IN
        for(int k = 0; k < 256; k++) { 
          setAll(0,0,k);
          showStrip();
        } 
        activeLed = false;
      }
    }

     if(activeLed) {
       setAll(0,0,255);
       showStrip();
     }
   
  
}
void RemoveSpaces(char* source) {
  char* i = source;
  char* j = source;
  while(*j != 0)
  {
    *i = *j++;
    if(*i != ' ')
      i++;
  }
  *i = 0;
}
void showStrip() {
 #ifdef ADAFRUIT_NEOPIXEL_H 
   // NeoPixel
   strip.show();
 #endif
 #ifndef ADAFRUIT_NEOPIXEL_H
   // FastLED
   FastLED.show();
 #endif
}


void setPixel(int Pixel, byte red, byte green, byte blue) {
 #ifdef ADAFRUIT_NEOPIXEL_H 
   // NeoPixel
   strip.setPixelColor(Pixel, strip.Color(red, green, blue));
 #endif
 #ifndef ADAFRUIT_NEOPIXEL_H 
   // FastLED
   leds[Pixel].r = red;
   leds[Pixel].g = green;
   leds[Pixel].b = blue;
 #endif
}


void setAll(byte red, byte green, byte blue) {
  for(int i = 0; i < NUM_LEDS; i++ ) {
    setPixel(i, red, green, blue); 
  }
  showStrip();
}


