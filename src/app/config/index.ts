import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") }); // .env file ke ai path e giye read korbe => /Volumes/PROGRAMMING/Programing_Hero/LavelTwo/Assignment_All/assignment_four/car_washing_booking_system/.env

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_secret_expire_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret_expire_in: process.env.JWT_REFRESH_EXPIRES_IN,
  img_bb_api_key: process.env.IMG_BB_API_KEY ,
  payment_url: process.env.PAYMENT_URL,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  verify_payment_url: process.env.VERIRY_PAYMENT_URL
};
