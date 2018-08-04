# bParticles
SUPER Lightweight, 0 dependancies Javascript Particle library that I developed to add subtle particle detail to projects, creating a **more dynamic experience** for users, on pages that risk being boring and disengaging.

## DEMO
An example of this Particle library can be found at http://lucasbowers.com/bparticles/
<a href="http://dev.lucasbowers.com/bparticles/" target="_blank"><img src="https://i.gyazo.com/96541b127651ca62ed5560443aba58db.gif" alt="Live demo page" /></a>
(The above image is a GIF. Click it for a full quality example)

## Usage
Download the `bParticles.js` file to your project folder, then import it as shown below...
```html
<script src="bParticles.js">
{
  "fps": 30,
  "container": "#myDiv",
  "amount": 25,

  "size":{
    "min": 2,
    "max": 30
  },

  "speed":{
    "min": 2,
    "max": 10
  },

  "style":{
    "backgroundColor": "#111",
    "fill":{
      "color": "#66FF00",
      "opacity": "0.8"
    }
  }
}
</script>
```
This is simply a standard <script> import, with the particle configuration (explained below) within it.

### Options
Within the <script> tags body, the particles can be configured.  The configuration options have been outlined below, and an example can be seen above.

Key | Type | Notes
----|------|------
`fps`|integer|30fps is perfectly acceptable in terms of smoothness and CPU stress.
`container`|DOM element selector (String)|Specify which element the particles should be contained within.
`amount`|integer|The amount of particles that should be alive at any single time
`size.min`|integer|Minimum size of the particles (make same as size.max for standard sized particles).
`size.max`|integer|Maximum size of the particles (make same as size.min for standard sized particles).
`speed.min`|integer|Minimum speed of the particles (make same as speed.max to make all particles move at the same speed).
`speed.max`|integer|Maximum speed of the particles (make same as speed.min to make all particles move at the same speed).
`style.backgroundColor`|string|CSS Color String to specify background color of particle container (blank for transparent background).
`style.fill.color`|string|CSS Color String to specify color of the particles.
`style.fill.opacity`|number|Decimal value between 0 (invisible), 1 (solid) to specify the opacity of the particles.
