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

function save_log(text) {
    toastLog(text);
    var now = new Date();
    var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
    files.append(path, "\n" + text + "——" + now);
    return;
}

function back_Goldinterface() {
    var num = 0;
    while (1) {
        if (!text("今日总能量").findOne(1000)) {
            back();
            num += 1;
        } else if (num > 10) {
            return taobao_coins();
        } else {
            break;
        }
    }
}

function back_gold_index() {
    while (!text("超级抵钱").findOne(2000)) { back(); }
}

function image_coor(template_path) {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.findImage(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
}

function 寻找淘金币图标进入() {
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

function taobao_coins() {
    try {
        var appRun = currentActivity();
        if (appRun != 'com.taobao.taobao') {
            launch("com.taobao.taobao");
        }
        sleep(1000);

        寻找淘金币图标进入();

        sleep(2000);
        var 领淘金币 = textContains("领淘金币").findOne(2000);
        if (领淘金币) {
            领淘金币.click(); //领淘金币
            sleep(1000);
            textContains("领取").findOne(5000).click();
            sleep(2000);
            var coor = image_coor("./taobao/我知道了.png");
            if (coor) {
                click(coor.x, coor.y);
                sleep(1000);
            }
            var 领取奖励 = text("领取奖励").findOne(5000);
            if (领取奖励) {
                var 领取奖励 = 领取奖励.bounds();
                click(领取奖励.centerX(), 领取奖励.centerY());
                sleep(1000);
            }
        }
        合力次数 = text("合力").find().length * 2;
        while (合力次数 > 0) {
            var 合力 = text("合力").findOne(1000);
            if (合力) {
                var 合力 = 合力.bounds();
                click(合力.centerX(), 合力.centerY());
                sleep(2000);
                合力次数 = 合力次数 - 1;
                toastLog("目前剩余合力次数" + 合力次数 + "次");
            } else {
                break;
            }
        }
        sleep(1000);
        //买东西后有返回的金币
        click(150, 850);
        // while (1) {
        //     var 购后返 = text("购后返").depth(9).findOne(2000);
        //     if (购后返) {
        //         var 购后返 = 购后返.bounds();
        //         click(购后返.centerX(), 购后返.centerY());
        //         sleep(1000);
        //     } else {
        //         toastLog("没有购后返了");
        //         break;
        //     }
        // }
        var patter = text_log.search("今天淘金币全部好友找遍了！");
        if (patter != -1) {
            toastLog("今天淘金币全部好友找遍了！");
        } else {
            toastLog(("开始偷金币"));
            click(980, 1300);
            var num = 0;
            var 偷金币界面 = text("助力赚金币，合力领更多！共建和谐金币小镇").findOne(4000);
            while (1) {
                if (偷金币界面) {
                    sleep(2000);
                    l_1 = ['去助力', "喊Ta回来"]
                    for (var i = 0; i < l_1.length; i++) {
                        while (1) {
                            var 去助力 = text(l_1[i]).findOne(1000);
                            if (去助力) {
                                去助力.click();
                                if (text("本月互助比拼").findOne(10000)) {
                                    sleep(1000);
                                    var 助力 = text("立即助力").findOne(1000);
                                    if (!助力) {
                                        var 助力 = text(l_1[i]).findOne(1000);
                                    }
                                    if (助力) {
                                        var 助力 = 助力.bounds();
                                        click(助力.centerX(), 助力.centerY() - 100);
                                    }
                                    sleep(1000);
                                    back();
                                    sleep(500);
                                    偷金币界面;
                                } else {
                                    toastLog("未知原因，还未进入他人庄园助力");
                                    while (!偷金币界面) { back(); }
                                }
                            } else {
                                break;
                            }
                        }
                    }
                    while (1) {
                        var 邀请 = text("邀请Ta").findOne(1000);
                        if (邀请) {
                            邀请.click();
                            sleep(1000);
                        } else {
                            break;
                        }
                    }
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
        }
        sleep(1000);
        var 赚金币 = text("赚金币").findOne(5000);
        if (赚金币) {
            赚金币.click();
        } else {
            toastLog("没有找到赚金币，后退重启");
            back();
            return taobao_coins();
        }
        var 任务界面 = text("今日总能量").findOne(8000);
        if (任务界面) {
            toastLog("进入领水滴界面");
            var 打卡 = text("打卡").findOne(1000);
            if (打卡) {
                打卡.click();
            }

            var num_limit = 1;
            while (num_limit < 3) {
                toastLog("第" + num_limit + "次水滴赚金币");
                var 去施肥 = text("去施肥").findOne(500);
                if (去施肥) {
                    sleep(1000);
                    去施肥.click();
                    if (textContains("施肥一次").findOne(10000)) {
                        sleep(2000);
                        click(540, 1700);
                    }
                    back_Goldinterface();
                    sleep(1000);
                }

                x = 0;
                while (1) {
                    if (任务界面) {
                        sleep(1000);
                        var 去完成 = text("去完成").findOne(500);
                        if (x > 3) { x = 0; };
                        if (x != 0) {
                            var 去完成 = text("去完成").findOnce(x);
                        }
                        if (去完成) {
                            sleep(1000);
                            去完成.click();
                            coin_loop();
                        } else {
                            break;
                        }
                        sleep(1000);
                        var l_num = 0;
                        while (1) {
                            var 领取奖励 = text("领取奖励").findOne(1000);
                            if (领取奖励) {
                                领取奖励.click();
                                sleep(1000);
                                l_num += 1;
                            } else if (l_num > 5) {
                                break;
                            } else {
                                break;
                            }
                        }
                        sleep(1000);
                    } else {
                        toastLog("不在任务页面，后退");
                        back_Goldinterface();
                    }
                }
                var num = 0;
                while (1) {
                    var 领取奖励 = text("领取奖励").findOne(1000);
                    if (领取奖励) {
                        领取奖励.click();
                        sleep(1000);
                        num += 1;
                    } else if (num > 5) {
                        break;
                    } else {
                        break;
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
        back_gold_index();
        if (!text("超级抵钱").findOne(2000)) {
            寻找淘金币图标进入();
        }
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
        if (desc("浏览好店送金币").findOne(10000)) {
            toastLog("进入浏览好店送金币");
            sleep(1000);
            var num = 0;
            while (1) {
                var 签到5金币 = descContains("10秒+10").findOne(2000);
                if (签到5金币) {
                    var 签到5金币 = 签到5金币.bounds();
                    if (签到5金币.centerY() > 2300) {
                        swipe(540, 2000, 540, 1000, 300); //下划
                        continue;
                    }
                    click(签到5金币.centerX(), 签到5金币.centerY());
                    text("浏览10秒送金币").findOne(5000);
                    sleep(10000);
                    var 关注 = text("关注+10").findOne(2000);
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
        }
        sleep(1000);
        home();
    } catch (err) {
        alert(err);
    } finally {
        // back_home();
        return;
    }
}

function coin_loop() {
    sleep(2000);
    swipe(540, 2000, 540, 1500, 500);
    if (descContains("添加").findOne(2000)) {
        toastLog("进入添加好友界面");
        click(200, 950);
        click(540, 950);
        click(800, 950);
        sleep(1000);
        back_Goldinterface();
    } else if (text("进群打卡领金币").findOne(2000)) {
        sleep(1000);
        var 进群打卡 = desc("进群打卡").findOne().bounds();
        click(进群打卡.centerX(), 进群打卡.centerY());
        sleep(1000);
        back_Goldinterface();
    } else if (text("充值中心").findOne(200)) {
        toastLog("进入了充值中心");
        back_Goldinterface();
        x += 1;
    } else if (textContains("桌面").findOne(200)) {
        toastLog("进入了启动桌面小插件的任务");
        back_Goldinterface();
        x += 1;
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
    } else if (text("收集V币").findOne(1000)) {
        toastLog("进入了天猫V榜");
        sleep(15000);
        back_Goldinterface();
    } else if (textContains("滑动浏览").findOne(1000)) {
        toastLog("滑动浏览得奖励");
        swipe(540, 2000, 540, 1500, 500);
        if (text("任务完成").findOne(10000)) {
            toastLog("滑动浏览得奖励已完成");
        }
        back_Goldinterface();

    } else if (desc("指定页面下单购物").findOne(500)) {
        back();
    } else if (id("scan_icon").findOne(3000)) {
        id("scan_icon").findOne().click();
        sleep(2000);
        var 继续上传 = text("继续上传").findOne(2000);
        if (继续上传) {
            继续上传.click();
        }
        var 扫一扫完成 = text("浏览本页面").findOne(5000);
        if (扫一扫完成) {
            sleep(11000);
            back_Goldinterface();
        } else {
            toastLog("未找到扫一扫");
            back();
        }
    } else if (text("历史搜索").findOne(500)) {
        toastLog("进入搜索领金币");
        var 展开更多搜索历史 = desc("展开更多搜索历史").findOne(1000);
        if (展开更多搜索历史) {
            var 展开更多搜索历史 = 展开更多搜索历史.bounds();
            click(展开更多搜索历史.centerX(), 展开更多搜索历史.centerY());
            sleep(500);
        }
        click(40, 400); //点第一个历史搜索
        sleep(12000);
        back_Goldinterface();
        sleep(2000);
    } else if (textContains("摇钱树").findOne(500)) {
        sleep(10000);
        back_Goldinterface();
    } else if (text("男装淘金币抵扣会场").findOne(500)) {
        sleep(10000);
        back_Goldinterface();
    } else if (desc("指定页面下单购物").findOne(500)) {
        sleep(10000);
        back_Goldinterface();
        sleep(1000);
    } else if (text("我要自拍").findOne(500)) {
        x += 1;
        back();
        sleep(1000);
        back();
    } else if (text("成就礼包").findOne(500)) {
        var 成就礼包 = text("成就礼包").findOne(1000).bounds();
        click(成就礼包.centerX(), 成就礼包.centerY());
        sleep(1000);
        var 收下了 = text("我收下了").findOne(2000);
        if (收下了) {
            var 收下了 = 收下了.bounds();
            click(收下了.centerX(), 收下了.centerY());
            sleep(1000);
        }
        swipe(540, 1800, 540, 1400, 500);
        while (1) {
            var coor = image_coor("./taobao/成就领取奖励.png");
            if (coor) {
                if (coor.y > 2100) {
                    swipe(540, 1800, 540, 1500, 500);
                    continue;
                }
                click(coor.x, coor.y);
                sleep(1000);
            } else {
                break;
            }
        }
        var 月度账单 = text("月度账单").findOne(2000).bounds();
        click(月度账单.centerX(), 月度账单.centerY());
        sleep(1000);
        back_Goldinterface();

    } else if (image_coor("./taobao/前进.png")) {
        toastLog("进入了淘宝人生逛街");
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

    } else if (text("红包poplayer").findOne(2000)) {
        toastLog("进入了淘宝特价版");
        sleep(1000);
        back_Goldinterface();
    }
    while (1) {
        if (text("今日总能量").findOne(2000)) {
            break;
        } else {
            toastLog("还未退回任务界面！");
            back();
            // back_Goldinterface();
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
                back_Goldinterface();
            } else if (text("加入购物车").findOne(1000)) {
                toastLog("进入了淘宝特价版");
                back_Goldinterface();
            } else if (回到淘宝) {
                toastLog("回到淘宝");
                click(回到淘宝.x, 回到淘宝.y);
                sleep(1000);
            }
            // else if () {
            //     toastLog("进入");
            //     back_Goldinterface();
            // }
        }
    }
    return;
}