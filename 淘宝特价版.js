auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率
var height = device.height;
var width = device.width;
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
  toast("请求截图失败");
  exit();
}
day_day_sign = "TB14jdYtaNj0u4jSZFyXXXgMVXa-76-77.png_";


retry = 0;
sleep(1000);
taobao_coins();

function back_home () {
  var num = 0;
  while (1) {
    //因为在auto.js的文件中第一个就是蚂蚁庄园星星球，以此作为进入auto的判断
    var auto = text("蚂蚁庄园星星球").findOne(1000);
    //好像在auto的界面，可以正常启动后续的app
    if (num > 5 || id("workspace").findOne(500)) { //多次后退没有找到auto的界面，那就返回桌面重启
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

function image_coor (template_path) {
  var template = images.read(template_path); //模板图片的位置
  var img = captureScreen(); //截取当前图像
  var coor = images.findImage(img, template)
  img.recycle(); // 回收图片
  template.recycle(); // 回收图片
  return coor;
}

function match_image_coor (template_path) {
  try {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.matchTemplate(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
  }
  catch (err) { throw err }
  finally { return }
}

function back_to_homepage () {
  back_to(textContains, "工厂直供", 1000);
}

function go_to_personal () {
  click(900, 2300); //点击进入我的页面
  sleep(1000);
}

function search_for_money () {
  var num = 0;
  if (find_click(text, "搜索", 1000)) {
    sleep(2000);
    while (num < 3) {
      if (find_click(id, "searchbtn", 3000)) {
        sleep(1000);
        num += 1;
        swipe(540, 2000, 540, 500, 400);
        sleep(1000);
        back();
        sleep(1000);
      } else {
        num += 1;
      }
    }
  }
  back_to_homepage();
  return;
}


function taobao_coins () {
  try {
    var appRun = currentActivity();
    if (appRun != 'com.taobao.litetao') {
      launch("com.taobao.litetao");
    }
    sleep(2000);

    find_click(desc, "关闭", 1000);
    if (result = find_click(text, "天天领红包", 3000)) {
      if (find(textContains, "开启签到提醒", 5000)) {
        if (find_click(text, "点击提现到支付宝", 1000)) {
          find_click(textContains, "知道了", 3000)
        }
      }
    }
    //开始玩别的
    back_to_homepage();
    back();
    find_click(text, "立即领取", 2000);
    find_click(desc, "图片", 1000);
    sleep(1000);
    //进入频道拿特币
    search_for_money();

    var 赚特币 = text("天天赚特币").findOne(4000);
    if (赚特币) {
      sleep(1000);
      var 赚特币 = 赚特币.bounds();
      click(赚特币.centerX(), 赚特币.centerY());

      if (find(text, day_day_sign, 10000)) {
        toastLog("已进入赚特币界面");
        sleep(1000);
        var coor = image_coor("./litetao/点击领取.jpg");
        if (coor) {
          click(coor.x, coor.y);
          sleep(1000);
        }
        click(834, 1228); //特币收钱
      } else {
        toastLog("未知原因，未进入赚特币界面,后退重启");
        retry += 1;
        back_home();
        return taobao_coins();
      }
      sleep(1000);
      click(834, 1228); //特币收钱
      var 要这个 = text("要这个").findOne(2000);
      if (要这个) {
        var 要这个 = 要这个.bounds();
        click(要这个.centerX(), 要这个.centerY());
        sleep(1000);
        back();
      }
      sleep(1000);
      //早起打卡
      toastLog("早起打卡");
      if (find_click(text, "TB1.wwziAcx_u4jSZFlXXXnUFXa-110-111.png_", 2000)) {
        if (find_click(text, "去赚币", 2000)) {
          if (find(text, "早起打卡挑战赛", 2000)) {
            if (find(textContains, "已报名", 2000)) {
              toastLog("已经报名打卡了");
              back();
            } else {
              var 报名 = text("50特币报名赚更多").findOne(2000);
              if (!报名) {
                var 报名 = text("速速打卡").findOne(1000);
              }
              var coor = image_coor("./litetao/早起打卡-开心收下.png");
              if (coor) {
                click(coor.x, coor.y);
              }
              if (报名) {
                var 报名 = 报名.bounds();
                click(报名.centerX(), 报名.centerY());
                sleep(1000);
                var 继续报名 = textContains("继续报名").findOne(2000);
                if (继续报名) {
                  继续报名.click();
                  sleep(1000);
                }
              } else {
                click(540, 1050);
                click(540, 1500);
              }
            }
          } else {
            toastLog("没有找到早起打卡界面");
          }
          back_to(text, day_day_sign, 1000);
        } else {
          toastLog("没有进入签到页面");
          back_to(text, day_day_sign, 1000);
        }
      }
      sleep(1000);
      if (find(text, "特币娱乐", 2000)) {
        find_click(text, "关闭", 1000);
      }

      sleep(1000);
      click(834, 1228); //特币收钱
      sleep(1000);
      //做任务
      find_click(text, "TB1QFwGsQ9l0K4jSZFKXXXFjpXa-110-110.png_", 3000);
      sleep(2000);
      赚币中心();
      sleep(1000);
      // 做任务得猫粮
      var n = 0;
      var x = 0;
      while (n < 10) {
        click(540, 1680);
        while (1) {
          if (find(textContains, "邀请好友助力得猫粮", 5000)) {
            if (x > 0) {
              var 点击 = text('去完成').findOnce(x);
            } else {
              var 点击 = text("去完成").findOne(1000);
            }
            if (点击) {
              点击.click();
              if (find(text, "下单返任务", 2000)) {
                toastLog("不下单，退回");
                x += 1;
              } else {
                swipe(540, 2000, 540, 1000, 400);
                toastLog("等待15s后退回");
                sleep(15500);
              }
              back_to(textContains, "邀请好友助力得猫粮", 1000);
              sleep(2000);
            } else {
              toastLog("没有任务了，关闭");
              back_to(textContains, "邀请好友助力得猫粮", 1000);
              find_click(text, "关闭", 1000);
              var n = 11;
              break;
            }
          } else {
            toastLog("没有进入猫粮任务界面");
            n += 1;
            break;
          }
        }
      }
      sleep(1000);
      for (var i = 0; i < 3; i++) { swipe(540, 1000, 540, 2000, 500); }
      //收任务奖励
      var click_positions = [
        [272, 483],
        [410, 435],
        [550, 360],
        [690, 440],
        [810, 484]
      ]
      for (j = 0; j < 4; j++) {
        for (i = 0; i < click_positions.length; i++) {
          click(click_positions[i][0], click_positions[i][1]);
        }
        sleep(1000);
      }
      var num = 0;
      // while (num < 7) {
      //   var coor = image_coor("./litetao/任务奖励.png");
      //   if (coor.matches.length > 0) {
      //     coor.matches.forEach(match => {
      //       click(match.point.x, match.point.y);
      //       sleep(200);
      //     })
      //     num += 1;
      //     sleep(1000);
      //   } else {
      //     toastLog("没有了任务奖励");
      //     break;
      //   }
      // }
      sleep(1000);
      click(834, 1228); //特币收钱
      sleep(1000);
    } else {
      toastLog("不在首页,后退重启！");
      back_to_homepage();
      return taobao_coins();
    }
    back_to_homepage();
    go_to_personal();
    if (find_click(text, "翻卡牌", 1000)) {
      //检测是否进入了翻牌界面
      var 开始翻牌 = text("TB1gcO6k4rI8KJjy0FpXXb5hVXa-584-247").findOne(5000);
      if (开始翻牌) {
        var 开始翻牌 = 开始翻牌.bounds();
        while (1) {
          var coor = image_coor("./litetao/不能翻牌.png");
          if (coor) {
            toastLog("已经不能翻牌了");
            sleep(1000);
            break;
          } else {
            click(开始翻牌.centerX(), 开始翻牌.centerY());
            sleep(5000);
            text("继续玩").findOne(3000).click();
            sleep(1000);
          }
        }
      } else {
        toastLog("没有找到开始翻牌");
      }
    }
    back_to_homepage();
    go_to_personal();
    // 百万开奖

    // var 百万入口 = text("天天100万").findOne(2000);
    // if (百万入口) {
    //     百万入口.click();
    //     var 知道了 = text("知道了").findOne(5000);
    //     if (知道了) {
    //         var 知道了 = 知道了.bounds();
    //         click(知道了.centerX(), 知道了.centerY());
    //     }
    //     var 下注 = text("100特币").findOne(1000);
    //     if (下注) {
    //         下注.click();
    //         sleep(2000);
    //         click(540, 1700); //确定下注按钮
    //         var 下注成功 = textContains("下注成功").findOne(3000);
    //         if (下注成功) {
    //             back();
    //             back_to_homepage();
    //         }
    //     }
    //     var 去解锁 = text("去解锁").findOne(1000);
    //     if (去解锁) {
    //         去解锁.click();
    //         sleep(3000);
    //         while (1) {
    //             var 当前页面 = textContains('当前页面浏览').findOne(2000);
    //             // var 当前页面 = textContains('天天100万').findOne(2000);
    //             if (当前页面) {
    //                 var n = 0
    //                 if (n < 10) {
    //                     swipe(540, 1500, 540, 1300, 300);
    //                     sleep(500);
    //                     n += 1;
    //                 }
    //                 if (n > 10) {
    //                     swipe(540, 1200, 540, 1500, 300);
    //                     sleep(500);
    //                     n -= 1;
    //                 }
    //             } else if (text("开奖后可使用道具").findOne(500)) {
    //                 toastLog("已经完成了任务，退出");
    //                 break;
    //             } else {
    //                 break;
    //             }
    //         }
    //         back();
    //     }

    // }

    back_to_homepage();

  } catch (err) {
    alert(err);
  } finally {
    back_home();
    return;
  }
}

function 开始翻牌 () {
  var 开始翻牌 = text("TB1gcO6k4rI8KJjy0FpXXb5hVXa-584-247").findOne(2000);
  var 开始翻牌 = 开始翻牌.bounds();
  while (1) {
    click(开始翻牌.centerX(), 开始翻牌.centerY());
    sleep(5000);
    var 继续玩 = text("继续玩").findOne(4000);
    if (继续玩) {
      var 继续玩 = 继续玩.bounds();
      click(继续玩.centerX(), 继续玩.centerY());
    } else {
      break;
    }
  }
}

function 赚币中心 () {
  var 赚币中心 = text("关闭").findOne(3000);
  // var 坐标 = 赚币中心.bounds();
  if (赚币中心) {
    list1 = ["去发现", "去完成", "去浏览", "去逛逛", "去看看"];
    for (var i = 0; i < list1.length; i++) {
      x = 0;
      while (1) {
        if (x > 2) { x = 0 };
        if (x == 0) {
          var 点击 = text(list1[i]).findOne(1000);
        } else {
          var 点击 = text(list1[i]).findOnce(x);
        }
        if (点击 && find_click_position(text, list1[i], 2000, 1000, 2250)) {
          toastLog("现在点击的是" + list1[i]);
          最终任务浏览界面();
          toastLog("后退到关闭");
          back_to(text, "关闭", 1000);
          sleep(1000);
        } else {
          break;
        }
      }
    }
  } else {
    toastLog("没有进入赚币中心，重启");
    return taobao_coins();
  }
  var close = text("关闭").findOne(3000);
  if (close) {
    close.click();
  }
  return;
}

function 最终任务浏览界面 () {
  toastLog("最终任务浏览界面");
  if (text("爆款热卖").findOne(3000)) {
    toastLog("进入爆款热卖了，无用，后退");
    x += 1;
    return;
  } else if (textContains("我的奖品").findOne(100)) {
    toastLog("进入了抽奖的页面，后退");
    x += 1;
    return;
  }
  var 点击领取今日特币 = text("点击领取今日特币").findOne(1000);
  var 特币已存 = text("特币已存，明天再来").findOne(1000);
  if (点击领取今日特币) {
    点击领取今日特币.click();
    x += 1;
    sleep(1000);
    return;
  } else if (特币已存) {
    toastLog("特币已存");
    x += 1;
    return;
    // } else if (coor = image_coor("./litetao/去花特币.png")) {
    //   toastLog("特币已存满");
    //   x += 1;
    //   return;
  }
  toastLog("下滑");
  swipe(540, 2000, 540, 1000, 500);
  var num = 0;
  while (1) {
    var coor = image_coor("./litetao/逛15s最高得.png")
    if (coor) {
      swipe(540, 2000, 540, 1000, 500);
      sleep(12000);
      检查完成标志();
      break;
    } else if (image_coor("./litetao/滑动浏览.png")) {
      sleep(15000);
      检查完成标志();
      break;
    } else if (image_coor("./litetao/看30秒最高得.jpg")) {
      sleep(30000);
      检查完成标志();
      break;
    } else if (num > 8) {
      x += 1;
      break;
    } else {
      toastLog("第" + num + "次找不到目标图片");
      num += 1;
      sleep(1000);
    }
  }
  return;
}

function 检查完成标志 () {
  var num = 0;
  while (1) {
    var coor = image_coor("./litetao/去收.png");
    if (coor) {
      back();
      return;
    } else if (num > 10) {
      toastLog("多次未找到,退回");
      back();
      return;
    } else {
      toastLog("没有找到去收图标");
      num += 1;
      sleep(1000);
    }
  }
}