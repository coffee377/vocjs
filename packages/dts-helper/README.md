# TypeScript 类型声明工具

### API

```js
const dts = require('dts-helper');

dts.emit(opts)
```

### CLI

```shell script
Usage: dts [options]

Options:
  -V, --version                  output the version number
  -d, --out-dir <directory>      emit output declaration file to the specified directory
  -f, --out-file [file]          concatenate and emit output to single file. (default: false)
  -E, --noEmit                   do not emit output (default: false)
  -C, --no-comment               do not emit comments to output
  -V, --verbose                  display detailed log information (default: false)
  -i, --include <items>          specifies the file to include (default: [])
  -e, --exclude <items>          specifies the file to exclude (default: [])
  -L, --line-break <CRLF|CR|LF>  sets the paragraph newline character
  -I, --indent <TAB|SPACE>[NUM]  sets the line indent,eg TAB(or TAB1)
  -h, --help                     display help for command
```
