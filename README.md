# bParticles
SUPER Lightweight, 0 dependancies Javascript Particle library that I developed to add subtle particle detail to projects, creating a **more dynamic experience** for users, on pages that risk being boring and disengaging.

## DEMO
An example of this Particle library can be found at http://dev.lucasbowers.com/bparticles/
<a href="http://dev.lucasbowers.com/bparticles/" target="_blank"><img src="http://dev.lucasbowers.com/bparticles/assets/images/preview.gif" alt="Live demo page" /></a>
(The above image is a GIF. Click it for a full quality example)

## Usage
You will need the `bParticles.js` file downloaded into your project folder, as well as a JSON config file. Import this file into your HTML as follows...
```html
<script src="path/to/bParticles.js"></script>
```

To initialize the particles, you will need to call the main `bParticles()` JS function like so...
```js
bParticles("path/to/bParticles.json", "<id of container>", function(particlesID){
  console.log("bParticles initiliazed with ID #" + particlesID);
});
```

## Options
To customise the particles, you must create a JSON configuration file, an example of which can be found in the project files `bParticles.json`.  The following options are set within this file...

Key | Type | Notes
----|------|------
`fps`|integer|30fps is perfectly acceptable in terms of smoothness and CPU stress.
`amount`|integer|The amount of particles that should be alive at any single time
`size.min`|integer|Minimum size of the particles (make same as size.max for standard sized particles).
`size.max`|integer|Maximum size of the particles (make same as size.min for standard sized particles).
`speed.min`|integer|Minimum speed of the particles (make same as speed.max to make all particles move at the same speed).
`speed.max`|integer|Maximum speed of the particles (make same as speed.min to make all particles move at the same speed).
`style.backgroundColor`|string|CSS Color String to specify background color of particle container (blank for transparent background).
`style.fill.color`|string|CSS Color String to specify color of the particles.
`style.fill.opacity`|number|Decimal value between 0 (invisible), 1 (solid) to specify the opacity of the particles.
