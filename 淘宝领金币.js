auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率

var height = device.height;
var width = device.width;
var now = new Date();
var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
files.createWithDirs(path);
var text_log = files.read(path);
// toastLog(text_log);
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
  toast("请求截图失败");
  exit();
}
taobao_coins();

function back_home () {
  var num = 0;
  while (1) {
    var auto = id("fab").findOne(500);
    //好像在auto的界面，可以正常启动后续的app
    if (num > 5 || id("workspace").findOne(500)) { //多次后退没有找到auto的界面，那就返回桌面重启
      home();
      sleep(500);
      home();
      var auto桌面 = text("Auto.js").findOne(4000);
      if (auto桌面) {
        auto桌面.click();
        if (auto) { break; }
      } else {
        return back_home();
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
function find_longClick (type, text, time) {
  var object = type(text).findOne(time);
  if (object) {
    var object = object.bounds();
    longClick(object.centerX(), object.centerY());
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
  return;
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

function save_log (text) {
  toastLog(text);
  var now = new Date();
  var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
  files.append(path, "\n" + text + "——" + now);
  return;
}

function backGoldInterface () {
  back_to(text, "今日总能量", 1000);
  return;
}

function back_gold_index () {
  back_to(text, "超级抵钱", 1000);
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



function taobao_coins () {
  try {
    var appRun = currentActivity();
    if (appRun != 'com.taobao.taobao') {
      launch("com.taobao.taobao");
    }
    sleep(1000);
    寻找淘金币图标进入();
    sleep(2000);
    if (find_click(textContains,'签到领金',2000)) {
      toastLog("签到领");
      sleep(1000);
      find_click(textContains, "领取", 2000);
      sleep(2000);
      var coor = image_coor("./taobao/我知道了.png");
      if (coor) {
        click(coor.x, coor.y);
        sleep(1000);
      }
    }
    find_click(text, "我知道了", 5000);
    合力次数 = text("合力").find().length * 2;
    toastLog('当前合力次数：' + 合力次数);
    for (var num = 0; num < 合力次数; num++) {
      find_click(textContains, "合力", 1000);
      toastLog("第" + num + "次点击合力");
      sleep(2000);
    }

    sleep(1000);
    //买东西后有返回的金币
    click(150, 650);

    help_friends();

    sleep(1000);

    if (!find_click(text, "赚金币", 5000)) {
      toastLog("好像没有找到赚金币的入口，后退重启。");
      back_home();

    }
    var 任务界面 = text("今日总能量").findOne(8000);
    if (任务界面) {
      toastLog("进入领水滴界面");
      var 打卡 = text("打卡").findOne(1000);
      if (打卡) {
        打卡.click();
      }
      var num_limit = 0;
      while (num_limit < 2) {
        toastLog("第" + num_limit + "次水滴赚金币");
        var 去施肥 = text("去施肥").findOne(500);
        if (去施肥) {
          sleep(1000);
          去施肥.click();
          if (textContains("施肥一次").findOne(10000)) {
            sleep(2000);
            click(540, 1700);
          }
          backGoldInterface();
          sleep(1000);
        }
        // 获取奖励
        x = 0;
        while (1) {
          if (任务界面) {
            var l_num = 0;
            while (l_num < 5) {
              var 领取奖励 = text("领取奖励").findOne(500);
              if (领取奖励) {
                领取奖励.click();
                sleep(3000);
                l_num += 1;
                toast("第" + l_num + "次领取奖励");
              } else {
                break;
              }
            }
            var 去完成 = text("去完成").findOne(1500);
            if (x != 0) {
              var 去完成 = text("去完成").findOnce(x);
            }
            if (去完成) {
              // sleep(1000);
              var state = 0;
              //有部分内容不需要进入，直接跳过
              var head_text = 去完成.parent().children()[0].children()[0].text();
              var skip_texts = ['消消乐', '充话费', '天猫APP', '桌面', '菜鸟裹裹', '买', '车险', '夺宝', '淘金币免费', '点击商品图片', '逛淘金币新商家专场','小说','金币红包赛','618','猫'];
              for (i = 0; i < skip_texts.length; i++) {
                //检查查找的内容中有没有需要skip的内容，有就跳过
                if (head_text.search(skip_texts[i]) != -1) {
                  x += 1;
                  var state = 1; //状态设定为不点击
                  toastLog(head_text + "跳过");
                  break;
                }

              }
              //检查状态，决定是否点击
              if (state == 0) {
                去完成.click();
                coin_loop();
              }
            } else {
              break;
            }
            sleep(1000);
          } else {
            toastLog("不在任务页面，后退");
            backGoldInterface();
          }
        }
        num_limit += 1;
      }
      sleep(1000);
      toastLog("金币任务结束了");
    } else {
      toastLog("没有进入任务界面,后退重启");
      back();
      return taobao_coins();
    }
    backGoldInterface();
    back_gold_index();
    sleep(1000);
    var patter = text_log.search("淘金币福利中心已完成");
    if (patter != -1) {
      toastLog("淘金币福利中心跳过");
    } else {
      toastLog("淘金币福利中心");
      click(250, 1400);
      if (desc("抽奖").findOne(10000)) {
        var 免费可抽 = desc("免费可抽1次").findOne(2000);
        if (免费可抽) {
          var 免费可抽 = 免费可抽.bounds();
          click(免费可抽.centerX(), 免费可抽.centerY());
          sleep(1000);
        }
        back();
        sleep(1000);
        save_log("淘金币福利中心已完成");
      }
    }
    sleep(2000);
    toastLog("浏览好店送金币");
    click(90, 1400);
    if (desc("浏览好店送金币").findOne(5000)) {
      toastLog("进入浏览好店送金币");
      sleep(1000);
      var num = 0;
      while (1) {
        var 好店签到领金币 = descContains("10秒+10").findOne(2000);
        if (好店签到领金币) {
          var 好店签到领金币 = 好店签到领金币.bounds();
          if (好店签到领金币.centerY() > 2300) {
            swipe(540, 2000, 540, 1000, 300); //下划
            continue;
          }
          click(好店签到领金币.centerX(), 好店签到领金币.centerY());
          text("浏览10秒送金币").findOne(5000);
          while (1) {
            var 立即领 = textContains("立即领").findOne(1000);
            if (立即领) {
              var 立即领 = 立即领.bounds();
              click(立即领.centerX(), 立即领.centerY());
              sleep(1000);
              back();
            } else { break; }
          }
          sleep(9000);
          var 关注 = text("订阅+10").findOne(1000);
          if (关注) {
            var 关注 = 关注.bounds();
            click(关注.centerX(), 关注.centerY());
            sleep(1000);
          }
          back();
          sleep(1000);
        } else {
          break;
        }
      }
      toastLog("好店签到送金币结束");
      back();
      sleep(1000);
    } else {
      toastLog("没有进入浏览好店送金币的界面");
      back_home();
    }


  } catch (err) {
    alert(err);
    back_home();
  } finally {
    back_home();
    return;
  }
}
function 寻找淘金币图标进入 () {
  while (1) {
    toastLog("开始淘金币");
    var 首页 = desc("首页").findOne(3000);
    if (首页) {
      var 首页 = 首页.bounds();
      click(首页.centerX(), 首页.centerY());
      sleep(1000);
      var next_click = desc("领淘金币").findOne(1000);
      if (next_click) {
        toastLog("找到领淘金币了");
        next_click = next_click.bounds();
        click(next_click.centerX(), next_click.centerY());
        if (!text("超级抵钱").findOne(5000)) {
          toastLog("没有进入");
          continue;
        } else {
          toastLog("已经进入淘金币");
          break;
        }
      }
    } else {
      toastLog("不在首页,后退重启！");
      while (!desc("首页").findOne(1000)) { back(); }
      return taobao_coins();
    }
  }
}
function help_friends () {
  toastLog(("开始偷金币"));
  click(980, 1200);
  var num = 0;
  var 偷金币界面 = text("助力赚金币，合力领更多！共建和谐金币小镇").findOne(4000);
  while (1) {
    if (偷金币界面) {
      sleep(2000);
      l_1 = ['去助力', "喊Ta回来"]
      for (var i = 0; i < l_1.length; i++) {
        x = 0;
        while (1) {
          if (x > 2) { x = 0; }
          if (x != 0) {
            var 去助力 = text(l_1[i]).findOnce(x);
          } else {
            var 去助力 = text(l_1[i]).findOne(1000);
          }
          if (去助力) {
            去助力.click();
            if (text("本月互助比拼").findOne(10000)) {
              sleep(1000);
              var 助力 = text("立即助力").findOne(500);
              if (!助力) {
                var 助力 = text(l_1[i]).findOne(500);
              }
              if (助力) {
                var 助力 = 助力.bounds();
                click(助力.centerX(), 助力.centerY() - 100);
              } else {
                x += 1;
              }
              sleep(1000);
              back();
              sleep(1000);
              偷金币界面;
              sleep(1000);
            } else {
              toastLog("未知原因，还未进入他人庄园助力");
              while (!偷金币界面) { back(); }
              sleep(1000);
            }
          } else {
            break;
          }
        }
      }
      // while (1) {
      //   var 邀请 = text("邀请Ta").findOne(1000);
      //   if (邀请) {
      //     邀请.click();
      //     sleep(1000);
      //   } else {
      //     break;
      //   }
      // }
      loop_find_click(text, "邀请Ta", 500, 4);
      if (num > 0) {
        toastLog("前" + num + "页好友已检查完，关闭！");
        save_log("今天淘金币全部好友找遍了！");
        // click("关闭");
        back();
        sleep(2000);
        break;
      }
      swipe(540, 2000, 540, 900, 200); //下划
      if (textContains("个好友可以助力").findOne(500)) {
        while (1) {
          var 点开好友列表 = textContains("个好友可以助力").findOne().bounds();
          if (点开好友列表.centerY() > 1400) {
            swipe(540, 1800, 540, 1000, 200); //下划
            sleep(500);
          } else {
            click(点开好友列表.centerX(), 点开好友列表.centerY());
            num += 1;
            break;
          }
        }
      } else {
        // toastLog("全部好友都找遍了！");
        save_log("今天淘金币全部好友找遍了！");
        back();
        sleep(2000);
        break;
      }
    } else {
      toastLog("未在偷金币界面");
      exit();
    }
  }
  return;
}
function coin_loop () {
  sleep(1000);
  if (text("今日总能量").findOne(1000)) {
    toastLog("还在任务界面");
    return;
  }
  sleep(2000);
  swipe(540, 2000, 540, 1500, 500);
  if (descContains("添加").findOne(1000)) {
    toastLog("进入添加好友界面");
    click(200, 950);
    click(540, 950);
    click(800, 950);
    sleep(1000);
    backGoldInterface();
    // } else if (text("充值中心").findOne(200)) {
    //     toastLog("进入了充值中心");
    //     backGoldInterface();
    //     x += 1;

    // } else if (textContains("桌面").findOne(200)) {
    //     toastLog("进入了启动桌面小插件的任务");
    //     backGoldInterface();
    //     x += 1;
  } else if (textContains("启动任务").findOne(200)) {
    toastLog("进入了启动桌面的任务");
    home();
    home();
    var 领淘金币 = desc("领淘金币").findOne(3000);
    if (领淘金币) {
      领淘金币.click();
      sleep(2000);
    }
    return taobao_coins();
  } else if (id("scan_icon").findOne(1000)) {
    id("scan_icon").findOne().click();
    sleep(2000);
    var 继续上传 = text("继续上传").findOne(2000);
    if (继续上传) {
      继续上传.click();
    }
    var 扫一扫完成 = text("浏览本页面").findOne(5000);
    if (扫一扫完成) {
      sleep(11000);
      backGoldInterface();
    } else {
      toastLog("未找到扫一扫");
      back();
    }
  } else if (text("历史搜索").findOne(1000)) {
    toastLog("进入搜索领金币");
    var 展开更多搜索历史 = desc("展开更多搜索历史").findOne(1000);
    if (展开更多搜索历史) {
      var 展开更多搜索历史 = 展开更多搜索历史.bounds();
      click(展开更多搜索历史.centerX(), 展开更多搜索历史.centerY());
      sleep(500);
    }
    click(40, 400); //点第一个历史搜索
    sleep(12000);
    backGoldInterface();
    sleep(2000);

    // } else if (find_click(textContains, "收下", 500)) {
    //   sleep(10000);
    //   backGoldInterface();
    // } else if (find_click(textContains, "领取", 500) || find_click(descContains, "领取", 500)) {
    //   toastLog("领取");
    //   sleep(8000);
    //   backGoldInterface();
  } else if (find_click(textContains, "我的猫", 500)) {
    toastLog("我的猫");
    find_click(textContains, "领取", 1000);
    sleep(1000);
    find_click(text, "我知道啦！", 1000);
    sleep(1000);
    find_click(textContains, "喂猫升级", 1000);
    sleep(1000);
    backGoldInterface();
  } else if (find_click(text, "训练", 500)) {
    toastLog("训练");
    sleep(1000);
    backGoldInterface();
  } else if (find(textContains, "继续滑动", 500)) {
    toastLog("需要不断下滑");
    for (var i = 1; i < 20; i++) {
      swipe(540, 1000, 540, 500, 300);
      sleep(1500);
    }
    backGoldInterface();
  } else if (textContains("滑动浏览").findOne(1000) || descContains("滑动浏览").findOne(1000)) {
    sleep(1000);
    toastLog("滑动浏览");
    swipe(540, 2000, 540, 1500, 500);
    if (textContains("任务完成").findOne(20000)) {
      toastLog("滑动浏览得奖励已完成");
    }
    backGoldInterface();
  } else if (text("我要自拍").findOne(500)) {
    toastLog("我要自拍");
    x += 1;
    back();
    sleep(1000);
    back();
  } else if (text("当前成就点享以下权益").findOne(500)) {
    toastLog("领成就点数");
    swipe(540, 1000, 540, 2000, 300);
    if (find_click(text, "成就礼包", 2000)) {
      sleep(1000);
      find_click(text, "我收下了", 4000);
    }
    swipe(540, 1800, 540, 1000, 300);
    sleep(500);
    while (1) {
      var coor = image_coor("./taobao/成就领取奖励.jpg");
      if (coor) {
        toastLog("目标坐标是:" + coor.x + "," + coor.y);
        if (coor.y > 2100) {
          swipe(540, 1800, 540, 1500, 500);
          continue;
        } else if (coor.y < 500) {
          swipe(540, 1200, 540, 1500, 500);
          continue;
        } else {
          toastLog("点击成就领取奖励");
          click(coor.x, coor.y);
          sleep(1000);
        }
      } else {
        toastLog("没有找到成就奖励，退出");
        break;
      }
    }
    swipe(540, 1000, 540, 2000, 500);
    if (!find_click_position(text, "月度账单", 2000, 0, 2300)) {
      x += 1;
    }
    sleep(1000);
    backGoldInterface();
  } else if (image_coor("./taobao/前进.png")) {
    toastLog("进入了淘宝人生逛街");
    sleep(2000);
    var num_limit = 0;
    while (num_limit < 10) {
      var coor = image_coor("./taobao/前进.png");
      if (coor) {
        click(coor.x, coor.y);
        sleep(1000);
        back();
        sleep(1000);
        break;
      } else {
        num_limit += 1;
        sleep(500);
      }
    }
    x += 1;
  } else if (textContains("关注我呀").findOne(1000)) {
    toastLog("淘宝浏览出来关注的了");
    click(540, 400);
    swipe(540, 300, 540, 600, 500);
    toastLog("关注主播划掉,滑动浏览得奖励");
    swipe(540, 2000, 540, 1500, 500);
    if (textContains("任务完成").findOne(20000)) {
      toastLog("滑动浏览得奖励已完成");
    }
    backGoldInterface();
  } else {
    toastLog("没有找到设定内容，等待15秒")
    sleep(15000);
  }
  while (1) {
    if (text("今日总能量").findOne(1000)) {
      break;
    } else {
      toastLog("还未退回任务界面！");
      back();
      sleep(1000);
      var coor = image_coor("./taobao/消消乐-回到淘宝.png")
      var 回到淘宝 = image_coor("./taobao/回到淘宝.png");
      if (coor) {
        toastLog("消消乐-回到淘宝");
        x += 1;
        click(coor.x, coor.y);
        sleep(1000);
      } else if (text("签到领红包").findOne(1000)) {
        toastLog("进入了淘宝特价版");
        backGoldInterface();
      } else if (text("加入购物车").findOne(1000)) {
        toastLog("进入了淘宝特价版");
        backGoldInterface();
      } else if (回到淘宝) {
        toastLog("回到淘宝");
        click(回到淘宝.x, 回到淘宝.y);
        sleep(1000);
      }
    }
  }
  return;
}