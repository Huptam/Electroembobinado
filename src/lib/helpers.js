const bcrypt = require('bcryptjs');
const helpers ={};
helpers.encryptPassword = async(password)=>{
const salt = await bcrypt.genSalt(5);
const hash = await bcrypt.hash(password,salt);
return hash;
}

helpers.matchPassword = async(password,savepassword)=>{
    try {
       return await bcrypt.compare(password,savepassword);
    } catch (e) {
        console.log(e);
        
    }
    

}

module.exports = helpers;