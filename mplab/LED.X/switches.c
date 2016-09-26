/*
 * File:   switches.c
 * Author: trev_
 *
 * Created on September 11, 2016, 10:47 PM
 */

/******************************************************************************/
/*Files to Include                                                            */
/******************************************************************************/

#if defined(__XC)
    #include <xc.h>         /* XC8 General Include File */
#elif defined(HI_TECH_C)
    #include <htc.h>        /* HiTech General Include File */
#elif defined(__18CXX)
    #include <p18cxxx.h>    /* C18 General Include File */
#endif

#if defined(__XC) || defined(HI_TECH_C)

#include <stdint.h>         /* For uint8_t definition */
#include <stdbool.h>        /* For true/false definition */

#endif
#include "system.h"

#define SWITCH_1_BCD_1 PORTBbits.RB0 // pin also used by A/D channel 4 (AN4)
#define SWITCH_1_BCD_2 PORTBbits.RB1 // pin also used by A/D channel 5 (AN5)
#define SWITCH_1_BCD_4 PORTBbits.RB2 
#define SWITCH_1_BCD_8 PORTBbits.RB3

#define SWITCH_2_BCD_1 PORTBbits.RB4 // pin also used by A/D channel 6 (AN6)
#define SWITCH_2_BCD_2 PORTBbits.RB5
#define SWITCH_2_BCD_4 PORTAbits.RA2 // pin also used by A/D channel 2 (AN2)
#define SWITCH_2_BCD_8 PORTAbits.RA3 // pin also used by A/D channel 3 (AN3)

void configure_switches(void) {
    INTCON2bits.RBPU = 0; // Enable the port B pull ups
    
    // Disable A/D 
    ADCON1bits.PCFG2 = 1;
    ADCON1bits.PCFG3 = 1;
    ADCON1bits.PCFG4 = 1;
    ADCON1bits.PCFG5 = 1;
    ADCON1bits.PCFG6 = 1;
}

char inline convert_bcd_to_byte(char bit1, char bit2, char bit4, char bit8) {
    return bit1 + 
           bit2 * 2 +  
           bit4 * 4 + 
           bit8 * 8;
}

char read_switch1() {
    return convert_bcd_to_byte(!SWITCH_1_BCD_1, 
                               !SWITCH_1_BCD_2, 
                               !SWITCH_1_BCD_4, 
                               !SWITCH_1_BCD_8);
}

char read_switch2() {
    return convert_bcd_to_byte(!SWITCH_2_BCD_1, 
                               !SWITCH_2_BCD_2, 
                               !SWITCH_2_BCD_4, 
                               !SWITCH_2_BCD_8);
}

unsigned int read_switches(void) {
    configure_switches();
    return read_switch1() * 10 + 
           read_switch2();
}