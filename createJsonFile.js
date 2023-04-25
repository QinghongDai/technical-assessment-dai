const fs=require('fs')

const createJsonFile = (output) => {
    output = JSON.stringify(output, undefined, 4);
    fs.writeFile('./output.json', output, err=>{
        if(err){
            console.log('write file fail');
        } else {
            console.log('write file successful');
        }
    })
}

export default createJsonFile;
