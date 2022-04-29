const format = (value) => {
    console.log("value ",value)
    if (value === "(…)" || value === "[Unit]"){
        return null
    }else {
        return value
    }
};

export default format;