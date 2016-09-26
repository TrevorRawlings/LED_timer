#ifndef XC_SYSTEM_H
#define	XC_SYSTEM_H

/******************************************************************************/
/* System Level #define Macros                                                */
/******************************************************************************/

/* Microcontroller MIPs (FCY) */
#define SYS_FREQ        32768L
#define FCY             SYS_FREQ/4
#define _XTAL_FREQ      SYS_FREQ

/******************************************************************************/
/* System Function Prototypes                                                 */
/******************************************************************************/

void led_configure(void);
void led_on(void);
void led_off(void);
void trigger_LAMP(void);

#endif	/* XC_SYSTEM_H */