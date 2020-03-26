auto.waitFor();
var height = device.height;
var width = device.width;
// toastLog("本设备的分辨率为，\n宽："+device.width+"\n长："+device.height);//输出设备的分辨率
setScreenMetrics(1080, 2340);//设定以下坐标点击的基准屏幕分辨率

var now = new Date();
var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
if (files.isFile(path)) {
    var text_log = files.read(path);
}
home();
sleep(1000);

SignIn_Miguaikan();//咪咕爱看签到
SignIn_Unicom();//联通营业厅
Sign_autonavi();//高德地图签到
SignIn_Alibaba();//阿里巴巴领元宝
SignIn_Alibaba_AlipayGphone();//支付宝阿里巴巴领元宝
SignIn_Smzdm();//什么值得买
SignIn_Mommypocket();//美物清单
SignIn_Netease_Cloudmusic();//网易云音乐
SignIn_Fandengreader(); //樊登读书
SignIn_Baidu_netdisk();//百度网盘
SignIn_jingdong();//京东
Signin_TaobaoPhone();//领取淘宝的话费
SignIn_Baidu_Wenku();//百度文库
SignIn_ximalaya();//喜马拉雅
SignIn_idlefish();//咸鱼签到
SignIn_Sfacg();//sf小说签到
// SignIn_Alipay_draw_every_day();//支付宝天天抽奖！废弃

function save_log(text) {
    toastLog(text);
    var now = new Date();
    var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
    files.append(path, "\n" + text + "——" + now);
    return;
}
function SignIn_ximalaya() {
    try {
        if (text_log) {
            var patter = text_log.search("喜马拉雅已签到");
            if (patter != -1) {
                toastLog("喜马拉雅跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.ximalaya.ting.android") {
            launch("com.ximalaya.ting.android");
            sleep(1000);
        }
        var 跳过广告 = id("host_close_firework").findOne(4000);
        if (跳过广告) {
            var 跳过广告 = 跳过广告.bounds();
            click(跳过广告.centerX(), 跳过广告.centerY())
        }
        while (1) {
            var 账号 = text("账号").findOne(5000);
            if (账号) {
                sleep(1000);
                var 账号 = 账号.bounds();
                click(账号.centerX(), 账号.centerY());
                var 积分图标 = desc("用户头像").findOne(8000);
                if (积分图标) {
                    click(792, 357, 912, 477);
                    //sleep(1000);
                    //var 积分图标=积分图标.bounds();
                    //click(积分图标.centerX(),积分图标.centerY());
                    while (1) {
                        var 日常任务 = text("日常任务").findOne(3000);
                        if (日常任务) {//出现这个字样，说明进入了福利中心
                            while (1) {
                                var 我知道了 = text("我知道了").findOne(2000);
                                if (我知道了) {
                                    我知道了.click();
                                    sleep(1000);
                                }
                                var 领取 = text("领取").findOne(2000);
                                if (领取) {
                                    领取.click();
                                    sleep(1000);
                                } else {
                                    save_log("喜马拉雅已签到");
                                    back();
                                    return;
                                }
                            }
                        } else {
                            toastLog("未进入福利中心！");
                            back();
                            sleep(1000);
                        }
                    }
                }
            } else {
                toastLog("喜马拉雅未找到，重启");
                while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至华为桌面
                sleep(1000);
                return SignIn_ximalaya();
            }
        }

    } catch (err) {
        toastLog(err);
    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至华为桌面
        sleep(1000);
        return;
    }
}
function SignIn_Miguaikan() {
    try {
        if (text_log) {
            var patter = text_log.search("咪咕爱看已完成");
            if (patter != -1) {
                toastLog("咪咕爱看跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.wondertek.miguaikan") {
            launch("com.wondertek.miguaikan");
            sleep(1000);
        }

        var close = id("close").findOne(4000);
        if (close) {
            var close = id("close").findOne().bounds();
            click(close.centerX(), close.centerY());
        }
        var 我的 = text("我的").findOne(10000);
        if (我的) {
            sleep(1000);
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            var 福利 = textContains("福利").findOne(10000);
            if (福利) {
                sleep(1000);
                var 福利 = 福利.bounds();
                click(福利.centerX(), 福利.centerY());
                var 领取 = text("领取").findOne(2000);
                if (领取) {
                    sleep(1000);
                    var 领取 = 领取.bounds();
                    click(领取.centerX(), 领取.centerY());
                    if (text("签到成功").findOne()) {
                        click(495, 1596, 585, 1686);//关闭
                        sleep(1000);
                    }
                }
                var 去完成 = text("去完成").findOne(2000);
                if (去完成) {
                    sleep(1000);
                    var 去完成 = 去完成.bounds();
                    click(去完成.centerX(), 去完成.centerY());
                    var 点击抽奖 = text("点击抽奖").findOne(8000);
                    if (点击抽奖) {
                        sleep(1000);
                        var 点击抽奖 = 点击抽奖.bounds();
                        click(点击抽奖.centerX(), 点击抽奖.centerY());

                    }
                }
                save_log("咪咕爱看已完成！");
            } else {
                toastLog("未找到福利界面，重启!");
                return SignIn_Miguaikan();
            }
        } else {
            toastLog("未找到我的，重启");
            while (!desc("设置默认主屏幕").findOne(1000)) {
                back();
            }//后退至华为桌面
            sleep(1000);
            return SignIn_Miguaikan();
        }
    } catch (err) {
        toastLog(err);

    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) {
            back();
        }//后退至华为桌面
        sleep(1000);
        return;
    }
}
function SignIn_Alipay_draw_every_day() {
    try {
        toastLog("开始支付宝天天抽奖！")
        var appRun = currentActivity();
        if (appRun != 'com.eg.android.AlipayGphone') {
            launch("com.eg.android.AlipayGphone");
            sleep(1000);
        }
        sleep(1000);
        var 首页 = text("首页").findOne(10000);
        if (首页) {
            var 首页 = 首页.bounds();
            click(首页.centerX(), 首页.centerY());
            sleep(1000);
            toastLog("点击进入淘宝首页");
        } else {
            toastLog("支付宝没有找到首页图标！后退重启！");
            while (!desc("设置默认主屏幕").findOne(1000)) {
                back();
            }
            return SignIn_Alibaba_AlipayGphone();
        }
        var 我的小程序 = text("我的小程序").findOne(3000);
        if (我的小程序) {
            var 我的小程序 = 我的小程序.bounds();
            click(我的小程序.centerX(), 我的小程序.centerY());
            var 天天抽奖 = text("天天抽奖…").findOne(5000);
            if (天天抽奖) {
                var 收下 = text("收下").findOne(2000);
                if (收下) {
                    var 收下 = 收下.bounds();
                    click(收下.centerX(), 收下.centerY());
                    sleep(2000);
                }
                var 天天抽奖 = 天天抽奖.bounds();
                click(天天抽奖.centerX(), 天天抽奖.centerY());
                var 守护宝 = text("守护宝").findOne(10000);
                if (守护宝) {
                    sleep(1000);
                    click(540, 1820);//弹窗关闭
                    sleep(1000);
                    var 守护宝 = 守护宝.bounds();
                    click(守护宝.centerX(), 守护宝.centerY());
                    sleep(1000);
                    var 守护金 = text("守护金").findOne(1500);
                    if (守护金) {
                        守护金.click();
                        sleep(1000);
                        守护金.click();
                        var 去领取 = text("去领取").findOne(2000);
                        if (去领取) {
                            去领取.click();
                            sleep(3000);
                            back();
                            sleep(1000);
                        }
                    }
                    // while (1) {
                    //     while (1) {
                    //         var 领取 = text("领取").findOne(1000);
                    //         if (领取) {
                    //             领取.click();
                    //             sleep(1000);//等待刷新任务
                    //         } else {
                    //             break;
                    //         }
                    //     }
                    //     var 任务点 = textContains("(0/1)").findOne(2000);
                    //     if (任务点) {
                    //         // toastLog(任务点);
                    //         // var 任务点 = 任务点.bounds();
                    //         // click(任务点.centerX()+573, 任务点.centerY()+28.5);
                    //         click(830, 1600);//进入赏金任务
                    //         toastLog("进入了")
                    //         sleep(11000);
                    //         back();
                    //         sleep(2000);//等待刷新任务

                    //     } else {
                    //         toastLog("没有赏金任务了");
                    //         break;
                    //     }
                    // }

                }
            } else {
                toastLog("未找到天天抽奖，重启");
                while (!text("我的小程序").findOne(1000)) {
                    back();
                }
                return SignIn_Alipay_draw_every_day();
            }
        } else {
            toastLog("未找到我的小程序，重启");

            return SignIn_Alipay_draw_every_day();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Alipay_draw_every_day();

    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面

        return;
    }
}
function SignIn_Baidu_Wenku() {
    try {
        if (text_log) {
            var patter = text_log.search("百度文库今日已签");
            if (patter != -1) {
                toastLog("百度文库跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.baidu.wenku") {
            launch("com.baidu.wenku");
            sleep(1000);
        }
        var 跳过广告 = id("skip_ad_layout").findOne(5000);
        if (跳过广告) {
            toastLog("跳过广告");
            跳过广告.click();
        }
        var 签到有奖 = text("签到有奖").findOne(3000);
        if (签到有奖) {
            sleep(1000);
            var 签到有奖 = 签到有奖.bounds();
            click(签到有奖.centerX(), 签到有奖.centerY());
            while (1) {
                if (textContains("签到并领取").findOne(4000)) {
                    textContains("签到并领取").findOne().click();
                    sleep(2000);
                    toastLog("开始百度文库安全验证！");
                    gesture(2000, [0.212 * width, 0.601 * height], [0.812 * width, 0.603 * height]);//安全验证拖至最右
                    // save_log("百度文库已安全验证！");
                    sleep(2000);//等待5秒后奖励界面消失

                    if (id("iv_close").findOne(3000)) {
                        id("iv_close").findOne(3000).click();
                        save_log("文库今日已签");
                        break;
                    } else {
                        return;
                    }
                } else if (textContains("今日已签").findOne(5000)) {
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

            //第7天领取下载卷
            // var 领取下载卷 = id("sign_enter").findOne(2000);
            // if (领取下载卷) {
            //     var 领取下载卷 = 领取下载卷.bounds();
            //     click(领取下载卷.centerX(), 领取下载卷.centerY());
            //     sleep(2000);
            //     toastLog("开始百度文库安全验证！");
            //     gesture(2000, [0.212 * width, 0.601 * height], [0.812 * width, 0.603 * height]);//安全验证拖至最右
            //     save_log("百度文库已安全验证！");
            //     sleep(5000);//等待5秒后奖励界面消失
            //     back();
            //     home();
            //     return;
            // }
            // click(0.479 * width, 0.681 * height);
            // if (text("安全验证").findOne(2000)) {
            //     sleep(2000);
            //     toastLog("开始百度文库安全验证！");
            //     gesture(2000, [0.212 * width, 0.601 * height], [0.812 * width, 0.603 * height]);//安全验证拖至最右
            //     save_log("百度文库已安全验证！");
            //     sleep(5000);//等待5秒后奖励界面消失
            //     back();
            //     home();
            //     return;
            // }

            var 已连续签到 = text("已连续签到").findOne(2000);
            if (已连续签到) {
                toastLog("百度文库已连续签到");
            } else if (text("查看签到").findOne(2000)) {
                save_log("百度文库今天已经签到过了");
            } else {
                alert("没有找到已连续签到");
            }
        } else {
            toastLog("未找到签到有奖，重启");
            while (!text("签到有奖").findOne(1000)) {
                back();
            }
            return SignIn_Baidu_Wenku();
        }
    } catch (err) {
        toastLog(err);
    } finally {
        home();
        return;
    }
}
function Signin_TaobaoPhone() {
    try {
        if (text_log) {
            var patter = text_log.search("淘宝话费已完成");
            if (patter != -1) {
                toastLog("淘宝话费跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.taobao.taobao") {
            launch("com.taobao.taobao");
            sleep(1000);
        }
        sleep(1000);
        while (1) {
            var 充值中心 = text("充值中心").findOne(5000);
            if (充值中心) {
                toastLog("找到充值中心了")
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
        var 去翻倍 = desc("继续赚").findOne(2000);
        if (去翻倍) {
            save_log("淘宝话费已完成");
            while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
            return;
        }
        var 去领取 = desc("去兑换").findOne(10000);
        if (去领取) {
            sleep(1000);
            var 去领取 = 去领取.bounds();
            click(去领取.centerX(), 去领取.centerY());
            var 签到领 = text("签到领").findOne(7000);
            if (签到领) {
                toastLog("进入签到领界面");
                sleep(1000);
                var 签到领 = 签到领.bounds();
                click(签到领.centerX(), 签到领.centerY());
                if (text("今日已领取").findOne(3000)) {
                    save_log("淘宝话费已经领取");
                    while (!desc("设置默认主屏幕").findOne(1000)) {
                        back();
                    }//后退至桌面
                    return;
                } else {
                    toastLog("未找到签到成功的标志！不确定是否签到成功！");
                    while (!desc("设置默认主屏幕").findOne(1000)) {
                        back();
                    }//后退至桌面
                    return;
                }
            }
        } else {
            alert("未找到去领取!重启!");
            while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
            return Signin_TaobaoPhone();
        }

    } catch (err) {
        toastLog(err);
        return Signin_TaobaoPhone();
    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
        sleep(1000);
        return;
    }
}


function SignIn_jingdong() {
    try {
        if (text_log) {
            var patter = text_log.search("京东今天已领豆");
            if (patter != -1) {
                toastLog("京东跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.jingdong.app.mall") {
            launch("com.jingdong.app.mall");
            sleep(1000);
        }

        while (!text("首页").depth(8).findOne(2000)) { back(); }
        sleep(1000);
        text("首页").depth(8).findOne(1000).click();

        var 领京豆 = text("领京豆").depth(13).findOne(5000);
        if (领京豆) {
            toastLog("进入京东！");
            var 领京豆 = 领京豆.bounds();
            click(领京豆.centerX(), 领京豆.centerY());
            var 签到领京豆 = text("签到领京豆").findOne(3000);
            if (签到领京豆) {
                sleep(1000);
                var 签到领京豆 = 签到领京豆.bounds();
                click(签到领京豆.centerX(), 签到领京豆.centerY());
                sleep(3000);
                back();
            }
            var 抽京豆 = text("抽京豆").findOne(5000);
            if (抽京豆) {
                var 抽京豆 = 抽京豆.bounds();
                click(抽京豆.centerX(), 抽京豆.centerY());
                if (text("规则").findOne()) {
                    sleep(1000);
                    click(554, 1100);
                    sleep(1000);
                    back();
                    sleep(1000);
                }
            } else {
                toastLog("没有进入京东领豆页面！");
                while (!text("领京豆").findOne(2000)) { back(); }
                return SignIn_jingdong();
            }
            //种豆得豆
            click(1000, 300);
            sleep(2000);
            var 点击领取 = text("点击领取").findOne(4000);
            if (点击领取) {
                var 点击领取 = 点击领取.bounds();
                click(点击领取.centerX(), 点击领取.centerY());
                sleep(2000);
            }
            // toastLog("收取他人的培养液");
            // while (1) {
            //     click(399, 1531.5);
            //     sleep(1000);
            //     var one = text("1").findOne(2000);
            //     if (one) {
            //         var 点击领取 = text("点击领取").findOne(4000);
            //         if (点击领取) {
            //             var 点击领取 = 点击领取.bounds();
            //             click(点击领取.centerX(), 点击领取.centerY());
            //             sleep(1000);
            //             back();
            //         } else {
            //             back();
            //         }
            //     } else {
            //         click(540.5, 2076);
            //         break;
            //     }
            //     sleep(2000);
            // }
            var 培养 = text("培养").findOne(4000);
            if (培养) {
                var 培养 = 培养.bounds();
                click(培养.centerX(), 培养.centerY());
                sleep(1000);
            }
            back();
            sleep(1000);
            var 进店领豆 = text("进店领豆").findOne(5000);
            if (进店领豆) {
                var 进店领豆 = 进店领豆.bounds();
                click(进店领豆.centerX(), 进店领豆.centerY());
                sleep(1000);
                var num = 0
                while (1) {
                    var 去完成 = text("去完成").findOne(2000);
                    if (去完成) {
                        var 去完成 = 去完成.bounds();
                        click(去完成.centerX(), 去完成.centerY());
                        num += 1;
                        sleep(2000);
                        back();
                        sleep(1000);
                    } else { break; }
                    if (num > 3) { break; }
                }
                back();
                sleep(2000);
            } else {
                toastLog("未找到进店领豆,后退至桌面后重启!");
                while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
                return SignIn_jingdong();
            }
            var 双签领豆 = text("双签领豆").findOne(5000);
            if (双签领豆) {
                var 双签领豆 = 双签领豆.bounds();
                click(双签领豆.centerX(), 双签领豆.centerY());
                sleep(3000);
                var 双签领奖励 = text("双签领奖励").findOne(10000);
                if (双签领奖励) {
                    sleep(1000);
                    click(900, 1050);//去京东金融app签到
                    sleep(3000);
                    if (text("双签领奖励").findOne(2000)) {
                        toastLog("还停留在这个页面，可能是因为已经领取今日奖励了");
                        save_log("京东今天已领豆！");
                        while (!desc("设置默认主屏幕").findOne(1000)) {
                            back();
                        }//后退至桌面
                        toastLog("已经后退到桌面！")
                        return;
                    }
                    while (1) {
                        var 签到领钢镚 = text("签到领钢镚").findOne(5000);
                        if (签到领钢镚) {
                            sleep(2000);
                            var 签到领钢镚 = 签到领钢镚.bounds();
                            click(签到领钢镚.centerX(), 签到领钢镚.centerY());
                            if (text("签到成功").findOne(5000)) {
                                sleep(1000);
                                while (!text("双签领奖励").findOne(1000)) { back(); }//退回到双签领奖励界面
                            } else {
                                while (!text("签到领钢镚").findOne(1000)) { back(); }//退回到签到领钢镚界面
                                continue;
                            }
                            click(900, 1280);//点击双签领奖励
                            sleep(2000);
                            click(540, 1720);//最终领取奖励坐标
                            sleep(1000);
                            home();
                            save_log("京东今天已领豆！");
                            return;
                        } else {
                            toastLog("未跳转到金融app领钢镚界面");
                            while (!text("每日签到").findOne(2000)) { back(); }//后退
                            var 每日签到 = text("每日签到").findOne(2000).bounds();
                            click(每日签到.centerX(), 每日签到.centerY());
                            sleep(1000);
                            continue;
                        }
                    }

                }

            }
        } else {
            toastLog("未找到领京豆，重启");
            while (!desc("设置默认主屏幕").findOne(1000)) {
                back();
            }//后退至桌面
            return SignIn_jingdong();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_jingdong();
    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面

        sleep(1000);
        return;
    }
}
function SignIn_Baidu_netdisk() {
    try {
        if (text_log) {
            var patter = text_log.search("百度网盘");
            if (patter != -1) {
                toastLog("百度网盘跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.baidu.netdisk") {
            launch("com.baidu.netdisk");
            sleep(1000);
        }
        var 我的 = text("我的").findOne(6000);
        if (我的) {
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            var 待领取 = textContains("待领取").findOne(6000);
            if (待领取) {
                var 待领取 = 待领取.bounds();
                press(待领取.centerX(), 待领取.centerY(), 450);
                var 签到 = text("签到").findOne(10000);
                if (签到) {
                    var 签到 = 签到.bounds();
                    click(签到.centerX(), 签到.centerY());
                    var 马上观看 = text("马上观看").findOne(5000);
                    if (马上观看) {
                        var 马上观看 = 马上观看.bounds();
                        click(马上观看.centerX(), 马上观看.centerY());
                        sleep(44000);
                        var 了解一下 = text("了解一下").findOne();
                        if (了解一下) {
                            var 关闭 = id("btn_close").findOne(5000);
                            if (关闭) {
                                var 关闭 = 关闭.bounds();
                                click(关闭.centerX(), 关闭.centerY());
                                sleep(1000);
                                while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
                                save_log("百度网盘已完成！");
                                return;
                            }
                        }

                    }
                } else {
                    toastLog("没有签到标识！");
                    while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
                    return SignIn_Baidu_netdisk();
                }
            } else {
                save_log("百度网盘没有待领取,应该是已完成！");
                while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
                return;
            }

        } else {
            toastLog("未找到我的界面，重启");
            while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
            return SignIn_Baidu_netdisk();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Baidu_netdisk();
    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
        sleep(1000);
        return;
    }
}
function SignIn_Fandengreader() {
    try {
        if (text_log) {
            var patter = text_log.search("樊登读书已签到");
            if (patter != -1) {
                toastLog("樊登读书跳过");
                return;
            }
        }
        sleep(1000);

        var appRun = currentActivity();
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
        while (我的) {
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            sleep(1000);
            var 签到有礼 = text("签到有礼").findOne(4000);
            if (签到有礼) {
                var 签到有礼 = 签到有礼.bounds();
                press(签到有礼.centerX(), 签到有礼.centerY() + 50, 450);
                sleep(2000);
                back();
                save_log("樊登读书已签到");
                return;
            } else if (text("签到完成").findOne(1000)) {
                save_log("樊登读书已签到");
                return;
            }
            else {
                toastLog("樊登读书没有找到签到");
                return SignIn_Fandengreader();
            }
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Fandengreader();
    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
        sleep(1000);
        return;
    }
}

function SignIn_Netease_Cloudmusic() {
    try {
        if (text_log) {
            var patter = text_log.search("网易云音乐已签到");
            if (patter != -1) {
                toastLog("网易云音乐跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.netease.cloudmusic") {
            launch("com.netease.cloudmusic");
            sleep(1000);
        }
        while (1) {
            var 每日推荐 = text("每日推荐").findOne(6000);
            if (每日推荐) {
                sleep(1000);
                click(100, 150);//打开菜单栏
                sleep(1000);
                var 签到 = text("签到").findOne(3000);
                if (签到) {
                    var 签到 = 签到.bounds();
                    click(签到.centerX(), 签到.centerY());
                    sleep(1000);
                    back();
                } else if (text("已签到").findOne(3000)) {
                    save_log("网易云音乐已签到");
                    sleep(1000);
                    home();
                    return;
                } else {
                    while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
                    return SignIn_Netease_Cloudmusic();
                }

            } else {
                toastLog("未找到网易云音乐主界面，重启");
                while (!text("每日推荐").findOne(1000)) { back(); }//后退至桌面
                return SignIn_Netease_Cloudmusic();
            }
        }

    } catch (err) {
        toastLog(err);
        return SignIn_Netease_Cloudmusic();

    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
        sleep(1000);
        return;
    }
}
function SignIn_Mommypocket() {
    try {
        if (text_log) {
            var patter = text_log.search("美物清单已完成");
            if (patter != -1) {
                toastLog("美物清单跳过");
                return;
            }
        }
        sleep(1000);

        var appRun = currentActivity();
        if (appRun != "com.shouqu.mommypocket") {
            launch("com.shouqu.mommypocket");
            sleep(1000);
        }
        //添加广告关闭的按钮
        while (1) {
            var 广告 = id("push_popup_close").findOne(3000);
            if (广告) {
                toastLog("有广告！")
                var 广告 = 广告.bounds();
                click(广告.centerX(), 广告.centerY());
                sleep(1000);
            } else {
                break;
            }
        }
        var 福利 = text("福利").findOne(10000);
        if (福利) {
            toastLog("已经找到福利，成功启动美物清单！")
            sleep(2000);
            save_log("美物清单已完成！");
            home();
            return;
        } else {
            toastLog("未找到我的主界面，重启");
            return SignIn_Mommypocket();
        }
    } catch (err) {
        toastLog(err);
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
        return SignIn_Mommypocket();

    } finally {
        sleep(1000);
        return;
    }
}

function SignIn_Smzdm() {
    try {
        if (text_log) {
            var patter = text_log.search("什么值得买");
            if (patter != -1) {
                toastLog("什么值得买跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != "com.smzdm.client.android") {
            launch("com.smzdm.client.android");
            sleep(1000);
        }

        var 我的 = text("我的").findOne(10000);
        if (我的) {
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            sleep(1000);
            if (text("个人主页").findOne(5000)) {
                toastLog("进入个人主页了");
            } else {
                toastLog("未进入个人主页，重启")
                SignIn_Smzdm();
            }
            var 签到 = id("tv_login_sign").text("签到").findOne(4000);
            if (签到) {
                var 签到 = 签到.bounds();
                click(签到.centerX(), 签到.centerY());
                sleep(1000);
                if (text("已连续签到").findOne(5000)) {
                    back();
                    home();
                    save_log("今天什么值得买已经签到");
                    return;
                }

            } else if (textContains("已签到").findOne(1000)) {
                save_log("今天什么值得买已经签到");
            } else {
                toastLog("未找到签到标识");
                while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
                return SignIn_Smzdm();
            }
        } else {
            toastLog("未找到我的主界面，重启");
            while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
            return SignIn_Smzdm();
        }
    } catch (err) {
        toastLog(err);
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }

    } finally {
        sleep(1000);
        return;
    }
}
function SignIn_Alibaba() {
    try {
        if (text_log) {
            var patter = text_log.search("阿里巴巴");
            if (patter != -1) {
                toastLog("阿里巴巴跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != 'com.alibaba.wireless') {
            launch("com.alibaba.wireless");
            sleep(1000);
        }
        var 赚元宝 = text("赚元宝").findOne(7000);
        if (赚元宝) {
            toastLog("找到赚元宝了");
            sleep(5000);
            //click(450,640);
            var 赚元宝 = 赚元宝.bounds();
            press(赚元宝.centerX(), 赚元宝.centerY(), 450);
            var 做任务赚元宝 = text("做任务赚元宝").findOne(10000);
            if (做任务赚元宝) {
                sleep(3000);//有时候会出现抽奖
                var 做任务赚元宝 = 做任务赚元宝.bounds();
                click(做任务赚元宝.centerX(), 做任务赚元宝.centerY());
                if (text("今日已领取").findOne(2000)) {
                    save_log("阿里巴巴已搜索领元宝");
                    return;
                }
                var 去搜好货 = text("去搜好货").findOne(5000);
                if (去搜好货) {
                    sleep(1000);
                    var 去搜好货 = 去搜好货.bounds();
                    click(去搜好货.centerX(), 去搜好货.centerY());
                    var 搜索历史 = text("搜索历史").findOne(10000);
                    if (搜索历史) {
                        sleep(1000);
                        click(40, 470);//第一条搜索历史
                        sleep(2000);
                        while (!text("做任务赚元宝").findOne(1000)) {
                            back();
                            sleep(1000);
                        }
                    }
                }
                var 领10个元宝 = text("领10个元宝").findOne(10000);
                if (领10个元宝) {
                    sleep(1000);
                    var 领10个元宝 = 领10个元宝.bounds();
                    click(领10个元宝.centerX(), 领10个元宝.centerY());
                    sleep(1000);
                    save_log("阿里巴巴元宝已经领取");
                }

            } else {
                toastLog("未进入签到界面，后退重启！");
                back();
                back();

                return SignIn_Alibaba();
            }

        } else {
            toastLog("未找到赚元宝，重启");
            //while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
            return SignIn_Alibaba();
        }

    } catch (err) {
        toastLog(err);
        //while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
        //return SignIn_Alibaba();

    } finally {
        sleep(1000);
        return;
    }
}

function SignIn_Alibaba_AlipayGphone() {
    try {
        if (text_log) {
            var patter = text_log.search("支付宝里的阿里巴巴已完成");
            if (patter != -1) {
                toastLog("支付宝里的阿里巴巴跳过");
                return;
            }
        }
        sleep(1000);
        //支付宝里的阿里巴巴
        var appRun = currentActivity();
        if (appRun != 'com.eg.android.AlipayGphone') {
            launch("com.eg.android.AlipayGphone");
            sleep(1000);
        }
        var 首页 = text("首页").findOne(10000);
        if (首页) {
            var 首页 = 首页.bounds();
            click(首页.centerX(), 首页.centerY());
            sleep(1000);
            toastLog("点击进入淘宝首页");
        } else {
            toastLog("支付宝没有找到首页图标！后退重启！");
            while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
            return SignIn_Alibaba_AlipayGphone();
        }

        var 我的小程序 = text("我的小程序").findOne(4000);
        if (我的小程序) {
            var 我的小程序 = 我的小程序.bounds();
            click(我的小程序.centerX(), 我的小程序.centerY());
            var 阿里巴巴1 = text("阿里巴巴1…").findOne(10000);
            if (阿里巴巴1) {
                var 阿里巴巴1 = 阿里巴巴1.bounds();
                click(阿里巴巴1.centerX(), 阿里巴巴1.centerY());
                var 领元宝 = text("领元宝").findOne(10000);
                // var 阿里巴巴主界面 = id("h5_rl_title").findOne(10000);
                if (领元宝) {
                    sleep(3000);
                    click(540, 1820);//弹窗关闭
                    sleep(1000);
                    if (领元宝) {
                        var 领元宝 = 领元宝.bounds();
                        click(领元宝.centerX(), 领元宝.centerY());
                        var 领元宝界面2 = text("网页由 show.1688.com 提供").findOne(10000);
                        if (领元宝界面2) {
                            sleep(3000);
                            click(540, 1880);//弹窗关闭
                            sleep(1000);
                            click(724, 681);
                            sleep(1000);
                            click(900, 855);
                            sleep(1000);
                            save_log("支付宝里的阿里巴巴已完成！");
                            while (!text("我的小程序").findOne(1000)) {
                                back();
                            }
                            return;
                        }
                    }
                }
            } else {
                toastLog("未找到阿里巴巴1，重启");
                while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
                return SignIn_Alibaba_AlipayGphone();
            }
        } else {
            toastLog("未找到我的小程序，重启");
            while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
            return SignIn_Alibaba_AlipayGphone();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Alibaba_AlipayGphone();

    } finally {
        sleep(1000);
        return;
    }
}

function SignIn_idlefish() {
    try {
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != 'com.taobao.idlefish') {
            launch("com.taobao.idlefish");
            sleep(1000);
        }
        var 首页 = id("tab_icon").findOne(10000);
        if (首页) {
            var 首页坐标 = 首页.bounds();
            click(首页坐标.centerX(), 首页坐标.centerY());
            sleep(1000);
        } else {
            toastLog("咸鱼没有找到首页，退出重启");
            while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
            return SignIn_idlefish();
        }
        if (text_log) {
            var patter = text_log.search("闲鱼搜索框已完成");
            if (patter != -1) {
                toastLog("闲鱼搜索框跳过");
            } else {
                var 搜索框 = className("android.widget.ImageView").id("search_bg_img_front").findOne(2000);
                if (搜索框) {
                    toastLog("找到搜索框")
                    sleep(1000);
                    var 搜索框 = 搜索框.bounds();
                    click(搜索框.centerX(), 搜索框.centerY());
                    if (text("历史搜索").findOne(7000)) {
                        toastLog("选择宝贝")
                        sleep(2000);
                        click(130, 376);//点击历史记录第一个
                        sleep(1000);
                        back();
                        sleep(1000);
                        save_log("闲鱼搜索框已完成");
                    } else {
                        toastLog("历史搜索未加载")
                        back();
                        return SignIn_idlefish();
                    }
                }
            }
        }

        toastLog("切换到我的界面")
        while (1) {
            var 我的选中状态 = desc("我的，选中状态").findOne(2000);
            if (!我的选中状态) {
                var 我的坐标 = desc("我的，未选中状态").findOne(2000);
                我的坐标.click();
                // click(我的坐标.centerX(), 我的坐标.centerY());
                sleep(1000);
            } else {
                break;
            }
        }
        if (text_log) {
            var patter = text_log.search("今天边逛边赚宝箱领完了");
            if (patter != -1) {//改成-1，今天实行过一次就会跳过
                toastLog("边逛边赚跳过");
            } else {
                toastLog("开始边逛边赚")
                var 边逛边赚钱入口 = text("边逛边赚钱").findOne(5000);
                if (边逛边赚钱入口) {
                    边逛边赚钱入口.click();
                    if (depth("8").desc("边逛边赚钱").findOne(8000)) {
                        toastLog("进入边逛边赚钱了")
                        sleep(2000);
                        swipe(540, 2000, 540, 700, 200)//下滑
                        sleep(2000);
                        var 点击看 = desc("点击看").findOne(2000);
                        while (点击看) {
                            for (i = 1; i <= 2; i++) {
                                // className("android.widget.FrameLayout").drawingOrder(i).findOne(2000).click();
                                click(400 * i, 1330);
                                sleep(1500);
                                back();
                                while (1) {
                                    var 点击打开 = desc("点击打开").findOne(2000);

                                    if (点击打开) {
                                        var 点击打开 = 点击打开.bounds();
                                        sleep(1000);
                                        click(点击打开.centerX(), 点击打开.centerY());
                                        if (descContains("恭喜获得").findOne(3000)) {
                                            click(848, 754);//关闭
                                            sleep(2000);
                                            break;
                                        }


                                    } else { break; }
                                }
                            }
                            swipe(540, 2000, 540, 1000, 200);//下滑
                            sleep(1000);
                            var 点击看 = desc("点击看").findOne(3000);
                        }
                        if (!点击看) {
                            //save_log("今天边逛边赚宝箱领完了");
                            back();
                            sleep(1000);
                        }
                    }
                }
            }
        }


        toastLog("开始签到")
        var 签到页面入口 = text("闲鱼币").findOne(3000);
        if (签到页面入口) {
            签到页面入口.click();
            var 签到页面 = depth("8").text("闲鱼币").findOne(2000);
            if (签到页面) {
                sleep(3000);
                click(539, 469);//签到
                sleep(1000);
                click(670, 920);//收鱼篓
                sleep(2000);
                if (text_log) {
                    var patter = text_log.search("夺宝押注已结束");
                    if (patter != -1) {
                        toastLog("夺宝押注跳过");
                    } else {
                        toastLog("开始闲鱼币夺宝")
                        if (text("100闲鱼币夺宝 >").findOne()) {
                            text("100闲鱼币夺宝 >").findOne().click();
                            sleep(2000);
                            var 闲鱼币夺宝界面 = desc("无限投注，投注越多越容易中奖").findOne();
                            if (闲鱼币夺宝界面) {
                                //早上完善，晚上没有对应的按钮了
                                toastLog("进入闲鱼夺宝页面");
                                sleep(1000);
                                while (1) {
                                    var 夺宝押注入口 = desc("100闲鱼币夺宝").depth("21").findOne(2000);
                                    if (夺宝押注入口) {
                                        sleep(1000);
                                        var 夺宝押注入口 = 夺宝押注入口.bounds();
                                        if (夺宝押注入口.centerY() > 2300) {
                                            swipe(540, 2000, 540, 1500, 300);//把坐标点移上来
                                            continue;
                                        }
                                        click(夺宝押注入口.centerX(), 夺宝押注入口.centerY());
                                        sleep(1000);

                                        if (desc("100闲鱼币夺宝").findOne(3000)) {
                                            click(500, 1670);//点击进入押宝最终页面
                                            sleep(1000);
                                            if (desc("100闲鱼币夺宝").findOne()) {
                                                click(226, 1900);//减少投注
                                                sleep(1000);
                                                click(226, 1900);//减少投注
                                                sleep(1000);
                                                click(500, 2250);//确定投注
                                                sleep(1000);
                                                back();
                                            }
                                        } else {
                                            toastLog("本页面已压过了")
                                            back();
                                        }
                                    } else {
                                        save_log("夺宝押注已结束")
                                        var 我的闲鱼币 = (desc("我的闲鱼币").findOne(2000));
                                        if ("我的闲鱼币") {
                                            var 我的闲鱼币 = 我的闲鱼币.bounds();
                                            click(我的闲鱼币.centerX() - 229, 我的闲鱼币.centerY() + 46);//通过求出旁边的我的闲鱼币的控件坐标计算得到左边最终领取投资奖励的坐标
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
                }
                toastLog("开始任务");
                click(114, 1160);
                sleep(2000);
                while (1) {
                    var 可领取 = textContains("可领取").findOne(2000);
                    if (可领取) {
                        可领取.click();
                        sleep(500);
                    } else {
                        toastLog("已经领完了");
                        back();
                        break;
                    }
                }
                sleep(2000);
                click(670, 920);//收鱼篓
                sleep(1000);
                click(910, 1150);//点击换闲鱼币
                sleep(1000);
                back();
                sleep(1000);
                back();
            }
        } else {
            toastLog("未找到签到页面入口,重启!");
            return SignIn_idlefish();
        }
    } catch (err) {
        toastLog("出现错误" + err);
        return SignIn_idlefish();
    }
    finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
        sleep(1000);
        return;
    }
}

function Sign_autonavi() {
    try {
        if (text_log) {
            var patter = text_log.search("高德地图已完成");
            if (patter != -1) {
                toastLog("高德地图跳过");
                return;
            }
        }
        sleep(1000);
        var appRun = currentActivity();
        if (appRun != 'com.autonavi.minimap') {
            launch("com.autonavi.minimap");
            sleep(1000);
        }
        var rect = textContains("跳过").findOne(1500);
        if (rect) {
            var rect = rect.bounds();
            click(rect.centerX(), rect.centerY());//跳过广告界面
        }
        var rect = id("iv_close").findOne(3000);
        if (rect) {
            var rect = rect.bounds();
            click(rect.centerX(), rect.centerY());//跳过升级提示
        }
        var rect = text("我的").findOne(5000);
        if (rect) {
            var rect = rect.bounds();
            sleep(1000);
            press(rect.centerX(), rect.centerY(), 450);
            // click(891, 2265);
            var 签到 = desc("签到").findOne(3000);
            if (签到) {
                toast("点击签到")
                click(800, 130);
                if (text("签到成功！").findOne(7000)) {
                    sleep(5000);
                    click(500, 1200);
                    sleep(1000);
                    back();
                    home();
                    save_log("高德地图已完成!")
                    return;
                } else if (text("签到战绩").findOne(2500)) {
                    back();
                    home();
                    save_log("高德地图已完成!")
                    return;
                } else {
                    toastLog("未找到表示签到成功的标识！");
                    back();
                    home();
                }
            } else {
                while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
                sleep(1000);
                return Sign_autonavi();
            }
        }
    } catch (err) {
        toastLog("出现错误" + err);
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }
        sleep(1000);
        return Sign_autonavi();
    }
    finally {
        sleep(1000);
        return;
    }
}

function SignIn_Sfacg() {
    try {
        if (text_log) {
            var patter = text_log.search("SF已完成");
            if (patter != -1) {
                toastLog("SF跳过");
                return;
            }
        } sleep(1000);
        var appRun = currentActivity();
        if (appRun != 'com.sfacg') {
            launch("com.sfacg");
            sleep(1000);
        }
        var 广告关闭=id("tv_jump").findOne(2000)
        if (广告关闭) {
            广告关闭.click();
        }
        var 广告关闭=id("imgclose").findOne(4000)
        if (广告关闭) {
            广告关闭.click();
        }
        var rect = id("main_tab_image5").findOne(6000);
        // var rect = text("书库").findOne();
        if (rect) {
            // click(950, 2280);
            sleep(1000)
            var rect = rect.bounds();
            click(rect.centerX(), rect.centerY());

        } else {
            toast("没有找到我的主页，请重试！");
            return SignIn_Sfacg();
        }
        sleep(1000);
        //进入签到页面
        text("我的钱包").findOne();
        var rect = text("签到").findOne(2000);
        if (rect != null) {
            var rect = rect.bounds()
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
        } else if (text("已签到").findOne(2000)) {
            save_log("SF已完成!");
        }
        if (text("我的钱包").findOne()) {
            click(148, 915, 282, 1053)
            sleep(1000);
            var num = id("tv_voucher").findOne().text()
            if (num >= 35) {
                alert("SF代卷该使用了！数量：" + num)
            } else {
                toastLog("SF代卷数量：" + num)
            }
        }
    } catch (err) {
        toastLog(err);
    } finally {
        while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至华为桌面
        sleep(1000);
        return;
    }
}

function SignIn_Unicom() {
    try {
        if (text_log) {
            var patter = text_log.search("联通营业厅已完成");
            if (patter != -1) {
                toastLog("联通营业厅跳过");
                return;
            }
        } sleep(1000);
        var appRun = currentActivity();
        if (appRun != 'com.sinovatech.unicom.ui') {
            launch("com.sinovatech.unicom.ui");
            sleep(1000);
        }

        var 首页精选 = text("精选").findOne(7000);
        if (首页精选) {
            toastLog("进入首页了")
            // var close = text("oFr5vJX3UQPSC9zxHDaogEvWoQcnnqMLcSRw18J6ZKGBYq3rYYwU+bFUeVgLHba6x4zbn8bzKjtu8Nnnc5p8AAwDgFJ01yE0rBgAAAABJRU5ErkJggg==").findOne(5000)
            // if (close != null) {
            //     close.click();
            // }
            sleep(1000);
            toastLog("点击签到")
            press(205, 137, 400);
            var 签到页面 = textContains("做任务，赚金币").findOne(10000);
            if (签到页面) {
                toastLog("进入签到页面")
                sleep(2000);
                if (text("做任务得金币").findOne(3000)) {
                    click(540, 1479);
                    sleep(4000);
                    save_log("联通营业厅已完成");
                    while (!desc("设置默认主屏幕").findOne(1000)) { back(); }//后退至桌面
                    return;
                }
                //添加一个判断，第一次签到出来的弹窗
                toast("手动点击微博签到");
                click(252, 1260);//点击日常任务
                toastLog("去新浪微博签到")
                var 刷新浪微博 = text("刷新浪微博").findOne(3000);
                if (刷新浪微博 != null) {
                    click(936, 1620);//点击刷新新浪微博的去完成按钮
                    if (text("签到成功!").findOne(3000)) {
                        save_log("联通营业厅已完成");
                        return;
                    }
                    id("web_close").findOne().click();
                    home();
                } else {
                    toast("新浪微博已经签到");
                    back();
                    home();
                }
                save_log("联通营业厅已完成！")
            } else {
                toastLog("未进入签到页面，重启")
                back();
                return SignIn_Unicom();
            }
        } else {
            toastLog("未进入首页,后退重启");
            //while (!text("精选").findOne(1000)) { back(); }
            back();
            return SignIn_Unicom();
        }
    } catch (err) {
        toastLog(err);

    } finally {
        home();
        //while (!text("精选").findOne(1000)) {back();}//后退至桌面
        return;
    }
}