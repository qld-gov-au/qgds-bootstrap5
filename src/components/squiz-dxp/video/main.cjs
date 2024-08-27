/**
 * Video component
 * Common js module to support DXP Component Service.
 */
module.exports = async function (input, info) {
    // const formatDuration = require('./static/server-formatDuration.js');
    // const formatDuration = require('formatDuration');

    // TODO: de-dupe this helper function by using require or import - currently DXP does not allow loading other methods outside this async function.
    // Handlebars helper function.
    const formatDuration = function (duration, format = "short") {
        // Return empty string when there is no duration.
        if (!duration) {
          return "";
        }
      
        // Nothing to process here when the duration is already in short format string
        // (to support existing CMS metadata).
        if (typeof(duration) === 'string' && format !== "long") {
          return duration;
        }
      
        let durationString = "";
        let parts = [];
        let hours, minutes, seconds;
      
        // Support for string type 'duration'.
        if (typeof(duration) === 'string') {
          const durationSplit = duration.split(":");  
          seconds = durationSplit[0];
          if (durationSplit.length == 2) {
            [minutes = "", seconds = ""] = durationSplit;
          } else if (durationSplit.length == 3) {
            [hours = "", minutes = "", seconds = ""] = durationSplit;
          }
        } else {
          // Support for object type 'duration'.
          [hours = "", minutes = "", seconds = ""] = duration;
        }
      
        // Long format: "X hours Y minutes Z seconds"
        if (format === "long") {
          if (hours > 0) {
            parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
          }
          if (minutes > 0) {
            parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
          }
          if (seconds > 0) {
            parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
          }
          durationString = parts.join(" ");
      
        // Short format: "HH:MM:SS"
        } else {
          // Omitting hours when zero
          if (hours > 0) {
            parts.push(hours.toString().padStart(2, 0));
          }
          parts.push(minutes.toString().padStart(2, 0));
          parts.push(seconds.toString().padStart(2, 0));
          durationString = parts.join(":");
        }
        return durationString;
    }

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
};

