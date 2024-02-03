const public = {
    sqlKeysReg:/ AND | OR | ORDER BY | UNION | WHERE /i,
    isDanger:function(value){
        let string = "";
        switch (typeof value) {
            case "string":
                string = value;
                break;

            case "object":
                string = Object.values(value).join("");
                break;
        
            default:
                throw new Error("Unknown value type");
                break;
        }
        return public.sqlKeysReg.test(string);
    }

}

module.exports = public;