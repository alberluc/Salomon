/* Inclure la librairie CapacitiveSensor */
#include <CapacitiveSensor.h>


/* Definition entrées */
CapacitiveSensor   cs_4_2 = CapacitiveSensor(4,2);        // Utiliser une résistance de 10M ohm entre l'entré pins 4&2
CapacitiveSensor   cs_11_9 = CapacitiveSensor(11,9);        // Utiliser une résistance de 10M ohm entre l'entré pins 11&9

/* Boolean pour capter le pas */
boolean clicked = true;
boolean clickedTwo = true;
/* Définition des sorties + */
String left = "Left";
String right = "Right";

void setup()                    
{
   cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
    cs_11_9.set_CS_AutocaL_Millis(0xFFFFFFFF);
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


