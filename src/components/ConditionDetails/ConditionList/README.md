# ConditionList

This component displays a list of instrument headings and colored bars representing conditions.

- Uses the public List component
- Each condition is represented by a BarContainer component, whose length corresponds to the length of the condition text. (Binned into short, medium, and long)
- Conditions are coloured according to the currently selected feature, and can have more than one color - in this case, the bar should be split evenly among them
- Conditions matching the current search keywords should be given a small red "tab" at one end
- Conditions are grouped by Instrument and sorted within their instrument in their original order
- Instruments are sorted by their effective date from earliest to latest
- Each new instrument is denoted in the list by its effective date; this date can be clicked to get detailed information about the instrument

## Interaction Requirements

- Should allow all items to be selected
