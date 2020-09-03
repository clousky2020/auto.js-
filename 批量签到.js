auto.waitFor();
var height = device.height;
var width = device.width;
// toastLog("本设备的分辨率为，\n宽："+device.width+"\n长："+device.height);//输出设备的分辨率
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率
var now = new Date();
var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
files.createWithDirs(path);
var text_log = files.read(path);
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
    toast("请求截图失败");
    exit();
}

back_home();
SignIn_jingdong(); //京东
Sign_autonavi(); //高德地图签到
SignIn_Alipay(); //支付宝签到领积分
SignIn_Alibaba_AlipayGphone(); //支付宝阿里巴巴领元宝
SignIn_Alibaba(); //阿里巴巴领元宝
SignIn_idlefish(); //闲鱼签到
SignIn_Smzdm(); //什么值得买
SignIn_Mommypocket(); //美物清单
SignIn_Netease_Cloudmusic(); //网易云音乐
SignIn_Fandengreader(); //樊登读书
SignIn_Baidu_netdisk(); //百度网盘
Signin_TaobaoPhone(); //领取淘宝的话费
SignIn_ximalaya(); //喜马拉雅
SignIn_Sfacg(); //sf小说签到
SignIn_Baidu_Wenku(); //百度文库
SignIn_Unicom(); //联通营业厅
function save_log(text) {
    toastLog(text);
    var now = new Date();
    var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
    files.append(path, "\n" + text + "——" + now);
    return;
}

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
    while (1) {
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

function SignIn_ximalaya() {
    try {
        var patter = text_log.search("喜马拉雅已签到");
        if (patter != -1) {
            toastLog("喜马拉雅跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != "com.ximalaya.ting.android") {
            launch("com.ximalaya.ting.android");
            sleep(1000);
        }
        sleep(2000);
        back();
        while (1) {
            var 青少年设置 = text("知道了").findOne(2000);
            if (青少年设置) {
                var 青少年设置 = 青少年设置.bounds();
                click(青少年设置.centerX(), 青少年设置.centerY());
            }
            var 跳过广告 = id("host_close_firework").findOne(2000);
            if (跳过广告) {
                var 跳过广告 = 跳过广告.bounds();
                click(跳过广告.centerX(), 跳过广告.centerY());
            }
            if (text("桌面").findOne(3000)) {
                toastLog("不在首页");
                back();
                // while (!text("账号").findOne(500)) { back(); }
            }
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
                    var 日常任务 = text("日常任务").findOne(3000);
                    if (日常任务) { //出现这个字样，说明进入了福利中心
                        while (1) {
                            var 我知道了 = text("我知道了").findOne(2000);
                            if (我知道了) {
                                我知道了.click();
                                sleep(1000);
                            }
                            while (1) {
                                var 领取 = text("领取").findOne(2000);
                                if (领取) {
                                    var 领取坐标 = 领取.bounds();
                                    if (领取坐标.centerY() > 2300) {
                                        swipe(540, 2000, 540, 1800, 300);
                                        continue;
                                    }
                                    领取.click();
                                    sleep(1000);
                                } else {
                                    save_log("喜马拉雅已签到");
                                    back();
                                    return;
                                }
                            }
                        }
                    } else {
                        toastLog("未进入福利中心！");
                        back();
                        sleep(1000);
                    }
                }
            } else {
                toastLog("喜马拉雅未找到，重启");
                back_home();
                sleep(1000);
                return SignIn_ximalaya();
            }
        }
    } catch (err) {
        toastLog(err);
    } finally {
        back_home();
        toastLog("喜马拉雅结束");
        return;
    }
}

function SignIn_Baidu_Wenku() {
    try {
        var patter = text_log.search("百度文库今日已签");
        if (patter != -1) {
            toastLog("百度文库跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != "com.baidu.wenku") {
            launch("com.baidu.wenku");

            sleep(1000);
        }
        sleep(3000);
        var 签到有奖 = text("签到打卡").findOne(5000);
        if (签到有奖) {
            sleep(1000);
            var 签到有奖 = 签到有奖.bounds();
            click(签到有奖.centerX(), 签到有奖.centerY());
            while (1) {
                if (textContains("签到并领取").findOne(4000)) {
                    textContains("签到并领取").findOne().click();
                    if (text("身份验证").findOne(4000)) {
                        alert("百度今天需要身份验证，请手动验证！");
                    }
                    textContains("已连续签到").findOne();
                    // toastLog("开始百度文库安全验证！");
                    // gesture(2000, [0.212 * width, 0.601 * height], [0.812 * width, 0.603 * height]); //安全验证拖至最右
                    // save_log("百度文库已安全验证！");
                    // if (id("iv_close").findOne()) {
                    id("iv_close").findOne().click();
                    save_log("文库今日已签");
                    break;
                    // } 
                } else if (textContains("已连续签到").findOne(5000)) {
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
            var 已连续签到 = textContains("已连续签到").findOne(2000);
            if (已连续签到) {
                toastLog("百度文库已连续签到");
            } else if (text("查看签到").findOne(2000)) {
                save_log("百度文库今天已经签到过了");
            } else {
                alert("没有找到已连续签到");
            }
        } else {
            toastLog("未找到签到有奖，重启");
            back();
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
        var patter = text_log.search("淘宝话费已经领取");
        if (patter != -1) {
            toastLog("淘宝话费跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != "com.taobao.taobao") {
            launch("com.taobao.taobao");

            sleep(1000);
        }
        while (1) {
            var 首页 = desc("首页").findOne(3000);
            if (首页) {
                var 首页 = 首页.bounds();
                click(首页.centerX(), 首页.centerY());
                if (desc("充值中心").findOne(1000)) {
                    break;
                }
            } else {
                while (!desc("首页").findOne(1000)) { back(); }
            }
        }
        while (1) {
            var 充值中心 = desc("充值中心").findOne(5000);
            if (充值中心) {
                toastLog("找到充值中心了");
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
        var 继续赚 = desc("继续赚").findOne(2000);
        if (继续赚) {
            save_log("淘宝话费已经领取");
            back_home();
            return;
        }
        var 去领取 = desc("去兑换").findOne(3000);
        if (!去领取) {
            var 去领取 = desc("去领取").findOne(1000);
        }
        if (去领取) {
            toast("进入签到领");
            var 去领取 = 去领取.bounds();
            click(去领取.centerX(), 去领取.centerY());
            sleep(2000);
            var 签到领 = text("签到领").findOne(5000);
            if (签到领) {
                toastLog("进入签到领界面");
                sleep(1000);
                var 签到领 = 签到领.bounds();
                click(签到领.centerX(), 签到领.centerY());
                sleep(1000);
            }
            // if (textContains("今日已领取").findOne(5000)) {
            //     save_log("淘宝话费已经领取");
            //     back_home();
            //     return;
            // } else {
            //     toastLog("未找到签到成功的标志！不确定是否签到成功！");
            //     back_home();
            //     return;
            // }
            // }
            // var 做任务 = textContains("赚充值金").findOne(3000);
            // if (做任务) {
            //     toastLog("做任务赚充值金");
            // }
            // while (1) {
            //     var 去逛逛 = text("去逛逛").findOne(2000);
            //     if (去逛逛) {
            //         toastLog("去逛逛");
            //         var 去逛逛 = 去逛逛.bounds();
            //         click(去逛逛.centerX(), 去逛逛.centerY());
            //         // text("奖励话费").findOne(5000);
            //         sleep(16000);
            //         back();
            //         sleep(1000);
            //         // var 去领取 = text("TB1P3uDaz39YK4jSZPcXXXrUFXa-126-42.png?getAvatar_110x10000.jpg_").findOne(3000);
            //         // if (去领取) { 去领取.click(); } else { back(); }
            //     } else { break; }
            // }
            // while (1) {
            //     sleep(1000);
            //     var 领取 = text("领取").findOnce(1);
            //     if (领取) {
            //         toastLog("有奖励可领取");
            //         var 领取 = 领取.bounds();
            //         click(领取.centerX(), 领取.centerY());
            //         var 好的 = text("好的").findOne(500);
            //         if (好的) { 好的.click(); }
            //     } else { break; }
            // }
            save_log("淘宝话费已经领取");
        } else {
            toastLog("未找到去领取!重启!");
            back_home();
            return Signin_TaobaoPhone();
        }
    } catch (err) {
        toastLog(err);
        return Signin_TaobaoPhone();
    } finally {
        back_home();
        return;
    }
}

function SignIn_jingdong() {
    try {
        var appRun = currentPackage();
        if (appRun != "com.jingdong.app.mall") {
            launch("com.jingdong.app.mall");

            sleep(1000);
        }
        toastLog("打开京东");
        var 首页 = desc("首页").findOne(1000);
        if (!首页) {
            toastLog("没有找到首页，重启!");
            back();
            return SignIn_jingdong();
        }
        var 领京豆 = text("领京豆").findOne(5000);
        if (领京豆) {
            var 领京豆 = 领京豆.bounds();
            press(领京豆.centerX(), 领京豆.centerY(), 500);
            toastLog("进入京东签到页面！");
            if (!text("进店领豆").findOne(5000)) {
                toastLog("可能没有进入签到页面，后退重启！");
                back_home();
                return SignIn_jingdong();
            }
            var 签到领京豆 = text("签到领京豆").findOne(1000);
            if (签到领京豆) {
                sleep(1000);
                var 签到领京豆 = 签到领京豆.bounds();
                click(签到领京豆.centerX(), 签到领京豆.centerY());
                sleep(3000);
                back();
            }
            //种豆得豆
            sleep(1000);
            click(1000, 300);
            sleep(1000);
            while (!text("豆苗成长值").findOne(3000)) {
                while (!text("进店领豆").findOne(1000)) { back(); }
                click(1000, 300);
                sleep(1000);
            }
            l1 = ["1"]
            for (i = 0; i < l1.length; i++) {
                while (1) {
                    var 逛逛会场 = text(l1[i]).depth(15).findOne(1000);
                    if (逛逛会场) {
                        // toastLog("有一个逛逛会场的选择");
                        逛逛会场 = 逛逛会场.bounds();
                        click(逛逛会场.centerX(), 逛逛会场.centerY());
                        sleep(1000);
                        while (!text("豆苗成长值").findOne(1000)) { back(); }
                    } else { break; }
                }
            }
            sleep(1000);
            var 营养液坐标 = [
                [420, 850],
                [580, 780],
                [750, 900]
            ];
            //自己的营养液点击三次
            for (i = 0; i < 营养液坐标.length; i++) {
                click(营养液坐标[i][0], 营养液坐标[i][1]);
                sleep(100);
            }
            // while (1) {
            //     if (text("7点再来领取").findOne(500)) { break; }
            //     var 点击领取 = textMatches(/x[1-9]/).findOne(500);
            //     if (点击领取) {
            //         var 点击领取 = 点击领取.bounds();
            //         click(点击领取.centerX(), 点击领取.centerY());
            //         sleep(500);
            //     } else if (textMatches(/x0/).findOne(1000)) { break; }
            // }
            toastLog("检查朋友的营养液");
            swipe(540, 1800, 540, 1500, 500);
            sleep(500);
            list1 = ["./images/京东朋友2豆.png", "./images/京东朋友3豆.png"];
            var num_limit = 0;
            for (i = 0; i < list1.length; i++) {
                while (num_limit < 5) {
                    var coor = image_coor(list1[i]);
                    if (coor) {
                        click(coor.x, coor.y);
                        var 朋友界面 = text("你收取Ta").findOne(5000);
                        if (朋友界面) {
                            sleep(1000);
                            click(540, 800);
                            sleep(1000);
                            back();
                            sleep(1000);
                        }
                        num_limit += 1;
                        // var 点击领取 = textMatches(/x[1-9]/).findOne(2000);
                        // if (点击领取) {
                        //     var 点击领取 = 点击领取.bounds();
                        //     click(点击领取.centerX(), 点击领取.centerY());
                        //     num_limit += 1;
                        //     sleep(1000);
                        // back();
                        // sleep(1000);
                        // }
                    } else { toastLog("没有营养液可以收取了"); break; }
                }
            }
            sleep(1000);
            swipe(540, 1200, 540, 1700, 500);
            //自己的营养液点击三次
            for (i = 0; i < 营养液坐标.length; i++) {
                click(营养液坐标[i][0], 营养液坐标[i][1]);
                sleep(100);
            }
            while (!text("进店领豆").findOne(1000)) { back(); }
            sleep(1000);
            var patter = text_log.search("京东今天已领豆");
            if (patter != -1) {
                toastLog("京东跳过");
                return;
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
                while (!text("领京豆").findOne(500)) {
                    back();
                }
                return SignIn_jingdong();
            }
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
                        while (!text("任务集市").findOne(1000)) { back(); }
                        sleep(1000);
                    } else {
                        break;
                    }
                    if (num > 3) {
                        break;
                    }
                }
                back();
                sleep(2000);
            } else {
                toastLog("未找到进店领豆,后退至桌面后重启!");
                back_home();
                return SignIn_jingdong();
            }
            var 双签领豆 = text("双签领豆").findOne(5000);
            if (双签领豆) {
                var 双签领豆 = 双签领豆.bounds();
                click(双签领豆.centerX(), 双签领豆.centerY());
                sleep(3000);
                var 双签领奖励 = text("双签领奖励").findOne(5000);
                var 完成双签领取 = text("完成双签领取").findOne(1000);
                if (双签领奖励) {
                    sleep(1000);
                    click(900, 1050); //去京东金融app签到
                    sleep(3000);
                    if (text("双签领奖励").findOne(2000)) {
                        toastLog("还停留在这个页面，可能是因为已经领取今日奖励了");
                        if (完成双签领取) {
                            完成双签领取 = 完成双签领取.bounds();
                            click(完成双签领取.centerX(), 完成双签领取.centerY());
                            sleep(1000);
                        }
                        save_log("京东今天已领豆！");
                        // back_home();
                        // toastLog("已经后退到桌面！");
                        return;
                    }
                    while (1) {
                        var 签到领钢镚 = text("签到领钢镚1").findOne(5000);
                        if (签到领钢镚) {
                            sleep(2000);
                            var 签到领钢镚 = 签到领钢镚.bounds();
                            click(签到领钢镚.centerX(), 签到领钢镚.centerY());
                            if (text("签到成功").findOne(5000)) {
                                sleep(1000);
                                back(); //退回桌面
                            }
                            click(900, 1812); //点击双签领奖励
                            sleep(2000);
                            if (完成双签领取) {
                                var 完成双签领取坐标 = 完成双签领取.bounds();
                                click(完成双签领取坐标.centerX(), 完成双签领取坐标.centerY());
                            }
                            // click(540, 1720); //最终领取奖励坐标
                            sleep(1000);
                            while (!desc("首页").findOne(1000)) { back(); }
                            //可能是改版了原因，直接后退会退到桌面
                            return SignIn_jingdong();
                        } else {
                            toastLog("未跳转到金融app领钢镚界面");
                            while (!text("每日签到").findOne(2000)) {
                                back();
                            } //后退
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
            back_home();
            return SignIn_jingdong();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_jingdong();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Baidu_netdisk() {
    try {
        var patter = text_log.search("百度网盘");
        if (patter != -1) {
            toastLog("百度网盘跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != "com.baidu.netdisk") {
            launch("com.baidu.netdisk");

            sleep(1000);
        }

        var 我的 = text("我的").findOne(6000);
        if (我的) {
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            sleep(1000);
            var 待领取 = textContains("待领取").findOne(6000);
            if (待领取) {
                var 待领取 = 待领取.bounds();
                click(待领取.centerX(), 待领取.centerY());
                var 签到 = text("签到").findOne(10000);
                if (签到) {
                    var 签到 = 签到.bounds();
                    click(签到.centerX(), 签到.centerY());
                    var 马上观看 = textContains("看广告").findOne(3000);
                    if (马上观看) {
                        var 马上观看 = 马上观看.bounds();
                        click(马上观看.centerX(), 马上观看.centerY());
                        sleep(40000);
                        var 了解一下 = text("了解一下").findOne();
                        // var 倒计时 = id("video_duration").findOne();
                        if (了解一下) {
                            sleep(1000);
                            var 关闭 = id("btn_close").findOne(5000);
                            if (关闭) {
                                var 关闭 = 关闭.bounds();
                                click(关闭.centerX(), 关闭.centerY());
                                sleep(1000);
                                save_log("百度网盘已完成！");
                            }
                        }
                    }
                } else {
                    toastLog("没有签到标识！");
                    back_home();
                    return SignIn_Baidu_netdisk();
                }
            } else {
                save_log("百度网盘没有找到待领取,可能是已完成！");
                back_home();
                return;
            }
        } else {
            toastLog("百度网盘未找到我的界面，重启");
            back_home();
            return SignIn_Baidu_netdisk();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Baidu_netdisk();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Fandengreader() {
    try {
        var patter = text_log.search("樊登读书已签到");
        if (patter != -1) {
            toastLog("樊登读书跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
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
        if (我的) {
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            sleep(1000);
            var 签到有礼 = text("签到有礼").findOne(4000);
            if (签到有礼) {
                var 签到有礼 = 签到有礼.bounds();
                press(签到有礼.centerX(), 签到有礼.centerY() + 50, 450);
                sleep(2000);
                back();
            } else if (text("签到完成").findOne(1000)) {
                save_log("樊登读书已签到");
                return;
            } else {
                toastLog("樊登读书没有找到签到");
                back();
            }
        } else {
            toastLog("没有进入樊登读书，重启");
            back();
            return SignIn_Fandengreader();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Fandengreader();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Netease_Cloudmusic() {
    try {
        var patter = text_log.search("网易云音乐已签到");
        if (patter != -1) {
            toastLog("网易云音乐跳过");
            return;
        }
        var appRun = currentPackage();
        if (appRun != "com.netease.cloudmusic") {
            launch("com.netease.cloudmusic");

            sleep(1000);
        }

        while (1) {
            var 每日推荐 = text("每日推荐").findOne(6000);
            if (每日推荐) {
                sleep(1000);
                click(100, 150); //打开菜单栏
                sleep(1000);
                var 签到 = text("签到").findOne(3000);
                if (签到) {
                    签到.click();
                    // click(627,563,828,623);
                    sleep(2000);
                    if (text("云贝中心").findOne(3000)) {
                        save_log("网易云音乐已签到");
                    }
                    back_home();
                    return;
                } else if (text("赚云贝").findOne(2000)) {
                    save_log("网易云音乐已签到");
                    home();
                    return;
                } else {
                    back();
                    return SignIn_Netease_Cloudmusic();
                }
            } else {
                toastLog("未找到网易云音乐主界面，重启");
                swipe(540, 1500, 540, 2000, 500);
                back();
                return SignIn_Netease_Cloudmusic();
            }
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Netease_Cloudmusic();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Mommypocket() {
    try {
        var patter = text_log.search("美物清单已完成");
        if (patter != -1) {
            toastLog("美物清单跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != "com.shouqu.mommypocket") {
            launch("com.shouqu.mommypocket");

            sleep(1000);
        }
        //添加广告关闭的按钮
        var 广告 = id("push_popup_close").findOne(2000);
        var 通知关闭 = id("system_notice_item_close").findOne(2000);
        if (广告) {
            toastLog("有广告！");
            var 广告 = 广告.bounds();
            click(广告.centerX(), 广告.centerY());
            sleep(1000);
        } else if (通知关闭) {
            通知关闭.click();
            sleep(1000);
        }
        var 通知关闭 = id("system_notice_item_close").findOne(2000);
        if (通知关闭) {
            通知关闭.click();
            sleep(1000);
        }
        var 福利 = text("福利").findOne(2000);
        if (福利) {
            福利.click();
            toastLog("已经找到福利，成功启动美物清单！");
            sleep(2000);
            save_log("美物清单已完成！");
            home();
            return;
        } else {
            toastLog("美物清单未找到我的主界面，重启");
            // back_home();
            return SignIn_Mommypocket();
        }
    } catch (err) {
        toastLog(err);
        // back_home();
        return SignIn_Mommypocket();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Smzdm() {
    try {
        var patter = text_log.search("什么值得买");
        if (patter != -1) {
            toastLog("什么值得买跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != "com.smzdm.client.android") {
            launch("com.smzdm.client.android");

            sleep(1000);
        }
        var 我的 = text("我的").findOne(5000);
        if (我的) {
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            sleep(1000);
            if (text("个人主页").findOne(5000)) {
                toastLog("进入个人主页了");
            } else {
                toastLog("未进入个人主页，重启");
                back();
                return SignIn_Smzdm();
            }
            while (1) {
                var 签到 = text("签到领奖").findOne(4000);
                if (签到) {
                    toastLog("签到找到了");
                    签到.click();
                    sleep(1000);
                    back();
                } else if (textContains("已签").findOne(1000)) {
                    save_log("今天什么值得买已经签到");
                    // back_home();
                    return;
                } else {
                    toastLog("未找到签到标识");
                    back_home();
                    return SignIn_Smzdm();
                }
            }
        } else {
            toastLog("什么值得买未找到我的主界面，重启");
            back_home();
            return;
        }
    } catch (err) {
        toastLog(err);
        back_home();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Alibaba() {
    try {
        var patter = text_log.search("阿里巴巴元宝已经领取");
        if (patter != -1) {
            toastLog("阿里巴巴跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != 'com.alibaba.wireless') {
            launch("com.alibaba.wireless");

            sleep(1000);
        }

        sleep(4000);
        var 赚元宝 = text("赚元宝").findOne(7000);
        if (赚元宝) {
            toastLog("找到赚元宝了");
            sleep(2000);
            //click(450,640);
            var 赚元宝 = 赚元宝.bounds();
            press(赚元宝.centerX(), 赚元宝.centerY(), 600);
            var 做任务赚元宝 = text("做任务赚元宝").findOne(10000);
            if (做任务赚元宝) {
                sleep(1000); //有时候会出现抽奖
                var 做任务赚元宝 = 做任务赚元宝.bounds();
                click(做任务赚元宝.centerX(), 做任务赚元宝.centerY());
                if (text("今日已领取").findOne(1000)) {
                    save_log("阿里巴巴已搜索领元宝");
                    return;
                } else {
                    toastLog("阿里巴巴今日未领取，去搜好货");
                    while (1) {
                        //bounds = (765,1047,1026,1137)
                        click(800, 1100);
                        sleep(1000);
                        var 搜索历史 = text("搜索历史").findOne(3000);
                        if (搜索历史) {
                            sleep(1000);
                            click(40, 470); //第一条搜索历史
                            sleep(2000);
                            while (!text("做任务赚元宝").findOne(500)) {
                                back();
                            }
                            save_log("阿里巴巴元宝已经领取过了");
                            break;
                        } else {
                            toastLog("未找到搜索历史");
                            while (!text("做任务赚元宝").findOne(500)) {
                                back();
                            }
                            sleep(1000);
                            //return SignIn_Alibaba();
                        }
                    }
                }
                var 领10个元宝 = text("领10个元宝").findOne(2000);
                if (领10个元宝) {
                    sleep(1000);
                    var 领10个元宝 = 领10个元宝.bounds();
                    click(领10个元宝.centerX(), 领10个元宝.centerY());
                    sleep(1000);
                    save_log("阿里巴巴元宝已经领取");
                }
            } else {
                toastLog("未进入签到界面，后退重启！");
                while (!text("赚元宝").findOne(500)) {
                    back();
                }
                return SignIn_Alibaba();
            }
        } else {
            toastLog("未找到赚元宝，重启");
            back_home();
            return
        }
    } catch (err) {
        toastLog(err);
        back_home();
        return SignIn_Alibaba();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Alibaba_AlipayGphone() {
    try {
        var patter = text_log.search("支付宝里的阿里巴巴已完成");
        if (patter != -1) {
            toastLog("支付宝里的阿里巴巴跳过");
            return;
        }
        sleep(1000);
        //支付宝里的阿里巴巴
        var appRun = currentPackage();
        if (appRun != 'com.eg.android.AlipayGphone') {
            launch("com.eg.android.AlipayGphone");
            sleep(1000);
        }

        var 首页 = text("首页").findOne(10000);
        if (首页) {
            var 首页 = 首页.bounds();
            click(首页.centerX(), 首页.centerY());
            sleep(1000);
        } else {
            toastLog("支付宝没有找到首页图标！后退重启！");
            back_home();
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
                var 领元宝 = text("领元宝").findOne(5000);
                if (领元宝) {
                    sleep(3000);
                    click(540, 1820); //弹窗关闭
                    sleep(1000);
                    if (领元宝) {
                        var 领元宝 = 领元宝.bounds();
                        click(领元宝.centerX(), 领元宝.centerY());
                        var 领元宝界面2 = text("网页由 show.1688.com 提供").findOne(10000);
                        if (领元宝界面2) {
                            sleep(3000);
                            click(540, 1880); //弹窗关闭
                            sleep(1000);
                            var coor = image_coor("./taobao/赚更多元宝.png");
                            if (coor) {
                                click(coor.x, coor.y);
                                sleep(1000);
                            }
                            click(724, 681);
                            sleep(1000);
                            click(907, 1038);
                            sleep(1000);
                            click(900, 855);
                            sleep(2000);
                            save_log("支付宝里的阿里巴巴已完成！");
                            back_home();
                            return;
                        }
                    }
                }
            } else {
                toastLog("未找到阿里巴巴1，重启");
                back_home();
                return SignIn_Alibaba_AlipayGphone();
            }
        } else {
            toastLog("未找到我的小程序，重启");
            back_home();
            return SignIn_Alibaba_AlipayGphone();
        }
    } catch (err) {
        toastLog(err);
        return SignIn_Alibaba_AlipayGphone();
    } finally {
        back_home();
        return;
    }
}

function alipay_back() {
    while (!text("理财").findOne(1000)) { back(); } //后退至主页
}

function SignIn_Alipay() {
    try {
        // var patter = text_log.search("支付宝里的积分已领取");
        // if (patter != -1) {
        //     toastLog("支付宝里积分领取跳过");
        //     return;
        // }
        //支付宝里的积分
        var appRun = currentPackage();
        if (appRun != 'com.eg.android.AlipayGphone') {
            launch("com.eg.android.AlipayGphone");
            sleep(1000);
        }
        alipay_back();
        var 理财 = text("理财").findOne(500);
        if (理财) {
            var 理财 = 理财.bounds();
            click(理财.centerX(), 理财.centerY());
            sleep(2000);
            toastLog("查找黄金频道");
            var 黄金 = text("黄金").depth(5).findOne(2000);
            if (黄金) {
                var 黄金 = 黄金.bounds();
                click(黄金.centerX(), 黄金.centerY());
                text("卖出").findOne(3000);
                sleep(3000);
                click(540, 1500);
                sleep(2000);
            }
        } else {
            toastLog("支付宝没有找到理财图标！后退重启！");
            alipay_back();
            return SignIn_Alipay();
        }
        alipay_back();
        var 我的 = text("我的").findOne(3000);
        if (我的) {
            var 我的 = 我的.bounds();
            click(我的.centerX(), 我的.centerY());
            sleep(2000);
            click(186, 448, 426, 533); //点击进入支付宝会员页面
        } else {
            toastLog("支付宝没有找到我的图标！后退重启！");
            alipay_back();
            return SignIn_Alipay();
        }
        var 领积分 = text("领积分").findOne(3000);
        if (领积分) {
            var 领积分 = 领积分.bounds();
            click(领积分.centerX(), 领积分.centerY());
            var num = 0;
            while (num < 3) {
                var 可用积分 = text("可用积分").findOne(3000);
                if (可用积分) {
                    var 可用积分 = 可用积分.bounds();
                    click(可用积分.centerX(), 可用积分.centerY());
                    num += 1;
                    toast("点击第" + num + "次");
                    sleep(500);
                }
            }
        } else {
            toastLog("未找到支付宝会员领积分，可能是领过了！");
            alipay_back();
        }
        back();
        toastLog("进入我的家，领取家庭积分");
        var 我的家 = text("我的家").findOne(1000);
        // while (!text("我的家").findOne(1000)) { back(); }
        if (我的家) {
            var 我的家 = 我的家.bounds();
            click(我的家.centerX(), 我的家.centerY());
            sleep(2000);
            while (1) {
                var 家庭积分 = textMatches(/\+\d/).findOne(1000);
                if (家庭积分) {
                    var 家庭积分 = 家庭积分.bounds();
                    click(家庭积分.centerX(), 家庭积分.centerY());
                    sleep(1000);
                } else {
                    save_log("支付宝里的积分已领取");
                    break;
                }
            }
        }
        alipay_back();
        sleep(1000);
    } catch (err) {
        toastLog(err);
        return SignIn_Alipay();
    } finally {
        back_home();
        return;
    }
}

function SignIn_idlefish() {
    try {
        var appRun = currentPackage();
        if (appRun != 'com.taobao.idlefish') {
            launch("com.taobao.idlefish");

        }
        var 首页 = id("tab_title").findOne(6000);
        if (首页) {
            var 首页坐标 = 首页.bounds();
            click(首页坐标.centerX(), 首页坐标.centerY());
            sleep(1000);
        } else {
            toastLog("闲鱼没有找到首页，退出");
            back();
            return SignIn_idlefish();
        }
        var patter = text_log.search("闲鱼搜索框已完成");
        if (patter != -1) {
            toastLog("闲鱼搜索框跳过");
        } else {
            var 搜索框 = id("search_bar_layout").findOne(3000);
            if (搜索框) {
                toastLog("找到搜索框");
                sleep(1000);
                var 搜索框 = 搜索框.bounds();
                click(搜索框.centerX(), 搜索框.centerY());
                if (text("历史搜索").findOne(7000)) {
                    toastLog("选择宝贝");
                    sleep(1000);
                    click(130, 376); //点击历史记录第一个
                    if (textContains("综合").findOne(5000)) {
                        back();
                        save_log("闲鱼搜索框已完成");
                    } else {
                        toastLog("搜索未完成！后退重启！");
                        back_home();
                        return SignIn_idlefish();
                    }
                } else {
                    toastLog("历史搜索未加载");
                    back();
                    return SignIn_idlefish();
                }
            } else {
                toastLog("未找到搜索框！重启！");
                back();
                return SignIn_idlefish();
            }
        }
        toastLog("切换到我的界面");
        while (1) {
            var 我的坐标 = descContains("我的，未选中状态").findOne(2000);
            if (我的坐标) {
                var 我的坐标 = 我的坐标.bounds();
                click(我的坐标.centerX(), 我的坐标.centerY());
                sleep(1000);
            } else {
                break;
            }
        }
        toastLog("已经切换到我的界面");
        var patter = text_log.search("今天边逛边赚币完了");
        if (false) { //今天实行过一次就会跳过 
            toastLog("边逛边赚跳过");
        } else {
            toastLog("开始边逛边赚");
            var 边逛边赚钱入口 = text("边逛边赚币").findOne(5000);
            if (边逛边赚钱入口) {
                边逛边赚钱入口.click();
                sleep(2000);
                闲鱼签到();
                if (textContains("完成今日签到").findOne(2000)) {
                    back();
                    sleep(1000);
                }
                var 点击看 = text("小黄鱼").findOne(3000);
                if (点击看) {
                    toastLog("进入边逛边赚币了");
                    sleep(1000);
                    while (1) {
                        var 点击看 = text("小黄鱼").findOne(2000);
                        if (点击看) {
                            for (i = 1; i <= 2; i++) {
                                click(400 * i, 1330);
                                sleep(1000);
                                while (!text("闲鱼币").findOne(1000)) { back(); }
                                sleep(1000);
                            }
                            swipe(540, 2000, 540, 1200, 200); //下滑
                            sleep(1000);
                        } else {
                            break;
                        }
                    }
                } else {
                    save_log("今天边逛边赚币完了");
                    sleep(1000);
                }
            }
        }
        // back();
        while (!text("我的").findOne(1000)) { back(); }
        toastLog("切换到首页");
        while (1) {
            var 我的坐标 = descContains("闲鱼，未选中状态").findOne(2000);
            if (我的坐标) {
                var 我的坐标 = 我的坐标.bounds();
                click(我的坐标.centerX(), 我的坐标.centerY());
                sleep(1000);
            } else {
                break;
            }
        }
        toastLog("已经切换到首页");
        toastLog("开始签到");
        var 签到页面入口 = desc("闲鱼签到").findOne(3000);
        if (签到页面入口) {
            签到页面入口.click();
            var 签到页面 = text("闲鱼币").findOne(2000);
            if (签到页面) {
                sleep(3000);
                click(950, 150); //点击每日签到
                闲鱼签到();
                sleep(1000);
                click(600, 600); //收鱼篓
                sleep(1000);
                var patter = text_log.search("夺宝押注已结束");
                if (patter != -1) {
                    toastLog("夺宝押注跳过");
                } else {
                    toastLog("开始闲鱼币夺宝");
                    if (text("100闲鱼币夺宝 >").findOne()) {
                        text("100闲鱼币夺宝 >").findOne().click();
                        sleep(2000);
                        var 闲鱼币夺宝界面 = desc("无限投注，投注越多越容易中奖").findOne();
                        if (闲鱼币夺宝界面) {
                            //早上完善，晚上没有对应的按钮了
                            toastLog("进入闲鱼夺宝页面");
                            sleep(1000);
                            while (1) {
                                var 签到页面 = desc("我的闲鱼币").findOne(1000);
                                var 夺宝押注入口 = desc("100闲鱼币夺宝").findOne(1000);
                                if (夺宝押注入口) {
                                    sleep(1000);
                                    var 夺宝押注入口 = 夺宝押注入口.bounds();
                                    if (夺宝押注入口.centerY() > 2300) {
                                        swipe(540, 2000, 540, 1500, 300); //把坐标点移上来
                                        continue;
                                    }
                                    click(夺宝押注入口.centerX(), 夺宝押注入口.centerY());
                                    sleep(1000);
                                    if (desc("100闲鱼币夺宝").findOne(3000)) {
                                        click(500, 1670); //点击进入押宝最终页面
                                        sleep(1000);
                                        if (desc("100闲鱼币夺宝").findOne()) {
                                            click(226, 1900); //减少投注
                                            sleep(500);
                                            click(226, 1900); //减少投注
                                            sleep(500);
                                            while (desc("100闲鱼币夺宝").findOne(500)) {
                                                click(500, 2250); //确定投注
                                                sleep(1000);
                                            }
                                            back();
                                        }
                                        sleep(1000);
                                        // back();
                                        // text("100闲鱼币夺宝 >").findOne().click();
                                    } else {
                                        toastLog("本页面已压过了");
                                        back();
                                        sleep(1000);
                                        back();
                                        text("100闲鱼币夺宝 >").findOne().click();
                                    }
                                } else {
                                    save_log("夺宝押注已结束");
                                    var 我的闲鱼币 = (desc("我的闲鱼币").findOne(2000));
                                    if ("我的闲鱼币") {
                                        var 我的闲鱼币 = 我的闲鱼币.bounds();
                                        click(我的闲鱼币.centerX() - 229, 我的闲鱼币.centerY() + 46); //通过求出旁边的我的闲鱼币的控件坐标计算得到左边最终领取投资奖励的坐标
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
                toastLog("开始任务");
                // click(114, 1160);
                var 待领取 = text("待领取").findOne(2000);
                if (待领取) {
                    var 待领取 = 待领取.bounds();
                    click(待领取.centerX(), 待领取.centerY());
                    sleep(2000);
                    toastLog("检测去签到");
                    var 签到 = textContains("去签到").findOne(2000)
                    if (签到) {
                        var 签到 = 签到.bounds();
                        click(签到.centerX() + 300, 签到.centerY());
                        sleep(1000);
                        闲鱼签到();
                        sleep(1000);
                    }
                    while (1) {
                        var 可领取 = textContains("待领取").findOne(2000);
                        if (可领取) {
                            可领取.click();
                            sleep(500);
                        } else {
                            toastLog("已经领完了");
                            back();
                            break;
                        }
                    }
                }
                sleep(2000);
                click(600, 600); //收鱼篓
                sleep(1000);
                click(980, 800); //点击换闲鱼币
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
    } finally {
        back_home();
        return;
    }
}

function 闲鱼签到() {
    var 签到领币 = text("签到领币").findOne(1000);
    if (签到领币) {
        var 签到领币 = 签到领币.bounds();
        click(签到领币.centerX(), 签到领币.centerY());
        sleep(1000);
        toastLog("已点击签到领币按钮");
    } else {
        toastLog("没有找到签到领币按钮");
    }
}

function Sign_autonavi() {
    try {
        var patter = text_log.search("高德地图已完成");
        if (patter != -1) {
            toastLog("高德地图跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != 'com.autonavi.minimap') {
            launch("com.autonavi.minimap");
            sleep(1000);
        }
        // var rect = textContains("跳过").findOne(1500);
        // if (rect) {
        //     var rect = rect.bounds();
        //     click(rect.centerX(), rect.centerY()); //跳过广告界面
        // }
        var rect = id("iv_close").findOne(3000);
        if (rect) {
            var rect = rect.bounds();
            click(rect.centerX(), rect.centerY()); //跳过升级提示
        }
        var rect = text("我的").findOne(5000);
        if (rect) {
            var rect = rect.bounds();
            sleep(1000);
            press(rect.centerX(), rect.centerY(), 450);
            // click(891, 2265);
            sleep(2000);
            toast("点击签到");
            click(800, 2000);
            if (text("签到成功！").findOne(7000)) {
                sleep(5000);
                click(500, 1200);
                sleep(1000);
                back();
                home();
                sleep(1000);
                save_log("高德地图已完成!");
            } else if (text("签到战绩").findOne(2500)) {
                back();
                home();
                sleep(1000);
                save_log("高德地图已完成!");
            } else {
                toastLog("未找到表示签到成功的标识！");
                back();
                home();
                sleep(1000);
            }
        }
    } catch (err) {
        toastLog("出现错误" + err);
        back_home();
        sleep(1000);
        return Sign_autonavi();
    } finally {
        back_home();
        return;
    }
}

function SignIn_Sfacg() {
    try {
        var patter = text_log.search("SF已完成");
        if (patter != -1) {
            toastLog("SF跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != 'com.sfacg') {
            launch("com.sfacg");

            sleep(1000);
        }
        while (1) {
            var rect = id("main_tab_container5").findOne(3000);
            if (rect) {
                sleep(1000);
                var rect = rect.bounds();
                click(rect.centerX(), rect.centerY());
                sleep(1000);
                //进入签到页面
                if (text("我的钱包").findOne(3000)) {
                    break;
                }
            } else {
                toast("没有找到我的主页，请重试！");
                back_home();
                return SignIn_Sfacg();
            }
        }
        var rect = text("签到").findOne(2000);
        if (rect) {
            var rect = rect.bounds();
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
        } else if (text("已签").findOne(2000)) {
            save_log("SF已完成!");
        }
        while (1) {
            var 我的钱包 = text("我的钱包").findOne(5000);
            if (我的钱包) {
                var 我的钱包 = 我的钱包.bounds();
                click(我的钱包.centerX(), 我的钱包.centerY());
                sleep(1000);
                var num = id("tv_voucher").findOne(5000).text();
                if (num >= 35) {
                    alert("SF代卷该使用了！数量：" + num);
                } else {
                    toastLog("SF代卷数量：" + num);
                }
                break;
            } else {
                toastLog("没有找到我的钱包，请检查");
                back();
            }
        }
    } catch (err) {
        toastLog(err);
    } finally {
        back_home();
        return;
    }
}

function SignIn_Unicom() {
    try {
        var patter = text_log.search("联通营业厅已完成");
        if (patter != -1) {
            toastLog("联通营业厅跳过");
            return;
        }
        sleep(1000);
        var appRun = currentPackage();
        if (appRun != 'com.sinovatech.unicom.ui') {
            launch("com.sinovatech.unicom.ui");

            sleep(1000);
        }
        back();
        var 首页精选 = text("精选").findOne(10000);
        if (首页精选) {
            toastLog("进入首页了");
            var close = text("oFr5vJX3UQPSC9zxHDaogEvWoQcnnqMLcSRw18J6ZKGBYq3rYYwU+bFUeVgLHba6x4zbn8bzKjtu8Nnnc5p8AAwDgFJ01yE0rBgAAAABJRU5ErkJggg==").findOne(4000);
            if (close != null) {
                close.click();
            }
            sleep(1000);
            toastLog("点击签到");
            press(789, 137, 400);
            var 签到页面 = textContains("免费领").findOne(10000);
            if (签到页面) {
                toastLog("进入签到页面");
                sleep(2000);
                var 签到 = text("签到").depth(17).findOne(2000);
                if (签到) {
                    var 签到 = 签到.bounds();
                    click(签到.centerX(), 签到.centerY());
                    sleep(2000);
                    click(540, 1700);
                    sleep(1000);
                    back();
                    return SignIn_Unicom();
                }
                // var 去分享 = text("去分享").findOne(3000);
                // if (去分享) {
                //     var 去分享 = 去分享.bounds();
                //     click(去分享.centerX(), 去分享.centerY());
                //     sleep(2000);
                //     click(900, 250);
                //     sleep(2000);
                //     while (!textContains("免费领").findOne(1000)) { back(); }
                // }
                var 领积分 = text("领积分").findOne(1000);
                if (领积分) {
                    var 领积分 = 领积分.bounds();
                    click(领积分.centerX(), 领积分.centerY());
                    // text("我知道了").findOne().click();
                    click(540, 1700);
                }
                if (text("使用积分").findOne(3000)) {
                    save_log("联通营业厅已完成！");
                }
                back();
            } else {
                toastLog("未进入签到页面，重启");
                back();
                return SignIn_Unicom();
            }
        } else {
            toastLog("未进入联通营业厅首页,后退重启");
            back();
            return SignIn_Unicom();
        }
    } catch (err) {
        toastLog(err);
    } finally {
        home();
        return;
    }
}