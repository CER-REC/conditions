# Download Popup

A window in the center of the screen used for downloading data or screenshots.

## Image Download

The Image Download Modal will display a title of "Image Download". The center of the Modal window will display a grey box to be filled with the screenshot of the view. The bottom left of the modal will have a link for the user to save the image with the following copy: "Save Image".
The View screenshot will have a title describing the view, and a footer will consist of a website link with the following copy "Visit this interactive visualization: *link*", and a NEB watermark on the bottom right.
The current view will fit the full width of the grey area and the height will adjust according to the size of the screenshot. The title will be displayed at the top and at the bottom will display a link to the visualization on the left and on the right, the NEB logo.

## Data Download

The Data Download Modal will display a title of "Data Download". The center of the Modal window will have the following copy: "The data used to create this visualization is open data available for you to download. Click the icon to save the data file to your computer.".
Below the copy there will be a download icon and the name of the file below the icon.

## Typography

All of the copy on the base modal will be in uppercase.
The title of the view screenshot will be in uppercase.
Link copy is grey in color.

## Interaction Requirements

Clicking on the "Save Image" or the Icon for Data Download should save a file.
Clicking the "X" in the top right corner of the modal should close the Modal.

## Accessibility Requirements

(Manual Tests)
Tabbing should stay in the dialog window.
Closing dialog should return focus back to the previously active element.
Closing dialog with escape key.
