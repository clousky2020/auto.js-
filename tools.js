var tools = {}

// 上下循环移动
tools.to_down_to_up = function(count) {
        for (var i = 1; i <= count; i++) {
            swipe(540, 2000, 540, 1500, 300);
            sleep(500);
            swipe(540, 1500, 540, 2000, 300);
            sleep(500);
        }
        return;
    }
    // count: 次数，number
    // step: 单次移动的像素距离，不要超过屏幕最大高度，number
tools.to_down = function(count, step) {
    for (var i = 1; i <= count; i++) {
        swipe(540, 1000, 540, 1000 - step, 300);
        // sleep(500);
    }
    return;
}
tools.to_up = function(count, step) {
        for (var i = 1; i <= count; i++) {
            swipe(540, 1000, 540, 1000 + step, 300);
            // sleep(500);
        }
        return;
    }
    // 调整位置使其在设定的Y坐标内
tools.adjust_position = function(target, position_obj) {
        while (1) {
            var a = target.type(target.text).findOne(target.time);
            if (a) {
                var object = a.bounds();
                if (object.centerY() < position_obj.y1) {
                    tools.to_down(1);
                    continue;
                } else if (object.centerY() > position_obj.y2) {
                    tools.to_up(1)
                    continue;
                } else {
                    toastLog("已经调整好了，最终坐标是" + object)
                    return true;
                }
            } else {
                toastLog("没有找到" + target);
                return false;
            }
        }
    }
    // 循环点击下一个符合条件的内容
tools.find_next_click = function(target, next_num) {
        while (1) {
            var object = target.type(target.text).findOnce(next_num);
            if (object) {
                var object = object.bounds();
                if (object.centerY() < 500) {
                    tools.to_down(1);
                    continue;
                } else if (object.centerY() > 2200) {
                    tools.to_up(1)
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
    // 循环多次点击进入
tools.loop_find_click_return = function(click_obj, find_obj) {
        var retry = 0
        while (1) {
            if (tools.find_click_return(click_obj, find_obj)) {
                return true
            } else if (retry > 3) {
                toastLog('循环多次未能进入,退出,以下打印click_obj和find_obj的值')
                toastLog(click_obj)
                toastLog(find_obj)
                return false;
            } else {
                tools.back_to(click_obj.type, click_obj.text, click_obj.time);
                retry += 1
                sleep(1000)
            }
        }
    }
    // 点击后找到特定的内容才会返回true
tools.find_click_return = function(click_obj, find_obj) {
    if (tools.find_click(click_obj.type, click_obj.text, click_obj.time)) {
        if (tools.find(find_obj.type, find_obj.text, find_obj.time)) {
            return true;
        } else {
            toastLog("没有找到进入后的目标" + find_obj.type + ":" + find_obj.text);
        }
    } else {
        toastLog("没有找到点击的目标" + click_obj.type + ":" + click_obj.text);
    }
    return false;
}

tools.save_log = function(text) {
        toastLog(text);
        var now = new Date();
        var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
        files.append(path, "\n" + text + "——" + now);
        return;
    }
    // 寻找到图片的坐标
tools.image_coor = function(template_path) {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.findImage(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
}

// 返回auto.jsApp
tools.back_home = function() {
        var num = 0;
        while (1) {
            //因为在auto.js的文件中社区比较独特，其他应用少有，以此作为进入auto的判断
            var auto = text("社区").findOne(500);
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
    // 一直后退
tools.back_to = function(type, text, time) {
    var num = 0;
    while (1) {
        var object = type(text).findOne(time);
        if (object) {
            toastLog("已经返回到{" + text + "}的内容了,次数为" + num + "次");
            return true;
        } else if (num > 10) {
            toastLog(num + "次返回没有到达指定地点，结束任务");
            return;
        } else {
            back();
            num += 1;
        }
    }
}

// 将目标调整到设定的位置后点击
tools.find_click_position = function(click_obj, position_obj) {
    while (1) {
        var object = click_obj.type(click_obj.text).findOne(click_obj.time);
        if (object) {
            var object = object.bounds();
            if (object.centerY() < position_obj.position1) {
                tools.to_down(1);
                continue;
            } else if (object.centerY() > position_obj.position2) {
                tools.to_up(1)
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
tools.image_click = function(path) {
        var p = tools.image_coor(path);
        if (p) {
            click(p.x, p.y);
            return true;
        } else {
            toastLog('没找到' + path);
            return false;
        }
    }
    // 寻找到特定的内容后点击
tools.find_click = function(type, text, time) {
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

// 找到集合并点击
tools.find_all_and_click = function(type, text) {
        var objects = type(text).find();
        if (objects.length > 0) {
            toastLog("找到了" + objects.length + "个符合要求的控件");
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i].bounds();
                click(object.centerX(), object.centerY());
                sleep(1000);
            }
        }
        return;
    }
    // 找到集合并返回
tools.find_all_and_click_and_back = function(type, text) {
        var objects = type(text).untilFind();
        toastLog("找到了" + objects.length + "个符合要求的控件");
        for (var i = 0; i < objects.length; i++) {
            while (1) {
                var object = objects[i].bounds();
                if (object.centerY() < 1000) {
                    tools.to_down(1);
                    continue;
                } else if (object.centerY() > 2000) {
                    tools.to_up(1)
                    continue;
                } else {
                    click(object.centerX(), object.centerY());
                    break;
                }
            }
            sleep(1000);
            back();
            sleep(800);
        }
        return;
    }
    // 循环点击
tools.loop_find_click = function(type, text, time, num) {
    for (var i = 0; i < num; i++) {
        toastLog("第" + i + "次查找点击");
        tools.find_click(type, text, time);
        sleep(1000);
    }
    return;
}

tools.loop_find_click_position = function(type, text, time, position1, position2, num) {
    var n = 1;
    while (n < num) {
        toastLog("第" + n + "次循环查找点击");
        tools.find_click_position(type, text, time, position1, position2);
        n += 1;
    }
}

tools.find = function(type, text, time) {
    var object = type(text).findOne(time);
    if (object) {
        return true;
    } else {
        toast("没有找到" + text + "的目标");
        return false;
    }
}


module.exports = tools;