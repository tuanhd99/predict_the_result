const moment = require("moment");
function checkUserLogin(lastLogin) {
    const now = new Date();  // Thời gian hiện tại
    const isSameDay = moment(lastLogin).isSame(now, 'day');
  
    if (!isSameDay) {
      console.log('Đây là lần đăng nhập đầu tiên trong ngày hôm nay!');
      return true;
    } else {
      console.log('Người dùng đã đăng nhập hôm nay rồi.');
      return false;
    }};

    module.exports = {checkUserLogin}