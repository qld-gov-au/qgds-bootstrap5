/**
 * Video component
 * Common js module to support DXP Component Service.
 */
module.exports = async function (input) {
    try {
        const { formatDuration } = await import('../../../../js/helpers/formatDuration.js');

        return `
            <section class="video not-ready ${!input.thumbnail ? 'empty-thumbnail': ''} ${input.videoSize}">
                <div class="video-player ratio ratio-${input.aspectRatio}">
        
                    <a href="#" class="video-thumbnail video-controls" title="Play Video" 
                        aria-label="Watch video duration ${formatDuration(input.duration, 'long')}">
        
                        <div class="video-thumbnail-image" style="--thumbnail:url(${input.thumbnail})"></div>
                        <div class="video-nav">
                            <div class="video-watch">
                                <span class="icon"></span><span>Watch</span>
                            </div>
        
                            ${input.duration ? 
                                `<div title="Video duration" class="video-duration">
                                    <span class="icon"></span><span>${formatDuration(input.duration)}</span>
                                </div>` : '' }
                        </div>
                    </a>
                    <div class="video-embed ratio ratio-${input.aspectRatio}">
                        <iframe title="YouTube video" class="embed-responsive-item video-youtube" allow="autoplay; fullscreen" allowfullscreen 
                                src="https://www.youtube.com/embed/${input.videoId}?rel=0"></iframe>
                    </div>
                </div>
                <div class="video-description">
                    ${input.description}
                </div>
                ${input.transcriptContent ? input.transcriptAccordion : input.transcriptContent}
            </section>
        `;
    } catch (error) {
        console.error('Error on loading formatDuration helper.');
        return ``;
    }
};

