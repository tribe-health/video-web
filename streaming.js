'use strict'

/* global Hls Ipfs HlsjsIpfsLoader */
/* eslint-env browser */
document.addEventListener('DOMContentLoaded', async () => {
    const testHash = 'QmNMVux8CRX3a8iQ7rrygF5zJyDUavh5ZSEqRSdTZaY3qh'
    const repoPath = 'ipfs-' + Math.random()
    const node = await Ipfs.create({ repo: repoPath })

    Hls.DefaultConfig.loader = HlsjsIpfsLoader
    Hls.DefaultConfig.debug = false
    if (Hls.isSupported()) {
        const video = document.getElementById('video')
        const hls = new Hls()
        hls.config.ipfs = node
        hls.config.ipfsHash = testHash
        hls.loadSource('master.m3u8')
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play())
    }
})