
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

function image_coor (template_path) {
  var template = images.read(template_path); //模板图片的位置
  var img = captureScreen(); //截取当前图像
  var coor = images.findImage(img, template)
  img.recycle(); // 回收图片
  template.recycle(); // 回收图片
  return coor;
}

function match_image_coor (template_path) {
  var template = images.read(template_path); //模板图片的位置
  var img = captureScreen(); //截取当前图像
  var coor = images.matchTemplate(img, template)
  img.recycle(); // 回收图片
  template.recycle(); // 回收图片
  return coor;
}

Module.exports = { back_home, back_to, find, find_click, find_click_position, loop_find_click, loop_find_click_position, image_coor, match_image_coor }
