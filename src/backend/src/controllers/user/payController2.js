// import db from "../../db";
// import payConfig from "../../config/payConfig.json";
// import { handelSqlError } from "../../libraries/handleSqlError";
// import axios from "axios";
// import crypto from "crypto";
// import {v1} from "uuid"
// import dayjs from "dayjs";
// import requestIp from "request-ip";


//예전 소스들

/*
export const postInicis = async (req, res) => {
    const {
        resultcode,resultmsg,cardcd,billkey,mid,tid,authkey,orderid,cardno,
        merchantreserved,p_noti,data1,cardkind,pgauthdate,pgauthtime,CheckFlag
    } = req.body;

    console.log("쌩 ORDER ID : ", orderid);
    const customOrderId = orderid.split("-")
    console.log("customOrderId Length : ",customOrderId.length,"\n");
    console.log("0 : ",customOrderId[0], "1 : ",customOrderId[1], "2 : ", customOrderId[2], "\n");

    console.log(customOrderId[0]);
    const cycleType = customOrderId[0].slice(0,1) === ("y" || "Y") ? 1 : 0;  //연간결제 : true, 월간 결제 :false
    const custom_MId = customOrderId[0].slice(1);

    const custom_UId = Number(customOrderId[1].slice(1));
    const orderUserId = customOrderId[1];

    const userId = req.session.user ? req.session.user.Id : null;
    
    if(resultcode === "00"){
        const conn = await db();
        const customOrderId = orderid.split('-')
        if (conn)
        {
            try {
                const card = await conn.query(
                  `CALL Set_Billing_Key(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                  [
                    userId ? userId : custom_UId,
                    resultcode,
                    resultmsg,
                    pgauthdate + pgauthtime,
                    tid,
                    mid,
                    custom_UId,
                    billkey,
                    authkey,
                    cardcd,
                    cardno,
                    cardkind,
                    CheckFlag,
                    data1,
                    merchantreserved,
                  ]
                );
                const CardId = card[0][0].CardId;
                console.log(orderid);
                try{
                    const getBilling = await conn.query(
                      `CALL Get_Billing_Key(?,?)`,
                      [custom_UId, CardId]
                    );
                    console.log(getBilling[0][0]);
                    try{
                        const moid = v1();
                        const time = dayjs().format("YYYYMMDDhhmmss");
                        let ip = requestIp.getClientIp(req);
                        ip = ip.substring(7);
                        const params = {
                          INIAPIKey: payConfig.INIAPIKey,
                          url: payConfig.HOME_URL,
                          type: payConfig.TYPE,
                          paymethod: "Card",
                          timestamp: time,
                          clientIp: ip,
                          orderid: moid,
                          price: "1000",
                          mid: getBilling[0][0].MId, //값 바뀜 X
                          billkey: getBilling[0][0].BillKey, //값 바뀜 X
                          goodName: "test02",
                          buyerName: getBilling[0][0].UserName,
                          buyerEmail: getBilling[0][0].Username,
                          buyerTel: getBilling[0][0].UserContact,
                          authentification: "00",
                        };
                        const data = payConfig.INIAPIKey +params.type +params.paymethod +params.timestamp 
                        +params.clientIp +params.mid +params.orderid +params.price +params.billkey;
                        const hashData = crypto.createHash("sha512").update(data).digest("hex");
                        const fetchRes = await axios({
                          url: "https://iniapi.inicis.com/api/v1/billing",
                          method: "POST",
                          headers: {
                            "Content-type":
                              "application/x-www-form-urlencoded;charset=utf-8",
                          },
                          params: {
                            type: params.type,
                            paymethod: params.paymethod,
                            timestamp: params.timestamp,
                            clientIp: ip,
                            mid: params.mid,
                            url: params.url,
                            moid: params.orderid,
                            goodName: params.goodName,
                            buyerName: params.buyerName,
                            buyerEmail: params.buyerEmail,
                            buyerTel: params.buyerTel,
                            price: params.price,
                            billKey: params.billkey,
                            authentification: params.authentification,
                            hashData: hashData,
                          },
                        });
                        console.log(fetchRes.data);
                        
                        if(fetchRes.data.resultCode === "00"){
                            try {
                                const savePay = await conn.query(
                                  `CALL Set_Billing(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                                  [
                                    custom_UId, //userId
                                    params.buyerName,
                                    params.buyerTel,
                                    params.buyerEmail,
                                    CardId,
                                    fetchRes.data.resultCode,
                                    fetchRes.data.resultMsg,
                                    String(
                                      fetchRes.data.payDate +
                                        fetchRes.data.payTime
                                    ),
                                    fetchRes.data.payAuthCode,
                                    fetchRes.data.tid,
                                    fetchRes.data.price,
                                    fetchRes.data.cardCode,
                                    fetchRes.data.cardQuota,
                                    fetchRes.data.checkFlg,
                                    fetchRes.data.prtcCode,
                                    moid,
                                    1, //product ID, month, year
                                    0, //type Month : 0 Year : 1
                                  ]
                                );
                                console.log("Success pay");
                                conn.release();
                                return res.status(200).json({message:"결제가 성공적으로 이루어졌습니다.",});
                            } catch (saveErr) {
                                conn.release();
                                console.log("저장중 에러발생", saveErr);
                                if (handelSqlError(err)) {
                                  res.status(400).json({ message: err.text });
                                } else return res.status(400).json({message: "저장중 에러발생 : saveErr",});
                            }
                        }else{
                            console.log("fetchRes ERR", fetchRes.data.resultMsg);
                            return res.status(400).json({message:fetchRes.data.resultMsg})
                        }
                    }catch(fetchErr){
                        console.log("fetchErr : 106", fetchErr);
                        conn.release();
                        return res.status(400).json({message:"결제에 실패했습니다."});
                    }                    
                }catch(err){
                    console.log("err 0101", err);
                    conn.release();
                    if(handelSqlError(err)){
                        return res.status(400).json({message:err.text});
                    }
                    else return res.status(400).json({message:err.text})
                }
            } catch(err) {
                console.log(err);
                if(handelSqlError(err)){
                    res.status(400).json({message:err.text});
                }
                else res.status(400).json({message:"잠시후 다시 시도해주세요."});
                return;
            } finally {
                conn.release();
            }
        }
    }
    return;
}*/


/*


const fetchVilling = async (req, res) => {

    const moid = req.body.orderid;
    const time = dayjs().format('YYYYMMDDhhmmss');
    let ip = requestIp.getClientIp(req);
    ip = ip.substring(7);
    const billing = req.body.billing;

    const data = payConfig.INIAPIKey + params.type + "Card"
    +time + billing.mid + moid+ "1000"
    +billing.billKey;
    const hashData = crypto.createHash('sha512').update(data).digest('hex');

    const params = {
        "INIAPIKey":payConfig.INIAPIKey, 
        "url":payConfig.HOME_URL,      //값 바뀜 ㅇㅋ
        "type":"Billing",                   
        "paymethod":"Card",                 //값 바뀜 ㅇㅋ
        "timestamp" : time,//값 바뀜 ㅇㅋ Length값 바뀌면 안됨
        "clientIp" : "15.165.48.193",       //값 바뀜 ㅇㅋ
        "orderid":moid,               //값 바뀜 ㅇㅋ
        "price": "1000",                      //값 바뀜 ㅇㅋ
        "mid" : billing.MId,                  //값 바뀜 X
        "billkey" : billing.BillKey,          //값 바뀜 X
        "goodName" :"test02",                //값 바뀜 ㅇㅋ
        "buyerName":billing.UserName,             //값 바뀜 ㅇㅋ
        "buyerEmail":billing.Username,        //값 바뀜 ㅇㅋ
        "buyerTel":billing.UserContact,         //값 바뀜 ㅇㅋ
        "authentification":"00",
        hashData:hashData
    }

    const fetchRes = await axios({
        url:payConfig.BILLING_V1,
        method:'POST',
        headers:{
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        params:params
    })
    console.log("fetchVilling fetchRes",fetchRes.data);
    cancelData = INIAPIKey + "Billing" + "Card" + time + ip + billing.MId + billing.TId;
    cancelHash = crypto.createHash('sha512').update(cancelData).digest('hex');

    try{
        const savePay = await conn.query(`CALL Set_Billing(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
            userId,
            params.buyerName,
            params.buyerTel,
            params.buyerEmail,
            CardId,
            fetchRes.data.resultCode,
            fetchRes.data.resultMsg,
            String(fetchRes.data.payDate+fetchRes.data.payTime),
            fetchRes.data.payAuthCode,
            fetchRes.data.tid,
            fetchRes.data.price,
            fetchRes.data.cardCode,
            fetchRes.data.cardQuota,
            fetchRes.data.checkFlg,
            fetchRes.data.prtcCode,
            moid,
            1,//productId,
            0,//type,
            promotionCode ? promotionCode : null,
        ])
        console.log("Success Pay", savePay);
        return (fetchRes.data, savePay);
    }catch(err){
        const cancel = await axios({
            url,
            method:'POST',
            headers:{
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            params:{
                type:"Billing",
                paymethod:"Card",
                timestamp:time,
                clientIp:ip,
                mid:billing.MId,
                tid:billing.TId,
                msg:"결제 DB저장 실패",
                cancelHash
            }
        })
        console.log("FetchVilling Cancel",cancel.data);
        if(cancel.data.resultCode){
            return res.status(400).json({message:"결제에 실패했습니다."+cancel.data.resultMsg})
        }
        return res.status(400).json({message:"결제에 실패했습니다."})
    }
}
*/

/*
const getBillingKey = async(req,res) => {
  const CardId = req.body.CardId ? req.body.CardId : null;
  const userId = req.session.user ? req.session.user.Id : null;
  const {
      resultcode,resultmsg,cardcd,billkey,mid,tid,authkey,orderid,cardno,
      merchantreserved,p_noti,data1,cardkind,pgauthdate,pgauthtime,CheckFlag
  } = req.body;
  const customOrderId = orderid.split('-');
  try{
      const conn = await db();
      const getBilling = await conn.query(`CALL Get_Billing_Key(?,?)`,[userId ? userId : customOrderId[1], CardId])
      conn.release();
      return getBilling[0][0];
  }catch(err){
      console.log("ERROR : getBillingKey");
      conn.release();
      return false;
  }
}

*/