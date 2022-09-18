class Environment {
    static isAndroid() {
        return navigator.userAgent.match(/Android/i);
    }

    static isBlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    }

    static isIOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

    static isOpera() {
        return navigator.userAgent.match(/Opera Mini/i);
    }

    static isWindows() {
        return navigator.userAgent.match(/IEMobile/i);
    }

    static isMobile() {
        return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows());
    }
}

export default Environment;
