import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import {readFile, writeFile} from 'fs';
import { EntryPointDTO } from 'src/dtos/entry.dto';
@Injectable()
export class PersistanceService {
    filePath: string = 'src/mock/db.json';
    constructor() {}

    readData(): EntryPointDTO[] {
        let json = readFileSync(this.filePath,"utf8");
        return json ===""?[]:JSON.parse(json);
    }

    addData(data:EntryPointDTO) {
        var db = this.readData();
        db.push(data);
        var newData = JSON.stringify(db, null, 2);
        writeFile(this.filePath, newData, (err) => {
            // Error checking
            if (err) throw err;
            console.log("New data added");
          });
    }
    deleteData(request:{id:string}) {
        var db = this.readData();
        const toRemove = db.findIndex( (d)=> d.id === request.id);
        if(toRemove!=null && toRemove!=undefined)
            db.splice(toRemove, 1);
        var newData = JSON.stringify(db, null, 2);
        writeFile(this.filePath, newData, (err) => {
            // Error checking
            if (err) throw err;
            console.log("New data added");
          });
    }

    checkId(data:EntryPointDTO): boolean {
        var db = this.readData();
         return db.find(item =>{ return item.id=== data.id}) === undefined;
    }

}