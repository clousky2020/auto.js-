auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
  toast("请求截图失败");
  exit();
}
// back_home();
tmail_form(); //运行天猫农场的程序
function image_coor (template_path) {
  var template = images.read(template_path); //模板图片的位置
  var img = captureScreen(); //截取当前图像
  var coor = images.findImage(img, template)
  img.recycle(); // 回收图片
  template.recycle(); // 回收图片
  if (coor) {
    toastLog("找到图片了");
    return coor;
  } else {
    toastLog("没有找到图片");
    return false;
  }

}

function match_image_coor (template_path) {
  var template = images.read(template_path); //模板图片的位置
  var img = captureScreen(); //截取当前图像
  var coor = images.matchTemplate(img, template)
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

function get_sun () {
  var num = 0;
  while (1) {
    var coor = match_image_coor("./images/农场阳光.png");
    if (coor.matches.length > 0) {
      coor.matches.forEach(match => {
        click(match.point.x, match.point.y);
      })
      num += 1;
      sleep(1000);
    } else if (num > 4) {
      toastLog("超出设置得阳光的次数，退出");
      break;
    } else {
      toastLog("没有了阳光奖励");
      break;
    }
  }
}

function take_the_sun () {
  // var p = image_coor("./taobao/采阳光.png");
  // if (p) {
  //   toastLog("找到采阳光的图标");
  //   click(p.x, p.y);
  //   sleep(1000);
  click(766, 1723);//点击进入采阳光界面
  sleep(1000);

  list_1 = ["推荐采集", "去采阳光"];
  for (var i = 0; i < list_1.length; i++) {
    while (1) {
      var 去采阳光 = text(list_1[i]).findOne(2000);
      if (去采阳光) {
        var 去采阳光 = 去采阳光.bounds();
        click(去采阳光.centerX(), 去采阳光.centerY());
        var 立刻采集 = text("立刻采集").findOne(5000);
        if (立刻采集) {
          立刻采集.click();
        }
        back_to(text, "今日最多可采集", 1000);
        sleep(2000);
      } else {
        toastLog("没有采阳光了");

        break;
      }
    }
  }
  var 关闭按钮 = text('TB1A0cdMBr0gK0jSZFnXXbRRXXa-36-36').findOne(1000).bounds();
  click(关闭按钮.centerX(), 关闭按钮.centerY());
  // } else {
  //   toastLog("没有找到采阳光的图标");
  // }
  return;
}

function back_home () {
  var num = 0;
  while (1) {
    //因为在auto.js的文件中第一个就是蚂蚁庄园星星球，以此作为进入auto的判断
    // var auto = text("蚂蚁庄园星星球").findOne(500);
    var auto = id("fab").findOne(500);
    //好像在auto的界面，可以正常启动后续的app
    if (num > 3 || id("workspace").findOne(500)) { //多次后退没有找到auto的界面，那就返回桌面重启
      home();
      sleep(500);
      home();
      var auto桌面 = text("Auto.js").findOne(4000);
      if (auto桌面) {
        auto桌面.click();
        if (auto) { break; }
      }
      back();
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

function tmail_form () {
  try {
    var appRun = currentActivity();
    if (appRun != 'com.taobao.taobao') {
      launch("com.taobao.taobao");
    }
    var 我的淘宝图标 = desc("我的淘宝").findOne(3000);
    if (我的淘宝图标) {
      var 我的淘宝图标 = 我的淘宝图标.bounds();
      click(我的淘宝图标.centerX(), 我的淘宝图标.centerY());
      sleep(1000);
      while (1) {
        var 天猫农场入口 = desc("芭芭农场").findOne(2000);
        if (!天猫农场入口) {
          var 天猫农场入口 = text("芭芭农场").findOne(2000);
        }
        if (天猫农场入口) {
          sleep(1000);
          var 天猫农场入口坐标 = 天猫农场入口.bounds();
          if (天猫农场入口坐标.centerY() < 200) {
            swipe(540, 500, 540, 2200, 300);
            continue;
          } else if (天猫农场入口坐标.centerY() > 1900) {
            swipe(540, 1500, 540, 500, 300);
            continue;
          }
          click(天猫农场入口坐标.centerX(), 天猫农场入口坐标.centerY());
          // 天猫农场入口.click();
          break;
        } else {
          toastLog("没有找到农场，上划后重启");
          swipe(540, 500, 540, 2200, 300);
          back_home();
          return tmail_form();
        }
      }
      if (text("兑换好礼（每天10:00上新）").findOne(10000)) {
        toast("进入农场");
        sleep(2000);
      } else {
        toastLog("未进入农场，重启");
        back_home();
        return tmail_form();
      }
      if (text("离线超过24小时，作物会停止自动生产哦~").findOne(3000)) {
        find_click(text, "立即去收", 1000);
        click(500, 1700); //关闭长时间未进入后弹出的窗口
        sleep(1000);
      }
      sleep(1000);
      var sun_list = [
        [180, 900],
        [380, 765],
        [432, 970],
        [590, 630],
        [577, 851],
        [800, 750],
        [760, 990],
        [975, 891],
        [794, 1306]
      ]
      var coordinate_field = [
        [535, 750],
        [308, 876],
        [761, 850],
        [549, 977],
        [299, 1136],
        [789, 1100],
        [526, 1257],
        [322, 1370],
        [512, 1520]
      ]
      toast("第一次开始收阳光");
      get_sun();
      // for (i = 0; i < sun_list.length; i++) {
      //     click(sun_list[i][0], sun_list[i][1]);
      // }
      var 立即收下 = textContains("立即收下").findOne(1000);
      if (立即收下) {
        var 立即收下 = 立即收下.bounds();
        click(立即收下.centerX(), 立即收下.centerY());
        sleep(1000);
      }
      toast("第一次收田地");
      for (i = 0; i < coordinate_field.length; i++) {
        click(coordinate_field[i][0], coordinate_field[i][1]);
      }
      sleep(4000);
      click(535, 1577); //宝箱点击关闭
      var 关闭按钮 = text("TB1uNfhsxv1gK0jSZFFXXb0sXXa-84-84.png_1080x1800Q50s50.jpg_").findOne(2000);
      if (关闭按钮) {
        var 关闭按钮 = 关闭按钮.bounds();
        click(关闭按钮.centerX(), 关闭按钮.centerY());
      }
      sleep(2000);
      toast("第二次开始收阳光");
      // for (i = 0; i < sun_list.length; i++) {
      //     click(sun_list[i][0], sun_list[i][1]);
      // }
      get_sun();
      toast("第二次收田地");
      for (i = 0; i < coordinate_field.length; i++) {
        click(coordinate_field[i][0], coordinate_field[i][1]);
      }
      sleep(1000);
      click(535, 1577) //宝箱点击关闭
      sleep(1000);
      while (1) {
        click(980, 1720) // 点击领阳光的图标
        sleep(1000);
        if (text("去APP完成").findOne(5000)) {
          toastLog("进入了任务菜单");
          break;
        } else {
          while (!textContains("兑换好礼").findOne(1000)) { back(); }
          sleep(1000);
        }
      }
      while (1) {
        var 今日已完成 = textContains("今日已完成").findOne(2000);
        if (今日已完成) {
          toastLog("今日已完成");
          break;
        }
        // var 再看看 = text("再看看").findOne(1000);
        var 去浏览 = text("去浏览").findOne(1000);
        var wait_time = text("后开始任务").findOne(1000);
        if (去浏览 && !wait_time) {
          去浏览.click();
          toast("去浏览15秒领阳光");
          if (textContains("今天的浏览商品任务已经全部完成啦").findOne(1000)) {
            back();
            sleep(1000);
            break;
          } else if (text("当前页面浏览满15秒可获得10阳光").findOne(3000)) {
            sleep(15250);
            while (!text("去APP完成").findOne(1000)) { back(); }
          } else {
            back();
            sleep(1000);
            break;
          }
        } else {
          toastLog("不能继续浏览得阳光了");
          break;
        }
      }
      while (1) {
        var 去进店领阳光 = text("去进店").findOne(500);
        var 去进店领阳光已完成 = text("已完成").findOne(500);
        if (去进店领阳光 && !去进店领阳光已完成) {
          sleep(1000);
          去进店领阳光.click();
          toast("进店领阳光");
          sleep(4000);
          var num = 0;

          while (1) {
            var click_list = ['立即打开', '关注店铺'];
            for (i = 0; i < click_list.length; i++) {
              if (find_click_position(desc, click_list[i], 300, 250, 1000)) {
                break;
              }
              if (find_click_position(text, click_list[i], 300, 250, 1000)) {
                break;
              }
            }

            if (desc("经过搜寻，你获得了").findOne(500) || textContains("已获得").findOne(100) || descContains("已关注，").findOne(100)) {
              toast("已经得到阳光,退回");
              while (!text("进店开宝箱").findOne(1000)) { back(); }
              sleep(2000);
              break
            }
            if (!find(textContains, "搜索", 1000)) {
              back();
            }
            if (num == 15) {
              toastLog("下滑15次还没看到目标值，向上，重新来");
              num += 1;
              // for (i1 = 0; i1 < 18; i1++) {
              //   swipe(540, 400, 540, 2100, 200); //向上滑
              // }
              click(100, 2300);//最左边图标双击回到最顶端
              click(100, 2300);//最左边图标双击回到最顶端
            } else if (num > 50) {
              toast("下滑多次未找到目标，退回");
              while (!text("进店开宝箱").findOne(1000)) { back(); }
              break
            } else {
              num += 1;
              toast("当前页面未找到,下滑" + num + "次");
              swipe(540, 2100, 540, 200, 200); //向下滑
            }
          }
        } else {
          break;
        }
      }

      sleep(1000);
      toast("没有什么任务可以做了，关闭任务菜单！");
      click(999, 1280);
      sleep(1000);
      //收阳光
      get_sun();
      //蜜蜂采阳光
      take_the_sun();


      sleep(1000);
      toast("进入果园");
      sleep(1000);
      click(128, 556);
      var 集果实图标 = text("gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==");
      //if (text("无星辰落").findOne()) {
      if (集果实图标.findOne(10000)) {
        toast("已经进入福年种福果");
        var num = 0;
        while (num > 2) {
          if (find_click(textContains, "继续努力", 2000)) {
            num = 3;
          } else {
            sleep(1000);
            num += 1;
          }
        }
        sleep(1000);
        click(756, 1219); //收取昨日的福气
        sleep(1000);
        click(540, 1521) //点掉今天已经领过了，明天再领
        sleep(1000);
        click(1000, 1700); // 进入活动中心
        collection_bless();
        sleep(1200);
        toastLog("关闭任务菜单");
        var 关闭任务菜单 = text("关闭").findOne(2000);
        关闭任务菜单.click();
        sleep(1000);
        toastLog("检查施肥数");
        while (1) {
          var coor = image_coor("./taobao/施肥数为零.jpg");
          if (!coor) {
            // toastLog("施肥数还有");
            click(540, 1650); //点击施肥
            sleep(500);
          } else {
            break;
          }
        }
        toastLog("施肥数已用完");
        sleep(1000);
        while (!desc("我的淘宝").findOne(500)) { back(); } //后退至淘宝首页
        back_home();
      } else {
        toastLog("未进入我的果园页面，后退重启！");
        while (!desc("我的淘宝").findOne(500)) { back(); } //后退至淘宝首页
        return tmail_form();
      }
    } else {
      toastLog("未找到我的淘宝页面，后退重启！");
      while (!desc("我的淘宝").findOne(1000)) { back(); } //后退至淘宝首页
      return tmail_form();
    }
  } catch (err) {
    toastLog(err);
    exit();
  }
}

function back_to_TaskInterface () {
  back_to(text, "跳转链接", 1000);
  return;
}

function collection_bless () {
  if (textContains("gif").findOne(10000)) {
    for (var i = 0; i < 3; i++) {
      toastLog("第" + i + "次检测");
      sleep(1000);
      var rect = text("去签到").findOne(500);
      if (rect != null) {
        toast("签到");
        rect.click();
      }
      while (1) {
        var rect = text("去领取").findOne(500);
        if (rect != null) {
          toast("去领取");
          rect.click();
          sleep(1000);
          while (1) {
            var 滑动开始计时 = text("滑动开始计时").findOne(3000);
            if (滑动开始计时) {
              toastLog("进入菜鸟裹裹，需要滑动");
              sleep(1000);
              swipe(540, 1800, 540, 1000, 300);
              sleep(2000);
              while (1) {
                var 再浏览 = textContains("再浏览").findOne(1000);
                if (再浏览) {
                  sleep(1000);
                } else {
                  back_to_TaskInterface();
                  break;
                }
              }
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      var 去抽奖 = textContains("去抽奖").findOne(500);
      if (去抽奖) {
        去抽奖.click();
        sleep(15000);
        click(540, 2214);
        sleep(5000);
        while (1) {
          var p = image_coor("./taobao/回到淘宝.png");
          if (p) {
            sleep(1000);
            click(p.x, p.y);
            if (text("关闭").findOne(3000)) { break; }
          } else {
            back();
            sleep(1000);
          }
        }
        sleep(2000);
      }
      // if (find_click(text, "去撸猫", 1000) || find_click(text, "去喂猫", 1000)) {
      //     find_click(textContains, "点击撸猫", 5000);
      //     back_to_TaskInterface();
      // }
      l1 = ['去逛逛', '去浏览', '去完成'];
      for (var i = 0; i < l1.length; i++) {
        while (1) {
          var 去逛逛 = text(l1[i]).findOne(1000);
          if (去逛逛) {
            去逛逛.click();
            if (textContains("全部完成").findOne(2000)) {
              back();
              sleep(1000);
              click(985, 976) //关闭任务窗口
              sleep(1000);
              click(972, 1626) //打开任务窗口
              sleep(1000);
              break;
            } else if (textContains("滑动浏览得").findOne(5000)) {
              sleep(2000);
              swipe(540, 2000, 540, 500, 500);
            } else if (text("启动桌面快捷方式").findOne(1000)) {
              back();
              break;
            } else if (text("继续赚肥料").findOne(1000)) {
              find_click(text, "继续赚肥料", 2000);
              find_click(text, "去签到", 2000);
              loop_find_click(text, "领取", 2000, 4);
              find_click(text, "继续赚肥料", 4000);
            } else if (image_coor("./taobao/进入心愿盒界面2.jpg")) {
              toastLog('进入心愿盒界面');
              click(540, 2217);
              sleep(3000);
              while (1) {
                if (find(textContains, "分享给好友", 1000)) { break };
                back();
                sleep(1000);
                var 回到淘宝 = image_coor("./taobao/回到淘宝.png");
                if (回到淘宝) {
                  toastLog("回到淘宝");
                  click(回到淘宝.x, 回到淘宝.y);
                  sleep(2000);
                } else {
                  break;
                }
              }
              sleep(1000);
            }
            if (textContains("完成").findOne(20000)) {
              back_to_TaskInterface();
              sleep(1000);
            } else {
              toastLog("什么都没有找到，返回");
              back_to_TaskInterface();
              sleep(1000);
            }
          } else {
            break;
          }
        }
      }
      find_click(textContains, "去兑换", 5000);
      // var rect = textContains("去兑换").findOne(500);
      // if (rect != null) {
      //     toast("去兑换");
      //     rect.click();
      // }
    }
    click(989, 800); //关闭任务菜单
  }
}