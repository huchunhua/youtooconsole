import html2canvas from 'html2canvas'

const common = {
    test: {
        open: false,
        token: "0a6542d0f6893dd7618ad07b0e7c95aa", //c3d3941f8ed90a2bad63afeea119553c
    },
    MakeDomScreenshot(ref) {
        return html2canvas(ref, {backgroundColor: '#FFFFFF'});
    }
}
export default common;
