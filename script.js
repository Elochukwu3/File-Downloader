const continer = document.getElementById("container");
const display = `
 <div class="wrapper">
<header>
  <h1 style =" font-size: 27px;
  font-weight: 500;">
  File Downloader
  </h1>
  <p style="margin-top: 5px;
  font-size: 18px;
  color: #474747;">
  Paste url of image, video, or pdf to download. This tool is made with vanilla javascript.
  </p>
</header>
<form action="/">
  <input type="url" placeholder="Paste file url" required>
  <button>Download File</button>
</form>
</div>
`;
continer.innerHTML = display;

const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");
downloadBtn.addEventListener("click", (e) => {
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
    aTag.download = url.replace(/^.*[\\\/]/, "");
    console.log(aTag.download);
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
