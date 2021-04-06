auto.waitFor();
var height = device.height;
var width = device.width;
// toastLog("本设备的分辨率为，\n宽："+device.width+"\n长："+device.height);//输出设备的分辨率
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率
var now = new Date();
var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
files.createWithDirs(path);
var text_log = files.read(path);
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
  toast("请求截图失败");
  exit();
}
back_home();
SignIn_jingdong(); //京东
SignIn_Sfacg(); //sf小说签到
Sign_autonavi(); //高德地图签到
SignIn_Alipay(); //支付宝签到领积分
SignIn_Alibaba(); //阿里巴巴领元宝
SignIn_idlefish(); //闲鱼签到
SignIn_Mommypocket(); //美物清单
SignIn_Netease_Cloudmusic(); //网易云音乐
SignIn_Fandengreader(); //樊登读书


// SignIn_ximalaya(); //喜马拉雅
// SignIn_Alibaba_AlipayGphone(); //支付宝阿里巴巴领元宝
// SignIn_Baidu_netdisk(); //百度网盘
// SignIn_Smzdm(); //什么值得买
// Signin_TaobaoPhone(); //领取淘宝的话费
// SignIn_Unicom(); //联通营业厅
// SignIn_Baidu_Wenku(); //百度文库


function save_log (text) {
  toastLog(text);
  var now = new Date();
  var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
  files.append(path, "\n" + text + "——" + now);
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

function SignIn_ximalaya () {
  try {
    var patter = text_log.search("喜马拉雅已签到");
    if (patter != -1) {
      toastLog("喜马拉雅跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != "com.ximalaya.ting.android") {
      launch("com.ximalaya.ting.android");
      sleep(1000);
    }
    find_click(id, "host_close_firework_new", 4000); //每日礼包
    find_click(text, "稍后更新", 2000);
    find_click(text, "知道了", 2000);
    find_click(id, "host_close_firework", 2000); //跳过广告

    back_to(text, "首页", 1000);

    if (find_click(text, "账号", 2000)) {
      if (find_click(id, "main_myspace_point_fl", 5000)) {
        if (find(text, "日常任务", 4000)) {
          find_click(text, "我知道了", 1000);
          loop_find_click_position(text, "领取", 1000, 1500, 2300, 3);
          if (find(text, "已完成", 2000)) {
            save_log("喜马拉雅已签到");
          }
          return;
        }
      } else {
        toastLog("未找到用户头像，重启");
        back_home();
        return SignIn_ximalaya();
      }
    } else {
      toastLog("喜马拉雅未启动在桌面，重启");
      back_home();
      return SignIn_ximalaya();
    }
  } catch (err) {
    toastLog(err);
  } finally {
    back_home();
    return;
  }
}

function SignIn_Baidu_Wenku () {
  try {
    var patter = text_log.search("百度文库今日已签");
    if (patter != -1) {
      toastLog("百度文库跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != "com.baidu.wenku") {
      launch("com.baidu.wenku");
      sleep(1000);
    }
    sleep(3000);
    var 签到有奖 = text("签到打卡").findOne(5000);
    if (签到有奖) {
      sleep(1000);
      var 签到有奖 = 签到有奖.bounds();
      click(签到有奖.centerX(), 签到有奖.centerY());
      while (1) {
        if (textContains("签到并领取").findOne(4000)) {
          textContains("签到并领取").findOne().click();
          if (text("身份验证").findOne(4000)) {
            alert("百度今天需要身份验证，请手动验证！");
          }
          textContains("已连续签到").findOne();
          // toastLog("开始百度文库安全验证！");
          // gesture(2000, [0.212 * width, 0.601 * height], [0.812 * width, 0.603 * height]); //安全验证拖至最右
          // save_log("百度文库已安全验证！");
          // if (id("iv_close").findOne()) {
          id("iv_close").findOne().click();
          save_log("文库今日已签");
          break;
          // } 
        } else if (textContains("已连续签到").findOne(5000)) {
          save_log("百度文库今日已签");
          break;
        } else if (textContains("点击重试").findOne(2000)) {
          var 点击重试 = textContains("点击重试").findOne(2000).bounds();
          click(点击重试.centerX(), 点击重试.centerY());
        } else {
          back();
          sleep(2000);
          click(签到有奖.centerX(), 签到有奖.centerY());
        }
      }
      // var 拆红包=text("拆红包").findOne(3000);
      // if (拆红包){
      //     拆红包.click();
      // }else{
      //     save_log("百度文库今日已签");
      //     return;
      // }
      var 已连续签到 = textContains("已连续签到").findOne(2000);
      if (已连续签到) {
        toastLog("百度文库已连续签到");
      } else if (text("查看签到").findOne(2000)) {
        save_log("百度文库今天已经签到过了");
      } else {
        alert("没有找到已连续签到");
      }
    } else {
      toastLog("未找到签到有奖，重启");
      back();
      return SignIn_Baidu_Wenku();
    }
  } catch (err) {
    toastLog(err);
  } finally {
    home();
    return;
  }
}

function Signin_TaobaoPhone () {
  try {
    var patter = text_log.search("淘宝话费已经领取");
    if (patter != -1) {
      toastLog("淘宝话费跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != "com.taobao.taobao") {
      launch("com.taobao.taobao");
      sleep(1000);
    }
    while (1) {
      var 首页 = desc("首页").findOne(3000);
      if (首页) {
        var 首页 = 首页.bounds();
        click(首页.centerX(), 首页.centerY());
        if (desc("充值中心").findOne(1000)) {
          break;
        }
      } else {
        while (!desc("首页").findOne(1000)) { back(); }
      }
    }
    while (1) {
      var 充值中心 = desc("充值中心").findOne(5000);
      if (充值中心) {
        toastLog("找到充值中心了");
        sleep(1000);
        var 充值中心 = 充值中心.bounds();
        click(充值中心.centerX(), 充值中心.centerY());
        toastLog("找到充值中心，点击");
        break;
      } else {
        toastLog("未找到充值中心，向左移");
        var 领淘金币 = desc("领淘金币").findOne(1000).bounds();
        swipe(领淘金币.centerX() + 300, 领淘金币.centerY(), 领淘金币.centerX(), 领淘金币.centerY(), 300);
      }
    }
    if (find_click(desc, "￥", 2000)) {
      find_click(text, "立即收下", 4000)
      save_log("淘宝话费已经领取");
      back_home();
      return;
    }
    // var 继续赚 = desc("继续领").findOne(2000);
    // if (继续赚) {
    //     save_log("淘宝话费已经领取");
    //     back_home();
    //     return;
    // }
    var 去领取 = desc("去兑换").findOne(3000);
    if (!去领取) {
      var 去领取 = desc("去领取").findOne(1000);
    }
    if (去领取) {
      toast("进入签到领");
      var 去领取 = 去领取.bounds();
      click(去领取.centerX(), 去领取.centerY());
      sleep(2000);
      var 签到领 = text("立即领取").findOne(2000);
      if (!签到领) {
        var 签到领 = text("立即收下").findOne(2000);
      }
      if (签到领) {
        toastLog("进入签到领界面");
        sleep(1000);
        var 签到领 = 签到领.bounds();
        click(签到领.centerX(), 签到领.centerY());
        sleep(1000);
        save_log("淘宝话费已经领取");
      }
    } else {
      toastLog("未找到去领取!重启!");
      back_home();
      return Signin_TaobaoPhone();
    }
  } catch (err) {
    toastLog(err);
    return Signin_TaobaoPhone();
  } finally {
    back_home();
    return;
  }
}
// 进入京东页面
function goToJD () {
  while (1) {
    if (find_click(text, "领京豆", 1000)) {
      toastLog("点击领京豆");
      sleep(3000);
    }
    if (find(text, '购物返豆', 1000)) {
      return true;
    } else {
      toastLog("没有在签到页面，后退！");
      back();
    }
  }
}
function SignIn_jingdong () {
  try {
    var appRun = currentPackage();
    if (appRun != "com.jingdong.app.mall") {
      launch("com.jingdong.app.mall");
      sleep(1000);
    }
    toastLog("打开京东");
    var 首页 = desc("首页").findOne(1000);
    if (!首页) {
      toastLog("没有找到首页，重启!");
      back();
      return SignIn_jingdong();
    }
    if (goToJD()) {
      if (find_click(text, "签到领京豆", 1000)) {
        sleep(2000);
        goToJD();
      }
      //种豆得豆
      click(955, 762);
      if (!find(text, "豆苗成长值", 3000)) {
        goToJD();
      }
      l1 = ["1"]
      for (i = 0; i < l1.length; i++) {
        while (1) {
          var 逛逛会场 = text(l1[i]).depth(3).findOne(1500);
          if (逛逛会场) {
            逛逛会场 = 逛逛会场.bounds();
            click(逛逛会场.centerX(), 逛逛会场.centerY());
            sleep(1000);
            back_to(text, "豆苗成长值", 1000);
          } else { break; }
        }
      }
      var 营养液坐标 = [
        [420, 850],
        [580, 780],
        [750, 900]
      ];
      //自己的营养液点击三次
      for (j = 0; j < 3; j++) {
        for (i = 0; i < 营养液坐标.length; i++) {
          click(营养液坐标[i][0], 营养液坐标[i][1]);
        }
      }
      toastLog("检查朋友的营养液");
      swipe(540, 1800, 540, 1500, 500);
      sleep(500);

      list1 = ["./images/京东朋友2豆.png", "./images/京东朋友3豆.png"];
      var num_limit = 0;
      for (i = 0; i < list1.length; i++) {
        while (num_limit < 5) {
          var coor = image_coor(list1[i]);
          if (coor) {
            click(coor.x, coor.y);
            var 朋友界面 = text("你收取Ta").findOne(5000);
            if (朋友界面) {
              click(540, 800);
              sleep(500);
              back();
              sleep(500);
            }
            num_limit += 1;

          } else { toastLog("没有符合条件的营养液可以收取了"); break; }
        }
      }
      sleep(1000);
      swipe(540, 1200, 540, 1700, 500);
      //自己的营养液点击三次
      for (j = 0; j < 3; j++) {
        for (i = 0; i < 营养液坐标.length; i++) {
          click(营养液坐标[i][0], 营养液坐标[i][1]);
        }
      }

      //返回任务界面
      goToJD();
      //检查要不要做其他的任务
      var patter = text_log.search("京东今天已领豆");
      if (patter == -1) {
        //转盘抽京豆
        click(800, 1320);
        if (find(text, "规则", 5000)) {
          sleep(1000);
          click(554, 1100);
          back();
        } else {
          toastLog("没有进入京东领豆页面！");
          goToJD();
        }

        //进店领豆
        click(283, 1323);
        sleep(1000);
        var num = 0
        while (1) {
          if (find_click(text, "进店+2京豆", 2000)) {
            num += 1;
            sleep(1000);
            back();
            sleep(1000);
          } else if (num > 3) {
            break;
          } else {
            break;
          }
        }
        goToJD();

        //摇京豆
        click(964, 1308);
        if (find(text, "摇京豆", 5000)) {
          sleep(2000);
          click(540, 2100);
          sleep(1000);
          back();
        } else {
          toastLog("没有进入摇京豆页面！");
          goToJD();
        }
      }
      sleep(1000);
      //双签领豆
      goToJD();
      click(100, 1250);//点击进入双签领豆界面
      sleep(2000);
      if (find_click(text, "双签领奖励", 5000)) {
        sleep(2000);
        click(900, 1050); //去京东金融app签到
        sleep(2000);
        if (find_click(text, "双签领奖励", 1000)) {
          toastLog("还停留在这个页面，可能是因为已经领取今日奖励了");
          find_click(text, "完成双签领取", 3000);
          press(877, 1279, 300);
          save_log("京东今天已领豆！");
          goToJD();
        } else {
          sleep(3000);
          while (1) {
            if (find(text, "每日签到", 10000)) {
              if (find_click(textContains, "签到领", 3000) || find_click(textContains, "签到并", 1000)) {
                find_click(text, "立即获得", 1000);
                find_click(text, "立即收下", 1000);
                find_click(text, "去完成", 1000);
                back_to(text, '购物返豆', 1000);
                sleep(2000);
                click(100, 1250);//点击进入双签领豆界面
                // find_click(text, "双签领豆", 1000);
                find_click(text, "完成双签领取", 3000);
                press(877, 1279, 300);
                goToJD();
                break;
              } else {
                toastLog("没有找到签到领钢镚,后退重来");
                back();
                // back_to(text, "每日签到", 1000);
                find_click(text, "每日签到", 1000);
              }
            } else {
              toastLog("没有找到每日签到");
            }
          }
        }
      }
      // 升级赚京豆
      goToJD();
      click(540, 1300);
      sleep(2000);
      while (1) {
        if (find_click(text, '去完成', 2000)) {
          sleep(5000);
          back();
          sleep(1000);
          var coor = image_coor("./images/拆开盲盒.jpg");
          if (coor) {
            toastLog("有盲盒，点击");
            click(coor.x, coor.y);
            sleep(5000);
            var coor = image_coor("./images/开心收下.jpg");
            if (coor) {
              click(coor.x, coor.y);
              goToJD();
            } else {
              back();
              goToJD();
              click(540, 1300);
            }
          }
        } else {
          toastLog("升级赚京豆结束");
          break;
        }
      }

      //完成全部任务，得任务奖励
      find_click(text, "领取京豆奖励", 1000);
    } else {
      toastLog("未找到领京豆，重启");
      back_home();
      return SignIn_jingdong();
    }
  } catch (err) {
    toastLog(err);
    return SignIn_jingdong();
  } finally {
    back_home();
    return;
  }
}

function SignIn_Baidu_netdisk () {
  try {
    var patter = text_log.search("百度网盘");
    if (patter != -1) {
      toastLog("百度网盘跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != "com.baidu.netdisk") {
      launch("com.baidu.netdisk");
      sleep(1000);
    }
    var 我的 = text("我的").findOne(6000);
    if (我的) {
      var 我的 = 我的.bounds();
      click(我的.centerX(), 我的.centerY());
      sleep(1000);
      var 百度网盘积分界面 = textContains("待领取").findOne(6000);
      if (百度网盘积分界面) {
        var 百度网盘积分界面 = 百度网盘积分界面.bounds();
        click(百度网盘积分界面.centerX(), 百度网盘积分界面.centerY());
        // var 签到 = text("可兑换好礼").findOne(10000);
        // if (签到) {
        //     var 签到 = 签到.bounds();
        //     click(签到.centerX(), 签到.centerY());
        var 马上观看 = textContains("看广告").findOne(5000);
        if (马上观看) {
          var 马上观看 = 马上观看.bounds();
          click(马上观看.centerX(), 马上观看.centerY());
          sleep(40000);
          var 了解一下 = text("了解一下").findOne();
          // var 倒计时 = id("video_duration").findOne();
          if (了解一下) {
            sleep(1000);
            var 关闭 = id("btn_close").findOne(5000);
            if (关闭) {
              var 关闭 = 关闭.bounds();
              click(关闭.centerX(), 关闭.centerY());
              sleep(1000);
              save_log("百度网盘已完成！");
            }
          }
        }
        // } else {
        //     toastLog("没有签到标识！");
        //     back_home();
        //     return SignIn_Baidu_netdisk();
        // }
      } else {
        save_log("百度网盘没有找到待领取,可能是已完成！");
        back_home();
        return;
      }
    } else {
      toastLog("百度网盘未找到我的界面，重启");
      back_home();
      return SignIn_Baidu_netdisk();
    }
  } catch (err) {
    toastLog(err);
    return SignIn_Baidu_netdisk();
  } finally {
    home();
    back_home();
    return;
  }
}

function SignIn_Fandengreader () {
  try {
    var patter = text_log.search("樊登读书已签到");
    if (patter != -1) {
      toastLog("樊登读书跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != "io.dushu.fandengreader") {
      launch("io.dushu.fandengreader");
      sleep(1000);
    }
    var 广告关闭 = id("btn_close").findOne(5000);
    if (广告关闭) {
      var 广告关闭 = 广告关闭.bounds();
      click(广告关闭.centerX(), 广告关闭.centerY());
    }
    var 我的 = text("我的").findOne(5000);
    if (我的) {
      var 我的 = 我的.bounds();
      click(我的.centerX(), 我的.centerY());
      sleep(1000);
      if (find_click(text, "每日签到", 3000)) {
        sleep(1000);
        save_log("樊登读书已签到");
      } else {
        return SignIn_Fandengreader();
      }
    } else {
      toastLog("没有进入樊登读书，重启");
      back();
      return SignIn_Fandengreader();
    }
  } catch (err) {
    toastLog(err);
    return SignIn_Fandengreader();
  } finally {
    back_home();
    return;
  }
}

function SignIn_Netease_Cloudmusic () {
  try {
    var patter = text_log.search("网易云音乐已签到");
    if (patter != -1) {
      toastLog("网易云音乐跳过");
      return;
    }
    var appRun = currentPackage();
    if (appRun != "com.netease.cloudmusic") {
      launch("com.netease.cloudmusic");
      sleep(1000);
    }
    find_click(text, "不用，流量够用", 2000);
    back_to(text, '每日推荐', 1000);
    click(100, 150)
    if (find(desc, '抽屉菜单', 5000)) {
      sleep(1000);
      if (find_click(text, '云贝中心', 2000)) {
        sleep(2000);
        if (find(text, '赚云贝', 5000)) {
          toastLog("进入云贝中心了");
          sleep(1000);
          loop_find_click(text, '已完成', 1000, 4);
        } else {
          toastLog("没有进入云贝中心");
          back();
        }
      } else if (text("免费兑黑胶VIP").findOne(2000)) {
        save_log("网易云音乐已签到");
        home();
      }
    } else {
      toastLog("未找到网易云音乐主界面，重启");
      swipe(540, 1500, 540, 2000, 500);
      back();
      return SignIn_Netease_Cloudmusic();
    }
  } catch (err) {
    toastLog(err);
    return SignIn_Netease_Cloudmusic();
  } finally {
    back_home();
    return;
  }
}

function SignIn_Mommypocket () {
  try {
    var patter = text_log.search("美物清单已完成");
    if (patter != -1) {
      toastLog("美物清单跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != "com.shouqu.mommypocket") {
      launch("com.shouqu.mommypocket");
      sleep(1000);
    }
    //添加广告关闭的按钮
    var 广告 = id("push_popup_close").findOne(2000);
    var 通知关闭 = id("system_notice_item_close").findOne(1000);
    var 链接查询 = id("open_tao_password_dialog_close_btn").findOne(1000);
    if (广告) {
      toastLog("有广告！");
      var 广告 = 广告.bounds();
      click(广告.centerX(), 广告.centerY());
      sleep(1000);
    } else if (通知关闭) {
      通知关闭.click();
      sleep(1000);
    } else if (链接查询) {
      链接查询.click();
      sleep(1000);
    }
    var 通知关闭 = id("system_notice_item_close").findOne(2000);
    if (通知关闭) {
      通知关闭.click();
      sleep(1000);
    }

    // var 福利 = text("福利").findOne(2000);
    // if (福利) {
    //   福利.click();
    //   toastLog("已经找到福利，成功启动美物清单！");
    //   sleep(2000);
    //   save_log("美物清单已完成！");
    //   home();
    //   return;
    // } else {
    //   toastLog("美物清单未找到我的主界面，重启");
    //   // back_home();
    //   return SignIn_Mommypocket();
    // }
    save_log("美物清单已完成！");
  } catch (err) {
    toastLog(err);
    // back_home();
    return SignIn_Mommypocket();
  } finally {
    back_home();
    return;
  }
}

function SignIn_Smzdm () {
  try {
    var patter = text_log.search("什么值得买");
    if (patter != -1) {
      toastLog("什么值得买跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != "com.smzdm.client.android") {
      launch("com.smzdm.client.android");
      sleep(1000);
    }
    var 我的 = text("我的").findOne(5000);
    if (我的) {
      var 我的 = 我的.bounds();
      click(我的.centerX(), 我的.centerY());
      sleep(1000);
      if (text("收藏").findOne(5000)) {
        toastLog("进入个人主页了");
      } else {
        toastLog("未进入个人主页，重启");
        back();
        return SignIn_Smzdm();
      }
      while (1) {
        var 签到 = text("签到领奖").findOne(4000);
        if (签到) {
          toastLog("签到找到了");
          签到.click();
          sleep(1000);
          click(540, 2000);
          text("已连续签到").findOne(5000);
          while (!text("我的").findOne(1000)) { back(); }
        } else if (textContains("已签").findOne(1000)) {
          save_log("今天什么值得买已经签到");
          // back_home();
          return;
        } else {
          toastLog("未找到签到标识");
          back_home();
          return SignIn_Smzdm();
        }
      }
    } else {
      toastLog("什么值得买未找到我的主界面，重启");
      back_home();
      return;
    }
  } catch (err) {
    toastLog(err);
    back_home();
  } finally {
    back_home();
    return;
  }
}

function SignIn_Alibaba () {
  try {
    var patter = text_log.search("阿里巴巴元宝已经领取");
    if (patter != -1) {
      toastLog("阿里巴巴跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != 'com.alibaba.wireless') {
      launch("com.alibaba.wireless");
      sleep(1000);
    }
    sleep(4000);
    var 赚元宝 = text("赚元宝").findOne(7000);
    if (赚元宝) {
      toastLog("找到赚元宝了");
      sleep(2000);
      var 赚元宝 = 赚元宝.bounds();
      press(赚元宝.centerX(), 赚元宝.centerY(), 600);
      var 做任务赚元宝 = text("做任务赚元宝").findOne(10000);
      if (做任务赚元宝) {
        sleep(1000); //有时候会出现抽奖
        var 做任务赚元宝 = 做任务赚元宝.bounds();
        click(做任务赚元宝.centerX(), 做任务赚元宝.centerY());
        if (text("今日已领取").findOne(1000)) {
          save_log("阿里巴巴已搜索领元宝");
          return;
        } else {
          toastLog("阿里巴巴今日未领取，去搜好货");
          while (1) {
            // find_click(text,'去搜好货',2000)
            sleep(1000);
            click(800, 1000);
            sleep(1000);
            var 搜索历史 = text("大家都在搜").findOne(4000);
            if (搜索历史) {
              sleep(1000);
              click(150, 380); //第一条搜索历史
              sleep(2000);
              while (!text("做任务赚元宝").findOne(500)) {
                back();
              }
              save_log("阿里巴巴元宝已经领取过了");
              break;
            } else {
              toastLog("未找到搜索历史");
              while (!text("做任务赚元宝").findOne(500)) {
                back();
              }
              sleep(1000);
              //return SignIn_Alibaba();
            }
          }
        }
        var 领10个元宝 = text("领10个元宝").findOne(2000);
        if (领10个元宝) {
          sleep(1000);
          var 领10个元宝 = 领10个元宝.bounds();
          click(领10个元宝.centerX(), 领10个元宝.centerY());
          sleep(1000);
          save_log("阿里巴巴元宝已经领取");
        }
      } else {
        toastLog("未进入签到界面，后退重启！");
        while (!text("赚元宝").findOne(500)) {
          back();
        }
        return SignIn_Alibaba();
      }
    } else {
      toastLog("未找到赚元宝，重启");
      back_home();
      return;
    }
  } catch (err) {
    toastLog(err);
    back_home();
    return SignIn_Alibaba();
  } finally {
    back_home();
    return;
  }
}

function SignIn_Alibaba_AlipayGphone () {
  try {
    var patter = text_log.search("支付宝里的阿里巴巴已完成");
    if (patter != -1) {
      toastLog("支付宝里的阿里巴巴跳过");
      return;
    }
    sleep(1000);
    //支付宝里的阿里巴巴
    var appRun = currentPackage();
    if (appRun != 'com.eg.android.AlipayGphone') {
      launch("com.eg.android.AlipayGphone");
      sleep(1000);
    }
    var 首页 = text("首页").findOne(5000);
    if (首页) {
      var 首页 = 首页.bounds();
      click(首页.centerX(), 首页.centerY());
      sleep(1000);
    } else {
      toastLog("支付宝没有找到首页图标！后退重启！");
      back_home();
      return SignIn_Alibaba_AlipayGphone();
    }
    var 我的小程序 = text("我的小程序").findOne(4000);
    if (我的小程序) {
      var 我的小程序 = 我的小程序.bounds();
      click(我的小程序.centerX(), 我的小程序.centerY());
      sleep(2000);
      var 阿里巴巴1 = text("阿里巴巴1…").findOne(5000);
      if (阿里巴巴1) {
        var 阿里巴巴1 = 阿里巴巴1.bounds();
        click(阿里巴巴1.centerX(), 阿里巴巴1.centerY());
        toastLog("已进入支付宝阿里巴巴");
        sleep(2000);
        var num = 0;
        while (num < 5) {
          var coor = image_coor("./images/支付宝阿里巴巴进货礼包.png");
          if (coor) {
            toastLog("有进货礼包，点击领取");
            click(coor.x, coor.y);
            sleep(2000);
            var num_2 = 0;
            while (num_2 < 5) {
              var coor = image_coor("./images/进货礼包关闭.png");
              if (coor) {
                toastLog("进货礼包关闭");
                click(coor.x, coor.y);
                sleep(1000);
                break;
              } else {
                num_2 += 1;
                sleep(500);
              }
            }
            break;
          } else {
            sleep(1000);
            num += 1;
          }
        }
        var 签到抢红包 = text("签到抢红包").findOne(2000);
        if (签到抢红包) {
          toastLog("签到抢红包");
          var 签到抢红包 = 签到抢红包.bounds();
          click(签到抢红包.centerX(), 签到抢红包.centerY());
          sleep(2000);
          var 领元宝界面2 = text("网页由 show.1688.com 提供").findOne(10000);
          if (领元宝界面2) {
            toastLog("领元宝界面2");
            sleep(2000);
            var coor = image_coor("./taobao/赚更多元宝.png");
            if (coor) {
              toastLog("赚更多元宝");
              click(coor.x, coor.y);
              sleep(1000);
              // click(900, 976); //点击去逛逛
              swipe(540, 2000, 540, 1000, 300);
              sleep(1000);
              var 点击坐标 = [
                [150, 1600],
                [540, 1600],
                [800, 1600],
              ]
              for (var i = 0; i < 点击坐标.length; i++) {
                toastLog("现在点击的坐标是" + 点击坐标[i]);
                click(点击坐标[i][0], 点击坐标[i][1]);
                sleep(2000);
                back();

                sleep(1000);
              }
              sleep(1000);
            }
          }
          save_log("支付宝里的阿里巴巴已完成！");
        }
      } else {
        toastLog("未找到阿里巴巴1，重启");
        back_home();
        return SignIn_Alibaba_AlipayGphone();
      }
    } else {
      toastLog("未找到我的小程序，重启");
      back_home();
      return SignIn_Alibaba_AlipayGphone();
    }
  } catch (err) {
    toastLog(err);
    return SignIn_Alibaba_AlipayGphone();
  } finally {
    back_home();
    return;
  }
}

function alipay_back () {
  while (!text("理财").findOne(1000)) { back(); } //后退至主页
}

function SignIn_Alipay () {
  try {
    // var patter = text_log.search("支付宝里的积分已领取");
    // if (patter != -1) {
    //     toastLog("支付宝里积分领取跳过");
    //     return;
    // }
    back_home();
    //支付宝里的积分
    var appRun = currentPackage();
    if (appRun != 'com.eg.android.AlipayGphone') {
      launch("com.eg.android.AlipayGphone");
      sleep(1000);
    }
    // 进入首页领取消费金
    back_to(text, "首页", 1000);
    find_click(text, "首页", 1000);
    if (find_click(text, "消费金", 5000)) {
      if (find(text, '攻略', 5000)) {
        for (var i = 0; i < 2; i++) {
          if (find_click(textContains, '签到', 1000) || find_click(textContains, '逛一逛赚金币', 1000)) {
            if (find(text, '每日签到', 5000)) {
              while (1) {
                if (!find(text, '已获得30金币', 2000)) {
                  swipe(540, 1000, 540, 500, 300);
                  sleep(5000);
                } else {
                  break;
                }
              }
              // back_to(id,'h5_tv_title',1000);
              back_to(text, '支付宝消费金', 1000);
              break;
            }
          }
        }


        for (var i = 0; i < 3; i++) {
          find_click(text, '消费支付奖励', 2000);
        }
      }
    }
    back_to(text, "首页", 1000);

    var 我的 = text("我的").findOne(3000);
    if (我的) {
      var 我的 = 我的.bounds();
      click(我的.centerX(), 我的.centerY());
      sleep(1000);
      // click(186, 448, 426, 533); //点击进入支付宝会员页面
    } else {
      toastLog("支付宝没有找到我的图标！后退重启！");
      alipay_back();
      return SignIn_Alipay();
    }
    toastLog("点击进入支付宝会员页面");
    while (1) {
      var coor = image_coor("./images/支付宝会员.png");
      if (coor) {
        click(coor.x, coor.y);
        sleep(1000);
        if (find(text, "我的积分", 5000)) {
          if (find_click(textContains, "今日签到", 2000)) {
            toast("进入签到领积分");
            sleep(1000);
            find_click(text, "签到领积分", 3000);
            sleep(1000);
            back();
          }
          find_click(text, "全部领取", 1000);
        } else {
          toastLog("未找到支付宝会员领积分，可能是领过了！");
          back();
          return SignIn_Alipay();
        }
        break;
      }
    }
    toastLog("进入我的家，领取家庭积分");
    var 我的家 = text("我的家").findOne(1000);
    if (我的家) {
      var 我的家 = 我的家.bounds();
      click(我的家.centerX(), 我的家.centerY());
      sleep(2000);
      while (1) {
        var 家庭积分 = textMatches(/\+\d/).findOne(1000);
        if (家庭积分) {
          var 家庭积分 = 家庭积分.bounds();
          click(家庭积分.centerX(), 家庭积分.centerY());
          sleep(1000);
        } else {
          save_log("支付宝里的积分已领取");
          break;
        }
      }
    }
    alipay_back();
    sleep(1000);
  } catch (err) {
    toastLog(err);
    return SignIn_Alipay();
  } finally {
    back_home();
    return;
  }
}

function SignIn_idlefish () {
  try {
    var appRun = currentPackage();
    if (appRun != 'com.taobao.idlefish') {
      launch("com.taobao.idlefish");
    }
    var 首页 = id("tab_title").findOne(6000);
    if (首页) {
      var 首页坐标 = 首页.bounds();
      click(首页坐标.centerX(), 首页坐标.centerY());
      sleep(1000);
    } else {
      toastLog("闲鱼没有找到首页，退出");
      back();
      return SignIn_idlefish();
    }
    var patter = text_log.search("闲鱼搜索框已完成");
    if (patter != -1) {
      toastLog("闲鱼搜索框跳过");
    } else {
      var 搜索框 = id("search_bar_layout").findOne(3000);
      if (搜索框) {
        toastLog("找到搜索框");
        sleep(1000);
        var 搜索框 = 搜索框.bounds();
        click(搜索框.centerX(), 搜索框.centerY());
        if (text("历史搜索").findOne(5000)) {
          toastLog("选择宝贝");
          sleep(1000);
          find_click(text, "搜索", 1000);
          // click(130, 450); //点击历史记录第一个
          if (textContains("综合").findOne(5000)) {
            back_to(id, "tab_title", 1000);
            save_log("闲鱼搜索框已完成");
          } else {
            toastLog("搜索未完成！后退重启！");
            back_home();
            return SignIn_idlefish();
          }
        } else {
          toastLog("历史搜索未加载");
          back();
          return SignIn_idlefish();
        }
      } else {
        toastLog("未找到搜索框！重启！");
        back();
        return SignIn_idlefish();
      }
    }
    sleep(1000);
    if (find_click(desc, "闲鱼签到", 5000)) {
      if (find(text, "100闲鱼币夺宝 >", 2000)) {
        toastLog("进入签到页面");

        find_click(textContains, "签到领币", 2000);
        sleep(1000);
        click(950, 150); //点击每日签到

        闲鱼签到();
        sleep(1000);
        //下滑，看看有没有点击看
        for (var i = 0; i < 4; i++) {
          swipe(540, 1700, 540, 600, 300);
        }
        sleep(1000);
        while (1) {
          if (find(text, "去领取", 200)) { break; }
          if (find(textContains, "点击看", 2000)) {
            for (i = 1; i <= 2; i++) {
              click(400 * i, 1500);
              sleep(500);
              back_to(text, "闲鱼币", 1000);
              sleep(1000);
            }
            swipe(540, 2000, 540, 600, 200); //下滑
            sleep(1000);
          } else {
            save_log("今天边逛边赚币完了");
            break;
          }
        }
        //向上到顶
        for (var i = 0; i < 10; i++) {
          swipe(540, 600, 540, 1700, 300);
        }

        find_click_position(textContains, "第2个标签", 1000, 1577, 1685);
        click(950, 150); //点击每日签到

        闲鱼签到();
        sleep(1000);
        click(600, 600); //收鱼篓
        sleep(1000);
        var patter = text_log.search("夺宝押注已结束");
        if (patter != -1) {
          toastLog("夺宝押注跳过");
        } else {
          toastLog("开始闲鱼币夺宝");
          if (text("100闲鱼币夺宝 >").findOne()) {
            text("100闲鱼币夺宝 >").findOne().click();
            sleep(2000);
            var 闲鱼币夺宝界面 = desc("无限投注，投注越多越容易中奖").findOne();
            if (闲鱼币夺宝界面) {
              //早上完善，晚上没有对应的按钮了
              toastLog("进入闲鱼夺宝页面");
              sleep(1000);
              while (1) {
                var 签到页面 = desc("我的闲鱼币").findOne(1000);
                var 夺宝押注入口 = desc("100闲鱼币夺宝").findOne(1000);
                if (夺宝押注入口) {
                  sleep(1000);
                  var 夺宝押注入口 = 夺宝押注入口.bounds();
                  if (夺宝押注入口.centerY() > 2300) {
                    swipe(540, 2000, 540, 1500, 300); //把坐标点移上来
                    continue;
                  }
                  click(夺宝押注入口.centerX(), 夺宝押注入口.centerY());
                  sleep(1000);
                  if (desc("100闲鱼币夺宝").findOne(3000)) {
                    click(500, 1670); //点击进入押宝最终页面
                    sleep(1000);
                    if (desc("100闲鱼币夺宝").findOne()) {
                      click(226, 1900); //减少投注
                      sleep(500);
                      click(226, 1900); //减少投注
                      sleep(500);
                      while (desc("100闲鱼币夺宝").findOne(500)) {
                        click(500, 2250); //确定投注
                        sleep(1000);
                      }
                      back();
                    }
                    sleep(1000);
                    // back();
                    // text("100闲鱼币夺宝 >").findOne().click();
                  } else {
                    toastLog("本页面已压过了");
                    back();
                    sleep(1000);
                    back();
                    text("100闲鱼币夺宝 >").findOne().click();
                  }
                } else {
                  save_log("夺宝押注已结束");
                  var 我的闲鱼币 = (desc("我的闲鱼币").findOne(2000));
                  if ("我的闲鱼币") {
                    var 我的闲鱼币 = 我的闲鱼币.bounds();
                    click(我的闲鱼币.centerX() - 229, 我的闲鱼币.centerY() + 46); //通过求出旁边的我的闲鱼币的控件坐标计算得到左边最终领取投资奖励的坐标
                  }
                  break;
                }
              }
              sleep(1000);
              back();
              sleep(1000);
            }
          }
        }
        toastLog("开始任务");
        // click(114, 1160);
        while (1) {
          var 待领取 = text("待领取").findOne(2000);
          if (待领取) {
            var 待领取 = 待领取.bounds();
            click(待领取.centerX(), 待领取.centerY());
            sleep(2000);
            toastLog("检测去签到");
            var 签到 = textContains("去签到").findOne(2000)
            if (签到) {
              var 签到 = 签到.bounds();
              click(签到.centerX() + 300, 签到.centerY());
              sleep(1000);
              闲鱼签到();
              sleep(1000);
            }
            var 去浏览 = text("去浏览").findOne(1000);
            if (去浏览) {
              去浏览.click();
              sleep(2000);

              var 任务完成 = textContains("任务完成").findOne(20000);
              if (任务完成) {
                back();
              } else {
                back();
              }
              sleep(2000);
              continue;
            }
            while (1) {
              var 可领取 = textContains("待领取").findOne(2000);
              if (可领取) {
                可领取.click();
                sleep(500);
              } else {
                toastLog("已经领完了");
                back();
                break;
              }
            }
            break;
          } else { break; }
        }
        sleep(2000);
        click(600, 600); //收鱼篓
        sleep(1000);
        click(980, 800); //点击换闲鱼币
        sleep(1000);
        back();
        sleep(1000);
        back();


      } else {
        toastLog("没有进入签到页面,后退重启");
        back_home();
        return SignIn_idlefish();
      }
    } else {
      toastLog("没有找到闲鱼签到,后退重启");
      back_home();
      return SignIn_idlefish();
    }

  } catch (err) {
    toastLog("出现错误" + err);
    return SignIn_idlefish();
  } finally {
    back_home();
    return;
  }
}

function 闲鱼签到 () {
  var 签到领币 = textContains("签到领币").findOne(1000);
  if (签到领币) {
    var 签到领币 = 签到领币.bounds();
    click(签到领币.centerX(), 签到领币.centerY());
    sleep(1000);
    toastLog("已点击签到领币按钮");
  } else {
    toastLog("没有找到签到领币按钮");
  }
  back_to(text, "100闲鱼币夺宝 >", 1000);
}

function Sign_autonavi () {
  try {
    var patter = text_log.search("高德地图已完成");
    if (patter != -1) {
      toastLog("高德地图跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != 'com.autonavi.minimap') {
      launch("com.autonavi.minimap");
      sleep(1000);
    }
    var rect = textContains("跳过").findOne(2000);
    if (rect) {
      var rect = rect.bounds();
      click(rect.centerX(), rect.centerY()); //跳过广告界面
    }
    var rect = id("iv_close").findOne(1000);
    if (rect) {
      var rect = rect.bounds();
      click(rect.centerX(), rect.centerY()); //跳过升级提示
    }
    if (find_click(text, '我的', 5000)) {
      var num = 0
      while (num < 10) {
        var coor = image_coor("./images/高德地图签到.jpg");
        if (coor) {
          press(coor.x, coor.y, 500);
          toast("点击签到");
          break;
        } else {
          swipe(540, 2000, 540, 1500, 500);
          num += 1;
          sleep(1000);
        }
      }

      if (text("签到成功！").findOne(7000)) {
        sleep(5000);
        click(500, 1200);
        sleep(1000);
        back();
        home();
        sleep(1000);
        save_log("高德地图已完成!");
      } else if (text("签到战绩").findOne(2500)) {
        back();
        home();
        sleep(1000);
        save_log("高德地图已完成!");
      } else {
        toastLog("未找到表示签到成功的标识！");
        back();
        home();
        sleep(1000);
      }
    }
  } catch (err) {
    toastLog("出现错误" + err);
    back_home();
    sleep(1000);
    return Sign_autonavi();
  } finally {
    back_home();
    return;
  }
}

function SignIn_Sfacg () {
  try {
    var patter = text_log.search("SF已完成");
    if (patter != -1) {
      toastLog("SF跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != 'com.sfacg') {
      launch("com.sfacg");
      sleep(1000);
    }
    find_click(descContains, '跳过', 5000);
    find_click(textContains, '跳过', 1000);
    while (1) {
      var rect = id("main_tab_container5").findOne(3000);
      if (rect) {
        sleep(1000);
        var rect = rect.bounds();
        click(rect.centerX(), rect.centerY());
        sleep(1000);
        //进入签到页面
        if (text("我的钱包").findOne(3000)) {
          break;
        }
      } else {
        toast("没有找到我的主页，请重试！");
        back_home();
        return SignIn_Sfacg();
      }
    }
    var rect = text("签到").findOne(2000);
    if (rect) {
      var rect = rect.bounds();
      sleep(1000);
      click(rect.centerX(), rect.centerY());
      sleep(1000);
      //签到按钮
      id("picker_signin_btn").findOne().click();
      sleep(1000);
      if (textContains("已放入我的钱包").findOne(2000)) {
        save_log("SF已完成!");
        back();
      } else {
        toastLog("没有找到放入钱包的提示，可能是签到失败！请确定是在凌晨1点后进行的签到！");
        click(540, 1364);
      }
    } else if (text("已签").findOne(2000)) {
      save_log("SF已完成!");
    }
    sleep(1000);
    while (1) {
      var 我的钱包 = text("我的钱包").findOne(2000);
      if (我的钱包) {
        var 我的钱包 = 我的钱包.bounds();
        click(我的钱包.centerX(), 我的钱包.centerY());
        sleep(1000);
        var num = id("tv_voucher").findOne(5000).text();
        if (num >= 35) {
          alert("SF代卷该使用了！数量：" + num);
        } else {
          toastLog("SF代卷数量：" + num);
        }
        break;
      } else {
        toastLog("没有找到我的钱包，请检查");
        back();
      }
    }
  } catch (err) {
    toastLog(err);
  } finally {
    back_home();
    return;
  }
}

function SignIn_Unicom () {
  try {
    var patter = text_log.search("联通营业厅已完成");
    if (patter != -1) {
      toastLog("联通营业厅跳过");
      return;
    }
    sleep(1000);
    var appRun = currentPackage();
    if (appRun != 'com.sinovatech.unicom.ui') {
      launch("com.sinovatech.unicom.ui");
      sleep(1000);
    }
    back();
    var 首页精选 = text("精选").findOne(10000);
    if (首页精选) {
      toastLog("进入首页了");
      var close = text("oFr5vJX3UQPSC9zxHDaogEvWoQcnnqMLcSRw18J6ZKGBYq3rYYwU+bFUeVgLHba6x4zbn8bzKjtu8Nnnc5p8AAwDgFJ01yE0rBgAAAABJRU5ErkJggg==").findOne(4000);
      if (close != null) {
        close.click();
      }
      sleep(1000);
      toastLog("点击签到");
      press(789, 137, 400);
      var 签到页面 = textContains("免费领").findOne(10000);
      if (签到页面) {
        toastLog("进入签到页面");
        sleep(2000);
        var 签到 = text("签到").depth(17).findOne(2000);
        if (签到) {
          var 签到 = 签到.bounds();
          click(签到.centerX(), 签到.centerY());
          sleep(2000);
          click(540, 1700);
          sleep(1000);
          back();
          return SignIn_Unicom();
        }
        // var 去分享 = text("去分享").findOne(3000);
        // if (去分享) {
        //     var 去分享 = 去分享.bounds();
        //     click(去分享.centerX(), 去分享.centerY());
        //     sleep(2000);
        //     click(900, 250);
        //     sleep(2000);
        //     while (!textContains("免费领").findOne(1000)) { back(); }
        // }
        var 领积分 = text("领积分").findOne(1000);
        if (领积分) {
          var 领积分 = 领积分.bounds();
          click(领积分.centerX(), 领积分.centerY());
          // text("我知道了").findOne().click();
          click(540, 1700);
        }
        if (text("使用积分").findOne(3000)) {
          save_log("联通营业厅已完成！");
        }
        back();
      } else {
        toastLog("未进入签到页面，重启");
        back();
        return SignIn_Unicom();
      }
    } else {
      toastLog("未进入联通营业厅首页,后退重启");
      back();
      return SignIn_Unicom();
    }
  } catch (err) {
    toastLog(err);
  } finally {
    back_home();
    return;
  }
}