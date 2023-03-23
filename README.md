# Regulax 

![npm (scoped)](https://img.shields.io/npm/v/@octopixell/regulax?color=success) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/octopixell/regulax/release.yml) ![Codecov](https://img.shields.io/codecov/c/gh/octopixell/regulax) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/octopixell/regulax) ![GitHub](https://img.shields.io/github/license/octopixell/regulax)

An easier and more relaxed way of working with regular expressions for pattern matching!

A special thanks to [nadav-dav](https://github.com/nadav-dav) for creating [EasyPattern](https://github.com/nadav-dav/EasyPattern) which is the basis for Regulax. This package was created to allow for code changes and a maintainable rewrite to TypeScript.

---

## Installation

Simply run the following command in a terminal of your choosing:

```
npm install @octopixell/regulax
```

## Example usage

Somne examples of what Regulax can do for you

### Basic testing

```ts
import { Regulax } from '@octopixell/regulax';

const pattern = new Regulax('{filename}.js');

pattern.test('your-file.pfd'); // false
pattern.test('another-file.js'); // true
```

### Basic matching 

```ts
import { Regulax } from '@octopixell/regulax';

const pattern = new Regulax('{directory}/{filename}.js');
const result = pattern.match('root/index.js');

// result:
{ 
  directory: 'root', 
  filename: 'index.js' 
}
```

### Wildcard matching

```ts
import { Regulax } from '@octopixell/regulax';

const pattern = new Regulax('*.{extension}');
const result = pattern.match('/root/lib/file.exe');

// result:
{ 
  extension: 'exe'
}
```

### Advanced matching

```ts
import { Regulax } from '@octopixell/regulax';

const pattern = new Regulax('{*}/{filename}?{*}');
const result = pattern.match('www.site.com/home/hello.js?p=1');

// result:
{ 
  1: 'www.site.com/home', 
  2: 'p=1', 
  filename: 'hello.js'
}
```

```ts
import { Regulax } from '@octopixell/regulax';

const pattern = new Regulax('{event} tomorrow at {time} for {duration}');
const result = pattern.match('UI/UX Meeting tomorrow at 4pm for 30 minutes');

// result:
{ 
  event: 'UI/UX Meeting',
  time: '4pm',
  duration: '30 minutes'
}
```