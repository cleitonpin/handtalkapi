"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 3000 || process.env.PORT;
app_1.app.listen(PORT, () => {
    console.log(`⚡ [Server]: running at ${`http://localhost:${PORT}`}`);
});
