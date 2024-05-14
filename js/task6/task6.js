// 219970513 李浩然
$(() => {

    alert("点击移动，双击屏幕变身")

    // 禁用鼠标右键
    $(document).on("contextmenu", function (e) {
        e.preventDefault();
    });

    let isBig = false; // 用于标记是否变身

    // 鼠标单击和双击事件
    $(document).on('click dblclick', function(event){
        let mouseX = event.pageX;
        let mouseY = event.pageY;

        // 设置人物图片的位置
        let playerX = mouseX - 120; // 减去图片宽度的一半
        let playerY = mouseY - 120; // 减去图片高度的一半

        // 检查人物是否会超出浏览器边界
        if(playerX < 0) playerX = 0;
        if(playerY < 0) playerY = 0;
        if(playerX + 270 > window.innerWidth) playerX = window.innerWidth - 270;
        if(playerY + 270 > window.innerHeight) playerY = window.innerHeight - 270;

        // 设置click_gif图片的位置
        let clickGifX = mouseX - 40; // 减去图片宽度的一半
        let clickGifY = mouseY - 40; // 减去图片高度的一半

        // 检查click_gif是否会超出浏览器边界
        if(clickGifX < 0) clickGifX = 0;
        if(clickGifY < 0) clickGifY = 0;
        if(clickGifX + 80 > window.innerWidth) clickGifX = window.innerWidth - 80;
        if(clickGifY + 80 > window.innerHeight) clickGifY = window.innerHeight - 80;

        // 停止之前的动画并设置新的位置
        $('#click_gif').stop().css({'left': clickGifX, 'top': clickGifY}).fadeIn(300).fadeOut(300);

        // 切换变身状态
        if(event.type === 'dblclick') {
            isBig = !isBig;
        }

        // 移动人物图片并决定方向
        let playerDirection = (mouseX < window.innerWidth / 2) ? 'left' : 'right';
        let playerImage = (isBig) ? `../img/task6/playerbig_${playerDirection}.gif` : `../img/task6/player_${playerDirection}.gif`;
        $('#player').attr('src', playerImage)
            .stop()
            .animate({'left': playerX, 'top': playerY}, 1000);
    });
})
