const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

async function fetchFile(url) {

try {
    const res = await fetch(url);
    const file = await res.blob();
    let tempUrl = URL.createObjectURL(file);
    const aTag = document.createElement("a");
    aTag.href = tempUrl;
    aTag.download = url.replace(/^.*[\\\/]/, '');
    document.body.appendChild(aTag);
    aTag.click();
    downloadBtn.innerText = "Download File";
    URL.revokeObjectURL(tempUrl);
    aTag.remove();
} catch (error) {
    alert("Failed to download file!");
        downloadBtn.innerText = "Download File";
}
}