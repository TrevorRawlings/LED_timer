/*
 * File:   delay.c
 * Author: trev_
 *
 * Created on September 11, 2016, 5:41 PM
 */


#include <xc.h>
#include "system.h"

unsigned short long remaining_seconds;
unsigned int remaining_fractions;

void configure_timer(unsigned short long seconds) {
    remaining_seconds = seconds - 1;
    remaining_fractions = 8;
    
    INTCONbits.GIEH = 1;
    INTCONbits.GIEL = 1;
    
    T2CONbits.T2CKPS = 0; // (1:1) Prescaler 1:1, 1:4, 1:16
    PR2 = 255;            
    T2CONbits.TOUTPS = 3; // (1:16) Postscaller 1:1 to 1:16
    
    PIE1bits.TMR2IE = 1;  // Enable Timer2 overflow interrupt
    T2CONbits.TMR2ON = 1; // Enables Timer2
}

void interrupt isr(void)
{
    PIR1bits.TMR2IF = 0;  
    if (remaining_fractions == 1) {    
        LATAbits.LA0 = 1;
        remaining_fractions = 8;
        if (remaining_seconds == 0) {
            T2CONbits.TMR2ON = 0; // Disables Timer2
        } else {
            remaining_seconds--;
        }
    } else {
        remaining_fractions--;
        LATAbits.LA0 = 0;
    }
}

void wait(unsigned short long seconds) {        
    if (seconds == 0) {
        return;
    }
    
    configure_timer(seconds);
    while(1 == T2CONbits.TMR2ON) {
      ;
    }
    led_on();
}