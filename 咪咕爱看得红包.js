

auto.waitFor();
var height = device.height;
var width = device.width;
// toastLog("本设备的分辨率为，\n宽："+device.width+"\n长："+device.height);//输出设备的分辨率
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率

红包待解锁 = 0; //设定一个开关，代表今天还有视频红包没有领
会员福利页面标示 = '会员每日福利'
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
  toast("请求截图失败");
  exit();
}
home();
sleep(1000);
SignIn_Miguaikan(); //咪咕爱看签到

function back_home () {
  var num = 0;
  while (1) {
    //因为在auto.js的文件中社区比较独特，其他应用少有，以此作为进入auto的判断
    var auto = text("社区").findOne(200);
    //好像在auto的界面，可以正常启动后续的app
    if (num > 5 || id("workspace").findOne(200)) { //多次后退没有找到auto的界面，那就返回桌面重启
      home();
      sleep(500);
      home();
      var auto桌面 = text("Auto.js").findOne(4000);
      if (auto桌面) {
        auto桌面.click();
        if (auto) { break; }
      }
    } else if (!auto) {
      back();
      num += 1;
      toast("第" + num + "次后退");
    } else {
      break;
    }
  }
  sleep(500);
  return;
}

function image_coor (template_path) {
  var template = images.read(template_path); //模板图片的位置
  var img = captureScreen(); //截取当前图像
  var coor = images.findImage(img, template)
  img.recycle(); // 回收图片
  template.recycle(); // 回收图片
  return coor;
}

function back_to (type, text, time) {
  var num = 0;
  while (1) {
    var object = type(text).findOne(time);
    if (object) {
      toastLog("已经返回到{" + text + "}的内容了,次数为" + num + "次");
      return true;
    } else if (num > 10) {
      toastLog(num + "次返回没有到达指定地点");
      return;
      // exit;
    } else {
      back();
      num += 1;
      // toast("当前后退次数:" + num);
    }
  }
}
// 查找图片后点击
function image_click (path) {
  var p = image_coor(path);
  if (p) {
    click(p.x, p.y);
    return true;
  } else {
    toastLog('没找到' + path);
    return false;
  }
}
function find_click_position (type, text, time, position1, position2) {
  while (1) {
    var object = type(text).findOne(time);
    if (object) {
      var object = object.bounds();
      if (object.centerY() < position1) {
        swipe(540, 800, 540, 1000, 200);
        continue;
      } else if (object.centerY() > position2) {
        swipe(540, 1200, 540, 1000, 200);
        continue;
      } else {
        click(object.centerX(), object.centerY());
        return true;
      }
    } else {
      toast("没有找到" + text + "的目标");
      return false;
    }
  }
}
function find_click (type, text, time) {
  var object = type(text).findOne(time);
  if (object) {
    var object = object.bounds();
    click(object.centerX(), object.centerY());
    return true;
  } else {
    toast("没有找到" + text + "的目标");
    return false;
  }
}

// 循环点击
function loop_find_click (type, text, time, num) {
  for (var i = 0; i < num; i++) {
    toastLog("第" + i + "次查找点击");
    find_click(type, text, time);
    sleep(1000);
  }
  return;
}

function loop_find_click_position (type, text, time, position1, position2, num) {
  var n = 1;
  while (n < num) {
    toastLog("第" + n + "次循环查找点击");
    find_click_position(type, text, time, position1, position2);
    n += 1;
  }
}

function find (type, text, time) {
  var object = type(text).findOne(time);
  if (object) {
    return true;
  } else {
    toast("没有找到" + text + "的目标");
    return false;
  }
}
// 从我的页面进入福利页面
function goToWelfare () {
  find_click(id, "close", 500);
  back_homepage();
  if (find_click(id, 'image5_layout', 4000) || find_click(text, '我的', 1000) || image_click('./images/咪咕爱看-我的.jpg') || click(973, 2245)) {
    while (1) {
      find_click(id, "close", 100);
      var 福利 = textContains("福利").findOne(5000);
      var 福利 = 福利.bounds();
      if (福利.centerY() < 200) {
        swipe(540, 500, 540, 2000, 500);
      } else if (福利.centerY() > 2000) {
        swipe(540, 2000, 540, 500, 500);
      } else {
        click(福利.centerX(), 福利.centerY())
        break;
      }
    }
    var 界面 = text(会员福利页面标示).findOne(10000);
    if (界面) {
      toastLog("咪咕爱看福利界面出现了");
      swipe(540, 2000, 540, 1400, 500);
    } else {
      toastLog("没有福利界面，重启");
      return SignIn_Miguaikan();
    }
  } else {
    toastLog("没有找到我的页面");
    back_home();
    return SignIn_Miguaikan();
  }
  return;
}


function SignIn_Miguaikan () {
  try {
    var appRun = currentActivity();
    if (appRun != "com.wondertek.miguaikan") {
      launch("com.wondertek.miguaikan");
      sleep(1000);
    }
    find_click(id, 'splash_time', 3000);
    find_click(id, 'close', 1000);
    // 进入福利界面
    goToWelfare();

    sleep(1000);
    if (find_click(text, "去观看", 1000)) {
      sleep(1000);
      goToWelfare();
    }
    // 抽奖
    while (1) {
      var 去完成 = text("去完成").findOne(1000);
      if (!去完成) {
        var 去完成 = text("去查看").findOne(100);
      }
      if (去完成) {
        toastLog("有去完成按钮");
        sleep(1000);
        去完成.click();
        var 点击抽奖 = text("点击抽奖").findOne(8000);
        if (点击抽奖) {
          toastLog("点击抽奖");
          sleep(1000);
          var 点击抽奖 = 点击抽奖.bounds();
          click(点击抽奖.centerX(), 点击抽奖.centerY());
          if (textContains("当前剩余抽奖次数 0 次").findOne(2000)) {
            back();
            break;
          }
        }
        back_to(text, 会员福利页面标示, 1000);
        sleep(1000);
      }
    }
    sleep(1000);
    // 分享得流量
    if (find_click(text, '去分享', 2000)) {
      toastLog("有去分享按钮");
      sleep(1000);
      find_click(id, 'act_play_detail_fi_close', 2000);
      sleep(1000);
      if (find_click(text, '分享', 10000)) {
        sleep(1000)
        if (find_click(text,'微信好友',10000)) {
          toastLog("进入微信分享");
          text("创建新聊天").findOne(10000);
          goToWelfare();
        } else {
          return SignIn_Miguaikan();
        }
        sleep(1000);
        back_to(text, 会员福利页面标示, 1000);
      } else {
        toastLog("没有找到分享的选择");
        back_to(text, 会员福利页面标示, 1000);
      }
    }
    sleep(1000);
    // 循环领取奖励
    while (1) {
      if (find_click(text, "领取", 2000) || find_click(text, "X", 1000)) {
        if (find(text, 'X', 5000)) {
          sleep(1000);
          find_click(text, "X", 1000);
          sleep(1000);
        }
        if (!find(text, 会员福利页面标示, 3000)) {
          goToWelfare();
        }
      } else {
        break;
      }
    }
    sleep(1000);
    // 领取话费奖励
    while (1) {
      var 立即领取 = text("立即领取").findOne(1000);
      if (立即领取) {
        toastLog("有奖励领取");
        var 立即领取 = 立即领取.bounds();
        click(立即领取.centerX(), 立即领取.centerY());
        sleep(3000);
        click(540, 1550); //关闭奖励页面
        sleep(1000);
      } else {
        toastLog("没有奖励了");
        break;
      }
    }
    sleep(1000);

    toastLog("待解锁检测");
    var 待解锁 = text("待解锁").findOne(3000);
    if (待解锁) {
      var a = text("待解锁").find();
      toastLog("找到的待解锁数量：" + a.length);
      红包待解锁 = a.length;
    } else {
      toastLog("没有找到未解锁的奖励");
      红包待解锁 = 0;
    }
    sleep(2000);
    //观看视频领红包
    if (红包待解锁 != 0) {
      toastLog("进入看视频环节");
      观看视频领红包();
    }
  } catch (err) {
    toastLog(err);
  } finally {
    back_home();
    return;
  }
}

function back_homepage () {
  // if (!back_to(text, "精选", 800)) {
  //   if (!back_to(textContains, "福利", 800)) {
  //     back_to(text, "我的", 800);
  //   }
  // }
  back_to(id, "image5_layout", 800);
  
  return;
}

function 观看视频领红包 () {
  back_homepage();
  if (find_click(text, '精灵宝可梦XY1', 5000)) {
    sleep(1000);
    if (find(id, 'tv_name', 5000)) {
      toastLog("开始看视频");
      进入视频();
    } else {
      toastLog("未知原因没有进入视频页面");
      return SignIn_Miguaikan();
    }

  } else {
    toastLog("没有找到设定的视频，退出");
    return;
  }
}

function 进入视频 () {
  //今日不再提示
  var 今日不再提示 = text("今日不再提示").findOne(5000);
  if (今日不再提示) {
    var 今日不再提示 = 今日不再提示.bounds();
    click(今日不再提示.centerX(), 今日不再提示.centerY());
    sleep(1000);
    var 继续观看 = text("继续观看").findOne().bounds()
    click(继续观看.centerX(), 继续观看.centerY());
  }

  sleep(1000);
  //点击多次选择最左边的集数
  for (var i = 0; i < 4; i++) {
    click(100, 1350);
    sleep(1000);
  }
  //把视频清晰度调低
  while (1) {
    find_click(id, "surface_container", 2000);
    if (find_click(id, 'player_show_more', 2000)) {
      if (find_click(text, '清晰度', 3000)) {
        toast("点开清晰度了");
        sleep(1000);
        if (find_click(text, '标清', 2000)) {
          break
        } else if (find_click(text, '高清', 2000)) {
          break
        } else {
          back()
        }
      } else {
        toastLog("没有找到视频清晰度");
        return 观看视频领红包();
      }
    } else {
      toastLog("没有找到视频");
      return 观看视频领红包();
    }
  }
  sleep(1000);
  //调低音量
  for (var i = 0; i < 7; i++) {
    swipe(940, 200, 940, 500, 500);
    sleep(500);
  }


  //等待
  if (红包待解锁 == 1) {
    toastLog("等待10分钟");
    sleep(10 * 60 * 1000);
  } else if (红包待解锁 == 2) {
    toastLog("等待60分钟");
    sleep(62 * 60 * 1000);
  } else {
    toastLog("等待180分钟");
    sleep(184 * 60 * 1000);
  }
  back_homepage()
  return SignIn_Miguaikan();
}