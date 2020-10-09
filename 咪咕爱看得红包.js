auto.waitFor();
var height = device.height;
var width = device.width;
// toastLog("本设备的分辨率为，\n宽："+device.width+"\n长："+device.height);//输出设备的分辨率
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率


home();
sleep(1000);
SignIn_Miguaikan(); //咪咕爱看签到

function back_home() {
    var num = 0;
    while (num < 5) {
        if (!id("workspace").findOne(200)) {
            back();
            num += 1;
            toastLog("第" + num + "次尝试后退");
        } else { return; }
    }
    return;
}

function back_daily_welfare() {
    while (!text("会员每日福利").findOne(1000)) { back(); }
}

function SignIn_Miguaikan() {
    try {
        var appRun = currentActivity();
        if (appRun != "com.wondertek.miguaikan") {
            launch("com.wondertek.miguaikan");
            sleep(1000);
        }

        var close = id("splash_time").findOne(3000);
        if (close) {
            var close = close.bounds();
            click(close.centerX(), close.centerY());
        }
        sleep(1000);
        back();
        红包待解锁 = 0; //设定一个开关，代表今天还有视频红包没有领
        // var 我的 = text("我的").findOne(5000);
        var 我的 = id("image5_layout").findOne(5000);
        if (我的) {
            sleep(1000);
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            while (1) {
                var 福利 = textContains("福利").findOne(5000);
                var 福利 = 福利.bounds();
                if (福利.centerY() < 200) {
                    swipe(540, 500, 540, 2000, 500);
                } else { break; }
            }

            if (福利) {
                sleep(1000);
                click(福利.centerX(), 福利.centerY());
                var 界面 = text("会员每日福利").findOne(10000);
                if (界面) {
                    toastLog("咪咕爱看福利界面出现了");
                    swipe(540, 2000, 540, 1400, 500);
                } else {
                    toastLog("没有福利界面，重启");
                    return SignIn_Miguaikan();
                }
                while (1) {
                    var 去完成 = text("去完成").findOne(1000);
                    if (!去完成) {
                        var 去完成 = text("去查看").findOne(100);
                    }
                    if (去完成) {
                        toastLog("有去完成按钮");
                        sleep(1000);
                        去完成.click();
                        // var 去完成 = 去完成.bounds();
                        // click(去完成.centerX(), 去完成.centerY());

                        var 点击抽奖 = text("点击抽奖").findOne(8000);
                        if (点击抽奖) {
                            toastLog("点击抽奖");
                            sleep(1000);
                            var 点击抽奖 = 点击抽奖.bounds();
                            click(点击抽奖.centerX(), 点击抽奖.centerY());
                            if (textContains("当前剩余抽奖次数 0 次").findOne(1000)) {
                                back();
                                break;
                            }
                        }
                        back_daily_welfare();
                    }
                }
                sleep(1000);
                var 去分享 = text("去分享").findOne(1000);
                if (去分享) {
                    toastLog("有去分享按钮");
                    var 去分享 = 去分享.bounds();
                    click(去分享.centerX(), 去分享.centerY());
                    sleep(1000);
                    var 分享 = text("分享").findOne(10000);
                    if (分享) {
                        var 分享 = 分享.bounds();
                        click(分享.centerX(), 分享.centerY());
                        var 微信好友 = text("微信好友").findOne(3000);
                        if (微信好友) {
                            var 微信好友 = 微信好友.bounds();
                            click(微信好友.centerX(), 微信好友.centerY());
                            text("创建新聊天").findOne(10000);
                            back_homepage();
                            sleep(1000);
                            click(福利.centerX(), 福利.centerY());
                            sleep(2000);
                        }
                        sleep(1000);
                        back_daily_welfare();

                    } else {
                        toastLog("没有找到分享的选择");
                        back_daily_welfare();
                    }
                }
                sleep(1000);
                while (1) {
                    var 领取 = text("领取").findOne(1000);
                    if (领取) {
                        var 领取 = 领取.bounds();
                        click(领取.centerX(), 领取.centerY());
                        var 关闭按钮 = text("X").findOne(5000);
                        if (关闭按钮) {
                            var 关闭按钮 = 关闭按钮.bounds();
                            click(关闭按钮.centerX(), 关闭按钮.centerY());
                        }
                        sleep(1000);
                    } else {
                        break;
                    }
                }

                sleep(1000);
                while (1) {
                    var 立即领取 = text("立即领取").findOne(1000);
                    if (立即领取) {
                        toastLog("有奖励领取");
                        var 立即领取 = 立即领取.bounds();
                        click(立即领取.centerX(), 立即领取.centerY());
                        sleep(3000);
                        click(540, 1550); //关闭奖励页面
                        sleep(1000);
                    } else {
                        toastLog("没有奖励了");
                        break;
                    }
                }
                sleep(1000);
                toastLog("待解锁检测");

                var 待解锁 = text("待解锁").findOne(3000);
                if (待解锁) {
                    var a = text("待解锁").find();
                    toastLog("找到的待解锁数量：" + a.length);
                    红包待解锁 = a.length;
                } else {
                    toastLog("没有找到未解锁的奖励");
                    红包待解锁 = 0;
                }
                sleep(2000);
                //观看视频领红包
                if (红包待解锁 != 0) {
                    toastLog("进入看视频环节");
                    观看视频领红包();
                }
            } else {
                toastLog("未找到福利界面，重启!");
                return SignIn_Miguaikan();
            }
        } else {
            toastLog("未找到我的，重启");
            back_home();
            return SignIn_Miguaikan();
        }
    } catch (err) {
        toastLog(err);

    } finally {
        back_home();
        return;
    }
}

function back_homepage() {
    while (!id("image5_layout").findOne(1000)) { back(); }
    if (我的) {
        sleep(1000);
        var 我的 = 我的.bounds();
        click(我的.centerX(), 我的.centerY());
    }
}

function 观看视频领红包() {
    back_homepage();
    var 路人超能100 = text("路人超能100").findOne(5000);
    if (路人超能100) {
        sleep(1000);
        var 路人超能100 = 路人超能100.bounds();
        click(路人超能100.centerX(), 路人超能100.centerY());
        sleep(1000);
        if (text("共12集").findOne(5000)) {
            toastLog("开始看视频");
            进入视频();
        } else {
            toastLog("未知原因没有进入视频页面");
            return SignIn_Miguaikan();
        }

    } else {
        toastLog("没有找到设定的视频，退出");
        return;
    }
}

function 进入视频() {
    //今日不再提示
    var 今日不再提示 = text("今日不再提示").findOne(5000);
    if (今日不再提示) {
        var 今日不再提示 = 今日不再提示.bounds();
        click(今日不再提示.centerX(), 今日不再提示.centerY());
        sleep(1000);
        var 继续观看 = text("继续观看").findOne().bounds()
        click(继续观看.centerX(), 继续观看.centerY());
    }

    sleep(2000);
    //把视频清晰度调低
    while (1) {
        var 标清 = text("标清").findOne(2000);
        if (标清) {
            var 标清 = 标清.bounds();
            click(标清.centerX(), 标清.centerY());
            sleep(1000);
            click(850, 610);
            break;
        } else {
            click(850, 610);
            sleep(1000);
            click(850, 610);
        }
    }
    sleep(2000);
    //调低音量
    for (var i = 0; i < 5; i++) {
        swipe(940, 200, 940, 500, 500);
        sleep(500);
    }
    //点击多次选择最左边的集数
    for (var i = 0; i < 4; i++) {
        click(100, 1350);
        sleep(1000);
    }

    //等待
    if (红包待解锁 == 1) {
        toastLog("等待10分钟");
        sleep(10 * 60 * 1000);
    } else if (红包待解锁 == 2) {
        toastLog("等待60分钟");
        sleep(62 * 60 * 1000);
    } else {
        toastLog("等待180分钟");
        sleep(184 * 60 * 1000);
    }
    back_homepage();
    return SignIn_Miguaikan();
}