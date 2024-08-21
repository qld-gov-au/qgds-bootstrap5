let videoThumbnails = document.querySelectorAll(".video-thumbnail");

videoThumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener("click", videoEmbedPlay);
});