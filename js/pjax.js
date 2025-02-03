document.addEventListener('pjax:send', function () {
    console.log("PJAX 开始加载新页面，保存 APlayer 状态");

    let oldPlayer = document.querySelector('.aplayer');
    if (oldPlayer) {
        let audio = oldPlayer.querySelector('audio');
        if (audio) {
            window.aplayerState = {
                paused: audio.paused,  // 是否暂停
                currentTime: audio.currentTime, // 记录播放进度
                volume: audio.volume,  // 记录音量
                songUrl: audio.src  // 当前播放的歌曲 URL
            };
        }
    }
});

document.addEventListener('pjax:complete', function () {
    console.log("PJAX 页面加载完成，恢复 APlayer 状态");

    let newPlayer = document.querySelector('.aplayer');
    if (newPlayer && window.aplayerState) {
        let audio = newPlayer.querySelector('audio');
        if (audio) {
            if (audio.src === window.aplayerState.songUrl) {
                audio.currentTime = window.aplayerState.currentTime;
            }
            audio.volume = window.aplayerState.volume;
            if (!window.aplayerState.paused) {
                audio.play();
            }
        }
    } else {
        // 重新加载 MetingJS 组件，确保播放器存在
        console.log("重新初始化 MetingJS 播放器");
        let oldMeting = document.querySelector('meting-js');
        if (oldMeting) {
            let newMeting = oldMeting.cloneNode();
            oldMeting.parentNode.replaceChild(newMeting, oldMeting);
        }
    }
});
document.addEventListener('pjax:complete', function () {
    let oldMeting = document.getElementById('global-music');
    if (oldMeting) {
        let newMeting = oldMeting.cloneNode();
        oldMeting.parentNode.replaceChild(newMeting, oldMeting);
    }
});
