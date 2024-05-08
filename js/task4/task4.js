// 获取页面宽度，并调整顶部对联广告的样式在两边对称
function changeTopADWidth() {
    // 获取浏览器窗口的内部宽度
    let screenWidth = window.innerWidth;
    // 获取对联元素
    let topAd_2 = document.querySelector(".top_ad_2");
    // 获取对联宽度
    let clientWidth = topAd_2.clientWidth;
    // 将左边距设置为屏幕宽度-广告宽度-右边距-滚动条
    topAd_2.style.left = (screenWidth - clientWidth - getScrollbarWidth()) + 'px';
}

// 修改底部广告样式
function changeBottomADStyle() {
    // 获取页面高度
    let screenHeight = window.innerHeight;
    // 获取底部广告元素
    let bottomRightAd = document.querySelector(".bottom-right-ad");
    // 获取自身高度
    let bottomRightAdHeight = bottomRightAd.clientHeight;
    // 设置距离顶部距离为：页面高度
    bottomRightAd.style.top = screenHeight + 'px';

    // 获取浏览器窗口的内部宽度
    let screenWidth = window.innerWidth;
    // 获取自身宽度
    let clientWidth = bottomRightAd.clientWidth;
    // 设置距离左边距离为：（页面宽度 - 自身宽度）
    bottomRightAd.style.left = (screenWidth - clientWidth - getScrollbarWidth()) + 'px';

    let intervalId = setInterval(() => {
        // 获取当前距离顶部的位置（字符串类型）
        let currentTop = bottomRightAd.style.top;
        // 将字符串转换为数值（去掉 'px' 单位）
        let currentTopValue = parseFloat(currentTop);
        // 如果转换失败，默认距离为 0
        if (isNaN(currentTopValue)) {
            currentTopValue = 0;
        }
        if (currentTopValue < (screenHeight - bottomRightAdHeight)){
            // 当达到目标位置时，停止定时器
            clearInterval(intervalId);
            return;
        }
        // 调整距离顶部的位置（减去 10px）
        let newTopValue = currentTopValue - 1;
        // 设置新的距离顶部的位置
        bottomRightAd.style.top = newTopValue + 'px';
    }, 1);

}

// 获取滚动条宽度
function getScrollbarWidth() {

    // 创建不可见容器
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // 强制显示滚动条
    outer.style.msOverflowStyle = 'scrollbar'; // WinJS 应用需要
    document.body.appendChild(outer);

    // 创建内部元素并将其放置在容器中
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // 计算容器的全宽和子宽度之间的差值
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // 从 DOM 中删除临时元素
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;

}

// 关闭事件注册
function closeEvent() {

    // 获取所有的关闭按钮
    let closeButtons = document.querySelectorAll('.close1, .close2, .close3');

    // 遍历每个关闭按钮并添加点击事件处理程序
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 获取要关闭的广告的父元素
            let parentAd = button.closest('.top_ad_1, .top_ad_2, .bottom-right-ad');

            // 如果找到父元素，则移除它
            if (parentAd) {
                parentAd.remove();
            }
        });
    });
}


// 页面加载完再执行
window.onload = () => {
    changeTopADWidth()
    closeEvent()
    changeBottomADStyle()
    // 移除加载动画
    document.querySelector('.loading-overlay').style.display = 'none';
}
