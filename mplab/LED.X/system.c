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

void led_configure(void) {
    TRISAbits.RA0 = 0; // Clearing a TRIA bit will make the corresponding PORTA 
                       // pin an output
    led_off();
}

void led_on(void) {
    LATAbits.LA0 = 1;
}

void led_off(void) {
    LATAbits.LA0 = 0;
}

void trigger_LAMP(void) {
    // RA4
    LATAbits.LA4 = 0;
    TRISAbits.RA4 = 0;
    __delay_ms(4000);
    LATAbits.LA4 = 1;
}