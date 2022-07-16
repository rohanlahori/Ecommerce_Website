class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword
        ?{
            name:{
                $regex: this.queryStr.keyword,
                $options: "i",
                // options small i means this will return whether the key is in uppercase
                // or lowercase
            }
        }
        :{};
        this.query=this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryCpy={...this.queryStr}

        // Remove some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCpy[key]);
        console.log(queryCpy)

        // To add price filter in the query we need to to add $ in mongo db 
        // so to put $ between the query the below command is used

        let queryStr=JSON.stringify(queryCpy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        console.log(queryStr)
        this.query=this.query.find(JSON.parse(queryStr));


        return this;
    }

    pagination(resultsperPage){
        const cur_page=Number(this.queryStr.page || 1);
        const skip=resultsperPage * (cur_page-1);

        this.query=this.query.limit(resultsperPage).skip(skip);

        return this;

    }


}
module.exports=ApiFeatures