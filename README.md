![DotMH.dev](https://content.dotmh.io/dev/dev.svg)

# DotMH Tick.

DotMH Tick is designed for making polling loops when needed easier. 

# Installation 

```bash
npm i @dotmh/tick
```

## Usage

To use Tick you first have to require it. 

```Javascript
const Tick = require('@dotmh/tick')
```

Then create a new instance of the class 

```Javascript
const tick = new Tick();
```

Then set up tick 

```Javascript
tick.every('2ms').start(() => console.log('hello world'));
```

You can stop the tick with 

```javascript
tick.stop()
```

You can also set a condition which mean the callback will be called if the condition function return true. 

```javascript
tick.every('2s').when(() => true).start(() => console.log('do something'));
```

See [vercel/ms](https://github.com/vercel/ms) to see more about the format for the time string. 