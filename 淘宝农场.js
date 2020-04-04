auto.waitFor();
setScreenMetrics(1080, 2340);//设定以下坐标点击的基准屏幕分辨率
var height = device.height;
var width = device.width;

tmail_form();//运行天猫农场的程序


function tmail_form() {
    try {
        var appRun = currentActivity()
        if (appRun != 'com.taobao.taobao') {
            launch("com.taobao.taobao");
        }
        var 我的淘宝图标 = desc("我的淘宝").findOne(5000);
        if (我的淘宝图标) {
            var 我的淘宝图标=我的淘宝图标.bounds();
            click(我的淘宝图标.centerX(), 我的淘宝图标.centerY());
            while (1){
                var 天猫农场入口 = text("天猫农场").findOne(3000);
                if (天猫农场入口) {
                    sleep(1000);
                    var 天猫农场入口=天猫农场入口.bounds();
                    if(天猫农场入口.centerY()<200){
                        swipe(540,500,540,2200,300);
                        continue;
                    }
                    click(天猫农场入口.centerX(), 天猫农场入口.centerY());
                    break;
                }else{
                    toastLog("没有找到农场，上划后重启");
                    swipe(540,500,540,2200,300);
                    return tmail_form();
                }
            }
            
            if (text("兑换好礼（每天10:00上新）").findOne(10000)) {
                toast("进入农场");
                sleep(2000);
            } else {
                toastLog("未进入农场，重启");
                while (!desc("我的淘宝").findOne(1000)) { back(); }
                return tmail_form();
            }
            if (text("离线超过24小时，作物会停止自动生产哦~").findOne(5000)) {
                click(0.487 * width, 0.745 * height);//关闭长时间未进入后弹出的窗口
                sleep(1000);
            }
            click(0.495 * width, 0.674 * height);//宝箱点击关闭
            sleep(1000);
            var sun_list = [[0.116, 0.281], [0.27, 0.346], [0.337, 0.273], [0.516, 0.226], [0.722, 0.247], [0.687, 0.283], [0.883, 0.318], [0.879, 0.245], [0.735, 0.558]]
            var coordinate_field = [[0.495, 0.295], [0.285, 0.353], [0.705, 0.342], [0.508, 0.396], [0.277, 0.464], [0.731, 0.45], [0.487, 0.516], [0.298, 0.564], [0.474, 0.628]]
            toast("第一次开始收阳光")
            for (i = 0; i < sun_list.length; i++) {
                click(sun_list[i][0] * width, sun_list[i][1] * height);
            }
            toast("第一次收田地")
            for (i = 0; i < coordinate_field.length; i++) {
                click(coordinate_field[i][0] * width, coordinate_field[i][1] * height);
            }
            sleep(2000)
            click(0.495 * width, 0.674 * height)//宝箱点击关闭
            toast("第二次开始收阳光")
            for (i = 0; i < sun_list.length; i++) {
                click(sun_list[i][0] * width, sun_list[i][1] * height);
            }
            toast("第二次收田地")
            for (i = 0; i < coordinate_field.length; i++) {
                click(coordinate_field[i][0] * width, coordinate_field[i][1] * height);
            }
            sleep(1000);
            click(0.495 * width, 0.674 * height)//宝箱点击关闭
            sleep(1000);
            click(0.907 * width, 0.659 * height)  // 点击领阳光的图标
            sleep(1000);
            while (1) {
                var next_click = text("去浏览").findOne(2000);
                var wait_time = text("后开始任务").findOne(1000);
                if (next_click && !wait_time) {
                    click(0.841 * width, 0.666 * height);//点击浏览阳光的坐标
                    toast("去浏览15秒领阳光")
                    if (text("当前页面浏览满15秒可获得10阳光").findOne(3000)) {
                        sleep(15250);
                        while(!text ("去APP完成").findOne(1000)){back();}
                        
                    } else {
                        back();
                    }
                    sleep(1000);
                    break;
                } else {
                    toastLog("不能浏览阳光")
                    break;
                }
            }
            while (1) {
                var 去进店领阳光 = text("去进店").findOne(1000);
                var 去进店领阳光已完成 = text("已完成").findOne(1000);
                if (去进店领阳光 && !去进店领阳光已完成) {
                    sleep(1000);
                    去进店领阳光.click();
                    toast("进店领阳光")
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
                        if (desc("经过搜寻，你获得了").findOne(1000)) {
                            toast("已经得到阳光,退回");
                            back();
                            sleep(2000);
                            break
                        }
                        if (num == 15) {
                            toastLog("下滑15次还没看到目标值，向上，重新来")
                            num += 1;
                            for (i = 0; i < 18; i++) {
                                swipe(540, 200, 540, 2100, 200);//向上滑
                                // sleep(1000);
                            }
                        } else if (num > 30) {
                            toast("下滑多次未找到目标，退回");
                            back();
                            break
                        } else {
                            num += 1;
                            toast("当前页面未找到,下滑" + num + "次");
                            swipe(540, 2100, 540, 200, 200);//向下滑
                        }
                    }
                } else {
                    break;
                }
            }

            sleep(1000);
            toast("没有什么任务可以做了，关闭任务菜单！")
            click(0.925 * width, 0.547 * height)
            sleep(1000);
            //收阳光
            for (i = 0; i < sun_list.length; i++) {
                click(sun_list[i][0] * width, sun_list[i][1] * height);
            }
            sleep(1000);

            toast("进入果园");
            click(0.112 * width, 0.664 * height);
            if (text("无星辰落").findOne()) {
                toast("已经进入福年种福果");
                sleep(1000);
                click(0.7 * width, 0.521 * height);//收取昨日的福气
                sleep(1000);
                click(0.5 * width, 0.65 * height)//点掉今天已经领过了，明天再领
                sleep(1000);
                click(0.891 * width, 0.695 * height)  // 进入活动中心
                if (text("x11000").findOne(10000)) {
                    sleep(1000);
                    var rect = text("去签到").findOne(1000);
                    if (rect != null) {
                        toast("签到")
                        click(900, 1250);
                        // rect.click();
                        // click(rect.centerX(),rect.centerY());
                    }
                    var rect = textContains("去领取").findOne(500);
                    if (rect != null) {
                        toast("去领取")
                        click(900, 2000);
                        // click(rect.centerX(),rect.centerY());
                    }
                    var rect = textContains("去兑换").findOne(1000);
                    if (rect != null) {
                        toast("去兑换")
                        click(900, 2200);
                        // rect.click();
                    }
                    while (1) {
                        var 去逛逛 = textContains("去逛逛").findOne(1000);
                        if (去逛逛) {
                            去逛逛.click();
                            if (textContains("全部完成").findOne(2000)) {
                                back();
                                sleep(1000);
                                click(0.912 * width, 0.417 * height)//关闭任务窗口
                                sleep(1000);
                                click(0.9 * width, 0.695 * height)//打开任务窗口
                                sleep(1000);
                                break;
                            } else if (textContains("浏览完成").findOne(20000)) {
                                back();
                                sleep(1000);
                            } else {
                                back();
                                sleep(1000);
                            }
                        }else{
                            break;
                        }
                    }
                    while (1) {
                        var 去浏览=textContains("去浏览").findOne(1000);
                        if (去浏览){
                            去浏览.click();
                            if (textContains("全部完成").findOne(2000)) {
                                back();
                                sleep(1000);
                                click(0.912 * width, 0.417 * height)//关闭任务窗口
                                sleep(1000);
                                click(0.9 * width, 0.695 * height)//打开任务窗口
                                sleep(1000);
                                break;
                            } else if (textContains("浏览完成").findOne(15000)) {
                                sleep(1000);
                                back();
                                sleep(1000);
                            } else {
                                back();
                                sleep(1000);
                            }
                        }else{
                            break;
                        }
                    }
                    var 去换装 = textContains("去换装").findOne(1000);
                    if (去换装 ) {
                        去换装.click();
                        sleep(10000);
                        click(1000,1383)
                        //缺少点击收取心愿卡的步骤
                        back();
                        sleep(2000);
                        click(0.508 * width, 0.645 * height);//退出淘宝人生
                        sleep(2000);
                    }
                    if (textContains("x10000").findOne()) {
                        click(0.916 * width, 0.409 * height);//关闭任务菜单
                        sleep(1000);
                        // for (i=0;i<10;i++){
                        //     click(0.491*width, 0.693*height);//点击浇灌福气
                        //     sleep(1000);
                        // }
                    }
                    back();//退出
                    sleep(1000);
                    back();//退出
                    home();
                    toastLog("农场已完成，退出")
                }
            }
            // }
        }
    } catch (err) {
        toastLog(err);
        exit();
    }
} 