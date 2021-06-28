auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率
var height = device.height;
var width = device.width;
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
  toast("请求截图失败");
  exit();
}
day_day_sign = "TB14jdYtaNj0u4jSZFyXXXgMVXa-76-77";
// day_day_sign = "TB1jfBvXnM11u4jSZPxXXahcXXa-110-110";

retry = 0;
sleep(1000);
main();

function main () {
  app_start();
  sign_in();
  // search_for_money();
  earn_coin_every_day();
  go_to_personal();
  click(108, 2250);
  sleep(1000);
  // chicken_gift();
  back_home();
}
// 启动app
function app_start () {
  var appRun = currentActivity();
  if (appRun != 'com.taobao.litetao') {
    launch("com.taobao.litetao");
  }
  find_click(textContains,'还剩',3000)
  sleep(1000);
  return;
}
// 点击签到
function sign_in () {
  // 首页进去关闭可以关闭的其他内容
  find_click(desc, "关闭", 1000);
  find_click(desc, "@关闭按钮", 1000);
  toastLog("开始签到");
  if (find_click(text, "天天领红包", 3000)) {
    if (find(textContains, "开启签到提醒", 5000)) {
      if (find_click(text, "点击提现到支付宝", 1000)) {
        find_click(textContains, "知道了", 3000)
      }
    }
  }
  back();
  // back_to(text, "天天领红包", 1000);
  toastLog("签到结束");
  sleep(1000);
  return;
}
// 查找图片后点击
function image_click (path) {
  var p = image_coor(path);
  if (p) {
    toastLog('找到图片坐标了，' + p.x + ',' + p.y);
    click(p.x, p.y);
    return true;
  } else {
    toastLog('没找到' + path);
    return false;
  }
}
// 返回桌面上的auto界面
function back_home () {
  var num = 0;
  while (1) {
    //因为在auto.js的文件中社区比较独特，其他应用少有，以此作为进入auto的判断
    var auto = text("社区").findOne(1000);
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
    press(object.centerX(), object.centerY(), 500);
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

function image_coor (template_path) {
  var template = images.read(template_path); //模板图片的位置
  var img = captureScreen(); //截取当前图像
  var coor = images.findImage(img, template)
  img.recycle(); // 回收图片
  template.recycle(); // 回收图片
  if (coor){
    return coor;
  }else{
    return false;
  }
}

function match_image_coor (template_path) {
  try {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.matchTemplate(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
  } catch (err) { throw err } finally { return }
}

function back_to_homepage () {
  back_to(text, "天天领红包", 2000);
}

function go_to_personal () {
  back_to_homepage();
  toastLog('进入个人主页');
  click(900, 2300); //点击进入我的页面
  sleep(1000);
}

function search_for_money () {
  toastLog("进入搜索");
  if (find_click(text, "搜索", 5000)) {
    toastLog("循环搜索");
    var num = 0;
    while (num < 3) {
      if (find_click(id, "searchbtn", 1000)) {
        sleep(1000);
        if (find(id, "open_cart", 2000)) {
          sleep(1000);
          num += 1;
          swipe(540, 2000, 540, 500, 400);
          sleep(1000);
          back();
          sleep(1000);
        } else {
          num += 1;
        }
        back_to(id, "searchbtn", 1000)
      }
    }
  } else {
    toastLog("没有找到搜索界面");
    back_to_homepage();
    return search_for_money();
  }
  back_to_homepage();
  return;
}
function getMoney () {
  // if (!find(text, '后 再次收钱', 2000)) {
  if (!image_coor("./images/淘特继续赚图标.jpg")) {
    click(834, 1228);//特币收钱
    toastLog("特币收钱");
  }
  return;
}
// 进入天天赚特币
function earn_coin_every_day () {
  try {
    if (find_click(text, '天天赚特币', 4000)) {
      sleep(1000);
      find_click(textContains, '放弃膨胀', 3000);
      if (find(text, 'TB1jfBvXnM11u4jSZPxXXahcXXa-110-110', 10000)) {
        toastLog("已进入赚特币界面");
        sleep(1000);

        var coor = image_coor("./litetao/点击领取.jpg");
        if (coor) {
          click(coor.x, coor.y);
          sleep(1000);
        }
      } else {
        toastLog("未知原因，未进入赚特币界面,后退重启");
        retry += 1;
        back_home();
        return earn_coin_every_day();
      }
      sleep(1000);
      getMoney();
      var 要这个 = text("要这个").findOne(4000);
      if (要这个) {
        var 要这个 = 要这个.bounds();
        click(要这个.centerX(), 要这个.centerY());
        sleep(1000);
        back();
      }
      sleep(1000);
      //早起打卡
      if (find_click(text, "TB1.wwziAcx_u4jSZFlXXXnUFXa-110-111", 2000)) {
        toastLog("早起打卡");
        sleep(1000);
        if (find_click(text, "去赚币", 2000)) {
          if (find(text, "早起打卡挑战赛", 2000)) {
            if (find(textContains, "已报名", 2000)) {
              toastLog("已经报名打卡了");
              back();
            } else {
              image_click("./litetao/早起打卡-开心收下.png");

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
          back_to(text, '特币娱乐', 1000);
        } else {
          toastLog("没有进入签到页面");
          back_to(text, '特币娱乐', 1000);
        }

        find_click(textContains, '放弃膨胀', 1000);
        幸运卡牌 = text('去赚币').findOnce(1);
        if (幸运卡牌) {
          toastLog('找到幸运卡牌了');
          幸运卡牌.click();
          sleep(2000);
          //检测是否进入了翻牌界面
          var 开始翻牌 = text("O1CN01oK65MY1R9e7t9RpmT_!!6000000002069-2-tps-115-108").findOne(5000);
          if (开始翻牌) {
            var 开始翻牌 = 开始翻牌.bounds();
            click(540, 1500);
            sleep(1000);
            while (1) {
              if (find(text, "0", 1000)) {
                toastLog("已经不能翻牌了");
                sleep(1000);
                break;
              } else {
                // click(开始翻牌.centerX(), 开始翻牌.centerY());
                click(540, 1500);
                // sleep(5000);
                // text("继续玩").findOne(3000).click();
                sleep(1000);
                back();
                sleep(1000);
                幸运卡牌.click();
                sleep(2000);
              }
            }
          } else {
            toastLog("没有找到开始翻牌");
          }
        }
        back_to(text, '特币娱乐', 1000);
        // find_click(textContains, '放弃膨胀', 1000);
        if (find(text, "特币娱乐", 2000)) {
          find_click(text, "关闭", 1000);
          find_click(text, "关闭", 1000);
        }
      }
      sleep(1000);
      getMoney();
      sleep(2000);
      // 打卡领猫粮
      if (find_click(text, '打卡领猫粮', 2000)) {
        if (find_click(text, "明日来打卡", 1000)) {
          toastLog("已经打卡过了");
        } else {
          find_click(text, '立即打卡领猫粮', 2000);
        }
      }
      // 点击关闭打卡领猫粮界面
      // find_click(text, "TB1VVsWoiDsXe8jSZR0XXXK6FXa-72-72", 1000);
      // click(540, 1900);
      getMoney();
      //做任务

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
              } else if (find(text, "下单得猫粮", 1000)) {
                toastLog("不下单，退回");
                x += 1;
              } else if (find(text, "聚划算开宝箱领红包", 1000)) {
                toastLog("进入了聚划算开宝箱领红包,退回");
                x += 1;
              } else if (find(text, "超级抵钱", 1000)) {
                toastLog("进入了淘宝页面");
                back_to(textContains, "邀请好友助力得猫粮", 1000);
                sleep(1000);
              } else if (find(textContains, '15秒', 1000)) {
                toastLog('当前页面需要不断下滑');
                var swipe_num = 15;
                while (1) {
                  swipe(540, 2000, 540, 1000, 500);
                  sleep(1000);
                  if (swipe_num<0){
                    break
                  }
                  swipe_num -= 1;
                }
              } else if (image_coor("./litetao/猫猫礼物.jpg")) {
                toastLog("进入了猫猫礼物");
                back_to(textContains, "邀请好友助力得猫粮", 1000);
                sleep(1000);
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

              n = 10;
              break;
            }
          } else {
            toastLog("没有进入猫粮任务界面");
            n += 1;
            break;
          }
        }
      }
      // 把猫粮吃完
      while (1) {
        click(540, 1680);
        if (find(textContains, "邀请好友助力得猫粮", 5000)) {
          find_click(text, "关闭", 1000);
          break;
        } else {
          break;
        }
      }
      sleep(1000);
      getMoney();
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

      sleep(1000);
      getMoney();
      sleep(1000);
    } else {
      toastLog("不在首页,后退重启！");
      back_to_homepage();
      return earn_coin_every_day();
    }
    back_to_homepage();
    sleep(1000);

  } catch (err) {
    back_home();
    alert(err);
  } finally {
    return;
  }
}

function 赚币中心 () {
  find_click(text, "TB1QFwGsQ9l0K4jSZFKXXXFjpXa-110-110", 3000);
  sleep(2000);
  toastLog('检测赚币中心');
  back_to(text, '明日可多领', 1000);
  if (find(text, '明日可多领', 10000)) {
    sleep(2000);
    toastLog('已找到赚币中心');
    for (var n = 0; n < 2; n++) {
      toastLog("第" + n + '次遍历赚金币的选项');
      list1 = ["去完成", "去发现", "去浏览", "去逛逛", "去看看"];
      for (var i = 0; i < list1.length; i++) {
        x = 0;
        while (1) {
          if (x > 2) { x = 0 };
          if (x == 0) {
            var 点击 = text(list1[i]).findOne(1000);
          } else {
            var 点击 = text(list1[i]).findOnce(x);
          }
          if (点击) {
            点击.click();
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
    }
  } else {
    toastLog("没有进入赚币中心，重启");
    return earn_coin_every_day();
  }
  find_click(text, '关闭', 5000);
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
  } else if (text("下单得特币").findOne(100)) {
    x += 1;
    toastLog("进入了下单的页面，后退" + x);
    return;
  }

  if (find_click(text, '点击领取今日特币', 1000)) {
    x += 1;
    sleep(1000);
    return;
  } else if (find(text, '特币已存，明天再来', 1000)) {
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
    } else if (image_coor("./litetao/逛30秒.jpg")) {
      sleep(30000);
      检查完成标志();
      break;
    } else if (find(textContains, '当前页面浏览', 1000)) {
      toastLog('当前页面需要不断下滑');
      var swipe_num = 15;
      while (1) {
        swipe(540, 1500, 540, 1000, 300);
        sleep(1000);
        if (swipe_num<0){
          break
        }
        swipe_num -= 1;
      }
      break
    } else if (num > 10) {
      x += 1;
      break
    } else {
      toastLog("第" + num + "次找不到目标图片");
      num += 1;
      sleep(1000);
    }
  }
  return;
}

function 检查完成标志 () {
  var n = 0;
  while (1) {
    if (image_click("./litetao/去收.png")) {
      back();
      sleep(1000);
      find_click(text, '直接退出', 1000);
      return;
    } else if (image_click("./litetao/任务完成.jpg")) {
      toastLog("找到任务完成的标志了");
      sleep(4000);
      if (find(text, '兑换', 1000)) {
        find_click(text, "TB1QFwGsQ9l0K4jSZFKXXXFjpXa-110-110", 3000);
      } else {
        toastLog("没有在兑换界面，重启");
        return earn_coin_every_day();
      }
      return;
    } else if (n > 10) {
      toastLog("多次未找到,退回");
      // back();
      return;
    } else {
      toastLog("没有找到去收图标");
      n += 1;
      sleep(1000);
    }
  }
}

function chicken_gift () {
  if (find_click(text, '小鸡送好礼', 3000)) {
    sleep(5000);
    if (find(text, '邀请好友', 5000)) {
      // 领取每日鸡食
      if (find_click(text, 'TB1wTmx34z1gK0jSZSgXXavwpXa-272-96', 2000)) {
        find_click(text, 'TB1aOl1pCslXu8jSZFuXXXg7FXa-354-109', 4000);
      }
      // 每日签到
      toastLog("去找到登录领现金");
      sleep(2000);
      if (image_click("./litetao/小鸡饲料登录领现金.jpg")) {
        sleep(1000);
        image_click("./litetao/小鸡饲料点击签到.jpg");

      }

      var coor = image_coor("./litetao/小鸡领饲料图标.jpg");
      if (coor) {
        click(coor.x, coor.y);
        sleep(1000);
        if (find(text, '分享得饲料', 1000)) {
          toastLog('已经进入赚饲料任务界面了');
          var list2 = ["去浏览"];
          for (var i = 0; i < list2.length; i++) {
            while (1) {
              var coor = image_coor('./litetao/小鸡饲料' + list2[i] + '.jpg');
              if (coor) {
                click(coor.x, coor.y);
                sleep(3000);
                // 进入浏览后的内容
                if (find(text, "浏览得饲料", 3000)) {
                  var n = 0
                  while (n < 20) {
                    swipe(540, 2000, 540, 1500, 500);
                    sleep(800);
                    n += 1;
                  }
                  back();
                  sleep(1000);
                  find_click(textContains, '收下', 2000);
                  find_click(textContains, '去喂', 1000);

                } else {
                  toastLog("没有进入浏览得饲料");
                  sleep(1000);
                }
              } else {
                toastLog("没有可以点击的内容了");
                break;
              }
            }
            // 从首页返回
            if (image_click('./litetao/小鸡饲料去完成.jpg')) {
              sleep(1000);
              image_click('./litetao/小鸡饲料返回首页去完成.jpg');
              if (find_click(text, '小鸡送好礼', 3000)) {
                if (find(text, '邀请好友', 5000)) {
                  toastLog("已再次进入小鸡页面");
                  if (image_click("./litetao/小鸡领饲料图标.jpg")) {
                    if (find(text, '分享得饲料', 10000)) {
                      toastLog("已再次进入任务页面");
                    }
                  }
                }
              } else {
                toastLog("未进入首页，重启");
                return chicken_gift();
              }
            }
            while (1) {
              var coor = image_coor('./litetao/小鸡饲料领取.jpg');
              if (coor) {
                click(coor.x, coor.y);
                sleep(1000);
                find_click(textContains, '去喂', 5000);
                find_click(text, 'TB1aOl1pCslXu8jSZFuXXXg7FXa-354-109', 5000);
              } else {
                toastLog("没有可以领取的奖励了");
                break;
              }
            }
            sleep(2000);
            var coor = image_coor('./litetao/小鸡饲料任务界面关闭.jpg');
            if (coor) {
              click(coor.x, coor.y);
              sleep(1000);
            }
          }
        } else {
          toastLog('没有进入赚饲料任务界面了，后退');
          back_to_homepage();
          return chicken_gift();
        }
      } else {
        toastLog("未找到领饲料图标");
      }



      // 点击喂食
      // toastLog("点击喂食");
      // var num = 0
      // find_click(text, '克', 1000);
      // sleep(1000);
      // find_click(text, 'TB1ds7c4oY1gK0jSZFMXXaWcVXa-354-109', 2000);

      /*while (1) {
        var feed = text('克').findOnce(1);
        if (feed) {
          num += 1;
          feed.click();
          sleep(1000);
          var coor = image_coor('./litetao/小鸡饲料任务界面关闭.jpg');
          if (coor) {
            click(coor.x, coor.y);
            sleep(1000);
            break;
          }
        } else if (num > 5) {
          toastLog('喂食次数已达到');
          break;
        } else {
          toastLog('没有找到喂食内容');
          break;
        }
      }*/

      back_to_homepage();
      return;
    } else {
      toastLog("没有进入小鸡送好礼界面");
      back_to_homepage();
      return chicken_gift();
    }
  } else {
    toastLog("没有找到小鸡送好礼");
    back_to_homepage();
    return chicken_gift();
  }
}