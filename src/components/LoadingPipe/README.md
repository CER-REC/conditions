# Loading Pipe

The Loading Pipe will be used as a visual representation that Project data is being loaded. The pipe will consist of "project dots"
that animate along the pipe during the load time.

A protoype of this animation can be found at the following links:
https://app.atomic.io/d/2OeSw9ah0mkF
https://app.atomic.io/d/OwhDxkv7xBrE

NOTE: These prototypes show the animation with a curved pipe and the design no longer uses a curved pipe it is now a straight pipe.

## Design Requirements

- [ ] There are two types of animations: Quick load and slow load.
- [ ] The minimum length of this animation is 2000ms and it should be played through regardless if the data is available for faster loading.
- [ ] If the load time is greater than 2000ms the animation can be repeated for the duration of the time it takes the data to load
- [ ] The reverse of the animation should occur when the Company wheel spin is initiated

## Component Requirements

- [ ] Must accept a property to determine if the app is in a loading state
- [ ] Must display over-top or replace project menu pipelines
