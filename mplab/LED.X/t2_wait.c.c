/*
 * File:   delay.c
 * Author: trev_
 *
 * Created on September 11, 2016, 5:41 PM
 */


#include <xc.h>
#include "system.h"


// Based on example 12-1 on page 102 of the datasheet
//
// T1 is a 16bit counter. We'll use interrupt when the counter overflows from 
// 0xFFFF -> 0x0000. The timer is being supplied with a 8192Hz clock so will 
// take 8 seconds to overflow. 
//
// Since we want an interrupt every second we need to preload the counter's 
// high byte so that it overflows sooner.
// => 0xFFFF - 8191 = 0xE000 
// I.e. we're reducing T1 from a 16-bit to a 13-bit counter buy ignoring the top
// 3 bits
#define T1_HIGH_BYTE_RELOAD 0xE0

unsigned short long remaining_seconds;
unsigned int remaining_fractions;

void configure_timer(unsigned short long seconds) {
    remaining_seconds = seconds - 1;
    remaining_fractions = 8;
    
    // Timer 1 Settings
    INTCONbits.GIEH = 1;
    INTCONbits.GIEL = 1;
    
    T2CONbits.T2CKPS = 0; // (1:1) Prescaler 1:1, 1:4, 1:16
    PR2 = 255;            
    T2CONbits.TOUTPS = 3; // (1:16) Postscaller 1:1 to 1:16
    
    PIE1bits.TMR2IE = 1;  // Enable Timer1 overflow interrupt
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