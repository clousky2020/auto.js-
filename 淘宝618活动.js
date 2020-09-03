auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率

home();
sleep(1000);
taobao_activities(); //淘宝活动
// Alipay_activities(); //支付宝活动

function Alipay_activities() {
    var appRun = currentActivity();
    if (appRun != 'com.eg.android.AlipayGphone') {
        launch("com.eg.android.AlipayGphone");
        sleep(1000);
    }

    sleep(1000);
    click(600, 1400); //没找到控件，直接点
    var 任务图标 = text("做任务，领喵币").findOne(7000);
    if (任务图标) {
        toast("进入活动了");
        sleep(2000);
    } else {
        toastLog("未进入活动，重启");
        while (!desc("一键锁屏").findOne(500)) { back(); }
        return Alipay_activities();
    }
    click(540, 1510); //点击收取钱币
    var 任务图标 = 任务图标.bounds();
    for (i = 0; i < 3; i++) {
        sleep(1000);
        click(任务图标.centerX(), 任务图标.centerY());
        get_cat_money();
    }

}

function back_to_taobao() {
    while (!desc("我的淘宝").findOne(1000)) { back(); }
}

function taobao_activities() {
    try {
        var appRun = currentActivity();
        if (appRun != 'com.taobao.taobao') {
            launch("com.taobao.taobao");
        }
        while (1) {
            var 首页 = desc("首页").findOne(3000);
            if (首页) {
                var 首页 = 首页.bounds();
                click(首页.centerX(), 首页.centerY());
                var next_click = desc("领淘金币").findOne(1000);
                if (next_click != null) {
                    click(600, 1400);; //首页直接点击进入
                    break;
                }
            }
        }
        // var 我的淘宝图标 = desc("我的淘宝").findOne(3000);
        // if (我的淘宝图标) {
        //     var 我的淘宝图标 = 我的淘宝图标.bounds();
        //     click(我的淘宝图标.centerX(), 我的淘宝图标.centerY());
        // } 
        // else {
        //     toastLog("未找到我的淘宝页面，后退重启！");
        //     back_to_taobao(); //后退至淘宝首页
        //     return taobao_activities();
        // }
        // while (1) {
        //     var 入口 = desc("瓜分10亿").findOne(3000);
        //     if (入口) {
        //         sleep(2000);
        //         var 入口 = 入口.bounds();
        //         if (入口.centerY() < 300) { //入口在上面，就下划
        //             swipe(540, 500, 540, 2200, 300);
        //             continue;
        //         }
        //         click(入口.centerX(), 入口.centerY());
        //         break;
        //     } else {
        //         toastLog("没有找到活动，重启");
        //         back_to_taobao();
        //         return taobao_activities();
        //     }
        // }
        var 任务图标 = text("做任务，领喵币").findOne(7000);
        if (任务图标) {
            toast("进入活动了");
            sleep(2000);
        } else {
            toastLog("未进入活动，重启");
            back_to_taobao();
            return taobao_activities();
        }
        click(540, 1510); //点击收取钱币
        var 任务图标 = 任务图标.bounds();
        for (i = 0; i < 3; i++) {
            sleep(1000);
            click(任务图标.centerX(), 任务图标.centerY());
            sleep(1000);
            get_cat_money();
        }
        click(540, 1510); //点击收取钱币
        home();


    } catch (err) {
        toastLog(err);
        exit();
    }
}



function get_cat_money() {

    // var 任务界面 = text("淘宝成就点").findOne(2000);
    // if (任务界面) {
    //     sleep(1000);
    // } else {
    //     back_to_taobao();
    //     return taobao_activities();
    // }

    var rect = text("签到").findOne(500);
    if (rect != null) {
        toast("签到");
        rect.click();
    }
    var rect = desc("签到").findOne(500);
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
    var rect = text("去围观").findOne(500);
    if (rect != null) {
        toast("去围观");
        rect.click();
        sleep(18000);
        var desc任务已完成 = desc("任务已完成").findOne(5000);
        var text任务已完成 = text("任务已完成").findOne(5000);
        if (desc任务已完成 || text任务已完成) {
            back();
        } else {
            back();
        }
    }
    while (1) {
        sleep(1000);
        var 去浏览 = text("去浏览").findOne(1000);
        if (去浏览) {
            去浏览.click();
            var 浏览字样desc = descMatches(/浏览/).findOne(2000);
            var 浏览字样text = textMatches(/浏览/).findOne(2000);
            var desc任务已完成 = descMatches(/已完成/).findOne(2000);
            var text任务已完成 = textMatches(/已完成/).findOne(2000);
            if (textContains("全部完成").findOne(3000)) {
                toastLog("全部完成");
                back();
                sleep(1000);
                // click(985, 976); //关闭任务窗口
                text("关闭").findOne().click();
                sleep(1000);
                // click(972, 1626); //打开任务窗口
                任务图标.click();
                sleep(1000);
            } else if (text("今日已达上限继续逛逛吧").findOne(1000)) {
                toastLog("今日已达上限继续逛逛吧");
                back();
                sleep(1000);
            } else if (textContains("完成").findOne(10000)) {
                toastLog("完成");
                back();
                sleep(1000);
            } else if (desc("我的淘宝").findOne(5000)) {
                toastLog("来到首页了");
                var 我的淘宝图标 = desc("我的淘宝").findOne(3000).bounds();
                click(我的淘宝图标.centerX(), 我的淘宝图标.centerY());
                while (1) {
                    var 入口 = desc("瓜分10亿").findOne(3000);
                    if (入口) {
                        sleep(2000);
                        var 入口 = 入口.bounds();
                        if (入口.centerY() < 300) { //入口在上面，就下划
                            swipe(540, 500, 540, 2200, 300);
                            continue;
                        }
                        click(入口.centerX(), 入口.centerY());
                        break;
                    } else {
                        toastLog("没有找到活动，重启");
                        back_to_taobao();
                        return taobao_activities();
                    }
                }
            } else if (desc任务已完成 || text任务已完成) {
                back();
                sleep(1000);
            } else {
                toastLog("退回");
                sleep(1000);
                back();
                sleep(1000);
            }
        } else {
            break;
        }
    }
    var 去收菜 = text("去收菜").findOne(1000);
    if (去收菜) {
        toastLog("去收菜");
        去收菜.click();
        var 农场图标 = text("TB1ECFDJKL2gK0jSZPhXXahvXXa-350-400").findOne(5000);
        if (农场图标) {
            var 农场图标 = 农场图标.bounds();
            click(农场图标.centerX(), 农场图标.centerY());
        }
        if (text("兑换好礼（每天10:00上新）").findOne(7000)) {
            toast("进入农场");
            if (text("离线超过24小时，作物会停止自动生产哦~").findOne(3000)) {
                click(526, 1743.3); //关闭长时间未进入后弹出的窗口
                sleep(1000);
            }
        } else {
            back_to_taobao();
            return taobao_activities();
        }
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
        for (i = 0; i < coordinate_field.length; i++) {
            click(coordinate_field[i][0], coordinate_field[i][1]);
        }
        sleep(1000);
        back();
    }
    while (1) {
        var 开心收下 = desc("开心收下").findOne(1000);
        if (开心收下) {
            开心收下 = 开心收下.bounds();
            click(开心收下.centerX(), 开心收下.centerY());
            sleep(1000);
        }
        // click(540, 1877);
        var 去看看 = textContains("去看看").findOne(500);
        var 逛一逛 = textContains("逛一逛").findOne(500);
        if (去看看) {
            toastLog("去看看");
            去看看.click();
            if (text("蚂蚁森林").findOne(5000)) {
                back();
            } else {
                back();
                sleep(1000);
            }
        } else if (逛一逛) {
            sleep(1000);
            toastLog("逛一逛");
            逛一逛.click();
            if (textContains("浏览").findOne(3000)) {
                toastLog("浏览15秒");
                sleep(1000);
                swipe(540, 2000, 540, 1000, 500); //下划
                // if (desc("返回618列车").findOne(20000)) {
                sleep(15000);
                var desc任务已完成 = desc("任务已完成").findOne(2000);
                var text任务已完成 = text("任务已完成").findOne(2000);
                if (desc任务已完成 || text任务已完成) {
                    back();
                } else {
                    back();
                }
            } else {
                sleep(3000);
                back();
            }
        } else {
            break;
        }
    }
    toastLog("没有任务了,关闭菜单");
    text("关闭").findOne().click();
    // back();
    sleep(1000);
}