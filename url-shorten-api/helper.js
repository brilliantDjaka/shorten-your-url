module.exports = {
    isValidHttpUrl: (url) => {
        
        try {
            url = new URL(url);
        } catch (_) {
            return false;  
        }

        return url.protocol === "http:" || url.protocol === "https:";
    },
    isUrlSafe: (url) => url.match(new RegExp(/^[a-zA-Z0-9_-]*$/))
}