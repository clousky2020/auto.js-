auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率

home();
sleep(1000);
tmail_form(); //运行天猫农场的程序

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
                var 天猫农场入口 = desc("天猫农场").findOne(3000);
                if (天猫农场入口) {
                    sleep(2000);
                    var 天猫农场入口 = 天猫农场入口.bounds();
                    if (天猫农场入口.centerY() < 200) {
                        swipe(540, 500, 540, 2200, 300);
                        continue;
                    }
                    click(天猫农场入口.centerX(), 天猫农场入口.centerY());
                    break;
                } else {
                    toastLog("没有找到农场，上划后重启");
                    swipe(540, 500, 540, 2200, 300);
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
                [125, 658],
                [292, 810],
                [364, 639],
                [557, 529],
                [780, 578],
                [742, 662],
                [954, 744],
                [949, 573],
                [794, 1306]
            ]
            var coordinate_field = [
                [535, 690],
                [308, 826],
                [761, 800],
                [549, 927],
                [299, 1086],
                [789, 1053],
                [526, 1207],
                [322, 1320],
                [512, 1470]
            ]
            toast("第一次开始收阳光");
            for (i = 0; i < sun_list.length; i++) {
                click(sun_list[i][0], sun_list[i][1]);
            }
            toast("第一次收田地");
            for (i = 0; i < coordinate_field.length; i++) {
                click(coordinate_field[i][0], coordinate_field[i][1]);
            }
            sleep(2000);
            click(535, 1577); //宝箱点击关闭
            sleep(2000);
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
                click(980, 1542) // 点击领阳光的图标
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
                    sleep(3000);
                    var num = 0;
                    while (1) {
                        if (desc("立即打开").findOne(1000)) {
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
            click(121, 1554);
            var 集果实图标 = text("gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==");
            //if (text("无星辰落").findOne()) {
            if (集果实图标.findOne(15000)) {
                toast("已经进入福年种福果");
                var 收下祝福 = text("收下祝福").findOne(2000);
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
                click(540, 1700) //浇水
                sleep(1000);
                // var 左移图标 = text("TB1X9ITzND1gK0jSZFsXXbldVXa-52-52.png_1080x1800Q50s50.jpg_").findOne(2000);
                // if (左移图标) {
                //     左移图标.click();
                //     sleep(3000);
                //     var 去种新福果 = textContains("去种新福果").findOne(500);
                //     if (!去种新福果) {
                //         click(1000, 1700); // 进入活动中心
                //         collection_bless();
                //     }
                // }
                while (!desc("我的淘宝").findOne(500)) { back(); } //后退至淘宝首页
                home();
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

function collection_bless() {
    if (textContains("gif").findOne(10000)) {
        sleep(1000);
        var rect = text("去签到").findOne(1000);
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
            } else {
                break;
            }
        }

        var rect = textContains("去兑换").findOne(500);
        if (rect != null) {
            toast("去兑换");
            rect.click();
        }
        while (1) {
            var 去逛逛 = textContains("去逛逛").findOne(500);
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
                }
                if (textContains("完成").findOne(20000)) {
                    back();
                    sleep(1000);
                } else {
                    back();
                    sleep(1000);
                }
            } else {
                break;
            }
        }
        while (1) {
            var 去浏览 = textContains("去浏览").findOne(500);
            if (去浏览) {
                去浏览.click();
                if (textContains("全部完成").findOne(3000)) {
                    back();
                    sleep(1000);
                    click(985, 976) //关闭任务窗口
                    sleep(1000);
                    click(972, 1626) //打开任务窗口
                    sleep(1000);
                    break;
                } else if (textContains("滑动浏览").findOne(1000)) {
                    sleep(2000);
                    swipe(540, 800, 540, 300, 300); //下滑
                    if (textContains("完成").findOne(22000)) {
                        back();
                    } else {
                        back();
                    }
                    sleep(1000);
                } else if (text("今日已达上限继续逛逛吧").findOne(1000)) {
                    back();
                    sleep(1000);
                } else if (textContains("浏览完成").findOne(20000)) {
                    sleep(1000);
                    back();
                    sleep(1000);
                } else {
                    back();
                    sleep(1000);
                }
            } else {
                break;
            }
        }
        var 去换装 = textContains("去换装").findOne(1000);
        if (去换装) {
            去换装.click();
            sleep(10000);
            click(1000, 1383);
            //缺少点击收取心愿卡的步骤
            back();
            sleep(2000);
            click(549, 1509); //退出淘宝人生
            sleep(2000);
        }
        var 去拍照 = textContains("去拍照").findOne(1000);
        if (去拍照) {
            去拍照.click();
            sleep(2000);
            var 扫一扫 = id("scan_icon").findOne(3000);
            if (扫一扫) {
                扫一扫.click();
                sleep(2000);
                var 继续上传 = text("继续上传").findOne(2000);
                if (继续上传) { 继续上传.click(); }
                var 扫一扫完成 = id("image_detect_icon").findOne(5000);
                if (扫一扫完成) {
                    sleep(1000);
                    while (!textContains("gif").findOne(1000)) { back(); }
                } else {
                    toastLog("未找到扫一扫");
                    back();
                }
            }
        }

        if (textContains("gif").findOne(4000)) { //确定还是在这个任务界面
            click(989, 957); //关闭任务菜单
            sleep(1000);
        }

    }
}