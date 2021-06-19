// 間隔空けるための関数
// 音を鳴らす時間をミリ秒で定義
async function sleep(msec:any) {
    await new Promise(resolve => setTimeout(resolve, msec))
}

export default sleep;