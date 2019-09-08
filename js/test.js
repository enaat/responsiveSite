$(function () {
    // 1. 判断列数：
    let $imgs = $(".main>div");
    let $screenWidth = $(window).width(); // 屏幕的总宽度
    let $imgWidth = $imgs.outerWidth(true); // 💗 单个图片的宽度(加true才会将其margin值包含在内)
    let $cols = parseInt($screenWidth/$imgWidth);  // 总列数

    // 2. 根据列数判断第一行图片有哪些（并求出其高度数组）：
    let $imgArr = [];
    $imgs.each((index,item) => {
        // 如果小于列数(则为第一行-》将其高度追加到数组中)
        let $imgHeight = $(item).outerHeight(true);  // 💗 每张图片的高度
       if(index < $cols){
           $imgArr.push($imgHeight);
           console.log($(item).innerHeight() + '和' + $(item).outerHeight());
       }else{
           let $minHeight = Math.min.apply(null, $imgArr);  // 💗 求出最小高度
           let $minHeightindex = $.inArray($minHeight, $imgArr); // 💗 找出最小高度所在的索引值
           // 若不是第一行,则设置为绝对定位，通过定位来改变图片的位置：
           $(item).css({
               position: 'absolute',
               left:  $minHeightindex * $imgWidth+ 'px',
               top: $minHeight + 'px'
           });
           // 3. 更新高度数组：
           $imgArr[$minHeightindex] += $imgHeight;
       }
    });


});