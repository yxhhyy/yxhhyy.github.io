document.addEventListener('pjax:send', function () {
    console.log("PJAX 开始加载新页面，保存 APlayer 状态");

    // 保存 APlayer 状态
    let oldPlayer = document.querySelector('.aplayer');
    if (oldPlayer) {
        window.aplayerState = {
            paused: oldPlayer.classList.contains('aplayer-playing') ? false : true, // 是否正在播放
            currentTime: oldPlayer.querySelector('audio').currentTime, // 记录播放进度
            volume: oldPlayer.querySelector('audio').volume // 记录音量
        };
    }
});

document.addEventListener('pjax:complete', function () {
    console.log("PJAX 页面加载完成，恢复 APlayer 状态");

    // 检查播放器是否已存在
    let newPlayer = document.querySelector('.aplayer');
    if (newPlayer && window.aplayerState) {
        let audio = newPlayer.querySelector('audio');
        if (audio) {
            // 恢复播放进度和音量
            audio.currentTime = window.aplayerState.currentTime;
            audio.volume = window.aplayerState.volume;
            if (!window.aplayerState.paused) {
                audio.play(); // 继续播放
            }
        }
    } else {
        // 如果没有播放器，重新创建 MetingJS
        let oldMeting = document.querySelector('meting-js');
        if (oldMeting) {
            let newMeting = oldMeting.cloneNode();
            oldMeting.parentNode.replaceChild(newMeting, oldMeting);
        }
    }
});
