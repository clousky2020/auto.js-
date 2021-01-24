

auto.waitFor();
var height = device.height;
var width = device.width;
// toastLog("本设备的分辨率为，\n宽："+device.width+"\n长："+device.height);//输出设备的分辨率
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率


home();
sleep(1000);
SignIn_Miguaikan(); //咪咕爱看签到

function back_home () {
  var num = 0;
  while (num < 5) {
    if (!id("workspace").findOne(200)) {
      back();
      num += 1;
      toastLog("第" + num + "次尝试后退");
    } else { return; }
  }
  return;
}

function back_to (type, text, time) {
  var num = 0;
  while (1) {
    var object = type(text).findOne(time);
    if (object) {
      toastLog("已经返回到{" + text + "}的内容了,次数为" + num + "次");
      return true;
    } else if (num > 10) {
      toastLog(num + "次返回没有到达指定地点，结束任务");
      exit();
    } else {
      back();
      num += 1;
      // toast("当前后退次数:" + num);
    }
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
      }
      click(object.centerX(), object.centerY());
      return true;
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

function loop_find_click (type, text, time, num) {
  var n = 1;
  while (n < num) {
    toastLog("第" + n + "次查找点击");
    find_click(type, text, time);
    n += 1;
  }
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



function SignIn_Miguaikan () {
  try {
    var appRun = currentActivity();
    if (appRun != "com.wondertek.miguaikan") {
      launch("com.wondertek.miguaikan");
      sleep(1000);
    }

    find_click(id, "splash_time", 5000);
    //back_homepage();
    红包待解锁 = 0; //设定一个开关，代表今天还有视频红包没有领
    var 我的 = text("我的").findOne(5000);
    // var 我的 = id("image5_layout").findOne(5000);
    if (我的) {
      sleep(1000);
      var 我的 = 我的.bounds();
      click(我的.centerX(), 我的.centerY());
      while (1) {
        var 福利 = textContains("福利").findOne(5000);
        var 福利 = 福利.bounds();
        if (福利.centerY() < 200) {
          swipe(540, 500, 540, 2000, 500);
        } else { break; }
      }

      if (福利) {
        sleep(1000);
        click(福利.centerX(), 福利.centerY());
        var 界面 = text("会员每日福利").findOne(10000);
        if (界面) {
          toastLog("咪咕爱看福利界面出现了");
          swipe(540, 2000, 540, 1400, 500);
        } else {
          toastLog("没有福利界面，重启");
          return SignIn_Miguaikan();
        }
        sleep(1000);
        if (find_click(text, "去观看", 1000)) {
          return SignIn_Miguaikan();
        }
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
              if (textContains("当前剩余抽奖次数 0 次").findOne(1000)) {
                back();
                break;
              }
            }
            back_to(text, "会员每日福利", 1000);
            sleep(1000);
          }
        }
        sleep(1000);
        var 去分享 = text("去分享").findOne(1000);
        if (去分享) {
          toastLog("有去分享按钮");
          var 去分享 = 去分享.bounds();
          click(去分享.centerX(), 去分享.centerY());
          sleep(1000);
          var 分享 = text("分享").findOne(10000);
          if (分享) {
            var 分享 = 分享.bounds();
            click(分享.centerX(), 分享.centerY());
            var 微信好友 = text("微信好友").findOne(5000);
            if (微信好友) {
              var 微信好友 = 微信好友.bounds();
              click(微信好友.centerX(), 微信好友.centerY());
              text("创建新聊天").findOne(10000);
              back_homepage();
              sleep(1000);
              click(福利.centerX(), 福利.centerY());
              sleep(2000);
            }
            sleep(1000);
            back_to(text, "会员每日福利", 1000);
          } else {
            toastLog("没有找到分享的选择");
            back_to(text, "会员每日福利", 1000);

          }
        }
        sleep(1000);
        while (1) {
          if (find_click(text, "领取", 2000)) {
            sleep(2000);
            find_click(text, "X", 2000);
            if (!find(text, "会员每日福利", 2000)) {
              back_to(text, "会员每日福利", 1000);
            }
          } else {
            break;
          }

        }

        sleep(1000);
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
      } else {
        toastLog("未找到福利界面，重启!");
        return SignIn_Miguaikan();
      }
    } else {
      toastLog("未找到我的，重启");
      back_home();
      return SignIn_Miguaikan();
    }
  } catch (err) {
    toastLog(err);

  } finally {
    back_home();
    return;
  }
}

function back_homepage () {
  // while (1) {
  //   var 我的 = t_type(t_text).findOne(1000);
  //   if (我的) {
  //     var 我的 = 我的.bounds();
  //     click(我的.centerX(), 我的.centerY());
  //     toastLog("已经退回到包含" + t_type + "=" + t_text + "界面");
  //     break;
  //   } else {
  //     back();
  //   }
  // }

  back_to(text, "我的", 1000);
}

function 观看视频领红包 () {
  back_homepage();
  var 路人超能100 = text("路人超能100").findOne(5000);
  if (路人超能100) {
    sleep(1000);
    var 路人超能100 = 路人超能100.bounds();
    click(路人超能100.centerX(), 路人超能100.centerY());
    sleep(1000);
    if (text("共12集").findOne(5000)) {
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
  //把视频清晰度调低
  while (1) {
    find_click(id, "surface_container", 2000);
    if (find_click(id, 'player_show_more', 2000)) {
      if (find_click(text, '清晰度', 3000)) {
        toast("点开清晰度了");
        sleep(1000);
        if (find_click(text, '标清', 2000)) { break } else { back() }
      } else { back() }
    }
  }
  sleep(1000);
  //调低音量
  for (var i = 0; i < 5; i++) {
    swipe(940, 200, 940, 500, 500);
    sleep(500);
  }
  //点击多次选择最左边的集数
  for (var i = 0; i < 4; i++) {
    click(100, 1350);
    sleep(1000);
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
  back_homepage(id, "image5_layout")
  return SignIn_Miguaikan();
}