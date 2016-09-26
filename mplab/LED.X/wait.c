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

void configure_timer(unsigned short long seconds) {
    remaining_seconds = seconds;
    
    // Timer 1 Settings
    INTCONbits.GIEH = 1;
    INTCONbits.GIEL = 1;
    T1CONbits.T1CKPS1 = 0;
    T1CONbits.T1CKPS0 = 0;
    T1CONbits.TMR1CS = 0; // Use Internal clock (Fosc/4). 32,768 kHz / 4 = 8192Hz 
   
    // Enable Timer1 overflow interrupt
    PIE1bits.TMR1IE = 1;
   
    TMR1H = T1_HIGH_BYTE_RELOAD;  // We can safely modify this register while 
                                  // the timer is running
    TMR1L = 0x00;                 // Modifying this register while T1 is running 
                                  // would introduce timing inaccuracies   
    T1CONbits.TMR1ON = 1; // Enables Timer1
}

void interrupt isr(void)
{
    unsigned short long new_remaining_seconds;
    
    if (PIR1bits.TMR1IF && PIE1bits.TMR1IE) {
        PIR1bits.TMR1IF = 0;   
        
        new_remaining_seconds = remaining_seconds - 1;
        if (new_remaining_seconds > 0) {
            TMR1H = T1_HIGH_BYTE_RELOAD;
        } else {
            T1CONbits.TMR1ON = 0; // Disables Timer1
        }
        
        // Update remaining_seconds after we've cleared TMR1ON so that wait() 
        // does not do another heat beat at the end of the wait period
        remaining_seconds = new_remaining_seconds;
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
    while(1 == T1CONbits.TMR1ON) {
        last_heart_beat = heart_beat(last_heart_beat);
    }
}