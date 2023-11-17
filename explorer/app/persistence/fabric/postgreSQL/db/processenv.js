"use strict";
//  SPDX-License-Identifier: Apache-2.0
const fs = require('fs');
const data = JSON.stringify(process.env);
fs.writeFileSync('/tmp/process.env.json', data);
//# sourceMappingURL=processenv.js.map