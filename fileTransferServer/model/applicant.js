const path = require('path');
const fs = require('fs');
const p=path.join(path.dirname(process.mainModule.filename),"data","applicants.json");

module.exports=class Applicant{
    constructor(firstName,lastName,dob,gender,email,phoneNumber,city,address,pincode,passoutYear,primarySkill,policyAgree){
        this.firstName=firstName;
        this.lastName=lastName;
        this.dob=dob;
        this.gender=gender;
        this.email=email;
        this.phoneNumber=phoneNumber;
        this.city=city;
        this.address=address;
        this.pincode=pincode;
        this.passoutYear=passoutYear;
        this.primarySkill=primarySkill;
        this.policyAgree=policyAgree;
    }
    save(){
        fs.readFile(p,(err,fileContent)=>{
            let applicants=[];
            if(!err){
                applicants=JSON.parse(fileContent);
            }
            applicants.push(this);
            fs.writeFileSync(p,JSON.stringify(applicants));
        })
       
    }
    static fetchAll(cb){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
               cb([]);
            }
            cb(JSON.stringify(fileContent));
        });
    }
}
