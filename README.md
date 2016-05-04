# exp-jadebot
Experience Jadebot is my attempt at learning and implementing Machine learning and/or Neural Networks in simple ways

## Objective
_Coming soon..._

## Implementation

Using ```template.js``` for template recognition.
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
And then your results will have the following information avialable.
```
results = {
    'input': 'string',
    'templateId': 0,
    'template': 'string',
    'isMatch': true,
    'confidence': 0.93
}
```

## License
The MIT License

## Version History

**version 0.1.0**
* Factory function implementation
* Better modular code on botAPI and template.js
* Basic test integration between botAPI and template.js

**version 0.0.4**
* Initial commit of code
* Creation of folder structure
* Set up of package.json
