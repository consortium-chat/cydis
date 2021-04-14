import { ENOENT } from "constants";
import fs from "fs";
let TheValue;
const DBFN = "terrible_db.json";
try {
    TheValue = JSON.parse(fs.readFileSync(DBFN));
} catch (error) {
    if (error.code == ENOENT)
    {
        TheValue = 0;
        fs.writeFileSync(DBFN, JSON.stringify(TheValue));
    } else {
        throw error;
    }
}

export function get() {
    return TheValue;
}

export function set(value) {
    TheValue = value;
    fs.writeFile(DBFN, JSON.stringify(TheValue), function(){});
}