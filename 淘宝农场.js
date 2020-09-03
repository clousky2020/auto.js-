auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率

if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
    toast("请求截图失败");
    exit();
}
home();
sleep(1000);
tmail_form(); //运行天猫农场的程序

function image_coor(template_path) {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.findImage(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
}

function back_home() {
    var num = 0;
    while (num < 5) {
        if (!id("workspace").findOne(500)) {
            back();
            num += 1;
            // toastLog("第" + num + "次尝试后退");
        } else { return; }
    }
    return;
}

function tmail_form() {
    try {
        var appRun = currentActivity();
        if (appRun != 'com.taobao.taobao') {
            launch("com.taobao.taobao");
        }
        var 我的淘宝图标 = desc("我的淘宝").findOne(3000);
        if (我的淘宝图标) {
            var 我的淘宝图标 = 我的淘宝图标.bounds();
            click(我的淘宝图标.centerX(), 我的淘宝图标.centerY());

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
                    }
                    click(天猫农场入口坐标.centerX(), 天猫农场入口坐标.centerY());
                    // 天猫农场入口.click();
                    break;
                } else {
                    toastLog("没有找到农场，上划后重启");
                    back_home();
                    // swipe(540, 500, 540, 2200, 300);
                    return tmail_form();
                }
            }

            if (text("兑换好礼（每天10:00上新）").findOne(7000)) {
                toast("进入农场");
                sleep(2000);
            } else {
                toastLog("未进入农场，重启");
                while (!desc("我的淘宝").findOne(1000)) { back(); }
                return tmail_form();
            }
            if (text("离线超过24小时，作物会停止自动生产哦~").findOne(3000)) {

                click(526, 1743.3); //关闭长时间未进入后弹出的窗口
                sleep(1000);
            }
            click(534.6, 1577.16); //宝箱点击关闭
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
            for (i = 0; i < sun_list.length; i++) {
                click(sun_list[i][0], sun_list[i][1]);
            }
            toast("第一次收田地");
            for (i = 0; i < coordinate_field.length; i++) {
                click(coordinate_field[i][0], coordinate_field[i][1]);
            }
            sleep(3000);
            click(535, 1577); //宝箱点击关闭
            sleep(4000);
            toast("第二次开始收阳光");
            for (i = 0; i < sun_list.length; i++) {
                click(sun_list[i][0], sun_list[i][1]);
            }
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
                var 去进店领阳光 = text("去进店").findOne(500);
                var 去进店领阳光已完成 = text("已完成").findOne(500);
                if (去进店领阳光 && !去进店领阳光已完成) {
                    sleep(1000);
                    去进店领阳光.click();
                    toast("进店领阳光");
                    sleep(4000);
                    var num = 0;
                    while (1) {
                        if (desc("立即打开").findOne(700)) {
                            toast("立即打开");
                            var rect = desc("立即打开").findOne().bounds();
                            if (rect.centerY() > 2200) {
                                swipe(540, 2000, 540, 1500, 300);
                                continue;
                            }
                            click(rect.centerX(), rect.centerY());
                        } else if (desc("关注店铺").findOne(500)) {
                            toast("关注店铺");
                            var rect = desc("关注店铺").findOne().bounds();
                            if (rect.centerY() > 2200) {
                                swipe(540, 2000, 540, 1500, 300);
                                continue;
                            }
                            click(rect.centerX(), rect.centerY());
                        } else if (textContains("关注店铺").findOne(200)) {
                            toast("关注店铺");
                            var rect = textContains("关注店铺").findOne().bounds();
                            if (rect.centerY() > 2200) {
                                swipe(540, 2000, 540, 1500, 300);
                                continue;
                            }
                            click(rect.centerX(), rect.centerY());
                        }
                        if (desc("经过搜寻，你获得了").findOne(500)) {
                            toast("已经得到阳光,退回");
                            back();
                            sleep(2000);
                            break
                        }
                        if (num == 15) {
                            toastLog("下滑15次还没看到目标值，向上，重新来");
                            num += 1;
                            for (i1 = 0; i1 < 18; i1++) {
                                swipe(540, 400, 540, 2100, 200); //向上滑
                            }
                        } else if (num > 40) {
                            toast("下滑多次未找到目标，退回");
                            back();
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
            sleep(1000);
            toast("没有什么任务可以做了，关闭任务菜单！");
            click(999, 1280);
            sleep(1000);
            //收阳光
            for (i = 0; i < sun_list.length; i++) {
                click(sun_list[i][0], sun_list[i][1]);
            }
            sleep(1000);
            toast("进入果园");
            click(128, 556);
            var 集果实图标 = text("gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==");
            //if (text("无星辰落").findOne()) {
            if (集果实图标.findOne(10000)) {
                toast("已经进入福年种福果");
                var 收下祝福 = text("收下祝福").findOne(1000);
                if (收下祝福) {
                    var 收下祝福 = 收下祝福.bounds();
                    click(收下祝福.centerX(), 收下祝福.centerY());
                    sleep(1000);
                }
                var 去种新福果 = textContains("去种新福果").findOne(500);
                if (去种新福果) {
                    去种新福果.click();
                    sleep(2000);
                }
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
                    var coor = image_coor("./taobao/施肥数为零.png");
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

function back_to_TaskInterface() {
    var num = 0;
    while (num < 5) {
        var interface = textContains("分享给好友").findOne(1000);
        if (interface) {
            break;
        } else {
            back();
            num += 1;
            sleep(500);
        }
    }
    return;
}

function collection_bless() {

    if (textContains("gif").findOne(10000)) {
        for (var i = 0; i < 2; i++) {
            toastLog("第" + i + "次检测");
            sleep(1000);
            var rect = text("去签到").findOne(500);
            if (rect != null) {
                toast("签到");
                rect.click();
            }
            var rect = textContains("去兑换").findOne(500);
            if (rect != null) {
                toast("去兑换");
                rect.click();
            }
            while (1) {
                var rect = text("去领取").findOne(500);
                if (rect != null) {
                    toast("去领取");
                    rect.click();
                    sleep(1000);
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
                        } else if (textContains("滑动浏览得").findOne(1000)) {
                            sleep(2000);
                            swipe(540, 2000, 540, 500, 500);
                        } else if (text("启动桌面快捷方式").findOne(1000)) {
                            back();
                            break;
                        }
                        if (textContains("完成").findOne(20000)) {
                            back_to_TaskInterface();
                            sleep(1000);
                        } else {
                            back_to_TaskInterface();
                            sleep(1000);
                        }
                    } else {
                        break;
                    }
                }
            }
        }

        click(989, 800); //关闭任务菜单
    }
}