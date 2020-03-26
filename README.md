# Now Portal Performance Checker
This script will place a Run Page Performance button the portal page.

It will highlight all the Widgets on the page (with a red border), add Hyperlinks to the Widget for editing and printing it's scope to browser console.

Most importantly running the page performance check will go through every widget adn record the TTFB (Time to first byte) for each widget.

This TTFB gives tells which widgets are slowing the intial page load, and allows us to target the offending widgets with performance enhancements.


## How to use

1. Copy the script called `widget-performance.js` to your clipboard.
2. Load the portal page you wish to run the performance on.
3. Open the browser console, and paste the script into the console, hit `enter`.
4. This action will add a *RUN PAGE PERFORMANCE* button to the bottom left of the page.
5. Clicking this button will execute the performance check on every widget on the page, and display the results on each widget.

## Bonus features
Clicking the clock icon next to a load time result, will perform another performance test on that specific widget.

You can use the browsers `Network` console to view the TTFB recorded. You can perform this action as many times as you like.

The reason for this is because you may want to test the load time of the widget if it's in a different state.

## Thank you's!
I would like to thank `jtandy13` as I use his code to perform record the results. I will be looking to add my enhancements to his Chrome browser extension which you can find here: [SNKit](https://github.com/jtandy13/SNKit)