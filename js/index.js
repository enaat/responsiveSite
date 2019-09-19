$(function () {
    // 点击切换菜单项：
    let navA = $(".contentTwo-nav>a");
    let Twonavs = $(".contentTwo-navs>div");
    navA.click(function () {
        Twonavs.eq($(this).index()).stop().fadeIn()
            .siblings().stop().fadeOut();
        $(this).addClass('act').siblings().removeClass('act');
    });


    // 点击切换特色菜(轮播图)：
    let contentThreeTurn = $(".contentThree-turn");
    let contentThreeBtnL = $(".contentThree-turn-left"); // 左按钮
    let contentThreeBtnR = $(".contentThree-turn-right"); // 右按钮

    setInterval(function () {
        contentThreeTurn.toggleClass('contentThree-turns');
    }, 6000);

    contentThreeBtnR.click(function () {
        contentThreeTurn.toggleClass('contentThree-turns');
    });
    contentThreeBtnL.click(function () {
        contentThreeTurn.toggleClass('contentThree-turns');
    });


    // 点击切换厨师：
    let contentFourTurn = $(".contentFour-turn");
    let contentFourBtnL = $(".contentFour-turn-left"); // 左按钮
    let contentFourBtnR = $(".contentFour-turn-right"); // 右按钮
    let contentFourA = $(".contentFour-turn>a"); // 轮播图片数
    let i = 0; // 记录出现哪一张的距离
    window.imgW = $(".smA a").outerWidth(true);
    window.onresize = function () {
        // 每改变一次屏幕大小，则更新一次宽度值：
        imgW = $(".smA a").outerWidth(true);
    };
    function nextImg(whatSize){
        if (i>=whatSize-1){
            i = -1;
        }
        i++;
        contentFourTurn.css({
            transform: 'translate(-' + i * imgW + 'px)'
        });
    }
    function prevImg(whatSize){
        if (i<=0){
            i = whatSize;
        }
        i--;
        contentFourTurn.css({
            transform: 'translate(-' + i * imgW + 'px)'
        });
    }

    function commonImg(){
        if(imgW === 370){
            nextImg(2);
        }else{
            nextImg(contentFourA.length);
        }
    }
    contentFourBtnR.click(function () {
        commonImg();
    });
    contentFourBtnL.click(function () {
        commonImg();
    });


    // 图片展示：
    let contentFiveMain = $(".contentFive-main"); // 装每个图片内容的容器
    contentFiveMain.hover(function () {
        $(this).find('.contentFive-cover').stop().fadeIn(800);
    }, function () {
        $(this).find('.contentFive-cover').stop().fadeOut(800);
    });

    // 点击查看大图，以及可切换：
    let FiveMainImg = contentFiveMain.find("a>img"); // 对应的图片
    let BigPic = $(".Big-Pic"); // 大图的容器
    let picPrev = $(".picPrev"); // 切换前一张
    let picNext = $(".picNext"); // 切换后一张
    let picClose = $(".picClose"); // 关闭按钮
    let index;

    contentFiveMain.click(function () {
        index = $(this).index(); // 记录当前显示图片的索引值
        BigPic.fadeIn(1000);
        let src = FiveMainImg.eq(index).attr('src');
        BigPic.find(".Pic-Show>img").attr('src', src);
    });

    picClose.click(function () { // 关闭
        BigPic.fadeOut(1000);
    });

    picPrev.click(function () { // 前一张
        if(index <= 0){
            index = FiveMainImg.length;
        }
        index--;
        let curSrc = FiveMainImg.eq(index).attr('src'); // 当前索引值为index-1后的图片
        BigPic.find(".Pic-Show>img").attr('src', curSrc);
    });
    picNext.click(function () { // 后一张
        if(index >= FiveMainImg.length-1){
            index = -1;
        }
        index++;
        let curSrc = FiveMainImg.eq(index).attr('src'); // 当前索引值为index-1后的图片
        BigPic.find(".Pic-Show>img").attr('src', curSrc);
    });


    // 用户评论轮播显示部分：
    let contentSixTurn = $(".contentSix-turn"); // 整个放置内容卡片的容器
    let contentSixTurnItem = $(".contentSix-turns"); // 内容卡片部分
    let SixItemWidth = contentSixTurnItem.outerWidth(true); // 一个卡片的宽
    // 顾客评论部分的轮播图小点：
    let contentSixTurnNum = $(".contentSix-turn-num>span");
    // 初始化容器总宽度：
    contentSixTurn.width(SixItemWidth*contentSixTurnItem.length*3);
    let cur = 0; // 记录播放第几个
    let timers = null; // 控制定时器的播放停止

    function autoPlayTurn(){ // 自动轮播方法
        if(cur >= contentSixTurnItem.length){
            cur = 0;
        }
        contentSixTurnNum.eq(cur).addClass('numAct').siblings().removeClass('numAct');
        contentSixTurn.animate({
            left: '-' +cur*(SixItemWidth*3)+ 'px'
        }, 1000);
        cur++;
    }
    timers = setInterval(autoPlayTurn, 3000);

    // 点击轮播小点，显示到对应卡片内容：
    contentSixTurnNum.mouseenter(function () {
        clearInterval(timers); // 暂停轮播
        $(this).click(function () {
            contentSixTurn.animate({
                left: '-' + $(this).index()*(SixItemWidth*3) + 'px'
            }, 1000);
            $(this).addClass('numAct').siblings().removeClass('numAct');
        });
    });

    contentSixTurnNum.mouseleave(function () {
        cur = $(this).index();
        timers = setInterval(autoPlayTurn, 3000);
    });


    // 联系表单校验部分：
    let contactInput = $(".contentSeven-main>input");
    let contactText = $(".contentSeven-input textarea");
    // let contactError = $("")
    function errorTip(_this){
        if(_this.val() === ''){
            _this.next().fadeIn();
        }else{
            _this.next().fadeOut();
        }
    }
    function errorTipTel(_this){
        let err1 = /1\d{10}/g; // 手机号验证
        if(_this.val()){
            if(err1.test($(".phone").val())){
                _this.next().next().fadeOut();
                _this.removeClass('errorInput');
            }else{
                _this.next().next().fadeIn();
                _this.addClass('errorInput');
            }
        }
    }
    contactInput.blur(function () {
        errorTip($(this));
        errorTipTel($(this));
    });
    contactText.blur(function () {
        errorTip($(this));
    });

    $(".sub").click(function () {
        contactInput.trigger('blur');
        contactText.trigger('blur');
    });



    // 控制回到顶部的图标是否出现：
    let toTop = $(".toTop");
    $(window).scroll(function () {
        if($(this).scrollTop() >= 200){
            toTop.fadeIn(500);
        }else{
            toTop.fadeOut(500);
        }
    });
    // 点击则返回顶部：
    toTop.click(function () {
        $("body, html").animate({
            scrollTop: 0
        }, 1000);
    });
});