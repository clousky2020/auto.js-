auto.waitFor();
var height = device.height;
var width = device.width;
// toastLog("本设备的分辨率为，\n宽："+device.width+"\n长："+device.height);//输出设备的分辨率
setScreenMetrics(width, height); //设定以下坐标点击的基准屏幕分辨率
// var now = new Date();
// var log_name = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
// var path = files.cwd() + "/运行日志/日志" + log_name + ".txt";
// files.createWithDirs(path);
// var text_log = files.read(path);
// if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
//     toast("请求截图失败");
//     exit();
// }

var tools = require("tools.js");
main();

function main() {
    tools.back_home();
    登录支付宝();
    进入消费金();
    点击进入浏览界面();
    检查赚金币();
    去羊场();
    点击进入浏览界面();
    tools.back_home();
    return;
}

function 登录支付宝() {
    var appRun = currentPackage();
    if (appRun != 'com.eg.android.AlipayGphone') {
        launch("com.eg.android.AlipayGphone");
        sleep(1000);
    }
}

function 进入消费金() {
    click_obj = { type: text, text: "消费金", time: 2000 }
    find_obj = { type: text, text: "我的兑换", time: 5000 }
    tools.loop_find_click_return(click_obj, find_obj);
}

function 退回消费金首页() {
    tools.back_to(text, '我的兑换', 1000);
    return;
}

function 点击进入浏览界面() {
    toastLog("点击进入浏览界面");
    click(900, 1750);
    if (textContains('最多').findOne(3000)) {
        循环向下点击();
        退回消费金首页();
    } else {
        toastLog("没有进入搜索领金币界面,可能是已经搜索过了");
    }
    return;
}

function 循环向下点击() {
    while (1) {
        if (textContains("回首页").findOne(500)) {
            toastLog("时间已到，返回了");
            back();
            break
        } else {
            tools.to_down(2, 300);
            for (var i = 1; i <= 2; i++) {
                click(400 * i, 1500);
                sleep(500);
                tools.back_to(text, "正品保证", 500);
                sleep(500);
            }
        }
    }
    return;

}

function 循环获取金币() {
    tools.find_all_and_click(textContains, "+");
    return;
}

function 检查赚金币() {
    click(540, 2150);
    sleep(2000)
    while (1) {
        if (tools.find_click(text, '去逛逛', 2000)) {
            sleep(1000);
            back();
        } else {
            toastLog('没有去逛逛了');
            break;
        }
    }
    去抽奖();

    // 这里没有退出关闭之类的按钮，点击蒙层关闭
    click(540, 500);
    sleep(1000);
    循环获取金币();
    toastLog("退出检查赚金币");
    return;
}

function 去抽奖() {
    if (tools.find_click(text, '去完成', 2000)) {
        if (tools.find_click(text, '0元抽奖', 5000)) {
            sleep(1000);
            if (tools.find_click(text, '0元抽奖', 3000)) {
                sleep(2000);
            }
            back();
            tools.find_click(text, '忍痛离开', 4000);
        }
        tools.back_to(textContains, '领取', 1000);
    }
    return;
}


function 去羊场() {
    click_obj = { type: text, text: "雇羊打工最多每次可挣18个金币哦！", time: 3000 }
    find_obj = { type: textContains, text: "g", time: 6000 }
    if (tools.find_click_return(click_obj, find_obj)) {
        // 点击收羊毛
        click(800, 1600);
        点击领饲料();
        sleep(1000);
        任务饲料();
        喂饲料();
    } else {
        toastLog("没有进入羊场");
    }
    sleep(1000);
    return;
}

function 点击领饲料() {
    if (tools.find_click(textContains, '点我领', 3000)) {
        tools.find_click(text, "去领取", 3000);
        sleep(2000);
        tools.find_click(text, "立即领取", 3000)
        back();
    } else {
        toastLog("没有饲料可领");
    }
    return;
}

function 返回任务饲料页面() {
    tools.back_to(text, '领饲料喂小羊', 1000);
    return;
}

function 点击领取() {
    while (1) {
        if (!tools.find_click(text, '领取', 2000)) {
            break;
        }
    }
    return;
}

function 任务饲料() {
    click(300, 2200);
    tools.find_click(text, '打卡', 2000);
    sleep(1000);
    // 暂时不行，后退会直接退回到消费金首页，又不想弄的更麻烦，先屏蔽了
    // list1 = ["去参与", "去逛逛"];
    // for (i = 0; i < list1.length; i++) {
    //     toastLog("开始查看" + list1[i]);
    //     while (1) {
    //         if (tools.find_click(text, list1[i], 2000)) {
    //             if (text("逛一逛15s得300g饲料").findOne(1000)) {
    //                 tools.to_down_to_up(15);
    //             }
    //             返回任务饲料页面();
    //             点击领取();
    //         } else {
    //             toastLog('没有找到 ' + list1[i] + " 了");
    //             break;
    //         }
    //     }
    // }
    返回任务饲料页面();
    // 点击关闭
    click(1030, 1100);
    sleep(1000);
    return;
}

function 喂饲料() {
    if (tools.find_click(textContains, 'g', 2000)) {
        sleep(1000);
        // 点击工厂，开始打工
        click(100, 1400);
        sleep(500);
        click(250, 1200);
        sleep(1000);
        back();
    }
    退回消费金首页();
    循环获取金币();
    return;
}