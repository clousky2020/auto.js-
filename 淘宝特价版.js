auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率
var height = device.height;
var width = device.width;
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
    toast("请求截图失败");
    exit();
}
retry = 0;
sleep(1000);
taobao_coins();

function back_home() {
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

function back_homepage() {
    while (!textContains("赚特币").findOne(1000)) { back(); }
    sleep(1000);
}

function image_coor(template_path) {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.findImage(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
}

function match_image_coor(template_path) {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.matchTemplate(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
}

function taobao_coins() {
    try {
        if (retry > 1) {
            alert("重试次数超出" + retry + "次，退出");
            exit;
        }
        var appRun = currentActivity();
        if (appRun != 'com.taobao.litetao') {
            launch("com.taobao.litetao");
        }
        sleep(2000);
        var 关闭 = desc("关闭").findOne(2000);
        if (关闭) {
            toastLog("剪贴板中有链接，点击关闭");
            关闭.click();
        }
        click(100, 2250);
        back_homepage();
        var 签到拿红包 = text("签到拿红包").findOne(5000);
        if (签到拿红包 && 签到拿红包.bounds().centerY() > 200) {
            sleep(1000);
            签到拿红包.click();
            if (textContains("开启签到提醒").findOne(5000)) {
                var withdraw = text("点击提现到支付宝").findOne(2000);
                if (withdraw) {
                    var withdraw = withdraw.bounds();
                    click(withdraw.centerX(), withdraw.centerY());
                    textContains("知道了").findOne().click();
                }
                back();
            } else {
                back_homepage();
                return taobao_coins();
            }
        } else {
            return taobao_coins();
        }
        //开始玩别的
        back_homepage();
        var 立即领取 = text("立即领取").findOne(3000);
        if (立即领取) {
            var 立即领取 = 立即领取.bounds();
            click(立即领取.centerX(), 立即领取.centerY());
            // back();
            sleep(1500);
        }
        click(900, 2300); //点击进入我的页面
        sleep(2000);
        //进入频道拿特币
        var num = 0;
        while (num < 3) {
            var 进入 = text("5.9包邮").findOne(3000);
            if (进入) {
                var 进入 = 进入.bounds();
                click(进入.centerX(), 进入.centerY());
                sleep(1000);
                num += 1;
                back_homepage();
            }
        }
        var 赚特币 = text("天天赚特币").findOne(4000);
        if (赚特币) {
            sleep(1000);
            var 赚特币 = 赚特币.bounds();
            click(赚特币.centerX(), 赚特币.centerY());
            var 进入赚特币标志 = text("每天10:00更新").findOne(7000);
            if (进入赚特币标志) {
                toastLog("已进入赚特币界面");
                sleep(2000);
                var 立即领取 = text("立即领取").findOne(3000);
                if (立即领取) {
                    var 立即领取 = 立即领取.bounds();
                    click(立即领取.centerX(), 立即领取.centerY());
                    sleep(1500);
                    back();
                }
                click(660, 1100); //特币收钱
            } else {
                toastLog("未知原因，未进入赚特币界面,后退重启");
                retry += 1;
                back_home();
                return taobao_coins();
            }
            var num = 0;
            while (num < 2) {
                toastLog("第" + num + "次找图赚特币");
                var coor = image_coor("./litetao/早起打卡赚特币.png");
                if (coor) {
                    click(550, 1850);
                    sleep(1000);
                } else {
                    num += 1;
                    sleep(1000);
                }
            }
            sleep(1000);
            click(660, 1100); //特币收钱
            var 要这个 = text("要这个").findOne(2000);
            if (要这个) {
                var 要这个 = 要这个.bounds();
                click(要这个.centerX(), 要这个.centerY());
                sleep(1000);
                back();
            }
            sleep(1000);
            //早起打卡
            toastLog("早起打卡");
            var 早起打卡 = text("TB1VVsrIHY1gK0jSZTEXXXDQVXa-89-43.png_").findOne(5000);
            if (早起打卡) {
                toastLog("找到早起打卡赚钱的图标了");
                var 早起打卡 = 早起打卡.bounds();
                click(早起打卡.centerX(), 早起打卡.centerY());
                var 打卡界面 = text("早起打卡挑战赛").findOne(4000);
                if (打卡界面) {
                    var 报名 = text("50特币报名赚更多").findOne(2000);
                    if (!报名) {
                        var 报名 = text("速速打卡").findOne(1000);
                    }
                    var coor = image_coor("./litetao/早起打卡-开心收下.png");
                    if (coor) {
                        click(coor.x, coor.y);
                    }
                    if (报名) {
                        var 报名 = 报名.bounds();
                        click(报名.centerX(), 报名.centerY());
                        sleep(1000);
                        var 继续报名 = textContains("继续报名").findOne(2000);
                        if (继续报名) {
                            继续报名.click();
                            sleep(1000);
                        }
                    } else {
                        click(540, 1050);
                        click(540, 1500);
                    }
                } else {
                    toastLog("没有找到早起打卡界面，重启");
                    back_homepage();
                    return taobao_coins();
                }
                back();
            } else {
                toastLog("没有进入签到页面，重启");
                back_homepage();
                return taobao_coins();
            }
            sleep(2000);
            //特币收钱
            // var coor = image_coor("./litetao/特币收钱.png");
            // if (coor) {
            //     click(coor.x, coor.y);
            //     sleep(1000);
            //     text("知道了").findOne(3000).click();
            // } else {
            //     toastLog("没有了收钱");
            // }
            click(660, 1100); //特币收钱
            sleep(1000);
            //做任务
            var coor = image_coor("./litetao/特币任务.png");
            if (coor) {
                click(coor.x, coor.y);
                sleep(2000);
                赚币中心();
            } else {
                back_homepage();
                return taobao_coins();
            }
            // while(!text("兑换").findOne(1000)){back();}
            sleep(1000);
            for (var i = 0; i < 3; i++) { swipe(540, 1000, 540, 2000, 500); }
            //收任务奖励
            var num = 0;
            while (num < 4) {
                var coor = match_image_coor("./litetao/任务奖励.png");
                if (coor.matches.length > 0) {
                    coor.matches.forEach(match => {
                        click(match.point.x, match.point.y);
                        sleep(200);
                    })
                    num += 1;
                    sleep(1000);
                } else {
                    toastLog("没有了任务奖励");
                    break;
                }
            }
            sleep(1000);
            //特币收钱
            click(660, 1100);
            // if (知道了) { 知道了.click(); }
            sleep(1000);
        } else {
            toastLog("不在首页,后退重启！");
            back_homepage();
            return taobao_coins();
        }
        back_homepage();
        var 翻卡牌 = text("翻卡牌").findOne(3000);
        if (翻卡牌) {
            var 翻卡牌 = 翻卡牌.bounds();
            click(翻卡牌.centerX(), 翻卡牌.centerY());
            sleep(3000);
            //检测是否进入了翻牌界面
            var 开始翻牌 = text("TB1gcO6k4rI8KJjy0FpXXb5hVXa-584-247").findOne(5000);
            if (开始翻牌) {
                var 开始翻牌 = 开始翻牌.bounds();
                while (1) {
                    var coor = image_coor("./litetao/不能翻牌.png");
                    if (coor) {
                        toastLog("已经不能翻牌了");
                        sleep(1000);
                        break;
                    } else {
                        click(开始翻牌.centerX(), 开始翻牌.centerY());
                        sleep(5000);
                        text("继续玩").findOne().click();
                        sleep(1000);
                    }
                }
            } else {
                toastLog("没有找到开始翻牌");
            }
        }
        back_homepage();
        // 百万开奖
        var 百万入口 = text("天天100万").findOne(2000);
        if (百万入口) {
            百万入口.click();
            var 知道了 = text("知道了").findOne(5000);
            if (知道了) {
                var 知道了 = 知道了.bounds();
                click(知道了.centerX(), 知道了.centerY());
            }
            var 下注 = text("100特币去下注赢一百万").findOne(2000);
            if (下注) {
                下注.click();
                var 下注成功 = textContains("知道了").findOne(4000);
                if (下注成功) {
                    下注成功.click();
                }

            }
        }
        back_homepage();

    } catch (err) {
        alert(err);
    } finally {
        back_home();
        return;
    }
}

function 开始翻牌() {
    var 开始翻牌 = text("TB1gcO6k4rI8KJjy0FpXXb5hVXa-584-247").findOne(2000);
    var 开始翻牌 = 开始翻牌.bounds();
    while (1) {
        click(开始翻牌.centerX(), 开始翻牌.centerY());
        sleep(5000);
        var 继续玩 = text("继续玩").findOne(4000);
        if (继续玩) {
            var 继续玩 = 继续玩.bounds();
            click(继续玩.centerX(), 继续玩.centerY());
        } else {
            break;
        }
    }
}

function 赚币中心() {
    var 赚币中心 = text("赚币中心").findOne(2000);
    if (赚币中心) {
        list1 = ["去发现", "去完成", "去浏览"];
        for (var i = 0; i < list1.length; i++) {
            x = 0;
            while (1) {
                if (x > 2) { x = 0 };
                if (x == 0) {
                    var 点击 = text(list1[i]).findOne(1000);
                } else {
                    var 点击 = text(list1[i]).findOnce(x);
                }
                if (点击) {
                    toastLog("现在点击的是" + list1[i]);
                    var 点击 = 点击.bounds();
                    if (点击.centerY() > 2300) {
                        swipe(540, 2000, 540, 1200, 500);
                        sleep(500);
                        continue;
                    } else if (点击.centerY() < 1200) {
                        swipe(540, 1400, 540, 2000, 500);
                        sleep(500);
                        continue;
                    }
                    click(点击.centerX(), 点击.centerY());
                    最终任务浏览界面();
                    while (!text("赚币中心").findOne(1000)) { back(); }
                    sleep(1000);
                } else {
                    break;
                }
            }
        }
    } else {
        toastLog("没有进入赚币中心，重启");
        return taobao_coins();
    }
    var close = text("关闭").findOne(3000);
    if (close) {
        close.click();
    }
    return;
}

function 最终任务浏览界面() {
    if (text("爆款热卖").findOne(3000)) {
        toastLog("进入爆款热卖了，无用，后退");
        x += 1;
        return;
        // } else if (textContains("直播好").findOne(1000)) {
        //     toastLog("进入了没有用的页面，后退");
        //     x += 1;
        //     return;
    } else if (textContains("一分钱").findOne(1000)) {
        toastLog("进入了没有用的页面，后退");
        x += 1;
        return;
    }
    var 点击领取今日特币 = text("点击领取今日特币").findOne(1000);
    var 特币已存 = text("特币已存，明天再来").findOne(1000);
    if (点击领取今日特币) {
        点击领取今日特币.click();
        x += 1;
        sleep(1000);
        return;
    } else if (特币已存) {
        toastLog("特币已存");
        x += 1;
        return;
    } else if (coor = image_coor("./litetao/去花特币.png")) {
        toastLog("特币已存满");
        x += 1;
        return;
    }
    swipe(540, 2000, 540, 1000, 500);
    var num = 0;
    while (1) {
        var coor = image_coor("./litetao/逛15s最高得.png")
        if (coor) {
            swipe(540, 2000, 540, 1000, 500);
            sleep(12000);
            检查完成标志();
            break;
        } else if (image_coor("./litetao/滑动浏览.png")) {
            sleep(15000);
            检查完成标志();
            break;
        } else if (image_coor("./litetao/看30秒最高得.png")) {
            sleep(20000);
            检查完成标志();
            break;
        } else if (num > 5) {
            x += 1;
            break;
        } else {
            toastLog("第" + num + "次找不到目标图片");
            num += 1;
            sleep(500);
        }
    }
    return;
}

function 检查完成标志() {
    var num = 0;
    while (1) {
        var coor = image_coor("./litetao/去收.png");
        if (coor) {
            back();
            return;
        } else if (num > 10) {
            return;
        } else {
            toastLog("没有找到去收图标");
            num += 1;
            sleep(1000);
        }
    }
}