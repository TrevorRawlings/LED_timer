/*
 * File:   main.c
 * Author: trev_
 *
 * Created on 11 September 2016, 13:12
 */

/******************************************************************************/
/* Files to Include                                                           */
/******************************************************************************/

#if defined(__XC)
    #include <xc.h>        /* XC8 General Include File */
#elif defined(HI_TECH_C)
    #include <htc.h>       /* HiTech General Include File */
#elif defined(__18CXX)
    #include <p18cxxx.h>   /* C18 General Include File */
#endif

#if defined(__XC) || defined(HI_TECH_C)

#include <stdint.h>        /* For uint8_t definition */
#include <stdbool.h>       /* For true/false definition */

#endif

#include "system.h"        /* System funct/params, like osc/peripheral config */
#include "wait.h"
#include "switches.h"

/******************************************************************************/
/* User Global Variable Declaration                                           */
/******************************************************************************/

/* i.e. uint8_t <variable_name>; */

/******************************************************************************/
/* Main Program                                                               */
/******************************************************************************/

// max delay = 99 x 15 minutes = 1485 minutes (0x05CD)
//           = 24.75 hours
//           = 89100 seconds (0x15C0C)
                     
void main(void) {
    unsigned int delay;
    
    led_configure();
    delay = read_switches();
    wait(delay); // delay * 15 * 60
    
    led_on();
    trigger_LAMP();
    // output on
    while(1)
    {

    }
}