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
    remaining_seconds = seconds;
    remaining_fractions = 25;
    
    // Timer 1 Settings
    INTCONbits.GIEH = 1;
    INTCONbits.GIEL = 1;
//    T1CONbits.T1CKPS1 = 0;
//    T1CONbits.T1CKPS0 = 0;
//    T1CONbits.TMR1CS = 0; // Use Internal clock (Fosc/4). 32,768 kHz / 4 = 8192Hz 
    
    T2CONbits.T2CKPS = 2; // (1:1) Prescaler 1:1, 1:4, 1:16
    PR2 = 249;
    T2CONbits.TOUTPS = 4; // (1:16) Postscaller 1:1 to 1:16
    

    //PR2 = 249;
    
    // Enable Timer1 overflow interrupt
    PIE1bits.TMR2IE = 1;
   
    T2CONbits.TMR2ON = 1; // Enables Timer2
}

void interrupt isr(void)
{
    PIR1bits.TMR2IF = 0;  
    if (remaining_fractions == 1) {
        led_on();
        remaining_fractions = 25;
        if (remaining_seconds == 1) {
            T2CONbits.TMR2ON = 0; // Disables Timer2
        } else {
            remaining_seconds--;
        }
    } else {
        remaining_fractions--;
        led_off();
    }
}

unsigned short long heart_beat(unsigned short long previous_seconds) {
    unsigned short long seconds = remaining_seconds;
    
    if ((seconds != previous_seconds) && (seconds & 0x01)) {
        led_on();
        __delay_ms(100);
        led_off();
        __delay_ms(100);
        led_on();
        __delay_ms(100);
        led_off();
    }
    return seconds;
}

void wait(unsigned short long seconds) {    
    unsigned short long last_heart_beat;
    
    if (seconds == 0) {
        return;
    }
    
    configure_timer(seconds);
    while(1 == T2CONbits.TMR2ON) {
      // last_heart_beat = heart_beat(last_heart_beat);
    }
    led_on();
}