# exp-jadebot
Experience Jadebot is my attempt at learning and implementing Machine learning and/or Neural Networks in simple ways

## Objective
_Coming soon..._

## Implementation

For _template.js_ being used as template recognition.
```
let results = {};
let temp = templateMatch({
    'string': inputString, // "string"
    'templates': templatesArray, // [string, string, string]
    'confidence': targetConfidence // 0.75
});

temp.getMatchingTemplate();
results = temp.getResults();
```

## Version History

**version 0.1.0**
* Factory function implementation
* Better modular code on botAPI and template.js
* Basic test integration between botAPI and template.js

**version 0.0.4**
* Initial commit of code
* Creation of folder structure
* Set up of package.json
