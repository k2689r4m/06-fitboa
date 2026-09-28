import multer from "multer";
import sharp from "sharp";
import db from "./db";
import schedule from "node-schedule";
import dayjs from "dayjs";

export const sessionMiddleware = (req, res, next) => {
    // console.log("Middleware");
    
    // if(req.session){
    //     console.log(req.session);
    // }
    // console.log("END MIDDLEWARE");
    next();
}

export const userFormUploads = multer({
    dest:"userUploads/form/",
    limits: {
        files:5,
        // fileSize: 524288, // 5 Mb
    },
    onError : (err, next) => {
        console.log('error');
        next(err);
    }
})

export const pernsalStylingReview = multer({
    dest:"userUploads/review/",
    limits: {
        files:5,
        // fileSize: 524288, // 5 Mb
    },
    onError : (err, next) => {
        console.log('error');
        next(err);
    }
})

export const adminUpload = multer({ 
    dest: "uploads/"
});

export const isLogin = (req, res, next) => {
    if(!req.session.user){
        res.status(400).json({message:"로그인이 필요합니다."})
    }
}

export const imageResizer = async (req, res, next) => {
    const files = req.files;
    //jpg나 png만 퀄리티 리사이징 가능
    const ContentId = req.body.ContentId ? req.body.ContentId : null;
    const conn = await db();
    files.forEach(async (file) => {
        try{
            //Midium save
            sharp(file.path)
            .resize({width:300})
            .jpeg({ quality: 8})
            .png({ quality:8 }) //progressive:true
            .toFile(`midium/${file.filename}_midium`, (err, info) => {
                if(err) throw err
                console.log("info2 : ", info);
            });
            //Small save
            sharp(file.path)
            .jpeg({ quality: 8})
            .png({ quality:8 }) //progressive:true
            .resize({width:220})
            .toFile(`uploads/small/${file.filename}_small`, (err, info) => {
                if(err) throw err
                console.log("info3 : ", info);
            });
            conn.query(`CALL Admin_Post_Content_Image(?,?,?,?)`, [5, file.originalname,file.filename, "uploads"]);
            conn.release();
            next();
        }catch(err){
            console.log("이미지 리사이징 에러 : ",err);
            conn.release();
            res.status(400).json({message:"이미지 업로드에 실패했습니다."});            
        }
    });
    
}

export const isAdmin = (req, res, next) => {
    if(req.session.adminLoggedIn === true){
        next();
    }else{
        return res.status(400).json("접근 권한이 없습니다.");
    }
}
export const handelRequestDeny = (req, res, next) =>{
    const allowedMethods = ["GET", "POST"];
    if(!allowedMethods.includes(req.method)){
        console.log("Middleware! Deny Anything except GET or POST")
        res.status(405).json("비정상적인 접근입니다.");
    }
    return next();
}

export const traceMiddleware = ('/', (req, res, next) => {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(':');
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2); 
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2); 

    let dateString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
    let params = '';
    if (req.method === 'GET') {
        Object.keys(req.query).forEach((key, index) => {
            if (index === 0) params += `${key}: ${req.query[key]}`;
            else params += `, ${key}: ${req.query[key]}`;
        })
    }
    else if (req.method === 'POST') {
        Object.keys(req.body).forEach((key, index) => {
            if (index === 0) params += `${key}: ${req.body[key]}`;
            else params += `, ${key}: ${req.body[key]}`;
        })
    }
    else {
        console.log(`[${dateString}] ip: ${ip[ip.length - 1]}, route: ${req.originalUrl}, unexpected method: ${req.method}`);
        res.status(403).json({ code: 403, message: `unexpected method: ${req.method}` });
        return;
    }

    console.log(`[${dateString}] ip: ${ip[ip.length - 1]}, route: ${req.originalUrl}, method: ${req.method}, params: { ${params} }`);
    next();
});

// export const scheduler = schedule.scheduleJob('30 */2 * * * *', () => {
//     const time = dayjs().format('YYYYMMDDhhmmss');
//     console.log("스케쥴러 테스트 현재 시간 : ",time);
//     return;
// })