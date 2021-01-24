//钉钉自动播放
auto.waitFor();
setScreenMetrics(1080, 2340); //设定以下坐标点击的基准屏幕分辨率
if (!images.requestScreenCapture()) { //可指定参数true（横屏截图） 或者 false（竖屏截图）
    toast("请求截图失败");
    exit();
}
sleep(5000);
toast("开始寻找播放按钮");
while (1) {
    var coor = image_coor("./images/钉钉播放按钮.png");
    if (coor) {
        click(coor.x, coor.y);
        sleep(1000);
    } else {
        toast("没有找到播放按钮，休息");
        sleep(30000);
    }
}

function image_coor(template_path) {
    var template = images.read(template_path); //模板图片的位置
    var img = captureScreen(); //截取当前图像
    var coor = images.findImage(img, template)
    img.recycle(); // 回收图片
    template.recycle(); // 回收图片
    return coor;
}