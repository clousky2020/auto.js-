auto.waitFor();
setScreenMetrics(1080, 2340);//设定以下坐标点击的基准屏幕分辨率
var height = device.height;
var width = device.width;

var now = new Date();
var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
if (files.isFile(path)) {
    var text_log = files.read(path);
}

// home(); 
taobao_coins();

function save_log(text) {
    toastLog(text);
    var now = new Date();
    var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
    files.append(path, "\n" + text + "——" + now);
    return;
}

function taobao_coins() {
    try {
        var appRun = currentActivity()
        if (appRun != 'com.taobao.taobao') {
            launch("com.taobao.taobao");
        }
        sleep(1000);

        while (1) {
            toastLog("开始淘金币")
            var 首页 = desc("首页").findOne(3000);
            if (首页) {
                var 首页 = 首页.bounds();
                click(首页.centerX(), 首页.centerY());
                sleep(1000);
                var next_click = desc("领淘金币").findOne(1000);
                if (next_click != null) {
                    toastLog("找到领淘金币了")
                    next_click = next_click.bounds();
                    click(next_click.centerX(), next_click.centerY());
                    if (!text("超级抵钱").findOne(5000)) {
                        toastLog("没有进入")
                        continue;
                    } else {
                        toastLog("已经进入淘金币")
                        break;
                    }
                }

            }
            else {
                toastLog("不在首页,后退重启！");
                while (!desc("首页").findOne(1000)) { back(); }
                return taobao_coins();
            }

        }
        var 立即签到 = text("立即签到").findOne(3000);
        if (立即签到) {
            toastLog("自动弹出每日签到!")
            sleep(1000);
            var 立即签到 = 立即签到.bounds();
            click(立即签到.centerX(), 立即签到.centerY());
            sleep(1000);
            text("TB1mJFIgET1gK0jSZFrXXcNCXXa-72-72.png_110x10000.jpg_").findOne().click()
            // click(903, 680);//上面那句不行就这句启用,关闭每日签到
            sleep(1000);
        } else if (textContains("今日金币未领取").findOne(2000)) {
            var 今日金币签到入口 = textContains("今日金币未领取").findOne(2000).bounds();
            click(今日金币签到入口.centerX(), 今日金币签到入口.centerY());
            var 立即签到 = text("立即签到").findOne(3000);
            if (立即签到) {
                var 立即签到 = 立即签到.bounds();
                click(立即签到.centerX(), 立即签到.centerY());
            }
            text("TB1mJFIgET1gK0jSZFrXXcNCXXa-72-72.png_110x10000.jpg_").findOne().click()
            sleep(1000);
        }
        else {
            toastLog("今天已签到")
        }

        while (text("偷金币").findOne(1000) == null) {
            swipe(540, 500, 540, 2000, 300)//上划
        }
        click(540, 965);//收果实
        sleep(1000);
        click(942, 1100);
        var 领水滴界面 = text("领水滴赚金币").findOne(8000);
        if (领水滴界面) {
            toastLog("进入领水滴界面")
            var 打卡 = text("打卡").findOne(1000);
            if (打卡) {
                打卡.click();
            }
            while (1) {
                var 一键领取 = text("一键领取").findOne(1000);
                if (一键领取) {
                    一键领取.click();
                    sleep(2000);
                }
                var 去逛逛 = text("去逛逛").findOne(2000);
                if (去逛逛) {
                    去逛逛.click();
                    toastLog("去逛逛");
                    if (text("2.9元包邮").findOne(2000)) {
                        sleep(5000);
                    } else if (desc("指定页面下单购物").findOne(1000)) {
                        back();
                        sleep(1000);
                        continue;
                    } else if (text("领取奖励").findOne(10000)) {
                        var 领取奖励 = text("领取奖励").findOne().bounds();
                        click(领取奖励.centerX(), 领取奖励.centerY());
                        sleep(1000);
                        continue;
                    }
                    sleep(7000);
                    back();
                    while (1) {
                        if (text("领水滴赚金币").findOne(4000)) {
                            break;
                        } else {
                            click(538, 1996);//淘宝人生每日签到关闭按钮
                            sleep(1000);
                            click(530, 1818);//淘宝人生的好友赠礼关闭按钮
                            sleep(1000);
                            click(530, 1818);//淘宝人生的好友赠礼关闭按钮
                            sleep(1000);
                            click(530, 1818);//淘宝人生的好友赠礼关闭按钮
                            sleep(1000);
                            click(540, 1457);//淘宝人生的回到淘宝按钮
                            sleep(1000);
                            click(357, 1818);//省钱消消乐的回到淘宝按钮
                            sleep(1000);
                        }
                    }
                    sleep(1000);
                } else {
                    toastLog("没有去逛逛了！");
                    break;
                }

            }
            var 一键领取 = text("一键领取").findOne(1000);
            if (一键领取) {
                一键领取.click();
                sleep(1000);
            }
            while (1) {
                sleep(2000);
                var 去完成 = text("去完成").findOne(2000)
                if (去完成) {
                    sleep(1000);
                    去完成.click();
                    sleep(1000);
                    var 扫一扫 = id("scan_icon").findOne(4000);
                    if (扫一扫) {
                        扫一扫.click();
                        sleep(2000);
                        var 继续上传 = text("继续上传").findOne(3000);
                        if (继续上传) {
                            继续上传.click();
                        }
                        var 扫一扫完成 = id("image_detect_icon").findOne(5000);
                        if (扫一扫完成) {
                            sleep(100000);
                            toastLog("点击拍照领金币图标")
                            click(962, 2094);
                            var 拍照领金币 = desc("领取奖励").findOne(3000);
                            if (拍照领金币) {
                                toastLog("拍照领金币领取奖励");
                                sleep(11000);
                                back();
                            } else {
                                toastLog("没有拍照领金币的奖励");
                            }
                            while (!text("领水滴赚金币").findOne(1000)) { back(); }
                        } else {
                            toastLog("未找到扫一扫");
                            back();
                        }
                    } else if (text("进群打卡领金币").findOne(2000)) {
                        // text("进群打卡领金币").findOne().click();
                        sleep(1000)
                        var 进群打卡 = desc("进群打卡").findOne().bounds();
                        click(进群打卡.centerX(), 进群打卡.centerY());
                        sleep(1000);
                        while (!text("领水滴赚金币").findOne(1000)) {
                            sleep(1000);
                            back();
                        }
                        //因为后退后又回到主页面了，索性整个流程重新来一遍
                        // return taobao_coins();
                    } else if (text("历史搜索").findOne(1000)) {
                        toastLog("进入搜索领金币");
                        click(40, 400);//点第一个历史搜索
                        sleep(12000);
                        while (!text("领水滴赚金币").findOne(1000)) { back(); }
                    } else if (text("领取奖励").findOne(6000)) {
                        var 领取奖励 = text("领取奖励").findOne().bounds();
                        click(领取奖励.centerX(), 领取奖励.centerY());
                        sleep(1000);
                    }
                    else {
                        toastLog("退回");
                        sleep(1000);
                        back();
                        sleep(2000);
                    }
                } else {
                    break;
                }
            }
            var 一键领取 = text("一键领取").findOne(1000);
            if (一键领取) {
                一键领取.click();
                sleep(1000);
            }
            sleep(1000);
            click("关闭");
            toastLog("关闭水滴任务菜单")
            sleep(2000);

        } else {
            toastLog("没有进入水滴界面")
            back();
            return taobao_coins();
        }
        while (text("偷金币").findOne(1000) == null) {
            swipe(540, 500, 540, 2000, 300)//上划
        }
        sleep(1000);
        toastLog(("开始偷金币"))
        if (text("偷金币").findOne(1000)) {
            toastLog("点击偷金币")
            click(980, 900);
            var num = 0;
            var 偷金币界面 = text("浇水偷菜的乐趣，不如去好朋友的庄园看看吧～").findOne(7000);
            while (1) {
                if (偷金币界面) {
                    toastLog("在偷金币界面")
                    sleep(1000);
                    while (1) {
                        toastLog("找浇水")
                        var 可浇水 = text("可浇水").findOne(500);
                        if (可浇水) {
                            可浇水.click();
                            if (text("浇水").findOne(10000)) {
                                var 浇水 = text("浇水").findOne().bounds();
                                click(浇水.centerX(), 浇水.centerY());
                                sleep(1000);
                                back();
                                sleep(3000);
                            } else {
                                toastLog("未知原因，还未进入他人庄园")
                            }
                        } else {
                            toast("浇水没找到");
                            break;
                        }
                    }
                    while (1) {
                        toastLog("找偷金币")
                        var 偷金币 = text("偷金币").depth(18).findOne(500);
                        if (偷金币) {
                            var 偷金币 = 偷金币.bounds();
                            click(偷金币.centerX(), 偷金币.centerY());
                            if (text("浇水").findOne(10000)) {
                                sleep(1000);
                                click(540, 964);//偷金币
                                sleep(1000);
                                back();
                                sleep(3000);
                            } else {
                                toastLog("未知原因，还未进入他人庄园")
                            }
                        } else {
                            // toast("偷金币没找到");
                            break;
                        }
                    }
                    sleep(1000);
                    if (num > 7) {
                        toastLog("常用好友已检查完，关闭！");
                        click("关闭");
                        sleep(2000);
                        break;
                    }
                    if (text("个好友可偷金币").findOne(500)) {
                        toastLog("个好友可偷金币")
                        var 点开好友列表 = text("个好友可偷金币").findOne().bounds();
                        click(点开好友列表.centerX(), 点开好友列表.centerY());
                        sleep(1000);
                    } else {
                        toastLog("全部好友都找遍了！");
                        click("关闭");
                        sleep(2000);
                        break;
                    }
                    num += 1;
                    toastLog("下滑第" + num + "次")
                    swipe(540, 2000, 540, 1000, 200);//下划
                } else {
                    toastLog("未在偷金币界面");
                    exit();
                }
            }
        }
        toastLog("检查金币成就");
        while (1) {
            click(144, 129, 234, 216);//左上角金币
            if (desc("购物默认抵扣").findOne(5000)) {
                click(34, 1076, 1044, 1335);
                if (text("金币成就").findOne(5000)) {
                    break;
                } else {
                    toastLog("未找到金币成就，不确定是否进入金币成就界面，后退重启！")
                    while (!text("超级抵钱").findOne(3000)) { back(); }
                }
            } else {
                toastLog("未找到购物默认抵扣，不确定是否进入我的金币界面，后退重启！")
                while (!text("超级抵钱").findOne(3000)) { back(); }
            }
        }
        if (text("金币成就").findOne(10000)) {
            while (1) {
                var 领取奖励 = desc("领取奖励").findOne(2000);
                if (领取奖励) {
                    var 领取奖励坐标 = 领取奖励.bounds();
                    click(领取奖励坐标.centerX(), 领取奖励坐标.centerY());
                    sleep(12000);
                    back();
                    sleep(1000);
                } else {
                    break;
                }
            }
        }
        while (!text("超级抵钱").findOne(1000)) { back(); }
        sleep(1000);
        if (text_log) {
            var patter = text_log.search("淘金币福利中心已完成");
            if (patter != -1) {
                toastLog("淘金币福利中心跳过");
            } else {
                toastLog("淘金币福利中心");
                click(250, 1100);
                if (desc("抽奖").findOne(10000)) {
                    var 免费可抽 = desc("免费可抽1次").findOne(2000)
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
        }
        sleep(1000);
        toastLog("进入今日任务");
        click(90, 1157);
        if (desc("好店签到送金币").findOne(10000)) {
            var num = 0;
            while (1) {
                var 签到5金币 = desc("签到 +5金币").findOne(2000);
                if (签到5金币) {
                    var 签到5金币 = 签到5金币.bounds();
                    if (签到5金币.centerY() > 2300) {
                        swipe(540, 2000, 540, 1000, 300);//下划
                        continue;
                    }
                    click(签到5金币.centerX(), 签到5金币.centerY());
                    sleep(2000);
                    back();
                    sleep(1000);
                } else {
                    break;
                }
            }
            toastLog("好店签到送金币结束");
            back();
            sleep(1000);
        }
        sleep(1000);
        while (!desc("首页").findOne(1000)) { back(); }
        home();
    } catch (err) {
        alert(err)
    } finally {
        return;
    }
}