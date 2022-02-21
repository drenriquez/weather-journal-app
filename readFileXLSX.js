
const readXlsxFile = require('read-excel-file/node');
// File path.
let Patients=[];
let Nodules=[];
readXlsxFile('HSR.xlsx').then((rows) => {
    
    console.log(rows.length)
    for(let i=1;i<rows.length;i++){
        
        if(rows[i][0]==null){
            rows[i][0]=rows[i-1][0]
        }
        else{
            Patients.push(rows[i][0]);
            Nodules.push(rows[i]);
        }
    }
    // console.log(rows);
    // console.log(Patients);
  
   console.log(Nodules);
});
console.log(Patients);