const {createOrderItme,createOrderTabel,productDetailTabel,createTabel , invenTory} = require("../Query/query.js")
const db = require("../../database/database.js")
const constant = require("../../utils/constant.js")

const createTabelQuery = (req,res)=>{
    db.pool.query(createOrderItme,(err,result)=>{
        if(err){
            console.log(`error while creating tabel => ${err.message}`);
            return res.status(500).json({msg :constant.TABEL_CREATED_ERROR ,success:false})
        }else{
            console.log(result.rows);
            return res.status(200).json({msg :constant.TABEL_CREATED ,success:true})
        }
    })
}

module.exports = createTabelQuery