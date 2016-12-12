LED timer

# Design Overview
## Mechanical

To fit within the waterproof housing the timer can be at most a 44mm diameter cylinder of height 15mm.

<img src="mechanical.png">

## Electrical

The unit has a single 2 layer, 40mm diameter PCB.

<a href="buttons.png"><img src="buttons.png" width="400px"></a>

The electrical design files are in the `./eagle` subfolder. The majority of the components have been sourced from [digiKey](http://www.digikey.com/). See [bill\_of\_materials.xlsx](bill_of_materials.xlsx) for details.

<a href="schematic.png"><img src="schematic.png" width="400px"></a>
<a href="pcb.png"><img src="pcb.png" width="200px"></a>

### PCB Manufacture
The circuit boards have been manufactured using [PCBWay](http://www.pcbway.com/).  The steps required to gerber files required by PCBWay are documented in [a blog post](cam_processor/How to generate Gerber from Eagle-SOFTWARE - Share- Hacker - PCBWay.pdf)

TODO: Create a grunt task that automates the process.

Once the .zip archive containing the gerber files has been generated it needs to be uploaded to PCBWay.  The parameters used when submitting an order are [here](cam_processor/pcbway_order_parameters.pdf).

## Software

Software is in the `mplab\LED.X` subfolder.  

#Tools

1. [Cadsoft Eagle PCB Design](https://cadsoft.io/)

   To use the Grunt task the eagle binary will need to be in the [system path](http://www.computerhope.com/issues/ch000549.htm).  For me that meant adding `C:\EAGLE-7.6.0\bin` to the path.
   
1. [Microchip MPLAB X Integrated Development Envrionment (IDE)](http://www.microchip.com/mplab/mplab-x-ide)

1. [MPLAB ICD 3 In-Circuit Debugger](http://www.microchip.com/Developmenttools/ProductDetails.aspx?PartNO=DV164035)

1. [FreeCAD](http://www.freecadweb.org/)
1. [eaglepcb2freecad](https://sourceforge.net/projects/eaglepcb2freecad/?source=typ_redirect)

   A FreeCAD plugin that can import the PCB design from eagle and generate a 3D represenation of the PCB.
      1. Download the [FreeCAD plugin]( https://sourceforge.net/projects/eaglepcb2freecad/?source=typ_redirect)
      1. The .7zachive will need to be extracted. I used the linux tool [dtrx](https://brettcsmith.org/2007/dtrx/)
      1. Follow the instructions within the archive to install the plugin
	  1. eaglepcb2freecad's parts library will need to be configured.  See the [Configuring FreeCAD](#configuring-freecad) section below.

1. [Nodejs](https://nodejs.org/en/)
   Used to download the 3D CAD model libraries used by FreeCAD. 
   
   Download and run the installer. Then at the command prompt:
   ```
   npm install
   ```

2. [Grunt](http://gruntjs.com/getting-started#installing-the-cli)

   Used to automate some tasks.  Not strictly needed if 
   
   ```
   npm install -g grunt-cli
   ```

# Configuring FreeCAD



