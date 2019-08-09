
// 1、引入tap.js 
// 2、调用 touch.tap(dom元素，function(){})

var touch = {
    /*
        触屏开始时间和结束的时间差要小于150ms
        触发点击事件是：点击事件没有touchmove事件。
    */
    tap: function (el, callback) {
        // 开始的时间
        var startTime = 0;
        // 是否移动
        var isMove = false;

        el.addEventListener("touchstart", function (e) {
            // 获取按下的当前时间戳
            startTime = new Date() * 1;
        })

        el.addEventListener("touchmove", function (e) {
            isMove = true;
        })

        el.addEventListener("touchend", function (e) {
            // 获取抬起的当前时间戳
            var endTime = new Date() * 1;
            // 时间差小于 150 并且 不能有移动
            if ((endTime - startTime) < 150 && !isMove) {
                // box.style.background = "blue";
                callback && callback(el, e);
            }
            // 重置参数
            startTime = 0;
            isMove = false;
        })
    },
    swiper: function (el, dir, callback) {
        /**
         * 1、开始坐标点
         * 2、结束坐标点
         * 3、开始和结束坐标点的差
         * 4、判断水平还是垂直
         */
        var startCoord = null;
        var endCoord = null;
        var diffValue = 30; //差值

        el.addEventListener("touchstart", function (e) {
            var coord = e.touches[0];
            // 开始的坐标
            startCoord = {
                x: coord.clientX,
                y: coord.clientY
            }

        })

        el.addEventListener("touchmove", function (e) {
            var coord = e.touches[0];
            // 结束的坐标
            endCoord = {
                x: coord.clientX,
                y: coord.clientY
            }
        })

        el.addEventListener("touchend", function (e) {
            // 
            if (startCoord && endCoord && swiperCalc(startCoord, endCoord) === dir) {
              
                callback && callback(el,e);
            }

        })

        function swiperCalc(start, end) {
            // 坐标的差
            var diffX = end.x - start.x;
            var diffY = end.y - start.y;

            var absX = Math.abs(diffX);
            var absY = Math.abs(diffY);

            var text = "";

            if (absX > diffValue || absY > diffValue) {

                if (absX > absY) { //水平方向滑动
                    text = diffX > 0 ? "right" : "left";
                } else {
                    text = diffY > 0 ? "bottom" : "top";
                }

            }
            
            startCoord = null;
            endCoord = null;

            return text;

           

        }

    }
}




