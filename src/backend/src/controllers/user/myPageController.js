import db from "../../db";
import path from "path";
import fs from "fs";
import { handelSqlError } from "../../libraries/handleSqlError";
import { fstat } from "fs";

//최근 결제내역
export const payment = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."})
    }
    const payment = {
        "결제명": "Fitboa 정기구독권",
        "결제금액": "27,000",
        "주문일" : "2020-06-11",
        "결제완료": "결제완료",
        "결제코드": "DFJR255647",
    }

    const conn = await db();
    try{
        // const payment = await conn.query(`CALL payment(?)`,[]);
        // res.status(200).json(payment)
        res.status(200).json(payment);
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text})
        }
        else res.status(400).json({message: "잠시후 다시 시도해주세요."})
    }finally{
        conn.release();
        return;
    }
}

export const paymentDetail = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."})
    }
    const paymentNumber = req.query.paymentNumber ? req.query.paymentNumber : null;

    const payInfo = {
        "결제명":"Fitboa정기 구독권",
        "주문자 정보":{
            "이름":"홍길동",
            "휴대폰 번호": "010-1234-5678"
        },
        "결제 정보":{
            "결제 금액":"50,000",
            "총 할인금액":"-5,000",
            "최종 결제 금액":"45,000",
        },
        "취소 사유":{
            "Number":1,
            "Other": "기상청은 낮에는 봄처럼 온화한 날씨가 예상되나 구름이 많고 날씨가 예상되나 구름이 많고 날씨가",
        },

    };
    const conn = await db();
    try{
        // const paymentDetail = await conn.query(`CALL paymentDetail(?)`,[t]);
        // res.status(200).json(paymentDetail);
        res.status(200).json(payInfo);

    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
        else res.status(400).json({message:"잠시후 다시 시도해주세요."});
    }finally{
        conn.release();
        return;
    }
}

export const editAuth = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."})
    }
    const UserId = req.session.user ? req.session.user.Id : null;
    const Password = req.body.Password ?? null;

    const conn = await db();
    try{
        const auth = await conn.query(`CALL User_Login(?,?)`,[UserId, Password]); 
        res.status(200).json("success");
        // req.session.editAuth = true;
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
        else res.status(400).json({message:"잠시후 다시 시도해주세요."});
    }finally{
        conn.release();
        return;
    }
}

export const editUser = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."})
    }
    const {
        Password, NextPassword, Contact, Address, EmailTerm, SMSTerm
    } = req.body
    const UserId = req.session.user ? req.session.user.Id : null;

    const conn = await db();

    try{
        //const edit = conn.query(`CALL editUser(?,?,?,?,?,?)`,[Password, NextPassword, Contact, Address, EmailTerm, SMSTerm])
        res.status(200).json("success");
        req.session.user.editAuth ? req.session.user.editAuth = false : req.session.user.editAuth ;
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
        else res.status(400).json({message:"잠시후 다시 시도해주세요."});
    }finally{
        conn.release();
        return;
    }
}

export const withdrawal = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});
    }
    const {
        Reason, ReasonDetail, ConfirmPassword
    } = req.body;

    if(!Reason | !ReasonDetail ){
        return res.status(400).json({message:"항목을 모두 입력해주세요."});
    }    
    if(!ConfirmPassword){
        return res.status(400).json({message:"패스워드를 입력해주세요."});
    }

    const conn = await db();
    try{
        // const drawal = conn.query(`CALL drawal(?,?,?)`,[UserName, Password, Reason, ReasonDetail])
        res.status(200).json("고객님! \n탈퇴를 하시더라도 다음 결제일 이전까지 서비스를 사용하실 수 있습니다. \n더욱 더 안정된 서비스로 돌아올 수 있도록 하겠습니다.")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text})
        }
        else res.status(400).json({message:"잠시후 다시 시도해주세요."})
    }finally{
        conn.release();
        return;
    }
}

export const myCards = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});          
    }
    const UserName = req.session.user ? req.session.user.Id : null;
    const cards = {
        "등록일":"2021.05.01",
        "현황":"사용",
        "카드사":"현대카드",
        "카드번호":"9440********2592",
    }
    const conn = await db();

    try{
        // const cards = await conn.query(`CALL cards(?)`,[UserName]);
        // res.status(200).json(cards[0][0])
        res.status(200).json(cards)
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

export const registerCard = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }
    const {
        CardNumber, Expiredate, Birthday
    } = req.body;

    if(!CardNumber | !Expiredate | !Birthday){
        return res.status("항목을 모두 입력해주세요.");
    }

    const conn = await db();

    try{
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

export const deleteCard = async (req,res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }    

    const conn = await db();

    try{
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

export const getStylingReviews = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }

    const userId = req.session.user ? req.session.user.Id : null;

    const conn = await db();
    try{
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}
export const getMyReviews = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요한 서비스입니다."});
    }
    const page = isNaN(req.query.page) === false ? req.query.page : 1;
    const userId = req.session.user.Id
    const conn = await db();
    try{
        const reviews = await conn.query(`CALL Get_Reviews(?,?,?)`,[userId, typeof(page) === "number" ? page : Number(page), true])
        delete reviews[1].meta;
        let myDatas = [];
        const reviewData = reviews[1];
        
        console.log(reviews);

        for(let i = 0; i < reviewData.length ; i++){
            let state = true;
            let tempData = {};
            tempData = reviewData[i];
            tempData.Images = [reviewData[i].Image];
            delete tempData.Image
            for(let j = 0 ;j< myDatas.length; j++){
                if(myDatas[j].ReviewId === tempData.ReviewId){
                    myDatas[j].Images.push(tempData.Images[0]);
                    state = false;
                    break;
                }
            }
            if(state){
                myDatas.push(tempData);
            }
        }
        myDatas.forEach(data=> {
            if(data.Images[0] === null){
                data.Images = [];
            }
        })
        
        res.status(200).json({"contents":myDatas, "itemCount":reviews[0][0]});
        //이미지 작업
    }catch(err){
        console.log(err);
        if(handelSqlError(err)){
            res.status(400).json({message:err.text})
        }
        else res.status(400).json({message:"잠시후 다시 시도해주세요."})
    }finally{
        conn.release();
        return;
    }
}

export const postStylingReview = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }

    const userId = req.session.user ? req.session.user.Id : null;
    const {
        Star, Content
    } = req.body;
    const conn = await db();
    try{
        // const review = conn.query(`CALL Post_Review(?,?)`,[Star, Content]);
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

export const getBookmarks = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }

    const userId = req.session.user ? req.session.user.Id : null;
    const conn = await db();
    try{
        const bookmark = await conn.query(`CALL Get_Bookmarks(?)`,[userId]);
        delete bookmark[0].meta;
        const data = bookmark[0];
        
        const groupBy = (items, key) => Object.values(items.reduce(
            (result, item) => ({
                ...result,
                    [item[key]]: [
                        ...(result[item[key]] || []),
                        item,
                ],
            }),
            {},
        ));
        const sortBookmark = groupBy(data, 'Date');
        console.log();
        res.status(200).json(sortBookmark)
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

async function cleanFile(file) {
    fs.unlink(file, (err) => {
        if(err){
            console.log("ERROR : ",err);
        }
    })
}

export const deleteReview = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }
    const UserId = req.session.user ? req.session.user.Id : null;
    const ReviewId = req.body.ReviewId ?? null

    console.log("asdsad", ReviewId);
    if(ReviewId === null){
        return res.status(400).json({message:"잠시후 다시 시도해주세요."})
    }
    
    const conn = await db();
    try{
        const review = await conn.query(`CALL Delete_Review(?,?)`,[UserId, ReviewId]);
        delete review[0].meta;
        const data = review[0];
        console.log("Length : ", data.length);
        for(let i = 0 ; i < data.length ; i ++){
            // console.l÷og(data[i])
            if(data[i].FileName){
                let fileDir = path.join(__dirname, `../../../userUploads/review/${data[i].FileName}`);
                try{
                    await cleanFile(fileDir);
                    console.log("success FILENAME : ",fileDir,"||", data[i].FileName);
                }catch(fileErr){
                    console.log("FileError :", fileErr);
                }
            }                
            console.log("===========================");
        }
        //fs 파일 직접삭제
        //스케쥴러 사용?
        res.status(200).json("리뷰가 삭제되었습니다.")
    }catch(err){
        console.log(err)
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
        else res.status(400).json({message:"잠시후 다시 시도해주세요."})
    }finally{
        conn.release();
        return;
    }
}

export const getQna = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }

    const userId = req.session.user ? req.session.user.Id : null;
    const conn = await db();
    try{
        // const qnas = conn.query(`CALL bookmark(?)`,[userId]);
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}
export const postQna = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }
    const {
        type,
        Title,
        Content
    } = req.body;

    const userId = req.session.user ? req.session.user.Id : null;
    const conn = await db();
    try{
        // const qna = conn.query(`CALL Post_Qna(?,?,?,?)`,[UserId, Type, Title, Content]);
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

export const faq = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }
    const userId = req.session.user ? req.session.user.Id : null;
    const conn = await db();
    try{
        // const qna = conn.query(`CALL Get_Faq`);
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

export const notice = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});   
    }
    const conn = await db();
    try{
        // const notice = conn.query(`CALL Get_Notice`);
        res.status(200).json("success")
    }catch(err){
        if(handelSqlError(err)){
            res.status(400).json({message:err.text});
        }
    }finally{
        conn.release();
        return;
    }
}

export const getScrap = async (req, res) => {
    if(!req.session.user){
        return res.status(400).json({message:"로그인이 필요합니다."});
    }
    const userId = req.session.user ? req.session.user.Id : null;


}